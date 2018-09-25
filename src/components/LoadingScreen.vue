<template>
  <div class="LoadingScreen">
    <img src="../assets/cactus.gif" class="Cactus">'
    <progress-wrapper class="Loading" height="30">
        <progress-bar :value="100" striped animated> <strong>Loading...</strong> </progress-bar>
    </progress-wrapper>
  </div>
</template>

<script>
import { Container, Row, Column, ProgressWrapper, ProgressBar } from "mdbvue";

export default {
  name: "ProgressBarsProPage",
  components: {
    Container,
    Row,
    Column,
    ProgressWrapper,
    ProgressBar
  }
};
</script>

<style>
.LoadingScreen {
  height: 100%;
  width: 100%;
  background-color: white;
}

.Cactus {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2%;
  width: 35%;
}

.Loading {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  height: 1000;
  position: element(#Target);
  transform: translateY(-700%);
}
</style>
