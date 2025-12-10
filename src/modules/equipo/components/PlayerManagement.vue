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
                            :tipo-deporte-id="tipoDeporteId"
                            :ramas="ramas"
                            :categorias="categorias"
                            :is-saving="savingPlayer"
                            @submit="handlePlayerCreated"
                        />
                        <PlayerList
                            v-if="activeTab === 'list'"
                            :players="players"
                            :is-loading="loadingPlayers"
                            :ramas="ramas"
                            :categorias="categorias"
                            :equipo-id="props.equipoId"
                            :torneo-id="props.torneoId"
                            :tipo-deporte-id="tipoDeporteId"
                            @delete-player="handleDeletePlayer"
                            @edit-player="handleEditPlayer"
                            @refresh="loadPlayers"
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

    <!-- Modal de Edición de Jugador -->
    <v-dialog v-model="showEditModal" max-width="900px" persistent scrollable>
        <v-card class="rounded-xl">
            <v-card-title class="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-4">
                <div class="flex items-center justify-between w-full">
                    <h3 class="text-xl font-bold">Editar Jugador</h3>
                    <v-btn
                        icon
                        variant="text"
                        color="white"
                        @click="closeEditModal"
                        class="hover:bg-white/20"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>

            <v-card-text class="px-6 py-6">
                <PlayerForm
                    v-if="editingPlayer"
                    :equipo-id="props.equipoId"
                    :torneo-id="props.torneoId"
                    :tipo-deporte-id="tipoDeporteId"
                    :ramas="ramas"
                    :categorias="categorias"
                    :is-saving="savingPlayer"
                    :edit-player="editingPlayer"
                    @submit="handlePlayerUpdated"
                />
            </v-card-text>
        </v-card>
    </v-dialog>

    <!-- Modal de Confirmación de Eliminación -->
    <v-dialog v-model="showDeleteModal" max-width="500px" persistent>
        <v-card class="rounded-xl">
            <v-card-text class="px-6 py-6">
                <div class="flex flex-col items-center text-center">
                    <!-- Ícono de advertencia -->
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    
                    <!-- Título -->
                    <h3 class="text-xl font-bold text-slate-900 mb-3">
                        ¿Eliminar Participante?
                    </h3>
                    
                    <!-- Mensaje -->
                    <p class="text-slate-600 mb-2">
                        Estás a punto de eliminar a
                    </p>
                    <p class="text-lg font-bold text-slate-900 mb-4">
                        {{ playerToDelete?.name || 'este participante' }}
                    </p>
                    
                    <!-- Advertencia -->
                    <p class="text-sm text-slate-500 mb-6">
                        Esta acción no se puede deshacer. El participante será removido del torneo.
                    </p>
                    
                    <!-- Botones -->
                    <div class="flex gap-3 w-full">
                        <v-btn
                            variant="outlined"
                            color="grey"
                            @click="showDeleteModal = false"
                            class="flex-1"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="red"
                            variant="flat"
                            @click="confirmDelete"
                            class="flex-1"
                        >
                            <Trash2 class="w-4 h-4 mr-2" />
                            Eliminar
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-card>
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
    Trash2,
} from "lucide-vue-next";
import PlayerForm from "./PlayerForm.vue";
import PlayerList from "./PlayerList.vue";
import TeamAssignment from "./TeamAssignment.vue";
import { useEquipoService } from "../composables/useEquipoService";
import { useJugadorService } from "../composables/useJugadorService";
import { useEquipoStore } from "../store/state";
import { storeToRefs } from "pinia";
import type {
    CategoriaEquipo,
    Jugador,
    JugadorRequest,
    RamaEquipo,
    EquipoJugadorAsignacion,
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
    age: number | null;
    curp?: string;
    fechaNacimiento?: string | null;
    logo?: string;
    extensionImg?: string;
    equipoJugador: EquipoJugadorAsignacion[]; // Todas las asignaciones del jugador
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
];

const { selectCategoriasPorEquipo, selectRamasPorEquipo } =
    useEquipoService();
const { fetchJugadores, createJugador, updateJugador, deleteJugador } =
    useJugadorService();

// Agregar esto para obtener tipoDeporteId del store
const { fields } = storeToRefs(useEquipoStore());
const tipoDeporteId = computed(() => fields.value.tipoDeporteId);

const categorias = ref<CategoriaEquipo[]>([]);
const ramas = ref<RamaEquipo[]>([]);
const rawPlayers = ref<Jugador[]>([]);
const players = ref<Player[]>([]);
const loadingCatalogs = ref(false);
const loadingPlayers = ref(false);
const savingPlayer = ref(false);
const showEditModal = ref(false);
const editingPlayer = ref<{
    jugadorId: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    curp: string;
    fechaNacimiento: string | null;
    logo?: string;
    extensionImg?: string;
    equipoJugador: Array<{
        equipoJugadorId: number;
        ramaId: number;
        categoriaId: number;
        posicionTipoTorneoId: number;
        num: number;
    }>;
} | null>(null);
const showDeleteModal = ref(false);
const playerToDelete = ref<{ jugadorId: number; name: string } | null>(null);

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
    players.value.filter((player) => player.equipoJugador && player.equipoJugador.length > 0).length
);

const categoriaNameById = (categoriaId?: number | null) => {
    if (!categoriaId || categoriaId === 0) return "";
    const categoria = categorias.value.find(
        (c) => c.categoriaId === categoriaId
    );
    return categoria?.categoria ?? "";
};

const ramaNameById = (ramaId?: number | null) => {
    if (!ramaId || ramaId === 0) return "";
    const rama = ramas.value.find((r) => r.ramaId === ramaId);
    return rama?.nombre ?? "";
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
    const fullName = [jugador.nombre, jugador.apellidoPaterno, jugador.apellidoMaterno]
        .filter(Boolean)
        .join(" ")
        .trim();

    // Enriquecer las asignaciones con nombres de categoría y rama si no los tienen
    const enrichedAsignaciones: EquipoJugadorAsignacion[] = 
        (jugador.equipoJugador || []).map((asignacion) => ({
            ...asignacion,
            categoriaNombre: asignacion.categoriaNombre ?? categoriaNameById(asignacion.categoriaId),
            ramaNombre: asignacion.ramaNombre ?? ramaNameById(asignacion.ramaId),
        }));

    // Retornar un solo registro por jugador con todas sus asignaciones
    return {
        id: `jugador-${jugador.jugadorId}`,
        jugadorId: jugador.jugadorId,
        name: fullName || jugador.nombre,
        age: calculateAge(jugador.fechaNacimiento),
        curp: jugador.curp,
        fechaNacimiento: jugador.fechaNacimiento,
        logo: jugador.logo,
        extensionImg: jugador.extensionImg,
        equipoJugador: enrichedAsignaciones,
    };
};

const loadCatalogs = async () => {
    if (!props.equipoId) {
        categorias.value = [];
        ramas.value = [];
        return;
    }
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
        // Mapear cada jugador a un solo registro (no expandir por asignaciones)
        players.value = response.map(mapJugadorToPlayer);
    } finally {
        loadingPlayers.value = false;
    }
};

// Cambiar el watcher para cargar cuando se abre el diálogo
watch(
    () => modelValue.value,
    async (isOpen) => {
        if (isOpen) {
            // Cuando se abre el diálogo, cargar catálogos y jugadores
            await loadCatalogs();
            await loadPlayers();
        }
    },
    { immediate: false }
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

const handleDeletePlayer = (playerId: string) => {
    const jugadorId = Number(playerId);
    if (!jugadorId) return;
    
    // Buscar el jugador para mostrar su nombre en la confirmación
    const player = players.value.find(p => p.jugadorId === jugadorId);
    if (!player) return;
    
    // Guardar el jugador a eliminar y mostrar el modal
    playerToDelete.value = {
        jugadorId: player.jugadorId,
        name: player.name
    };
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    if (!playerToDelete.value) return;
    
    const jugadorId = playerToDelete.value.jugadorId;
    
    try {
        await deleteJugador(jugadorId);
        await loadPlayers();
        showDeleteModal.value = false;
        playerToDelete.value = null;
    } catch (error) {
        // El error ya se maneja en el servicio
    }
};

const handleEditPlayer = (player: Player) => {
    // Buscar el jugador completo en rawPlayers para obtener todos los datos
    const jugador = rawPlayers.value.find(
        (item) => item.jugadorId === player.jugadorId
    );
    
    if (!jugador) return;
    
    // Preparar los datos para edición
    editingPlayer.value = {
        jugadorId: jugador.jugadorId,
        nombre: jugador.nombre,
        apellidoPaterno: jugador.apellidoPaterno,
        apellidoMaterno: jugador.apellidoMaterno,
        curp: jugador.curp,
        fechaNacimiento: jugador.fechaNacimiento,
        logo: jugador.logo,
        extensionImg: jugador.extensionImg,
        equipoJugador: jugador.equipoJugador.map((eq) => ({
            equipoJugadorId: eq.equipoJugadorId,
            ramaId: eq.ramaId,
            categoriaId: eq.categoriaId,
            posicionTipoTorneoId: eq.posicionTipoTorneoId,
            num: eq.num,
        })),
    };
    
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
    editingPlayer.value = null;
};

const handlePlayerUpdated = async (payload: JugadorRequest) => {
    if (!editingPlayer.value) return;
    
    savingPlayer.value = true;
    try {
        await updateJugador(editingPlayer.value.jugadorId, payload);
        // Recargar la lista de jugadores para mostrar los cambios
        await loadPlayers();
        // Cerrar el modal de edición
        closeEditModal();
        // Cambiar a la pestaña de lista para que el usuario vea los cambios
        activeTab.value = "list";
    } finally {
        savingPlayer.value = false;
    }
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
