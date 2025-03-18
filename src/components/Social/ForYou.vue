<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="social__content">
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
            <p class="event-name">狗狗训练基础课程 - 在线观看</p>
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
              关注你的猫咪是否健康 - 在线问答
            </p>
            <p class="event-date">Sun, Mar 27, 3:00 PM</p>
          </div>
        </div>
        <!-- <div class="event-item">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.social__content {
  display: flex;
  gap: 4px;
  padding: 0 24px;
  flex: 1;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Main content styles */
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

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
