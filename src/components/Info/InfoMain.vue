<script setup>
import { ref } from "vue";
import { catInfos } from "../../mock/infos";
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
      <div class="cat-info-main">
        <div
          class="cat-info-main-item"
          v-for="(item, index) in catInfos"
          :key="index"
        >
          <div class="cat-info-main-item-img"><img :src="item.imageUrl" /></div>
          <div class="cat-info-main-item-petName">{{ item.petName }}</div>
          <div class="cat-info-main-item-miniDes">{{ item.miniDes }}</div>
          <div class="cat-info-main-item-btn"><button>更多</button></div>
        </div>
      </div>
    </div>
    <div class="dog-info">
      <div class="dog-info-title">狗狗百科</div>
      <div class="dog-info-main">
        <div
          class="dog-info-main-item"
          v-for="(item, index) in catInfos"
          :key="index"
        >
          <div class="dog-info-main-item-img"><img :src="item.imageUrl" /></div>
          <div class="dog-info-main-item-petName">{{ item.petName }}</div>
          <div class="dog-info-main-item-miniDes">{{ item.miniDes }}</div>
          <div class="dog-info-main-item-btn"><button>更多</button></div>
        </div>
      </div>
    </div>
    <div class="pet-info">
      <div class="pet-info-title">养宠知识</div>
      <div class="pet-info-main"></div>
    </div>
  </div>
</template>

<style scoped>
.info-main {
  width: 76%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 100px;
}

/* 猫咪百科 Start */
.cat-info {
  width: 100%;
  height: 1400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
}

.cat-info .cat-info-title {
  height: 8%;
  font-size: var(--fs-36);
  text-align: center;
  font-weight: var(--fw-600);
  font-family: var(--ff-llt);
}

.cat-info-main {
  width: 100%;
  height: 92%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
}

.cat-info-main-item {
  border-radius: var(--radius-20);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cat-info-main-item:hover {
  transform: scale(1.05);
  box-shadow: var(--box-shadow-2);
  transition: var(--transition-4);
}

.cat-info-main-item-img img {
  width: 260px;
  height: 250px;
  margin-top: 20px;
  border-radius: var(--radius-8);
}

.cat-info-main-item-petName {
  font-size: var(--fs-24);
  font-weight: var(--fw-500);
  text-align: center;
  margin-top: 24px;
  font-family: var(--ff-llt);
}

.cat-info-main-item-miniDes {
  font-size: 1rem;
  color: var(--info-dark);
  text-align: center;
  margin-top: 12px;
}

.cat-info-main-item-btn {
  margin: 10px 0;
}

.cat-info-main-item-btn button {
  width: 140px;
  height: 38px;
  background-color: var(--deongaree);
  border-radius: var(--radius-10);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--light-white);
}

.cat-info-main-item-btn button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}
/* 猫咪百科 End */

/* 狗狗百科 Start */
.dog-info {
  width: 100%;
  height: 1400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
}

.dog-info .dog-info-title {
  height: 8%;
  font-size: var(--fs-36);
  text-align: center;
  font-weight: var(--fw-600);
  font-family: var(--ff-llt);
}

.dog-info-main {
  width: 100%;
  height: 92%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
}

.dog-info-main-item {
  border-radius: var(--radius-20);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dog-info-main-item:hover {
  transform: scale(1.05);
  box-shadow: var(--box-shadow-2);
  transition: var(--transition-4);
}

.dog-info-main-item-img img {
  width: 260px;
  height: 250px;
  margin-top: 20px;
  border-radius: var(--radius-8);
}

.dog-info-main-item-petName {
  font-size: var(--fs-24);
  font-weight: var(--fw-500);
  text-align: center;
  margin-top: 24px;
  font-family: var(--ff-llt);
}

.dog-info-main-item-miniDes {
  font-size: 1rem;
  color: var(--info-dark);
  text-align: center;
  margin-top: 12px;
}

.dog-info-main-item-btn {
  margin: 10px 0;
}

.dog-info-main-item-btn button {
  width: 140px;
  height: 38px;
  background-color: var(--deongaree);
  border-radius: var(--radius-10);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--light-white);
}

.dog-info-main-item-btn button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

/* 狗狗百科 End */

.pet-info {
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
}

.pet-info .pet-info-title {
  height: 8%;
  font-size: var(--fs-36);
  text-align: center;
  font-weight: var(--fw-600);
  font-family: var(--ff-llt);
}

.pet-info .pet-info-main {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
}
</style>
