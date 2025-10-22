import { ref } from "vue";
import { defineStore } from "pinia";

export interface Snackbar {
    type: "success" | "error" | "warning";
    text: string;
    valueModel: boolean;
}
export interface Notification {
    img: string;
    message: string;
    date: Date;
}

export const useTemplateUI = defineStore("templateUI", () => {
    const drawer = ref<boolean>(false);
    const snackbar = ref<Snackbar>();
    const notifications = ref<Notification[]>([]);
    const newNotification = ref(false);

    const handleShowSnackbar = (item: Snackbar) => {
        snackbar.value = {
            ...item,
            valueModel: true,
        };
    };

    return {
        drawer,
        handleShowSnackbar,
        snackbar,
        notifications,
        newNotification,
    };
});
