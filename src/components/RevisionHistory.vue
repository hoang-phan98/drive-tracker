<template>
  <div>
    <b-table
      :items="helloworld.options"
      :fields="helloworld.fields"
      striped hover
      >
    </b-table>
  </div>
</template>

<script>
export default {
  name: "RevisionHistory",
  props: {
    revisions: Array
  },
  computed: {
    helloworld() {
      return {
        fields: ["Revision", "Something1", "Something2"],
        options: [
          {
            Revision: true,
            age: 40,
            Something1: "Dickerson",
            Something2: "Macdonald"
          },
          {
            Revision: false,
            age: 21,
            Something1: "Larsen",
            Something2: "Shaw"
          },
          {
            Revision: false,
            age: 89,
            Something1: "Geneva",
            Something2: "Wilson"
          },
          { Revision: true, age: 38, Something1: "Jami", Something2: "Carney" }
        ]
      };
    }
  }
};
</script>

<style>
</style>
