<template>
    <div>
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">
                Equipos Disponibles para Asignar
            </h2>
            <p class="text-slate-600 text-sm">
                Selecciona un equipo para ver sus detalles y asignarlo al torneo
            </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p class="mt-4 text-slate-600">Cargando equipos...</p>
        </div>

        <!-- Empty State -->
        <div
            v-else-if="teams.length === 0"
            class="text-center py-12 bg-slate-50 rounded-lg border border-slate-200"
        >
            <Users class="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p class="text-slate-600 font-medium">No hay equipos disponibles</p>
            <p class="text-slate-500 text-sm mt-1">
                Todos los equipos ya están asignados a este torneo
            </p>
        </div>

        <!-- Autocomplete and Team Details -->
        <div v-else class="space-y-6">
            <!-- Autocomplete -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label class="block text-sm font-medium text-slate-700 mb-3">
                    Seleccionar Equipo
                </label>
                <v-autocomplete
                    v-model="selectedTeam"
                    :items="teams"
                    item-title="nombre"
                    item-value="equipoId"
                    variant="outlined"
                    density="comfortable"
                    placeholder="Buscar equipo..."
                    clearable
                    @update:model-value="handleTeamSelected"
                >
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                            <template v-slot:prepend>
                                <div
                                    v-if="item.raw.logo"
                                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden mr-3"
                                >
                                    <img
                                        :src="`${URLS.COTBUILDER}/api/Equipo/logo/${item.raw.equipoId}/${item.raw.logo}`"
                                        :alt="item.raw.nombre || 'Equipo'"
                                        class="w-full h-full object-cover"
                                        @error="handleImageError"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-3"
                                >
                                    {{ item.raw.nombre?.charAt(0)?.toUpperCase() || '?' }}
                                </div>
                            </template>
                            <v-list-item-title>
                                {{ item.raw.nombre || 'Sin nombre' }}
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="item.raw.entrenador">
                                {{ item.raw.entrenador }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </template>
                </v-autocomplete>
            </div>

            <!-- Selected Team Details -->
            <div
                v-if="selectedTeamData"
                class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
                <!-- Team Header -->
                <div class="p-6 bg-gradient-to-r from-purple-500 to-purple-600">
                    <div class="flex items-center gap-4">
                        <div
                            v-if="selectedTeamData.logo"
                            class="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
                        >
                            <img
                                :src="`${URLS.COTBUILDER}/api/Equipo/logo/${selectedTeamData.equipoId}/${selectedTeamData.logo}`"
                                :alt="selectedTeamData.nombre || 'Equipo'"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            />
                        </div>
                        <div
                            v-else
                            class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                        >
                            {{ selectedTeamData.nombre?.charAt(0)?.toUpperCase() || '?' }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-2xl font-bold text-white mb-1">
                                {{ selectedTeamData.nombre || 'Sin nombre' }}
                            </h3>
                            <p
                                v-if="selectedTeamData.entrenador"
                                class="text-white/90 text-sm"
                            >
                                Entrenador: {{ selectedTeamData.entrenador }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Team Details -->
                <div class="p-6 space-y-6">
                    <!-- Description -->
                    <div v-if="selectedTeamData.descripcion">
                        <h4 class="text-sm font-semibold text-slate-700 mb-2">
                            Descripción
                        </h4>
                        <p class="text-sm text-slate-600">
                            {{ selectedTeamData.descripcion }}
                        </p>
                    </div>

                    <!-- Ramas Disponibles -->
                    <div>
                        <h4 class="text-sm font-semibold text-slate-700 mb-3">
                            Ramas Disponibles
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <div
                                v-if="selectedTeamData.esRamaVaronil"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200"
                            >
                                <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                                <span class="text-sm font-medium text-blue-800">
                                    Varonil
                                </span>
                            </div>
                            <div
                                v-if="selectedTeamData.esRamaFemenil"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 border border-pink-200"
                            >
                                <div class="w-2 h-2 rounded-full bg-pink-600"></div>
                                <span class="text-sm font-medium text-pink-800">
                                    Femenil
                                </span>
                            </div>
                            <div
                                v-if="selectedTeamData.esRamaMixto"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 border border-purple-200"
                            >
                                <div class="w-2 h-2 rounded-full bg-purple-600"></div>
                                <span class="text-sm font-medium text-purple-800">
                                    Mixto
                                </span>
                            </div>
                            <div
                                v-if="!selectedTeamData.esRamaVaronil && !selectedTeamData.esRamaFemenil && !selectedTeamData.esRamaMixto"
                                class="text-sm text-slate-500 italic"
                            >
                                No hay ramas disponibles
                            </div>
                        </div>
                    </div>

                    <!-- Categorías Disponibles -->
                    <div>
                        <h4 class="text-sm font-semibold text-slate-700 mb-3">
                            Categorías Disponibles
                        </h4>
                        <div v-if="loadingCategorias" class="text-center py-4">
                            <div class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                            <p class="mt-2 text-xs text-slate-500">Cargando categorías...</p>
                        </div>
                        <div
                            v-else-if="categorias.length === 0"
                            class="text-sm text-slate-500 italic"
                        >
                            No hay categorías disponibles
                        </div>
                        <div v-else class="flex flex-wrap gap-2">
                            <span
                                v-for="categoria in categorias"
                                :key="categoria.categoriaId"
                                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                            >
                                {{ categoria.categoria }}
                            </span>
                        </div>
                    </div>

                    <!-- Location Info -->
                    <div
                        v-if="selectedTeamData.pais || selectedTeamData.estado || selectedTeamData.poblacion"
                        class="pt-4 border-t border-slate-200"
                    >
                        <h4 class="text-sm font-semibold text-slate-700 mb-2">
                            Ubicación
                        </h4>
                        <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                            <span v-if="selectedTeamData.pais">
                                <strong>País:</strong> {{ selectedTeamData.pais }}
                            </span>
                            <span v-if="selectedTeamData.estado">
                                <strong>Estado:</strong> {{ selectedTeamData.estado }}
                            </span>
                            <span v-if="selectedTeamData.poblacion">
                                <strong>Población:</strong> {{ selectedTeamData.poblacion }}
                            </span>
                        </div>
                    </div>

                    <!-- Assign Button -->
                    <div class="pt-4 border-t border-slate-200">
                        <button
                            @click="handleAssignTeam(selectedTeamData)"
                            :disabled="loadingCategorias"
                            class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <UserPlus class="w-5 h-5" />
                            Asignar al Torneo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Users, UserPlus } from "lucide-vue-next";
import { URLS } from "@/helpers/constants";
import { useEquipoService } from "@/modules/equipo/composables/useEquipoService";
import { useTemplateUI } from "@/store/templateUI";
import type { Equipo } from "@/interfaces/Equipo";
import type { CategoriaEquipo } from "@/interfaces/Jugador";

interface IProps {
    teams: Equipo[];
    isLoading: boolean;
    torneoId?: number;
}

const props = defineProps<IProps>();
defineEmits(["refresh"]);

const { handleShowSnackbar } = useTemplateUI();
const { selectCategoriasPorEquipo } = useEquipoService();

const selectedTeam = ref<number | null>(null);
const selectedTeamData = ref<Equipo | null>(null);
const categorias = ref<CategoriaEquipo[]>([]);
const loadingCategorias = ref(false);
const imageErrors = ref<Set<number>>(new Set());

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const equipoId = parseInt(img.src.split("/").slice(-2, -1)[0]);
    if (equipoId) {
        imageErrors.value.add(equipoId);
    }
};

const handleTeamSelected = async (equipoId: number | null) => {
    if (!equipoId) {
        selectedTeamData.value = null;
        categorias.value = [];
        return;
    }

    // Find the selected team from the teams array
    const team = props.teams.find((t) => t.equipoId === equipoId);
    if (!team) {
        selectedTeamData.value = null;
        categorias.value = [];
        return;
    }

    selectedTeamData.value = team;

    // Load categorías for the selected team
    if (props.torneoId && equipoId) {
        loadingCategorias.value = true;
        try {
            categorias.value = await selectCategoriasPorEquipo(
                props.torneoId,
                equipoId
            );
        } catch (error) {
            handleShowSnackbar({
                text: `Error al cargar las categorías del equipo`,
                type: "error",
                valueModel: true,
            });
            categorias.value = [];
        } finally {
            loadingCategorias.value = false;
        }
    }
};

const handleAssignTeam = async (team: Equipo) => {
    // TODO: Implement API call to assign team to tournament
    // For now, just show a message and refresh
    handleShowSnackbar({
        text: `Funcionalidad de asignación en desarrollo. Equipo: ${team.nombre || 'Sin nombre'}`,
        type: "warning",
        valueModel: true,
    });
    // After implementing the API, call emit('refresh') to reload the lists
    // emit('refresh');
};

// Reset when teams change
watch(
    () => props.teams,
    () => {
        if (selectedTeam.value) {
            const teamExists = props.teams.some(
                (t) => t.equipoId === selectedTeam.value
            );
            if (!teamExists) {
                selectedTeam.value = null;
                selectedTeamData.value = null;
                categorias.value = [];
            }
        }
    }
);
</script>

