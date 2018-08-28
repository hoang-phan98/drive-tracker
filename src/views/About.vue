<template>
  <div class="folderList">
    <b-container> 
      <b-row>
        <b-col>

        </b-col>
        <b-col cols="6">
          <h1>Current Folders</h1>

          <span> <br> </span>

          <b-row class="rows" v-for="folder in folderList" :key="folder.id">
            <b-button class="folderButton">{{ folder.name }}</b-button>
          </b-row>
          
          <span> <br> </span>

          <b-row class="rows">
            <b-button class="button">Add a Folder</b-button>
          </b-row>
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
        { id: 0, name: "FIT2101" },
        { id: 1, name: "FIT1049" },
        { id: 2, name: "Assignment 1" },
        { id: 3, name: "Hello" }
      ]
    };
  }
};
</script>

<!--v-bind:folder="folder" v-bind:key="folder.id-->

<style scoped>
h3 {
  margin: 40px 0 0;
}
.rows {
  list-style-type: none;
  margin: 2%;
}
.folderButton {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: darkslategray;
  width: 100%;
  font-size: 18pt;
}
.button {
  background-color: rgb(190, 231, 163);
  color: darkslategrey;
  width: 100%;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
