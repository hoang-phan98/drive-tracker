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
      // This is the data that needs to be passed into the GChart
      const lineData = [];

      // loop the the files of the folder in order to get the number of lines\
      const labels = ["Time"];
      for (var z = 0; z < this.files.length; z++) {
        labels.push(this.files[z].name);
      }
      lineData.push(labels);

      // loop through the revisions of each file and extract the unique dates
      var values = []; //stores the actual row to be appended lineData
      values.push(null);
      for (var i = 0; i < this.files.length; i++) {
        values.push(0);
      }

      for (var i = 0; i < this.files.length; i++) {
        for (var j = 0; j < this.files[i].revisions.length; j++) {
          values[0] = this.files[i].revisions[j].modifiedTime;
          values[i+1] += 1;
          var duplicateObject = JSON.parse(JSON.stringify( values ));
          lineData.push(duplicateObject);
        }
      }

      console.log(lineData);

      return {
        data: lineData,
        options: {
          title: "Revisions Timeline",
          curveType: "function",
          legend: { position: "bottom" },
          interpolateNulls: true,
          colors: this.contributors.map(user => this.colors[user.emailAddress]),
          height: 400
        }
      };
    }
  }
};
</script>

<style>
</style>
