<template>
  <div class="folderList">
    

    <h1>Tracked Items</h1>

          <span> <br> </span>
          <b-row class="rows">
            <b-col cols="5">Name</b-col>
            <b-col>Owner</b-col>
            <b-col>Size</b-col>
            <b-col>Last Edit</b-col>
            
          </b-row>
          <b-row class="rows" v-for="folder in folderList" :key="folder.id">
            <b-col cols="5"><span> </span><span>{{ folder.name }}</span></b-col>
            <b-col>{{folder.owner}}</b-col>
            <b-col>{{folder.size}}</b-col>
            <b-col>{{folder.lastEdit}}</b-col>

          </b-row>
          
          <span> <br> </span>

          
        <b-btn v-b-modal.modal1>+</b-btn>

        <!-- Modal Component -->
        <b-modal id="modal1" title="Add Folder">
        
        <h2>Add Folder</h2>
        <span><br></span>
        <span><br></span>
        
        <b-form-group label="Google Drive Folder URL">
          <b-form-input placeholder="Your Folder URL"></b-form-input>
        </b-form-group>
        <span><br></span>
        <span><br></span>
        
          <b-row slot="modal-footer">
            <b-col class="col">
              <b-button class="button2">Cancel</b-button>
            </b-col>
            <b-col class="col">
              <b-button class="button1">OK</b-button>
            </b-col>
          </b-row>

        </b-modal>
          
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "folderList",
  data() {
    return {
      folderList: [
        {
          id: 0,
          name: "FIT2101",
          owner: "me",
          size: "5MB",
          lastEdit: "Person"
        },
        {
          id: 1,
          name: "FIT1049",
          owner: "me",
          size: "5MB",
          lastEdit: "Person"
        },
        {
          id: 2,
          name: "Assignment 1",
          owner: "me",
          size: "5MB",
          lastEdit: "Person"
        },
        { id: 3, name: "Hello", owner: "me", size: "5MB", lastEdit: "Person" }
      ]
    };
  }
};
</script>

<!--v-bind:folder="folder" v-bind:key="folder.id-->

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5%;
  color: #2c3e50;
}
.rows {
  list-style-type: none;
  margin: 2%;
  border-bottom: 1mm;
  border-bottom-color: black;
}
.folderButton {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: darkslategray;
  width: 100%;
  font-size: 18pt;
}
.button {
  background-color: coral;
  align-self: flex-end;
}

.col {
  text-align: center;
}
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5%;

  color: #2c3e50;
}
</style>
