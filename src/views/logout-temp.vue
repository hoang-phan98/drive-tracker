<template>
  <button  v-on:click="logout">logout</button>
</template>

<script>
import googleapis from "../googleapis";

export default {
  methods: {
      logout: function () {
        // Load the googleAuth instance (the user) and sign them out
        const auth2 = googleapis.auth2.getAuthInstance();
        auth2.signOut();
      }
    }
}
</script>
