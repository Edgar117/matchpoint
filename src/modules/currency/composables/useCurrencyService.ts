import axios from "axios";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Currency } from "@/interfaces/Currency";

/**
 * A composable function that provides connection service methods.
 * @returns An object containing connection service methods.
 */
export const useCurrencyService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { currencyItems } = storeToRefs(useCurrencyStore());

    const selCurrency = async () => {
        try {
            const { data } = await axios.get<Currency[]>(
                `${URLS.COTBUILDER}/api/Currency`
            );
            currencyItems.value = data;
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
        selCurrency,
    };
};
