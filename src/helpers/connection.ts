import { settingHttp } from "./httpResquest";
import { keys } from "../constans/conts";
export const setConnection = () => {
        settingHttp.value.urlBase = [
            //se pueden agregar las url bases que se necesite, es necesario que todas lleven url y name
            {
                url: import.meta.env.VITE_APP_ROOT_APIFaktor, name: keys.APIFAKTORADR
            },
            {
                url: import.meta.env.VITE_APP_ROOT_CPI, name: keys.CPI
            },
            {
                url: import.meta.env.VITE_APP_ROOT_OPENTEXT, name: keys.OPENTEXT
            },
            {
                url: import.meta.env.VITE_APP_ROOT_SERVERIMAGE, name: keys.SERVERIMAGE 
            },
            {
                url: import.meta.env.VITE_APP_ROOT_APIIDM, name: keys.IDM 
            },
        ]
}
