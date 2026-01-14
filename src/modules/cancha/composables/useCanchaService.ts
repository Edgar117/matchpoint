import axios from "axios";
import { storeToRefs } from "pinia";
import { useCanchaStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Cancha, CanchanRequestParams } from "@/interfaces/Cancha";

/**
 * A composable function that provides cancha service methods.
 * @returns An object containing cancha service methods.
 */
export const useCanchaService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { canchaList, loadingGrid } = storeToRefs(useCanchaStore());

    /**
     * Creates a new cancha.
     * @param canchaData - The cancha data to be created.
     */
    const createCancha = async (canchaData: Cancha) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Cancha`,
                canchaData
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
     * Updates an existing cancha.
     * @param canchaData - The cancha data to be updated.
     */
    const updateCancha = async (canchaData: Cancha) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Cancha/${canchaData.canchaId}`,
                canchaData
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
     * Deletes a cancha.
     * @param canchaId - The ID of the cancha to be deleted.
     */
    const deleteCancha = async (canchaId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Cancha/${canchaId}`
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
     * Retrieves a list of canchas based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of canchas.
     */
    const selectCancha = async (requestModel: CanchanRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
                SortColumn: requestModel.sortColumn,
                SortDirection: requestModel.SortDir.toUpperCase(),
                Next_Rows: requestModel.Limit,
            });

            const { data } = await axios.get<{
                data: Cancha[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/Cancha`, {
                params: parameters,
            });

            canchaList.value = data.data;
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
        createCancha,
        selectCancha,
        updateCancha,
        deleteCancha,
    };
};
