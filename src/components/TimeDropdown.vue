<template>
    <div class="container">
        <img class="calendarIcon" src="../assets/calendar.png" />
        <div class="timeDropdown">
          <b-form-select
            class="timeDropdown" 
            :value="value"
            :options="options"
            @input="click($event)"
            >
          </b-form-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimeDropdown",
  props: {
    value: String
  },
  data() {
    return {
      options: [
        { value: "d", text: "Day" },
        { value: "w", text: "Week" },
        { value: "m", text: "Month" },
        { value: "y", text: "Year" },
        { value: "at", text: "All Time" }
      ]
    };
  },
  methods: {
    click: function(e) {
      this.$emit("input", e);
    }
  }
};
</script>

<style>
.container {
  margin-top: 15px;
}

.calendarIcon {
  display: inline-flex;
  width: 50px;
  height: 50px;
}

.timeDropdown {
  margin: 3px;
  display: inline-flex;
}
</style>
