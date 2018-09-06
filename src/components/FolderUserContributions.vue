<template>
  <div>
    <pre v-if="error" class="error">
      {{ error }}
    </pre>
      <b-card no-body v-if="data">
        <b-tabs card>
          <b-tab title="Contribution Data">
            <div v-for="file of data" :key="file.id">
              <h3>{{ file.name }} [{{ file.id }}]</h3>
              <b-table :items="file.contributions">
                <template slot="type" slot-scope="row">
                  <pre>{{ row.item.type | stringify }}</pre>
                </template>
                <template slot="user" slot-scope="row">
                  <pre>{{ row.item.user | stringify }}</pre>
                </template>
                <template slot="revision" slot-scope="row">
                  <pre>{{ row.item.revision | stringify}}</pre>
                </template>
                <template slot="time" slot-scope="row">
                  <pre>{{ row.item.time | stringify }}</pre>
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Raw">
            <pre>
              {{ data | stringify }}
            </pre>
          </b-tab> 
        </b-tabs>
      </b-card>
  </div>
</template>

<script>
/**
 * This component houses the logic for obtaining contribution data for a folder.
 * We'll probably have to move the code somewhere else so the data can actually
 * be presented.
 */
import gapi from "../googleapis";
import * as a from "awaiting";

export default {
  props: {
    id: String
  },
  data() {
    return {
      folder: null,
      error: null,
      data: null
    };
  },
  async mounted() {
    try {
      // Verify the folder actually exists
      const res1 = await gapi.client.drive.files.get({
        fileId: this.id,
        fields: ["id", "name", "mimeType"].join(", ")
      });

      if (res1.result.mimeType !== "application/vnd.google-apps.folder") {
        throw new Error(
          "Specified resouce " + this.id + " is not a Google Drive folder."
        );
      }

      // Get files within folder
      // TODO handle when there are over 100 files
      const res2 = await gapi.client.drive.files.list({
        q: `'${this.id}' in parents`,
        pageSize: 100,
        fields: [
          "nextPageToken",
          `files(${[
            "kind",
            "id",
            "name",
            "mimeType",
            "trashed",
            "explicitlyTrashed",
            "trashedTime",
            "createdTime",
            `trashingUser(${["kind", "displayName", "emailAddress"].join(
              ", "
            )})`,
            "headRevisionId"
          ].join(", ")})`
        ].join(", ")
      });

      const files = await a.map(
        // Filter out subfolders
        res2.result.files.filter(file => {
          return file.mimeType !== "application/vnd.google-apps.folder";
        }),
        4,
        async file => {
          // Fetch revisions for each file
          // TODO handle when there are over 200 revisions
          const res3 = await gapi.client.drive.revisions.list({
            fileId: file.id,
            pageSize: 200,
            fields: [
              "nextPageToken",
              `revisions(${[
                "kind",
                "mimeType",
                "modifiedTime",
                "id",
                `lastModifyingUser(${[
                  "kind",
                  "displayName",
                  "emailAddress"
                ].join(", ")})`
              ].join(", ")})`
            ].join(", ")
          });
          return Object.assign(file, { revisions: res3.result.revisions });
        }
      );

      // Process data into contribution data
      const data = files.map(file => {
        const contributions = [];
        for (const [i, revision] of file.revisions.entries()) {
          const creation = i === 0;
          contributions.push({
            type: creation ? "CREATE" : "EDIT",
            user: revision.lastModifyingUser,
            revision: revision,
            time: creation ? file.createdTime : revision.modifiedTime
          });
        }

        /**
         * I've disabled tracking deletions because:
         * If you delete a file in a shared folder it just hides the file from you
         * but it still exists for others...
         */
        // if (file.explicitlyTrashed) {
        //   contributions.push({
        //     type: "DELETE",
        //     // For some reason file.trashingUser is never populated
        //     user: file.trashingUser || null,
        //     revision: null,
        //     time: file.trashedTime
        //   });
        // }

        return Object.assign(file, {
          contributions
        });
      });

      this.data = data;
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
      this.error = err.message;
    }
  },
  filters: {
    stringify: s => JSON.stringify(s, null, 2)
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
