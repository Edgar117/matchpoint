import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _, { iteratee } from "lodash";
import { Torneo, TorneoRequestParams } from "@/interfaces/Torneo";
const { user } = storeToRefs(useLoginStore());

import { useTorneoService } from "./useTorneoService";
import { useTorneoStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { getLocation } from "@/helpers/tools";
const {
    createTorneo,
    updateTorneo,
    deleteTorneo,
    selectTorneo,
    selImagenTorneo,
    selectTypeTorneo,
    selectEmpresaTorneo,
} = useTorneoService();

export const useTorneo = () => {
    //Importacion de state
    const {
        showBottom,
        showBottomAsignacion,
        torneoList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
        testtingConnection,
        UserConnectionSelected,
    } = storeToRefs(useTorneoStore());
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
        UserConnectionSelected.value = [];
    };

    const handleShowEdit = (item: Torneo) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: Torneo) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (ConnectionData: Torneo) => {
        // ConnectionData.torneoId = user.value?.user.idIDM;
        // ConnectionData.regRevisadoPor = user.value?.user.userName ?? "";
        // ConnectionData.regHostNameCrecion = getLocation();
        action.value === "NEW"
            ? await createTorneo(ConnectionData)
            : await updateTorneo(ConnectionData);
        closeModal();
        totalCount.value = await selectTorneo(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteTorneo(fields.value.torneoId);
        totalCount.value = await selectTorneo(formatSelectValue());
    };

    const fillFields = (item: Torneo) => {
        location.value = getLocation();
        fields.value = {
            clave: item.clave,
            descripcion: item.descripcion,
            torneoId: item.torneoId,
            esPublico: item.esPublico,
            extensionImg: item.extensionImg,
            fechaFin: item.fechaFin,
            fechaInicio: item.fechaInicio,
            logo: item.logo,
            nombre: item.nombre,
            tipoTorneoId: item.tipoTorneoId,
            empresaId: item.empresaId,
        };
    };

    const resetFields = () => {
        fields.value = {
            clave: "",
            descripcion: "",
            torneoId: 0,
            esPublico: false,
            extensionImg: "",
            fechaFin: null,
            fechaInicio: null,
            logo: "",
            nombre: "",
            tipoTorneoId: null,
            empresaId: null,
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.torneoId = 0;
        //fieldsFilter.value = {} as Connection;
    };
    const formatSelectValue = (): TorneoRequestParams => {
        return {
            torneoId: 0,
            clave: "",
            descripcion: "",
            esPublico: false,
            extensionImg: "",
            fechaFin: null,
            fechaInicio: null,
            logo: "",
            nombre: "",
            tipoTorneoId: 0,
            empresaId: 0,
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "TorneoId",
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
            totalCount.value = await selectTorneo(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            
            {
                title: "Empresa ",
                key: "empresa",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Clave ",
                key: "clave",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Nombre",
                key: "nombre",
                sortable: !showFilter.value,
            },
            {
                title: "Descripcion",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "Fecha Inicio",
                key: "fechaInicio",
                sortable: !showFilter.value,
            },
            {
                title: "Fecha Fin",
                key: "fechaFin",
                sortable: !showFilter.value,
            },
            {
                title: "Tipo Torneo",
                key: "tipoTorneo",
                sortable: !showFilter.value,
            },
            {
                title: "¿Es publico?",
                key: "esPublico",
                sortable: !showFilter.value,
            },
            {
                title: "Logo",
                key: "logo",
                sortable: false,
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
                title: "Esta torneo sera removida",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectTorneo(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectTorneo(formatSelectValue());
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
        torneoList,
        showFilter,
        sortBy,
        headers,
        dialogMessage,
        action,
        showConfirmationDialog,
        showPassword,
        loadingGrid,
        testtingConnection,
        showBottomAsignacion,
        UserConnectionSelected,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        closeModalAsignaciones,
        createTorneo,
        selImagenTorneo,
        selectTypeTorneo,
        selectEmpresaTorneo,
    };
};
