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
      var seen = [];
      var values = [];
      for (var i = 0; i < this.files.length; i++) {
        for (var j = 0; j < this.files[i].revisions.length; j++) {
          if (seen.includes(this.files[i].revisions[j].modifiedTime)) {
            // increment the amount of revisions
            values[i + 1] += 1;
          } else {
            // If the date is not the one in values, push the array and start again
            if (values.length > 0) {
              lineData.push(values);
            }

            // Update the seen Array
            seen.push(this.files[i].revisions[j].modifiesTime);

            // starting the values array again
            values = [];
            values.push(this.files[i].revisions[j].modifiedTime);
            // reset the values array to empty state ready to count
            for (var k = 0; k < this.files.length; k++) {
              values.push(0);
            }
            // increment the amount of revisions
            values[i + 1] += 1;
          }

          // very last revision being counted - push it
          if (i == this.files.length - 1) {
            if (values.length > 0) {
              lineData.push(values);
            }
          }
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
          colors: this.contributors.map(user => this.colors[user.emailAddress])
        }
      };
    }
  }
};
</script>

<style>
</style>
