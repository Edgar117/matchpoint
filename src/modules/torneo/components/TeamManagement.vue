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
                        Gestión de Equipos
                    </h1>
                    <p class="text-slate-600">
                        Asigna equipos al torneo:
                        <span class="font-bold">
                            {{ props.torneoNombre }}
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
                                    Equipos Disponibles
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ unassignedTeams.length }}
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
                                    Equipos Asignados
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ assignedTeams.length }}
                                </p>
                            </div>
                            <div
                                class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center"
                            >
                                <UserCheck class="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-slate-600 mb-1">
                                    Total Equipos
                                </p>
                                <p class="text-3xl font-bold text-slate-900">
                                    {{ unassignedTeams.length + assignedTeams.length }}
                                </p>
                            </div>
                            <div
                                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
                            >
                                <Trophy class="w-6 h-6 text-blue-600" />
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
                        <UnassignedTeamsList
                            v-if="activeTab === 'assign'"
                            :teams="unassignedTeams"
                            :is-loading="loadingUnassigned"
                            :torneo-id="props.torneoId"
                            @refresh="loadTeams"
                        />
                        <AssignedTeamsList
                            v-if="activeTab === 'assigned'"
                            :teams="assignedTeams"
                            :is-loading="loadingAssigned"
                            :torneo-id="props.torneoId"
                            @refresh="loadTeams"
                        />
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Users, UserCheck, Trophy } from "lucide-vue-next";
import UnassignedTeamsList from "./UnassignedTeamsList.vue";
import AssignedTeamsList from "./AssignedTeamsList.vue";
import { useTorneoService, type EquipoConCategorias } from "../composables/useTorneoService";

interface IProps {
    torneoNombre: string;
    modelValue: boolean;
    torneoId?: number;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
    torneoNombre: "",
    modelValue: false,
    torneoId: 0,
});

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});

const activeTab = ref<"assign" | "assigned">("assign");

const tabs = [
    { id: "assign" as const, label: "Asignar Equipos", icon: Users },
    { id: "assigned" as const, label: "Equipos Asignados", icon: UserCheck },
];

const { getEquiposNoAsignados, getEquiposAsignados } = useTorneoService();

const unassignedTeams = ref<EquipoConCategorias[]>([]);
const assignedTeams = ref<EquipoConCategorias[]>([]);
const loadingUnassigned = ref(false);
const loadingAssigned = ref(false);

const loadTeams = async () => {
    if (!props.torneoId) {
        unassignedTeams.value = [];
        assignedTeams.value = [];
        return;
    }

    // Load unassigned teams
    loadingUnassigned.value = true;
    try {
        unassignedTeams.value = await getEquiposNoAsignados({
            TorneoId: props.torneoId,
            SortColumn: "nombre",
            Offset: 0,
            Next_Rows: 100,
            SortDirection: "ASC",
        });
    } finally {
        loadingUnassigned.value = false;
    }

    // Load assigned teams
    loadingAssigned.value = true;
    try {
        assignedTeams.value = await getEquiposAsignados({
            TorneoId: props.torneoId,
            SortColumn: "nombre",
            Offset: 0,
            Next_Rows: 100,
            SortDirection: "ASC",
        });
    } finally {
        loadingAssigned.value = false;
    }
};

// Load teams when dialog opens
watch(
    () => modelValue.value,
    async (isOpen) => {
        if (isOpen) {
            await loadTeams();
        }
    },
    { immediate: false }
);
</script>

