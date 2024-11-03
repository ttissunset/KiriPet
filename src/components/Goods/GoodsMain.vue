<script setup></script>

<template>
  <div class="goods-main-container">
    <div class="goods-main">
      <!-- 图片展示 -->
      <div class="descrip-img">
        <ImageView></ImageView>
      </div>
      <!-- 商品信息 -->
      <div class="goods-description">
        <div class="goods-description-top">
          <div class="goods-name">爱立方®冻干生骨肉</div>
          <div class="goods-price">$15.99</div>
        </div>
        <div class="goods-description-sub">
          <div>
            保持食材天然结构和益生菌活性，有效促进消化吸收
            不损坏原料中氨基酸，维生素等营养元素，确保营养丰富均衡
            复水后就如自制熬出来的汤汁一般，新鲜有味，摈弃自制的麻烦
          </div>
          <div>
            原料：
            新鲜鸡胸肉、鸡肝脏、鸡心、鸡蛋、珍珠粉、DHA、EPA、牛磺酸、亚麻油、亚油酸、矿物质（磷酸钙、葡萄糖酸锌、天冬氨酸亚铁等）、维生素（复合B族、D、E、K）、肠道益生菌（保加利亚乳杆菌、嗜热链球菌、双歧杆菌、枯草芽孢杆菌）等
          </div>
          <div>
            营养成分： 粗蛋白≥80% 粗脂肪≥11% 粗纤维≤1% 水分≤5% 粗灰份≤6% 牛磺酸≥
            0.2 %
          </div>
        </div>
        <div class="add-to-cart">
          <button>加入购物车</button>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="detail">
        <div class="detail-title">每一颗冻干生骨肉都完美锁鲜</div>
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/61.png"
          class="detail-img"
        />
      </div>
      <div class="detail">
        <div class="detail-title">5倍鲜肉制成，再挑食也能满足</div>
        <img
          src="https://kiripet.tos-cn-beijing.volces.com/image/50.png"
          class="detail-img"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.goods-main-container {
  width: 76%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.goods-main {
  display: flex;
  width: 100%;
  height: 68vh;
  /* border-bottom: 1px dashed #b6b2b2; */
}

.descrip-img {
  width: 50%;
  height: 60vh;
}

.goods-description {
  margin-left: 50px;
  width: 50%;
  height: 60vh;
}

.goods-description .goods-description-top {
  border-bottom: 2px dashed #b6b2b2;
  font-family: var(--ff-llt);
  margin-top: 30px;
}

.goods-description .goods-description-top .goods-name {
  font-size: var(--fs-40);
  font-weight: var(--fw-500);
}

.goods-description .goods-description-top .goods-price {
  font-size: var(--fs-30);
  margin: 20px 0;
  font-weight: var(--fw-500);
  color: var(--danger);
}

.goods-description-sub {
  height: 35vh;
  font-size: var(--fs-18);
  font-family: var(--ff-llt);
  color: var(--dark-gray);
}

.goods-description-sub div {
  margin-top: 30px;
}
.add-to-cart button {
  width: 200px;
  height: 50px;
  border-radius: var(--radius-8);
  font-size: var(--fs-16);
  letter-spacing: 2px;
  color: #fff;
  background-color: var(--deongaree);
}

.add-to-cart button:hover {
  background-color: var(--youth-green);
  transition: var(--transition-3);
}

.goods-detail {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--ff-llt);
}

.goods-detail .detail {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.goods-detail .detail .detail-img {
  width: 80%;
  height: 80%;
}

.goods-detail .detail .detail-title {
  font-size: var(--fs-40);
  margin-bottom: 50px;
}
</style>
