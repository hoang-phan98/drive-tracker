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
</style>
