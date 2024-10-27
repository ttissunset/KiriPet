<script setup>
import { onMounted } from "vue";
import { inject, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../../stores/useStore";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 退出登录的业务逻辑
const confirm = () => {
  // 1.清除用户信息
  userStore.clearUserInfo();
  // 2.跳转到登录页
  router.push("/login");
};

const menuList = [
  { id: 0, name: "首页", path: "/home" },
  { id: 1, name: "宠物百科", path: "/info" },
  { id: 2, name: "宠物商店", path: "/goods" },
  { id: 3, name: "宠物服务", path: "/severe" },
  { id: 4, name: "宠物乐园", path: "/fun" },
];
const menu = ref(null);
var currentId = 0;

// 为当前页面的 menu 标签添加 selected 样式
const getCurrentMenuId = () => {
  for (let i = 0; i < menuList.length; i++) {
    if (route.path === menuList[i].path) {
      menu.value[i].classList.add("selected");
      currentId = i;
    }
  }
};

// 将未选中页面的 menu 标签删去 selected 样式
const changeMenuCurrent = async (path, id) => {
  console.log(id);
  menu.value[id].classList.add("selected");
  for (let i = 0; i < menu.value.length; i++) {
    if (menuList[i].id !== id) {
      menu.value[i].classList.remove("selected");
    }
  }
  if (route.path !== path) {
    await router.push(path);
  }
};

onMounted(getCurrentMenuId);
</script>

<template>
  <div class="home-header">
    <div class="home-header-left">
      <div class="logo">
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/logo.png"
        />
        <h2>KiriPet</h2>
      </div>
    </div>
    <div class="home-header-right">
      <!-- 搜索框 Start -->
      <div class="input-container">
        <button class="input-button">
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height="20px"
            width="20px"
          >
            <path
              d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
              fill-rule="evenodd"
              fill="#17202A"
            ></path>
          </svg>
        </button>
        <input
          type="text"
          name="text"
          class="input-search"
          placeholder="Start searching OwO~"
        />
      </div>
      <!-- 搜索框 End -->

      <!-- 导航列表 Start -->
      <div class="header-nav">
        <ul>
          <li v-for="(item, index) in menuList" :key="index" ref="menu">
            <span @click="changeMenuCurrent(item.path, item.id)">{{
              item.name
            }}</span>
          </li>
          <!-- 多模板渲染 用于区分登录状态和未登录状态 -->
          <!--! 记得改成userStore.userInfo.token -->
          <template v-if="userStore.userInfo.token">
            <li>
              <span @click="router.push('/user')"
                ><img
                  src="https://kiripet.tos-cn-beijing.volces.com/image/a1.png"
              /></span>
            </li>
            <button class="exitLoginBtn" @click="confirm">退出登录</button>
          </template>
          <template v-else>
            <button @click="router.push('/login')" class="loginBtn">
              登录
            </button>
          </template>
        </ul>
      </div>
      <!-- 导航列表 End -->
    </div>
  </div>
</template>

<style scoped>
.home-header {
  width: 76%;
  height: 100px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}

.home-header-left .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-20);
  font-family: var(--ff-hymhtw);
}
.home-header-left .logo img {
  width: 30px;
  height: 30px;
}

.home-header-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 输入框部分 */
.home-header-right .input-container {
  position: relative;
  /* background: var(--youth-blue-2); */
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--youth-blue-2);
  border-radius: var(--radius-20);
  width: 300px;
  margin-right: 20px;
}

.home-header-right .input-container .input-button {
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 5px;
}

.home-header-right .input-container .input-button:hover {
  background-color: var(--youth-blue);
}

.home-header-right .input-container .input-search {
  width: 100%;
  border-radius: var(--radius-20);
  /* background: var(--youth-blue-2); */
  outline: none;
  border: none;
  padding: 8px;
  position: relative;
}

/* 导航列表部分 */
.home-header-right .header-nav ul {
  display: flex;
  align-items: center;
  font-size: var(--fs-18);
  font-family: var(--ff-llt);
}

.home-header-right .header-nav ul li {
  margin-right: 25px;
  /* margin-top: 10px; */
  font-weight: var(--fw-500);
}

.home-header-right .header-nav ul li img {
  width: 35px;
  height: 35px;
}

.selected {
  color: var(--deongaree);
}

.home-header-right .header-nav ul li:hover {
  translate: 0 -0.1rem;
  color: var(--deongaree);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.home-header-right .header-nav .exitLoginBtn {
  width: 100px;
  height: 40px;
  font-size: var(--fs-16);
  font-family: var(--ff-llt);
  color: var(--light-white);
  border-radius: var(--radius-8);
  background-color: var(--orange-crayola);
}

.home-header-right .header-nav .exitLoginBtn:hover {
  border: 2px solid var(--orange-crayola);
  background-color: var(--light-white);
  color: var(--orange-crayola);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.home-header-right .header-nav .loginBtn {
  width: 100px;
  height: 40px;
  font-size: var(--fs-16);
  font-family: var(--ff-llt);
  color: var(--light-white);
  border-radius: var(--radius-8);
  background-color: var(--youth-green-2);
}

.home-header-right .header-nav .loginBtn:hover {
  border: 2px solid var(--youth-green-2);
  background-color: var(--light-white);
  color: var(--youth-green-2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
</style>

<!-- // const light = ref(null);
// const dark = ref(null);
// 切换主题色
// const toggleTheme = () => {
//   // 切换主题色
//   document.body.classList.toggle("dark-mode-variables");
//   dark.value.classList.toggle("active");
//   light.value.classList.toggle("active");
// }; -->

<!-- 切换暗黑模式 -->
<!-- 
    <div class="dark-mode" @click="toggleTheme">
        <span ref="light" class="material-icons-sharp active">
          light_mode
        </span>
        <span ref="dark" class="material-icons-sharp"> dark_mode </span>
    </div>
-->

/* 主题切换部分 */ /* .home-header-right .dark-mode { background-color:
var(--light-gray); display: flex; align-items: center; height: 1.6rem; width:
4.2rem; cursor: pointer; border-radius: var(--radius-10); } .home-header-right
.dark-mode span { font-size: 1.2rem; width: 50%; height: 100%; display: flex;
align-items: center; justify-content: center; } .home-header-right .dark-mode
span.active { background-color: var(--youth-green-2); color: white;
border-radius: var(--radius-10); } */
