<template>
  <!-- 浮动形状和光效组件 -->
  <div>
    <!-- 添加浮动形状 -->
    <div class="floating-shapes">
      <div v-if="showDogPaw" class="shape paw-print rabbit-paw" :style="dogPawPosition"></div>
      <div v-if="showCatPaw" class="shape paw-print rabbit-paw" :style="catPawPosition"></div>
      <div v-if="showBirdPrint" class="shape paw-print rabbit-paw" :style="birdPrintPosition"></div>
      <div v-if="showRabbitPaw" class="shape paw-print rabbit-paw" :style="rabbitPawPosition"></div>
    </div>

    <!-- 添加光效 -->
    <div v-if="showLightEffect" class="light-effect" :style="lightEffectPosition"></div>
  </div>
</template>

<script setup>
// 组件的可配置参数
const props = defineProps({
  // 颜色相关属性
  shapesColor: {
    type: String,
    default: 'rgba(139, 152, 228, 0.1)'
  },
  lightColor: {
    type: String,
    default: 'rgba(139, 152, 228, 0.2)'
  },
  // 显示控制
  showDogPaw: {
    type: Boolean,
    default: true
  },
  showCatPaw: {
    type: Boolean,
    default: true
  },
  showBirdPrint: {
    type: Boolean,
    default: true
  },
  showRabbitPaw: {
    type: Boolean,
    default: true
  },
  showLightEffect: {
    type: Boolean,
    default: true
  },
  // 位置自定义
  dogPawPosition: {
    type: Object,
    default: () => ({ top: '15%', left: '10%' })
  },
  catPawPosition: {
    type: Object,
    default: () => ({ top: '60%', left: '20%' })
  },
  birdPrintPosition: {
    type: Object,
    default: () => ({ top: '20%', right: '15%' })
  },
  rabbitPawPosition: {
    type: Object,
    default: () => ({ top: '70%', right: '10%' })
  },
  // 光效位置
  lightEffectPosition: {
    type: Object,
    default: () => ({ top: '-350px', left: '-350px' })
  }
});
</script>

<style scoped lang="scss">
/* 使用will-change优化transform动画 */
.floating-shapes .shape {
  will-change: transform;
}

/* 浮动形状的样式 */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.shape {
  position: absolute;
  background-color: v-bind(shapesColor);
  animation: float 15s infinite ease-in-out;
}

/* 动物爪印的基本样式 */
.paw-print {
  background-color: v-bind(shapesColor);
  position: absolute;
}

/* 狗爪印 */
.dog-paw {
  width: 100px;
  height: 100px;
  animation-delay: 0s;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm-29.9-32c15.5 0 28.1-12.6 28.1-28.1 0-29.9-28.1-44.1-28.1-44.1s-28.1 14.2-28.1 44.1c0 15.5 12.6 28.1 28.1 28.1zm-73.8 0c15.5 0 28.1-12.6 28.1-28.1C180.4 70 152.3 55.8 152.3 55.8s-28.1 14.2-28.1 44.1c0 15.5 12.6 28.1 28.1 28.1zm188.4 0c15.5 0 28.1-12.6 28.1-28.1 0-29.9-28.1-44.1-28.1-44.1s-28.1 14.2-28.1 44.1c0 15.5 12.6 28.1 28.1 28.1zm73.8 0c15.5 0 28.1-12.6 28.1-28.1 0-29.9-28.1-44.1-28.1-44.1s-28.1 14.2-28.1 44.1c0 15.5 12.6 28.1 28.1 28.1zm-168.7 312.8c-.4.3-.7.7-1 1-11.5 9.5-27.2 13.2-42 11.2-32.8-4.4-61.9-25-76.4-55.8-3.1-6.6-8.2-12.3-14.6-16-43.6-25-69.8-73.8-66.6-125.5 1.2-19.3-10.5-37.1-28.9-43.3-30.3-10.1-55.3-33.4-67.6-64.3-13.9-34.6-5.2-74.4 23.2-101.4 16.5-15.7 22.9-38.9 16.6-60.5-8.5-29.1 1.1-60.4 24.7-80.5C96.1.4 119.9-3.5 142.3 3.1c18.3 5.4 38.1-.3 52.2-15.1C211.2-28.6 241.6-39.1 271.9-34c13.6 2.3 25.4 9 33.8 19.1 7.3 8.9 18.1 14 29.4 14 18.4 0 35.8 9.3 45.9 24.8 12.5 19.1 36.3 28.1 57.8 21.9 20.5-5.9 42.9-1.9 60.2 10.5 23.5 16.8 33.1 47.4 23.3 74.6-4.3 11.8-3.4 24.9 2.7 36 14.4 26.5 18.8 58.2 11.6 88.8-8.9 38.2-34.4 69.2-69.6 85.4-11.3 5.2-18.6 16.4-19.3 28.8-1.9 32.7-13.8 64.1-35.2 88.9-18.1 21-43.3 34.3-70.5 37.2-14.7 1.6-27.9 9.8-35.2 22.4-2.3 3.9-5.9 7-10 8.9-6.5 3-13.4 4.9-20.5 5.6-1.8.2-3.7.3-5.5.3-11.2 0-22-3.9-30.7-11z'/%3E%3C/svg%3E");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* 猫爪印 */
.cat-paw {
  width: 150px;
  height: 150px;
  animation-delay: 2s;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M378.9 39.8C346.1 13.3 300.9 0 256 0s-90.1 13.3-122.9 39.8c-21.9 17.7-36.3 40.1-42.7 65.5C53.6 137.7 32 184.3 32 233.4c0 23.4 5.8 47.8 17.2 72.4 10.2 22 24.9 42.2 42.3 58.6 15.1 14.2 22.9 34.5 21.1 54.9l-5.9 65.9c-1.6 17.8 3.5 35.7 14.1 49.4C131.8 549 151.8 559 172.9 559h166.2c21.1 0 41.1-10 52.2-24.4 10.7-13.8 15.8-31.6 14.1-49.4l-5.9-65.9c-1.7-20.4 6-40.7 21.1-54.9 17.4-16.4 32.1-36.6 42.3-58.6C473.3 281.2 479 256.8 479 233.4c0-49.1-21.6-95.7-58.4-128.1-6.4-25.5-20.8-47.8-42.7-65.5zM416.1 294.3c-8.2 17.7-19.9 33.1-33.9 44.8-24 22.6-36 54.9-32.7 87.1l5.9 65.9c.4 4.6-.9 9.1-3.5 12.5-2.4 3.1-5.8 4.7-9.9 4.7H172.9c-4.1 0-7.5-1.6-9.9-4.7-2.6-3.4-3.9-7.9-3.5-12.5l5.9-65.9c3.4-32.1-8.7-64.5-32.7-87.1-14-11.7-25.7-27.1-33.9-44.8-8.4-18.3-12.8-36.1-12.8-53.1 0-36.5 16.1-70.8 45.1-97.6 4.7-4.3 8.2-9.7 10.1-15.8 8.1-25.5 45.6-79 113.8-79s105.7 53.5 113.8 79c1.9 6.1 5.4 11.5 10.1 15.8 29 26.8 45.1 61.1 45.1 97.6 0 17-4.4 34.8-12.8 53.1zM303.3 180.9c-1.1-23.4-21.1-42.1-45.3-42.1-24.2 0-44.2 18.7-45.3 42.1-1.3 27 19.6 49.1 45.3 49.1s46.6-22.1 45.3-49.1zm-111.9 64.8c11.7-.4 20.8-10.3 20.4-22-2.4-69.3-93.2-69.3-95.6 0-.4 11.7 8.7 21.6 20.4 22 11.5.4 21.3-8.7 22-20 .9-15.6 31.1-15.6 32.8 0 .7 11.3 10.5 20.4 22 20zm209.5-22c-.4 11.7 8.7 21.6 20.4 22 11.5.4 21.3-8.7 22-20 .9-7.8 7.7-12 16.4-12s15.5 4.2 16.4 12c.7 11.3 10.5 20.4 22 20 11.7-.4 20.8-10.3 20.4-22-2.4-69.3-93.2-69.3-95.6 0z'/%3E%3C/svg%3E");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* 鸟爪印 */
.bird-print {
  width: 120px;
  height: 120px;
  animation-delay: 4s;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M80 320c8.8 0 16 7.2 16 16v32c0 77.4 55 142 128 156.8V480h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16v44.8c73-14.8 128-79.4 128-156.8v-32c0-8.8 7.2-16 16-16s16 7.2 16 16v32c0 88.4-67.6 160.7-154 168.3-5.7.5-11.5.8-17.2 1-2.9.1-5.8.7-8.8.7s-5.9-.6-8.8-.7c-5.7-.2-11.5-.5-17.2-1C119.6 512.7 52 440.4 52 352v-32c0-8.8 7.2-16 16-16h12zm80-112c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm96-32c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zM360 320c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zM144 168c0-13.3 10.7-24 24-24s24 10.7 24 24-10.7 24-24 24-24-10.7-24-24z'/%3E%3C/svg%3E");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* 兔爪印 */
.rabbit-paw {
  width: 80px;
  height: 80px;
  animation-delay: 6s;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z'/%3E%3C/svg%3E");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* 光效样式 */
.light-effect {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    v-bind(lightColor) 0%,
    rgba(139, 152, 228, 0) 70%
  );
  z-index: -1;
}

/* 媒体查询 - 小屏手机 */
@media screen and (max-width: 576px) {
  .shape {
    display: none;
  }
  
  .light-effect {
    display: none;
  }
}
</style> 