<script setup>
import VipMenu from "../components/Vip/VipMenu.vue";
</script>

<template>
  <div class="vip-container">
    <div class="vip-container-header">11</div>
    <VipMenu></VipMenu>
  </div>
  <div class="vip-container-main">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.vip-container-main{
  border-top: 1px solid violet;
  margin-top: 50px;
}</style>
