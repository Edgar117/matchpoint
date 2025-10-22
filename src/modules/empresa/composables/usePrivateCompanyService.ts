import axios from "axios";
import { storeToRefs } from "pinia";
import { useConnectionStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import {
    PrivateCompany,
    PrivateCompanynRequestParams,
    TypePaymentAccount,
} from "@/interfaces/PrivateCompany";

/**
 * A composable function that provides connection service methods.
 * @returns An object containing connection service methods.
 */
export const useConnectionService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { privateCompanyList, loadingGrid, typePaymentAccountList } =
        storeToRefs(useConnectionStore());

    /**
     * Creates a new connection.
     * @param connectionData - The connection data to be created.
     */
    const createCompany = async (companyData: PrivateCompany) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Empresa`,
                companyData
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `The record has been saved successfully`,
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
    const updatePrivateCompany = async (connectionData: PrivateCompany) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Empresa/${connectionData.empresaId}`,
                connectionData
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `The registry has been successfully edited`,
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
    const deleteConnection = async (connectionId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/PrivateCompany/${connectionId}`
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `Registration has been successfully deleted`,
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
    const selectPrivateCompany = async (
        requestModel: PrivateCompanynRequestParams
    ) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: PrivateCompany[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/empresa`, {
                params: parameters,
            });

            privateCompanyList.value = data.data;
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

    const selectTypePrivateCompany = async () => {
        try {
            const { data } = await axios.get<TypePaymentAccount[]>(
                `${URLS.COTBUILDER}/api/PrivateCompany/GetAllAccountType`
            );
            typePaymentAccountList.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    const selCompanyRequest = async () => {
        try {
            const { data } = await axios.get<{
                data: PrivateCompany[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/Empresa`);
            privateCompanyList.value = data.data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    return {
        createCompany,
        selectPrivateCompany,
        updatePrivateCompany,
        deleteConnection,
        selectTypePrivateCompany,
        selCompanyRequest,
    };
};
