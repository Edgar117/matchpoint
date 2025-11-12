<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <!-- {{ fields }} -->
            <Field
                name="Categoria"
                v-model="fields.categoria"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.categoria"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Categoria"
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

            <v-autocomplete
                label="Tipo de Deporte"
                :items="TipoTorneos"
                variant="underlined"
                item-value="tipoTorneoId"
                item-title="tipoTorneo"
                v-model="fields.tipoDeporteId"
            ></v-autocomplete>
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
import { useCategoria } from "../composables/useCategoria";
import { Field, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import { CButton } from "@core/index";

const { meta } = useForm();

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const TipoTorneos = ref<any[]>([]); // Inicializar como array vacío

const { fields, handleSave, selectTypeTorneo } = useCategoria();

onMounted(async () => {
    TipoTorneos.value = await selectTypeTorneo();
});
</script>
