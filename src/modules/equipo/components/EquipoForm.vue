<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <v-autocomplete
                v-if="showEmpresaCombo"
                label="Empresa"
                :items="Empresas"
                variant="underlined"
                item-value="empresaId"
                item-title="empresa"
                v-model="fields.empresaId"
            ></v-autocomplete>
             
            <Field
                name="nombre"
                v-model="fields.nombre"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.nombre"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Nombre"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Descripcion"
                v-model="fields.descripcion"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.descripcion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Descripción"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="entrenador"
                v-model="fields.entrenador"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.entrenador"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Entrenador"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="pais"
                v-model="fields.pais"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.pais"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Pais"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="estado"
                v-model="fields.estado"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.estado"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Estado"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="poblacion"
                v-model="fields.poblacion"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.poblacion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Población"
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="colonia"
                v-model="fields.colonia"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.colonia"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Colonia"
                    counter="100"
                ></v-text-field>
            </Field>

            <v-autocomplete
                label="Tipo de Deporte"
                :items="TipoTorneos"
                variant="underlined"
                item-value="tipoTorneoId"
                item-title="tipoTorneo"
                v-model="fields.tipoDeporteId"
                @update:model-value="handleTipoDeporteChange"
            ></v-autocomplete>
            
            <v-autocomplete
                label="Categorías"
                :items="Categorias"
                variant="underlined"
                item-value="categoriaId"
                item-title="categoria"
                v-model="fields.categorias"
                multiple
            ></v-autocomplete>

            <!-- </div> -->
            <v-checkbox
                v-model="fields.esRamaVaronil"
                label="Rama Varonil"
                hide-details
            ></v-checkbox>
            <v-checkbox
                v-model="fields.esRamaFemenil"
                label="Rama Femenil"
                hide-details
            ></v-checkbox>
            <v-checkbox
                v-model="fields.esRamaMixto"
                label="Rama Mixta"
                hide-details
            ></v-checkbox>

            <CFileUploader
                titulo="Cargar Logo"
                :acceptedFormats="'image/*'"
                @file-uploaded="handleFileUpload"
                :valor-inicial="archivoLoaded"
            ></CFileUploader>
        </div>
        <!-- <template v-slot:actions> -->
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
        <!-- </template> -->
    </div>
</template>
<script lang="ts" setup>
import { useEquipo } from "../composables/useEquipo";
import { Field, useForm } from "vee-validate";
import { CButton, CFileUploader } from "@core/index";
import { onMounted, ref, watch, computed } from "vue";
import { getEmpresaIdFromToken } from "@/helpers/tokenHelper";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const handleFileUpload = (fileData: any) => {
    fields.value.logo = fileData?.base64?.split(",")[1];
    fields.value.extensionImg = fileData?.name.split(".")[1];
};

const archivoLoaded = ref<{ base64?: string; name?: string; type?: string }>(
    {}
);

const { fields, handleSave, selectCategoriasEquipos, selImagenEquipo, selectTypeTorneo, selectEmpresaTorneo } =
    useEquipo();

const Categorias = ref<any[]>([]);
const TipoTorneos = ref<any[]>([]); // Inicializar como array vacío
const Empresas = ref<any[]>([]); // Inicializar como array vacío

// Computed para mostrar el combo de empresa solo cuando empresaId del token sea 0
const showEmpresaCombo = computed(() => {
    const empresaId = getEmpresaIdFromToken();
    console.log('empresaId:', empresaId, 'tipo:', typeof empresaId, 'es igual a 0:', empresaId === 0);
    return empresaId === 0;
});

// Variable local para el combo de tipo de deporte
const tipoDeporteSeleccionado = ref<number | null>(null);

// Función para manejar el cambio de tipo de deporte
const handleTipoDeporteChange = async (value: number | null) => {
    // Actualizar fields.tipoDeporteId con el valor seleccionado
    fields.value.tipoDeporteId = value;
    
    // Limpiar las categorías seleccionadas cuando cambia el tipo de deporte
    fields.value.categorias = [];
    
    // Recargar las categorías según el tipo de deporte seleccionado
    if (value) {
        Categorias.value = await selectCategoriasEquipos(value);
    } else {
        Categorias.value = [];
    }
};

// Watcher para sincronizar cuando fields.tipoDeporteId cambie externamente
watch(
    () => fields.value.tipoDeporteId,
    (newValue) => {
        if (newValue !== tipoDeporteSeleccionado.value) {
            tipoDeporteSeleccionado.value = newValue;
        }
    },
    { immediate: true }
);

onMounted(async () => {
    TipoTorneos.value = await selectTypeTorneo();
    if (showEmpresaCombo.value) {
        Empresas.value = await selectEmpresaTorneo();
    }
    
    // Si fields.tipoDeporteId no viene, inicializar con null
    // Si viene, usar ese valor
    tipoDeporteSeleccionado.value = fields.value.tipoDeporteId ?? null;
    
    // Si hay un tipoDeporteId, cargar las categorías correspondientes
    if (fields.value.tipoDeporteId) {
        Categorias.value = await selectCategoriasEquipos(fields.value.tipoDeporteId);
    } else {
        Categorias.value = [];
    }
    
    if (fields.value.equipoId) {
        // vamos a buscar la imagen
        const baseImagen = await selImagenEquipo(
            fields.value.equipoId,
            fields.value.logo
        );
        archivoLoaded.value = baseImagen
            ? {
                  base64: `${baseImagen}`,
                  name: "Logo.jpg",
                  type: "image/jpg",
              }
            : {};

        fields.value.logo =
            typeof baseImagen === "string" && baseImagen !== null
                ? baseImagen.split(",")[1]
                : "";

        fields.value.extensionImg = "Logo.jpg";
    }
});
</script>
