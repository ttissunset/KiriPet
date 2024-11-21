<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="chat-main">
    <div class="welcome-message">
      <h2></h2>
      <p>请从左侧选择一个联系人开始聊天</p>
      <div class="back" @click="router.push('/home')">
        返回首页<i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-main {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;

  .welcome-message {
    text-align: center;

    h2 {
      margin: 0 0 8px;
      color: var(--text-primary);
      font-size: 24px;
    }

    p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .back {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        color: var(--red);
        cursor: pointer;
        transition: var(--transition-3);
      }

      i {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
