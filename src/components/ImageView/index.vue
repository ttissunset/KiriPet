<script setup>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

// pinias的props适配图片列表
// defineProps({
//   imageList: {
//     type: Array,
//     default: () => [],
//   },
// });

// 图片列表
const imageList = [
  "https://img.alicdn.com/imgextra/i4/3076702445/O1CN01xiUuFU1TvrNZFYiv6_!!3076702445.jpg_q50.jpg_.webp",
  "https://img.alicdn.com/imgextra/i2/3076702445/O1CN010dnpYl1TvrNRzw5IO_!!3076702445.jpg_q50.jpg_.webp",
  "https://img.alicdn.com/imgextra/i1/3076702445/O1CN01z7Yl8X1TvrNX75kg4_!!3076702445.jpg_q50.jpg_.webp",
  "https://img.alicdn.com/imgextra/i4/3076702445/O1CN01WApn6Y1TvrNYdFIu0_!!3076702445.jpg_q50.jpg_.webp",
  "https://img.alicdn.com/imgextra/i1/3076702445/O1CN01SdxCQs1TvrNaGmVmo_!!3076702445.jpg_q50.jpg_.webp",
];

// 1.小图切换大图显示
const activeIndex = ref(0);
const enterhandler = (i) => {
  activeIndex.value = i;
};
// 2.获取鼠标相对位置
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

// 3.控制滑块跟随鼠标移动
const left = ref(0);
const top = ref(0);

const positionX = ref(0);
const positionY = ref(0);
watch([elementX, elementY, isOutside], () => {
  // 如果鼠标没有进入盒子中，不执行后面的逻辑
  if (isOutside.value) return;
  // 有效范围内控制滑块运动
  //横向
  if (elementX.value > 100 && elementX.value < 500) {
    left.value = elementX.value - 100;
  }
  //纵向
  if (elementY.value > 100 && elementY.value < 500) {
    top.value = elementY.value - 100;
  }

  // 处理边界
  if (elementX > 600) {
    left.value = 200;
  }
  if (elementX > 100) {
    left.value = 0;
  }
  if (elementY > 600) {
    top.value = 200;
  }
  if (elementY > 100) {
    top.value = 0;
  }

  // 处理放大效果
  //! 放大镜的背景图和滑块反方向移动
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <!-- 小图列表 -->
    <div class="small">
      <div
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="enterhandler(i)"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" alt="" />
      </div>
    </div>
    <!-- 放大镜大图 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped>
.goods-image {
  position: relative;
  display: flex;
}

.middle img {
  width: 600px;
  height: 600px;
  background: #f5f5f5;
}

.large {
  position: absolute;
  top: 0;
  left: 412px;
  width: 400px;
  height: 400px;
  z-index: 500;
  margin-left: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  /* 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position */
  background-size: 1200px 1200px;
  background-color: #f8f8f8;
}

.layer {
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.2);
  /* 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来 */
  left: 0;
  top: 0;
  position: absolute;
}

.small {
  width: 80px;
}

.small img {
  width: 105px;
  height: 105px;
  margin-left: 12px;
  margin-bottom: 14px;
  cursor: pointer;

  &:hover,
  &.active {
    border: 2px solid var(--success);
  }
}
</style>
