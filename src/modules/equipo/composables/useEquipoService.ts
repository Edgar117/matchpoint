import axios from "axios";
import { storeToRefs } from "pinia";
import { useEquipoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Equipo, EquiponRequestParams } from "@/interfaces/Equipo";

/**
 * A composable function that provides equipo service methods.
 * @returns An object containing equipo service methods.
 */
export const useEquipoService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { equipoList, loadingGrid } = storeToRefs(useEquipoStore());

    /**
     * Creates a new equipo.
     * @param equipoData - The equipo data to be created.
     */
    const createEquipo = async (companyData: Equipo) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Equipo`,
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
     * Updates an existing equipo.
     * @param equipoData - The equipo data to be updated.
     */
    const updateEquipo = async (equipoData: Equipo) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Equipo/${equipoData.equipoId}`,
                equipoData
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
     * Deletes a equipo.
     * @param equipoId - The ID of the equipo to be deleted.
     */
    const deleteEquipo = async (equipoId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Equipo/${equipoId}`
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
     * Retrieves a list of equipos based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of equipos.
     */
    const selectEquipo = async (requestModel: EquiponRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Equipo[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/equipo`, {
                params: parameters,
            });

            equipoList.value = data.data;
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

    return {
        createEquipo,
        selectEquipo,
        updateEquipo,
        deleteEquipo,
    };
};
