<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const vipList = [
  { id: 0, name: "免费会员计划", path: "/vip-0" },
  { id: 1, name: "月度会员计划", path: "/vip-1" },
  { id: 2, name: "永久会员计划", path: "/vip-2" },
];
const vip = ref(null);
var currentId = 0;

// 为当前页面的 vip 标签添加 selected 样式
const getCurrentListId = () => {
  for (let i = 0; i < vipList.length; i++) {
    if (route.path === vipList[i].path) {
      vip.value[i].classList.add("selected");
      currentId = i;
    }
  }
};

// 将未选中页面的 vip 标签删去 selected 样式
const changeListCurrent = async (path, id) => {
  console.log(id);
  vip.value[id].classList.add("selected");
  for (let i = 0; i < vip.value.length; i++) {
    if (vipList[i].id !== id) {
      vip.value[i].classList.remove("selected");
    }
  }
  if (route.path !== path) {
    await router.push(path);
  }
};

onMounted(getCurrentListId);
</script>

<template>
  <ul class="vip-list">
    <li
      class="vip-list-item"
      ref="vip"
      v-for="(item, index) in vipList"
      :key="index"
      @click="changeListCurrent(item.path, item.id)"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.vip-list {
  width: 76%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 40px;
  z-index: 100;
}

.vip-list-item {
  padding: 10px 28px;
  border-radius: var(--radius-pill);
  background-color: var(--deongaree);
  box-shadow: var(--shadow-3);
  letter-spacing: 3px;
  color: var(--light-white);
  font-size: var(--fs-7);
  font-family: var(--ff-llt);
  font-weight: var(--fw-600);
  cursor: pointer;
}

.selected {
  background: var(--deongaree-pr);
  color: white;
}

.vip-list-item:hover {
  background-color: var(--white_a12);
  color: var(--deongaree);
  transform: scale(1.06);
  transition: var(--transition-3);
  box-shadow: var(--box-shadow);
}
</style>
