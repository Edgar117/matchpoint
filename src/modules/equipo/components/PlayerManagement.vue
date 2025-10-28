<template>
    <v-dialog
        v-model="modelValue"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <div
            class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6"
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
                                    Torneos Participados
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
                            @player-created="handlePlayerCreated"
                        />
                        <PlayerList
                            v-if="activeTab === 'list'"
                            :players="players"
                            @delete-player="handleDeletePlayer"
                        />
                        <TeamAssignment
                            v-if="activeTab === 'assign'"
                            :players="players"
                            :teams="teams"
                            @assign-player="handleAssignPlayer"
                        />
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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

interface IProps {
    equipoNombre: string;
    modelValue: boolean;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
    equipoNombre: "",
    modelValue: false,
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
    name: string;
    position: string;
    number: number;
    age: number;
    teamId?: string;
}

interface Team {
    id: string;
    name: string;
    color: string;
}

const activeTab = ref<"create" | "list" | "assign">("create");

const tabs = [
    { id: "create" as const, label: "Crear Jugador", icon: UserPlus },
    { id: "list" as const, label: "Lista de Jugadores", icon: List },
    { id: "assign" as const, label: "Asignar a Categoria", icon: UsersRound },
];

const players = ref<Player[]>([
    {
        id: "1",
        name: "Carlos Rodríguez",
        position: "Delantero",
        number: 9,
        age: 25,
        teamId: "team1",
    },
    {
        id: "2",
        name: "María González",
        position: "Defensa",
        number: 4,
        age: 23,
        teamId: "team1",
    },
    {
        id: "3",
        name: "Juan Pérez",
        position: "Mediocampista",
        number: 10,
        age: 27,
    },
]);

const teams = ref<Team[]>([
    { id: "team1", name: "Categoria Juvenil", color: "bg-blue-500" },
    { id: "team2", name: "Categoria JR", color: "bg-red-500" },
    { id: "team3", name: "Veteranos", color: "bg-green-500" },
]);

const assignedPlayersCount = computed(() => {
    return players.value.filter((p) => p.teamId).length;
});

const handlePlayerCreated = (player: Omit<Player, "id">) => {
    const newPlayer: Player = {
        ...player,
        id: Date.now().toString(),
    };
    players.value.push(newPlayer);
    activeTab.value = "list";
};

const handleDeletePlayer = (playerId: string) => {
    players.value = players.value.filter((p) => p.id !== playerId);
};

const handleAssignPlayer = (playerId: string, teamId: string) => {
    const player = players.value.find((p) => p.id === playerId);
    if (player) {
        player.teamId = teamId;
    }
};
</script>
