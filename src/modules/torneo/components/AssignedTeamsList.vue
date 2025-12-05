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
                        v-if="team.categoriasDetalle && team.categoriasDetalle.length > 0"
                        class="pt-2 border-t border-slate-100"
                    >
                        <p class="text-xs text-slate-500 mb-2">Categorías:</p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="categoria in team.categoriasDetalle"
                                :key="categoria.categoriaId"
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                            >
                                {{ categoria.categoria }}
                            </span>
                        </div>
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

                    <div class="flex gap-2 mt-4">
                        <button
                            @click="handleViewParticipants(team)"
                            class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Users class="w-4 h-4" />
                            Ver Participantes
                        </button>
                    <button
                        @click="handleUnassignTeam(team)"
                            class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        <UserMinus class="w-4 h-4" />
                        Remover del Torneo
                    </button>
                </div>
            </div>
        </div>
        </div>

        <!-- Confirmation Dialog for Removing Participant -->
        <v-overlay v-model="showRemoveParticipantDialog">
            <div class="flex items-center justify-center h-screen w-screen">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden mx-4">
                    <div class="p-6">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                            <AlertTriangle class="w-8 h-8 text-red-600" />
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 text-center mb-2">
                            ¿Eliminar Participante?
                        </h3>
                        <p class="text-slate-600 text-center mb-1">
                            Estás a punto de eliminar a
                        </p>
                        <p class="text-slate-900 font-semibold text-center mb-4">
                            {{ participantToRemove?.nombre }} {{ participantToRemove?.apellidoPaterno }}
                        </p>
                        <p class="text-sm text-slate-500 text-center mb-6">
                            Esta acción no se puede deshacer. El participante será removido del torneo.
                        </p>
                        <div class="flex gap-3">
                            <button
                                @click="showRemoveParticipantDialog = false"
                                class="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                @click="confirmRemoveParticipant"
                                class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <Trash2 class="w-4 h-4" />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </v-overlay>

        <!-- Confirmation Dialog for Unassigning Team -->
        <v-overlay v-model="showUnassignTeamDialog">
            <div class="flex items-center justify-center h-screen w-screen">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden mx-4">
                    <div class="p-6">
                        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
                            <AlertTriangle class="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 text-center mb-2">
                            ¿Remover Equipo del Torneo?
                        </h3>
                        <p class="text-slate-600 text-center mb-1">
                            Estás a punto de remover el equipo
                        </p>
                        <p class="text-slate-900 font-semibold text-center mb-4">
                            {{ teamToUnassign?.nombre }}
                        </p>
                        <p class="text-sm text-slate-500 text-center mb-6">
                            Esta acción removerá el equipo y todos sus participantes del torneo. Esta acción no se puede deshacer.
                        </p>
                        <div class="flex gap-3">
                            <button
                                @click="showUnassignTeamDialog = false"
                                class="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                @click="confirmUnassignTeam"
                                class="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <UserMinus class="w-4 h-4" />
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </v-overlay>

        <!-- Participants Modal -->
        <v-overlay v-model="showParticipantsModal">
            <div class="flex items-center justify-center h-screen w-screen p-4">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <!-- Modal Header -->
                <div class="p-6 bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-2xl font-bold text-white">
                                Participantes del Equipo
                            </h3>
                            <p class="text-white/80 text-sm mt-1">
                                {{ selectedTeam?.nombre || 'Equipo' }}
                            </p>
                        </div>
                        <button
                            @click="closeParticipantsModal"
                            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        >
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Modal Body -->
                <div class="flex-1 overflow-y-auto p-6">
                    <!-- Loading State -->
                    <div v-if="loadingParticipants" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p class="mt-4 text-slate-600">Cargando participantes...</p>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-else-if="participants.length === 0"
                        class="text-center py-12 bg-slate-50 rounded-lg border border-slate-200"
                    >
                        <Users class="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p class="text-slate-600 font-medium">No hay participantes asignados</p>
                        <p class="text-slate-500 text-sm mt-1">
                            Este equipo no tiene participantes en el torneo
                        </p>
                    </div>

                    <!-- Participants List -->
                    <div v-else class="space-y-3">
                        <div
                            v-for="participant in participants"
                            :key="participant.jugadorId"
                            class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4 flex-1 min-w-0">
                                    <div
                                        v-if="participant.logo"
                                        class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0"
                                    >
                                        <img
                                            :src="`${URLS.COTBUILDER}/api/Jugador/logo/${participant.jugadorId}/${participant.logo}`"
                                            :alt="`${participant.nombre} ${participant.apellidoPaterno}`"
                                            class="w-full h-full object-cover"
                                            @error="handleParticipantImageError"
                                        />
                                    </div>
                                    <div
                                        v-else
                                        class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0"
                                    >
                                        {{ participant.nombre?.charAt(0)?.toUpperCase() || '?' }}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h4 class="font-semibold text-slate-900 truncate">
                                            {{ participant.nombre }} {{ participant.apellidoPaterno }} {{ participant.apellidoMaterno }}
                                        </h4>
                                        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-600">
                                            <span v-if="participant.curp">
                                                CURP: {{ participant.curp }}
                                            </span>
                                            <span v-if="participant.fechaNacimiento">
                                                Nacimiento: {{ formatDate(participant.fechaNacimiento) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    @click="handleRemoveParticipant(participant)"
                                    class="ml-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex-shrink-0"
                                >
                                    <Trash2 class="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserCheck, CheckCircle, UserMinus, Users, X, Trash2, AlertTriangle } from "lucide-vue-next";
import { URLS } from "@/helpers/constants";
import { useTemplateUI } from "@/store/templateUI";
import { useTorneoService, type EquipoConCategorias, type JugadorTorneo } from "../composables/useTorneoService";

interface IProps {
    teams: EquipoConCategorias[];
    isLoading: boolean;
    torneoId?: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(["refresh"]);

const { handleShowSnackbar } = useTemplateUI();
const { getJugadoresTorneo, removerJugadorTorneo, desasignarEquipoTorneo } = useTorneoService();

const imageErrors = ref<Set<number>>(new Set());
const showParticipantsModal = ref(false);
const loadingParticipants = ref(false);
const participants = ref<JugadorTorneo[]>([]);
const selectedTeam = ref<EquipoConCategorias | null>(null);
const participantImageErrors = ref<Set<number>>(new Set());
const showRemoveParticipantDialog = ref(false);
const participantToRemove = ref<JugadorTorneo | null>(null);
const showUnassignTeamDialog = ref(false);
const teamToUnassign = ref<EquipoConCategorias | null>(null);

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const equipoId = parseInt(img.src.split("/").slice(-2, -1)[0]);
    if (equipoId) {
        imageErrors.value.add(equipoId);
    }
};

const handleParticipantImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const jugadorId = parseInt(img.src.split("/").slice(-2, -1)[0]);
    if (jugadorId) {
        participantImageErrors.value.add(jugadorId);
    }
};

const handleViewParticipants = async (team: EquipoConCategorias) => {
    if (!props.torneoId) {
        handleShowSnackbar({
            text: "ID del torneo no disponible",
            type: "error",
            valueModel: true,
        });
        return;
    }

    selectedTeam.value = team;
    showParticipantsModal.value = true;
    loadingParticipants.value = true;
    participants.value = [];

    try {
        const jugadores = await getJugadoresTorneo({
            TorneoId: props.torneoId,
            EquipoId: team.equipoId,
            SortColumn: "nombre",
            Offset: 0,
            Next_Rows: 100,
            SortDirection: "ASC",
        });
        participants.value = jugadores;
    } catch (error) {
        handleShowSnackbar({
            text: "Error al cargar los participantes",
            type: "error",
            valueModel: true,
        });
    } finally {
        loadingParticipants.value = false;
    }
};

const closeParticipantsModal = () => {
    showParticipantsModal.value = false;
    selectedTeam.value = null;
    participants.value = [];
};

const handleRemoveParticipant = (participant: JugadorTorneo) => {
    participantToRemove.value = participant;
    showRemoveParticipantDialog.value = true;
};

const confirmRemoveParticipant = async () => {
    if (!props.torneoId || !selectedTeam.value || !participantToRemove.value) {
        return;
    }

    showRemoveParticipantDialog.value = false;
    const participant = participantToRemove.value;
    participantToRemove.value = null;

    try {
        const success = await removerJugadorTorneo(
            participant.jugadorId,
            selectedTeam.value.equipoId,
            props.torneoId
        );

        if (success) {
            // Remove participant from local list
            participants.value = participants.value.filter(
                (p) => p.jugadorId !== participant.jugadorId
            );
        }
    } catch (error) {
        // Error already handled in the service
    }
};

const handleUnassignTeam = (team: EquipoConCategorias) => {
    if (!props.torneoId) {
    handleShowSnackbar({
            text: "ID del torneo no disponible",
            type: "error",
        valueModel: true,
    });
        return;
    }

    teamToUnassign.value = team;
    showUnassignTeamDialog.value = true;
};

const confirmUnassignTeam = async () => {
    if (!props.torneoId || !teamToUnassign.value) {
        return;
    }

    showUnassignTeamDialog.value = false;
    const team = teamToUnassign.value;
    teamToUnassign.value = null;

    try {
        const success = await desasignarEquipoTorneo(team.equipoId, props.torneoId);
        if (success) {
            emit("refresh");
        }
    } catch (error) {
        // Error already handled in the service
    }
};

const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return dateString;
    }
};
</script>

