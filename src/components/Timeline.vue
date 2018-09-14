<template>
  <div>
    <GChart
      v-for="file in data"
      v-bind:key="file.id"
      type="LineChart"
      v-bind:data="file.data"
      :options="file.options"
    />
  </div>
</template>
