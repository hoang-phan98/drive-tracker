<template>
  <div class="contributiongrid">
    <div class="files">
      <div v-for="subFolder in data.subFolderData"
        v-bind:key="subFolder.id"
        class="file">
      <div class="file-name">
        <div>{{subFolder.folderName}}</div>
      </div> 
      <div class="file-chart">
        <GChart
          type="BarChart"
          v-bind:data="subFolder.data"
          :options="subFolder.options"
        />
        </div>
        <div class="file-actions">
          <b-button variant="outline-primary" size="sm"
            v-on:click="foldernav(subFolder.folderID, $event)">
            More Details
          </b-button>
        </div>
      </div>
    </div>
    <div class="files">
      <div v-for="file in data.fileData"
        v-bind:key="file.id"
        class="file">
      <div class="file-name">
        <div>{{file.fileName}}</div>
      </div>
      <div class="file-chart">
        <GChart
          type="BarChart"
          v-bind:data="file.data"
          :options="file.options"
        />
        </div>
        <div class="file-actions">
          <b-button variant="outline-primary" size="sm"
            v-on:click="filenav(file.fileID, $event)">
            More Details
          </b-button>
        </div>
      </div>
    </div>
    <!-- <div class="buttons">
      <button class="button"
        v-for="file in data"
        v-bind:key="file.fileIDs"
        v-on:click="filenav(file.fileID, $event)">
        {{ file.fileID }}
      </button>
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  name: "ContributionBars",
  props: {
    files: Array,
    subFolders: Array,
    colors: Object,
    contributors: Array
  },
  computed: {
    data() {
      let fileData = this.files.map(file => {
        const labels = [
          "Contributor",
          ...this.contributors.map(user => user.displayName),
          { role: "annotation" }
        ];

        var values = [
          "",
          ...this.contributors.map(user => {
            return file.contributions.filter(
              contribution =>
                contribution.user.emailAddress === user.emailAddress
            ).length;
          }),
          ""
        ];

        // change data to percentages
        var sum = 0;
        for (let i = 1; i < values.length - 1; i++) {
          sum += values[i];
        }
        for (let j = 1; j < values.length - 1; j++) {
          values[j] = (values[j] / sum) * 100;
        }

        return {
          data: [labels, values],
          fileID: file.id,
          fileName: file.name,
          options: {
            height: 60,
            legend: { position: "none" },
            bar: { groupWidth: "50%" },
            isStacked: true,
            hAxis: {
              minValue: 0
              // viewWindow: {
              //   max: file.contributions.length
              // }
            },
            colors: this.contributors.map(
              user => this.colors[user.emailAddress]
            )
          }
        };
      });
      ///

      let subFolderData = this.subFolders.map(subFolder => {
        var subFiles = Object.values(subFolder.files);

        const labels = [
          "Contributor",
          ...this.contributors.map(user => user.displayName),
          { role: "annotation" }
        ];

        var result = [];
        for (let user of this.contributors) {
          const vals = subFiles.map(subFile => {
            return subFile.contributions.filter(
              contribution =>
                contribution.user.emailAddress === user.emailAddress
            ).length;
          });

          var total = 0;
          for (var i = 0; i < vals.length; i++) {
            total = total + vals[i];
          }
          result.push(total);
        }

        var values = [""].concat(result).concat([""]);
        // change data to percentages
        var sum = 0;
        for (let i = 1; i < values.length - 1; i++) {
          sum += values[i];
        }
        for (let j = 1; j < values.length - 1; j++) {
          values[j] = (values[j] / sum) * 100;
        }

        return {
          data: [labels, values],
          folderID: subFolder.id,
          folderName: subFolder.name,
          options: {
            height: 60,
            legend: { position: "none" },
            bar: { groupWidth: "50%" },
            isStacked: true,
            hAxis: {
              minValue: 0
              // viewWindow: {
              //   max: file.contributions.length
              // }
            },
            colors: this.contributors.map(
              user => this.colors[user.emailAddress]
            )
          }
        };
      });
      ///

      return { fileData: fileData, subFolderData: subFolderData };
    }
  },
  methods: {
    filenav(item) {
      // navs the the file level view
      this.$router.push("/file/" + item);
    },
    foldernav(item) {
      // navs the the folder page
      this.$router.push("/folder/" + item);
    }
  },
  mounted() {
    // console.log(this.values);
    // console.log(this.labels);
  }
};
</script>

<style>
.contributiongrid {
  padding: 1rem;
  /* display: grid;
  grid-gap: 30px;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  width: 100%; */
}

.file {
  display: flex;
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr;
}

.file-name {
  grid-column: 1 / 2;
  flex-grow: 0;
  width: fit-content;
  width: 100px;
}

.file-chart {
  grid-column: 2 / 3;
  flex-grow: 1;
}

.file-actions {
  grid-column: 3 / 4;
  flex-grow: 0;
}

.allcharts {
  margin: auto;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  /*text-align: center; */
  width: 80%;
}

.buttons {
  margin: auto;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  /*text-align: center; */
  width: 80%;
  height: 100%;
}

.button {
  width: 100%;
}
</style>
