<template>
  <b-modal :id="id" title="Add Folder" ref="modal">
    <h2>Add Folder</h2>
    <span><br></span>
    <span><br></span>

    <b-form-group label="Google Drive Folder URL">
      <b-form-input 
        placeholder="Your Folder URL" 
        v-model="url"
        :state="dirty ? (match ? 'valid' : 'invalid') : null">
      </b-form-input>
    </b-form-group>
    <span><br></span>
    <span><br></span>

    <b-row slot="modal-footer">
      <b-col class="col">
        <b-button class="button2" @click="cancel()">Cancel</b-button>
      </b-col>
      <b-col class="col">
        <b-button class="button1" @click="submit()">OK</b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      url: "",
      dirty: false
    };
  },
  computed: {
    match: function() {
      const re = /^https?:\/\/drive.google.com\/drive.*?\/folders\/(\w+)/;
      return this.url.match(re);
    }
  },
  watch: {
    url: function() {
      this.dirty = true;
    }
  },
  methods: {
    submit() {
      if (!this.match) {
        return;
      }

      // Express that we're loading
      // Verify the existence of the folder

      // eslint-disable-next-line
      console.log("Add folder", this.match[1]);

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
.button1 {
  background-color: green;
  align-self: center;
  align-content: center;
  font-size: 8pt;
  width: 70px;
}

.button2 {
  background-color: red;
  align-self: center;
  font-size: 8pt;
  width: 70px;
}
</style>
