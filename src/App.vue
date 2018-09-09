<template>
  <div id="app">
    <div v-if="$route.name !='login'">
      <MenuBar></MenuBar>
    </div>
    <SpaceBackground></SpaceBackground>
    <router-view/>
  </div>

</template>

<script>
import MenuBar from "@/views/MenuBar.vue";
import SpaceBackground from "@/components/SpaceBackground.vue";
//import Colours from "@/components/ColourGeneration.vue";

export default {
  components: {
    MenuBar,
    SpaceBackground
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
