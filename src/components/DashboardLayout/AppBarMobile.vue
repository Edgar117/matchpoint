<template>
    <div class="navbar flex justify-between bg-[#fdfdfd] items-center">
        <div class="flex-none">
            <v-menu min-width="200px" rounded :close-on-content-click="true">
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-5 h-5 stroke-current"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </v-avatar>
                    </v-btn>
                </template>
                <div class="card glass">
                    <div class="card-body">
                        <div class="avatar">
                            <div
                                class="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                            >
                                <img :src="user?.user.img" alt="avatar" />
                            </div>
                        </div>
                        <div class="card-title mt-2">
                            <h2 class="text-black">
                                {{ user?.user.fullName }}
                            </h2>
                        </div>

                        <p class="text-black">{{ user?.user.email }}</p>
                        <v-divider class="my-3"></v-divider>

                        <div
                            class="font-semibold text-gray-500 px-2 py-2"
                            v-for="route in screensRole"
                            :key="route.name"
                        >
                            <div
                                class="flex flex-row items-center"
                                @click="
                                    () => {
                                        if (route.hasChildren) return;
                                        handleRoute(route.name);
                                    }
                                "
                            >
                                <v-icon
                                    color="info"
                                    :icon="route.icon"
                                ></v-icon>
                                <span class="text-black ml-2">
                                    {{ route.name }}
                                </span>
                            </div>

                            <div
                                v-if="route.hasChildren"
                                class="flex flex-col ml-6 gap-2"
                            >
                                <!-- {{  route.children }} -->
                                <div
                                    v-for="item in route.children"
                                    :key="item.name"
                                    class="mt-2"
                                    @click="handleRoute(item.name)"
                                >
                                    <v-icon
                                        color="white"
                                        :icon="item.icon"
                                    ></v-icon>
                                    <span class="text-black ml-2">
                                        {{ item.name }}
                                    </span>
                                </div>
                            </div>

                            <v-divider class="my-2"></v-divider>
                            <!-- <v-list
                                class="mt-2 bg-transparent"
                                :lines="false"
                                density="compact"
                                nav
                            >
                                <v-list-item
                                    v-for="(child, i) in route.children"
                                    :key="i"
                                    :to="`/${route.path}/${child.path}`"
                                    class="text-black text-lg"
                                >
                                    <template v-slot:prepend>
                                        <v-icon :icon="child.icon"></v-icon>
                                    </template>

                                    <v-list-item-title v-text="child.name">
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list> -->
                        </div>
                    </div>
                </div>
            </v-menu>
        </div>
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">
                {{
                    user?.rolesUser.find((x) => x.roleId == roleSelectId)
                        ?.rol ?? ""
                }}</a
            >
        </div>
        <div class="flex-none">
            <RolSelect />
            <ProfileUser class="-mt-10" />
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
import RolSelect from "../../components/DashboardLayout/RolSelect.vue";
import router from "../../router";
import { useUserGlobal } from "../../store/userGlobal";
const { roleSelectId } = storeToRefs(useUserGlobal());
let routes = buildRoute(getRoutes() ?? [], true)?.filter(
    (route) => route.level !== 0
);
const rotesWithFilter = ref(routes);

const { user, screensRole } = storeToRefs(useLoginStore());

const handleRoute = (name: string) => {
    router.push({ name: name });
};
</script>
