<template>
  <div>
    <div>
      <h2 class="title">Revision Timeline</h2>
      <h4 class="timeSpan">1/1/2018 - 31/12/2018</h4>

    </div>
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
import dateFormat from "dateformat";

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

      /*// increments which file contained that revision and then pushes the row
      for (var i = 0; i < this.files.length; i++) {
        for (var j = 0; j < this.files[i].revisions.length; j++) {
          var dateString = this.files[i].revisions[j].modifiedTime;
          //values[0] = dateFormat(dateString, "dd/mm");
          values[0] = dateString;
          console.log(typeof(dateString));
          // Now to increment the revision for the corresponder contributor
          for (var h = 0; h < this.contributors.length; h++) {
            if (
              this.contributors[h].displayName ===
              this.files[i].revisions[j].lastModifyingUser.displayName
            ) {
              values[h + 1] += 1;
            }
          }
          var duplicateObject = JSON.parse(JSON.stringify(values));
          lineData.push(values);
        }
      }*/

      // Get all revisions first
      var totalRevisions = [];
      for (var f = 0; f < this.files.length; f++) {
        var file = this.files[f];

        for (var r = 0; r < file.revisions.length; r++) {
          var revision = file.revisions[r];
          totalRevisions.push(revision);
        }
      }

      // Sort all revisions by date
      totalRevisions.sort(function(a, b) {
        return new Date(a.modifiedTime) - new Date(b.modifiedTime);
      });

      // Increment revision count to corresponding user
      for (var tr = 0; tr < totalRevisions.length; tr++) {
        for (var c = 0; c < this.contributors.length; c++) {
          if (
            this.contributors[c].displayName ===
            totalRevisions[tr].lastModifyingUser.displayName
          ) {
            var dateString = dateFormat(
              totalRevisions[tr].modifiedTime,
              "dd/mm"
            );
            values[0] = dateString;
            values[c + 1] += 1;
          }
        }

        // Add entry of that date to chart
        var parse = JSON.parse(JSON.stringify(values));
        lineData.push(parse);
      }

      // If you want to see what the line data looks like uncomment below.
      //console.log(lineData);

      return {
        data: lineData,
        options: {
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
