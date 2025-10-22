<template>
    <v-menu
        v-model="menu"
        location="bottom center"
        offset="15"
        :close-on-content-click="false"
    >
        <template v-slot:activator="{ props }">
            <div
                v-bind="props"
                class="border items-center cursor-pointer rounded-full ring ring-blue-600 ring-offset-white ring-offset-2 w-12 h-12 md:mt-5"
            >
                <img class="rounded-full"  src="../../assets/undraw_male-avatar_zkzx.png" alt="" />
            </div>

            <!-- <div
                v-bind="props"
                class="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
                <img :src="user?.user.img" alt="avatar" class="rounded-full"  />
            </div> -->
        </template>
        <div
            class="bg-white shadow-lg px-6 p-4 rounded-lg border w-[400px] flex flex-col items-start justify-start"
        >
            <div class="flex w-full flex-col items-center justify-center mb-1">
                <img
                    class="rounded-full border w-20 h-20 mx-auto object-cover cursor-pointer"
                    src="../../assets/undraw_male-avatar_zkzx.png"
                    alt="user photo"
                />
                <p class="text-sm font-medium mt-2">
                    {{ user?.user.fullName }}
                </p>
                <p class="text-xs text-[#757575]">{{ user?.user.email }}</p>
            </div>
            <div class="border-t w-full my-2"></div>
            <div class="text-xs flex gap-5">
                <v-icon color="#757575" size="large"
                    >mdi-account-group-outline</v-icon
                >
                <div>
                    <p class="font-bold text-base">Role</p>
                    <p class="text-[#757575] font-semibold">
                        {{ user?.rolesUser.map((x) => x.rol).join(",") }}
                    </p>
                </div>
            </div>
            <div class="border-t w-full my-2"></div>
            <p class="w-full text-xs text-center text-[#757575] mb-2">
                Version {{ Package.version }}
            </p>
            <p class="w-full text-xs text-center text-[#757575] mb-2">
                Date Release : {{ Package.compilation }}
            </p>

            <div class="w-full justify-center flex gap-2 mb-4">
                <v-btn
                    @click="menu = false"
                    variant="outlined"
                    density="comfortable"
                    >Cancel</v-btn
                >
                <v-btn
                    @click="() => logout()"
                    variant="flat"
                    density="comfortable"
                    prepend-icon="mdi-logout"
                    color="red"
                    >Logout</v-btn
                >
            </div>

            <!-- <div>
                <div class="flex justify-end text-sm">
                    <p>
                        <strong class="text-red-600">powered</strong>
                        <span class="text-red-600">by</span> <span>TIC</span>
                    </p>
                </div>
                <div class="border-t w-full my-2"></div>
                <div class="leading-4 text-xs text-center">
                    Copyright &copy;{{ year }} COTEMAR S.A. de C.V. Todos los
                    derechos reservados. Este sistema pertenece, es operado y
                    monitoreado por Grupo Cotemar S.A. de C.V. y contiene
                    información confidencial propiedad de Cotemar. Cualquier
                    acceso o uso no autorizado a este sistema por la
                    administración de Cotemar no será permitido y podrá ser
                    reportado a las autoridades competentes y/o ser objeto de
                    alguna acción civil. Si usted no está autorizado a accesar o
                    usar este sistema, desconectese ahora.
                </div>
            </div> -->
        </div>
    </v-menu>
</template>
<script lang="ts" setup>
import { useLoginStore } from "../../modules/login/store/state";
import { storeToRefs } from "pinia";
import { logout } from "@/modules/login/helpers/verifyToken";
import { ref } from "vue";
import Package from "../../../package.json";

const { user } = storeToRefs(useLoginStore());
const menu = ref(false);
const year = new Date().getFullYear();
</script>
