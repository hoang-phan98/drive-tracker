<template>
  <div class="grid-container">
    <div class="content">
      <TrackedItems />
    </div>
    <div class="aside">
    </div>
  </div>
</template>

<script>
import TrackedItems from "./TrackedItems.vue";

export default {
  components: { TrackedItems }
};
</script>

<style scoped>
.grid-container {
  width: 100%;
  max-height: 100%;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "body aside";
  background-color: white;
}

.content {
  grid-area: body;
}

.aside {
  grid-area: aside;
  border-left: 3px solid hsla(196, 5%, 25%, 0.1);
}
</style>
