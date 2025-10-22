<template>
    <v-btn
        :key="i"
        v-for="(action, i) in actions"
        @click="action.handleAction"
        icon
        elevation="0"
        density="compact"
    >
        <v-icon :color="action.color">{{ action.icon }}</v-icon>
        <v-tooltip activator="parent" location="bottom" :text="action.label" />
    </v-btn>
</template>

<script setup lang="ts">
export interface IProps {
    actions: Action[];
}

export interface Action {
    handleAction: Function;
    color: string;
    icon: string;
    label: string;
}
const props = withDefaults(defineProps<IProps>(), {});
</script>
