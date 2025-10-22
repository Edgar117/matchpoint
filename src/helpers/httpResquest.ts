import axios from "axios";
import { ref } from "vue";

const headerConfig = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
}

const headerConfigWithBasicAuth = {
    Accept: "application/json, text/plain, /",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Authorization": ""
}


export const http = {
    /**
     * Http realiza pecitiones de tipo GET a cualquier end-point
     * @param {String} endPoint recibe en end-point de la ruta
     * @param {Object} [params] Parametros que se envian atra vez de la petición
     * @param {String} [nameUlrBase] Nombre del edn-point a usar
     * @returns {Object}
     */
    get: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'GET',
                url: endPoint,
                params: params,
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {

                reject(error)
            });

        });
    },

    getWithBasicAuth: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}, basicAuth = "") {
        headerConfigWithBasicAuth.Authorization = basicAuth;
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'GET',
                url: endPoint,
                params: {},
                headers: headerConfigWithBasicAuth
            }).then(result => {
                resolve(result)
            }).catch(error => {

                reject(error)
            });

        });
    },

    getWithError: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'GET',
                url: endPoint,
                params: params,
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {
                resolve(error)
            });

        });
    },

    getBlob: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'GET',
                responseType: "blob",
                url: endPoint,
                params: params,
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {

                if (error.response) {
                    if (error.response.status != 409) {

                    }
                } else {

                }
                reject(error)
            });

        });
    },


    post: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'POST',
                url: endPoint,
                data: JSON.stringify(params),
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {
                //var err = error;
                //console.log(error.data)
                //debugger;

                reject(error)
            });

        });
    },

    put: function (endPoint = '', nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'PUT',
                url: endPoint,
                data: JSON.stringify(params),
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {

                reject(error)
            });

        });
    },

    putNotstringify: function (endPoint = '', nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);
        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'PUT',
                url: endPoint,
                data: params,
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {
                if (endPoint != 'Oficios/Cotemar/AsignacionFolio') {

                }
                reject(error)
            });

        });
    },

    del: function (endPoint = '', nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {
        let urlBase = getUrlBaseByName(nameUlrBase);

        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'DELETE',
                url: endPoint,
                data: JSON.stringify(params),
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {

                reject(error)
            });

        });
    },

    delParam: function (endPoint = '', nameUlrBase = settingHttp.value.urlBase[0].name, param = "") {
        let urlBase = getUrlBaseByName(nameUlrBase);

        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'DELETE',
                url: endPoint + "/" + param,
                headers: headerConfig
            }).then(result => {
                resolve(result)
            }).catch(error => {

                reject(error)
            });

        });
    },

    postFormData: function (endPoint = "", nameUlrBase = settingHttp.value.urlBase[0].name, params = {}) {

        let urlBase = getUrlBaseByName(nameUlrBase);

        return new Promise((resolve, reject) => {
            axios({
                baseURL: urlBase,
                method: 'POST',
                url: endPoint,
                data: params,
                headers: {
                    Accept: "application/json, text/plain, /",
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                }
            }).then(result => {

                resolve(result)
            }).catch(error => {
                if (error.response.status == 409) {

                } else {

                }


                reject(error)
            });

        });
    },
}


export const settingHttp = ref<ISettingHttp>({
    urlBase: []
});

export interface ISettingHttp {
    urlBase: any[];
}

export const getUrlBaseByName = (nameUlrBase: string) => {
    return settingHttp.value.urlBase.filter(item => item.name === nameUlrBase)[0].url || '';
}