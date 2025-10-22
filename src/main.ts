import { createApp, provide } from "vue";
import { i18n } from "./plugins/i18n";
import { createPinia } from "pinia";
import App from "./App.vue";
import { registerPlugins } from "@/plugins";
import { printWaterMark } from "./helpers/waterMark";
import { buildRoute } from "./modules/login/helpers/buildRoute";
import { getRoutes } from "./helpers/localstorageHandler";
import { logOff } from "./modules/login/helpers/verifyToken";
import "./middlewares/axiosMiddleware";
import router from "./router";
import VueCryptojs from "vue-cryptojs";
import "./helpers/veeValidate";
import "./styles/main.css";
import vue3GoogleLogin from "vue3-google-login";
//@ts-ignore
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
//@ts-ignore
import { VMoney } from "v-money";
import * as dayjs from "dayjs";
import "dayjs/locale/es";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.locale("es");
dayjs.extend(isSameOrBefore);

const pinia = createPinia();
const app = createApp(App);

app.component("CDatePicker", VueDatePicker);

registerPlugins(app);
const routes = getRoutes();
logOff();
buildRoute(routes);
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_APP_ROOT_CLIENTID,
});

app.use(pinia)
    .use(i18n)
    .use(router)
    .use(VueCryptojs)
    // .use(cotLib)
    .directive("money", VMoney)
    .mount("#app");

printWaterMark();

