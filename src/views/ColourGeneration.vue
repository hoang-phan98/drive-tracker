<template>
<div></div>
</template>

<script>
//import Vue from "vue";
//import googleapis from "../googleapis";

export default {
  name: "Colours",
  defaultColours: [
    "#5680E9",
    "#84CEEB",
    "#5AB9EA",
    "#C1C8E4",
    "#8860D0",
    "#E7E3D4",
    "#F78888",
    "#9E5A63",
    "#97AABD",
    "#BC2231",
    "#D76E2F",
    "#D5EBA9",
    "#E4C865"
  ],
  data() {
    return {
      // this.defaultColours doesn't work on this?
      //colourList: [],
      defaultColours: [
        "#FF0000",
        "#FF8C00"
        // "#FFFFE0",
        // "90EE90",
        // "#AFEEEE",
        // "#00BFFF",
        // "#6A5ACD",
        // "#8A2BE2",
        // "#FF69B4"
      ]
    };
  },
  //  methods: {
  generateColours(numUsers) {
    //console.log(this.defaultColours);
    let colourList = this.defaultColours;
    if (numUsers <= colourList.length) {
      return colourList;
    }
    let n = numUsers - colourList.length; // number of colours we have to generate at random
    while (n > 0) {
      let col = this.randomColour();
      while (colourList.includes(col)) {
        col = this.randomColour();
      }
      n--;
      colourList.push(col);
    }
    return colourList;
  },
  randomColour() {
    let col = "#";
    let chars = "0123456789ABCDE";
    for (let i = 0; i < 6; i++) {
      col += chars[Math.floor(Math.random() * 15)];
    }
    return col;
  }
  //  }
};
</script>

<style scoped>
</style>
