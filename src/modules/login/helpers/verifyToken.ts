// import axios from "axios";

// @ts-nocheck
import jwt_decode from "jwt-decode";
import moment from "moment";
import {
    deleteCurrentUser,
    deleteRoute,
    deleteToken,
    getToken,
    saveToken,
} from "@/helpers/localstorageHandler";
import { TokenResponse } from "../interfaces/TokenResponse";
import { URLS } from "@/helpers/constants";
import router from "@/router";

export const verifyExpirationTokenAndRefresh = async () => {
    try {
        const token: TokenResponse = JSON.parse(getToken());
        const decoded = jwt_decode(token.accessToken);
        const exp = moment.unix(decoded.exp);
        const current_time = moment();
        // Renovar el token si expira en menos de 1 minuto
        const timeUntilExpiration = exp.diff(current_time, 'minutes');
        // console.log(decoded)
        // console.log(token.refreshToken)
        if (timeUntilExpiration > 1) {
            return `${token.accessToken}`;
        } else {
            const body = {
                expiredAccessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };

            const settings = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };

            const fetchResponse = await fetch(
                `${URLS.COTBUILDER}/api/Acceso/RefreshToken`,
                settings
            );

            const result = await fetchResponse.json();
            saveToken(result);

            return result.accessToken;
        }
    } catch (error) {
        return "";
    }
};
export const logOff = async () => {
    if (getToken()) {
        const token: TokenResponse = JSON.parse(getToken());
        const decoded = jwt_decode(token.accessToken);
        const emited = moment(decoded.iat * 1000);
        const current_time = moment();

        if (current_time.diff(emited, "minutes") >= 30) {
            localStorage.clear();
            logout();
            return;
        }
    }
};

export const logout = async () => {
    deleteToken();
    deleteRoute();
    deleteCurrentUser();
    router.push("/login");
};
