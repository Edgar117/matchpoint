<template>
    <v-app>
        <div class="w-full h-full bg-[#f1f5f9]">
            <NavigationDrawer class="" v-if="!mobile" />
            <app-bar-mobile class="sticky top-0 bg-white z-50" v-else />
            <v-app-bar v-if="!mobile" elevation="1">
                <template v-slot:prepend>
                    <h3 class="hidden md:block">MATCH-POINT</h3>
                </template>
                <template v-slot:append>
                    <div class="flex gap-2 px-2">
                        <div class="flex items-center">
                            <p class="font-bold">
                                {{
                                    user?.rolesUser.find(
                                        (x) => x.roleId == roleSelectId
                                    )?.rol ?? ""
                                }}
                            </p>
                        </div>
                        <!-- <v-select
                        hide-details
                        variant="underlined"
                        density="compact"
                        v-model="$i18n.locale"
                        :change="setLocaleSelected($i18n.locale)"
                        :items="$i18n.availableLocales"
                    ></v-select> -->
                        <RolSelect />
                        <!-- <BellNotification /> -->
                        <ProfileUser />
                    </div>
                </template>
            </v-app-bar>

            <v-main class="bg-[#f1f5f9]">
                <v-snackbar
                    v-if="snackbar?.valueModel"
                    timeout="3000"
                    :color="getColorSnackbar()"
                    variant="flat"
                    location="right top"
                    v-model="snackbar!.valueModel"
                >
                    <div class="flex gap-1">
                        <v-icon class="mr-2">{{ getIconSnackbar() }}</v-icon>
                        <div v-html="snackbar?.text"></div>
                    </div>

                    <template v-slot:actions>
                        <v-btn icon @click="snackbar!.valueModel = false">
                            <v-icon size="small">mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>

                <div class="p-4">
                    <RouterView :key="$route.fullPath" />
                </div>
            </v-main>
        </div>
    </v-app>
</template>

<script setup lang="ts">
import RolSelect from "@/components/DashboardLayout/RolSelect.vue";
import ProfileUser from "@/components/DashboardLayout/ProfileUser.vue";
import AppBarMobile from "../components/DashboardLayout/AppBarMobile.vue";
import NavigationDrawer from "@/components/DashboardLayout/NavigationDrawer.vue";
import { getCurrentUser } from "../helpers/localstorageHandler";
import { useLoginStore } from "../modules/login/store/state";
import { storeToRefs } from "pinia";
import { useTemplateUI } from "@/store/templateUI";
import { setLocale } from "@vee-validate/i18n";
import vuetify from "@/plugins/vuetify";
import { useUserGlobal } from "../store/userGlobal";
import { useRolService } from "../modules/rol/composables/useRolService";
import { buildRoute } from "../modules/login/helpers/buildRoute";
import { watch } from "vue";
import router from "@/router";
const { roleSelectId, permitions } = storeToRefs(useUserGlobal());
const value = getCurrentUser();
const { user, screensRole } = storeToRefs(useLoginStore());
const { snackbar } = storeToRefs(useTemplateUI());
const { locale } = vuetify;
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
const { selScreenByRol } = useRolService();

if (value) {
    user.value = JSON.parse(value);
}

const getColorSnackbar = () => {
    if (snackbar.value?.type === "success") {
        return "success";
    }

    if (snackbar.value?.type === "error") {
        return "error";
    }

    if (snackbar.value?.type === "warning") {
        return "warning";
    }
};

const getIconSnackbar = () => {
    if (snackbar.value?.type === "success") {
        return "mdi-check-circle-outline";
    }

    if (snackbar.value?.type === "error") {
        return "mdi-close-circle-outline";
    }

    if (snackbar.value?.type === "warning") {
        return "mdi-alert-circle-outline";
    }
};

const setLocaleSelected = (val: any) => {
    locale.current.value = val;
    setLocale(val);
};

watch([roleSelectId], async () => {
    const response = await selScreenByRol(roleSelectId.value);
    permitions.value = response?.acciones ?? [];
    buildRoute(response?.screens ?? []);
    screensRole.value = buildRoute(response?.screens ?? [], true);
    if (response?.screens.length) {
        var currentUrl = window.location.pathname.split("/");
        const pathName = currentUrl[currentUrl.length - 1];
        if (
            response?.screens.find(
                (x) =>
                    x.name.toLocaleLowerCase().replaceAll(" ", "") ==
                        pathName ||
                    x.children.filter(
                        (y) =>
                            y.path.toLocaleLowerCase().replaceAll(" ", "") ==
                            pathName
                    ).length > 0
            )
        ) {
            return;
        } else {
            if (response?.screens.find((x) => x.path == "Home")) {
                router.push({ name: "Home" });
            } else {
                router.push({
                    name: response?.screens[0].hasChildren
                        ? response?.screens[0].children[0].name
                        : response?.screens[0].name,
                });
            }
        }
    }
});
</script>
