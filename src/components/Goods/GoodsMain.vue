<script setup></script>

<template>
  <div class="Goods-main-container">
    <div class="goods-main">
      <!-- 图片展示 -->
      <div class="descrip-img">
        <ImageView></ImageView>
      </div>
      <!-- 商品信息 -->
      <div class="descrip-description">
        <div class="descrip-description-top">
          <div class="goods-name">爱立方鸡肉冻干</div>
          <div class="goods-price">$19.99</div>
        </div>
        <div class="descrip-description-sub">11111</div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="main-detail"></div>
  </div>
</template>

<style scoped>
.goods-main {
  display: flex;
  width: 76%;
  height: 80vh;
  margin: 0 auto;
}

.descrip-img {
  width: 50%;
  height: 60vh;
}

.descrip-description {
  margin-left: 50px;
  width: 50%;
  height: 60vh;
}

.descrip-description-top {
  border-bottom: 1px solid #ddd;
}

.goods-name {
  font-size: 40px;
  font-weight: normal;
}

.goods-price {
  font-size: 35px;
  margin: 30px 0;
  font-weight: normal;
}

.descrip-description-sub {
  margin-top: 30px;
}
</style>
