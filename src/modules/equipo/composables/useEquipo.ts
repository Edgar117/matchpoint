import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { Equipo, EquiponRequestParams } from "@/interfaces/Equipo";
const { user } = storeToRefs(useLoginStore());

import { useEquipoService } from "./useEquipoService";
import { useEquipoStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { getLocation } from "@/helpers/tools";
const {
    createEquipo,
    updateEquipo,
    deleteEquipo,
    selectEquipo,
    selectCategoriasEquipos,
    selImagenEquipo
} = useEquipoService();

export const useEquipo = () => {
    //Importacion de state
    const {
        showBottom,
        showBottomAsignacion,
        equipoList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
        showBottomAsignacionJugadores,
    } = storeToRefs(useEquipoStore());
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

    const handleShowEdit = (item: Equipo) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };

    const handleShowAsignacionJugadores = (item: Equipo) => {
        fillFields(item);
        showBottomAsignacionJugadores.value = true;
    };
    const handleShowDeleteDialog = (item: Equipo) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (EquipoData: Equipo) => {
        action.value === "NEW"
            ? await createEquipo(EquipoData)
            : await updateEquipo(EquipoData);
        closeModal();
        totalCount.value = await selectEquipo(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteEquipo(fields.value.equipoId);
        totalCount.value = await selectEquipo(formatSelectValue());
    };

    const fillFields = (item: Equipo) => {
        location.value = getLocation();
        fields.value = {
            entrenador: item.entrenador,
            equipoId: item.equipoId,
            descripcion: item.descripcion,
            colonia: item.colonia,
            estado: item.estado,
            logo: item.logo,
            nombre: item.nombre,
            pais: item.pais,
            poblacion: item.poblacion,
            torneoId: item.torneoId,
            categorias: item.categorias,
            esRamaFemenil: item.esRamaFemenil,
            esRamaMixto: item.esRamaMixto,
            esRamaVaronil: item.esRamaVaronil,
            extensionImg: item.extensionImg,
        };
    };

    const resetFields = () => {
        fields.value = {
            entrenador: "",
            equipoId: 0,
            descripcion: "",
            colonia: "",
            estado: "",
            logo: "",
            nombre: "",
            pais: "",
            poblacion: "",
            torneoId: null,
            categorias: [],
            esRamaFemenil: false,
            esRamaMixto: false,
            esRamaVaronil: false,
            extensionImg: "",
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.equipoId = 0;
        fieldsFilter.value.nombre = "";
        fieldsFilter.value.descripcion = "";
        //fieldsFilter.value = {} as Equipo;
    };
    const formatSelectValue = (): EquiponRequestParams => {
        return {
            equipoId: 0,
            colonia: "",
            entrenador: fieldsFilter.value.entrenador,
            estado: "",
            logo: "",
            nombre: "",
            pais: "",
            poblacion: "",
            torneoId: 0,
            torneo: "",
            categorias: [],
            esRamaFemenil: false,
            esRamaMixto: false,
            esRamaVaronil: false,
            extensionImg: "",
            descripcion: fieldsFilter.value.descripcion,
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "equipoId",
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
            totalCount.value = await selectEquipo(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            {
                title: "Equipo",
                key: "nombre",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Descripcion",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "Entrenador",
                key: "entrenador",
                sortable: !showFilter.value,
            },
            {
                title: "Pais",
                key: "pais",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Estado",
                key: "estado",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Logo",
                key: "logo",
                sortable: false,
                width: "250px",
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
                title: "Esta equipo sera removida",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectEquipo(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectEquipo(formatSelectValue());
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
        equipoList,
        showFilter,
        sortBy,
        headers,
        dialogMessage,
        action,
        showConfirmationDialog,
        showPassword,
        loadingGrid,
        showBottomAsignacionJugadores,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        closeModalAsignaciones,
        selectEquipo,
        createEquipo,
        handleShowAsignacionJugadores,
        selectCategoriasEquipos,
        selImagenEquipo
    };
};
