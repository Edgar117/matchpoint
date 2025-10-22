// This code was generated automatically by COT-BUILDER. Use with caution.
// Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.

import { ref } from "vue";
import { defineStore } from "pinia";
import { dashData, RolUsers, selUsers, UserProcessAction, UserTrust } from "@/interfaces/User";
import { City, Country, State } from "@/interfaces/Country";

export const useUserStore = defineStore("user", () => {
    const userList = ref<selUsers[]>([]);
    const countryList = ref<Country[]>([]);
    const stateList = ref<State[]>([]);
    const cityList = ref<City[]>([]);
    const userRoles = ref<RolUsers[]>([]);
    const userProcessActionList = ref<dashData>({} as dashData);
    const userTrustItems = ref<UserTrust[]>([]);
    const userTrustItemsB = ref<UserTrust[]>([]);
    const showBottom = ref(false);
    const showConfirmationDialog = ref(false);
    const totalCount = ref(0);
    const action = ref<"NEW" | "EDIT" | "DELETE" | "INIT">("INIT");
    const loadingGrid = ref(false);
    const loadingState = ref(false);
    const loadingCity = ref(false);

    const fields = ref<selUsers>({} as selUsers);
    const fieldsFilter = ref<selUsers>({} as selUsers);

    return {
        userList,
        userRoles,
        showBottom,
        totalCount,
        fields,
        action,
        showConfirmationDialog,
        loadingGrid,
        fieldsFilter,
        countryList,
        stateList,
        cityList,
        loadingState,
        loadingCity,
        userProcessActionList,
        userTrustItems,
        userTrustItemsB
    };
});
