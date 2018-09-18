<template>
  <div class="contributiongrid">
    <div class="allcharts" >
      <GChart
        v-for="file in data"
        v-bind:key="file.id"
        type="BarChart"
        v-bind:data="file.data"
        :options="file.options"
      />
    </div>
    <div class="buttons">
      <button class="button" v-for="n in 10">
        hello
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  name: "ContributionBars",
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
            height: 100,
            legend: { position: "none" },
            bar: { groupWidth: "75%" },
            isStacked: true,
            hAxis: {
              minValue: 0,
              viewWindow: {
                max: file.contributions.length
              }
            },
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
.contributiongrid {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
}

.allcharts {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  /*text-align: center; */
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
}

.buttons {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  /*text-align: center; */
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  width: 100%;
  height: 100%;
}

.button {
  width: 100%;
}

</style>
