<template>
  <div class="menu">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#" class="menu-brand">
        <img src="../assets/logo.png">
        Drive Tracker
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Folders</b-nav-item>
          <b-nav-item href="#" disabled>Files</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout" href="#">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import googleapis from "../googleapis";

export default {
  methods: {
    logout: function() {
      // Load the googleAuth instance (the user) and sign them out
      const auth2 = googleapis.auth2.getAuthInstance();
      // signOut is async, returns a Promise, wait for it to complete before
      // directing away otherwise it'll just redirect us back to /
      auth2.signOut().then(() => {
        // send the user back to the login screen
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
.menu-brand img {
  width: 30px;
  height: 30px;
}
</style>
