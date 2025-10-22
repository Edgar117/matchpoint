<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <v-autocomplete
                label="Screens"
                item-title="name"
                item-value="screenId"
                :items="screensItems"
                v-model="screensId"
                multiple
            ></v-autocomplete>
        </div>
        <div class="flex justify-end mr-1 py-2 gap-2">
            <CButton color="delete" @click="closeModal"> Cancel </CButton>
            <CButton color="confirm" @click="handleSaveScreen(screensId)">
                Save
            </CButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRole } from "../composables/useRol";
import { Field, useForm } from "vee-validate";
import { onMounted, ref } from "vue";

import { CButton } from "@core/index";

const { meta } = useForm();
const { fields, screensItems, selectScreens, handleSaveScreen } = useRole();
const screensId = ref<number[]>([]);
//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

onMounted(async () => {
    // console.log(fields.value.screenIds)
    await selectScreens();
    screensId.value =
        fields.value.screenIds != null
            ? fields.value.screenIds.split(",").map(Number)
            : [];
});
</script>
