<template>
    <CError
        :show="showAlert"
        :titulo="message"
        :color="message === 'REDIRECCIONANDO...' ? 'green' : 'red'"
        :close="() => (showAlert = false)"
    />
    <div class="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div class="w-full max-w-md">
            <!-- Mobile Logo -->
            <div class="lg:hidden text-center mb-8">
                <svg
                    class="w-12 h-12 text-yellow-400 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.38C20.77 4 21.08 4.31 21.08 4.69C21.08 4.86 21.02 5.02 20.91 5.14L20.07 6.14C19.58 6.68 18.86 7 18.1 7H17V8C17 10.76 14.76 13 12 13S7 10.76 7 8V7H5.9C5.14 7 4.42 6.68 3.93 6.14L3.09 5.14C2.98 5.02 2.92 4.86 2.92 4.69C2.92 4.31 3.23 4 3.62 4H7ZM9 8C9 9.66 10.34 11 12 11S15 9.66 15 8V6H9V8ZM12 15C12.55 15 13 15.45 13 16V22H11V16C11 15.45 11.45 15 12 15Z"
                    />
                </svg>
                <h1 class="text-2xl font-bold text-blue-900">
                    MATCH<span class="text-yellow-400">POINT</span>
                </h1>
            </div>

            <div
                class="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg"
            >
                <div class="space-y-1 text-center p-6 pb-4">
                    <h2 class="text-2xl font-bold text-gray-900">
                        Iniciar Sesión
                    </h2>
                    <p class="text-gray-600">
                        Ingresa tus credenciales para acceder
                    </p>
                </div>

                <div class="p-6 pt-0">
                    <form @submit.prevent="handleLoginGoogle" class="space-y-6">
                        <div class="space-y-2">
                            <label
                                for="email"
                                class="text-sm font-medium text-gray-900"
                            >
                                Usuario/Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                v-model="user.username"
                                class="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div class="space-y-2">
                            <label
                                for="password"
                                class="text-sm font-medium text-gray-900"
                            >
                                Contraseña
                            </label>
                            <div class="relative">
                                <input
                                    id="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••"
                                    v-model="user.password"
                                    class="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    @click="showPassword = !showPassword"
                                >
                                    <svg
                                        v-if="showPassword"
                                        class="h-4 w-4 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        class="h-4 w-4 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <!-- <div class="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  v-model="rememberMe"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="remember" class="text-sm text-gray-600 cursor-pointer">
                  Recordarme
                </label>
              </div> -->
                            <button
                                type="button"
                                class="text-sm text-blue-900 hover:text-blue-700"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        <div class="space-y-3">
                            <button
                                v-if="!isLoading"
                                type="submit"
                                @click="handleLoginGoogle()"
                                class="w-full h-11 bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold rounded-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Iniciar Sesión
                            </button>
                            <div v-else class="items-center">
                                Validando datos...
                            </div>
                            <button
                                type="button"
                                class="w-full h-11 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-all bg-transparent rounded-md"
                            >
                                Crear Cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <p class="text-center text-sm text-gray-600 mt-6">
                Al iniciar sesión, aceptas nuestros
                <button class="text-blue-900 hover:underline">
                    Términos de Servicio
                </button>
                y
                <button class="text-blue-900 hover:underline">
                    Política de Privacidad
                </button>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLogin } from "../composables/useLogin";
import { encryptedText, decrypt } from "@/helpers/cryptoJS";
import { rememberMeGet } from "../helpers/rememberMe";
import { useLoginStore } from "../store/state";
import { storeToRefs } from "pinia";
import { buildRoute } from "../helpers/buildRoute";
import {
    getRoutes,
    saveAmbiente,
    getAmbiente,
} from "@/helpers/localstorageHandler";
import { GoogleResponse, UserCredentials } from "@/interfaces/User";
import router from "@/router";
import jwt_decode from "jwt-decode";
import { AMBIENT, RECAPTCHA } from "@/helpers/constants";
import CError from "../../../components/core/CError.vue";
const { loginGoogle } = useLogin();
const { isLogged } = storeToRefs(useLoginStore());
const year = new Date().getFullYear();
const captchaToken = ref(null);
const accessClassic = ref(false);
const isLoading = ref<boolean>(false);
const message = ref<string>("");
const showAlert = ref<boolean>(false);
const showPassword = ref(false);

const user = ref<UserCredentials>({
    password: "",
    rememberMe: false,
    username: "",
    activeDirectory: false,
    typeCredential: 0,
    email: "",
    token: "",
});

const data: {
    cus: string;
    cup: string;
    ctc: number;
} = rememberMeGet();

if (data) {
    user.value.username = data.cus;
    user.value.password = data.cup;
    user.value.rememberMe = true;
    accessClassic.value = data.ctc === 1 ? true : false;
}

const handleLoginGoogle = async () => {
    isLoading.value = true;
    user.value.email = user.value.username;
    await loginGoogle(user.value);
    if (isLogged.value) {
        message.value = "REDIRECCIONANDO...";
        showAlert.value = true;
        isLoading.value = false;
        setTimeout(() => {
            router.push("Home");
        }, 2000);
    } else {
        accessDenied();
    }
};

const accessDenied = (errorCaptcha: boolean = false) => {
    // if (errorCaptcha) {
    //     message.value = "POR FAVOR DE VALIDAR EL CAPTCHA";
    //     showAlert.value = true;
    //     isLoading.value = false;
    //     return;
    // }

    message.value =
        "No tiene permiso para acceder al sistema, comuníquese con el administrador.";
    showAlert.value = true;
    isLoading.value = false;
};
</script>
