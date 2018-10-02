<template>
  <div v-if="rendered" class="folderpage">
    <div class="grid-container">
      <!--<div class="legend-holder">-->

        <div class="titleBanner">
          <h1 class="fileName">
          <material-icon icon="folder_open" size="large" />
            <router-link to="/">Home</router-link> > {{folder && folder.name}}
          </h1>
        </div>
      <div class="legend">
        <h1>Users</h1>
        <span><br></span>
        <div v-if="folder" class="legend-list">
          <div v-for="user in Object.values(folder.contributors)" :key="user.id" class="legend-entry">
            <div :style="'background-color:'+colors[user.emailAddress]" class="legend-box"></div>
            <span class="legend-name">{{user.displayName}}</span>
          </div>
        </div>
      </div>
      <div class="pichart">
        <PieChart
          v-if="folder"
          :files="Object.values(folder.files)"
          :contributors="Object.values(folder.contributors)"
          :colors="colors"
        />

      <ToggleGroup class="toggleGroupPieChart">
      </ToggleGroup>
      </div>
      <div class="histogram">
        <Timeline
          v-if="folder"
          :files="Object.values(folder.files)"
          :contributors="Object.values(folder.contributors)"
          :colors="colors"
        />

      <ToggleGroup class="toggleGroupHistogram">
      </ToggleGroup>
      </div>
      <div class="filecontribution">
        <h1 class="fileListTitle"> Files </h1>
        <ContributionBars class="contributionbars"
          v-if="folder"
          :files="Object.values(folder.files)"
          :subFolders="Object.values(folder.subFolders)"
          :contributors="Object.values(folder.contributors)"
          :colors="colors"
        />
      </div>

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
import ContributionBars from "../components/ContributionBars.vue";
import PieChart from "../components/PieChart.vue";
import Timeline from "../components/Timeline.vue";
import ToggleGroup from "../components/ToggleGroup.vue";
import MaterialIcon from "@/components/MaterialIcon.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
//import randomColour from "./ColourGeneration.vue";

Vue.use(VueGoogleCharts);

export default {
  name: "FolderPage",
  components: {
    ContributionBars,
    Timeline,
    PieChart,
    ToggleGroup,
    MaterialIcon,
    LoadingScreen
  },
  props: {
    id: String
  },
  inject: ["contributions"],
  async mounted() {
    let folder;
    try {
      folder = await this.contributions.fetchFolderContributionData(this.id);
    } catch (err) {
      // TODO show the user an error
      // eslint-disable-next-line
      console.error(err);
      return;
    }

    // Generate and assign colors
    const colorList = Colours.generateColours(
      Object.keys(folder.contributors).length
    );
    Object.values(folder.contributors).forEach((user, i) => {
      this.colors[user.emailAddress] = colorList[i];
    });

    this.folder = folder;

    this.$nextTick(function() {
      this.rendered = true;
    });
  },
  data() {
    return {
      folder: null,
      colors: {},
      rendered: false
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
  grid-template-rows: 0.1fr 1fr 1fr;
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

.folderName {
  margin-left: 10px;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 2;
  /*text-align: center; */
  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/
  width: 100%;
  height: 100%;
}

.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 4;
  grid-row: 3;
  text-align: center;
  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/
  width: 100%;
  height: 100%;
}

.toggleGroupHistogram {
  margin-top: 30px;
}

.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  /* margin: auto; */
  grid-column: 3 / 4;
  grid-row: 2;
  text-align: center;
  height: 600px;
  width: 100%;
  overflow-y: scroll;
}

.fileListTitle {
  margin-top: 50px;
}

.contributionbars {
  margin: auto;
  grid-column: 1 / 2;
  grid-row: 2;
  text-align: center;
  width: 100%;
  height: 100%;
}

.filenavbuttons {
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 3;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
}

.legend {
  align-content: flex-start;
  /* display: flex;
  flex-wrap: wrap; */

  background: rgba(256, 256, 256, 1); /*can be anything, of course*/

  margin: auto;
  padding: 50px;

  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/

  /*width: 100%;*/
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 2;
}
.legend-list {
  overflow-y: auto;
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
.fileHolder {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  align-self: flex-start;
  margin: 30px;
  /*grid-column: 2 / 3;
  grid-row: -2 / -1;*/
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
