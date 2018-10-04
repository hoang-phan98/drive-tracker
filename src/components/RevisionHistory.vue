<template>
  <div class="revisionTable">
    <b-table
      :items="helloworld.items"
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
      console.log(this.revisions);
      const items = [];

      for (var i = 0; i < this.revisions.length; i++) {
        var builder = {
          "Revision ID": this.revisions[i].id,
          "Modified Time": this.revisions[i].modifiedTime,
          "Last Modifying User": this.revisions[i].lastModifyingUser.displayName
        };
        items.push(builder);
      }
      return {
        fields: ["Revision ID", "Modified Time", "Last Modifying User"],
        items: items
      };
    }
  }
};
</script>

<style>
</style>
