import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _ from "lodash";
import {
    PrivateCompany,
    PrivateCompanynRequestParams,
} from "@/interfaces/PrivateCompany";
const { user } = storeToRefs(useLoginStore());

import { useConnectionService } from "./usePrivateCompanyService";
import { useConnectionStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { decryptString } from "../../../helpers/cryptoJS";
import { getLocation } from "@/helpers/tools";
const {
    createCompany,
    updatePrivateCompany,
    deleteConnection,
    selectPrivateCompany,
    selectTypePrivateCompany,
} = useConnectionService();

export const usePrivateCompany = () => {
    //Importacion de state
    const {
        showBottom,
        showBottomAsignacion,
        privateCompanyList,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
        testtingConnection,
        UserConnectionSelected,
        typePaymentAccountList,
    } = storeToRefs(useConnectionStore());
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

    const handleShowEdit = (item: PrivateCompany) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: PrivateCompany) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (ConnectionData: PrivateCompany) => {
        // ConnectionData.privateCompanyId = user.value?.user.idIDM;
        ConnectionData.regRevisadoPor = user.value?.user.userName ?? "";
        ConnectionData.regHostNameCrecion = getLocation();
        action.value === "NEW"
            ? await createCompany(ConnectionData)
            : await updatePrivateCompany(ConnectionData);
        closeModal();
        totalCount.value = await selectPrivateCompany(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteConnection(fields.value.empresaId);
        totalCount.value = await selectPrivateCompany(formatSelectValue());
    };

    const fillFields = (item: PrivateCompany) => {
        location.value = getLocation();
        fields.value = {
            colonia: item.colonia,
            cp: item.cp,
            descripcion: item.descripcion,
            direccion: item.direccion,
            email: item.email,
            empresa: item.empresa,
            empresaId: item.empresaId,
            esPublico: item.esPublico,
            estado: item.estado,
            extensionImg: item.extensionImg,
            logo: item.logo,
            pais: item.pais,
            poblacion: item.poblacion,
            razonSocial: item.razonSocial,
            representante: item.representante,
            regHostNameCrecion: location.value,
            regRevisadoPor: user.value?.user.userName ?? "",
            rfc: item.rfc,
            telefono: item.telefono,
        };
    };

    const resetFields = () => {
        fields.value = {
            colonia: "",
            cp: 0,
            descripcion: "",
            direccion: "",
            email: "",
            empresa: "",
            empresaId: 0,
            esPublico: false,
            estado: "",
            extensionImg: "",
            logo: "",
            pais: "",
            poblacion: "",
            razonSocial: "",
            representante: "",
            regHostNameCrecion: "",
            regRevisadoPor: "",
            rfc: "",
            telefono: "",
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.empresaId = 0;
        fieldsFilter.value.empresa = "";
        fieldsFilter.value.descripcion = "";
        fieldsFilter.value.razonSocial = "";
        fieldsFilter.value.rfc = "";
        fieldsFilter.value.cp = 0;
        //fieldsFilter.value = {} as Connection;
    };
    const formatSelectValue = (): PrivateCompanynRequestParams => {
        return {
            empresaId: 0,
            regHostNameCrecion: "",
            regRevisadoPor: "",
            colonia: "",
            cp: 0,
            descripcion: "",
            direccion: "",
            email: "",
            empresa: "",
            esPublico: false,
            estado: "",
            extensionImg: "",
            logo: "",
            pais: "",
            poblacion: "",
            razonSocial: "",
            representante: "",
            rfc: "",
            telefono: "",
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "Empresa",
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
            totalCount.value = await selectPrivateCompany(formatSelectValue());
    });

    //Computed
    const headers = computed(() => {
        return [
            // {
            //     title: "#",
            //     key: "nombreAplicacion",
            //     sortable: !showFilter.value,
            //     width: "150px",
            // },
            {
                title: "Empresa",
                key: "empresa",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Descripcion",
                key: "descripcion",
                sortable: !showFilter.value,
            },
            {
                title: "RFC",
                key: "rfc",
                sortable: !showFilter.value,
            },
            {
                title: "Email",
                key: "email",
                sortable: !showFilter.value,
            },
            {
                title: "Representante",
                key: "representante",
                sortable: !showFilter.value,
            },
            {
                title: "¿Es Publico ?",
                key: "esPublico",
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
                title: "Esta empresa sera removida",
                subtitle: "Y esta acción no puede ser deshecha",
                textButton: "Aceptar",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectPrivateCompany(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectPrivateCompany(formatSelectValue());
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
        privateCompanyList,
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
        typePaymentAccountList,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        closeModalAsignaciones,
        selectTypePrivateCompany,
        createCompany,
    };
};
