<template>
  <div class="menu-bar">
    <div class="search">
      <MaterialIcon icon="search" />
      <input class="search-input" type="text" name="search" v-model="query" />
    </div>
    <div class="account">
      <b-dropdown right variant="link" no-caret class="account-dropdown">
        <MaterialIcon icon="account_circle" slot="button-content" />
        <b-dropdown-item @click="logout">
          Logout
        </b-dropdown-item>
      </b-dropdown>
      <span v-if="name" class="account-name">
        {{ name }}
      </span>
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
      query: "",
      user: null
    };
  },
  mounted() {
    const auth2 = googleapis.auth2.getAuthInstance();
    this.user = auth2.currentUser.get();
    this.subscription = auth2.currentUser.listen(this.handleUserChanged);
  },
  beforeDestroy() {
    this.subscription.remove();
  },
  methods: {
    handleUserChanged(user) {
      this.user = user;
    },
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
  },
  computed: {
    name: function() {
      if (this.user) {
        return this.user.getBasicProfile().getGivenName();
      }
      return null;
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
  height: 3rem;
}

.search {
  display: flex;
  align-items: center;
}

.search-input {
  border-radius: 1rem;
  height: 2rem;
  font-size: 1rem;
  border: 2px solid hsl(196, 5%, 85%);
  padding: 0 1rem;
  margin-left: 1rem;
  min-width: 34rem;
}

.account {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.account-name {
  font-size: 1rem;
  display: inline-block;
  margin-right: 1ch;
}

.account-dropdown :global(button) {
  margin: 0;
  padding: 0;
  height: 36px;
  width: 36px;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
