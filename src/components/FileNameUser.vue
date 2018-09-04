<template>
    <div>
        <b-row v-for="file in fileList" :key="file.id">
          <!-- entire file object -->
          <b-col> {{ file }} </b-col>
            <!-- filename -->
          <b-col> {{ file.name }} </b-col>

          <b-col v-for="user in file.permissions" :key="user.id">
              <!-- user name and id -->
            {{user.displayName}}
            {{user.id}}
          </b-col>
          <span><br></span>
        </b-row>
    </div>
</template>

<script>
import gapi from "../googleapis.js";

export default {
  name: "folderList",
  // fileList is an object with the file's id and permissions
  // permissions has the user's id and display name that we can use for the displaying of data
  async mounted() {
    this.fileList = (await gapi.client.drive.files.list({
      fields: "files(id, name, permissions)",
      //q: starred != true
      q: "'1m0Mq_RHMpXJXfVzEISPySwPheg9PUSqy' in parents" // file id goes here
    })).result.files;
  },
  data() {
    return {
      fileList: []
    };
  }
};
</script>
