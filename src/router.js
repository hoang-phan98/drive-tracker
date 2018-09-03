import Vue from "vue";
import Router from "vue-router";
import FolderList from "./views/FolderList.vue";
import Login from "./views/Login.vue";
import googleapis from "./googleapis";
import Logout from "./views/logout-temp";

Vue.use(Router);

async function isSignedIn() {
  const auth2 = googleapis.auth2.getAuthInstance();
  return auth2.isSignedIn.get();
}

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: {
        render: h => h(FolderList),
        async beforeRouteEnter(to, from, next) {
          next((await isSignedIn()) ? undefined : "/login");
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: {
        render: h => h(Login),
        async beforeRouteEnter(to, from, next) {
          next((await isSignedIn()) ? "/" : undefined);
        }
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: {
        render: h => h(Logout),
        async beforeRouteEnter(to, from, next) {
          next((await isSignedIn()) ? undefined : "/login");
        }
      }
    },
    {
      path: "/*",
      name: "404",
      component: {
        render: h => h("div", {}, "404 not found")
      }
    }
  ]
});
