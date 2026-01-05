import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';
import moment from "moment";
import { keys } from "../../../constans/conts";
import { getTokenInformation, saveToken, saveTimeExp } from "./localStorageHelper";
import { getUrlBaseByName } from "@/helpers/httpResquest";

export default function jwtInterceptor() {
axios.interceptors.request.use(
  async function (config: any) {

    if (import.meta.env.VITE_APP_ROOT_APIFaktor === config.baseURL) {
      let tokenInformation = getTokenInformation();
      if (tokenInformation) {
        //config.headers.Authorization = `${ tokenInformation.token_type } ` + tokenInformation.access_token;
        let decoded = VueJwtDecode.decode(tokenInformation.token != undefined ? tokenInformation.token : tokenInformation.access_token);
        const exp = moment.unix(decoded.exp);
        let current_time = moment();

        if (current_time < exp) {

          config.headers.Authorization = `Bearer ` + (tokenInformation.token != undefined ? tokenInformation.token : tokenInformation.access_token);
        } else {

          let param = {
            RefreshToken: (tokenInformation.refreshToken != undefined ? tokenInformation.refreshToken : tokenInformation.refresh_token),
          }

          let baseUrl = getUrlBaseByName(keys.IDM)

          const settings = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
          }

          const fetchResponse = await fetch(`${baseUrl}/Authenticate/refresh`, settings);
          let result = await fetchResponse.json();
          var time = moment.now();
          time += tokenInformation.expiresIn;
          var timesave = moment(time).format("YYYY-MM-DD HH:mm:ss");
          tokenInformation.token = result.access_token;
          tokenInformation.refreshToken = result.refresh_token;
          tokenInformation.expirationDate = result.issuedUtc;
          saveTimeExp(timesave);
          saveToken(tokenInformation)

          config.headers.Authorization = `Bearer ` + result.accessToken;
        }
      }
    }


    return config

  },
  function (error) {
    // debugger;
    // console.log(error.toString())
    // Do something with request error
    return Promise.reject(error);
  }
);
}