<template>
    <div>
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

      <div class="info">
        <h2>Recent History</h2>
        <div class="user-list">
        <div v-for="entry in historyList" :key="entry.id" class="history-entry">
          <div><span>{{entry}}</span>
        </div>
        </div>
      </div>
      </div>



      <b-row style="vertical-align: bottom">
        <b-col class="col2" style="text-align: flex-end">
          <b-btn class="view-more">View more</b-btn>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import Vue from "vue";
//import googleapis from "../googleapis";
// This is to display the google charts
import VueGoogleCharts from "vue-google-charts";
Vue.use(VueGoogleCharts);

import Colours from "../views/ColourGeneration.vue";

export default {
  name: "FolderList",
  components: {},
  data() {
    return {
      userList: ["person1", "person2", "person3", "person4", "Fred", "person5"],
      historyList: [
        "person1 made 5 changes",
        "person2 added 2 new files",
        "person3 mae 1 change",
        "Fred did something",
        "person5 edited this yesterday"
      ],
      colourList: [],
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

        colors: this.colourList
      }
    };
  },
  methods: {
    getUserColour(user) {
      return this.colourList[this.userList.indexOf(user)];
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
  height: 35%;
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
  height: 23%;
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
  height: 23%;
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
