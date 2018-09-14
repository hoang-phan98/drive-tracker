<template>
  <div>
    <GChart
      type="LineChart"
      :data="helloworld.data"
      :options="helloworld.options"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  name: "Timeline",
  props: {
    files: Array,
    colors: Object,
    contributors: Array
  },
  computed: {
    helloworld() {
        const labels = [
          'Year', 'Sales', 'Expenses'
        ];

        const values = [
          '2004', 1000, 400
        ];

        console.log([labels, values]);

        return {
          data: [labels, values],
          options: {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' },
            colors: this.contributors.map(
              user => this.colors[user.emailAddress]
            )
          }
        };
    }
  }
};
</script>

<style>
</style>
