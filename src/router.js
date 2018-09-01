import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import FolderList from "./views/FolderList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/folders",
      name: "folders",
      component: FolderList
    },
    {
      path: "/login",
      name: "login",
      // this is login lmao
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    }
  ]
});
