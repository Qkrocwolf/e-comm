<template>
  <div class="page-wrapper">
    <div class="container container-profile">
      <aside class="container-profile__nav-bar"></aside>
      <div class="container-profile__main">
        <IconProfile class="container-profile__icon" />
        <h2 class="container-profile__title">Учетные данные</h2>
        <div class="container-profile__data-profile data-profile">
          <div class="data-profile__side">
            <div class="data-profile__item">
              <p class="data-profile__description">Почта</p>
              <p class="data-profile__data">
                {{ user.email }}
              </p>
            </div>
            <div class="data-profile__item">
              <p class="data-profile__description">Имя</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.name }}
              </p>
              <input
                type="text"
                class="data-profile__input"
                placeholder="Имя"
                v-if="editActive"
              />
            </div>
            <div class="data-profile__item">
              <p class="data-profile__description">Фамилия</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.surname }}
              </p>
              <input
                type="text"
                class="data-profile__input"
                placeholder="Фамилия"
                v-if="editActive"
              />
            </div>
            <button
              class="button-theme data-profile__edit-btn"
              @click="editToggle"
              v-if="!editActive"
            >
              Редактировать
            </button>
            <button
              class="button-theme data-profile__edit-btn"
              v-if="editActive"
              @click="editToggle"
            >
              Сохранить
            </button>
          </div>
          <div class="data-profile__side">
            <div class="data-profile__item">
              <p class="data-profile__description">Страна</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.country }}
              </p>
              <input
                type="text"
                class="data-profile__input"
                placeholder="Страна"
                v-if="editActive"
              />
            </div>
            <div class="data-profile__item">
              <p class="data-profile__description">Город</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.city }}
              </p>
              <input
                type="text"
                class="data-profile__input"
                placeholder="Город"
                v-if="editActive"
              />
            </div>
            <div class="data-profile__item">
              <p class="data-profile__description">Пол</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.gender }}
              </p>
              <select class="data-profile__select" v-if="editActive">
                <option>Мужской</option>
                <option>Женский</option>
              </select>
            </div>
            <div class="data-profile__item">
              <p class="data-profile__description">Дата рождения</p>
              <p class="data-profile__data" v-if="!editActive">
                {{ user.birthday }}
              </p>
              <input
                type="text"
                class="data-profile__input"
                v-if="editActive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { computed, Ref, ref } from 'vue';
import { UserData, User } from '../types/auth.types';
import IconProfile from '@/components/icons/IconProfile.vue';
const authStore = useAuthStore();

const userData: Ref<UserData> = computed(() => {
  return authStore.user;
});

const user: Ref<User> = ref({
  data: userData.value,
  email: userData.value.email,
  get name() {
    return this.data.name ? this.data.name : 'Не указано';
  },
  get surname() {
    return this.data.surname ? this.data.surname : 'Не указана';
  },
  get country() {
    return this.data.country ? this.data.country : 'Не указана';
  },
  get city() {
    return this.data.city ? this.data.city : 'Не указан';
  },
  get gender() {
    return this.data.gender ? this.data.gender : 'Не указан';
  },
  get birthday() {
    return this.data.birthday ? this.data.birthday : 'Не указана';
  },
});

const editActive: Ref<boolean> = ref(false);

const editToggle = () => {
  editActive.value = !editActive.value;
};
</script>
<style lang="scss">
.container-profile {
  display: flex;
  gap: 30px;
  border-radius: 12px;
  position: relative;
  &__nav-bar {
    min-width: 200px;
    height: 200px;
    background-color: black;
    border-radius: 12px;
  }
  &__main {
    background-color: $color-white;
    padding: 20px 20px 80px 60px;
    border-radius: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__icon {
    position: absolute;
    margin-left: -40px;
  }
}
.data-profile {
  display: flex;
  &__side {
    width: 100%;
  }
  &__item {
    height: 80px;
  }
  &__description {
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 6px;
  }
  &__edit-btn {
    margin-top: 60px;
    padding: 8px 0;
    width: 40%;
    &:hover {
      background-color: $color-main-hover;
    }
  }
}
</style>
