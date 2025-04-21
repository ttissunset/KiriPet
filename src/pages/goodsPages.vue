<script setup>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import GoodsMain from "@/components/Goods/GoodsMain.vue";
import BreadCrumb from "@/components/Goods/BreadCrumb.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";
</script>

<template>
  <div class="goods">
    <HomeHeader></HomeHeader>
    <BreadCrumb></BreadCrumb>
    <GoodsMain></GoodsMain>
    <HomeFooter></HomeFooter>
  </div>
</template>

<style scoped></style>
