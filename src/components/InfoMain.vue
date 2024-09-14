<script setup>
import { ref } from "vue";
import { catInfos } from "../mock/infos";
import { onMounted } from "vue";

const list = catInfos;
const test = () => {
  console.log(list);
};
onMounted(test);
</script>

<template>
  <div class="info-main">
    <div class="cat-info">
      <div class="cat-info-title">猫咪百科</div>
      <div class="cat-info-main"></div>
    </div>
  </div>

  <div class="dog-info">
    <div class="dog-info-title">狗狗百科</div>
    <div class="dog-info-main"></div>
  </div>
</template>

<style scoped>
.info-main {
  width: 76%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
}

/* 猫咪百科 Start */
.cat-info {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.cat-info .cat-info-title {
  font-size: var(--fs-40);
  text-align: center;
  font-weight: var(--fw-600);
  font-family: var(--ff-llt);
}

.cat-info-main {
  width: 100%;
}
/* 猫咪百科 End */

/* 狗狗百科 Start */
.dog-info {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.dog-info .dog-info-title {
  font-size: var(--fs-40);
  text-align: center;
  font-weight: var(--fw-600);
  font-family: var(--ff-llt);
}
/* 狗狗百科 End */
</style>
