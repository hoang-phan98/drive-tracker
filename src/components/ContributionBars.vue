<template>
  <div>
    <GChart
      v-for="file in data"
      v-bind:key="file.id"
      type="BarChart"
      v-bind:data="file.data"
      :options="file.options"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  name: "ContributionBars",
  props: {
    files: {},
    contributors: Array
  },
  computed: {
    data() {
      return this.files.map(file => {
        const labels = [
          "Contributor",
          ...this.contributors.map(contributor => contributor.displayName),
          { role: "annotation" }
        ];

        const values = [
          file.name,
          ...this.contributors.map(contributor => {
            return file.contributions.filter(
              contribution =>
                contribution.user.emailAddress === contributor.emailAddress
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
            }
            // TODO
            // colors: []
          }
        };
      });
    }
  }
};
</script>

<style>
</style>
