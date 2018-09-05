<template>
  <div class="folderpage">
    <div class="grid-container">
      <div class="users">
        <b-row v-for="user in userList" :key="user.id">
            <!-- user name  -->
            <b-col class="legend"><span class = "box"></span><span class="indent">{{user}}</span></b-col>
            <span><br></span>
        </b-row>
        <!--<GChart
          type="BarChart"
          :data="userData"
          :options="userOptions"
        />-->
      </div>
      <div class="pichart">
        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />
      </div>
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
                type="BarChart"
                :data="barData"
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
        </b-card>
      </div>

      <div class="filecontribution">
        <b-card no-body>
          <b-row v-for="file in fileList" :key="file.id">
            <!-- filename -->
            <b-col> {{ file.name }} </b-col>
            
            <span><br></span>
          </b-row>
        </b-card>
      </div>
    </div>

</template>

<script>
import gapi from "../googleapis.js";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  // fileList is an object with the file's id and permissions
  // permissions has the user's id and display name that we can use for the displaying of data
  async mounted() {
    this.fileList = (await gapi.client.drive.files.list({
      fields: "files(id, name, permissions)",
      //q: starred != true
      q: "'1m0Mq_RHMpXJXfVzEISPySwPheg9PUSqy' in parents" // file id goes here
    })).result.files;

    for (var i = 0; i < this.fileList.length; i++) {
      //in this.fileList
      //console.log(file); // why does this print a number
      for (var j = 0; j < this.fileList[i].permissions.length; j++) {
        if (
          !this.userList.includes(this.fileList[i].permissions[j].displayName)
        ) {
          this.userList.push(this.fileList[i].permissions[j].displayName);
        }
      }
    }
  },

  data() {
    return {
      userList: [],
      fileList: [],
      userData: [
        ["Contributers", "Colour", { role: "style" }],
        ["Kenny", 10, "#FF0000"],
        ["Hoang", 16, "#00FF00	"],
        ["Erica", 28, "#0000FF	"],
        ["Dax", 16, "#FFFF00	"],
        ["Marc", 28, "#808080"]
      ],
      userOptions: {
        width: 600,
        height: 500,
        title: "Contributers",
        legend: "none",
        bar: { groupWidth: "75%" },
        isStacked: "percent"
      },
      pieData: [
        ["Task", "Hours per Day"],
        ["Kenny", 11],
        ["Hoang", 2],
        ["Erica", 2],
        ["Dax", 2],
        ["Marc", 7]
      ],
      pieOptions: {
        width: 600,
        height: 600,
        title: "All Time Contribution",
        pieHole: 0.4,
        legend: "none"
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
        ["09/01/2018", 16, 22, 23, ""],
        ["10/01/2018", 10, 24, 20, ""],
        ["11/01/2018", 16, 22, 23, ""],
        ["12/01/2018", 28, 19, 29, ""],
        ["13/01/2018", 16, 22, 23, ""]
      ],
      histogramOptions: {
        width: 1700,
        height: 500,
        title: "File contrution over time",
        legend: { position: "top", maxLines: 3 },
        bar: { groupWidth: "75%" },
        isStacked: true
      },
      barData: [
        [
          "Contributers",
          "Add Files",
          "Delete Files",
          "File Revisions",
          { role: "annotation" }
        ],
        ["Kenny", 10, 24, 20, ""],
        ["Hoang", 16, 22, 23, ""],
        ["Erica", 28, 19, 29, ""],
        ["Dax", 16, 22, 23, ""],
        ["Marc", 28, 19, 29, ""]
      ],
      barOptions: {
        width: 1700,
        height: 500,
        title: "User contributions",
        legend: { position: "top", maxLines: 3 },
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
  grid-gap: 30000px 30px;
}

.users {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  text-align: left;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 3;
  grid-row: 4 / 5;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.legend {
  align-content: flex-start;
}
.box {
  background-color: aqua;
  position: absolute;
  height: 10px;
  width: 10px;
  top: 35%;
}
.indent {
  margin-left: 30px;
}
</style>
