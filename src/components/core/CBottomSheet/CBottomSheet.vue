<template>
    <v-overlay v-model="modelValue">
        <div class="relative h-screen w-screen">
            <div ref="target" :class="[
                {
                    'rounded max-w-lg': limitSize
                }
            ]" class="bg-white px-4 pb-4 py-1  fixed top-2 right-2 bottom-2 z-20 w-[100%] md:w-[60%] lg:w-[50%]">
                <div class="flex justify-between items-center border-b">
                    <slot name="title">
                        <h2>{{ title }}</h2>
                    </slot>
                    <v-btn @click="modelValue = false" icon density="default" elevation="0">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <div class="relative h-full">
                    <div :class="[
                        { 'items-center justify-center': isLoading }
                    ]" class="flex flex-col h-[93%] overflow-auto">
                        <div v-if="isLoading" class="flex flex-col items-center">
                            <slot name="loading">
                                <v-progress-circular class="mb-4" :size="70" width="2" color="primary"
                                    indeterminate></v-progress-circular>
                                <p class="text-xs">{{ textLoading }}</p>
                            </slot>
                        </div>
                        <div class="py-2 h-full" v-else>
                            <slot />
                        </div>
                        <div class="absolute bottom-10 w-full">
                                <div class="bg-white">
                                    <slot name="actions" />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue';

interface IProps {
    modelValue: boolean,
    title?: string,
    textLoading?: string,
    isLoading: boolean,
    persistent: boolean,
    limitSize: boolean
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
    modelValue: false,
    textLoading: 'loading...',
    isLoading: false,
    persistent: false,
    limitSize: true
})
const target = ref(null)
const modelValue = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})

onClickOutside(target, (event) => {
    if (event && !props.persistent) {
        modelValue.value = false
    }
})

</script>