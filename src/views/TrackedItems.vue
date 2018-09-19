<template>
  <div class="layout">
    <div class="content-container">
      <div class="content">
        <div class="header-section">
          <h3 class="header">Tracked Items</h3>
        </div>
      </div>
    </div>
    <div class="fab-container">
      <button class="fab" v-b-modal="'add-tracked-folder'">
        <span class="fab-text">Add folder</span>
        <i class="material-icons fab-icon">
          create_new_folder
        </i>
        <i class="material-icons fab-icon fab-icon--shadow" aria-hidden="true">
          create_new_folder
        </i>
      </button>
    </div>
    <AddFolderModal id="add-tracked-folder" />
  </div>
</template>

<script>
import AddFolderModal from "./AddFolderModal.vue";

export default {
  components: { AddFolderModal }
};
</script>

<style scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.content {
  padding: 4rem 1rem;
}

.header-section {
  height: 4rem;
  display: flex;
  align-items: center;
}

.header {
  font-size: 1.5rem;
  margin: 0;
}

.fab-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.fab {
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

.fab-text {
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
}

.fab-icon {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  color: #eecf00;
  font-size: 48px;
}

.fab:active .fab-icon {
  transform: translateY(3%);
}

.fab-icon.fab-icon--shadow.fab-icon--shadow {
  z-index: 1;
  transform: translateY(5%);
  color: rgba(0, 0, 0, 0.2);
}
</style>
