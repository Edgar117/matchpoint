<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <div class="flex items-center gap-2">
                <v-autocomplete
                    label="Torneo"
                    :items="Torneos"
                    variant="underlined"
                    item-value="torneoId"
                    item-title="nombre"
                    v-model="fields.torneoId"
                    :clearable="true"
                    class="flex-1"
                ></v-autocomplete>
                <v-btn
                    v-if="selectedTorneoInfo"
                    icon
                    variant="text"
                    @click="showTorneoInfoDialog = true"
                    color="primary"
                    size="small"
                >
                    <v-icon>mdi-information-outline</v-icon>
                    <v-tooltip activator="parent" location="bottom">
                        Ver información del torneo
                    </v-tooltip>
                </v-btn>
            </div>
            <Field
                name="Descripcion"
                v-model="fields.descripcion"
                rules="required|max:500"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.descripcion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Descripción"
                    counter="500"
                ></v-text-field>
            </Field>
            
            <Field
                name="Clave"
                v-model="fields.clave"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.clave"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Clave"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="RamaId"
                v-model="fields.ramaId"
                rules="required"
                v-slot="{ errorMessage }"
            >
                <div>
                    <label class="text-sm text-gray-700 mb-2 block"
                        >Rama *</label
                    >
                    <div class="space-y-2">
                        <v-checkbox
                            :model-value="fields.ramaId === ramaIdMap.varonil"
                            label="Varonil"
                            color="blue"
                            hide-details
                            density="compact"
                            @update:model-value="selectRama('varonil', $event)"
                        ></v-checkbox>
                        <v-checkbox
                            :model-value="fields.ramaId === ramaIdMap.femenil"
                            label="Femenil"
                            color="pink"
                            hide-details
                            density="compact"
                            @update:model-value="selectRama('femenil', $event)"
                        ></v-checkbox>
                        <v-checkbox
                            :model-value="fields.ramaId === ramaIdMap.mixto"
                            label="Mixto"
                            color="purple"
                            hide-details
                            density="compact"
                            @update:model-value="selectRama('mixto', $event)"
                        ></v-checkbox>
                    </div>
                    <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                    </div>
                </div>
            </Field>

            <v-autocomplete
                label="Categoría"
                :items="Categorias"
                variant="underlined"
                item-value="categoriaId"
                item-title="categoria"
                v-model="fields.categoriaId"
                :disabled="!fields.torneoId"
            ></v-autocomplete>

            <v-autocomplete
                label="Tipo Rol de Juego"
                :items="TipoRolJuegos"
                variant="underlined"
                item-value="tipoRolJuegoId"
                item-title="tipoRolJuego1"
                v-model="fields.tipoRolJuegoId"
            ></v-autocomplete>

            <Field
                name="NumRondas"
                v-model="fields.numRondas"
                rules="required|min_value:1"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.numRondas"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Número de Rondas"
                    type="number"
                ></v-text-field>
            </Field>
        </div>
        <div class="flex justify-end mr-1 py-2 gap-2">
            <CButton color="delete" @click="closeModal"> Cancelar </CButton>
            <CButton
                color="confirm"
                :disabled="!meta.valid"
                @click="handleSave(fields)"
            >
                Guardar
            </CButton>
        </div>
    </div>

    <!-- Dialog de información del torneo -->
    <v-dialog v-model="showTorneoInfoDialog" max-width="600px">
        <v-card v-if="selectedTorneoInfo">
            <v-card-title
                class="bg-primary text-white d-flex justify-space-between align-center"
            >
                <span>Información del Torneo</span>
                <v-btn
                    icon
                    variant="text"
                    @click="showTorneoInfoDialog = false"
                    color="white"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pa-4">
                <div class="space-y-3">
                    <div>
                        <label class="text-sm font-semibold text-gray-700"
                            >Nombre:</label
                        >
                        <p class="text-base">{{ selectedTorneoInfo.nombre }}</p>
                    </div>
                    <div v-if="selectedTorneoInfo.descripcion">
                        <label class="text-sm font-semibold text-gray-700"
                            >Descripción:</label
                        >
                        <p class="text-base">
                            {{ selectedTorneoInfo.descripcion }}
                        </p>
                    </div>
                    <div v-if="selectedTorneoInfo.clave">
                        <label class="text-sm font-semibold text-gray-700"
                            >Clave:</label
                        >
                        <p class="text-base">{{ selectedTorneoInfo.clave }}</p>
                    </div>
                    <div v-if="selectedTorneoInfo.tipoTorneo">
                        <label class="text-sm font-semibold text-gray-700"
                            >Tipo de Torneo:</label
                        >
                        <p class="text-base">
                            {{ selectedTorneoInfo.tipoTorneo }}
                        </p>
                    </div>
                    <div v-if="selectedTorneoInfo.empresa">
                        <label class="text-sm font-semibold text-gray-700"
                            >Empresa:</label
                        >
                        <p class="text-base">
                            {{ selectedTorneoInfo.empresa }}
                        </p>
                    </div>
                    <div
                        v-if="
                            selectedTorneoInfo.fechaInicio ||
                            selectedTorneoInfo.fechaFin
                        "
                    >
                        <label class="text-sm font-semibold text-gray-700"
                            >Fechas:</label
                        >
                        <p class="text-base">
                            <span v-if="selectedTorneoInfo.fechaInicio">
                                Inicio:
                                {{ formatDate(selectedTorneoInfo.fechaInicio) }}
                            </span>
                            <span v-if="selectedTorneoInfo.fechaFin">
                                <br />Fin:
                                {{ formatDate(selectedTorneoInfo.fechaFin) }}
                            </span>
                        </p>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showTorneoInfoDialog = false"
                    >Cerrar</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { useRolJuego } from "../composables/useRolJuego";
import { Field, useForm } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { CButton } from "@core/index";
import { Torneo } from "@/interfaces/Torneo";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

defineProps<IProps>();

const Torneos = ref<any[]>([]);
const Categorias = ref<any[]>([]);
const TipoRolJuegos = ref<any[]>([]);
const selectedTorneoInfo = ref<Torneo | null>(null);
const showTorneoInfoDialog = ref(false);

const {
    fields,
    handleSave,
    selectTipoRolJuego,
    selectTorneosForDropdown,
    selectCategoriasByTorneo,
} = useRolJuego();

// Mapeo de ramas a IDs (ajustar según corresponda)
const ramaIdMap = {
    varonil: 1,
    femenil: 2,
    mixto: 3,
} as const;

const selectRama = (rama: keyof typeof ramaIdMap, isSelected: boolean | null) => {
    if (isSelected) {
        // Solo permitir una selección a la vez
        fields.value.ramaId = ramaIdMap[rama];
    } else {
        // Si se deselecciona, limpiar
        fields.value.ramaId = 0;
    }
};

const formatDate = (date: string | Date | null): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Función para cargar información del torneo y categorías
const loadTorneoInfoAndCategorias = async (torneoId: number | null) => {
    if (torneoId) {
        // Obtener información del torneo seleccionado
        const torneo = Torneos.value.find(
            (t) => t.torneoId === torneoId
        );
        if (torneo) {
            selectedTorneoInfo.value = torneo;
        }
        // Cargar categorias del torneo
        Categorias.value = await selectCategoriasByTorneo(torneoId);
    } else {
        selectedTorneoInfo.value = null;
        Categorias.value = [];
        if (fields.value.categoriaId !== null) {
            fields.value.categoriaId = null;
        }
    }
};

// Watch para cargar categorias cuando se selecciona un torneo
watch(
    () => fields.value.torneoId,
    async (newTorneoId) => {
        // Solo cargar si los torneos ya están cargados
        if (Torneos.value.length > 0 || !newTorneoId) {
            await loadTorneoInfoAndCategorias(newTorneoId);
        }
    }
);

onMounted(async () => {
    TipoRolJuegos.value = await selectTipoRolJuego();
    Torneos.value = await selectTorneosForDropdown();
    
    // Si ya hay un torneoId (modo edición), cargar las categorías después de cargar los torneos
    if (fields.value.torneoId) {
        await loadTorneoInfoAndCategorias(fields.value.torneoId);
    }
});
</script>
