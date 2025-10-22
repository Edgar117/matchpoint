import { ref } from "vue";
import { defineStore } from "pinia";
import { actions } from "@/interfaces/Role";

export const useUserGlobal = defineStore("userGlobal", () => {
    const roleSelectId = ref(0);
    const permitions = ref<actions[]>([]);

    return {
        roleSelectId,
        permitions
    };
});
