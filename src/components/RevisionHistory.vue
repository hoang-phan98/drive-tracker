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
      const items = [];

      for (var i = 0; i < this.revisions.length; i++) {
        //Retriving the date and formating it correctly
        var noon = "am";
        var date = new Date(this.revisions[i].modifiedTime).toDateString();
        var hour = new Date(this.revisions[i].modifiedTime).getHours();
        if (hour > 12) {
          hour -= 12;
          noon = "pm";
        }
        if (hour == 0) {
          hour = 12;
        }
        if (hour.toString().length == 1) {
          hour = "0" + hour;
        }
        var min = new Date(this.revisions[i].modifiedTime).getMinutes();
        if (min.toString().length == 1) {
          min = "0" + min;
        }

        var builder = {
          "Revision ID": this.revisions[i].id,
          "Modified Date": date,
          "Modified Time": hour + ":" + min + " " + noon,
          "Last Modifying User": this.revisions[i].lastModifyingUser.displayName
        };
        items.push(builder);
      }
      return {
        fields: [
          "Revision ID",
          "Modified Date",
          "Modified Time",
          "Last Modifying User"
        ],
        items: items
      };
    }
  }
};
</script>

<style>
</style>
