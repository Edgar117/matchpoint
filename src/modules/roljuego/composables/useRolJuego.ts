import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { RolJuego, RolJuegonRequestParams } from "@/interfaces/RolJuego";

import { useRolJuegoService } from "./useRolJuegoService";
import { useRolJuegoStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { getLocation } from "@/helpers/tools";
const {
    createRolJuego,
    updateRolJuego,
    deleteRolJuego,
    selectRolJuego,
    selectTipoRolJuego,
    selectTorneosForDropdown,
    selectCategoriasForDropdown,
    selectCategoriasByTorneo,
} = useRolJuegoService();

export const useRolJuego = () => {
    //Importacion de state
    const {
        showBottom,
        rolJuegoList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
    } = storeToRefs(useRolJuegoStore());
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

    const handleShowEdit = (item: RolJuego) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: RolJuego) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (RolJuegoData: RolJuego) => {
        action.value === "NEW"
            ? await createRolJuego(RolJuegoData)
            : await updateRolJuego(RolJuegoData);
        closeModal();
        totalCount.value = await selectRolJuego(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteRolJuego(fields.value.rolJuegoId);
        totalCount.value = await selectRolJuego(formatSelectValue());
    };

    const fillFields = (item: RolJuego) => {
        location.value = getLocation();
        fields.value = {
            rolJuegoId: item.rolJuegoId,
            torneoId: item.torneoId,
            ramaId: item.ramaId,
            categoriaId: item.categoriaId,
            tipoRolJuegoId: item.tipoRolJuegoId,
            clave: item.clave,
            descripcion: item.descripcion,
            numRondas: item.numRondas,
            fechaInicio: item.fechaInicio ?? null,
            fechaFin: item.fechaFin ?? null,
        };
    };

    const resetFields = () => {
        fields.value = {
            rolJuegoId: 0,
            torneoId: null as any,
            ramaId: 0,
            categoriaId: null,
            tipoRolJuegoId: null,
            clave: "",
            descripcion: "",
            numRondas: 0,
            fechaInicio: null,
            fechaFin: null,
        };
    };
    const resetFields_filter = () => {
        fieldsFilter.value.rolJuegoId = undefined;
        fieldsFilter.value.torneoId = undefined;
        fieldsFilter.value.ramaId = undefined;
        fieldsFilter.value.categoriaId = undefined;
        fieldsFilter.value.tipoRolJuegoId = undefined;
        fieldsFilter.value.clave = "";
        fieldsFilter.value.descripcion = "";
        fieldsFilter.value.numRondas = undefined;
    };
    const formatSelectValue = (): RolJuegonRequestParams => {
        return {
            rolJuegoId: fieldsFilter.value.rolJuegoId,
            torneoId: fieldsFilter.value.torneoId,
            ramaId: fieldsFilter.value.ramaId,
            categoriaId: fieldsFilter.value.categoriaId ?? undefined,
            tipoRolJuegoId: fieldsFilter.value.tipoRolJuegoId ?? undefined,
            clave: fieldsFilter.value.clave,
            descripcion: fieldsFilter.value.descripcion,
            numRondas: fieldsFilter.value.numRondas,
            fechaInicio: fieldsFilter.value.fechaInicio
                ? String(fieldsFilter.value.fechaInicio)
                : undefined,
            fechaFin: fieldsFilter.value.fechaFin
                ? String(fieldsFilter.value.fechaFin)
                : undefined,
            tipoDeporteId: fieldsFilter.value.tipoDeporteId,
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "rolJuegoId",
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
            totalCount.value = await selectRolJuego(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            {
                title: "Torneo",
                key: "torneo",
                sortable: !showFilter.value,
            },
            {
                title: "Descripción",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "Clave",
                key: "clave",
                sortable: !showFilter.value,
            },
            {
                title: "Rama",
                key: "rama",
                sortable: !showFilter.value,
            },
            {
                title: "Categoría",
                key: "categoria",
                sortable: !showFilter.value,
            },
            {
                title: "Tipo Rol Juego",
                key: "tipoRolJuego",
                sortable: !showFilter.value,
            },
           
            {
                title: "Núm. Rondas",
                key: "numRondas",
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
                title: "Este rol de juego sera removido",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectRolJuego(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectRolJuego(formatSelectValue());
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
        rolJuegoList,
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
        selectRolJuego,
        selectTipoRolJuego,
        selectTorneosForDropdown,
        selectCategoriasForDropdown,
        selectCategoriasByTorneo,
    };
};
