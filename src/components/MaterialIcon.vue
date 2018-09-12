<template>
  <i :class="['material-icons', size]">{{ icon }}</i>
</template>

<script>
/**
 * A component for Material Icons
 *
 * The `icon` prop must be one of the ones listed in
 * https://material.io/tools/icons/?style=baseline
 *
 * Assumes that the tag
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 * is in the document
 */

export default {
  props: {
    icon: String,
    size: String
  }
};
</script>

<style scoped>
.large {
  font-size: 48px;
}
</style>
