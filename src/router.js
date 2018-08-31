import Vue from "vue";
import Router from "vue-router";
import Home from "./views/AddFolder.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/FolderList.vue")
    },
    {
      path: "/login",
      name: "login",
      // this is login lmao
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/folderpage",
      name: "folderpage",
      // this is folder page lmao
      component: () =>
        import(/* webpackChunkName: "folderpage" */ "./views/FolderPage.vue")
    }
  ]
});
