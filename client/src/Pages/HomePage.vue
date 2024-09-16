<template>
  <div
    class="page-wrapper"
    @mousemove="
      parallax(
        '.category-card',
        '.category-card__first-img',
        '.category-card__second-img',
        { translateX: 15, translateY: 30 },
        { translateX: 15, translateY: 30 },
        $event,
      )
    "
  >
    <div class="container">
      <div class="container__categories">
        <CategoryButton
          v-for="(category, index) in categoryCards"
          :key="index"
          class="container__category-card"
          :title="category.title"
          :background="category.background"
          :first-img="category.firstImg"
          :first-img-hight="category.firstImgHight"
          :first-img-width="category.firstImgWidth"
          :first-img-position-left="category.firstImgPositionLeft"
          :first-img-position-top="category.firstImgPositionTop"
          :second-img="category.secondImg"
          :second-img-width="category.secondImgWidth"
          :second-img-hight="category.secondImgHight"
          :second-img-position-top="category.secondImgPositionTop"
          :second-img-position-left="category.secondImgPositionLeft"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryButton from '../components/CategoryCard.vue';
import { parallax } from '@/composables/parallax';
import { CategoryCards } from '@/types/component.types';
import * as cardImg from '../public/picture/categoryCard';

const categoryCards: Array<CategoryCards> = [
  {
    title: 'MMORPG',
    background: cardImg.mmorpgBg,
    firstImg: cardImg.mmorpgFirstImg,
    firstImgHight: '90%',
    firstImgWidth: '120%',
    firstImgPositionLeft: '-10%',
    secondImg: cardImg.mmorpgSecondImg,
    secondImgHight: '100%',
    secondImgWidth: '120%',
    secondImgPositionLeft: '-5%',
    secondImgPositionTop: '-5%',
  },
  {
    title: 'Shooter',
    background: cardImg.shooterBg,
    firstImg: cardImg.shooterFirstImg,
    firstImgHight: '40%',
    firstImgWidth: '40%',
    firstImgPositionLeft: '50%',
    firstImgPositionTop: '30%',
    secondImg: cardImg.shooterSecondImg,
    secondImgHight: '25%',
    secondImgWidth: '25%',
    secondImgPositionLeft: '20%',
    secondImgPositionTop: '35%',
  },
  {
    title: 'Racing',
    background: cardImg.racingBg,
    firstImg: cardImg.racingFirstImg,
    firstImgHight: '30%',
    firstImgWidth: '45%',
    firstImgPositionLeft: '40%',
    firstImgPositionTop: '60%',
  },
  {
    title: 'Sci-Fi',
    background: cardImg.sciFiBg,
    firstImg: cardImg.sciFiFirstImg,
    firstImgHight: '35%',
    firstImgWidth: '35%',
    firstImgPositionTop: '30%',
    firstImgPositionLeft: '15%',
    secondImg: cardImg.sciFiSecondImg,
    secondImgHight: '50%',
    secondImgWidth: '50%',
    secondImgPositionLeft: '40%',
    secondImgPositionTop: '10%',
  },
  {
    title: 'Fighting',
    background: cardImg.fightingBg,
    firstImg: cardImg.fightingFirstImg,
    firstImgHight: '100%',
    firstImgWidth: '150%',
    firstImgPositionTop: '10%',
    firstImgPositionLeft: '-30%',
    secondImg: cardImg.fightingSecondImg,
    secondImgHight: '30%',
    secondImgWidth: '25%',
    secondImgPositionTop: '50%',
    secondImgPositionLeft: '50%',
  },
  {
    title: 'Strategy',
    background: cardImg.strategyBg,
    firstImg: cardImg.strategyFirstImg,
    firstImgHight: '50%',
    firstImgWidth: '50%',
    firstImgPositionLeft: '30%',
    firstImgPositionTop: '30%',
  },
];
</script>
<style lang="scss">
.container {
  &__categories {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 40px;
  }
  &__category-card {
    max-height: 450px;
  }
}
.page-wrapper {
  min-height: 100vh;
}
</style>
