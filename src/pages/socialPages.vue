<script setup>
import { defineComponent, h } from "vue";
import { useRouter } from "vue-router";
import HomeHeader from "../components/Home/HomeHeader.vue";

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
  <div class="social__container">
    <div class="social__content">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <div class="sidebar__inner">
          <div class="sidebar__menu">
            <div class="sidebar__menu-list">
              <div class="menu-item menu-item--active">
                <StarIcon fill="fill" />
                <p class="menu-item__text">For You</p>
              </div>
              <div class="menu-item">
                <HeartIcon />
                <p class="menu-item__text">Following</p>
              </div>
              <div class="menu-item">
                <FireIcon />
                <p class="menu-item__text">Trending</p>
              </div>
              <div class="menu-item">
                <MusicNoteIcon />
                <p class="menu-item__text">Music</p>
              </div>
              <div class="menu-item">
                <GameControllerIcon />
                <p class="menu-item__text">Gaming</p>
              </div>
              <div class="menu-item">
                <MegaphoneIcon />
                <p class="menu-item__text" @click="router.push('/chat')">
                  Chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <div class="main-content">
        <!-- 大屏 -->
        <div class="container">
          <div class="hero-container">
            <div
              class="hero"
              :style="{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(https://cdn.usegalileo.ai/sdxl10/6a6a23fb-f309-453e-8f2c-e53b6047ec5b.png)',
              }"
            >
              <div class="hero-content">
                <h1 class="hero-title">加入 KiriPet 社区吧</h1>
                <h2 class="hero-subtitle">漫话宠趣，相询疑难，邂逅知音同契</h2>
              </div>
              <button class="create-account-btn">加入 KiriPet</button>
            </div>
          </div>
        </div>

        <!-- post -->
        <div class="post-input-container">
          <label class="post-input-label">
            <div class="post-input-wrapper">
              <div class="post-input-left">
                <div
                  class="user-avatar"
                  :style="{
                    backgroundImage:
                      'url(https://cdn.usegalileo.ai/sdxl10/5409398a-59f9-47bc-90e1-1f2dd84e2fcb.png)',
                  }"
                ></div>
              </div>
              <div class="post-input-right">
                <textarea
                  placeholder="What's on your mind?"
                  maxlength="100"
                  class="post-textarea"
                ></textarea>
                <div class="post-actions">
                  <div class="post-options"></div>
                  <button class="post-btn" @click="router.push('/upload')">
                    投稿
                  </button>
                </div>
              </div>
            </div>
          </label>
        </div>

        <!-- 分类 -->
        <div class="categories-grid">
          <div class="category-card">
            <div
              class="category-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/70a4c5f3-70d8-40a4-aa93-30bf98c73e4f.png)',
              }"
            ></div>
            <h2 class="category-title">#dog</h2>
          </div>
          <div class="category-card">
            <div
              class="category-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/082b1ab2-9eaa-49b9-8592-8c1b51919215.png)',
              }"
            ></div>
            <h2 class="category-title">#cat</h2>
          </div>
          <div class="category-card">
            <div
              class="category-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/4e02d131-7ab4-47ce-951e-5c65fdbfdd4c.png)',
              }"
            ></div>
            <h2 class="category-title">#dog</h2>
          </div>
          <div class="category-card">
            <div
              class="category-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/f3a467cf-9867-4028-a6f1-2866f9be140a.png)',
              }"
            ></div>
            <h2 class="category-title">#dog</h2>
          </div>
        </div>

        <h2 class="section-title">热门话题</h2>

        <!-- 热门话题 -->
        <div class="trending-grid">
          <div class="trending-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z"
                ></path>
              </svg>
            </div>
            <h2 class="trending-title">#dog</h2>
          </div>
          <div class="trending-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z"
                ></path>
              </svg>
            </div>
            <h2 class="trending-title">#puppy</h2>
          </div>
          <div class="trending-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z"
                ></path>
              </svg>
            </div>
            <h2 class="trending-title">#cat</h2>
          </div>
        </div>

        <h2 class="section-title">活动预告</h2>

        <!-- 活动预告 -->
        <div class="events-list">
          <div class="event-item">
            <div
              class="event-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/3d0c987c-be2e-4927-bbaa-0735cd07e233.png)',
              }"
            ></div>
            <div class="event-details">
              <p class="event-name">Dog Training Basics - Online Workshop</p>
              <p class="event-date">Sun, Mar 27, 10:00 AM</p>
            </div>
          </div>
          <div class="event-item">
            <div
              class="event-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/4c386265-042d-4ddc-8cb2-d3b439a72586.png)',
              }"
            ></div>
            <div class="event-details">
              <p class="event-name">
                Caring for Your Senior Cat - Online Q&amp;A
              </p>
              <p class="event-date">Sun, Mar 27, 3:00 PM</p>
            </div>
          </div>
          <div class="event-item">
            <div
              class="event-image"
              :style="{
                backgroundImage:
                  'url(https://cdn.usegalileo.ai/sdxl10/75f2ca80-959a-44fb-b8c3-64c68e755347.png)',
              }"
            ></div>
            <div class="event-details">
              <p class="event-name">Puppies 101 - In-Person Seminar</p>
              <p class="event-date">Sat, Apr 2, 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.social__container {
  display: flex;
  height: 100%;
  width: 76%;
  margin: 0 auto;
  flex-grow: 1;
  flex-direction: column;
}

.social__content {
  display: flex;
  gap: 4px;
  padding: 0 24px;
  flex: 1;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Sidebar styles */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 320px;
  cursor: pointer;
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

/* Main content styles */
.main-content {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  flex: 1;
}

/* Hero section styles */
/* Hero Section */
.container {
  container-type: inline-size;
}

.hero-container {
  padding: 1rem;
}

@container (min-width: 480px) {
  .hero-container {
    padding: 1rem;
  }
}

.hero {
  display: flex;
  min-height: 480px;
  flex-direction: column;
  gap: 1.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

@container (min-width: 480px) {
  .hero {
    gap: 2rem;
    border-radius: 0.75rem;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.hero-title {
  color: white;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.033em;
}

@container (min-width: 480px) {
  .hero-title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.2;
    letter-spacing: -0.033em;
  }
}

.hero-subtitle {
  color: white;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

@container (min-width: 480px) {
  .hero-subtitle {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
}

.create-account-btn {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: var(--deongaree);
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.015em;
  border: none;
}

@container (min-width: 480px) {
  .create-account-btn {
    height: 3rem;
    padding: 0 1.25rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.015em;
  }
}

.create-account-btn span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Post Input */
.post-input-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  container-type: inline-size;
}

.post-input-label {
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  height: 100%;
  flex: 1;
}

.post-input-wrapper {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
  border-radius: 0.75rem;
  height: 100%;
}

.post-input-left {
  display: flex;
  border: 1px solid #cedde8;
  background-color: #f8fafc;
  justify-content: flex-end;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  border-right: none;
}

.user-avatar {
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1/1;
  background-size: cover;
  border-radius: 9999px;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}

.post-input-right {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.post-textarea {
  display: flex;
  flex: 1;
  resize: none;
  overflow: hidden;
  border-radius: 0.75rem;
  color: #0d151c;
  outline: none;
  border: 1px solid #cedde8;
  background-color: #f8fafc;
  border-top-left-radius: 0;
  border-left: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 22px;
}

.post-textarea::placeholder {
  color: #acc4d8;
}

.post-actions {
  display: flex;
  border: 1px solid #cedde8;
  background-color: #f8fafc;
  justify-content: flex-end;
  border-bottom-right-radius: 0.75rem;
  border-left: none;
  border-top: none;
  padding-right: 15px;
  padding-bottom: 15px;
}

.post-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
}

.post-btn {
  width: 80px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
  height: 2rem;
  background-color: var(--deongaree);
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
}

@container (min-width: 480px) {
  .post-btn {
    display: block;
  }
}

.post-btn span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Categories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  gap: 0.75rem;
  padding: 1rem;
}

.category-card {
  display: flex;
  flex: 1;
  gap: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #cedde8;
  background-color: #f8fafc;
  padding: 1rem;
  align-items: center;
}

.category-image {
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1/1;
  background-size: cover;
  border-radius: 0.5rem;
  width: 2.5rem;
  flex-shrink: 0;
}

.category-title {
  color: #0d151c;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.trending-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.trending-card:hover {
  background-color: #e9ecef;
}

.trending-card .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  color: #495057;
}

.trending-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
}

/* 章节标题样式 */
.section-title {
  margin: 24px 0 16px 0;
  font-size: 24px;
  font-weight: 700;
  color: #212529;
}

/* 事件列表样式 */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-item {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-image {
  width: 120px;
  height: 80px;
  background-size: cover;
  background-position: center;
}

.event-details {
  flex: 1;
  padding: 12px 16px;
  background-color: #ffffff;
}

.event-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
}

.event-date {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .trending-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .event-item {
    flex-direction: column;
  }

  .event-image {
    width: 100%;
    height: 120px;
  }
}
</style>
