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
        const decoded = jwt_decode(token.token);
        const exp = moment.unix(decoded.exp);
        const current_time = moment();
        // console.log(decoded)
        // console.log(token.refreshToken)
        if (current_time < exp) {
            return `${token.token}`;
        } else {
            const body = {
                RefreshToken: token.refreshToken,
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

            return result.token;
        }
    } catch (error) {
        return "";
    }
};
export const logOff = async () => {
    if (getToken()) {
        const token: TokenResponse = JSON.parse(getToken());
        const decoded = jwt_decode(token.token);
        const emited = moment(decoded.iat * 1000);
        const current_time = moment();

        if (current_time.diff(emited, "minutes") >= 60) {
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
