<template>
  <div ref="root">

  </div>
</template>

<script>
import googleapis, { google } from "../googleapis";

export default {
  props: {
    open: Boolean
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    handlePickerResult(res) {
      switch (res.action) {
        case "cancel":
          this.$emit("close");
          break;
        case "picked":
          this.$emit("close");
          this.$emit("picked", res.docs[0]);
          break;
        default:
          break;
      }
    },
    show() {
      const auth2 = googleapis.auth2.getAuthInstance();
      const { access_token } = auth2.currentUser.get().getAuthResponse(true);

      const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
        .setMode(google.picker.DocsViewMode.LIST)
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true);

      this.picker = new google.picker.PickerBuilder()
        .setTitle("Select a file/folder")
        .setOAuthToken(access_token)
        .setCallback(this.handlePickerResult)
        .addView(view)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .build();

      this.picker.setVisible(true);
    },
    dispose() {
      if (this.picker) {
        this.picker.dispose();
        this.picker = null;
      }
    }
  },
  watch: {
    open(open, prev) {
      if (open && !prev) {
        this.show();
      } else if (!open && prev) {
        this.dispose();
      }
    }
  }
};
</script>

<style>
</style>
