import axios from "axios";
import { storeToRefs } from "pinia";
import { useTorneoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { TipoTorneo, Torneo, TorneoRequestParams } from "@/interfaces/Torneo";
import { Empresa } from "@/interfaces/Empresa";

/**
 * A composable function that provides torneo service methods.
 * @returns An object containing torneo service methods.
 */
export const useTorneoService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { torneoList, loadingGrid } = storeToRefs(useTorneoStore());

    /**
     * Creates a new torneo.
     * @param torneoData - The torneo data to be created.
     */
    const createTorneo = async (companyData: Torneo) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Torneo`,
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
     * Updates an existing torneo.
     * @param torneoData - The torneo data to be updated.
     */
    const updateTorneo = async (torneoData: Torneo) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Torneo/${torneoData.torneoId}`,
                torneoData
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
     * Deletes a torneo.
     * @param torneoId - The ID of the torneo to be deleted.
     */
    const deleteTorneo = async (torneoId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Torneo/${torneoId}`
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
     * Retrieves a list of torneos based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of torneos.
     */
    const selectTorneo = async (requestModel: TorneoRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Torneo[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/torneo`, {
                params: parameters,
            });

            torneoList.value = data.data;
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

    const selectTypeTorneo = async () => {
        try {
            const { data } = await axios.get<{
                data: TipoTorneo[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/TipoTorneo?SortColumn=TipoTorneoId&Offset=0&Next_Rows=100&SortDirection=ASC`
            );
            return data.data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selectEmpresaTorneo = async () => {
        try {
            const { data } = await axios.get<{
                data: Empresa[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Empresa?SortColumn=EmpresaId&Offset=0&Next_Rows=100&SortDirection=ASC`
            );
            return data.data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selImagenTorneo = async (TorneoId: number, Logo: string) => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Torneo/logo/${TorneoId}/${Logo}`,
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
        createTorneo,
        selectTorneo,
        updateTorneo,
        deleteTorneo,
        selImagenTorneo,
        selectTypeTorneo,
        selectEmpresaTorneo
    };
};
