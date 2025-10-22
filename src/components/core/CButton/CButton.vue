<template>
    <!-- <button class="button hover:bg-red-500 hover:text-white text-red-500 active:bg-red-600">
        <slot />
    </button> -->
    <button
        :disabled="disabled"
        v-bind="$attrs"
        :class="[
            { 'hover:bg-slate-50 active:bg-slate-100': color === 'cancel' },
            {
                'hover:bg-red-500 hover:text-white text-red-500 active:bg-red-600':
                    color === 'delete',
            },
            {
                'hover:bg-blue-500 hover:text-white text-blue-500 active:bg-blue-600':
                    color === 'confirm',
            },
            {
                'hover:bg-blue-500 hover:text-white text-blue-500 active:bg-blue-600':
                    color === 'edit',
            },
            {
                'hover:bg-gray-300 hover:text-black bg-gray-300 text-gray-500':
                    disabled,
            },
        ]"
        class="button border"
    >
        <slot />
    </button>
    <!-- <button @click="modelValue = false"
                        class="px-4 py-2 border rounded-md text-xs hover:bg-red-500 hover:text-white text-red-500 active:bg-red-600">Borrar</button> -->
</template>

<script setup lang="ts">
interface IProps {
    text?: string;
    color: "cancel" | "delete" | "confirm" | "edit";
    disabled?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
    color: "cancel",
    disabled: false,
});
</script>

<style>
.button {
    @apply px-4 py-2 rounded-md text-xs;
}
</style>
