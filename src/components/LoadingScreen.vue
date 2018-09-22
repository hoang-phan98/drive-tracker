<template>
  <div class="LoadingScreen">
    <img src="../assets/cactus.gif">
    <progress-wrapper>
      <progress-bar :value="50" striped animated />
    </progress-wrapper>
  </div>
</template>
