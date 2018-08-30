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
    <!-- Modal Component -->
    <b-modal id="modal1" title="Add Folder" ref="addFolderModal">
        
      <h2>Add Folder</h2>
      <span><br></span>
      <span><br></span>
        
      <b-form-group label="Google Drive Folder URL">
        <b-form-input 
          placeholder="Your Folder URL" 
          v-model="addFolder.url" 
          :state="addFolder.dirty ? (addFolderMatch ? 'valid' : 'invalid') : null">
        </b-form-input>
      </b-form-group>
      <span><br></span>
      <span><br></span>
        
      <b-row slot="modal-footer">
        <b-col class="col">
          <b-button class="button2" @click="closeAddFolder()">Cancel</b-button>
        </b-col>
        <b-col class="col">
          <b-button class="button1" @click="submitAddFolder()">OK</b-button>
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
      addFolder: {
        url: "",
        dirty: false
      },
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
  },
  computed: {
    addFolderMatch: function() {
      return this.addFolder.url.match(
        /^https?:\/\/drive.google.com\/drive.*?\/folders\/(\w+)/
      );
    }
  },
  watch: {
    "addFolder.url": function() {
      this.addFolder.dirty = true;
    }
  },
  methods: {
    submitAddFolder() {
      if (!this.addFolderMatch) {
        return;
      }

      // Express that we're loading
      // Verify the existence of the folder

      // eslint-disable-next-line
      console.log("Add folder", this.addFolderMatch[1]);

      // Close the modal
      this.$refs.addFolderModal.hide();
    },
    closeAddFolder() {
      this.$refs.addFolderModal.hide();
    }
  }
};
</script>

<style scoped>
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
