<template>
  <div>
    <div class=tint></div>
    <div class=background></div>
  </div>
</template>

<style>
.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -2;
  opacity: 0.1;
  background-size: 300px;
  background-repeat: repeat;
  background-image: url(../assets/background.jpg);
}

.tint {
  z-index: -1;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: auto;
  top: 0px;
  left: 0px;
  background: rgba(184, 184, 184, 0.2); /*can be anything, of course*/
}
</style>
