import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

// screens
import LoginScreen from "../modules/login/screens/LoginPage.vue";
import storeFront from "../modules/storeFront/screens/Home.vue";
import TodosLosTorneos from "../modules/storeFront/screens/TodosLosTorneos.vue";
import DetalleTorneo from "../modules/storeFront/screens/DetalleTorneo.vue";
import { getTokenInformation } from "@/helpers/localstorageHandler";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: LoginScreen,
        meta: { requireAuth: false },
    },
    {
        path: "/inicio",
        name: "inicio",
        component: storeFront,
        meta: { requireAuth: false },
    },
    {
        path: "/torneos",
        name: "TodosLosTorneos",
        component: TodosLosTorneos,
        meta: { requireAuth: false },
    },
    {
        path: "/torneo/:id",
        name: "DetalleTorneo",
        component: DetalleTorneo,
        meta: { requireAuth: false },
    },
    {
        path: "/:pathMatch(.*)*", // ⛔ catch-all para rutas no definidas
        redirect: "/inicio",
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_ROOT_APPLICATION_BASE),
    routes,
});

router.beforeEach((to, from, next) => {
    const user = getTokenInformation();

    if (user === null) {
        // 🚫 Si no hay sesión
        if (to.name === "Login" || to.name === "inicio") {
            next(); // dejar entrar a login o inicio
        } else {
            next({ name: "inicio" }); // redirigir cualquier otra ruta a inicio
        }
    } else {
        // ✅ Si hay sesión
        if (to.name === "Login") {
            next({ name: "inicio" }); // si ya está logueado, no permitir login
        } else {
            next(); // dejar pasar a inicio u otra (si existiera)
        }
    }
});

export default router;
