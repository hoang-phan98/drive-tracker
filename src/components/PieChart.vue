<template>
  <div>
    <GChart
      type="PieChart"
      :data="data"
      :options="pieOptions"
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
    contributors: Array,
    height: Number
  },
  computed: {
    data() {
      var result = [["User", "Contributions"]];
      for (let user of this.contributors) {
        const name = user.displayName;
        const values = this.files.map(file => {
          return file.contributions.filter(
            contribution => contribution.user.emailAddress === user.emailAddress
          ).length;
        });

        var total = 0;
        for (var i = 0; i < values.length; i++) {
          total = total + values[i];
        }
        result.push([name, total]);
      }
      return result;
    },
    pieOptions() {
      return {
        chartArea: {
          width: "85%"
        },
        height: this.height || 500,
        title: "All Time Contribution",
        pieHole: 0.4,
        legend: "none",
        colors: this.contributors.map(user => this.colors[user.emailAddress])
      };
    }
  }
};
</script>

<style>
</style>
