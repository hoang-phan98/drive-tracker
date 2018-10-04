<template>
    <div>
        <img class="calendarIcon" src="../assets/calendar.png" />
        <div class="timeDropdown">
          <b-form-select
            class="timeDropdown" 
            v-model="selectedDate"
            :options="options"
            @input="click"
            >
          </b-form-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimeDropdown",
  data() {
    return {
      selectedDate: "e",
      options: [
        { value: "a", text: "Day" },
        { value: "b", text: "Week" },
        { value: "c", text: "Month" },
        { value: "d", text: "Year" },
        { value: "e", text: "All Time" }
      ]
    };
  },
  methods: {
    click: function() {}
  }
};
</script>

<style>
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
