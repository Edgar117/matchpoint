import { storeToRefs } from "pinia";
import { useLoginStore } from "@/modules/login/store/state";
import axios from "axios";
import { buildRoute } from "../helpers/buildRoute";
import jwt_decode from "jwt-decode";
import {
    clearLocalStorage,
    deleteRememberMe,
    saveCurrentUser,
    saveToken,
} from "../../../helpers/localstorageHandler";
import { transformUser } from "../helpers/trasnformUser";
import { rememberMeSave } from "../helpers/rememberMe";
import { GoogleResponse, UserCredentials } from "@/interfaces/User";
import { URLS } from "@/helpers/constants";
export const useLogin = () => {
    const {
        user: userStore,
        isLogged,
        screensRole,
    } = storeToRefs(useLoginStore());

    const loginGoogle = async (payload: UserCredentials) => {
        try {
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                Authorization: "",
            };

            const { data } = await axios({
                headers: headers,
                method: "POST",
                baseURL: URLS.COTBUILDER,
                url: "api/Acceso/Login",
                data: {
                    correo: payload.email,
                    clave: payload.password,
                },
            });

            if (data.isSuccess) {

                //Save the token us
                saveToken(data);
                const token_inf = jwt_decode(data.accessToken);
                console.log(token_inf)
                const userData = transformUser(payload, token_inf, JSON.parse( token_inf.Rols));
                userStore.value = userData;
                saveCurrentUser(userStore.value);
            } else {
                isLogged.value = false;
                return;
            }

            //Obtenemos las pantallas
            const screenRol = await axios({
                headers: headers,
                method: "GET",
                baseURL: URLS.COTBUILDER,
                url: "api/Menu/" +userStore.value.user.roleId,
                // data: {
                //     token: googleUser.credential,
                // },
            });
            // console.log(screenRol.data)
            buildRoute(screenRol.data.screens);
            screensRole.value = buildRoute(screenRol.data.screens, true);
            isLogged.value = true;
        } catch (error) {
            // console.log(error);
            isLogged.value = false;
            clearLocalStorage();
        }
    };

    return {
        loginGoogle,
    };
};
