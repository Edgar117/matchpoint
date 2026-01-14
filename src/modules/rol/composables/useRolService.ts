import axios from "axios";
import { storeToRefs } from "pinia";
import { useRolStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Permitions, Rol, RoleRequestParams, RolScreen, Screens } from "@/interfaces/Role";

/**
 * A composable function that provides connection service methods.
 * @returns An object containing connection service methods.
 */
export const useRolService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { rolesItems, loadingGrid, screensItems } = storeToRefs(
        useRolStore()
    );

    /**
     * Creates a new connection.
     * @param connectionData - The connection data to be created.
     */
    const createRole = async (payload: Rol) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Role`,
                payload
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `El registro se ha creado correctamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Updates an existing connection.
     * @param connectionData - The connection data to be updated.
     */
    const updateRole = async (payload: Rol) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Role/${payload.roleId}`,
                payload
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `El registro ha sido editado exitosamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Deletes a connection.
     * @param connectionId - The ID of the connection to be deleted.
     */
    const deleteRole = async (connectionId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Role/${connectionId}`
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `El registro ha sido eliminado exitosamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Retrieves a list of connections based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of connections.
     */
    const selectRole = async (requestModel: RoleRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Rol[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/Role`, {
                params: parameters,
            });

            rolesItems.value = data.data;
            loadingGrid.value = false;
            return data.totalCount;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            loadingGrid.value = false;
            return 0;
        } finally {
            loadingGrid.value = false;
        }
    };

    const selectScreens = async () => {
        try {
            const { data } = await axios.get<Screens[]>(
                `${URLS.COTBUILDER}/api/Role/GetAllScreen`
            );
            screensItems.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    const saveScreens = async (roleId: number, ScreensIds: number[]) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Role/PostRolScreen`,
                {
                    sreens: ScreensIds,
                    roleId: roleId,
                }
            );
            if (response.status === 200) {
                handleShowSnackbar({
                    text: `Registration has been successfully saved`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    const selScreenByRol = async (roleId: number) => {
        try {
            const { data } = await axios.get<Permitions>(
                `${URLS.COTBUILDER}/api/Role/GetRolScreen?RoleId=${roleId}`
            );
            return data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return null;
        }
    };

    return {
        createRole,
        updateRole,
        deleteRole,
        selectRole,
        selectScreens,
        saveScreens,
        selScreenByRol
    };
};
