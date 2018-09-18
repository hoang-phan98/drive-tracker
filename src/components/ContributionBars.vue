<template>
  <div>
    <div v-for="file in data">
      <GChart
        v-bind:key="file.id"
        type="BarChart"
        v-bind:data="file.data"
        :options="file.options"
      />
      <button>
        hello
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
    }
  }
};
</script>

<style>
</style>
