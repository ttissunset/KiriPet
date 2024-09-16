<script setup>
import ScrollReveal from "scrollreveal";
import { reactive, ref, onMounted } from "vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeMain from "../components/Home/HomeMain.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
</script>

<template>
  <HomeHeader></HomeHeader>
  <HomeMain></HomeMain>
  <HomeFooter></HomeFooter>
</template>

<style scoped></style>
