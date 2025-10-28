import { ref } from "vue";
import { defineStore } from "pinia";
import { Categoria } from "@/interfaces/Categoria";

export const useCategoriaStore = defineStore("categoria", () => {
    const categoriaList = ref<Categoria[]>([]);
    const UserConnectionSelected = ref<number[]>([]);
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const testtingConnection = ref(false);
    //form field
    const fields = ref<Categoria>({} as Categoria);
    const fieldsFilter = ref<Categoria>({} as Categoria);

    return {
        categoriaList,
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
