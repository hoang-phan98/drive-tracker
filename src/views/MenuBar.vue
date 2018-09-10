<template>
  <div class="menu-bar">
    <div class="search">
      <MaterialIcon icon="search" size="large" />
      <input class="search-input" type="text" name="search" v-model="query" />
    </div>
    <div class="account">
      <b-dropdown right variant="link" no-caret class="account-dropdown">
        <MaterialIcon icon="account_circle" size="large" slot="button-content" />
        <b-dropdown-item @click="logout">
          Logout
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import MaterialIcon from "@/components/MaterialIcon.vue";
import googleapis from "../googleapis";

export default {
  components: { MaterialIcon },
  data: function() {
    return {
      query: ""
    };
  },
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

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 3px solid hsla(196, 5%, 25%, 0.1);
}

.search {
  display: flex;
  align-items: center;
}

.search-input {
  border-radius: 1rem;
  height: 3rem;
  font-size: 1rem;
  border: 2px solid hsl(196, 5%, 85%);
  padding: 0 1rem;
  margin-left: 1rem;
  min-width: 34rem;
}

.account-dropdown :global(button) {
  margin: 0;
  padding: 0;
  height: 48px;
  width: 48px;
  color: inherit;
}
</style>
