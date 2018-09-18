<template>
  <div class="contributiongrid">
    <div class="allcharts" >
      <GChart
        v-for="file in data"
        v-bind:key="file.id"
        type="BarChart"
        v-bind:data="file.data"
        :options="file.options"
      />
    </div>
    <div class="buttons">
      <button class="button"
        v-for="file in data"
        v-bind:key="fileID"
        v-on:click="filenav(file.fileID, $event)">
        {{ file.fileID }}
      </button>
    </div>
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
    colors: Object,
    contributors: Array
  },
  computed: {
    data() {
      return this.files.map(file => {
        const labels = [
          "Contributor",
          ...this.contributors.map(user => user.displayName),
          { role: "annotation" }
        ];

        const values = [
          file.name,
          ...this.contributors.map(user => {
            return file.contributions.filter(
              contribution =>
                contribution.user.emailAddress === user.emailAddress
            ).length;
          }),
          ""
        ];

        return {
          data: [labels, values],
          fileID: file.id,
          options: {
            height: 100,
            legend: { position: "none" },
            bar: { groupWidth: "75%" },
            isStacked: true,
            hAxis: {
              minValue: 0,
              viewWindow: {
                max: file.contributions.length
              }
            },
            colors: this.contributors.map(
              user => this.colors[user.emailAddress]
            )
          }
        };
      });
    },
  },
  methods: {
    filenav(item) {
      // navs the the file level view
      this.$router.push("/file/" + item);
    }
  }
};
</script>

<style>
.contributiongrid {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
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
