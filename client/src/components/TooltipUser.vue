<template>
  <div class="tooltip-container">
    <div class="tooltip-container__content">
      <div class="tooltip-container__list">
        <div class="tooltip-container__item">
          <RouterLink to="/profile" class="tooltip-container__link"
            >Личный кабинет</RouterLink
          >
        </div>
        <div class="tooltip-container__item">
          <a href="" class="tooltip-container__link">Сообщения</a>
        </div>
        <div class="tooltip-container__item">
          <a href="" class="tooltip-container__link">Баллы и бонусы</a>
        </div>
      </div>
      <div class="tooltip-container__footer">
        <button
          class="tooltip-container__footer-button button-text"
          @click.prevent="authStore.logout()"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
</script>
<style lang="scss">
.tooltip-container {
  margin-top: -4px;
  position: relative;
  z-index: 500;
  &__link {
    display: block;
    padding: 16px;
  }

  &__content {
    top: 10px;
    position: absolute;
    z-index: 500;
    transition: opacity 0.3s;
    background-color: #fff;
    margin-left: -105px;
    width: 200px;
    box-shadow: 0 4px 16px 1px rgba(0, 26, 52, 0.16);
    border-radius: 12px;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin-left: -9px;
      border-width: 14px;
      border-style: solid;
      border-color: transparent transparent rgba(204, 214, 228, 0.3) transparent;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin-left: -5px;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }

  &__list {
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  &__item {
    transition: background-color 0.2s;
    &:hover {
      background-color: $color-tooltip-bg;
    }
  }

  &__footer {
    padding: 8px 0;
  }
  &__footer-button {
    padding: 10px;
    width: 100%;
    transition: background-color 0.2s;
    &:hover {
      background-color: $color-tooltip-bg;
    }
  }
}
</style>
