<template>
    <v-dialog
        v-model="modelValue"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <div
            class="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-6"
        >
            <div class="max-w-7xl mx-auto">
                <div class="flex justify-end mb-4">
                    <v-tooltip text="Cerrar" location="bottom">
                        <template #activator="{ props }">
                            <v-btn
                                v-bind="props"
                                icon
                                variant="text"
                                color="grey-darken-2"
                                @click="modelValue = false"
                                class="hover:bg-slate-200"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </div>
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold text-slate-900 mb-2">
                        Gestión de Jugadores
                    </h1>
                    <p class="text-slate-600">
                        Crea y asigna jugadores a tus equipo :
                        <span class="font-bold">
                            {{ props.equipoNombre }}
                        </span>
                    </p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-slate-600 mb-1">
                                    Total Jugadores
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ players.length }}
                                </p>
                            </div>
                            <div
                                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
                            >
                                <Users class="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-slate-600 mb-1">
                                    Jugadores Asignados
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ assignedPlayersCount }}
                                </p>
                            </div>
                            <div
                                class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"
                            >
                                <UserCheck class="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-slate-600 mb-1">
                                    Categorías Disponibles
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ teams.length }}
                                </p>
                            </div>
                            <div
                                class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center"
                            >
                                <Trophy class="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div
                    class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div class="border-b border-slate-200">
                        <div class="flex">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                @click="activeTab = tab.id"
                                :class="[
                                    'flex items-center gap-2 px-6 py-4 font-medium transition-colors',
                                    activeTab === tab.id
                                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                                ]"
                            >
                                <component :is="tab.icon" class="w-5 h-5" />
                                {{ tab.label }}
                            </button>
                        </div>
                    </div>

                    <div class="p-6">
                    
                        <PlayerForm
                            v-if="activeTab === 'create'"
                            :equipo-id="props.equipoId"
                            :torneo-id="props.torneoId"
                            :ramas="ramas"
                            :categorias="categorias"
                            :is-saving="savingPlayer"
                            @submit="handlePlayerCreated"
                        />
                        <PlayerList
                            v-if="activeTab === 'list'"
                            :players="players"
                            :is-loading="loadingPlayers"
                            @delete-player="handleDeletePlayer"
                        />
                        <TeamAssignment
                            v-if="activeTab === 'assign'"
                            :players="players"
                            :teams="teams"
                            :ramas="ramas"
                            @assign-player="handleAssignPlayer"
                        />
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
    Users,
    UserCheck,
    Trophy,
    UserPlus,
    List,
    UsersRound,
} from "lucide-vue-next";
import PlayerForm from "./PlayerForm.vue";
import PlayerList from "./PlayerList.vue";
import TeamAssignment from "./TeamAssignment.vue";
import { useEquipoService } from "../composables/useEquipoService";
import { useJugadorService } from "../composables/useJugadorService";
import type {
    CategoriaEquipo,
    Jugador,
    JugadorRequest,
    RamaEquipo,
} from "@/interfaces/Jugador";

interface IProps {
    equipoNombre: string;
    modelValue: boolean;
    equipoId?: number;
    torneoId?: number | null;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
    equipoNombre: "",
    modelValue: false,
    equipoId: 0,
    torneoId: null,
});

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});

interface Player {
    id: string;
    jugadorId: number;
    name: string;
    number: number | null;
    age: number | null;
    categoriaId?: number | null;
    categoriaNombre?: string;
    ramaId?: number | null;
    ramaNombre?: string;
    curp?: string;
    fechaNacimiento?: string | null;
}

interface Team {
    id: string;
    name: string;
    color?: string;
    categoriaId: number;
}

const activeTab = ref<"create" | "list" | "assign">("create");

const tabs = [
    { id: "create" as const, label: "Crear Jugador", icon: UserPlus },
    { id: "list" as const, label: "Lista de Jugadores", icon: List },
    { id: "assign" as const, label: "Asignar a Categoria", icon: UsersRound },
];

const { selectCategoriasPorEquipo, selectRamasPorEquipo } =
    useEquipoService();
const { fetchJugadores, createJugador, updateJugador, deleteJugador } =
    useJugadorService();

const categorias = ref<CategoriaEquipo[]>([]);
const ramas = ref<RamaEquipo[]>([]);
const rawPlayers = ref<Jugador[]>([]);
const players = ref<Player[]>([]);
const loadingCatalogs = ref(false);
const loadingPlayers = ref(false);
const savingPlayer = ref(false);

const teams = computed<Team[]>(() => {
    const palette = [
        "bg-purple-500",
        "bg-blue-500",
        "bg-emerald-500",
        "bg-amber-500",
        "bg-rose-500",
    ];
    return categorias.value.map((categoria, index) => ({
        id: String(categoria.categoriaId),
        name: categoria.categoria,
        color: palette[index % palette.length],
        categoriaId: categoria.categoriaId,
    }));
});

const assignedPlayersCount = computed(() =>
    players.value.filter((player) => player.categoriaId && player.ramaId).length
);

const categoriaNameById = (categoriaId?: number | null) => {
    if (!categoriaId) return "";
    return (
        categorias.value.find(
            (categoria) => categoria.categoriaId === categoriaId
        )?.categoria ?? ""
    );
};

const ramaNameById = (ramaId?: number | null) => {
    if (!ramaId) return "";
    return (
        ramas.value.find((rama) => rama.ramaId === ramaId)?.nombre ?? ""
    );
};

const calculateAge = (isoDate?: string | null) => {
    if (!isoDate) return null;
    const birth = new Date(isoDate);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }
    return age;
};

const mapJugadorToPlayer = (jugador: Jugador): Player => {
    const primaryAssignment = jugador.equipoJugador?.[0];
    const fullName = [jugador.nombre, jugador.apellidoPaterno, jugador.apellidoMaterno]
        .filter(Boolean)
        .join(" ")
        .trim();

    const categoriaId = primaryAssignment?.categoriaId ?? null;
    const ramaId = primaryAssignment?.ramaId ?? null;

    return {
        id: jugador.jugadorId.toString(),
        jugadorId: jugador.jugadorId,
        name: fullName || jugador.nombre,
        number: primaryAssignment?.num ?? null,
        age: calculateAge(jugador.fechaNacimiento),
        categoriaId,
        ramaId,
        categoriaNombre:
            primaryAssignment?.categoriaNombre ?? categoriaNameById(categoriaId),
        ramaNombre: primaryAssignment?.ramaNombre ?? ramaNameById(ramaId),
        curp: jugador.curp,
        fechaNacimiento: jugador.fechaNacimiento,
    };
};

const loadCatalogs = async () => {
    loadingCatalogs.value = true;
    try {
        const [ramasResponse, categoriasResponse] = await Promise.all([
            selectRamasPorEquipo(props.torneoId, props.equipoId),
            selectCategoriasPorEquipo(props.torneoId, props.equipoId),
        ]);
        ramas.value = ramasResponse;
        categorias.value = categoriasResponse;
    } finally {
        loadingCatalogs.value = false;
    }
};

const loadPlayers = async () => {
    if (!props.equipoId) {
        rawPlayers.value = [];
        players.value = [];
        return;
    }
    loadingPlayers.value = true;
    try {
        const response = await fetchJugadores({
            equipoId: props.equipoId,
            torneoId: props.torneoId ?? undefined,
        });
        rawPlayers.value = response;
        players.value = response.map(mapJugadorToPlayer);
    } finally {
        loadingPlayers.value = false;
    }
};

watch(
    () => [props.equipoId, props.torneoId],
    async () => {
        await loadCatalogs();
        await loadPlayers();
    },
    { immediate: true }
);

const handlePlayerCreated = async (payload: JugadorRequest) => {
    savingPlayer.value = true;
    try {
        await createJugador(payload);
        await loadPlayers();
        activeTab.value = "list";
    } finally {
        savingPlayer.value = false;
    }
};

const handleDeletePlayer = async (playerId: string) => {
    const jugadorId = Number(playerId);
    if (!jugadorId) return;
    await deleteJugador(jugadorId);
    await loadPlayers();
};

const handleAssignPlayer = async (
    playerId: string,
    teamId: string,
    ramaId: string
) => {
    const jugadorId = Number(playerId);
    if (!jugadorId) return;
    const jugador = rawPlayers.value.find(
        (item) => item.jugadorId === jugadorId
    );
    if (!jugador) return;

    const primaryAssignment = jugador.equipoJugador?.[0] ?? {
        equipoJugadorId: 0,
        posicionTipoTorneoId: 0,
        num: 0,
        jugador: `${jugador.nombre} ${jugador.apellidoPaterno ?? ""} ${
            jugador.apellidoMaterno ?? ""
        }`.trim(),
    };

    const updatedPayload: JugadorRequest = {
        ...jugador,
        equipoJugador: [
            {
                ...primaryAssignment,
                categoriaId: Number(teamId) || 0,
                ramaId: Number(ramaId) || 0,
            },
        ],
    };

    await updateJugador(jugadorId, updatedPayload);
    await loadPlayers();
};
</script>
