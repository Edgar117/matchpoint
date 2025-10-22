// import { useLogin } from './../composables/useLogin';
import { getToken } from "@/helpers/localstorageHandler";
import { i18n } from "@/plugins/i18n";
import {
    verifyExpirationTokenAndRefresh,
    logOff,
} from "../modules/login/helpers/verifyToken";
import axios from "axios";
import { useTemplateUI } from "@/store/templateUI";

axios.defaults.headers["Access-Control-Allow-Origin"];
axios.interceptors.request.use(
    async (config) => {
        if (config.baseURL == "https://www.universal-tutorial.com/") {
            return config;
        }
        const token = getToken();
        if (token) {
            logOff();
            const tokenVerifyed = await verifyExpirationTokenAndRefresh();
            config.headers["Authorization"] = `Bearer ${tokenVerifyed}`;
            config.headers["Accept-Language"] = i18n.global.locale;
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(null, (error) => {
    if (error && error.response.status == 404) {
        const { handleShowSnackbar } = useTemplateUI();
        const errorMessage = error?.response?.data?.message;
        handleShowSnackbar({
            text: `<b>${errorMessage ?? error.response.data}</p> `,
            type: "warning",
            valueModel: true,
        });
    } else if (error && error.response.status == 409) {
        const { handleShowSnackbar } = useTemplateUI();
        const errorMessage = error?.response?.data?.message;
        handleShowSnackbar({
            text: `<b>${errorMessage ?? error.response.data}</p> `,
            type: "warning",
            valueModel: true,
        });
    } else if (error && error.response.status != 401) {
        const { handleShowSnackbar } = useTemplateUI();

        const errorMessage = error?.response?.data?.message; //nullish coalescing para peticiones que devuelven un objeto con una prop message en peticiones erróneas (400, 404, etc.)
        handleShowSnackbar({
            text: `<b>${errorMessage ?? error.message}</p> `,
            type: error.response.status === 400 ? "warning" : "error",
            valueModel: true,
        });
    }
});
