<template>
  <div id="app">
      <MenuBar></MenuBar>
      <SpaceBackground></SpaceBackground>
      <router-view/>
  </div>

</template>

<script>
import MenuBar from "@/views/MenuBar.vue";
import SpaceBackground from "@/components/SpaceBackground.vue"

export default {
  components: {
    MenuBar,
    SpaceBackground
  }
};
</script>

<style>
<style > #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
