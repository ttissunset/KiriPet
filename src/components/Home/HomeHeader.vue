<script setup>
import { onMounted } from "vue";
import { inject, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../../stores/userStore";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const search = ref("");

// 测试时用
const show = ref(true);

// 添加控制折叠菜单和搜索框显示的状态
const isMenuOpen = ref(false);
const isSearchOpen = ref(true);
const isMobileSearch = ref(false);

// 根据窗口大小设置搜索框状态
const updateSearchState = () => {
  if (window.innerWidth <= 1200) {
    // 移动设备下默认折叠搜索框
    isSearchOpen.value = false;
    isMobileSearch.value = true;
  } else {
    // 非移动设备下始终显示搜索框
    isSearchOpen.value = true;
    isMobileSearch.value = false;
  }
};

// 切换菜单显示状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 切换搜索框显示状态
const toggleSearch = () => {
  if (isMobileSearch.value) {
    isSearchOpen.value = !isSearchOpen.value;
  }
};

// 监听窗口大小变化
onMounted(() => {
  updateSearchState();
  window.addEventListener("resize", updateSearchState);
});

// 退出登录的业务逻辑
const confirm = () => {
  show.value = false;
  // 1.清除用户信息
  userStore.clearUserInfo();
  // 2.跳转到登录页
  router.push("/login");
};

const menuList = [
  { id: 0, name: "首页", path: "/home" },
  { id: 1, name: "宠物百科", path: "/wiki" },
  { id: 2, name: "宠物商店", path: "/shop" },
  { id: 3, name: "宠物服务", path: "/serve" },
  { id: 4, name: "宠物乐园", path: "/social" },
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
  // 在移动端点击菜单项后关闭菜单
  if (window.innerWidth <= 768) {
    isMenuOpen.value = false;
  }
};

onMounted(getCurrentMenuId);
</script>

<template>
  <div class="home-header">
    <div class="header-container">
      <div class="home-header-left">
        <div class="logo" @click="router.push('/home')">
          <img src="https://kiripet.tos-cn-beijing.volces.com/image/logo.png" />
          <h2 class="logo-text">KiriPet</h2>
        </div>
      </div>
      <div class="home-header-right">
        <!-- 搜索框 Start -->
        <div
          class="input-container"
          :class="{
            'search-collapsed': !isSearchOpen,
            'mobile-search': isMobileSearch,
          }"
        >
          <button class="input-button" @click="toggleSearch">
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
            v-if="isSearchOpen"
            type="text"
            name="text"
            class="input-search"
            v-model="search"
            placeholder="搜些什么吧 ε٩(๑> ₃ <)۶з"
          />
        </div>
        <!-- 搜索框 End -->

        <!-- 移动端菜单按钮 Start -->
        <div class="menu-toggle" @click="toggleMenu">
          <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <!-- 移动端菜单按钮 End -->

        <!-- 导航列表 Start -->
        <div class="header-nav" :class="{ 'menu-open': isMenuOpen }">
          <ul>
            <li v-for="(item, index) in menuList" :key="index" ref="menu">
              <span @click="changeMenuCurrent(item.path, item.id)">{{
                item.name
              }}</span>
            </li>
            <!-- 多模板渲染 用于区分登录状态和未登录状态 -->
            <!--! 记得改成userStore.userInfo.token -->
            <!-- v-if="userStore.userInfo.token" -->
            <template v-if="show">
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
  </div>
</template>

<style scoped>
.home-header {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ede7f3;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
}

.header-container {
  width: 76%;
  display: flex;
  margin: 0 auto;
  padding: 0.75rem 2.5rem;
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
  cursor: pointer;
}

.home-header-left .logo img {
  width: 30px;
  height: 30px;
}

.home-header-left .logo .logo-text {
  margin: 0;
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
  padding: 2px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--youth-blue-2);
  border-radius: var(--radius-20);
  width: 300px;
  margin-right: 20px;
  transition: all 0.3s ease;
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
  z-index: 2;
}

.home-header-right .input-container .input-button:hover {
  background-color: var(--youth-blue);
}

.home-header-right .input-container .input-search {
  width: 100%;
  border-radius: var(--radius-20);
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

/* 汉堡菜单按钮样式 */
.menu-toggle {
  display: none;
  cursor: pointer;
}

.hamburger {
  width: 30px;
  height: 25px;
  position: relative;
  margin-left: 10px;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: var(--youth-green-2);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 10px;
}

.hamburger span:nth-child(3) {
  top: 20px;
}

.hamburger.is-active span:nth-child(1) {
  transform: rotate(45deg);
  top: 10px;
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: rotate(-45deg);
  top: 10px;
}

/* 响应式布局 */
@media screen and (max-width: 1500px) {
  .home-header-left .logo {
    transform: scale(0.8);
  }

  .home-header-right .header-nav ul li {
    margin-right: 15px;
    font-size: var(--fs-16);
  }

  .home-header-right .input-container {
    width: 220px;
    margin-right: 15px;
  }
}

@media screen and (max-width: 1200px) {
  .header-container {
    width: 90%;
    padding: 0.75rem 1rem;
  }

  .home-header-right .input-container {
    width: 240px;
    margin-right: 15px;
  }

  .home-header-right .input-container.search-collapsed {
    width: 40px;
    border: none;
    background: transparent;
  }
}

@media screen and (max-width: 992px) {
  .home-header-right .input-container {
    width: 200px;
    margin-right: 10px;
  }

  .home-header-right .header-nav ul {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
  }

  .home-header-right .header-nav ul li {
    margin: 15px 0;
    width: 100%;
  }

  .menu-toggle {
    display: block;
    z-index: 1010;
  }

  .home-header-right .header-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    z-index: 1000;
    padding-top: 80px;
  }

  .home-header-right .header-nav.menu-open {
    right: 0;
  }
}
</style>
