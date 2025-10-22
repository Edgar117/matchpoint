<template>
    <v-btn @click="showFilter = !showFilter" icon>
        <v-icon color="white">{{
            showFilter ? "mdi-filter-remove-outline" : "mdi-filter-plus-outline"
        }}</v-icon>
        <v-tooltip
            activator="parent"
            location="bottom"
            :text="!showFilter ? $t('generales.paginacion.showFilter') : $t('generales.paginacion.hideFilter')"
        />
    </v-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IProps {
    showFilter: boolean;
}
const emit = defineEmits(["update:showFilter"]);
const props = withDefaults(defineProps<IProps>(), {
    showFilter: false,
});
const showFilter = computed({
    get() {
        return props.showFilter;
    },
    set(value: boolean) {
        emit("update:showFilter", value);
    },
});
</script>
