<template>
  <div>
    <!-- toggle buttons used to filter adds/edits/delelets data (or combinations of them) on graphs -->
    <b-button-group>
      <b-button v-for="btn in buttons" :pressed.sync="btn.state" :variant="btn.variant" :key="btn.variant">
        {{ btn.caption }}
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "ToggleGroup",
  data() {
    return {
      myToggle: false,
      buttons: [
        { variant: "outline-primary", caption: "Adds", state: true },
        { variant: "outline-primary", caption: "Edits", state: false }
      ]
    };
  },
  computed: {
    btnStates() {
      return this.buttons.map(btn => btn.state);
    }
  }
};
</script>
