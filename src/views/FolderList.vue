<template>
  <b-container fluid class="folderList">

    <b-row>
      <h1>Tracked Items</h1>
    </b-row>

    <b-row>
      <b-table 
        :items="folders"
        :fields="fields"
        @row-clicked="open($event)"
        hover
        >
      </b-table>
    </b-row>

    <b-row>
      <b-col class="col2" style="text-align: flex-end">
        <b-btn v-b-modal.modal1 class="button">+</b-btn>
      </b-col>
    </b-row>

    <AddFolderModal id="modal1" @add-folder="addFolder($event)" />
  </b-container>
</template>

<script>
import AddFolderModal from "./AddFolderModal.vue";
import googleapis from "../googleapis";

export default {
  name: "FolderList",
  components: {
    AddFolderModal
  },
  data() {
    return {
      fields: [
        { key: "name", sortable: true, label: "Folder Name" },
        { key: "owner", sortable: true, label: "Owner" },
        { key: "lastEdit", sortable: true, label: "Last Edit" }
      ],
      folders: []
    };
  },
  methods: {
    async addFolder(folder) {
      try {
        const res = await googleapis.client.drive.files.get({
          fileId: folder.id,
          fields:
            "id, name, owners(displayName), lastModifyingUser(displayName)"
        });
        folder = res.result;
        this.folders.push({
          id: folder.id,
          name: folder.name,
          owner: folder.owners.map(owner => owner.displayName).join(", "),
          lastEdit: folder.lastModifyingUser.displayName
        });
      } catch (err) {
        //eslint-disable-next-line
        console.error(err);
      }
    },
    open(item) {
      // Add code to open folder analysis here
      // eslint-disable-next-line
      console.log("Folder clicked", JSON.stringify(item, 2));
    }
  }
};
</script>

<style scoped>
.folderList {
  background: rgba(255, 255, 255, 0.4);
  padding: 40px;
}

.button {
  background-color: coral;
  align-self: flex-end;
}

.col2 {
  text-align: end;
}
</style>
