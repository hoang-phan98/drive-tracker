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
      const labels = ["Contributor"];
      for (var z = 0; z < this.contributors.length; z++) {
        labels.push(this.contributors[z].displayName);
      }
      lineData.push(labels);

      // Initialise the value array (for each row) to be [null, 0, 0,0 ...]
      // Null will be the field for the date, initialised as null
      var values = []; //stores the actual row to be appended lineData
      values.push(null);
      for (var y = 0; y < this.contributors.length; y++) {
        values.push(0);
      }

      // increments which file contained that revision and then pushes the row
      for (var i = 0; i < this.files.length; i++) {
        for (var j = 0; j < this.files[i].revisions.length; j++) {
          values[0] = this.files[i].revisions[j].modifiedTime;

          // Now to increment the revision for the corresponder contributor
          for (var h = 0; h < this.contributors.length; h++) {
            if (
              this.contributors[h].displayName ===
              this.files[i].revisions[j].lastModifyingUser.displayName
            ) {
              values[h+1] += 1;
            }
          }
          var duplicateObject = JSON.parse(JSON.stringify(values));
          lineData.push(duplicateObject);
        }
      }

      // If you want to see what the line data looks like uncomment below.
      // console.log(lineData);

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
