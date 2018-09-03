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
        @success="onSignInSuccess"
        @error="onSignInError">
        <img id="google-logo" src="../assets/google-logo.png">
        <strong>Sign in with Google</strong>
      </g-signin-button>
    </div>
  </div>
</template>

<script>
import GSigninButton from "../components/GSigninButton.vue";

export default {
  components: {
    GSigninButton
  },
  methods: {
    onSignInSuccess() {
      this.$router.push("/");
    },
    onSignInError(/* error */) {
      // `error` contains any error occurred.
      // eslint-disable-next-line
      console.log("Error has occured during signin", error);
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
  background: rgba(256, 256, 256, 1);
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
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
</style>
