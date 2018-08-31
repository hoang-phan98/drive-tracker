<template>
  <div id="app">
      <MenuBar></MenuBar>
      <router-view/>
  </div>
  
</template>

<script>
import MenuBar from "@/views/MenuBar.vue";

export default {
  components: {
    MenuBar
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
