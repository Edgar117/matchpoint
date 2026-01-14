import { ref } from "vue";
import { defineStore } from "pinia";
import { Cancha } from "@/interfaces/Cancha";

export const useCanchaStore = defineStore("cancha", () => {
    const canchaList = ref<Cancha[]>([]);
    const showBottom = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    //form field
    const fields = ref<Cancha>({} as Cancha);
    const fieldsFilter = ref<Cancha>({} as Cancha);

    return {
        canchaList,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        fieldsFilter,
        loadingGrid,
    };
});
