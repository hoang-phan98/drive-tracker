<template>
  <div class="folderList">
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
        <b-col class="col2" style="text-align: flex-end">
          <b-btn v-b-modal.modal1 class="button">+</b-btn>
        </b-col>
      </b-row>

      <AddFolderModal id="modal1" @add-folder="addFolder($event)" />
    </b-container>

    <div class="sideBar">

      <div class="PieChart">
        <h3>All-time</h3>
        <h3>Contribution</h3>
        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />
      </div>

      <div class="histogramChart">
        <h3>Folder Histogram</h3>
        <GChart
          type="ColumnChart"
          :data="histogramData"
          :options="histogramOptions"
        />
      </div>

      <div class="fileContribution">
        <h3>File Contribution</h3>
        <GChart
          type="BarChart"
          :data="barData"
          :options="barOptions"
        />
      </div>

      <div class="fileContribution">
        <h3>I am here to demonstrate scrolley</h3>
        <GChart
          type="BarChart"
          :data="barData"
          :options="barOptions"
        />
      </div>

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

export default {
  name: "FolderList",
  components: {
    AddFolderModal
  },
  data() {
    return {
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
        backgroundColor: { fill: "transparent" }
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
        title: "File contrution over time",
        legend: { position: "top", maxLines: 3 },
        bar: { groupWidth: "75%" },
        isStacked: true,
        backgroundColor: { fill: "transparent" }
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
        title: "User contributions",
        legend: { position: "top", maxLines: 3 },
        bar: { groupWidth: "75%" },
        isStacked: true,
        backgroundColor: { fill: "transparent" }
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
    }
  }
};
</script>

<style scoped>
.trackedItems {
  background: rgba(255, 255, 255, 0.4);
  padding: 40px;
  width: 75%;
}

.sideBar {
  background: rgba(255, 255, 255, 0.4);
  padding: 40px;
  width: 25%;
  right: 0;
  position: fixed;
  overflow-y: scroll;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}

.pieChart {
  margin: 10px;
}

.button {
  background-color: coral;
  align-self: flex-end;
}

.col2 {
  text-align: end;
}
</style>
