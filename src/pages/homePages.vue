<script setup>
import ScrollReveal from "scrollreveal";
import { reactive, ref, onMounted } from "vue";
import HomeHeader from "../components/HomeHeader.vue";
import HomeMain from "../components/HomeMain.vue";
import HomeFooter from "../components/HomeFooter.vue";
</script>

<template>
  <HomeHeader></HomeHeader>
  <HomeMain></HomeMain>
  <HomeFooter></HomeFooter>
</template>

<style scoped></style>
