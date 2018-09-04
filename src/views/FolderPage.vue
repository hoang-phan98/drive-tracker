<template>
  <div class="folderpage">
    <div class="grid-container">
      <div class="users">
        <GChart
          type="BarChart"
          :data="userData"
          :options="userOptions"
        />
      </div>
      <div class="pichart">
        <GChart
          type="PieChart"
          :data="pieData"
          :options="pieOptions"
        />
      </div>
      </div>
      <div class="histogram">
        <GChart
          type="ColumnChart"
          :data="histogramData"
          :options="histogramOptions"
        />
      </div>
      <div class="filecontribution">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Day" active>
              <GChart
                type="BarChart"
                :data="barData"
                :options="barOptions"
              />
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
      userData: [
        ['Contributers', 'Colour', { role: 'style' } ],
        ['Kenny', 10, '#FF0000'],
        ['Hoang', 16, '#00FF00	'],
        ['Erica', 28, '#0000FF	'],
        ['Dax', 16, '#FFFF00	'],
        ['Marc', 28, '#808080']
      ],
      userOptions: {
        width: 600,
        height: 500,
        title: 'Contributers',
        legend: 'none',
        bar: { groupWidth: '75%' },
        isStacked: 'percent',
      },
      pieData: [
        ['Task', 'Hours per Day'],
        ['Kenny',     11],
        ['Hoang',      2],
        ['Erica',  2],
        ['Dax', 2],
        ['Marc',    7]
      ],
      pieOptions: {
        width: 600,
        height: 600,
        title: 'All Time Contribution',
        pieHole: 0.4,
        legend: 'none'
      },
      histogramData: [
        ['Contributers', 'Add Files', 'Delete Files', 'File Revisions', { role: 'annotation' } ],
        ['01/01/2018', 10, 24, 20, ''],
        ['02/01/2018', 16, 22, 23, ''],
        ['03/01/2018', 28, 19, 29, ''],
        ['04/01/2018', 16, 22, 23, ''],
        ['05/01/2018', 28, 19, 29, ''],
        ['06/01/2018', 10, 24, 20, ''],
        ['07/01/2018', 16, 22, 23, ''],
        ['08/01/2018', 28, 19, 29, ''],
        ['09/01/2018', 16, 22, 23, ''],
        ['10/01/2018', 10, 24, 20, ''],
        ['11/01/2018', 16, 22, 23, ''],
        ['12/01/2018', 28, 19, 29, ''],
        ['13/01/2018', 16, 22, 23, ''],
      ],
      histogramOptions: {
        width: 1700,
        height: 500,
        title: 'File contrution over time',
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
      },
      barData: [
        ['Contributers', 'Add Files', 'Delete Files', 'File Revisions', { role: 'annotation' } ],
        ['Kenny', 10, 24, 20, ''],
        ['Hoang', 16, 22, 23, ''],
        ['Erica', 28, 19, 29, ''],
        ['Dax', 16, 22, 23, ''],
        ['Marc', 28, 19, 29, '']
      ],
      barOptions: {
        width: 1700,
        height: 500,
        title: 'User contributions',
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
      },
    }
  }
}

</script>

<style>
.grid-container {
  display: grid;
  grid-gap: 30000px 30px;

}

.users {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}

.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  margin: auto;
  padding: 10px;
  grid-column: 1 / 3;
  grid-row: 4 / 5;
  text-align: center;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
</style>