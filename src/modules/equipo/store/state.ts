import { ref } from "vue";
import { defineStore } from "pinia";
import { Equipo } from "@/interfaces/Equipo";

export const useEquipoStore = defineStore("equipo", () => {
    const equipoList = ref<Equipo[]>([]);
    const UserConnectionSelected = ref<number[]>([]);
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const testtingConnection = ref(false);
    //form field
    const fields = ref<Equipo>({} as Equipo);
    const fieldsFilter = ref<Equipo>({} as Equipo);
    const showBottomAsignacionJugadores = ref(false);
    return {
        equipoList,
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
        showBottomAsignacionJugadores
    };
});
