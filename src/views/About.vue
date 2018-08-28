<template>
  <div class="folderList">
    <b-container>
      <b-row>
        <b-col>

        </b-col>
        <b-col cols="8">
          <h1>Current Folders</h1>
          <ul>
            <b-row v-for="folder in folderList" :key="folder.id">{{ folder.name}}</b-row>
          </ul>
          <b-button>Add a Folder</b-button>
          

          <b-form-group label="Enter Google Drive Folder URL">
            <b-form-input placeholder="Enter Folder URL"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>

        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "folderList",
  data() {
    return {
      folderList: [
        { id: 0, name: "file1" },
        { id: 1, name: "file2" },
        { id: 2, name: "file3" }
      ]
    };
  }
};
</script>

<!--v-bind:folder="folder" v-bind:key="folder.id-->
