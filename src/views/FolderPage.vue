<template>
  <div class="folderpage">
    <div class="grid-container">
      <!--<div class="legend-holder">-->

        <div class="legend">
          <h1>Users</h1>
          <span><br></span>
          <div class="legend-list">
          <div v-for="user in userList" :key="user.id" class="legend-entry">
            <div :style="'background-color:'+getUserColour(user)" class="legend-box"></div><span class="legend-name">{{getUserName(user)}}</span>
          </div>
          </div>
          <!--style= {{getUserColourAttr(user)}}-->
          <!--style= "background-colour:"+{{colourList[index]}}-->
          <!--<div v-for="index in userList.length" :key="index" class="legend-entry">

            <div  class="legend-box"></div><span class="legend-name">{{userList[index]}}</span>
          </div> -->
        <!-- </div> -->
      </div>
      <div class = "pichart">


        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />

      </div>

      <div class="histogram">
        <GChart
          type="LineChart"
          :data="lineData"
          :options="lineOptions"
        />
      </div>
      <div class="filecontribution">
        <h1>Files</h1>
        <ContributionBars
          v-if="folder"
          :files="Object.values(folder.files)"
          :contributors="Object.values(folder.contributors)"
          :colors="colors"
        />
      </div>

    </div>
  </div>
</template>

<script>
import gapi from "../googleapis.js";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import Colours from "./ColourGeneration.vue";
import ContributionBars from "../components/ContributionBars.vue";
//import randomColour from "./ColourGeneration.vue";

Vue.use(VueGoogleCharts);

export default {
  name: "FolderPage",
  components: {
    ContributionBars
  },
  props: {
    id: String
  },
  inject: ["contributions"],
  //components: {
  //  Colours //???
  //},
  // fileList is an object with the file's id and permissions
  // permissions has the user's id and display name that we can use for the displaying of data
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

    this.fileList = (await gapi.client.drive.files.list({
      fields: "files(id, name, permissions)",
      //q: starred != true
      q: "'1S9QJbW_gBXqWoEE4CtBCGoXZNnKOaDnG' in parents" // file id goes here
    })).result.files;

    for (var i = 0; i < this.fileList.length; i++) {
      for (var j = 0; j < this.fileList[i].permissions.length; j++) {
        if (
          !this.userList.includes(this.fileList[i].permissions[j].emailAddress)
        ) {
          this.userList.push(this.fileList[i].permissions[j].emailAddress);
          this.userNameList.push(this.fileList[i].permissions[j].displayName);
          //console.log(this.fileList[i].permissions[j]);
          //this.usernameList.push(this.fileList[i].permissions[j]);
        }
      }
    }

    //console.log(Colours);
    this.colourList = Colours.generateColours(this.userList.length);
    Object.values(folder.contributors).forEach((user, i) => {
      this.colors[user.emailAddress] = this.colourList[i];
    });

    this.folder = folder;

    // call generate colours function while passing in the number of users from userList.length
    this.populatePieData();
  },
  methods: {
    getUserColour(user) {
      // user is the user's email
      return this.colourList[this.userList.indexOf(user)];
    },
    getUserName(user) {
      // user is the user's email
      return this.userNameList[this.userList.indexOf(user)];
    },
    populatePieData() {
      for (let i = 0; i < this.userList.length; i++) {
        let data = [];
        data.push(this.userNameList[i]);
        data.push(this.pieStats[i]);
        data.push(this.colourList[i]);

        //console.log([(this.userList[i], this.pieStats[i], this.colourList[i])]);
        this.pieData.push([
          this.userNameList[i],
          this.pieStats[i]
          //this.colourList[i]
        ]);
        this.pieOptions.colors = this.colourList;
      }
    }
  },
  data() {
    return {
      folder: null,
      colors: {},
      userList: [],
      userNameList: [],
      fileList: [],
      colourList: [], // need this? make the instance global?
      /*userData: [
        ["Contributers", "Colour", { role: "style" }],
        ["Kenny", 10, "#FF0000"],
        ["Hoang", 16, "#00FF00	"],
        ["Erica", 28, "#0000FF	"],
        ["Dax", 16, "#FFFF00	"],
        ["Marc", 28, "#808080"]
      ],*/
      pieStats: [4, 2, 5, 7, 10, 2, 3, 4],
      barStats: [],
      userOptions: {
        //width: 600,
        //height: 500,
        title: "Contributers",
        legend: "none",
        bar: { groupWidth: "75%" },
        isStacked: "percent"
      },
      pieData: [
        ["Task", "Hours per Day"]
        // ["Kenny", 11],
        // ["Hoang", 2],
        // ["Erica", 2],
        // ["Dax", 2],
        // ["Marc", 7]
      ],
      pieOptions: {
        //width: 600,
        height: 600,
        title: "All Time Contribution",
        pieHole: 0.4,
        legend: "none"
        //colors: colourList
      },
      lineData: [
        ["Year", "Sales", "Expenses"],
        ["2004", 1000, 400],
        ["2005", 1170, 460],
        ["2006", 660, 1120],
        ["2007", 1030, 540]
        //["10/01/2018", 10, 24, 20, ""],
        //["11/01/2018", 16, 22, 23, ""],
        //["12/01/2018", 28, 19, 29, ""],
        //["13/01/2018", 16, 22, 23, ""]
      ],
      lineOptions: {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" }
      },
      barData: [],
      barDatas: [],
      singularBarData: []
    };
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 2fr 3fr;
  grid-template-rows: 2fr 1fr;
  width: 100%;
  min-height: 0;
  min-width: 0;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  /*text-align: center; */
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
}
.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
  height: 100%;
}
.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  /* margin: auto; */
  padding: 10px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
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

  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;

  /*width: 100%;*/
  width: 100%;
  height: 100%;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.legend-list {
  overflow-y: scroll;
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
</style>
