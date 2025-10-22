import { ref } from "vue";
import { defineStore } from "pinia";
import { Currency } from "@/interfaces/Currency";

export const useCurrencyStore = defineStore("currency", () => {
    const currencyItems = ref<Currency[]>([]);
   
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    //form field
    
    return {
        currencyItems,
        showBottom,
        totalCount,
    };
});
