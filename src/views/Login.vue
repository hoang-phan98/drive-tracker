<template>
  <div class="login">
    <div class="login-box">
      <img src="../assets/monash.png">
      <br/><br/><br/>
      <font size="4">
        "As we look ahead into the next century, leaders will be those who
        empower others."<br/>--Bill Gates
      </font>
      <br/><br/><br/>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        <img id="google-logo" src="../assets/google-logo.png">
        <strong>Sign in with Google</strong>
      </g-signin-button>
    </div>
    <div class=tint></div>
    <div class=background></div>
  </div>
</template>

<script>
import GSigninButton from "../components/GSigninButton.vue";

export default {
  components: {
    GSigninButton
  },
  data() {
    return {
      /**
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * @type {Object}
       */
      googleSignInParams: {
        // This is the client_id for the Driver Tracker application
        client_id:
          "651208341504-ib5m22804n5cvl8ih18rimd2hu5trv7l.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // eslint-disable-next-line
      const profile = googleUser.getBasicProfile(); // etc etc
    },
    onSignInError(/* error */) {
      // `error` contains any error occurred.
      // console.log("Error has occured during signin", error);
    }
  }
};
</script>

<style>
.login img {
  width: 50%;
  height: auto;
}

#google-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 2px;
}

.login-box {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 5px 16px;
  padding-left: 4px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -2;
  background-size: 250px;
  background-repeat: repeat;
  background-image: url(../assets/background.jpg);
}

.tint {
  z-index: -1;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: auto;
  top: 0px;
  left: 0px;
  background: rgba(68, 68, 68, 0.2); /*can be anything, of course*/
}
</style>
