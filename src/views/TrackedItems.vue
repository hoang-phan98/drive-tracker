<template>
  <div class="layout">
    <div class="content-container">
      <div class="content">
        <div class="header-section">
          <h3 class="header">Tracked Items</h3>
        </div>
        <b-alert :show="!!error" variant="danger" dismissible @dismissed="error = null">
          {{ error }}
        </b-alert>
        <b-table
          :items="items"
          :fields="fields"
          hover
          >
          <template slot="mimeType" slot-scope="data">
            <div v-if="data.value=='application/vnd.google-apps.folder'">
              <MaterialIcon icon="folder" />
            </div>
            <div v-if="data.value!='application/vnd.google-apps.folder'">
              <MaterialIcon icon="insert_drive_file" />
            </div>
          </template>

          <template slot="id" slot-scope="data">
            <div class="actions">
              <b-button 
                class="mr-2"
                variant="outline-primary" 
                size="sm" 
                :pressed="False" 
                v-if="data.item.mimeType=='application/vnd.google-apps.folder'"
                @click="preview(data.item)">
                Show Preview
              </b-button>
              <b-button variant="outline-primary" size="sm" :to="'/folder/' + data.value">
                More Details
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="fab-container">
      <button class="fab" @click="addItemModal = true">
        <span class="fab-text">Add folder</span>
        <i class="material-icons fab-icon">
          create_new_folder
        </i>
        <i class="material-icons fab-icon fab-icon--shadow" aria-hidden="true">
          create_new_folder
        </i>
      </button>
    </div>
    <GooglePicker :open="addItemModal" @close="addItemModal = false" @picked="addItem($event)" />
  </div>
</template>

<script>
import * as a from "awaiting";
import googleapis from "../googleapis";
import GooglePicker from "../components/GooglePicker.vue";
import MaterialIcon from "@/components/MaterialIcon.vue";

export default {
  components: { GooglePicker, MaterialIcon },
  inject: ["contributions", "storage"],
  data() {
    return {
      addItemModal: false,
      items: [],
      fields: [
        {
          label: "",
          key: "mimeType"
        },
        {
          label: "Name",
          key: "name"
        },
        {
          label: "Owners",
          key: "owners",
          formatter: item => item.map(user => user.displayName).join(", ")
        },
        {
          label: "Last Modified By",
          key: "lastModifyingUser.displayName"
        },
        {
          label: "",
          key: "id"
        }
      ],
      error: null
    };
  },
  mounted() {
    // Load tracked items
    this.storage.load();

    // If this is the user's first login, they won't have a trackedItems entry
    // in their persistent storage
    let { trackedItems } = this.storage.get();
    if (!trackedItems) {
      trackedItems = [];
      this.storage.update({ trackedItems });
    }

    // Load tracked items into the component
    this.items = trackedItems;

    // The details of the folders might have changed since they were saved to
    // storage, refetch them all
    a.map(this.items, 6, async folder => {
      try {
        const newItem = await this.fetchItem(folder.id);

        // Replace the old folder record with the new one
        this.items.splice(
          this.items.findIndex(f => f.id === folder.id),
          1,
          newItem
        );
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      }
    });
  },
  methods: {
    async addItem({ id, name }) {
      if (this.items.find(folder => folder.id === id)) {
        return;
      }

      try {
        const item = await this.fetchItem(id);
        this.items.push(item);
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
        this.error = `There was a problem fetching the item "${name}".`;
      }
    },
    async fetchItem(id) {
      const { result: item } = await googleapis.client.drive.files.get({
        fileId: id,
        fields:
          "id, name, kind, mimeType, owners(displayName), lastModifyingUser(displayName)"
      });
      return item;
    },
    preview(item) {
      this.$emit(
        "preview-folder",
        item.mimeType === "application/vnd.google-apps.folder" ? item.id : null
      );
    }
  },
  computed: {
    links() {
      const result = {};
      for (const item of this.items) {
        const prefix =
          item.mimeType === "application/vnd.google-apps.folder"
            ? "/folder"
            : "/file";

        result[item.id] = prefix + "/" + item.id;
      }
      return result;
    }
  },
  watch: {
    items() {
      // Every time we change the folders, make sure it's persisted to storage
      this.storage.update({ trackedItems: this.items });
    }
  }
};
</script>

<style scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.content {
  padding: 4rem 1rem;
}

.header-section {
  height: 4rem;
  display: flex;
  align-items: center;
}

.header {
  font-size: 1.5rem;
  margin: 0;
}

.fab-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.fab {
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

.fab-text {
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
}

.fab-icon {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  color: #eecf00;
  font-size: 48px;
}

.fab:active .fab-icon {
  transform: translateY(3%);
}

.fab-icon.fab-icon--shadow.fab-icon--shadow {
  z-index: 1;
  transform: translateY(5%);
  color: rgba(0, 0, 0, 0.2);
}

.actions {
  text-align: right;
}
</style>
