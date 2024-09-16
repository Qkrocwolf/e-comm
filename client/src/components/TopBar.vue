<template>
  <div class="top-bar-wrapper">
    <div class="top-bar">
      <ul class="top-bar__list">
        <li class="top-bar__item">
          <a href="#" class="top-bar__link">Стать продавцом</a>
        </li>
        <li class="top-bar__item">
          <a href="#" class="top-bar__link">Подарочные сертификаты</a>
        </li>
        <li class="top-bar__item">
          <a href="#" class="top-bar__link">Помощь</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.top-bar-wrapper {
  background-color: $color-top-bar-bg;
  padding: 4px 0;
  z-index: 999;
}
.top-bar {
  display: flex;
  margin: 0 auto;
  width: 1600px;
  justify-content: flex-end;

  &__list {
    display: flex;
    gap: 20px;
  }
  &__link {
    color: $color-main;
    &:hover {
      color: $color-main-hover;
    }
  }
}
</style>
