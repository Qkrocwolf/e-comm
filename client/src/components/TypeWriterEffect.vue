<template>
  <div class="writer-effect">
    {{ lifeText }}
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';

const props = defineProps<{
  text: string | string[];
  delay: number;
  firstDelay: number;
}>();

let multy = 1;

setTimeout(() => {
  for (let i = 0; i < props.text.length; i++) {
    setTimeout(() => {
      lifeText.value = lifeText.value + props.text[i];
    }, props.delay * multy);
    multy += 1;
  }
}, props.firstDelay);

const lifeText: Ref<string> = ref('');
</script>
<style lang="scss"></style>
