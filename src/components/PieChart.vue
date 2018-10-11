<template>
  <div>
    <div>
      <h2 class="pieTitle">Contributions</h2>
    </div>
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
        height: this.height || 400,
        pieHole: 0.4,
        legend: "none",
        chartArea: {
          height: "90%",
          width: "80%"
        },
        colors: this.contributors.map(user => this.colors[user.emailAddress])
      };
    }
  }
};
</script>

<style scoped>
</style>
