<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useChatStore } from "../stores/chatStore";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const list = ref(null);
const apply = ref(null);
const show = ref(1);
const currentChat = ref(null);
const barSelected = ref("list");

// 好友列表
const friends = ref([
  {
    id: "11111",
    name: "鬼塚夏美",
    des: "[勢いにまかせて！]",
    grade: "私立結ヶ丘女子高等学校 1年级",
    avatar: "https://kiripet.tos-cn-beijing.volces.com/image/a1.png",
    note: "可可爱爱小夏美",
    birth: "2003/11/20",
    phone: "198xxxxxxxx",
    address: "广东省xx市",
    signature:
      " 優しくて正しい人はいつも生きにくい。この世界は優しくも正しくもないからだ。",
    status: "1",
  },
  {
    id: "12212",
    name: "桜小路きな子",
    des: "[夢へ踏み出す第一歩]",
    grade: "私立結ヶ丘女子高等学校 1年级",
    avatar: "https://kiripet.tos-cn-beijing.volces.com/image/3908.png",
    note: "小桜子",
    birth: "2002/08/18",
    phone: "153xxxxxxxx",
    address: "广东省xx市",
    signature:
      " スマイルPが12%UPする ＋Liella!のメンバーはさらにスマイルPが9%UPする",
    status: "0",
  },
]);

// 申请列表
const applyList = ref([
  {
    id: "212313",
    name: "桜小路きな子",
    des: "[夢へ踏み出す第一歩]",
    avatar: "https://kiripet.tos-cn-beijing.volces.com/image/3908.png",
    status: "0",
  },
]);

// 切换changebar选中对象
const toggleSelectd = () => {
  // if(barSelected.value == )
  list.value.classList.toggle("selected");
  apply.value.classList.toggle("selected");
  show.value = !show.value;
};

// 拒绝好友申请
const choose_cancle = (index) => {
  applyList.value.splice(index, 1);
};

// 同意好友申请
const choose_agree = (index) => {
  applyList.value.splice(index, 1);
};

// 切换聊天对象
const switchChat = (friend) => {
  currentChat.value = friend;
  chatStore.friendInfo = friend;
  router.push(`/chat/${friend.id}`);
};
</script>

<template>
  <div class="chat-page">
    <aside class="sidebar">
      <!-- 切换栏 -->
      <div class="changebar" @click="toggleSelectd">
        <span ref="list" class="selected"> 好友列表 </span>
        <span ref="apply"> 好友申请 </span>
      </div>

      <!-- 好友列表 -->
      <div class="friend-list" v-if="show">
        <div
          class="friend"
          v-for="(item, index) in friends"
          :key="item.id"
          @click="switchChat(item)"
          :class="[
            { online: item.status === '1' },
            { active: route.params?.id === item.id },
          ]"
        >
          <img class="friend-profile" :src="item.avatar" />
          <div class="friend-detail">
            <div class="friend-username">{{ item.name }}</div>
            <div class="friend-userdes">{{ item.des }}</div>
          </div>
        </div>
      </div>

      <!-- 好友申请 -->
      <div class="apply-list" v-else>
        <div class="apply" v-for="(item, index) in applyList" :key="index">
          <img class="apply-profile" :src="item.avatar" />
          <div class="apply-detail">
            <div class="apply-username">{{ item.name }}</div>
            <div class="apply-choose">
              <i class="fa-solid fa-check" @click="choose_agree(index)"></i>
              <i class="fa-solid fa-xmark" @click="choose_cancle(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <main class="chat-container">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 15%;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 0 10px;
  padding-right: 20px;
  border-right: 1px solid #e1e4e7;
}

.changebar {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  border-bottom: 1px solid #e1e4e7;
}

.changebar span {
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.changebar .selected {
  background-color: var(--deongaree);
  border-radius: 8px;
  color: #fff;
}

.friend-list {
  width: 100%;
}

.apply-list {
  width: 100%;
}

.apply-profile,
.friend-profile {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.apply,
.friend {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.apply:hover,
.friend:hover {
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

.apply-detail {
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
}

.apply-username,
.friend-username {
  font-weight: var(--fw-600);
  font-size: var(--fs-15);
}

.apply-userdes,
.friend-userdes {
  font-weight: var(--fw-500);
  font-size: var(--fs-12);
  color: var(--dark);
}

.apply-choose {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 15px;
}

.apply-choose .fa-check:hover {
  color: var(--success);
}
.apply-choose .fa-xmark:hover {
  color: var(--red);
}

.chat-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>
