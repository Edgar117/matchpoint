<template>
    <div class="space-y-6">
        <div v-if="loadingTorneos" class="text-center py-8">
            <p class="text-slate-600">Cargando torneos...</p>
        </div>

        <div
            v-else-if="torneos.length === 0"
            class="text-center py-8 bg-amber-50 rounded-lg border border-amber-200"
        >
            <p class="text-amber-700 font-medium">
                No hay torneos disponibles para este equipo
            </p>
        </div>

        <div v-else class="space-y-4">
            <div
                v-for="torneo in torneos"
                :key="torneo.torneoId"
                class="border border-slate-200 rounded-lg p-4 bg-white"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-lg font-semibold text-slate-900">
                            {{ torneo.nombre }}
                        </h4>
                        <p class="text-sm text-slate-600">
                            {{ torneo.descripcion || "Sin descripción" }}
                        </p>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            :checked="isTorneoSelected(torneo.torneoId)"
                            @change="toggleTorneo(torneo.torneoId)"
                            class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span class="text-sm font-medium text-slate-700"
                            >Asignar</span
                        >
                    </label>
                </div>

                <!-- Asignaciones para este torneo -->
                <div
                    v-if="isTorneoSelected(torneo.torneoId)"
                    class="mt-4 pt-4 border-t border-slate-200"
                >
                    <div class="flex items-center justify-between mb-3">
                        <h5 class="text-sm font-semibold text-slate-700">
                            Asignaciones del jugador
                        </h5>
                        <button
                            type="button"
                            @click="addAssignment(torneo.torneoId)"
                            class="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                            <Plus class="w-4 h-4" />
                            Agregar
                        </button>
                    </div>

                    <div
                        v-if="
                            getTorneoAssignments(torneo.torneoId).length === 0
                        "
                        class="text-center py-4 bg-slate-50 rounded-lg"
                    >
                        <p class="text-sm text-slate-500">
                            No hay asignaciones. Haz clic en "Agregar" para
                            comenzar.
                        </p>
                    </div>

                    <div v-else class="space-y-3">
                        <div
                            v-for="(assignment, index) in getTorneoAssignments(
                                torneo.torneoId
                            )"
                            :key="`${torneo.torneoId}-${index}`"
                            class="bg-slate-50 rounded-lg p-4 border border-slate-200"
                        >
                            <div
                                class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
                            >
                                <div class="md:col-span-3">
                                    <label
                                        class="block text-xs font-medium text-slate-600 mb-2"
                                    >
                                        Rama
                                    </label>
                                    <select
                                        v-model.number="assignment.ramaId"
                                        required
                                        class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option
                                            v-for="rama in getRamasPorTorneo(
                                                torneo.torneoId
                                            )"
                                            :key="rama.ramaId"
                                            :value="rama.ramaId"
                                        >
                                            {{ rama.nombre }}
                                        </option>
                                    </select>
                                </div>

                                <div class="md:col-span-3">
                                    <label
                                        class="block text-xs font-medium text-slate-600 mb-2"
                                    >
                                        Categoría
                                    </label>
                                    <select
                                        v-model.number="assignment.categoriaId"
                                        required
                                        class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option
                                            v-for="categoria in getCategoriasPorTorneo(
                                                torneo.torneoId,
                                                assignment.ramaId
                                            )"
                                            :key="categoria.categoriaId"
                                            :value="categoria.categoriaId"
                                        >
                                            {{ categoria.categoria }}
                                        </option>
                                    </select>
                                </div>

                                <div class="md:col-span-2">
                                    <label
                                        class="block text-xs font-medium text-slate-600 mb-2"
                                    >
                                        Posición
                                    </label>
                                    <select
                                        v-model.number="
                                            assignment.posicionTipoDeporteId
                                        "
                                        required
                                        class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option
                                            v-for="posicion in posiciones"
                                            :key="posicion.posicionTipoTorneoId"
                                            :value="
                                                posicion.posicionTipoTorneoId
                                            "
                                        >
                                            {{ posicion.posicion }}
                                        </option>
                                    </select>
                                </div>

                                <div class="md:col-span-2">
                                    <label
                                        class="block text-xs font-medium text-slate-600 mb-2"
                                    >
                                        Número
                                    </label>
                                    <input
                                        v-model.number="assignment.num"
                                        type="number"
                                        required
                                        min="0"
                                        max="99"
                                        class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                        placeholder="Ej: 23"
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <button
                                        type="button"
                                        @click="
                                            removeAssignment(
                                                torneo.torneoId,
                                                index
                                            )
                                        "
                                        class="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Plus, Trash2 } from "lucide-vue-next";
import { useEquipoService } from "../composables/useEquipoService";
import { useJugadorService } from "../composables/useJugadorService";
import type { RamaEquipo, CategoriaEquipo } from "@/interfaces/Jugador";

interface TorneoEquipo {
    torneoId: number;
    nombre: string;
    descripcion?: string;
    equipoId: number;
    tipoDeporteId: number;
}

interface TorneoAssignment {
    ramaId: number | null;
    categoriaId: number | null;
    posicionTipoDeporteId: number | null;
    num: number | null;
}

interface TorneoAssignmentMap {
    [torneoId: number]: TorneoAssignment[];
}

const props = defineProps<{
    equipoId: number;
    jugadorId: number;
    jugadorNombre: string;
    torneoId?: number | null;
    tipoDeporteId?: number | null;
}>();

const emit = defineEmits<{
    assigned: [];
    cancel: [];
}>();

const {
    obtenerTorneosPorEquipo,
    selectRamasPorEquipo,
    selectCategoriasPorEquipo,
    selectPosicionesTipoTorneo,
} = useEquipoService();
const { asignarJugadorATorneos } = useJugadorService();

const torneos = ref<TorneoEquipo[]>([]);
const loadingTorneos = ref(false);
const torneoAssignments = ref<TorneoAssignmentMap>({});
const ramasPorTorneo = ref<Record<number, RamaEquipo[]>>({});
const categoriasPorTorneo = ref<Record<number, CategoriaEquipo[]>>({});
const posiciones = ref<
    Array<{
        posicionTipoTorneoId: number;
        tipoTorneoId: number;
        tipoTorneo: string;
        posicion: string;
        descripcion: string;
    }>
>([]);

const isTorneoSelected = (torneoId: number): boolean => {
    return (
        torneoAssignments.value[torneoId] !== undefined &&
        torneoAssignments.value[torneoId].length > 0
    );
};

const toggleTorneo = (torneoId: number) => {
    if (isTorneoSelected(torneoId)) {
        // Deseleccionar: eliminar todas las asignaciones
        delete torneoAssignments.value[torneoId];
    } else {
        // Seleccionar: agregar una asignación vacía
        torneoAssignments.value[torneoId] = [
            {
                ramaId: null,
                categoriaId: null,
                posicionTipoDeporteId: null,
                num: null,
            },
        ];
        // Cargar ramas y categorías para este torneo
        loadRamasYCategorias(torneoId);
    }
};

const addAssignment = (torneoId: number) => {
    if (!torneoAssignments.value[torneoId]) {
        torneoAssignments.value[torneoId] = [];
    }
    torneoAssignments.value[torneoId].push({
        ramaId: null,
        categoriaId: null,
        posicionTipoDeporteId: null,
        num: null,
    });
};

const removeAssignment = (torneoId: number, index: number) => {
    if (torneoAssignments.value[torneoId]) {
        torneoAssignments.value[torneoId].splice(index, 1);
        if (torneoAssignments.value[torneoId].length === 0) {
            delete torneoAssignments.value[torneoId];
        }
    }
};

const getTorneoAssignments = (torneoId: number): TorneoAssignment[] => {
    return torneoAssignments.value[torneoId] || [];
};

const getRamasPorTorneo = (torneoId: number): RamaEquipo[] => {
    return ramasPorTorneo.value[torneoId] || [];
};

const getCategoriasPorTorneo = (
    torneoId: number,
    ramaId?: number | null
): CategoriaEquipo[] => {
    const categorias = categoriasPorTorneo.value[torneoId] || [];
    if (!ramaId) return categorias;
    return categorias.filter((c) => !c.ramaId || c.ramaId === ramaId);
};

const loadTorneos = async () => {
    if (!props.equipoId) return;

    loadingTorneos.value = true;
    try {
        const torneosData = await obtenerTorneosPorEquipo(
            props.equipoId,
            props.torneoId ?? null
        );
        torneos.value = torneosData.map((t: any) => ({
            torneoId: t.torneoId,
            nombre: t.nombre,
            descripcion: t.descripcion,
            equipoId: t.equipoId,
            tipoDeporteId: t.tipoDeporteId,
        }));
    } finally {
        loadingTorneos.value = false;
    }
};

const loadRamasYCategorias = async (torneoId: number) => {
    if (ramasPorTorneo.value[torneoId] && categoriasPorTorneo.value[torneoId]) {
        return; // Ya están cargadas
    }

    try {
        const [ramas, categorias] = await Promise.all([
            selectRamasPorEquipo(torneoId, props.equipoId),
            selectCategoriasPorEquipo(torneoId, props.equipoId),
        ]);
        ramasPorTorneo.value[torneoId] = ramas;
        categoriasPorTorneo.value[torneoId] = categorias;
    } catch (error) {
        console.error("Error loading ramas and categorias:", error);
    }
};

const loadPosiciones = async () => {
    if (!props.tipoDeporteId) return;

    try {
        // Necesitamos obtener el tipoTorneoId del primer torneo
        // Por ahora, usaremos tipoDeporteId directamente si está disponible
        const posicionesData = await selectPosicionesTipoTorneo(
            props.tipoDeporteId
        );
        posiciones.value = posicionesData;
    } catch (error) {
        console.error("Error loading posiciones:", error);
    }
};

const canSubmit = computed(() => {
    const selectedTorneos = Object.keys(torneoAssignments.value).map(Number);
    if (selectedTorneos.length === 0) return false;

    return selectedTorneos.every((torneoId) => {
        const assignments = torneoAssignments.value[torneoId];
        return (
            assignments &&
            assignments.length > 0 &&
            assignments.every(
                (a) =>
                    a.ramaId !== null &&
                    a.categoriaId !== null &&
                    a.posicionTipoDeporteId !== null &&
                    a.num !== null &&
                    a.num >= 0
            )
        );
    });
});

const handleSubmit = async () => {
    if (!canSubmit.value || !props.equipoId || !props.jugadorId) return;

    const jugadorTorneo = Object.keys(torneoAssignments.value).map(
        (torneoId) => {
            const torneoIdNum = Number(torneoId);
            const assignments = torneoAssignments.value[torneoIdNum];

            return {
                torneoId: torneoIdNum,
                jug: assignments.map((a) => ({
                    ramaId: String(a.ramaId ?? ""),
                    categoriaId: String(a.categoriaId ?? ""),
                    posicionTipoDeporteId: String(
                        a.posicionTipoDeporteId ?? ""
                    ),
                    num: String(a.num ?? ""),
                    jugador: props.jugadorNombre,
                })),
            };
        }
    );

    try {
        await asignarJugadorATorneos({
            equipoId: props.equipoId,
            jugadorId: props.jugadorId,
            jugadorTorneo,
        });
        emit("assigned");
    } catch (error) {
        // El error ya se maneja en el servicio
    }
};

// Cargar datos al montar
onMounted(async () => {
    await loadTorneos();
    await loadPosiciones();
});

// Cargar ramas y categorías cuando se selecciona un torneo
watch(
    () => torneoAssignments.value,
    (newVal) => {
        Object.keys(newVal).forEach((torneoId) => {
            const torneoIdNum = Number(torneoId);
            if (newVal[torneoIdNum] && newVal[torneoIdNum].length > 0) {
                loadRamasYCategorias(torneoIdNum);
            }
        });
    },
    { deep: true }
);

// Exponer método para el componente padre
defineExpose({
    handleSubmit,
    canSubmit,
});
</script>
