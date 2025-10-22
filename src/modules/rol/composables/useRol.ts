import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _ from "lodash";
import { Rol, RoleRequestParams } from "@/interfaces/Role";
const { user } = storeToRefs(useLoginStore());

import { useRolService } from "./useRolService";
import { useRolStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
import { decryptString } from "../../../helpers/cryptoJS";
import { getLocation } from "@/helpers/tools";
const {
    createRole,
    updateRole,
    deleteRole,
    selectRole,
    selectScreens,
    saveScreens,
} = useRolService();

export const useRole = () => {
    //Importacion de state
    const {
        showBottom,
        showBottomAsignacion,
        rolesItems,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
        testtingConnection,
        page,
        screensItems,
    } = storeToRefs(useRolStore());
    //Variables con referncia
    // const page = ref(1);
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

    const closeModalSreen = () => {
        showBottomAsignacion.value = false;
    };

    const handleShowEdit = (item: Rol) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };

    const handleShowScreens = (item: Rol) => {
        action.value = "EDIT";
        fillFields(item);
        showBottomAsignacion.value = true;
    };

    const handleShowDeleteDialog = (item: Rol) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (ConnectionData: Rol) => {
        // ConnectionData.privateCompanyId = user.value?.user.idIDM;
        // ConnectionData.regRevisadoPor = user.value?.user.userName ?? "";
        // ConnectionData.regHostNameCrecion = getLocation();
        action.value === "NEW"
            ? await createRole(ConnectionData)
            : await updateRole(ConnectionData);
        closeModal();
        totalCount.value = await selectRole(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteRole(fields.value.roleId);
        page.value = 1;
        totalCount.value = await selectRole(formatSelectValue());
    };

    const handleSaveScreen = async (items: number[]) => {
        await saveScreens(fields.value.roleId, items);
        showBottomAsignacion.value = false;
        totalCount.value = await selectRole(formatSelectValue());
    };
    const fillFields = (item: Rol) => {
        location.value = getLocation();
        fields.value = {
            description: item.description,
            roleId: item.roleId,
            screenIds: item.screenIds,
            admin: item.admin,
        };
    };

    const resetFields = () => {
        fields.value = {
            roleId: 0,
            description: "",
            screenIds: "",
            admin: false,
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.description = "";
        fieldsFilter.value.roleId = 0;
        //fieldsFilter.value = {} as Connection;
    };

    const formatSelectValue = (): RoleRequestParams => {
        //  console.log(page.value)
        return {
            roleId: 0,
            description: fieldsFilter.value.description,
            screenIds: "",
            admin: false,
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "roleId",
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
            totalCount.value = await selectRole(formatSelectValue());
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
                title: "Role Name",
                key: "description",
                sortable: !showFilter.value,
                // width: "500px",
            },
            {
                title: "Is Admin?",
                key: "admin",
                sortable: false,
                width: "100px",
                // width: "250px",
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
                title: "This rol will be removed",
                subtitle: "And it cannot be recovered",
                textButton: "Accept",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        totalCount.value = await selectRole(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            totalCount.value = await selectRole(formatSelectValue());
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
        rolesItems,
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
        screensItems,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        closeModalSreen,
        handleShowScreens,
        selectScreens,
        handleSaveScreen,
    };
};
