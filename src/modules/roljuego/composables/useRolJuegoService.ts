import axios from "axios";
import { storeToRefs } from "pinia";
import { useRolJuegoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { RolJuego, RolJuegonRequestParams } from "@/interfaces/RolJuego";
import { Torneo } from "@/interfaces/Torneo";
import { Categoria } from "@/interfaces/Categoria";

/**
 * A composable function that provides rolJuego service methods.
 * @returns An object containing rolJuego service methods.
 */
export const useRolJuegoService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { rolJuegoList, loadingGrid } = storeToRefs(useRolJuegoStore());

    /**
     * Creates a new rolJuego.
     * @param rolJuegoData - The rolJuego data to be created.
     */
    const createRolJuego = async (rolJuegoData: RolJuego) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/RolJuego`,
                rolJuegoData
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
     * Updates an existing rolJuego.
     * @param rolJuegoData - The rolJuego data to be updated.
     */
    const updateRolJuego = async (rolJuegoData: RolJuego) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/RolJuego/${rolJuegoData.rolJuegoId}`,
                rolJuegoData
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
     * Deletes a rolJuego.
     * @param rolJuegoId - The ID of the rolJuego to be deleted.
     */
    const deleteRolJuego = async (rolJuegoId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/RolJuego/${rolJuegoId}`
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
     * Retrieves a list of rolJuegos based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of rolJuegos.
     */
    const selectRolJuego = async (requestModel: RolJuegonRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
                SortColumn: requestModel.sortColumn,
                SortDirection: requestModel.SortDir.toUpperCase(),
                Next_Rows: requestModel.Limit,
            });

            const { data } = await axios.get<{
                data: RolJuego[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/RolJuego`, {
                params: parameters,
            });

            rolJuegoList.value = data.data;
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

    /**
     * Retrieves a list of TipoRolJuego for dropdown.
     * @returns Array of TipoRolJuego.
     */
    const selectTipoRolJuego = async () => {
        try {
            const response = await axios.get<any>(
                `${URLS.COTBUILDER}/api/TipoRolJuego`
            );
            
            // El API devuelve un array directo, no un objeto con data y totalCount
            let responseData = response.data;
            
            // Si viene como objeto con data, extraer el array
            if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
                responseData = responseData.data || [];
            }
            
            // Asegurar que sea un array
            const dataArray = Array.isArray(responseData) ? responseData : [];
            
            // Normalizar los datos para manejar el typo en la respuesta del API (tipoRolJuegold en lugar de tipoRolJuegoId)
            const normalized = dataArray.map((item: any) => ({
                tipoRolJuegoId: item.tipoRolJuegoId ?? item.tipoRolJuegold ?? item.TipoRolJuegoId ?? item.TipoRolJuegold ?? 0,
                tipoRolJuego1: item.tipoRolJuego1 ?? item.TipoRolJuego1 ?? "",
                regBorrado: item.regBorrado ?? item.RegBorrado ?? 0,
            }));
            
            return normalized;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    /**
     * Retrieves a list of Torneos for dropdown.
     * @returns Array of Torneos.
     */
    const selectTorneosForDropdown = async () => {
        try {
            const { data } = await axios.get<{
                data: Torneo[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Torneo?SortColumn=torneoId&Offset=0&Next_Rows=100&SortDirection=ASC`
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

    /**
     * Retrieves a list of Categorias for dropdown.
     * @returns Array of Categorias.
     */
    const selectCategoriasForDropdown = async () => {
        try {
            const { data } = await axios.get<{
                data: Categoria[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Categoria?SortColumn=categoriaId&Offset=0&Next_Rows=100&SortDirection=ASC`
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

    /**
     * Retrieves categorias for a specific torneo.
     * For now, returns all categorias since filtering by torneoId is not directly supported.
     * @param torneoId - The ID of the torneo.
     * @returns Array of Categorias.
     */
    const selectCategoriasByTorneo = async (torneoId: number | null) => {
        if (!torneoId) return [];
        try {
            // Return all categorias - filtering can be done client-side if needed
            const { data } = await axios.get<{
                data: Categoria[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Categoria?SortColumn=categoriaId&Offset=0&Next_Rows=100&SortDirection=ASC`
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

    return {
        createRolJuego,
        selectRolJuego,
        updateRolJuego,
        deleteRolJuego,
        selectTipoRolJuego,
        selectTorneosForDropdown,
        selectCategoriasForDropdown,
        selectCategoriasByTorneo,
    };
};
