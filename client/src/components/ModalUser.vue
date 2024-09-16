<template>
  <dialog
    close
    ref="dialogRef"
    class="modal-user"
    tabindex="1"
    @keydown.esc="overflow()"
  >
    <form method="dialog" class="modal-user__form">
      <h2 class="modal-user__title">Идентификация</h2>
      <button
        class="modal-user__close"
        @click="[(email = ''), (password = ''), (error = ''), overflow()]"
      >
        <IconClose />
      </button>
      <h2 class="modal-user__header">
        <TypeWriterEffect
          text="Введите ваши пароль и почту для входа/регистрации..."
          :delay="30"
          :first-delay="300"
          v-if="startWriteEffect"
        />
      </h2>
      <div class="modal-user__errors">
        <ErrorComponent :errors="error" v-if="error && showErrors" />
      </div>
      <input
        type="email"
        class="modal-user__input"
        placeholder="Введите ваш email"
        v-model="email"
        @keypress.enter.prevent="login()"
      />
      <input
        type="password"
        class="modal-user__input"
        placeholder="Введите ваш пароль"
        v-model="password"
        @keypress.enter.prevent="login()"
      />
      <div class="modal-user__separator"></div>
      <button
        class="modal-user__btn button-theme"
        @click.prevent="registration()"
      >
        Зарегистрироваться
      </button>
      <button
        tabindex="2"
        class="modal-user__btn button-theme"
        @click.prevent="login()"
      >
        Войти
      </button>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import IconClose from './icons/IconClose.vue';
import { useAuthStore } from '@/stores/auth.store';
import { Ref, ref } from 'vue';
import { errorHandler } from '../api/error.api';

import TypeWriterEffect from './TypeWriterEffect.vue';
import ErrorComponent from './ErrorComponent.vue';

const authStore = useAuthStore();
const error: Ref<string[] | string> = ref();
const dialogRef: Ref<HTMLDialogElement | null> = ref();
const startWriteEffect: Ref<boolean> = ref(false);
const showErrors: Ref<boolean> = ref(false);
const showModal = () => {
  dialogRef.value?.showModal();
  startWriteEffect.value = true;
  document.body.style.overflowY = 'hidden';
};
function overflow() {
  document.body.style.overflowY = 'visible';
}
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const registration = async () => {
  showErrors.value = false;
  try {
    await authStore.registration(email.value, password.value);
  } catch (err) {
    error.value = await errorHandler(err);
  }
  showErrors.value = true;
};

const login = async () => {
  showErrors.value = false;
  try {
    await authStore.login(email.value, password.value);
  } catch (err) {
    error.value = await errorHandler(err);
  }
  showErrors.value = true;
};

defineExpose({ showModal });
</script>
<style lang="scss">
.modal-user {
  width: 600px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  position: fixed;
  padding: 20px;
  animation: slideIn 0.4s;
  &__errors {
    height: 50px;
  }

  &__title {
    position: absolute;
    top: 15px;
    left: 183.5px;
    padding: 0px 10px;
    letter-spacing: 0.2rem;
    background-color: $color-white;
  }
  &__form {
    display: flex;
    flex-direction: column;
    padding: 60px 20px;
    border: 6px solid $color-black;
    gap: 18px;
  }

  &__header {
    text-align: center;
  }

  &__input {
    padding-left: 12px;
    min-height: 42px;
    font-size: 1.25rem;
    border: 1px solid $color-black;
    box-shadow: $input-pixel-shadow-color-black;
    outline: none;
    &:focus {
      border: 2px solid $color-main;
    }
  }

  &__separator {
    border-bottom: 1px solid $color-black;
  }

  &__btn {
    padding: 8px 0;
  }
  &__close {
    background-color: $color-white;
    border: none;
    position: absolute;
    margin-top: -50px;
    margin-left: 470px;
    outline: none;
    cursor: pointer;
    &:hover .icon-close {
      stroke: $color-close-icon-hover;
    }
  }
}

@keyframes slideIn {
  0% {
    top: -1200px;
  }
  100% {
    top: 0px;
  }
}
</style>
