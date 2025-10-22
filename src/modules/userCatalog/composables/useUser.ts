import { computed, onMounted, ref, watch } from "vue";
import { useLoginStore } from "../../login/store/state";
import { storeToRefs } from "pinia";
import _ from "lodash";
const { user } = storeToRefs(useLoginStore());

import { useUserService } from "./useUserService";
import { useUserStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";

import { getLocation } from "@/helpers/tools";
import { selUsers, UserRequestParams } from "@/interfaces/User";
const {
    createUser,
    selectUser,
    updateUser,
    deleteUser,
    selectRols,
    selectCountry,
    selectState,
    selectCity,
    selectUserProcessAction,
    selectTrust,
    selectTrustB,
} = useUserService();

export const useUser = () => {
    //Importacion de state
    const {
        showBottom,
        userList,
        userRoles,
        totalCount,
        fields,
        fieldsFilter,
        action,
        showConfirmationDialog,
        loadingGrid,
        countryList,
        stateList,
        cityList,
        loadingState,
        loadingCity,
        userProcessActionList,
        userTrustItems,
        userTrustItemsB,
    } = storeToRefs(useUserStore());
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
    const closeModal = async () => {
        showBottom.value = false;
        totalCount.value = await selectUser(formatSelectValue());
    };

    const handleShowEdit = (item: selUsers) => {
        action.value = "EDIT";
        fillFields(item);
        showBottom.value = true;
    };
    const handleShowDeleteDialog = (item: selUsers) => {
        action.value = "DELETE";
        fillFields(item);
        showConfirmationDialog.value = true;
    };
    const handleSave = async (userData: selUsers) => {
        // ConnectionData.privateCompanyId = user.value?.user.idIDM;
        userData.regRevisadoPor = user.value?.user.userName ?? "";
        userData.regHostNameCrecion = getLocation();
        action.value === "NEW"
            ? await createUser(userData)
            : await updateUser(userData);
        closeModal();
        totalCount.value = await selectUser(formatSelectValue());
    };
    const handleDelete = async () => {
        showConfirmationDialog.value = false;
        await deleteUser(fields.value.userId);
        totalCount.value = await selectUser(formatSelectValue());
    };

    const fillFields = (item: selUsers) => {
        location.value = getLocation();
        fields.value = {
            userId: item.userId,
            username: item.username,
            password: "",
            email: item.email,
            lastName: item.lastName,
            name: item.name,
            rol: item.roles?.map((role) => role.roleId) ?? [],
            roleDescription: item.roleDescription,
            regRevisadoPor: user.value?.user.userName ?? "",
            regHostNameCrecion: location.value,
            totalcount: 0,
            banks: item.banks,
            birthDay: item.birthDay,
            city: item.city,
            country: item.country,
            mailingAddress: item.mailingAddress,
            socialNumber: item.socialNumber,
            state: item.state,
            telephoneNumber: item.telephoneNumber,
            zip: item.zip,
            roles: item.roles,
        };
    };

    const resetFields = () => {
        fields.value = {
            userId: 0,
            username: "",
            email: "",
            name: "",
            lastName: "",
            password: "",
            rol: [],
            roleDescription: "",
            totalcount: 0,
            regRevisadoPor: "",
            regHostNameCrecion: "",
            banks: [],
            birthDay: new Date(),
            city: "",
            country: "",
            mailingAddress: "",
            socialNumber: "",
            state: "",
            telephoneNumber: 0,
            zip: "",
            roles: [],
        };
    };
    const resetFields_filter = () => {
        //Tiene que ser 1 pór 1 por temas de reactividad de pinia
        fieldsFilter.value.userId = 0;
        fieldsFilter.value.username = "";
        fieldsFilter.value.roleDescription = "";
        fieldsFilter.value.email = "";
        fieldsFilter.value.regRevisadoPor = "";
        fieldsFilter.value.password = "";
        //fieldsFilter.value = {} as Connection;
    };
    const formatSelectValue = (): UserRequestParams => {
        return {
            userId: 0,
            username: fieldsFilter.value.username,
            email: fieldsFilter.value.email,
            password: "",
            name: fieldsFilter.value.name,
            lastName: fieldsFilter.value.lastName,
            rol: [],
            roleDescription: fieldsFilter.value.roleDescription,
            regHostNameCrecion: "",
            regRevisadoPor: "",
            Limit: elementPerPage.value,
            Offset: (page.value - 1) * elementPerPage.value,
            sortColumn:
                sortBy.value.length > 0 ? sortBy.value[0].key : "userId",
            SortDir: sortBy.value.length > 0 ? sortBy.value[0].order : "asc",
            totalcount: 0,
            banks: [],
            birthDay: null,
            city: "",
            country: "",
            mailingAddress: "",
            socialNumber: "",
            state: "",
            telephoneNumber: 0,
            zip: "",
            roles: [],
        };
    };

    const showFilterAction = () => {
        headers.value.map((item) => {
            if (item.key != "action") item.sortable = showFilter.value;
        });
        showFilter.value = !showFilter.value;
    };

    const FirstLoad = async () => {
        if (action.value === "INIT")
            totalCount.value = await selectUser(formatSelectValue());
    };

    //Onmounted

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
                title: "User Name",
                key: "username",
                sortable: !showFilter.value,
                width: "250px",
            },
            {
                title: "Name",
                key: "name",
                sortable: !showFilter.value,
            },
            {
                title: "Last Name",
                key: "lastName",
                sortable: !showFilter.value,
            },
            {
                title: "Role",
                key: "roleDescription",
                sortable: !showFilter.value,
            },
            {
                title: "Email",
                key: "email",
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
                title: "Delete User",
                subtitle:
                    "The user <b>#username</b> and all the related information will be deleted. Are you sure?",
                textButton: "Accept",
                onClick: () => handleDelete(),
            },
        };
    });

    // Watchers
    watch([page, elementPerPage, sortBy], async () => {
        await selectUser(formatSelectValue());
    });

    watch(
        [fieldsFilter.value],
        _.debounce(async () => {
            await selectUser(formatSelectValue());
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
        userList,
        showFilter,
        sortBy,
        headers,
        dialogMessage,
        action,
        showConfirmationDialog,
        showPassword,
        loadingGrid,
        userRoles,
        countryList,
        stateList,
        cityList,
        loadingState,
        loadingCity,
        userProcessActionList,
        userTrustItems,
        userTrustItemsB,
        closeModal,
        handleSave,
        handleShowEdit,
        resetFields,
        handleShowDeleteDialog,
        showFilterAction,
        selectRols,
        selectCountry,
        selectState,
        selectCity,
        selectUserProcessAction,
        FirstLoad,
        selectTrust,
        selectTrustB,
    };
};
