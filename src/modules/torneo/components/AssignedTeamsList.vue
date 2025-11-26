<template>
    <div>
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">
                Equipos Asignados al Torneo
            </h2>
            <p class="text-slate-600 text-sm">
                Lista de equipos que ya están asignados a este torneo
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
            <UserCheck class="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p class="text-slate-600 font-medium">No hay equipos asignados</p>
            <p class="text-slate-500 text-sm mt-1">
                Asigna equipos desde la pestaña "Asignar Equipos"
            </p>
        </div>

        <!-- Teams Grid -->
        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <div
                v-for="team in teams"
                :key="team.equipoId"
                class="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden hover:shadow-md transition-shadow"
            >
                <!-- Team Header -->
                <div class="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
                    <div class="flex items-center gap-3">
                        <div
                            v-if="team.logo"
                            class="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden"
                        >
                            <img
                                :src="`${URLS.COTBUILDER}/api/Equipo/logo/${team.equipoId}/${team.logo}`"
                                :alt="team.nombre || 'Equipo'"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            />
                        </div>
                        <div
                            v-else
                            class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg"
                        >
                            {{ team.nombre?.charAt(0)?.toUpperCase() || '?' }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-bold text-white truncate">
                                {{ team.nombre || 'Sin nombre' }}
                            </h3>
                            <p
                                v-if="team.entrenador"
                                class="text-white/80 text-sm truncate"
                            >
                                {{ team.entrenador }}
                            </p>
                        </div>
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                                <CheckCircle class="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Team Details -->
                <div class="p-4 space-y-3">
                    <div v-if="team.descripcion">
                        <p class="text-sm text-slate-600 line-clamp-2">
                            {{ team.descripcion }}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <span
                            v-if="team.esRamaVaronil"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            Varonil
                        </span>
                        <span
                            v-if="team.esRamaFemenil"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                        >
                            Femenil
                        </span>
                        <span
                            v-if="team.esRamaMixto"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                            Mixto
                        </span>
                    </div>

                    <div
                        v-if="team.categorias"
                        class="pt-2 border-t border-slate-100"
                    >
                        <p class="text-xs text-slate-500 mb-1">Categorías:</p>
                        <p class="text-sm text-slate-700 font-medium">
                            {{ typeof team.categorias === 'string' ? team.categorias : (Array.isArray(team.categorias) ? team.categorias.join(', ') : '—') }}
                        </p>
                    </div>

                    <div
                        v-if="team.pais || team.estado || team.poblacion"
                        class="pt-2 border-t border-slate-100"
                    >
                        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span v-if="team.pais">{{ team.pais }}</span>
                            <span v-if="team.estado">{{ team.estado }}</span>
                            <span v-if="team.poblacion">{{ team.poblacion }}</span>
                        </div>
                    </div>

                    <button
                        @click="handleUnassignTeam(team)"
                        class="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        <UserMinus class="w-4 h-4" />
                        Remover del Torneo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserCheck, CheckCircle, UserMinus } from "lucide-vue-next";
import { URLS } from "@/helpers/constants";
import { useTemplateUI } from "@/store/templateUI";
import type { Equipo } from "@/interfaces/Equipo";

interface IProps {
    teams: Equipo[];
    isLoading: boolean;
    torneoId?: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(["refresh"]);

const { handleShowSnackbar } = useTemplateUI();
const imageErrors = ref<Set<number>>(new Set());

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const equipoId = parseInt(img.src.split("/").slice(-2, -1)[0]);
    if (equipoId) {
        imageErrors.value.add(equipoId);
    }
};

const handleUnassignTeam = async (team: Equipo) => {
    // TODO: Implement API call to unassign team from tournament
    // For now, just show a message and refresh
    handleShowSnackbar({
        text: `Funcionalidad de desasignación en desarrollo. Equipo: ${team.nombre || 'Sin nombre'}`,
        type: "info",
        valueModel: true,
    });
    // After implementing the API, call emit('refresh') to reload the lists
    // emit('refresh');
};
</script>

