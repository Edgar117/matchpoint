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
                    counter="50"
                ></v-text-field>
            </Field>
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
import { CButton } from "@core/index";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const { fields, handleSave } = useEquipo();
</script>
