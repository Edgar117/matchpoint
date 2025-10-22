<template>
    <v-text-field
        @keydown="handleEvaluateInputEnter"
        v-money="configMoney"
        type="text"
        :variant="variant"
        :label="label"
        :density="density"
        v-model="modelValue"
        :placeholder="placeholder"
    ></v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface IProps {
    variant?:
        | "outlined"
        | "plain"
        | "filled"
        | "underlined"
        | "solo"
        | "solo-inverted"
        | "solo-filled";
    density?: "default" | "comfortable" | "compact";
    label?: string;
    placeholder?: string;
    modelValue: number;
    enabledNegative?: boolean;
}
const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(defineProps<IProps>(), {
    density: "compact",
    enabledNegative: false,
});
const configMoney = ref({
    decimal: ".",
    thousands: ",",
    precision: 0,
    prefix: "$ ",
    disableNegative: true,
    masked: false /* doesn't work with directive */,
});

const handleEvaluateInputEnter = ($event: any) => {
    if (!props.enabledNegative) {
        $event.key === "-" ? $event.preventDefault() : null;
        return;
    }
};

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(text: number) {
        emit(
            "update:modelValue",
            text
                .toString()
                .replaceAll("$", "")
                .replaceAll(",", "")
                .replaceAll(".", "")
        );
    },
});
</script>
