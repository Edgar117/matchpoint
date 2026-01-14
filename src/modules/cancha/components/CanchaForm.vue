<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <Field
                name="Cancha"
                v-model="fields.cancha"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.cancha"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Cancha"
                    counter="100"
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
                    counter="500"
                ></v-text-field>
            </Field>
            <Field
                name="Ubicacion"
                v-model="fields.ubicacion"
                rules="max:200"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.ubicacion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Ubicación"
                    counter="200"
                ></v-text-field>
            </Field>
            <Field
                name="Direccion"
                v-model="fields.direccion"
                rules="max:500"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.direccion"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Dirección"
                    counter="500"
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
</template>
<script lang="ts" setup>
import { useCancha } from "../composables/useCancha";
import { Field, useForm } from "vee-validate";
import { CButton } from "@core/index";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const { fields, handleSave } = useCancha();
</script>
