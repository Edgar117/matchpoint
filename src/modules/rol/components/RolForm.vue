<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <!-- {{ fields }} -->
            <Field
                name="Role"
                v-model="fields.description"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.description"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Role Name"
                    counter="50"
                ></v-text-field>
            </Field>
            <v-checkbox
                v-model="fields.admin"
                label="Is Administrator?"
            ></v-checkbox>
        </div>
        <!-- <template v-slot:actions> -->
        <div class="flex justify-end mr-1 py-2 gap-2">
            <CButton color="delete" @click="closeModal"> Cancel </CButton>
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
import { useRole } from "../composables/useRol";
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

const { fields, handleSave } = useRole();
</script>
