<template>
    <div>
        <img class="calendarIcon" src="../assets/calendar.png" />
        <b-dropdown id="timeDropdown" v-bind:text="selectedDate" variant="outline-secondary" class="m-2">
            <b-dropdown-item-button>Day</b-dropdown-item-button>
            <b-dropdown-item-button>Week</b-dropdown-item-button>
            <b-dropdown-item-button>Month</b-dropdown-item-button>
            <b-dropdown-item-button>Year</b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button>All Time</b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>

<script>
export default {
  name: "TimeDropdown",
  data() {
    return {
      selectedDate: "All Time"
    };
  }
};
</script>

<style>
.calendarIcon {
  display: inline;
  width: 50px;
  height: 50px;
}

.timeDropdown {
  margin-left: 5px;
  display: inline;
}
</style>
