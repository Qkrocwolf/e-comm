<template>
  <TopBar />
  <HeaderComponent id="header" />
  <main>
    <slot></slot>
  </main>
  <FooterComponent />
</template>
<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import TopBar from '../components/TopBar.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>
<style lang="scss">
.footer {
  height: 300px;
  background-color: black;
}
main {
  padding: 5% 0 15% 0;
  background: $color-main-bg;
}
</style>
