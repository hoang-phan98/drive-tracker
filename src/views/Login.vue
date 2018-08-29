<template>
  <div class="login">
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>
  </div>
</template>

<script>
import Vue from "vue";
import GSignInButton from "vue-google-signin-button";
Vue.use(GSignInButton);

export default {
  data() {
    return {
      /**
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * @type {Object}
       */
      googleSignInParams: {
        // This is the client_id for the Driver Tracker application
        client_id:'651208341504-ib5m22804n5cvl8ih18rimd2hu5trv7l.apps.googleusercontent.com'
      }
    };

  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("Error has occured during signin", error);
    }
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
