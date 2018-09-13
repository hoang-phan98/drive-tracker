<template>
  <div>
    <pre v-if="error" class="error">
      {{ error | stringify }}
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
export default {
  props: {
    id: String
  },
  inject: ["contributions"],
  async mounted() {
    let folder;
    try {
      folder = await this.contributions.fetchFolderContributionData(this.id);
    } catch (err) {
      this.error = err;
    }

    if (folder) {
      this.data = [...folder.files.values()];
    }
  },
  data() {
    return {
      data: null,
      error: null
    };
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
