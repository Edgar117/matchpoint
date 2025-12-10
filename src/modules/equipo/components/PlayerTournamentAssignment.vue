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
                    
                    <div
                        v-if="errorMessage"
                        class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-3"
                    >
                        <p class="text-sm text-red-600 flex-1">{{ errorMessage }}</p>
                        <button
                            type="button"
                            @click="clearErrorMessage"
                            class="flex-shrink-0 p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Cerrar"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
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
                                        @change="validateAssignment(torneo.torneoId, index)"
                                        :class="[
                                            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm',
                                            isDuplicateAssignment(torneo.torneoId, index)
                                                ? 'border-red-500'
                                                : 'border-slate-300'
                                        ]"
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
                                        @change="validateAssignment(torneo.torneoId, index)"
                                        :class="[
                                            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm',
                                            isDuplicateAssignment(torneo.torneoId, index)
                                                ? 'border-red-500'
                                                : 'border-slate-300'
                                        ]"
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
                                    <p
                                        v-if="isDuplicateAssignment(torneo.torneoId, index)"
                                        class="text-xs text-red-600 mt-1"
                                    >
                                        Esta combinación de rama y categoría ya está asignada
                                    </p>
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
                                            v-for="posicion in posicionesFiltradas"
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
const { asignarJugadorATorneos, fetchJugadores } = useJugadorService();

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

// Almacenar las ramas y categorías disponibles del jugador
const jugadorRamasDisponibles = ref<number[]>([]);
const jugadorCategoriasDisponibles = ref<number[]>([]);
const jugadorPosicionDefault = ref<number | null>(null);
const errorMessage = ref<string>("");

// Filtrar posiciones para mostrar solo la que el jugador tiene configurada
const posicionesFiltradas = computed(() => {
    if (!jugadorPosicionDefault.value) {
        return posiciones.value;
    }
    // Mostrar solo la posición que el jugador tiene configurada
    return posiciones.value.filter(
        (pos) => pos.posicionTipoTorneoId === jugadorPosicionDefault.value
    );
});

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
        // Seleccionar: agregar una asignación vacía con la posición por defecto del jugador
        torneoAssignments.value[torneoId] = [
            {
                ramaId: null,
                categoriaId: null,
                posicionTipoDeporteId: jugadorPosicionDefault.value,
                num: null,
            },
        ];
        // Cargar ramas y categorías para este torneo
        loadRamasYCategorias(torneoId);
    }
};

// Validar si ya existe una asignación con la misma rama y categoría
const hasDuplicateAssignment = (
    torneoId: number,
    ramaId: number | null,
    categoriaId: number | null,
    excludeIndex?: number
): boolean => {
    if (!ramaId || !categoriaId) return false;
    
    const assignments = torneoAssignments.value[torneoId] || [];
    return assignments.some((assignment, index) => {
        if (excludeIndex !== undefined && index === excludeIndex) return false;
        return (
            assignment.ramaId === ramaId &&
            assignment.categoriaId === categoriaId
        );
    });
};

// Verificar si una asignación específica es duplicada
const isDuplicateAssignment = (
    torneoId: number,
    index: number
): boolean => {
    const assignments = torneoAssignments.value[torneoId] || [];
    const assignment = assignments[index];
    if (!assignment) return false;
    
    return hasDuplicateAssignment(
        torneoId,
        assignment.ramaId,
        assignment.categoriaId,
        index
    );
};

// Validar asignación cuando cambia rama o categoría
const validateAssignment = (torneoId: number, index: number) => {
    // Pequeño delay para asegurar que el v-model se actualizó
    setTimeout(() => {
        const isDuplicate = isDuplicateAssignment(torneoId, index);
        if (isDuplicate) {
            errorMessage.value =
                "No se puede agregar la misma combinación de rama y categoría";
        } else {
            // Verificar si hay otros duplicados
            const assignments = torneoAssignments.value[torneoId] || [];
            const hasOtherDuplicates = assignments.some((assignment, idx) => {
                if (idx === index) return false;
                return hasDuplicateAssignment(
                    torneoId,
                    assignment.ramaId,
                    assignment.categoriaId,
                    idx
                );
            });
            
            if (!hasOtherDuplicates) {
                errorMessage.value = "";
            }
        }
    }, 0);
};

// Limpiar mensaje de error
const clearErrorMessage = () => {
    errorMessage.value = "";
};

const addAssignment = (torneoId: number) => {
    if (!torneoAssignments.value[torneoId]) {
        torneoAssignments.value[torneoId] = [];
    }
    torneoAssignments.value[torneoId].push({
        ramaId: null,
        categoriaId: null,
        posicionTipoDeporteId: jugadorPosicionDefault.value,
        num: null,
    });
};

const removeAssignment = (torneoId: number, index: number) => {
    if (torneoAssignments.value[torneoId]) {
        torneoAssignments.value[torneoId].splice(index, 1);
        if (torneoAssignments.value[torneoId].length === 0) {
            delete torneoAssignments.value[torneoId];
        }
        // Limpiar mensaje de error si ya no hay duplicados
        errorMessage.value = "";
    }
};

const getTorneoAssignments = (torneoId: number): TorneoAssignment[] => {
    return torneoAssignments.value[torneoId] || [];
};

const getRamasPorTorneo = (torneoId: number): RamaEquipo[] => {
    const ramasTorneo = ramasPorTorneo.value[torneoId] || [];
    
    // Si el jugador no tiene ramas disponibles, retornar todas las del torneo
    if (jugadorRamasDisponibles.value.length === 0) {
        return ramasTorneo;
    }
    
    // Filtrar solo las ramas que el jugador tiene disponibles
    return ramasTorneo.filter((rama) =>
        jugadorRamasDisponibles.value.includes(rama.ramaId)
    );
};

const getCategoriasPorTorneo = (
    torneoId: number,
    ramaId?: number | null
): CategoriaEquipo[] => {
    const categoriasTorneo = categoriasPorTorneo.value[torneoId] || [];
    
    // Filtrar por rama si está seleccionada
    let categoriasFiltradas = categoriasTorneo;
    if (ramaId) {
        categoriasFiltradas = categoriasFiltradas.filter(
            (c) => !c.ramaId || c.ramaId === ramaId
        );
    }
    
    // Si el jugador no tiene categorías disponibles, retornar las filtradas por rama
    if (jugadorCategoriasDisponibles.value.length === 0) {
        return categoriasFiltradas;
    }
    
    // Filtrar solo las categorías que el jugador tiene disponibles Y que están en el torneo
    return categoriasFiltradas.filter((categoria) =>
        jugadorCategoriasDisponibles.value.includes(categoria.categoriaId)
    );
};

const loadTorneos = async () => {
    if (!props.equipoId) return;

    loadingTorneos.value = true;
    try {
        const torneosData = await obtenerTorneosPorEquipo(
            props.equipoId,
            props.torneoId ?? null,
            props.jugadorId ?? null
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
        if (!assignments || assignments.length === 0) return false;
        
        // Verificar que todos los campos estén completos
        const allFieldsComplete = assignments.every(
            (a) =>
                a.ramaId !== null &&
                a.categoriaId !== null &&
                a.posicionTipoDeporteId !== null &&
                a.num !== null &&
                a.num >= 0
        );
        
        if (!allFieldsComplete) return false;
        
        // Verificar que no haya duplicados (misma rama + misma categoría)
        const hasDuplicates = assignments.some((assignment, index) =>
            hasDuplicateAssignment(
                torneoId,
                assignment.ramaId,
                assignment.categoriaId,
                index
            )
        );
        
        return !hasDuplicates;
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

// Cargar datos del jugador para obtener sus ramas y categorías disponibles
const loadJugadorData = async () => {
    if (!props.equipoId || !props.jugadorId) return;
    
    try {
        const jugadores = await fetchJugadores({
            equipoId: props.equipoId,
            torneoId: props.torneoId ?? undefined,
        });
        
        const jugador = jugadores.find((j) => j.jugadorId === props.jugadorId);
        
        if (jugador && jugador.equipoJugador) {
            // Extraer las ramas únicas que el jugador tiene disponibles
            const ramasUnicas = new Set<number>();
            jugador.equipoJugador.forEach((asignacion) => {
                if (asignacion.ramaId && asignacion.ramaId > 0) {
                    ramasUnicas.add(asignacion.ramaId);
                }
            });
            jugadorRamasDisponibles.value = Array.from(ramasUnicas);
            
            // Extraer las categorías únicas que el jugador tiene disponibles
            const categoriasUnicas = new Set<number>();
            jugador.equipoJugador.forEach((asignacion) => {
                if (asignacion.categoriaId && asignacion.categoriaId > 0) {
                    categoriasUnicas.add(asignacion.categoriaId);
                }
            });
            jugadorCategoriasDisponibles.value = Array.from(categoriasUnicas);
            
            // Obtener la posición del jugador (tomar la primera asignación que tenga posición)
            const primeraAsignacionConPosicion = jugador.equipoJugador.find(
                (asignacion) =>
                    asignacion.posicionTipoTorneoId &&
                    asignacion.posicionTipoTorneoId > 0
            );
            if (primeraAsignacionConPosicion) {
                jugadorPosicionDefault.value =
                    primeraAsignacionConPosicion.posicionTipoTorneoId;
            }
        }
    } catch (error) {
        console.error("Error loading player data:", error);
    }
};

// Cargar datos al montar
onMounted(async () => {
    await loadJugadorData();
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
