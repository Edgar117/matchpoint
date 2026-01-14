<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <v-autocomplete
                label="Torneo"
                :items="Torneos"
                variant="underlined"
                item-value="torneoId"
                item-title="nombre"
                v-model="fields.torneoId"
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
                    counter="100"
                ></v-text-field>
            </Field>

            <Field
                name="RamaId"
                v-model="fields.ramaId"
                rules="required"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.ramaId"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Rama ID"
                    type="number"
                ></v-text-field>
            </Field>

            <v-autocomplete
                label="Categoría"
                :items="Categorias"
                variant="underlined"
                item-value="categoriaId"
                item-title="categoria"
                v-model="fields.categoriaId"
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
</template>
<script lang="ts" setup>
import { useRolJuego } from "../composables/useRolJuego";
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

const Torneos = ref<any[]>([]);
const Categorias = ref<any[]>([]);
const TipoRolJuegos = ref<any[]>([]);

const {
    fields,
    handleSave,
    selectTipoRolJuego,
    selectTorneosForDropdown,
    selectCategoriasForDropdown,
} = useRolJuego();

onMounted(async () => {
    TipoRolJuegos.value = await selectTipoRolJuego();
    Torneos.value = await selectTorneosForDropdown();
    Categorias.value = await selectCategoriasForDropdown();
});
</script>
