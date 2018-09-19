<template>
  <b-modal :id="id" title="Add Folder" ref="modal">
    <b-list-group flush>
      <b-list-group-item>
        Open Google Drive in your browser.
      </b-list-group-item>
      <b-list-group-item>
        Navigate to the folder you want to add.
      </b-list-group-item>
      <b-list-group-item>
        Copy the URL from the address bar.
      </b-list-group-item>
      <b-list-group-item>
        Paste it below.
      </b-list-group-item>
    </b-list-group>

    <div class="form">
      <b-form-group
        id="fieldset1"
        description="Copy the URL of your folder after navigating to it in Google Drive."
        label="Google Drive Folder URL"
        label-for="input1"
        :invalid-feedback="error || 'Invalid folder URL.'"
        :valid-feedback="folder ? folder.name : 'Loading...'"
        :state="state"
        >
        <b-form-input 
          id="url" :state="state" 
          v-model.trim="url"
          placeholder="https://drive.google.com/folders/" 
          />
      </b-form-group>
    </div>

    <template slot="modal-footer">
        <b-button @click="cancel()">Cancel</b-button>
        <b-button variant="primary" @click="submit()" :disabled="!(folder && folder.name)">Add Folder</b-button>
    </template>
  </b-modal>
</template>

<script>
import googleapis from "../googleapis";

export default {
  props: {
    id: String
  },
  data() {
    return {
      url: "",
      dirty: false,
      folder: null,
      error: null
    };
  },
  computed: {
    match: function() {
      const re = /^https?:\/\/drive.google.com\/drive.*?\/folders\/([\w-]+)/;
      return this.url.match(re);
    },
    state: function() {
      return this.dirty ? !!this.match && !this.error : null;
    }
  },
  watch: {
    url: function() {
      this.dirty = true;
    },
    match: async function(match) {
      this.folder = null;
      this.error = null;
      if (match) {
        const id = match[1];
        try {
          // Get folder data
          const res = await googleapis.client.drive.files.get({
            fileId: id,
            fields: "kind, id, name, mimeType"
          });

          // Check that the resource is actually a folder
          if (res.result.mimeType === "application/vnd.google-apps.folder") {
            this.folder = res.result;
            this.error = null;
          } else {
            this.error = "The URL does not match a folder.";
          }
        } catch (err) {
          this.error = err.result.error.message;
        }
      }
    }
  },
  methods: {
    submit() {
      if (!this.folder) return;

      this.$emit("add-folder", this.folder);

      // Close the modal
      this.$refs.modal.hide();
    },
    cancel() {
      this.$refs.modal.hide();
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 16px;
}
</style>
