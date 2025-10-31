<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <!-- {{ fields }} -->
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
import { onMounted, ref } from "vue";

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

const { fields, handleSave, selectCategoriasEquipos, selImagenEquipo } =
    useEquipo();

const Categorias = ref<any[]>([]);

onMounted(async () => {
    Categorias.value = await selectCategoriasEquipos();
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
