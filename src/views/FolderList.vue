<template>
  <div class="folderList">

    <b-row class="rows">
      <h1>Tracked Items</h1>
    </b-row>


    <b-row class="rows">
      <hr style="width: 95%">
      <b-col cols="5">Name</b-col>
      <b-col>Owner</b-col>
      <b-col>Size</b-col>
      <b-col>Last Edit</b-col>
    </b-row>
    <b-row class="rows" v-for="folder in folderList" :key="folder.id">
      <hr style="width: 95%">
      <b-col cols="5"><span>icon </span><span>{{ folder.name }}</span></b-col>
      <b-col>{{folder.owner}}</b-col>
      <b-col>{{folder.size}}</b-col>
      <b-col>{{folder.lastEdit}}</b-col>
    </b-row>

    <span> <br> </span>

    <b-row>
      <b-col class="col2" style="text-align: flex-end">
        <b-btn v-b-modal.modal1 class="button">+</b-btn>
      </b-col>
    </b-row>

    <AddFolderModal id="modal1" />
  </div>
</template>

<script>
import AddFolderModal from "./AddFolderModal.vue";

export default {
  name: "FolderList",
  components: {
    AddFolderModal
  },
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
        {
          id: 3,
          name: "Hello",
          owner: "me",
          size: "5MB",
          lastEdit: "Person"
        }
      ]
    };
  }
};
</script>

<style scoped>
.folderList {
  background: rgba(255, 255, 255, 0.9);
  margin: 40px;
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
  background-color: coral;
  align-self: flex-end;
}

.col {
  text-align: center;
}

.col2 {
  text-align: end;
  margin-right: 50px;
}
</style>
