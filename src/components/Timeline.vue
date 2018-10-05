<template>
  <div>
    <div>
      <h2 class="title">Revision Timeline</h2>
      <h4 class="timeSpanLabel">{{startDate}} - {{endDate}}</h4>

    </div>
    <GChart
      type="LineChart"
      :data="helloworld.data"
      :options="helloworld.options"
    />
    <TimeDropdown v-model="selectedDateRange"></TimeDropdown>

  </div>
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import dateFormat from "dateformat";
import TimeDropdown from "./TimeDropdown.vue";

Vue.use(VueGoogleCharts);

export default {
  name: "Timeline",
  props: {
    files: Array,
    colors: Object,
    contributors: Array,
    dateRange: String
  },
  data() {
    return {
      selectedDateRange: "at",
      startDate: "",
      endDate: ""
    };
  },
  components: {
    TimeDropdown
  },
  watch: {},
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

      // get selected date range
      var dateRange = this.getDateRange(this.selectedDateRange);

      // Get all raw revisions
      var rawRevisions = this.getRawRevisions();

      // Count raw revisions of individual contributor and parse them as chart entries
      var entries = this.parseRevisionsToEntries(rawRevisions);

      // Filter etries by selected date range
      entries = this.filterEntriesByDate(entries, dateRange);

      // Add those entries to chart
      for (var e = 0; e < entries.length; e++) {
        lineData.push(entries[e]);
      }

      // If you want to see what the line data looks like uncomment below.
      //console.log(lineData);

      return {
        data: lineData,
        options: {
          legend: { position: "bottom" },
          interpolateNulls: true,
          colors: this.contributors.map(user => this.colors[user.emailAddress]),
          height: 400
        }
      };
    }
  },
  methods: {
    getDateRange: function(dateRangeValue) {
      var dateRange;
      switch (dateRangeValue) {
        case "d":
          dateRange = "Day";
          break;
        case "w":
          dateRange = "Week";
          break;
        case "m":
          dateRange = "Month";
          break;
        case "y":
          dateRange = "Year";
          break;
        case "at":
          dateRange = "All Time";
          break;
      }

      return dateRange;
    },
    getRawRevisions: function() {
      // Get all raw revisions first
      var rawRevisions = [];
      for (var f = 0; f < this.files.length; f++) {
        var file = this.files[f];

        for (var r = 0; r < file.revisions.length; r++) {
          var revision = file.revisions[r];
          rawRevisions.push(revision);
        }
      }

      // Sort all raw revisions by date
      rawRevisions.sort(function(a, b) {
        return new Date(a.modifiedTime) - new Date(b.modifiedTime);
      });

      return rawRevisions;
    },
    parseRevisionsToEntries: function(revisions) {
      var entries = [];

      // Initialise the value array (for each row) to be [null, 0, 0,0 ...]
      // Null will be the field for the date, initialised as null
      var values = []; //stores the actual row to be appended lineData
      values.push(null);
      for (var y = 0; y < this.contributors.length; y++) {
        values.push(0);
      }

      // If raw revisions are empty (no revision during the selected period), push empty data
      if (revisions.length == 0) {
        //TODO: refine
        entries.push([dateFormat(new Date()), 0, 0, 0, 0, 0, 0]);
      }

      // Count revisions of individual contributor and parse them as chart entry format
      for (var r = 0; r < revisions.length; r++) {
        for (var c = 0; c < this.contributors.length; c++) {
          if (
            this.contributors[c].displayName ===
            revisions[r].lastModifyingUser.displayName
          ) {
            var dateString = dateFormat(
              revisions[r].modifiedTime,
              "isoDateTime"
            );
            values[0] = dateString;
            values[c + 1] += 1;
          }
        }

        // Add those entries to chart
        var parse = JSON.parse(JSON.stringify(values));
        entries.push(parse);
      }

      return entries;
    },
    filterEntriesByDate(revisions, selectedDateRange) {
      // This method will expand revision entries to fill all dates
      var entries = this.getEmptyEntries(selectedDateRange);

      if (entries.length == 0)
        this.startDate = dateFormat(revisions[0][0], "dd/mm/yyyy");

      for (var e = 0; e < entries.length; e++) {
        // Copy entries across dates to keep integrity of the timeline (until new revision is found)
        if (e > 0) {
          for (var i = 1; i < entries[e].length; i++) {
            entries[e][i] = entries[e - 1][i];
          }
        }

        for (var r = 0; r < revisions.length; r++) {
          var revision = revisions[r];
          var revisionDate = this.trimDate(
            new Date(revision[0]),
            selectedDateRange
          );
          var dateString = dateFormat(revisionDate, "isoDateTime");

          if (dateString === entries[e][0]) {
            entries[e] = revision;
          }
        }
      }

      if (entries.length == 0) entries = revisions;

      // Format date lables
      for (var n = 0; n < entries.length; n++) {
        entries[n][0] = this.formatDates(entries[n][0], selectedDateRange);
      }
      return entries;
    },
    trimDate: function(date, selectedDateRange) {
      // Trim miliseconds, minutes etc so that different revisions on the same date won't be counted separately
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(0);

      switch (selectedDateRange) {
        case "Day":
          break;
        case "Week":
          date.setHours(0);
          break;
        case "Month":
          date.setHours(0);
          break;
        case "Year":
          date.setHours(0);
          date.setDate(1);
          break;
        case "All Time":
          date.setHours(0);
          break;
        default:
          break;
      }

      return date;
    },
    getEmptyEntries: function(selectedDateRange) {
      var emptyEntries = [];

      // Entry skeleton
      var singleEntry = [];
      singleEntry.push(null);
      for (var y = 0; y < this.contributors.length; y++) {
        singleEntry.push(0);
      }

      // Last date at which timeline ends
      var lastDate = new Date();
      lastDate = this.trimDate(lastDate, selectedDateRange);

      // First date at which timeline starts
      var firstDate = new Date(lastDate);

      var date;
      var dateString;
      switch (selectedDateRange) {
        case "Day":
          firstDate.setDate(firstDate.getDate() - 1); // 24 hours prior to current date

          // Push 24 entries (each represent an hour)
          for (var h = 0; h <= 24; h++) {
            date = new Date(firstDate).setHours(firstDate.getHours() + h);
            dateString = dateFormat(date, "isoDateTime");
            singleEntry[0] = dateString;
            emptyEntries.push(JSON.parse(JSON.stringify(singleEntry)));
          }
          break;

        case "Week":
          firstDate.setHours(0);
          firstDate.setDate(firstDate.getDate() - 7); // 7 days prior

          // Push 7 entries (each represent a day)
          for (var d = 0; d <= 7; d++) {
            date = new Date(firstDate).setDate(firstDate.getDate() + d);
            dateString = dateFormat(date, "isoDateTime");
            singleEntry[0] = dateString;
            emptyEntries.push(JSON.parse(JSON.stringify(singleEntry)));
          }
          break;

        case "Month":
          firstDate.setHours(0);
          firstDate.setMonth(lastDate.getMonth() - 1); // 1 month prior

          // Push 30 entries (each represent a day)
          for (var dm = 0; dm <= 30; dm++) {
            date = new Date(firstDate).setDate(firstDate.getDate() + dm);
            dateString = dateFormat(date, "isoDateTime");
            singleEntry[0] = dateString;
            emptyEntries.push(JSON.parse(JSON.stringify(singleEntry)));
          }

          break;

        case "Year":
          firstDate.setHours(0);
          firstDate.setDate(1);
          firstDate.setFullYear(lastDate.getFullYear() - 1); // 1 year prior

          // Push 12 entries (each represent a month)
          for (var m = 0; m <= 12; m++) {
            date = new Date(firstDate).setMonth(firstDate.getMonth() + m);
            dateString = dateFormat(date, "isoDateTime");
            singleEntry[0] = dateString;
            emptyEntries.push(JSON.parse(JSON.stringify(singleEntry)));
          }

          break;

        default:
          break;
      }
      this.startDate = dateFormat(firstDate, "dd/mm/yyyy");
      this.endDate = dateFormat(new Date(), "dd/mm/yyyy");
      return emptyEntries;
    },
    formatLabels: function(entries, selectedDateRange) {
      for (var i = 0; i < entries.length; i++) {
        switch (selectedDateRange) {
          case "Day":
            entries[i][0] = dateFormat(new Date(entries[i][0]), "HH:MM");
            break;
          case "Week":
            entries[i][0] = dateFormat(new Date(entries[i][0]), "dd/mm");
            break;
          case "Month":
            entries[i][0] = dateFormat(new Date(entries[i][0]), "dd/mm");
            break;
          case "Year":
            entries[i][0] = dateFormat(new Date(entries[i][0]), "mmm-yyyy");
            break;
          case "All Time":
            entries[i][0] = dateFormat(new Date(entries[i][0]), "dd/mm/yy");
            break;
          default:
            break;
        }
      }
    },
    formatDates: function(date, selectedDateRange) {
      var formatted;
      switch (selectedDateRange) {
        case "Day":
          formatted = dateFormat(date, "HH:MM");
          break;
        case "Week":
          formatted = dateFormat(date, "dd/mm");
          break;
        case "Month":
          formatted = dateFormat(date, "dd/mm");
          break;
        case "Year":
          formatted = dateFormat(date, "mmm-yyyy");
          break;
        case "All Time":
          formatted = dateFormat(date, "dd/mm/yy");
          break;
        default:
          formatted = date;
          break;
      }

      return formatted;
    }
  }
};
</script>

<style>
</style>
