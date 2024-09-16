<template>
  <div class="stars">
    <span class="s"></span>
    <span class="s"></span>
    <span class="s"></span>
    <span class="s"></span>
    <span class="s"></span>
    <span class="m"></span>
    <span class="m"></span>
    <span class="m"></span>
    <span class="m"></span>
    <span class="m"></span>
    <span class="l"></span>
    <span class="l"></span>
    <span class="l"></span>
    <span class="l"></span>
    <span class="l"></span>
  </div>
</template>
<style lang="scss">
.stars {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.stars span {
  position: relative;
}

.stars span:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;

  transform: scale(0.2);
}

.stars span.s:before {
  box-shadow: 20px 20px #ffffff;
}

.stars span.m:before {
  box-shadow:
    20px 10px #fff176,
    10px 20px #fff176,
    20px 20px #ffffff,
    30px 20px #fff176,
    20px 30px #fff176;
}

.stars span.l:before {
  box-shadow:
    20px 0px #fdd835,
    20px 10px #fff176,
    0px 20px #fdd835,
    10px 20px #fff176,
    20px 20px #ffffff,
    30px 20px #fff176,
    40px 20px #fdd835,
    20px 30px #fff176,
    20px 40px #fdd835;
}

.stars span:nth-child(1) {
  left: 10%;
  top: 10%;
  animation: star-anim 8s 0s infinite;
}
.stars span:nth-child(2) {
  left: 80%;
  top: 20%;
  animation: star-anim 6s 1s infinite;
}
.stars span:nth-child(3) {
  left: 60%;
  top: 40%;
  animation: star-anim 5s 2s infinite;
}
.stars span:nth-child(4) {
  left: 20%;
  top: 70%;
  animation: star-anim 7s 3s infinite;
}
.stars span:nth-child(5) {
  left: 80%;
  top: 80%;
  animation: star-anim 7s 4s infinite;
}

.stars span:nth-child(6) {
  left: 40%;
  top: 10%;
  animation: star-anim 4s 0s infinite;
}
.stars span:nth-child(7) {
  left: 10%;
  top: 50%;
  animation: star-anim 7s 1s infinite;
}
.stars span:nth-child(8) {
  left: 50%;
  top: 50%;
  animation: star-anim 8s 2s infinite;
}
.stars span:nth-child(9) {
  left: 90%;
  top: 90%;
  animation: star-anim 5s 3s infinite;
}
.stars span:nth-child(10) {
  left: 80%;
  top: 50%;
  animation: star-anim 7s 4s infinite;
}

.stars span:nth-child(11) {
  left: 90%;
  top: 10%;
  animation: star-anim 5s 0s infinite;
}
.stars span:nth-child(12) {
  left: 10%;
  top: 80%;
  animation: star-anim 6s 1s infinite;
}
.stars span:nth-child(13) {
  left: 30%;
  top: 20%;
  animation: star-anim 7s 2s infinite;
}
.stars span:nth-child(14) {
  left: 60%;
  top: 90%;
  animation: star-anim 8s 3s infinite;
}
.stars span:nth-child(15) {
  left: 80%;
  top: 50%;
  animation: star-anim 7s 4s infinite;
}

@keyframes star-anim {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  55% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
