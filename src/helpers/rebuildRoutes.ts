import { getRoutes } from "../modules/login/helpers/localStorageHelper";
import router from "../router";
import { Component, ref, defineAsyncComponent } from "vue";
export const rebuildRoutes = () => {
  const itemMenu = ref<any>([]);
  itemMenu.value = getRoutes();
  if (itemMenu.value !== null && itemMenu.value !== "") {
    router.options.routes = [];

    itemMenu.value.forEach((element: any) => {
      element.component = () =>
        import(
          /* webpackChunkName: "HomeScreen" */ "../layout/LayoutDefautl.vue"
        );

      if (element.hasChild) {
        if (element.name == "404") {
           element.component = () => import('../modules/shared/screens/NoScreenNotFound.vue')
        }

        element.children.forEach((hijo: any) => {
          let splitRoute = hijo.import.split("/");
          if (splitRoute.length == 3) {//By standard there must always be 3 elements, the first is the module / the second is the screen folder/ and the third is the view
            hijo.component = defineAsyncComponent(() => import(`../modules/${splitRoute[0]}/${splitRoute[1]}/${splitRoute[2]}.vue`)//relative route
            );
          }
        });
      } else if (element.name == "404") {
         element.component=() => import('../modules/shared/screens/NoScreenNotFound.vue');
      }
    });
    //ADDING THE ROUTES
    itemMenu.value.forEach((element: any) => {
      router.addRoute(element);
  });

    const login = {
      path: "/Login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../modules/login/screens/LoginScreen.vue"),
    };
    router.addRoute(login);
  }
};
