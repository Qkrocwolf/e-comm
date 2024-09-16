<template>
  <div class="category-card">
    <div class="category-card__border">
      <img :src="background" class="category-card__bg" />
      <img :src="firstImg" class="category-card__first-img" />
      <img :src="secondImg" class="category-card__second-img" />
      <div class="category-card__desc">
        <h2>{{ title }}</h2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  background: String,
  title: String,
  firstImg: String,
  firstImgPositionTop: {
    type: String,
    default: '0',
    required: false,
  },
  firstImgPositionLeft: {
    type: String,
    default: '0',
    required: false,
  },

  firstImgHight: {
    type: String,
    default: '0',
  },
  firstImgWidth: {
    type: String,
    default: '0',
  },
  secondImg: {
    type: String,
    required: false,
  },
  secondImgPositionTop: {
    type: String,
    default: '0',
    required: false,
  },
  secondImgPositionLeft: {
    type: String,
    default: '0',
    required: false,
  },
  secondImgHight: {
    type: String,
    default: '0',
    required: false,
  },
  secondImgWidth: {
    type: String,
    default: '0',
    required: false,
  },
});
</script>
<style lang="scss">
.category-card {
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  border-image: url(../public/picture/categoryCard/woodTexture.png) repeat 200 /
    45px;
  outline: 6px solid black;
  border-width: 20px;
  border-style: solid;
  border-bottom: 40px solid;
  color: white;
  cursor: pointer;
  &:hover {
    color: $color-secondary;
  }
  &__desc {
    background-color: black;
    margin-top: -3px;
    padding: 12px 0;
    text-align: center;
    letter-spacing: 0.3rem;
  }
  &__border {
    height: 100%;
    overflow: hidden;
    border: 10px solid black;
    position: relative;
    border-radius: 8px;
  }
  &__first-img {
    position: absolute;
    top: v-bind('firstImgPositionTop');
    left: v-bind('firstImgPositionLeft');
    height: v-bind('firstImgHight');
    width: v-bind('firstImgWidth');
  }
  &__second-img {
    position: absolute;
    top: v-bind('secondImgPositionTop');
    left: v-bind('secondImgPositionLeft');
    height: v-bind('secondImgHight');
    width: v-bind('secondImgWidth');
  }
  &__bg {
    max-width: 100%;
    height: 90%;
    object-fit: fill;
    transform: scale(1.01);
    filter: blur(0.3px);
  }
}
</style>
