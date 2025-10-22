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
            <v-switch
                v-model="fields.esPublico"
                label="¿Es Publico?"
            ></v-switch>
        </div>
        <!-- <template v-slot:actions> -->
        <div class="flex justify-end mr-1 py-2 gap-2">
            <CButton color="delete" @click="closeModal"> Cancelar </CButton>
            <CButton
                color="confirm"
                :disabled="!meta.valid"
                @click="handleSave(fields)"
            >
                Save
            </CButton>
        </div>
        <!-- </template> -->
    </div>
</template>
<script lang="ts" setup>
import { usePrivateCompany } from "../composables/usePrivateCompany";
import { Field, useForm } from "vee-validate";
import { onMounted } from "vue";

import { CButton } from "@core/index";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const { fields, typePaymentAccountList, handleSave, selectTypePrivateCompany } =
    usePrivateCompany();
</script>
