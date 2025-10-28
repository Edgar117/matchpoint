<template>
    <div class="border-b border-gray-200 bg-white">
        <div
            class="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto"
        >
            <!-- Left Section: Menu Button + App Name -->
            <div class="flex items-center gap-3">
                <v-menu
                    min-width="280px"
                    rounded
                    :close-on-content-click="true"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            icon
                            v-bind="props"
                            class="hover:bg-gray-100 transition-colors"
                            variant="text"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="w-6 h-6 stroke-gray-700"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </v-btn>
                    </template>

                    <!-- Menu Content -->
                    <div
                        class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                    >
                        <!-- User Profile Section -->
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex flex-col items-center text-center">
                                <div
                                    class="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-3"
                                >
                                    <!-- <img
                                        :src="user?.user.img"
                                        alt="avatar"
                                        class="w-full h-full object-cover"
                                    /> -->
                                    <img
                                        class="w-full h-full object-cover"
                                        src="../../assets/undraw_male-avatar_zkzx.png"
                                        alt=""
                                    />
                                </div>
                                <h2
                                    class="text-base font-semibold text-gray-900"
                                >
                                    {{ user?.user.fullName }}
                                </h2>
                                <p class="text-sm text-gray-500 mt-1">
                                    {{ user?.user.email }}
                                </p>
                            </div>
                        </div>

                        <!-- Navigation Routes -->
                        <div
                            class="py-2 max-h-[calc(100vh-250px)] overflow-y-auto"
                        >
                            <div
                                v-for="route in routes"
                                :key="route.name"
                                class="px-2"
                            >
                                <!-- Parent Route -->
                                <div
                                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                    @click="
                                        () => {
                                            if (route.hasChildren) return;
                                            handleRoute(route.name);
                                        }
                                    "
                                >
                                    <v-icon
                                        :icon="route.icon"
                                        size="20"
                                        class="text-gray-600 group-hover:text-gray-900"
                                    ></v-icon>
                                    <span
                                        class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                                    >
                                        {{ route.name }}
                                    </span>
                                </div>

                                <!-- Child Routes -->
                                <div
                                    v-if="route.hasChildren"
                                    class="ml-8 mt-1 space-y-1"
                                >
                                    <div
                                        v-for="item in route.children"
                                        :key="item.name"
                                        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                        @click="handleRoute(item.name)"
                                    >
                                        <v-icon
                                            :icon="item.icon"
                                            size="18"
                                            class="text-gray-500 group-hover:text-gray-700"
                                        ></v-icon>
                                        <span
                                            class="text-sm text-gray-600 group-hover:text-gray-900"
                                        >
                                            {{ item.name }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Divider (except for last item) -->
                                <div
                                    v-if="
                                        routes?.length &&
                                        route !== routes[routes.length - 1]
                                    "
                                    class="h-px bg-gray-100 my-2 mx-3"
                                ></div>
                            </div>
                        </div>
                    </div>
                </v-menu>

                <h1 class="text-base font-semibold text-gray-900">
                    MATCH-POINT
                </h1>
            </div>

            <!-- Right Section: Profile User -->
            <div>
                <ProfileUser />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoginStore } from "../../modules/login/store/state";
import { storeToRefs } from "pinia";
import ProfileUser from "./ProfileUser.vue";
import { getRoutes } from "../../helpers/localstorageHandler";
import { buildRoute } from "../../modules/login/helpers/buildRoute";
import router from "../../router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let routes = buildRoute(getRoutes() ?? [], true)?.filter(
    (route) => route.level !== 0
);

const rotesWithFilter = ref(routes);
const { user } = storeToRefs(useLoginStore());

const handleRoute = (name: string) => {
    router.push({ name: name });
};
</script>

<style scoped>
/* Opcional: Estilos adicionales si necesitas personalización extra */
</style>
