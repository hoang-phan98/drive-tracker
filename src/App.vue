<template>
  <div id="app">
    <template v-if="$route.name !='login'">
      <Layout>
        <router-view></router-view>
      </Layout>
    </template>
    <template v-else>
      <router-view/>
    </template>
    <SpaceBackground></SpaceBackground>
  </div>

</template>

<script>
import Layout from "@/views/Layout.vue";
import SpaceBackground from "@/components/SpaceBackground.vue";
import FolderContributionsService from "./folder-contributions-service.js";
//import Colours from "@/components/ColourGeneration.vue";

export default {
  data() {
    return { contributions: new FolderContributionsService() };
  },
  provide() {
    const context = {};
    Object.defineProperty(context, "contributions", {
      enumerable: true,
      get: () => this.contributions
    });
    return context;
  },
  components: {
    Layout,
    SpaceBackground
  }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
