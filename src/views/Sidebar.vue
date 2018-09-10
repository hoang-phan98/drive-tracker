<template>
  <div class="sidebar">
      <div class="branding">
        <img class="branding-logo" src="../assets/logo.png" />
        <span class="branding-type">Tracker</span>
      </div>
      <div class="sidebar-menu">
        <router-link class="sidebar-menu-item" to="/">
          <MaterialIcon icon="folder_shared" size="large" />
          <span class="sidebar-menu-item-label">
            Tracked Folders
          </span>
        </router-link>
      </div>
      <div class="sidebar-footer">
        <p>
          ScrumMasters <br/>
          FIT2101 S2 2018<br/>
          Monash University
        </p>
      </div>
    </div>
</template>

<script>
import MaterialIcon from "@/components/MaterialIcon.vue";

export default {
  components: { MaterialIcon }
};
</script>

<style scoped>
.sidebar {
  background-color: white;
  color: #868e91;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.sidebar-menu-item {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.sidebar-menu-item-label {
  font-size: 0.875rem;
}

.sidebar-menu-item:hover {
  background-color: hsla(0, 0%, 50%, 0.1);
}

.sidebar-footer {
  line-height: 1.3;
  font-size: 0.75rem;
  padding: 1rem;
}

.sidebar-footer p {
  margin: 0;
}

.branding {
  text-align: center;
  padding: 0.5rem 0;
  margin-bottom: 4rem;
}

.branding-logo {
  width: 100px;
  height: 100px;
}

.branding-type {
  display: block;
  margin-top: -0.75rem;
  font-weight: 600;
}
</style>
