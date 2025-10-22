import { ref } from "vue";
import { defineStore } from "pinia";
import { Graph } from "@/interfaces/Graph";

export const useGraphStore = defineStore("graph", () => {
    const graphInfo = ref<Graph>();

    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    //form field

    return {
        graphInfo,
        showBottom,
        totalCount,
    };
});
