<template>
    <div>
        <b-row v-for="file in fileList" :key="file.id">
          <b-col> {{ file }} </b-col>
            <!-- note here we choose the file names in the selected foler-->
            <b-col> {{ file.name }} </b-col>

            <b-col v-for="user in file.permissions" :key="user.id">
                    {{user.displayName}}
                    {{user.id}}
                </b-col>
            <span>-</span>
            <span><br></span>
            
            <b-col>{{file.writers}}</b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import gapi from "../googleapis.js";

export default {
  name: "folderList",
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
