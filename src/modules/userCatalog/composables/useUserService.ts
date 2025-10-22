// This code was generated automatically by COT-BUILDER. Use with caution.
// Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.

// Este código asume que tiene creado y configurado lo siguiente:
// axios, pinia, archivo de constantes con la URL a su API.
// Por favor, verifique completamente que todas las constantes e importaciones
// estén creados previamente o créelos posterior a la generación de este código

import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { useTemplateUI } from "@/store/templateUI";
import { buildUrlWithParameters } from "@/helpers/tools";
import {
    dashData,
    RolUsers,
    selUsers,
    User,
    UserProcessAction,
    UserRequestParams,
    UserTrust,
} from "@/interfaces/User";
import { City, Country, State } from "@/interfaces/Country";

/**
 * A composable function that provides User service methods.
 * @returns An object containing User service methods.
 */
export const useUserService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const {
        userList,
        loadingGrid,
        userRoles,
        countryList,
        stateList,
        cityList,
        loadingState,
        loadingCity,
        userProcessActionList,
        userTrustItems,
        userTrustItemsB,
    } = storeToRefs(useUserStore());
    const baseUrl = `${URLS.COTBUILDER}/api/`; // Reemplace APPNAME con el nombre de su constante que representa a la base de su API

    /**
     * Creates a new User".
     * @param connectionData - The User data to be created.
     */
    const createUser = async (userData: selUsers) => {
        try {
            const response = await axios.post(
                `${baseUrl}/UserSystem`,
                userData
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
                text: `Something went wrong, contact your system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Updates an existing User.
     * @param userData - The User data to be updated.
     */
    const updateUser = async (userData: selUsers) => {
        try {
            const response = await axios.put(
                `${baseUrl}UserSystem/${userData.userId}`,
                userData
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
                text: `Something went wrong, contact your system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Deletes a User.
     * @param userId - The ID of the User to be deleted. Must be entity PK
     */
    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(
                `${baseUrl}UserSystem/${userId}`
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
                text: `Something went wrong, contact your system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Retrieves a list of User items based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of connections.
     */
    const selectUser = async (requestModel: UserRequestParams) => {
        try {
            loadingGrid.value = true;
            const url = buildUrlWithParameters(
                requestModel as unknown as { [key: string]: string },
                `${baseUrl}UserSystem`
            );
            const { data } = await axios.get<{
                data: selUsers[];
                totalCount: number;
            }>(url);

            userList.value = data.data;
            return data.totalCount;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact your system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        } finally {
            loadingGrid.value = false;
        }
    };

    const selectRols = async () => {
        try {
            const { data } = await axios.get<RolUsers[]>(
                `${URLS.COTBUILDER}/api/UserSystem/GetAllRol`
            );
            userRoles.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };
    const selectCountry = async () => {
        try {
            const response = await axios({
                headers: {
                    Accept: "application/json",
                    "api-token":
                        "u_4reR5DmywH1sMRQ7c89NP96MPzcT54GQ5DBZWtvuCVKQAW_UF-88xX4hy36Qr7ymI",
                    "user-email": "edvazqueze@cotemar.com.mx",
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: "api/getaccesstoken",
            });

            const { data } = await axios<Country[]>({
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${response.data.auth_token}`,
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: "api/countries/",
            });
            countryList.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    const selectState = async (country: string) => {
        try {
            loadingState.value = true;
            const response = await axios({
                headers: {
                    Accept: "application/json",
                    "api-token":
                        "u_4reR5DmywH1sMRQ7c89NP96MPzcT54GQ5DBZWtvuCVKQAW_UF-88xX4hy36Qr7ymI",
                    "user-email": "edvazqueze@cotemar.com.mx",
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: "api/getaccesstoken",
            });

            const { data } = await axios<State[]>({
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${response.data.auth_token}`,
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: `api/states/${country}`,
            });
            stateList.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        } finally {
            loadingState.value = false;
        }
    };

    const selectCity = async (city: string) => {
        try {
            loadingCity.value = true;
            const response = await axios({
                headers: {
                    Accept: "application/json",
                    "api-token":
                        "u_4reR5DmywH1sMRQ7c89NP96MPzcT54GQ5DBZWtvuCVKQAW_UF-88xX4hy36Qr7ymI",
                    "user-email": "edvazqueze@cotemar.com.mx",
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: "api/getaccesstoken",
            });

            const { data } = await axios<City[]>({
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${response.data.auth_token}`,
                },
                method: "GET",
                baseURL: "https://www.universal-tutorial.com/",
                url: `api/cities/${city}`,
            });
            cityList.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        } finally {
            loadingCity.value = false;
        }
    };

    const selectUserProcessAction = async (userId: string, roleId: number) => {
        try {
            const { data } = await axios.get<dashData>(
                `${URLS.COTBUILDER}/api/UserSystem/GetUserProcessAction?UserId=${userId}&RoleId=${roleId}`
            );
            userProcessActionList.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    const selectTrust = async (RoleId: number) => {
        try {
            const { data } = await axios.get<UserTrust[]>(
                `${URLS.COTBUILDER}/api/UserSystem/selTrust?rolId=${RoleId}`
            );
            userTrustItems.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };
    const selectTrustB = async (TrustId: number, RoleId: number) => {
        try {
            const { data } = await axios.get<UserTrust[]>(
                `${URLS.COTBUILDER}/api/UserSystem/selTrustByIdTrust?trustId=${TrustId}&rolId=${RoleId}`
            );
            userTrustItemsB.value = data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    return {
        createUser,
        selectUser,
        updateUser,
        deleteUser,
        selectRols,
        selectCountry,
        selectState,
        selectCity,
        selectUserProcessAction,
        selectTrust,
        selectTrustB,
    };
};
