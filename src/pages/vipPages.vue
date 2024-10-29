<script setup>
import VipMenu from "../components/Vip/VipMenu.vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
</script>

<template>
  <div class="vip-container">
    <div class="vip-container-header">
      <HomeHeader></HomeHeader>
    </div>
    <VipMenu></VipMenu>
  </div>
  <div class="vip-container-main">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.vip-container-main {
  width: 76%;
  margin: 0 auto;
  border-top: 1px solid violet;
  margin-top: 30px;
}
</style>
