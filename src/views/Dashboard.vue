<template>
  <div class="dashboard-layout">
    <div class="content">
      <TrackedItems @preview-folder="preview = $event"/>
    </div>
    <div class="aside">
      <FolderPreview v-if="preview" :id="preview" /> 
      <div v-show="!preview" class="empty-hint">
        <p class="hint-text">
          Select a folder to preview.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TrackedItems from "./TrackedItems.vue";
import FolderPreview from "../components/FolderPreview.vue";

export default {
  components: {
    TrackedItems,
    FolderPreview
  },
  data() {
    return {
      preview: null
    };
  }
};
</script>

<style scoped>
.dashboard-layout {
  width: 100%;
  max-height: 100%;
  padding-left: 1rem;
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

.empty-hint {
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.hint-text {
  font-size: 0.75rem;
}
</style>
