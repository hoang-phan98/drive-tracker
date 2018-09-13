import Vue from "vue";
import Router from "vue-router";
import FolderList from "./views/FolderList.vue";
import Login from "./views/Login.vue";
import Folder from "./views/Folder.vue";
import googleapis from "./googleapis";

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
      path: "/folder/:id",
      name: "folder",
      component: {
        render(h) {
          // Pass on the id of the folder to the component
          return h(Folder, { props: { id: this.$route.params.id } });
        },
        async beforeRouteEnter(to, from, next) {
          next((await isSignedIn()) ? undefined : "/login");
        }
      }
    },
    {
      path: "/folderpage",
      name: "folderpage",
      // this is folder page lmao
      component: () =>
        import(/* webpackChunkName: "folderpage" */ "./views/FolderPage.vue")
    },
    {
      path: "/filepage",
      name: "filepage",
      // this is file page lmao
      component: () =>
        import(/* webpackChunkName: "filepage" */ "./views/FilePage.vue")
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
