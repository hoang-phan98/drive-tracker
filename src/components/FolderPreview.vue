<template>
  <div class="folder-preview-layout" v-if="rendered">
    <div class="content-outer">
      <div class="content">
        <section>
          <h3>
            <MaterialIcon icon="folder" />
            {{ folder.name }}
          </h3>
        </section>
        <section class="users">
          <h4>
            Contributors
          </h4>
          <ul class="user-list">
            <li v-for="user of users" :key="user.emailAddress" class="user-list-item">
              <i class="user-list-indicator" :style="{ backgroundColor: colors[user.emailAddress] }"></i>
              {{ user.displayName }}
            </li>
          </ul>
        </section>

        <section>
          <PieChart
            :files="Object.values(folder.files)"
            :contributors="Object.values(folder.contributors)"
            :colors="colors"
            :height="400" />
        </section>
      </div>
    </div>
    <div class="bottom-bar">
      <b-button
        variant="outline-primary"
        :to="'/folder/' + this.id"
        >
      More Details
      </b-button>
    </div>
  </div>
  <LoadingScreen v-else />
</template>

<script>
import MaterialIcon from "./MaterialIcon.vue";
import PieChart from "./PieChart.vue";
import Colours from "../views/ColourGeneration.vue";
import LoadingScreen from "../components/LoadingScreen.vue";

export default {
  components: { MaterialIcon, PieChart, LoadingScreen },
  inject: ["contributions"],
  props: {
    id: String
  },
  data() {
    return {
      // error: null
      folder: null,
      rendered: false
    };
  },
  async mounted() {
    try {
      await this.fetch();
    } finally {
      this.$nextTick(function() {
        this.rendered = true;
      });
    }
  },
  watch: {
    async id() {
      try {
        this.rendered = false;
        await this.fetch();
      } finally {
        this.$nextTick(function() {
          this.rendered = true;
        });
      }
    }
  },
  methods: {
    async fetch() {
      try {
        this.folder = await this.contributions.fetchFolderContributionData(
          this.id
        );
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    }
  },
  computed: {
    users() {
      return this.folder && this.folder.contributors;
    },
    colors() {
      const colors = Colours.generateColours(this.users.length);
      const result = {};
      Object.values(this.folder.contributors).forEach((user, i) => {
        result[user.emailAddress] = colors[i];
      });
      return result;
    }
  }
};
</script>

<style scoped>
.folder-preview-layout {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  max-height: calc(100vh - 3rem);
  overflow-y: hidden;
}

.bottom-bar {
  /* position: absolute; */
  padding: 0.5rem;
  /* bottom: 0;
  left: 0;
  right: 0; */
  text-align: right;
  box-shadow: 0 -2px 2px 1px hsla(0, 0%, 50%, 0.1),
    0 -2px 10px 5px hsla(0, 0%, 50%, 0.1);
}

.content-outer {
  overflow-y: auto;
  overflow-x: hidden;
}

.content {
  padding: 4rem 1rem;
}

h3 {
  font-size: 1.5rem;
  margin: 0;
  display: inline-flex;
  align-items: center;
}

h4 {
  font-size: 1rem;
}

section {
  margin-bottom: 1rem;
}

.users {
  max-height: 12rem;
  overflow-y: auto;
}

.user-list {
  margin: 0;
  padding-left: 0.5rem;
  list-style: none;
  line-height: 1.5;
}

.user-list-item {
}

.user-list-indicator {
  display: inline-block;
  height: 10px;
  width: 10px;
}
</style>
