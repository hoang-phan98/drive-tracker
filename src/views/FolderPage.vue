<template>
  <div class="folderpage">
    <div class="grid-container">
      <div class="users">
        users go here
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
</script>

<style>
.grid-container {
  display: grid;
  grid-gap: 15px 15px;
}

.users {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.pichart {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.histogram {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
.filecontribution {
  background: rgba(256, 256, 256, 1); /*can be anything, of course*/
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: center;
  padding: 50px;
  box-shadow: 0px 0px 46px -5px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
}
</style>
