<template>
  <div class="g-signin-button" ref="button">
    <slot />
  </div>
</template>

<script>
import googleapis from "../googleapis";

export default {
  mounted() {
    googleapis.ready.then(() => {
      const auth2 = googleapis.auth2.getAuthInstance();

      auth2.attachClickHandler(
        this.$refs.button,
        {},
        this.success,
        this.failure
      );
    });
  },
  methods: {
    success(user) {
      this.$emit("success", user);
    },
    failure(err) {
      this.$emit("error", err);
      this.$emit("failure", err);
    }
  }
};
</script>
