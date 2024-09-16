<template>
  <header>
    <div class="container">
      <div class="header-container">
        <StarsBg />
        <span class="box-shadow">
          <div class="logo-catalog-wrapper">
            <div class="logo-catalog-wrapper__logo">
              <RouterLink to="/"><h1 class="logo">Market</h1></RouterLink>
            </div>
          </div>
        </span>
        <span class="box-shadow-light">
          <div class="header-container__search search">
            <button class="search__search-btn search__left-btn"></button>
            <input
              type="text"
              class="search__input"
              placeholder="Искать на Market"
              v-model="searchInput"
            />
            <button
              class="search__close-btn"
              v-if="searchInput"
              @click="searchInput = ''"
            >
              <IconClose class="search__close-icon" />
            </button>
            <button class="search__search-btn">
              <IconSearch class="search__search-icon" />
            </button>
          </div>
        </span>
        <div class="header-container__user-buttons user-buttons">
          <div
            class="user-buttons__btn"
            @click.prevent="
              [modalTarget.showModal(), $emit('typeWriterEffect()')]
            "
            v-if="!isAuth"
          >
            <IconProfile class="user-buttons__icon" />
            <span class="user-buttons__desc">Войти</span>
          </div>
          <div
            class="user-buttons__btn"
            v-else
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
          >
            <IconProfile class="user-buttons__icon" />
            <span class="user-buttons__desc">Профиль</span>
            <Transition>
              <TooltipUser v-if="showTooltip" />
            </Transition>
          </div>
          <div class="user-buttons__btn">
            <IconFavorite class="user-buttons__icon" />
            <span class="user-buttons__desc">Избранное</span>
          </div>
          <div class="user-buttons__btn">
            <IconCart class="user-buttons__icon" />
            <span class="user-buttons__desc">Корзина</span>
          </div>
        </div>
      </div>
    </div>
    <ModalUser ref="modalTarget" class="modal" />
  </header>
</template>
<script setup lang="ts">
import IconCart from './icons/IconCart.vue';
import IconFavorite from './icons/IconFavorite.vue';
import IconSearch from './icons/IconSearch.vue';
import IconProfile from './icons/IconProfile.vue';
import IconClose from './icons/IconClose.vue';
import ModalUser from './ModalUser.vue';
import TooltipUser from './TooltipUser.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref, Ref, computed, ComputedRef, onMounted } from 'vue';
import StarsBg from './backgroundStars.vue';

onMounted(() => {
  const header: HTMLElement = document.getElementById('header');
  const headerOffset = header.offsetTop;
  window.onscroll = function () {
    stickHeader();
  };
  const stickHeader = () => {
    if (window.scrollY > headerOffset) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };
});

const authStore = useAuthStore();
const isAuth: ComputedRef<boolean> = computed(() => authStore.isAuth);

const searchInput: Ref<string> = ref('');
const modalTarget: Ref<InstanceType<typeof ModalUser>> = ref();

const showTooltip: Ref<boolean> = ref(false);
</script>
<style lang="scss">
header {
  background: $color-bg-header;
}
.sticky {
  position: sticky;
  width: 100%;
  top: 0;
  background-color: $color-white;
  z-index: 999;
}
.box-shadow-light {
  width: 100%;
}
.header-container {
  color: $color-main;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: center;
  padding: 10px 0;
  position: relative;

  &__search {
    flex: 1;
    height: 60px;
  }
}

.logo-catalog-wrapper {
  background-color: $color-main;
  color: black;
  clip-path: $clip-path-pixel;
  animation: float 5s ease-in-out infinite;
  &:hover {
    background-color: $color-main-hover;
  }
}

.box-shadow:has(.logo-catalog-wrapper:hover) {
  transition: all 0.3s ease-out;
  filter: drop-shadow(0em 0em 30px $color-main-hover);
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0px);
  }
}

.logo {
  padding: 8px 42px;
}
.search {
  background-color: transparent;
  display: flex;
  clip-path: $clip-path-pixel;
  width: 100%;
  &__left-btn {
    padding: 0 14px;
    border-left: none !important;
    border-right: 1px solid $color-black !important;
  }
  &__input {
    padding-left: 16px;
    flex: 1;
    outline: none;
    font-size: 1.5rem;
    border-top: 2px solid $color-black;
    border-bottom: 2px solid $color-black;
    border-left: none;
    border-right: none;
    background-color: transparent;
    &:focus {
      background-color: $color-icon;
    }
  }

  &__close-btn {
    background-color: $color-main;
    border-top: 2px solid $color-black;
    border-bottom: 2px solid $color-black;
    border-left: none;
    border-right: none;
  }
  &__search-btn {
    background-color: $color-main;
    border: none;
    border-left: 1px solid $color-black;
    &:hover {
      background-color: $color-main-hover;
    }
  }
}
.box-shadow-light:has(.search__input:focus) {
  filter: drop-shadow(0em 0em 60px $color-icon);
}
.user-buttons {
  display: flex;
  align-items: center;
  gap: 40px;
  z-index: 10;

  &__btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    &:hover {
      color: $color-main-hover;
    }
    &:hover .user-buttons__icon {
      animation: float-icon 3s ease-in-out infinite;
    }
    &:hover .icon-fill {
      fill: $color-main-hover;
    }
  }
}
@keyframes float-icon {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-5px);
  }
  100% {
    transform: translatey(0px);
  }
}

.logo {
  font-family: $font-eng;
  letter-spacing: 0.1rem;
  font-weight: 400;
}
.v-enter-active,
.v-leave-active {
  z-index: 500;
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
