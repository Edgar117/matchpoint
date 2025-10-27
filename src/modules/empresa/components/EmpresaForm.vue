<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <!-- {{ fields }} -->
            <Field
                name="Empresa"
                v-model="fields.empresa"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.empresa"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Empresa"
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
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="RFC"
                v-model="fields.rfc"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.rfc"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="RFC"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Razon Social"
                v-model="fields.razonSocial"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.razonSocial"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Razon social"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Dirección"
                v-model="fields.direccion"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.direccion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Dirección"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Correo"
                v-model="fields.email"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.email"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Correo"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Telefono"
                v-model="fields.telefono"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.telefono"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Telefono"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="CP"
                v-model="fields.cp"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.cp"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="CP"
                    counter="50"
                    type="number"
                ></v-text-field>
            </Field>
            <Field
                name="Representante"
                v-model="fields.representante"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.representante"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Representante"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Pais"
                v-model="fields.pais"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.pais"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Pais"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Estado"
                v-model="fields.estado"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.estado"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Estado"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Poblacion"
                v-model="fields.poblacion"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.poblacion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Población"
                    counter="50"
                ></v-text-field>
            </Field>
            <Field
                name="Colonia"
                v-model="fields.colonia"
                rules="required|max:50"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.colonia"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Colonia"
                    counter="50"
                ></v-text-field>
            </Field>
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
import { useEmpresa } from "../composables/useEmpresa";
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

const { fields, typePaymentAccountList, handleSave, selImagenEmpresa } =
    useEmpresa();

onMounted(async () => {
    if (fields.value.empresaId) {
        // vamos a buscar la imagen
        const baseImagen = await selImagenEmpresa(
            fields.value.empresaId,
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
