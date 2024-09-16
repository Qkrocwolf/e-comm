<template>
  <footer>
    <div class="footer">
      <div class="grass"></div>
      <div class="monkey"></div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.monkey {
  height: 400px;
  width: 300px;
  position: absolute;
  top: -10%;
  left: 90%;
  background: url(../public/gifs/monkey.gif) no-repeat;
  transform: scale(0.5);
  animation: monkey 10s linear infinite;
  z-index: 1;
}
.footer {
  position: relative;
  background: url(../public/picture/footerBg.jpeg);
  background-position-y: 90%;
}
.grass {
  position: absolute;
  bottom: -30%;
  width: 100vw;
  height: 300px;
  background: url(../public/picture/grass.png) repeat;
  background-position-y: 90%;
  transform: scaleY(0.4);
  z-index: 2;
}

@keyframes monkey {
  0% {
    transform: translatex(0px) scale(0.5);
  }

  100% {
    transform: translatex(-2000px) scale(0.5);
  }
}
</style>
