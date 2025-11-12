import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { Categoria, CategorianRequestParams } from "@/interfaces/Categoria";
const { user } = storeToRefs(useLoginStore());

import { useCategoriaService } from "./useCategoriaService";
import { useCategoriaStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { getLocation } from "@/helpers/tools";
const { createCategoria, updateCategoria, deleteCategoria, selectCategoria, selectTypeTorneo } =
    useCategoriaService();

export const useCategoria = () => {
    //Importacion de state
    const {
        showBottom,
        showBottomAsignacion,
        categoriaList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
    } = storeToRefs(useCategoriaStore());
    //Variables con referncia
    const page = ref(1);
    const elementPerPage = ref(10);
    const search = ref("");
    const saving = ref(false);
    const showFilter = ref(false);
    const sortBy = ref<SortItem[]>([]);
    const showPassword = ref(false);
    const location = ref("");
    //Funciones
    const closeModal = () => {
        showBottom.value = false;
    };

    const closeModalAsignaciones = () => {
        showBottomAsignacion.value = false;
    };

    const handleShowEdit = (item: Categoria) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: Categoria) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (CategoriaData: Categoria) => {
        action.value === "NEW"
            ? await createCategoria(CategoriaData)
            : await updateCategoria(CategoriaData);
        closeModal();
        totalCount.value = await selectCategoria(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteCategoria(fields.value.categoriaId);
        totalCount.value = await selectCategoria(formatSelectValue());
    };

    const fillFields = (item: Categoria) => {
        location.value = getLocation();
        fields.value = {
            categoria: item.categoria,
            categoriaId: item.categoriaId,
            descripcion: item.descripcion,
            tipoDeporteId: item.tipoDeporteId ?? null,
        };
    };

    const resetFields = () => {
        fields.value = {
            categoria: "",
            categoriaId: 0,
            descripcion: "",
            tipoDeporteId: null,
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.categoriaId = 0;
        fieldsFilter.value.categoria = "";
        fieldsFilter.value.descripcion = "";
        //fieldsFilter.value = {} as Categoria;
    };
    const formatSelectValue = (): CategorianRequestParams => {
        return {
            categoriaId: 0,
            categoria: fieldsFilter.value.categoria,
            descripcion: fieldsFilter.value.descripcion,
            Limit: elementPerPage.value,
            tipoDeporteId: null,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "categoriaId",
            SortDir: sortBy.value.length > 0 ? sortBy.value[0].order : "asc",
        };
    };

    const showFilterAction = () => {
        headers.value.map((item) => {
            if (item.key != "action") item.sortable = showFilter.value;
        });
        showFilter.value = !showFilter.value;
    };

    //Onmounted
    onMounted(async () => {
        if (action.value === "INIT")
            totalCount.value = await selectCategoria(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            {
                title: "Tipo de deporte",
                key: "tipoDeporte",
                sortable: !showFilter.value,
            },
            {
                title: "Categoria",
                key: "categoria",
                sortable: !showFilter.value,
            },
            {
                title: "Descripcion",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "",
                key: "action",
                width: "50px",
                sortable: false,
            },
        ];
    });

    const dialogMessage = computed(() => {
        return {
            DELETE: {
                title: "Esta categoria sera removida",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectCategoria(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectCategoria(formatSelectValue());
        }, 600)
    );

    // Watchers
    watch([showFilter], async () => {
        if (showFilter.value === false) {
            resetFields_filter();
        }
    });

    return {
        page,
        elementPerPage,
        totalCount,
        search,
        showBottom,
        saving,
        fields,
        fieldsFilter,
        categoriaList,
        showFilter,
        sortBy,
        headers,
        dialogMessage,
        action,
        showConfirmationDialog,
        showPassword,
        loadingGrid,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        closeModalAsignaciones,
        selectCategoria,
        createCategoria,
        selectTypeTorneo,
    };
};
