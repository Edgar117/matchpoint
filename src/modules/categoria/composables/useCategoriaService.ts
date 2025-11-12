import axios from "axios";
import { storeToRefs } from "pinia";
import { useCategoriaStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Categoria, CategorianRequestParams } from "@/interfaces/Categoria";
import { TipoTorneo } from "@/interfaces/Torneo";

/**
 * A composable function that provides categoria service methods.
 * @returns An object containing categoria service methods.
 */
export const useCategoriaService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { categoriaList, loadingGrid } = storeToRefs(useCategoriaStore());

    /**
     * Creates a new categoria.
     * @param categoriaData - The categoria data to be created.
     */
    const createCategoria = async (companyData: Categoria) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Categoria`,
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
     * Updates an existing categoria.
     * @param categoriaData - The categoria data to be updated.
     */
    const updateCategoria = async (categoriaData: Categoria) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Categoria/${categoriaData.categoriaId}`,
                categoriaData
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
     * Deletes a categoria.
     * @param categoriaId - The ID of the categoria to be deleted.
     */
    const deleteCategoria = async (categoriaId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Categoria/${categoriaId}`
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
     * Retrieves a list of categorias based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of categorias.
     */
    const selectCategoria = async (requestModel: CategorianRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Categoria[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/categoria`, {
                params: parameters,
            });

            categoriaList.value = data.data;
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

    return {
        createCategoria,
        selectCategoria,
        updateCategoria,
        deleteCategoria,
        selectTypeTorneo,
    };
};
