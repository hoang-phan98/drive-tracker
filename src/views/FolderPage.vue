<template>
  <div class="folderpage">
    <div class="grid-container">
      <div class="users">
        <GChart
          type="BarChart"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <div class="pichart">
        pi chart goes here
      </div>
      <div class="histogram">
        histogram goes here
      </div>
      <div class="filecontribution">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Day" active>
              File Contribution bar graph for day goes here
            </b-tab>
            <b-tab title="Week">
              File Contribution bar graph for week goes here
            </b-tab>
            <b-tab title="Month">
              File Contribution bar graph for month goes here
            </b-tab>
            <b-tab title="Year">
              File Contribution bar graph for year goes here
            </b-tab>
            <b-tab title="All Time">
              File Contribution bar graph for alltime goes here
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts';

Vue.use(VueGoogleCharts)

export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General', 'Western', 'Literature', { role: 'annotation' } ],
        ['Kenny', 10, 24, 20, 32, 18, 5, ''],
        ['Hoang', 16, 22, 23, 30, 16, 9, ''],
        ['Erica', 28, 19, 29, 30, 12, 13, ''],
        ['Dax', 16, 22, 23, 30, 16, 9, ''],
        ['Marc', 28, 19, 29, 30, 12, 13, '']
      ],
      chartOptions: {
        width: 1000,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
      }
    }
  }
}

</script>

<style>
.grid-container {
  display: grid;
  grid-gap: 15px 15px;
}

.users {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  padding: 0px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  padding: 0px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  padding: 80px;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  padding: 80px;
  grid-column: 1 / 3;
  grid-row: 4 / 5;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
</style>
