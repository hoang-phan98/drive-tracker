<template>
    <div>
        <b-dropdown id="time-dropdown" text="Time" class="m-2">
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
  name: "TimeDropdown"
};
</script>
