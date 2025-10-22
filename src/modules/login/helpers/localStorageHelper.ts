import { APPLICATION_NAME } from "../../../helpers/applicationName";
import { ref } from "vue";


export const saveToken = (value = '') => {
    localStorage.setItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`, JSON.stringify(value));
}
export const deleteToken = () => {
    localStorage.removeItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`);
}
export const getTokenInformation = () => {
    const info = ref<any>("");
    info.value = localStorage.getItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`);
    return JSON.parse(info.value);
}

export const saveTimeExp = (value: any) => {
    localStorage.setItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-time`, value);
}

export const deleteTimeExp = () => {
    localStorage.removeItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-time`);
}

export const getTimeExp = () => {
    return localStorage.getItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-time`);
}

export const saveRoutes = (value : any) => {
    localStorage.setItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-routes`, JSON.stringify(value));
}
export const deleteRoute = () => {
    localStorage.removeItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-routes`);
}
export const getRoutes = () => {
    const info = ref<any>("");
    info.value = localStorage.getItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-routes`);
    return info.value != null ? JSON.parse(info.value) : "";
}

export const saveCurrentUser = (value: any) => {
    localStorage.setItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`, JSON.stringify(value));
}

export const deleteCurrentUser = () => {
    localStorage.removeItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`);
}

export const getCurrentUser = () => {
    const info = ref<any>("");
    info.value = localStorage.getItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`)
    return info.value != null ? JSON.parse(info.value) : "";
}

export const getCurrentRoles = () => {
    const info = ref<any>("");
    info.value = localStorage.getItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-roles`)
    return info.value != null ? JSON.parse(info.value) : "";
}

export const saveCurrentRoles = (value: any) => {
    localStorage.setItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-roles`, JSON.stringify(value));
}

export const deleteCurrentRoles = () => {
    localStorage.removeItem(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-roles`);
}