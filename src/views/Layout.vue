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
  grid-template-columns: auto 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    "side top"
    "side content";
  min-height: 100vh;
  height: 100vh;
}

.sidebar {
  grid-area: side;
  z-index: 10;
}

.menu-bar {
  grid-area: top;
}

.content {
  grid-area: content;
  overflow-y: auto;
  display: grid;
  grid-template: 1fr / 1fr;
}
</style>
