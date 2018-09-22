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
        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />

      </div>

      <div class="histogram">
        <GChart
          type="LineChart"
          :data="histogramData"
          :options="histogramOptions"
        />

      </div>



      <div class="filecontribution">
        <b-card no-body class="fcTable">
          <b-tabs card>
            <b-tab title="Day" active>
              <h2>File Revision History</h2>
              <b-row>
                <b-table
                  :items="revisions"
                  :fields="fields"
                  @row-clicked="open($event)"
                  hover
                  >
                </b-table>
              </b-row>
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

        </b-card>
      </div>

      <div class="divider"/>
      <div class="divider1"/>
      <div class="divider2"/>


    </div>

  </div>
  <LoadingScreen v-else>
  </LoadingScreen>
</template>

<script>
import gapi from "../googleapis.js";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import Colours from "./ColourGeneration.vue";
import MaterialIcon from "@/components/MaterialIcon.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
//import randomColour from "./ColourGeneration.vue";

Vue.use(VueGoogleCharts);

export default {
  inject: ["contributions"],
  name: "FilePage",
  components: {
    MaterialIcon,
    LoadingScreen
  },
  props: {
    id: String,
    rendered: false
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

    this.userList = file.contributors;

    //console.log(Colours);
    this.colourList = Colours.generateColours(this.userList.length);

    Object.values(file.contributors).forEach((user, i) => {
      this.colors[user.emailAddress] = this.colourList[i];
    });

    // call generate colours function while passing in the number of users from userList.length
    this.populatePieData();
    this.populateBarData();

    this.file = file;
    // console.log(file);
    this.$nextTick(function() {
      this.rendered = true;
    });
  },
  methods: {
    // getUserColour(user) {
    //   return this.colourList[this.userList.indexOf(user)];
    // },
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
      fileName: "File Name",
      colors: {},
      userList: [],
      fileList: [],
      fields: [
        { key: "revID", sortable: true, label: "Revision ID" },
        { key: "user", sortable: true, label: "User" },
        { key: "date", sortable: true, label: "Date" }
      ],
      // some random hard coded data for revisions. I made it up and it has no merit
      revisions: [
        {
          revID: "34252323",
          user: "Kenny",
          date: "34/23/3249"
        },
        {
          revID: "34252323",
          user: "Kenny",
          date: "34/23/3249"
        },
        {
          revID: "34252323",
          user: "Kenny",
          date: "34/23/3249"
        },
        {
          revID: "34252323",
          user: "Kenny",
          date: "34/23/3249"
        },
        {
          revID: "34252323",
          user: "Kenny",
          date: "34/23/3249"
        }
      ],
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
        chartArea: {
          width: "85%"
        },
        height: this.height || 500,
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

.fileName {
  margin-left: 10px;
}

.pichart {
  /*background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  /*margin: auto;*/
  /*padding: 10px;*/
  grid-column: 2 / 3;
  grid-row: 2;
  width: 100%;
  height: 100%;
  /*text-align: center; */
  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/
}

.toggleGroupPieChart {
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

.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  /* margin: auto; */
  padding: 10px;
  grid-column: 3 / 4;
  grid-row: 2;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  /*box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);*/
  /*border-radius: 25px;*/
  width: 100%;
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
