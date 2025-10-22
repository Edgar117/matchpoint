import axios from "axios";
import { storeToRefs } from "pinia";
import { useGraphStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Graph } from "@/interfaces/Graph";

/**
 * A composable function that provides connection service methods.
 * @returns An object containing connection service methods.
 */
export const useGraphService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { graphInfo } = storeToRefs(useGraphStore());

    const selGraph= async () => {
        try {
            const { data } = await axios.get<Graph>(
                `${URLS.COTBUILDER}/api/Graph`
            );
            graphInfo.value = data;
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
        selGraph,
    };
};
