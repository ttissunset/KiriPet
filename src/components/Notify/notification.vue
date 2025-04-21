<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

const notifications = ref([]);
const notificationTimeout = 2000; // 通知显示时间，毫秒
const timers = reactive({}); // 存储计时器ID

// 添加通知
const addNotification = (message, type = 'success') => {
  const id = Date.now();
  notifications.value.push({ id, message, type, progress: 0 });
  
  // 创建倒计时动画
  let startTime = Date.now();
  const animateProgress = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(100, (elapsed / notificationTimeout) * 100);
    
    // 更新进度
    const index = notifications.value.findIndex(notification => notification.id === id);
    if (index !== -1) {
      notifications.value[index].progress = progress;
    }
    
    if (progress < 100) {
      // 继续动画
      timers[id] = requestAnimationFrame(animateProgress);
    } else {
      // 动画结束，移除通知
      removeNotification(id);
    }
  };
  
  // 启动动画
  timers[id] = requestAnimationFrame(animateProgress);
  
  return id;
};

// 移除通知
const removeNotification = (id) => {
  // 取消计时器
  if (timers[id]) {
    cancelAnimationFrame(timers[id]);
    delete timers[id];
  }
  
  const index = notifications.value.findIndex(notification => notification.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

// 监听自定义事件
const handleShowNotification = (event) => {
  const { message, type } = event.detail;
  addNotification(message, type);
};

// 暂停计时器（鼠标悬停时）
const pauseTimer = (id) => {
  if (timers[id]) {
    cancelAnimationFrame(timers[id]);
    delete timers[id];
  }
};

// 恢复计时器（鼠标离开时）
const resumeTimer = (notification) => {
  const remainingTime = notificationTimeout * (1 - notification.progress / 100);
  const startTime = Date.now() - (notificationTimeout - remainingTime);
  
  const animateProgress = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(100, (elapsed / notificationTimeout) * 100);
    
    // 更新进度
    const index = notifications.value.findIndex(item => item.id === notification.id);
    if (index !== -1) {
      notifications.value[index].progress = progress;
    }
    
    if (progress < 100) {
      // 继续动画
      timers[notification.id] = requestAnimationFrame(animateProgress);
    } else {
      // 动画结束，移除通知
      removeNotification(notification.id);
    }
  };
  
  // 启动动画
  timers[notification.id] = requestAnimationFrame(animateProgress);
};

// 组件挂载时添加事件监听
onMounted(() => {
  document.addEventListener('show-notification', handleShowNotification);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('show-notification', handleShowNotification);
  
  // 清除所有计时器
  Object.keys(timers).forEach(id => {
    cancelAnimationFrame(timers[id]);
  });
});

// 暴露方法给父组件
defineExpose({
  addNotification
});
</script>

<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div 
        v-for="notification in notifications" 
        :key="notification.id" 
        class="notification"
        :class="[`notification-${notification.type}`]"
        @mouseenter="pauseTimer(notification.id)"
        @mouseleave="resumeTimer(notification)"
      >
        <div class="notification-content">
          <span class="notification-icon" v-if="notification.type === 'success'">
            <span class="material-icons-sharp">check_circle</span>
          </span>
          <span class="notification-icon" v-else-if="notification.type === 'error'">
            <span class="material-icons-sharp">error</span>
          </span>
          <span class="notification-icon" v-else-if="notification.type === 'warning'">
            <span class="material-icons-sharp">warning</span>
          </span>
          <span class="notification-icon" v-else-if="notification.type === 'info'">
            <span class="material-icons-sharp">info</span>
          </span>
          <span class="notification-message">{{ notification.message }}</span>
        </div>
        <button class="notification-close" @click="removeNotification(notification.id)">
          <span class="material-icons-sharp">close</span>
        </button>
        <div class="notification-progress-container">
          <div 
            class="notification-progress" 
            :style="{ width: `${notification.progress}%` }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.notification {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slide-in 0.3s ease forwards;
  overflow: hidden;
  position: relative;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  padding-right: 35px; /* 为关闭按钮留出空间 */
}

.notification-icon {
  display: flex;
  align-items: center;
}

.notification-success {
  border-left: 4px solid #4CAF50;
}

.notification-error {
  border-left: 4px solid #F44336;
}

.notification-warning {
  border-left: 4px solid #FF9800;
}

.notification-info {
  border-left: 4px solid #2196F3;
}

.notification-success .notification-icon {
  color: #4CAF50;
}

.notification-error .notification-icon {
  color: #F44336;
}

.notification-warning .notification-icon {
  color: #FF9800;
}

.notification-info .notification-icon {
  color: #2196F3;
}

.notification-message {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
}

.notification-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.notification-close:hover {
  color: #333;
}

/* 倒计时进度条 */
.notification-progress-container {
  height: 3px;
  width: 100%;
  background: #f0f0f0;
  position: relative;
}

.notification-progress {
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: width 0.1s linear;
}

.notification-success .notification-progress {
  background: #4CAF50;
}

.notification-error .notification-progress {
  background: #F44336;
}

.notification-warning .notification-progress {
  background: #FF9800;
}

.notification-info .notification-progress {
  background: #2196F3;
}

/* 动画 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
