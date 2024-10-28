<script setup>
import { ref } from "vue";

const friends = [
  {
    id: "1",
    name: "鬼塚夏美",
    des: "[勢いにまかせて！]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
    status: "1",
  },
  {
    id: "2",
    name: "桜小路きな子",
    des: "[夢へ踏み出す第一歩]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3908.png",
    status: "0",
  },
  {
    id: "3",
    name: "葉月恋",
    des: "[止まらない胸の高鳴り]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3907.png",
    status: "1",
  },
  {
    id: "4",
    name: "唐可可",
    des: "[スカートの揺らめき]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3904.png",
    status: "1",
  },
  {
    id: "5",
    name: "黒澤ルビィ",
    des: "[華やぐ笑顔]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3902.png",
    status: "0",
  },
  {
    id: "6",
    name: "国木田花丸",
    des: "[まだ知らぬ世界へ]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3900.png",
    status: "1",
  },
  {
    id: "7",
    name: "津島善子",
    des: "[一瞬の瞬きの間に]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3899.png",
    status: "0",
  },
  {
    id: "8",
    name: "桜内梨子",
    des: "[未来を告げる風]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3895.png",
    status: "0",
  },
  {
    id: "9",
    name: "渡辺曜",
    des: "[光指す水平線]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3898.png",
    status: "0",
  },
  {
    id: "10",
    name: "黒澤ダイヤ",
    des: "[前進あるのみ！]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3897.png",
    status: "0",
  },
  {
    id: "11",
    name: "高海千歌",
    des: "[今始まる未来]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3894.png",
    status: "0",
  },
  {
    id: "12",
    name: "松浦果南",
    des: "[バタフライエフェクト]",
    imgUrl: "https://kiripet.tos-cn-beijing.volces.com/image/3896.png",
    status: "0",
  },
];

const list = ref(null);
const apply = ref(null);

// 切换选中对象
const toggleSelectd = () => {
  list.value.classList.toggle("selected");
  apply.value.classList.toggle("selected");
};
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
          <div class="friend-userdes">{{ item.des }}</div>
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
  margin-top: 10px;
  margin-bottom: 10px;
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

.friend-userdes {
  font-weight: var(--fw-500);
  font-size: var(--fs-12);
  color: var(--dark);
}
</style>
