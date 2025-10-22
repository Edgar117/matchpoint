<template>
    <div
        :class="[
            {
                'flex-col-reverse justify-center items-center': !modelValue,
                'flex-row justify-between': modelValue,
            },
        ]"
        class="px-4 py-2 flex fixed z-10 bg-[#001c32] w-full"
    >
        <img
            v-if="modelValue"
            class="w-20 object-contain"
            src="../../assets/Banner.png"
            alt=""
        />

        <img
            v-else
            class="w-8 object-contain mt-2 mb-2 "
            src="../../assets/Banner.png"
            alt=""
        />

        <v-app-bar-nav-icon
            app
            color="white"
            variant="text"
            @click.stop="modelValue = !modelValue"
        ></v-app-bar-nav-icon>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { URL_SERVER_LOGOS } from "../../helpers/constants";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(text) {
        emit("update:modelValue", text);
    },
});
</script>
