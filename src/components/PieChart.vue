<template>
  <div>
    <GChart
      type="PieChart"
      v-bind:key="file.id"
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
  name: "PieChart",
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
            height: 600,
            title: "All Time Contribution",
            pieHole: 0.4,
            legend: "none",
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
