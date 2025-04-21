<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import AdoptionDetail from "../components/Adoption/AdoptionDetail.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="container">
    <HomeHeader></HomeHeader>
    <AdoptionDetail :id="route.params.id"></AdoptionDetail>
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