<template>
  <div class="alert" v-for="(error, index) in errors" :key="index">
    <TypeWriterEffect
      class="alert__error"
      :text="error"
      :delay="20"
      :first-delay="0"
    />
  </div>
</template>
<script setup lang="ts">
import TypeWriterEffect from './TypeWriterEffect.vue';
defineProps<{
  errors: string | string[];
}>();
</script>
<style lang="scss">
.alert {
  &__error {
    font-size: 1.2rem;
    margin: 2px;
    color: $color-error;
  }
}
</style>
