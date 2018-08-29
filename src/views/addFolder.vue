<template>
  <div class="home">
    <b-row>
      <b-col></b-col>
      <b-col>

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
        </b-col>

        <b-col></b-col>
      </b-row>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5%;
  color: #2c3e50;
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
</style>
