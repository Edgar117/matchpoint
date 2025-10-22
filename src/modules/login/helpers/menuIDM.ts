import router from "../../../router";
import { /* saveMenu,*/ getRoutes, saveRoutes } from "./localStorageHelper";
import { Component, ref, defineAsyncComponent } from "vue";
//This method is responsible for building the menu
export const buildMenu = () => {
  const itemsMenu = ref<any>([]);
  let routesItems = getRoutes();
  if (routesItems === null) return;
  let contador = 0;
  routesItems.forEach((element: any) => {
    if (element.hasChild) {
      contador += 1;
      let itemRoute = {
        id: contador,
        icon: element.icon,
        title: element.name,
        child: [],
      };

      if (element.name != "404") {
        const itemsChild = ref<any>([]);

        element.children.forEach((childItem: any) => {
          let itemSubModel = {
            id: childItem.id,
            title: childItem.name,
            icon: childItem.icon,
            to: element.path + childItem.path,
            tooltip: childItem.tooltip,
          };

          itemsChild.value.push(itemSubModel);
        });

        itemRoute.child = itemsChild.value;
        if (element.visible) {
          itemsMenu.value.push(itemRoute);
        }
      }
    }
  });
  return itemsMenu.value;
};
// This method is responsible for building the rotes dynamic
export const buildRoutes = async (webRoutes = []) => {
  const principalRoutes = ref<any>([]);
  webRoutes.forEach((element: any) => {
    let route = {
      name: element.parentScreen,
      icon: element.parentIcon,
      order: element.parentOrder,
      hasChild: true,
      meta: {
        requireAuth: true,
        progress: {
          func: [
            { call: "color", modifier: "temp", argument: "#ffb000" },
            { call: "fail", modifier: "temp", argument: "#6e0000" },
            { call: "location", modifier: "temp", argument: "top" },
            {
              call: "transition",
              modifier: "temp",
              argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
            },
          ],
        },
      },
      component: () =>
        import(
          /* webpackChunkName: "HomeScreen" */ "@/layout/LayoutDefautl.vue"
        ),
    };

    let existe = principalRoutes.value.filter(
      (x: any) => x.name === element.parentScreen
    ).length;

    if (existe === 0) {
      principalRoutes.value.push(route);
    }
  });

  //Agregamos la pagina de errores
  let noFoundNoPage = {
    icon: "",
    path: "/:pathMatch(.*)*",
    name: "404",
    order: 100,
    // hasChild: true,
    // props: true,
    component: () => import("@/modules/shared/screens/NoScreenNotFound.vue"),
  };

  principalRoutes.value.push(noFoundNoPage);
  const childRoutes = ref<any>([]);

  principalRoutes.value.forEach((element: any) => {
    let childRoute = webRoutes.filter(
      (x: any) => x.parentScreen === element.name
    );

    let modelChild = childRoute.map((item: any) => ({
      id: item.screenId,
      name: item.screenName,
      icon: item.icon,
      import: item.actionUrl,
      path: `${removeAccents(
        item.screenName.split(" ").join("").toLocaleLowerCase()
      )}`,
      tooltip: item.tooltip,
    }));

    element.children = modelChild;

    if (childRoute.length > 0) {
      let namePath = element.name.split(" ").join("").toLocaleLowerCase();
      if (namePath === "") {
        element.path = "/";
      } else {
        element.path = "/" + removeAccents(namePath) + "/";
      }
    }
    element.visible = element.name == "Configuracion" ? false : true;
    childRoutes.value.push(element);
  });
  childRoutes.value = childRoutes.value.sort((a: any, b: any) => {
    return parseInt(a.order) - parseInt(b.order);
  });
  childRoutes.value.forEach((element: any) => {
    element.children.forEach((itemE: any) => {
      let splitRoute = itemE.import.split("/");
      if (splitRoute.length == 3) {//By standard there must always be 3 elements, the first is the module / the second is the screen folder and the third is the view
         itemE.component = defineAsyncComponent(() =>import(`../../../modules/${splitRoute[0]}/${splitRoute[1]}/${splitRoute[2]}.vue`) //relative route       
        );
      }
    });
  });
  //Adding the route
  childRoutes.value.forEach((element: any) => {
    router.addRoute(element);
  });

  router.options.routes = [/*...state.originalRoutes,*/ ...childRoutes.value];

  saveRoutes(childRoutes.value);
};

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
