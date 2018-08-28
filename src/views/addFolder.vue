<template>
  <div class="home">
    <b-container> 
      <b-row>
        <b-col>

        </b-col>
        <b-col cols="8">
          <h1>Add a Folder</h1>

        </b-col>
        <b-col>

        </b-col>
      </b-row>
      <b-row>
        <span> <br> </span>
      </b-row>
      <b-row>
        <b-col>

        </b-col>
        <b-col cols="8">

          <b-form-group label="Enter Google Drive Folder URL">
            <b-form-input placeholder="Enter Folder URL (back button in menu bar)"></b-form-input>
          </b-form-group>
          <b-button>Submit</b-button>
        </b-col>
        <b-col>

        </b-col>
      </b-row>
    </b-container>
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
