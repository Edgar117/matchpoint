<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <v-autocomplete
                label="Empresa"
                :items="Empresas"
                variant="underlined"
                item-value="empresaId"
                item-title="empresa"
                v-model="fields.empresaId"
            ></v-autocomplete>

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
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Nombre"
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
                    counter="50"
                ></v-text-field>
            </Field>

            <CDatePicker
                class="mb-4"
                v-model="fields.fechaInicio"
                locale="es"
                :enable-time-picker="false"
                placeholder="Fecha Inicio"
            ></CDatePicker>

            <CDatePicker
                class="mb-4"
                v-model="fields.fechaFin"
                locale="es"
                :enable-time-picker="false"
                placeholder="Fecha Fin"
            ></CDatePicker>

            <v-autocomplete
                label="Tipo de torneo"
                :items="TipoTorneos"
                variant="underlined"
                item-value="tipoTorneoId"
                item-title="tipoTorneo"
                v-model="fields.tipoTorneoId"
            ></v-autocomplete>

            <v-checkbox
                v-model="fields.esPublico"
                label="¿Es publico?"
                hide-details
            >
            </v-checkbox>
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
import { useTorneo } from "../composables/useTorneo";
import { Field, useForm } from "vee-validate";
import { onMounted, ref } from "vue";

import { CButton, CFileUploader } from "@core/index";

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

const TipoTorneos = ref<any[]>([]); // Inicializar como array vacío
const Empresas = ref<any[]>([]); // Inicializar como array vacío

const {
    fields,
    handleSave,
    selImagenTorneo,
    selectTypeTorneo,
    selectEmpresaTorneo,
} = useTorneo();

onMounted(async () => {
    TipoTorneos.value = await selectTypeTorneo();
    Empresas.value = await selectEmpresaTorneo();
    if (fields.value.empresaId) {
        // vamos a buscar la imagen
        const baseImagen = await selImagenTorneo(
            fields.value.torneoId,
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
