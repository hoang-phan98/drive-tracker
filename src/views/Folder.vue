<template>
  <div>
    <h1>Folder {{ id }}</h1>
    <FolderUserContributions :id="id" />
    <FileNameUser :id="id" />
  </div>
</template>

<script>
import FileNameUser from "@/components/FileNameUser.vue";
import FolderUserContributions from "../components/FolderUserContributions.vue";

export default {
  components: { FileNameUser, FolderUserContributions },
  props: {
    id: String
  }
};
</script>

<style scoped>
</style>
