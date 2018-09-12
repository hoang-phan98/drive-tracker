<template>
  <div class="grid-container">
    <b-container fluid class="trackedItems">

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
        <b-col class="col" style="text-align: flex-end">
          <b-btn v-b-modal.modal1 class="button">+</b-btn>
        </b-col>
      </b-row>

      <AddFolderModal id="modal1" @add-folder="addFolder($event)" />
    </b-container>

    <div class="sideBar">
      <div class="legend">
        <h2>Users</h2>
        <div class="user-list">
        <div v-for="user in userList" :key="user.id" class="legend-entry">
          <div :style="'background-color:'+getUserColour(user)" class="legend-box"></div><span class="legend-name">{{user}}</span>
        </div>
        </div>
      </div> 

      <div class="chart">
      <div class="PieChart">
        <h2>All-time Contribution</h2>
        <span><br></span>
        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />
      </div>
      </div>

      <div ></div>

      <span><br></span>
      <span><br></span>
      <span><br></span>
      <span><br></span>
      <span><br></span>
      <span><br></span>
      <span><br></span>
      <span><br></span>

      <b-row style="vertical-align: bottom">
        <b-col class="col2" style="text-align: flex-end">
          <b-btn class="view-more">View more</b-btn>
        </b-col>
      </b-row>


    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AddFolderModal from "./AddFolderModal.vue";
import googleapis from "../googleapis";
// This is to make tracked items stick to the top of pagey
import VueSticky from "vue-sticky";
Vue.use(VueSticky);

// This is to display the google charts
import VueGoogleCharts from "vue-google-charts";
Vue.use(VueGoogleCharts);

import Colours from "./ColourGeneration.vue";

export default {
  name: "FolderList",
  components: {
    AddFolderModal
  },
  data() {
    return {
      userList: ["person1", "person2", "person3", "person4", "Fred", "person5"],
      colourList: [],
      fields: [
        { key: "name", sortable: true, label: "Folder Name" },
        { key: "owner", sortable: true, label: "Owner" },
        { key: "lastEdit", sortable: true, label: "Last Edit" }
      ],
      folders: [],
      pieData: [
        ["Task", "Hours per Day"],
        ["Kenny", 11],
        ["Hoang", 2],
        ["Erica", 2],
        ["Dax", 2],
        ["Marc", 7]
      ],
      pieOptions: {
        chartArea: { width: 800, height: 800 },
        pieHole: 0.4,
        legend: "none",
        backgroundColor: { fill: "transparent" },
        //height: 250,
        colors: this.colourList
      }
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
      this.$router.push("/folder/" + item.id);
    },
    getUserColour(user) {
      return this.colourList[this.userList.indexOf(user)];
    },
    showPreview(item) {
      item.id;
    }
  },
  async mounted() {
    //console.log("Hi");
    this.colourList = Colours.generateColours(this.userList.length);
    this.pieOptions.colors = this.colourList;
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 2fr 1fr;
  width: 100%;
}
.trackedItems {
  background: rgba(255, 255, 255, 0.4);
  padding: 40px;
  width: 90%;
  grid-column: 1 / 2;
}

.sideBar {
  background: rgba(255, 255, 255, 0.4);
  padding: 20px;
  width: 25%;
  right: 0;
  position: fixed;
  /* overflow-y: scroll; */
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  grid-column: 2 / 3;
}

.pieChart {
  margin: 10px;
  background: transparent;
  margin: auto;
  padding: 30px;
  border-radius: 25px;
  width: 100%;
  /* height: 300px; */
  /* height: 400px; */
}

.button {
  background-color: coral;
  align-self: flex-end;
}

.view-more {
  background-color: coral;
  align-self: flex-end;
  vertical-align: bottom;
}

.col {
  text-align: end;
}

.col2 {
  text-align: end;
  vertical-align: bottom;
}

.chart {
  align-content: flex-start;
  /* display: flex;
  flex-wrap: wrap; */

  /* background: rgba(256, 256, 256, 1); can be anything, of course */
  background: transparent;
  margin: auto;
  padding: 20px;
  /* overflow-y: scroll; */
  /* box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75); */
  border-radius: 25px;
  width: 100%;
  height: 30%;
}

.info {
  align-content: flex-start;
  /* display: flex;
  flex-wrap: wrap; */

  /* background: rgba(256, 256, 256, 1); can be anything, of course */
  background: transparent;
  margin: auto;
  padding: 20px;
  /* overflow-y: scroll; */
  /* box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75); */
  border-radius: 25px;
  width: 100%;
  height: 25%;
}

.legend {
  align-content: flex-start;
  /* display: flex;
  flex-wrap: wrap; */

  /* background: rgba(256, 256, 256, 1); can be anything, of course */
  background: transparent;
  margin: auto;
  padding: 20px;
  /* overflow-y: scroll; */
  /* box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75); */
  border-radius: 25px;
  width: 100%;
  height: 25%;
}
.user-list {
  overflow-y: scroll;
  height: 70%;
}
.legend-entry {
  display: flex;
  align-items: center;
}
.legend-box {
  /*background-color: aqua;*/
  height: 10px;
  width: 10px;
  margin-left: 10px;
}
.legend-name {
  margin-left: 20px;
}
</style>
