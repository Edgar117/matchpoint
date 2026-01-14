import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { Cancha, CanchanRequestParams } from "@/interfaces/Cancha";

import { useCanchaService } from "./useCanchaService";
import { useCanchaStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { getLocation } from "@/helpers/tools";
const { createCancha, updateCancha, deleteCancha, selectCancha } =
    useCanchaService();

export const useCancha = () => {
    //Importacion de state
    const {
        showBottom,
        canchaList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
    } = storeToRefs(useCanchaStore());
    //Variables con referncia
    const page = ref(1);
    const elementPerPage = ref(10);
    const search = ref("");
    const saving = ref(false);
    const showFilter = ref(false);
    const sortBy = ref<SortItem[]>([]);
    const location = ref("");
    //Funciones
    const closeModal = () => {
        showBottom.value = false;
    };

    const handleShowEdit = (item: Cancha) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: Cancha) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (CanchaData: Cancha) => {
        action.value === "NEW"
            ? await createCancha(CanchaData)
            : await updateCancha(CanchaData);
        closeModal();
        totalCount.value = await selectCancha(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteCancha(fields.value.canchaId);
        totalCount.value = await selectCancha(formatSelectValue());
    };

    const fillFields = (item: Cancha) => {
        location.value = getLocation();
        fields.value = {
            canchaId: item.canchaId,
            cancha: item.cancha,
            descripcion: item.descripcion,
            ubicacion: item.ubicacion,
            direccion: item.direccion,
        };
    };

    const resetFields = () => {
        fields.value = {
            canchaId: 0,
            cancha: "",
            descripcion: "",
            ubicacion: "",
            direccion: "",
        };
    };
    const resetFields_filter = () => {
        fieldsFilter.value.canchaId = 0;
        fieldsFilter.value.cancha = "";
        fieldsFilter.value.descripcion = "";
        fieldsFilter.value.ubicacion = "";
        fieldsFilter.value.direccion = "";
    };
    const formatSelectValue = (): CanchanRequestParams => {
        return {
            canchaId: 0,
            cancha: fieldsFilter.value.cancha,
            descripcion: fieldsFilter.value.descripcion,
            ubicacion: fieldsFilter.value.ubicacion,
            direccion: fieldsFilter.value.direccion,
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "canchaId",
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
            totalCount.value = await selectCancha(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            {
                title: "Cancha",
                key: "cancha",
                sortable: !showFilter.value,
            },
            {
                title: "Descripción",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "Ubicación",
                key: "ubicacion",
                sortable: !showFilter.value,
            },
            {
                title: "Dirección",
                key: "direccion",
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
                title: "Esta cancha sera removida",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectCancha(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectCancha(formatSelectValue());
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
        canchaList,
        showFilter,
        sortBy,
        headers,
        dialogMessage,
        action,
        showConfirmationDialog,
        loadingGrid,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        selectCancha,
    };
};
