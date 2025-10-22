import { ref } from "vue";
import { defineStore } from "pinia";
import { Rol, Screens } from "@/interfaces/Role";

export const useRolStore = defineStore("roles", () => {
    const rolesItems = ref<Rol[]>([]);
    const screensItems = ref<Screens[]>([]);

    const page = ref(1);
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const testtingConnection = ref(false);
    //form field
    const fields = ref<Rol>({} as Rol);
    const fieldsFilter = ref<Rol>({} as Rol);

    return {
        rolesItems,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        fieldsFilter,
        loadingGrid,
        testtingConnection,
        showBottomAsignacion,
        page,
        screensItems,
    };
});
