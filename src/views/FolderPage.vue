<template>
  <div class="folderpage">
    <div class="grid-container">
      <!--<div class="legend-holder">-->

        <div class="legend">
          <h1>Users</h1>
          <span><br></span>
          <div v-for="user in userList" :key="user.id" class="legend-entry">
            <div :style="'background-color:'+getUserColour(user)" class="legend-box"></div><span class="legend-name">{{user}}</span>
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
          type="ColumnChart"
          :data="histogramData"
          :options="histogramOptions"
        />
      </div>
      <div class="filecontribution">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Day" active>
              <GChart
                v-for="fileData in barData"
                type="BarChart"
                v-bind:data="fileData"
                :options="barOptions"
              />
            </b-tab>
            <b-tab title="Week">
              File Contribution bar graph for week goes here
            </b-tab>
            <b-tab title="Month">
              File Contribution bar graph for month goes here
            </b-tab>
            <b-tab title="Year">
              File Contribution bar graph for year goes here
            </b-tab>
            <b-tab title="All Time">
              File Contribution bar graph for alltime goes here
            </b-tab>
          </b-tabs>

          <div>
            <b-card>
              <b-row class = "fileHolder" v-for="file in fileList" :key="file.id">
                <!-- filename -->
                <div> {{ file.name }} </div>

                <span><br></span>
              </b-row>
            </b-card>
          </div>

        </b-card>
      </div>

    </div>
  </div>
</template>

<script>
import gapi from "../googleapis.js";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import Colours from "./ColourGeneration.vue";
//import randomColour from "./ColourGeneration.vue";

Vue.use(VueGoogleCharts);

export default {
  //name: "FolderPage",
  //components: {
  //  Colours //???
  //},
  // fileList is an object with the file's id and permissions
  // permissions has the user's id and display name that we can use for the displaying of data
  async mounted() {
    this.fileList = (await gapi.client.drive.files.list({
      fields: "files(id, name, permissions)",
      //q: starred != true
      q: "'1S9QJbW_gBXqWoEE4CtBCGoXZNnKOaDnG' in parents" // file id goes here
    })).result.files;

    for (var i = 0; i < this.fileList.length; i++) {
      for (var j = 0; j < this.fileList[i].permissions.length; j++) {
        if (
          !this.userList.includes(this.fileList[i].permissions[j].displayName)
        ) {
          this.userList.push(this.fileList[i].permissions[j].displayName);
        }
      }
    }

    //console.log(Colours);
    this.colourList = Colours.generateColours(this.userList.length);

    // call generate colours function while passing in the number of users from userList.length
    this.populatePieData();
    this.populateBarData();
  },
  methods: {
    getUserColour(user) {
      return this.colourList[this.userList.indexOf(user)];
    },
    populateBarData() {
      for (let i = 0; i < this.fileList.length; i++) {
        let data = [];
        let sum = 0;
        for (let j = 0; j < this.userList.length - 1; j++) {
          let num = Math.floor(Math.random() * 20);
          data.push(num);
          sum += num;
        }
        data.push(100 - sum);
        this.barStats.push(data);
      } // NOTE the bar stats will add up to 100 when populated with data (percentaegs)

      for (let i = 0; i < this.fileList.length; i++) {
        let fileData = [];
        fileData.push(
          ["Contributers"].concat(this.userList).concat({
            role: "annotation"
          })
        );
        fileData.push(
          [this.fileList[i].name].concat(this.barStats[i]).concat("")
        );
        this.barData.push(fileData);
      }



      this.barOptions.colors = this.colourList;
    },
    populatePieData() {
      for (let i = 0; i < this.userList.length; i++) {
        let data = [];
        data.push(this.userList[i]);
        data.push(this.pieStats[i]);
        data.push(this.colourList[i]);

        //console.log([(this.userList[i], this.pieStats[i], this.colourList[i])]);
        this.pieData.push([
          this.userList[i],
          this.pieStats[i]
          //this.colourList[i]
        ]);
        this.pieOptions.colors = this.colourList;
      }
    }
  },
  data() {
    return {
      userList: [],
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
      histogramData: [
        [
          "Contributers",
          "Add Files",
          "Delete Files",
          "File Revisions",
          { role: "annotation" }
        ],
        ["01/01/2018", 10, 24, 20, ""],
        ["02/01/2018", 16, 22, 23, ""],
        ["03/01/2018", 28, 19, 29, ""],
        ["04/01/2018", 16, 22, 23, ""],
        ["05/01/2018", 28, 19, 29, ""],
        ["06/01/2018", 10, 24, 20, ""],
        ["07/01/2018", 16, 22, 23, ""],
        ["08/01/2018", 28, 19, 29, ""],
        ["09/01/2018", 16, 22, 23, ""]
        //["10/01/2018", 10, 24, 20, ""],
        //["11/01/2018", 16, 22, 23, ""],
        //["12/01/2018", 28, 19, 29, ""],
        //["13/01/2018", 16, 22, 23, ""]
      ],
      histogramOptions: {
        //width: 1700,
        height: 600,
        title: "File contrution over time",
        legend: { position: "top", maxLines: 3 },
        bar: { groupWidth: "75%" },
        isStacked: true
      },
      barData: [],
      barDatas: [],
      singularBarData: [],
      barOptions: {
        //width: 1700,
        height: 100,
        legend: { position: "none" },
        bar: { groupWidth: "75%" },
        isStacked: true
      }
    };
  }
};
</script>

<style>
.grid-container {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 2fr 3fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
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
  grid-column: 1 / 3;
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
  grid-row: 1 / -1;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
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
