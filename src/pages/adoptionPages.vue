<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import AdoptionHome from "../components/Adoption/AdoptionHome.vue";
</script>

<template>
  <div class="container">
    <HomeHeader></HomeHeader>
    <AdoptionHome></AdoptionHome>
    <HomeFooter></HomeFooter>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style> 