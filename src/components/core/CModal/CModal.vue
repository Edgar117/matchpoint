<template>
    <v-overlay v-model="modelValue">
        <div class="flex items-center justify-center h-screen w-screen">
            <div ref="target" class="bg-white w-[400px] rounded-lg p-4">
                <div class="flex justify-between items-center">
                    <h2 class=" font-normal">{{ title }}</h2>
                    <v-btn @click="modelValue = false" icon elevation="0">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
                <div v-if="loading" class="flex justify-center w-full">
                    <v-progress-circular class="my-4" :size="70" width="2" color="primary"
                        indeterminate></v-progress-circular>
                </div>
                <div v-else>
                    <slot name="body"></slot>
                </div>
                <div class="flex justify-end mt-4 gap-2">
                    <slot name="action" />
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
    persistent: boolean,
    description?: string
    loading?: boolean
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
    modelValue: false,
    persistent: false,
    title: 'example',
    description: '',
    loading: false
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
