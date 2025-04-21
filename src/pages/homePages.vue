<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeMain from "../components/Home/HomeMain.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import Notification from "@/components/Notify/notification.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 显示通知的方法
const showNotification = (message, type = 'info') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

onMounted(() => {
  // 检查是否从登录页跳转而来
  if (route.query.login === 'success') {
    showNotification('登录成功，欢迎回来！', 'success');
  }
});
</script>

<template>
  <div class="container">
    <HomeHeader></HomeHeader>
    <HomeMain></HomeMain> 
    <HomeFooter></HomeFooter>
    <Notification />
  </div>
</template>

<style scoped></style>
