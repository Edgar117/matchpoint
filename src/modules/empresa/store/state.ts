import { ref } from "vue";
import { defineStore } from "pinia";
import { PrivateCompany, TypePaymentAccount } from "@/interfaces/PrivateCompany";

export const useConnectionStore = defineStore("empresa", () => {
    const privateCompanyList = ref<PrivateCompany[]>([]);
    const typePaymentAccountList = ref<TypePaymentAccount[]>([]);
    const UserConnectionSelected = ref<number[]>([]);
    const showBottom = ref(false);
    const showBottomAsignacion = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const testtingConnection = ref(false);
    //form field
    const fields = ref<PrivateCompany>({} as PrivateCompany);
    const fieldsFilter = ref<PrivateCompany>({} as PrivateCompany);

    return {
        privateCompanyList,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        fieldsFilter,
        loadingGrid,
        testtingConnection,
        showBottomAsignacion,
        UserConnectionSelected,
        typePaymentAccountList
    };
});
