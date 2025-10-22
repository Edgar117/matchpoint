<template>
    <div class="py-2 group">
        <div v-if="showFilter">
            <slot v-if="showCustomSlot === false" name="filter">
                <v-text-field
                    v-model="modelValue"
                    :label="header.title"
                    density="compact"
                    variant="outlined"
                    clearable
                    hide-details
                    :maxlength="250"
                ></v-text-field>
            </slot>
            <slot v-if="showCustomSlot === true" :name="header.key">
                <v-text-field
                    v-model="modelValue"
                    :label="header.title"
                    density="compact"
                    variant="outlined"
                    clearable
                    hide-details
                    :maxlength="250"
                ></v-text-field>
            </slot>
        </div>

        <div v-else class="flex gap-2 items-center">
            <p>{{ header.title }}</p>
            <v-icon
                :class="[
                    {
                        'invisible group-hover:visible':
                            sortBy.length === 0
                                ? true
                                : sortBy[0]?.key !== header.key,
                    },
                ]"
                :color="
                    isInactive
                        ? 'grey'
                        : sortBy[0]?.key == header.key
                        ? 'white'
                        : 'grey'
                "
                v-if="
                    header.key === sortBy[0]?.key && sortBy[0]?.order === 'asc'
                "
            >
                mdi-arrow-up</v-icon
            >
            <v-icon
                :class="[
                    {
                        'invisible group-hover:visible':
                            sortBy.length === 0
                                ? true
                                : sortBy[0]?.key !== header.key,
                    },
                ]"
                :color="
                    isInactive
                        ? 'grey'
                        : sortBy[0]?.key == header.key
                        ? 'white'
                        : 'grey'
                "
                v-else-if="
                    header.key === sortBy[0]?.key && sortBy[0]?.order === 'desc'
                "
                >mdi-arrow-down</v-icon
            >
            <v-icon
                :class="[
                    {
                        'invisible group-hover:visible':
                            sortBy.length === 0
                                ? true
                                : sortBy[0]?.key !== header.key,
                    },
                ]"
                :color="
                    isInactive
                        ? 'grey'
                        : sortBy[0]?.key == header.key
                        ? 'white'
                        : 'grey'
                "
                v-else
            >
                mdi-arrow-up</v-icon
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import { SortItem } from "@/interfaces/DataTables";
import { computed } from "vue";

export interface IProps {
    header: Header;
    sortBy: SortItem[];
    showFilter: boolean;
    modelValue?: string;
    showCustomSlot?: boolean;
}

interface Header {
    title: string;
    key: string;
    width?: string | number;
    sortable?: boolean;
}
const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(defineProps<IProps>(), {
    showFilter: false,
    showCustomSlot: false,
});

const isInactive = computed(() => {
    return props.sortBy.length === 0;
});

const modelValue = computed({
    get() {
        return props.modelValue ?? "";
    },
    set(value: string) {
        emit("update:modelValue", value);
    },
});
</script>
