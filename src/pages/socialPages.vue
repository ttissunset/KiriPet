<script setup>
import { defineComponent, h } from "vue";
import { useRouter } from "vue-router";
import { RouterView } from "vue-router";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";

const router = useRouter();

// Icon components
const StarIcon = defineComponent({
  name: "StarIcon",
  props: {
    fill: String,
  },
  setup(props) {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "Star",
          "data-size": "24px",
          "data-weight": props.fill || "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z",
              }),
            ]
          ),
        ]
      );
  },
});

const HeartIcon = defineComponent({
  name: "HeartIcon",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "Heart",
          "data-size": "24px",
          "data-weight": "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z",
              }),
            ]
          ),
        ]
      );
  },
});

const FireIcon = defineComponent({
  name: "FireIcon",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "Fire",
          "data-size": "24px",
          "data-weight": "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z",
              }),
            ]
          ),
        ]
      );
  },
});

const MusicNoteIcon = defineComponent({
  name: "MusicNoteIcon",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "MusicNote",
          "data-size": "24px",
          "data-weight": "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V98.75l69.7,20.91A8,8,0,0,0,216,112V64A8,8,0,0,0,210.3,56.34ZM88,216a32,32,0,1,1,32-32A32,32,0,0,1,88,216ZM200,101.25l-64-19.2V50.75L200,70Z",
              }),
            ]
          ),
        ]
      );
  },
});

const GameControllerIcon = defineComponent({
  name: "GameControllerIcon",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "GameController",
          "data-size": "24px",
          "data-weight": "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M176,112H152a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16ZM104,96H96V88a8,8,0,0,0-16,0v8H72a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM241.48,200.65a36,36,0,0,1-54.94,4.81c-.12-.12-.24-.24-.35-.37L146.48,160h-37L69.81,205.09l-.35.37A36.08,36.08,0,0,1,44,216,36,36,0,0,1,8.56,173.75a.68.68,0,0,1,0-.14L24.93,89.52A59.88,59.88,0,0,1,83.89,40H172a60.08,60.08,0,0,1,59,49.25c0,.06,0,.12,0,.18l16.37,84.17a.68.68,0,0,1,0,.14A35.74,35.74,0,0,1,241.48,200.65ZM172,144a44,44,0,0,0,0-88H83.89A43.9,43.9,0,0,0,40.68,92.37l0,.13L24.3,176.59A20,20,0,0,0,58,194.3l41.92-47.59a8,8,0,0,1,6-2.71Zm59.7,32.59-8.74-45A60,60,0,0,1,172,160h-4.2L198,194.31a20.09,20.09,0,0,0,17.46,5.39,20,20,0,0,0,16.23-23.11Z",
              }),
            ]
          ),
        ]
      );
  },
});

const MegaphoneIcon = defineComponent({
  name: "MegaphoneIcon",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "icon",
          "data-icon": "Megaphone",
          "data-size": "24px",
          "data-weight": "regular",
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24px",
              height: "24px",
              fill: "currentColor",
              viewBox: "0 0 256 256",
            },
            [
              h("path", {
                d: "M240,120a48.05,48.05,0,0,0-48-48H152.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,24,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,151.12,214l11,7.33A16,16,0,0,0,186.5,212l11.77-44.36A48.07,48.07,0,0,0,240,120ZM40,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C126.65,155,82.84,164.07,40,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM192,152H160V88h32a32,32,0,1,1,0,64Z",
              }),
            ]
          ),
        ]
      );
  },
});
</script>

<template>
  <HomeHeader />
  <div class="container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar__inner">
        <div class="sidebar__menu">
          <div class="sidebar__menu-list">
            <div
              class="menu-item menu-item--active"
              @click="router.push('/social/foru')"
            >
              <StarIcon fill="fill" />
              <p class="menu-item__text">For You</p>
            </div>
            <div class="menu-item">
              <HeartIcon />
              <p class="menu-item__text">Following</p>
            </div>
            <div class="menu-item" @click="router.push('/social/trending')">
              <FireIcon />
              <p class="menu-item__text">Trending</p>
            </div>
            <!-- <div class="menu-item">
              <MusicNoteIcon />
              <p class="menu-item__text">Music</p>
            </div>
            <div class="menu-item">
              <GameControllerIcon />
              <p class="menu-item__text">Gaming</p>
            </div> -->
            <div class="menu-item">
              <MegaphoneIcon />
              <p class="menu-item__text" @click="router.push('/chat')">Chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="main-content">
      <RouterView></RouterView>
    </main>
  </div>
  <HomeFooter />
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  width: 76%;
  margin: 0 auto;
}

/* 侧边栏样式 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 100%;
  cursor: pointer;
  position: sticky;
  top:100px;
  z-index: 999;
}

.sidebar__inner {
  display: flex;
  height: 100%;
  min-height: 700px;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.sidebar__menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar__menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Menu item styles */
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
}

.menu-item:hover {
  transform: translateX(10px);
  transition: all ease 0.3s;
}

.menu-item--active {
  border-radius: 9999px;
  background-color: #c7c1eb;
}

.menu-item__text {
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
}

.icon {
  color: rgb(194, 39, 39);
}

.main-content {
  width: 100%;
}
</style>
