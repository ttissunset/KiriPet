<script setup>
import { ref } from "vue";

const friends = [
  {
    id: "1",
    name: "鬼塚夏美",
    imgUrl: "src/assets/image/a1.png",
    status: "1",
  },
  {
    id: "2",
    name: "22",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "3",
    name: "33",
    imgUrl: "src/assets/image/a1.png",
    status: "1",
  },
  {
    id: "4",
    name: "44",
    imgUrl: "src/assets/image/a1.png",
    status: "1",
  },
  {
    id: "5",
    name: "55",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "6",
    name: "66",
    imgUrl: "src/assets/image/a1.png",
    status: "1",
  },
  {
    id: "7",
    name: "77",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "8",
    name: "88",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "9",
    name: "99",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "10",
    name: "00",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "10",
    name: "00",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
  {
    id: "10",
    name: "00",
    imgUrl: "src/assets/image/a1.png",
    status: "0",
  },
];
</script>

<template>
  <div class="friend-container">
    <div class="friend-bar" @click="toggleSelectd">
      <span ref="list" class="selected"> 好友列表 </span>
      <span ref="apply"> 好友申请 </span>
    </div>
    <div class="friend-list">
      <div
        class="friend"
        v-for="(item, index) in friends"
        :key="index"
        :class="[{ online: item.status === '1' }, { active: item.id === '1' }]"
      >
        <img class="friend-profile" :src="item.imgUrl" />
        <div class="friend-detail">
          <div class="friend-username">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-container {
  width: 15%;
  flex-shrink: 0;
  overflow-y: auto;
  margin: 0 10px;
}

.friend-bar {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 5px;
}

.friend-bar span {
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.friend-bar .selected {
  background-color: var(--deongaree);
  border-radius: 8px;
  color: #fff;
}

.friend-list {
  width: 100%;
}

.friend-list .friend-profile {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.friend-list .friend {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.friend-list .friend:hover {
  background-color: rgba(202, 209, 212, 0.4);
}

.active {
  background: linear-gradient(
    to right,
    rgba(212, 247, 212, 0.4) 0%,
    rgba(238, 242, 244, 0) 100%
  );
  border-left: 4px solid var(--youth-green);
}

.friend.online:before {
  content: "";
  position: absolute;
  background-color: var(--youth-green-3);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid #fff;
  left: 50px;
  bottom: 19px;
}

.friend-detail {
  overflow: hidden;
}

.friend-username {
  font-weight: var(--fw-600);
  font-size: var(--fs-15);
}
</style>
