<template>
    <div
        persistent
        max-width="450px"
        style="overflow: hidden"
        overflow="hidden"
    >
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            location="top right"
            :color="color"
        >
            <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
            {{ titulo }}
            <template v-slot:actions>
                <v-btn color="white" icon @click="closeAlert">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
export interface IProps {
    show: boolean;
    titulo: string;
    close: Function;
    color: string;
}

const props = withDefaults(defineProps<IProps>(), {
    show: false,
    titulo: "",
    color: "red",
});
const timeout = ref<number>(2000);
const snackbar = computed({
    get(): boolean {
        return props.show;
    },
    set(): void {
        props.close();
    },
});
const closeAlert = async () => {
    props.close();
};
</script>
