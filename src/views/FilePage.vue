<template>
  <div v-if="rendered" class="filePage">
    <div class="grid-container">
      <!--<div class="legend-holder">-->
        <div class="titleBanner">
          <material-icon icon="insert_drive_file" size="large" />
          <h1 class="fileName">
            {{fileName}}
          </h1>
        </div>

        <div class="legend">
          <h2>Users</h2>
          <span><br></span>
          <div v-for="user in userList" :key="user.id" class="legend-entry">
            <div :style="{backgroundColor:colors[user.emailAddress]}" class="legend-box"></div><span class="legend-name">{{user.displayName}}</span>
          </div>
          <!--style= {{getUserColourAttr(user)}}-->
          <!--style= "background-colour:"+{{colourList[index]}}-->
          <!--<div v-for="index in userList.length" :key="index" class="legend-entry">

            <div  class="legend-box"></div><span class="legend-name">{{userList[index]}}</span>
          </div> -->
        <!-- </div> -->
      </div>

      <div class = "pichart">
        <PieChart
          v-if="file"
          :files="files"
          :contributors="Object.values(file.contributors)"
          :colors="colors"
        />

      </div>

      <div class="histogram">
        <Timeline
          v-if="file"
          :files="files"
          :contributions="Object.values(file.contributions)"
          :contributors="Object.values(file.contributors)"
          :colors="colors"
        />
      </div>

      <div class="filecontribution">
        <RevisionHistory
          v-if="file"
          :revisions ="Object.values(file.revisions)"
        />
      </div>

      <Timeline></Timeline>

      <div class="divider"/>
      <div class="divider1"/>
      <div class="divider2"/>


    </div>

  </div>
  <LoadingScreen v-else />
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import Colours from "./ColourGeneration.vue";
import MaterialIcon from "@/components/MaterialIcon.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import PieChart from "../components/PieChart.vue";
import PieChartFile from "../components/PieChartFile.vue";
import TimelineFile from "../components/TimelineFile.vue";
import Timeline from "../components/Timeline.vue";
import RevisionHistory from "../components/RevisionHistory.vue";
//import randomColour from "./ColourGeneration.vue";

Vue.use(VueGoogleCharts);

export default {
  inject: ["contributions"],
  name: "FilePage",
  components: {
    MaterialIcon,
    LoadingScreen,
    PieChart,
    PieChartFile,
    Timeline,
    TimelineFile,
    RevisionHistory
  },
  props: {
    id: String
  },
  async mounted() {
    let file;
    try {
      file = await this.contributions.fetchFileContributionData(this.id);
    } catch (err) {
      // TODO show the user an error
      // eslint-disable-next-line
      console.error(err);
      return;
    }

    this.userList = file.contributors;
    this.fileName = file.name;

    this.colourList = Colours.generateColours(
      Object.keys(this.userList).length
    );

    Object.values(file.contributors).forEach((user, i) => {
      this.colors[user.emailAddress] = this.colourList[i];
    });

    const files = [];
    files.push(file);
    this.file = file;
    this.files = files;

    this.$nextTick(function() {
      this.rendered = true;
    });
  },
  methods: {},
  data() {
    return {
      file: null,
      files: null,
      rendered: false,
      fileName: "File Name",
      colors: {},
      userList: [],
      fileList: [],
      fields: [
        { key: "revID", sortable: true, label: "Revision ID" },
        { key: "user", sortable: true, label: "User" },
        { key: "date", sortable: true, label: "Date" }
      ],
      colourList: []
    };
  }
};
</script>

<style scoped>
.grid-container {
  background: rgba(256, 256, 256, 1);
  border-radius: 10px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: 0.2fr 1.5fr 2fr;
  grid-template-rows: 0.1fr 1fr 1fr 1fr;
  width: 100%;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
  justify-content: space-evenly;
}

.titleBanner {
  background: rgba(256, 256, 256, 1);
  padding: 10px;
  margin-left: 20px;
  grid-column: 1 / 4;
  grid-row: 1;
  display: flex;
}

.fileName {
  margin-left: 10px;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 40px;
  grid-column: 2 / 3;
  grid-row: 2;
  width: 100%;
  height: 100%;
}

.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 20px;
  grid-column: 1 / 4;
  grid-row: 3;
  text-align: center;
  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/
  width: 100%;
  height: 100%;
}

.filecontribution {
  background: rgba(256, 256, 256, 1);
  padding: 10px;
  grid-column: 3 / 4;
  grid-row: 2;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
  height: 600px;
  overflow-y: scroll;
}

.legend {
  align-content: flex-start;
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/

  margin: auto;
  padding: 40px;

  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 2;
}

.legend-entry {
  display: flex;
  align-items: center;
}
.legend-box {
  height: 10px;
  width: 10px;
  margin-left: 10px;
}
.legend-name {
  margin-left: 20px;
}
.fileHolder {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  align-self: flex-start;
  margin: 30px;
}

.divider {
  background: rgb(33, 150, 243); /*can be anything, of course*/
  grid-column: 1/4;
  grid-row: 2;
  height: 2.5px;
  width: 100%;
  z-index: 1001;
}

.divider1 {
  background: rgb(228, 228, 228); /*can be anything, of course*/
  grid-column: 3;
  grid-row: 2;
  height: 100%;
  width: 1.5px;
  z-index: 1000;
}

.divider2 {
  background: rgb(228, 228, 228); /*can be anything, of course*/
  grid-column: 1 / 4;
  grid-row: 3;
  height: 1.5px;
  width: 100%;
  z-index: 1000;
}
</style>
