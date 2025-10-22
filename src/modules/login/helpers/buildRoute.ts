import { removeAccents } from "@/helpers/tools";
import router from "@/router";
import dashboardLayout from "../../../layouts/LayoutDashboard.vue";
import { RouteRecordRaw } from "vue-router";
import { saveRoutes } from "@/helpers/localstorageHandler";
import { RolScreen } from "@/interfaces/Role";

export const buildRoute = (
    screens: RolScreen[],
    returnData: boolean = false
) => {
    const routesBase: any[] = [];
// console.log(screens)
    // routesBase.push({
    //     level: 1,
    //     name: "Home",
    //     icon: "mdi-home-circle",
    //     component: createImport("dashboard/screens/HomeScreen"),
    //     importPath: "dashboard/screens/HomeScreen",
    //     path: removeAccents("Home"),
    //     hasChildren: false,
    // });

    // routesBase.push({
    //     level: 2,
    //     name: "Catalogs",
    //     icon: "mdi-view-dashboard-edit",
    //     hasChildren: true,
    //     path: "catalogs",
    //     children: [
    //         {
    //             hasChildren: false,
    //             name: "Private Companies",
    //             icon: "mdi-domain",
    //             component: createImport(
    //                 "privateCompanyInvestment/screens/privateCompany"
    //             ),
    //             importPath: "privateCompanyInvestment/screens/privateCompany",
    //             path: removeAccents("PrivateCompanies"),
    //             tooltip: "Private Company",
    //         },
    //         {
    //             hasChildren: false,
    //             name: "Users",
    //             icon: "mdi-account-group",
    //             component: createImport("userCatalog/screens/User"),
    //             importPath: "userCatalog/screens/User",
    //             path: removeAccents("Users"),
    //             tooltip: "Users",
    //         },
    //         {
    //             hasChildren: false,
    //             name: "Trusts",
    //             icon: "mdi-key-chain",
    //             component: createImport("trust/screens/Trust"),
    //             importPath: "trust/screens/Trust",
    //             path: removeAccents("Trusts"),
    //             tooltip: "Trusts",
    //         },
    //         {
    //             hasChildren: false,
    //             name: "Roles",
    //             icon: "mdi-account-key-outline",
    //             component: createImport("rol/screens/rol"),
    //             importPath: "rol/screens/rol",
    //             path: removeAccents("roles"),
    //             tooltip: "roles",
    //         },
    //     ],
    //     meta: {
    //         requireAuth: true,
    //     },
    // });

    // routesBase.push({
    //     level: 1,
    //     name: "WorkFlows",
    //     icon: "mdi-sitemap-outline",
    //     component: createImport("flow/screens/Flow"),
    //     importPath: "dashboard/screens/Flow",
    //     path: removeAccents("Flow"),
    //     hasChildren: false,
    // });

    // routesBase.push({
    //     level: 2,
    //     name: "Request",
    //     icon: "mdi-clipboard-list-outline",
    //     hasChildren: true,
    //     path: "request",
    //     children: [
    //         {
    //             name: "My Requests",
    //             icon: "mdi-clipboard-list",
    //             component: createImport("request/screens/MyRequest"),
    //             importPath: "request/screens/Request",
    //             path: removeAccents("MyRequests"),
    //             hasChildren: false,
    //         },
    //         {
    //             name: "My Pending Work",
    //             icon: "mdi-bell-badge-outline",
    //             component: createImport("request/screens/RequestPending"),
    //             importPath: "request/screens/RequestPending",
    //             path: removeAccents("MyPendingWork"),
    //             hasChildren: false,
    //         },
    //         {
    //             name: "Requests",
    //             icon: "mdi-format-list-numbered",
    //             component: createImport("request/screens/Requests"),
    //             importPath: "request/screens/Requests",
    //             path: removeAccents("Requests"),
    //             hasChildren: false,
    //         },
    //     ],
    //     meta: {
    //         requireAuth: true,
    //     },
    // });

    // routesBase.push({
    //     level: 1,
    //     name: "Reports",
    //     icon: "mdi-chart-bar",
    //     component: createImport("dashboard/screens/HomeScreen"),
    //     importPath: "dashboard/screens/HomeScreen",
    //     path: removeAccents("Home"),
    //     hasChildren: false,
    // });

    screens.forEach((screen) => {
        if (!screen.hasChildren) {
            routesBase.push({
                level: 1,
                name: screen.name,
                icon: screen.icon,
                component: createImport(screen?.importPath ?? ""),
                importPath: screen?.importPath,
                path: removeAccents(
                    screen.path!.split(" ").join("").toLocaleLowerCase()
                ),
                hasChildren: false,
            });
        } else {
            routesBase.push({
                level: 2,
                name: screen!.name,
                icon: screen!.icon,
                hasChildren: true,
                path: removeAccents(
                    screen.name!.split(" ").join("").toLocaleLowerCase()
                ),
                children: screen.children
                    .sort((a, b) =>
                        (a.name ?? "") < (b.name ?? "") ? -1 : 1
                    )
                    .map((screen) => {
                        return {
                            hasChildren: false,
                            name: screen.name,
                            icon: screen.icon,
                            component: createImport(screen.importPath),
                            importPath: screen.importPath,
                            path: removeAccents(
                                screen
                                    .path!.split(" ")
                                    .join("")
                                    .toLocaleLowerCase()
                            ),
                            tooltip: screen.tooltip,
                        };
                    }),
                meta: {
                    requireAuth: true,
                },
            });
        }
    });

    const layoutRoute: RouteRecordRaw = {
        path: "/",
        name: "Layout",
        component: dashboardLayout,
        meta: {
            requireAuth: false,
        },
        children: routesBase,
    };
    // console.log(routesBase)
    router.addRoute(layoutRoute);
    const notFoundNoPage = {
        icon: "",
        path: "/:pathMatch(.*)*",
        name: "404",
        order: 100,
        // hasChild: true,
        // props: true,
        component: () =>
            import("../../../components/core/NoScreenNotFound.vue"),
    };
    router.addRoute(notFoundNoPage);
    if (!returnData) {
        saveRoutes(screens);
    } else {
        return routesBase;
    }
};

// const generatorScreen = (screens: Screen[], screensAllRoute: Screen[]) => {
//     const items: any = [];
//     screens.forEach((item) => {
//         if (items.filter((x: any) => x.name === item.ParentScreen).length > 0)
//             return;

//         items.push({
//             name: item.ParentScreen,
//             hasChildren: true,
//             icon: item.ParentIcon,
//             path: removeAccents(
//                 item
//                     .ParentScreen!.split("||")[1]
//                     .split(" ")
//                     .join("")
//                     .toLocaleLowerCase()
//             ),
//             children: screensAllRoute
//                 .filter((p) =>
//                     p.ParentScreen?.includes(item.ParentScreen ?? "")
//                 )
//                 .sort((a, b) =>
//                     (a.ScreenName ?? "") < (b.ScreenName ?? "") ? -1 : 1
//                 )
//                 .map((z) => ({
//                     name: z.ScreenName,
//                     icon: z.Icon,
//                     path: removeAccents(
//                         `${z.ScreenName?.split(" ")
//                             .join("")
//                             .toLocaleLowerCase()}`
//                     ),
//                     component: createImport(z.ActionUrl),
//                     importPath: z.ActionUrl,
//                 })),
//         });
//     });

//     return items;
//     // return items.map((element: any) => ({
//     //     ...element,
//     //     name: element.name.split("||")[1] ?? "",
//     // }));
// };

const createImport = (importPath: string | null) => {
    if (!importPath) return null;
    const path = importPath.split("/");
    if (path.length === 1) {
        return () => import(`../../../modules/${path[0]}.vue`);
    }

    if (path.length === 2) {
        return () => import(`../../../modules/${path[0]}/${path[1]}.vue`);
    }

    if (path.length === 3) {
        return () =>
            import(`../../../modules/${path[0]}/${path[1]}/${path[2]}.vue`);
    }

    if (path.length === 4) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}.vue`
            );
    }

    if (path.length === 5) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}.vue`
            );
    }
    if (path.length === 6) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}.vue`
            );
    }
    if (path.length === 7) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/${path[6]}.vue`
            );
    }
    if (path.length === 8) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/${path[6]}/${path[7]}.vue`
            );
    }
    if (path.length === 9) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/${path[6]}/${path[7]}/${path[8]}.vue`
            );
    }

    if (path.length === 10) {
        return () =>
            import(
                `../../../modules/${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/${path[6]}/${path[7]}/${path[8]}/${path[9]}.vue`
            );
    }
};
