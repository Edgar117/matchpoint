import { ref } from "vue";
import { defineStore } from "pinia";
import { RolJuego } from "@/interfaces/RolJuego";

export const useRolJuegoStore = defineStore("roljuego", () => {
    const rolJuegoList = ref<RolJuego[]>([]);
    const showBottom = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    //form field
    const fields = ref<RolJuego>({} as RolJuego);
    const fieldsFilter = ref<Partial<RolJuego>>({});

    return {
        rolJuegoList,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        fieldsFilter,
        loadingGrid,
    };
});
