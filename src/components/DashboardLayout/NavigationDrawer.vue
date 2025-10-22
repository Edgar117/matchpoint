<template>
    <v-navigation-drawer
        permanent
        location="left"
        :width="!drawer ? 75 : 280"
        color="#111827"
    >
        <HeaderDrawer v-model="drawer" />

        <div class="mt-28 flex flex-col items-center">
            <img
                :class="[{ 'w-10 h-10': !drawer }, { 'w-24 h-24': drawer }]"
                class="rounded-full mx-auto mb-4 object-cover"
                src="../../assets/undraw_male-avatar_zkzx.png"
                alt=""
            />

            <h2 class="text-white text-sm">
                {{
                    drawer
                        ? `${user?.user.fullName}`
                        : `${user?.user.firstName.charAt(
                              0
                          )} ${user?.user.lastName.charAt(0)}`
                }}
            </h2>
            <p v-if="drawer" class="text-[13px] text-[#94a3b8]">
                {{ user?.user.email }}
            </p>
        </div>

        <div class="px-8 mt-10">
            <h2
                :class="[{ hidden: !drawer }]"
                class="text-[#9ca3af] font-semibold text-xs"
            >
                NODULOS
            </h2>
        </div>

        <div :class="[{ hidden: !drawer }]" class="px-5 mb-2 mt-10">
            <v-text-field
                label="Escriba para buscar"
                density="compact"
                hide-details
                v-model="filtertext"
            ></v-text-field>
        </div>
        <v-list v-if="drawer" v-model:opened="open">
            <v-list-item
                v-for="(item, i) in rotesWithFilter"
                :key="item.name"
                style="color: azure; text-align: left; display: flex"
            >
                <v-list-item
                    class="item-xyz-menu"
                    v-if="!item.hasChildren"
                    @click="() => {}"
                    :to="`/${item.path}`"
                    :prepend-icon="item.icon"
                    :title="item.name"
                >
                </v-list-item>
                <v-list-group v-else :key="i" :value="item.name">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            class="w-full"
                            v-bind="props"
                            :title="item.name"
                        >
                            <!-- PARENT NO COLAPSADO -->
                            <template v-slot:prepend>
                                <v-icon v-bind="props" small>{{
                                    item.icon
                                }}</v-icon>
                            </template>
                        </v-list-item>
                    </template>

                    <v-list-group
                        v-for="(subChildren, index) in item.children"
                        :value="subChildren.name"
                        :key="index"
                    >
                        <template v-slot:activator="{ props }">
                            <!-- {{ subChildren }} -->
                            <v-list-item
                                v-if="subChildren.hasChildren"
                                class="secondLevel"
                                v-bind="props"
                                :title="subChildren.name.split('||')[1]"
                            >
                                <!-- <template v-slot:prepend>
                                    <v-icon small>{{ subChildren.icon }}</v-icon>
                                </template> -->
                            </v-list-item>
                        </template>
                        <!-- <v-list-item
                            v-if="subChildren.hasChildren"
                            class="thirdLevel"
                            v-for="(finalChildrens, i) in subChildren.children"
                            :key="i"
                            :title="finalChildrens.name"
                            :value="finalChildrens.name"
                            @click="() => {}"
                            :to="`/${item.path}/${subChildren.path}/${finalChildrens.path}`"
                        >
                        </v-list-item> -->
                    </v-list-group>
                    <template
                        v-for="(subChildren, index) in item.children"
                        :key="index"
                    >
                        <v-list-item
                            v-if="!subChildren.hasChildren"
                            :value="subChildren.name"
                            :title="subChildren.name"
                            @click="() => {}"
                            :to="`/${item.path}/${subChildren.path}`"
                        >
                            <template v-slot:prepend>
                                <v-icon small>{{ subChildren.icon }}</v-icon>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-group>
            </v-list-item>
        </v-list>
        <v-list v-else>
            <v-list-item v-for="(item, i) in screensRole" :key="i">
                <v-menu
                    :close-on-content-click="item.level !== 3"
                    location="end"
                    open-on-hover
                    offset="18"
                    rounded
                >
                    <template v-slot:activator="{ props, isActive }">
                        <router-link
                            v-if="!item.hasChildren"
                            :to="{ name: item.name }"
                        >
                            <div
                                v-bind="props"
                                :class="[
                                    { 'justify-center': !drawer },
                                    { 'justify-start': drawer },
                                    {
                                        'bg-drawer-primary-blue-800':
                                            item.name === $route.name,
                                    },
                                ]"
                                class="flex gap-4 px-4 py-2 rounded-lg hover:bg-drawer-primary-blue-800 hover:bg-opacity-40 group"
                            >
                                <v-icon
                                    :class="[
                                        {
                                            'text-drawer-primary-icon':
                                                item.name === $route.name,
                                        },
                                    ]"
                                    >{{ item.icon }}</v-icon
                                >
                                <v-list-item-title
                                    v-if="drawer"
                                    :class="[
                                        {
                                            'text-white':
                                                item.name === $route.name,
                                        },
                                    ]"
                                    class="text-white"
                                >
                                    {{ item.name }}
                                </v-list-item-title>
                            </div>
                        </router-link>
                        <div
                            v-else
                            v-bind="props"
                            :class="[
                                { 'justify-center': !drawer },
                                { 'justify-start': drawer },
                                {
                                    'bg-drawer-primary-blue-800 bg-opacity-80':
                                        isActive ||
                                        $route.path.includes(
                                            removeAccents(
                                                item.name.toLowerCase()
                                            )
                                        ),
                                },
                            ]"
                            class="flex cursor-default gap-4 px-4 py-2 rounded-lg hover:bg-drawer-primary-blue-800 hover:bg-opacity-80 group"
                        >
                            <div
                                :class="[{ 'w-full': drawer }]"
                                class="flex gap-4"
                            >
                                <v-icon
                                    :class="[
                                        {
                                            'text-drawer-primary-icon':
                                                $route.path.includes(
                                                    removeAccents(
                                                        item.name.toLowerCase()
                                                    )
                                                ),
                                        },
                                    ]"
                                    >{{ item.icon }}</v-icon
                                >
                                <v-list-item-title
                                    v-if="drawer"
                                    :class="[
                                        {
                                            'text-white': $route.path.includes(
                                                removeAccents(
                                                    item.name.toLowerCase()
                                                )
                                            ),
                                        },
                                    ]"
                                    class="text-white"
                                >
                                    {{
                                        item.name.includes("||")
                                            ? item.name.split("||")[0]
                                            : item.name
                                    }}
                                </v-list-item-title>
                            </div>

                            <v-icon v-if="drawer" color="#b8babf"
                                >mdi-menu</v-icon
                            >
                        </div>
                    </template>

                    <v-card
                        elevation="0"
                        v-if="item.hasChildren"
                        min-width="250"
                        class="border"
                    >
                        <template v-if="!item?.hasChildren">
                            <v-list-item
                                v-for="(childRoute, i) in item.children"
                                :key="i"
                                @click="() => {}"
                                class="flex gap-4 px-4 rounded-lg"
                                :to="childRoute.path"
                                :prepend-icon="childRoute.icon"
                                :title="childRoute.name"
                            >
                            </v-list-item>
                        </template>
                        <template v-else>
                            <template
                                v-for="(childRoute, i) in item.children"
                                :key="i"
                            >
                                <v-menu
                                    v-if="childRoute.hasChildren"
                                    location="end"
                                    open-on-hover
                                    offset="2"
                                    rounded
                                >
                                    <template
                                        v-slot:activator="{ props: propsChild }"
                                    >
                                        <v-list-item
                                            :prepend-icon="childRoute.icon"
                                            v-bind="propsChild"
                                            class="w-full"
                                            @click="() => {}"
                                        >
                                            {{
                                                childRoute.name?.includes("||")
                                                    ? childRoute.name?.split(
                                                          "||"
                                                      )[1]
                                                    : childRoute.name
                                            }}
                                        </v-list-item>
                                    </template>
                                    <v-card
                                        elevation="0"
                                        min-width="250"
                                        class="border"
                                    >
                                        <!-- <v-list-item
                                            :prepend-icon="child.icon"
                                            :title="child.name"
                                            v-for="(
                                                child, j
                                            ) in childRoute.children"
                                            :key="j"
                                            @click="() => {}"
                                            :to="`/${item.path}/${childRoute.path}/${child.path}`"
                                        >
                                        </v-list-item> -->
                                    </v-card>
                                </v-menu>

                                <v-list-item
                                    :prepend-icon="childRoute.icon"
                                    :to="{ name: childRoute.name }"
                                    v-else
                                    class="w-full"
                                    @click="() => {}"
                                >
                                    {{ childRoute.name }}
                                </v-list-item>
                            </template>
                        </template>
                    </v-card>
                </v-menu>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTemplateUI } from "../../store/templateUI";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../modules/login/store/state";
import HeaderDrawer from "../../components/DashboardLayout/HeaderDrawer.vue";
import { getRoutes } from "@/helpers/localstorageHandler";
import { buildRoute } from "@/modules/login/helpers/buildRoute";
import { ref, watch } from "vue";
import { removeAccents } from "@/helpers/tools";
import { useUserGlobal } from "../../store/userGlobal";
const { roleSelectId } = storeToRefs(useUserGlobal());
const { drawer } = storeToRefs(useTemplateUI());
const { user, screensRole } = storeToRefs(useLoginStore());

const routes = ref(buildRoute(getRoutes(), true));
const rotesWithFilter = ref(routes);
const filtertext = ref("");
const open = ref([""]);
// console.log(routes)
const filterMenu = (menu: any, searchText: string): any => {
    // debugger;
    return menu
        ?.map((item: any) => {
            // console.log(item);
            const children = item.hasChildren
                ? filterMenu(item.children, searchText)
                : [];
            const hasMatchingChildren = children!.length > 0;
            if (
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                hasMatchingChildren
            ) {
                return { ...item, children: children };
            }
            return null;
        })
        .filter(Boolean);
};

watch(filtertext, () => {
    open.value = [];
    rotesWithFilter.value = filterMenu(screensRole.value, filtertext.value);
    if (rotesWithFilter.value?.length == 1) {
        open.value.push(
            rotesWithFilter.value[0] ? rotesWithFilter.value[0].name : ""
        );
        if (rotesWithFilter.value[0].children.length == 1) {
            open.value.push(
                rotesWithFilter.value[0].children[0]
                    ? rotesWithFilter.value[0].children[0].name
                    : ""
            );
        }
    }
});

watch([screensRole], async () => {
    // setTimeout(() => {
    rotesWithFilter.value = screensRole.value;
    filtertext.value = "";
    // }, 2000);
});
</script>

<style scoped>
:deep(.v-list-item__content) {
    width: 100%;
}

.v-list-group__items {
    --indent-padding: 0px !important;
}
:deep(.v-list-group__items .secondLevel) {
    --indent-padding: 0px !important;
}
:deep(.v-list-group__items .thirdLevel) {
    --indent-padding: 10px !important;
}

.v-list-group__items .v-list-item {
    padding-inline-start: 30px !important; /* Dejar el !important solo si es absolutamente necesario */
}
/* .v-list-group__prepend {
    width: 25px;
    margin-right: 10px;
}

.v-list-item__prepend {
    width: 25px;
    margin-right: 10px;
}

.v-list-group {
    padding-left: 0px;
}

.second {
    .v-list-group__items {
        --indent-padding: 40px !important;
    }
}

.v-list-group__items {
    --indent-padding: 20px !important;
} */
</style>
