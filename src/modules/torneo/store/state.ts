import { ref } from "vue";
import { defineStore } from "pinia";
import { Torneo } from "@/interfaces/Torneo";

export const useTorneoStore = defineStore("torneo", () => {
    const torneoList = ref<Torneo[]>([]);
    const UserConnectionSelected = ref<number[]>([]);
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const testtingConnection = ref(false);
    //form field
    const fields = ref<Torneo>({} as Torneo);
    const fieldsFilter = ref<Torneo>({} as Torneo);

    return {
        torneoList,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        fieldsFilter,
        loadingGrid,
        testtingConnection,
        showBottomAsignacion,
        UserConnectionSelected,
    };
});
