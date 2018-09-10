<template>
  <div class='layout'>
    <Sidebar />
    <MenuBar />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import MenuBar from "./MenuBar.vue";

export default {
  components: {
    MenuBar,
    Sidebar
  }
};
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    "side top"
    "side content";
  min-height: 100vh;
  height: 100%;
}

.sidebar {
  grid-area: side;
}

.menu-bar {
  grid-area: top;
}

.content {
  grid-area: content;
}
</style>
