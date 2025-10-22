import { ref } from "vue";
import { defineStore } from "pinia";
import { UserResponse } from "@/interfaces/User";
import { RolScreen } from "@/interfaces/Role";

export const useLoginStore = defineStore("login", () => {
    const isLogged = ref<boolean>(false);
    const user = ref<UserResponse>();
    const screensRole = ref<RolScreen[]>();

    return {
        isLogged,
        user,
        screensRole
    };
});
