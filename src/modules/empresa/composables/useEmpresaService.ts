import axios from "axios";
import { storeToRefs } from "pinia";
import { useConnectionStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import {
    Empresa,
    EmpresanRequestParams,
    TypePaymentAccount,
} from "@/interfaces/Empresa";

/**
 * A composable function that provides connection service methods.
 * @returns An object containing connection service methods.
 */
export const useConnectionService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { empresaList, loadingGrid, typePaymentAccountList } =
        storeToRefs(useConnectionStore());

    /**
     * Creates a new connection.
     * @param connectionData - The connection data to be created.
     */
    const createEmpresa = async (companyData: Empresa) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Empresa`,
                companyData
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
    const updateEmpresa = async (connectionData: Empresa) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Empresa/${connectionData.empresaId}`,
                connectionData
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
    const deleteEmpresa = async (connectionId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Empresa/${connectionId}`
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
    const selectEmpresa = async (
        requestModel: EmpresanRequestParams
    ) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Empresa[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/empresa`, {
                params: parameters,
            });

            empresaList.value = data.data;
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

    const selectTypeEmpresa = async () => {
        try {
            const { data } = await axios.get<TypePaymentAccount[]>(
                `${URLS.COTBUILDER}/api/Empresa/GetAllAccountType`
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

    const selImagenEmpresa = async (EmpresaId: number, Logo: string) => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Empresa/logo/${EmpresaId}/${Logo}`,
                { responseType: "blob" }
            );
            const base64 = await blobToBase64(data);
            // console.log(base64);
            return base64;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    // Función auxiliar para convertir Blob a Base64
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return {
        createEmpresa,
        selectEmpresa,
        updateEmpresa,
        deleteEmpresa,
        selectTypeEmpresa,
        selImagenEmpresa,
    };
};
