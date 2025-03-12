<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cartStore";
import HomeHeader from "../components/Home/HomeHeader.vue";

const router = useRouter();
const cartStore = useCartStore();

// 获取购物车商品
const cartItems = computed(() => cartStore.items);

// 选中商品总价
const selectedTotal = computed(() => cartStore.selectedTotal);

// 运费计算
const shipping = computed(() => {
  return finalTotal.value > 199 ? 0 : 10;
});

// 最终总价
const finalTotal = computed(() => {
  return selectedTotal.value;
});

// 更新商品数量
const updateQuantity = (id, quantity) => {
  if (quantity < 1) return;
  cartStore.updateQuantity(id, quantity);
};

// 移除商品
const removeItem = (id) => {
  cartStore.removeItem(id);
};

const clearCart = () => {
  cartStore.clearCart();
};

// 去结算
const goToCheckout = () => {
  router.push("/checkout");
};

// 选中商品数量
// const selectedCount = computed(() => cartStore.selectedCount);

// 是否全选
// const isAllSelected = computed(() => cartStore.isAllSelected);

// 切换全选状态
// const toggleSelectAll = (e) => {
//   cartStore.isAllSelected = e.target.checked;
// };

// 切换单个商品选中状态
// const toggleItemSelect = (id) => {
//   cartStore.toggleSelect(id);
// };
</script>

<template>
  <HomeHeader></HomeHeader>
  <div class="cart-container">
    <div class="cart-header">
      <div class="header-left">
        <div class="cart-title">购物车</div>
        <div class="item-count">
          购物袋合计 ({{ cartItems.length }} 件商品) :
        </div>
        <div class="shipping-fee">
          配送费
          <span>{{ shipping > 0 ? `¥${shipping.toFixed(2)}` : "免运费" }}</span>
        </div>
        <div class="clear-cart" @click="clearCart">清空购物车</div>
      </div>
      <div class="header-right">
        <div class="total-price">¥ {{ finalTotal.toFixed(2) }}</div>
        <button class="checkout-btn" @click="goToCheckout">付款</button>
      </div>
    </div>

    <div class="cart-content">
      <!-- 左侧商品列表 -->
      <div class="cart-list-section">
        <!-- 全选区域 -->
        <!-- <div class="select-all-bar">
          <label class="checkbox-wrapper">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="toggleSelectAll"
            />
            <span class="checkbox-text">全选</span>
          </label>
          <span class="selected-count" v-if="selectedCount > 0">
            已选 {{ selectedCount }} 件
          </span>
        </div> -->

        <!-- 商品列表滚动区域 -->
        <div class="cart-items-scroll">
          <div v-if="cartItems.length > 0" class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <!-- 选择框 -->
              <!-- <div class="item-select">
                <input
                  type="checkbox"
                  :checked="item.selected"
                  @change="() => toggleItemSelect(item.id)"
                />
              </div> -->

              <!-- 商品图片 -->
              <div class="item-image">
                <img :src="item.image" :alt="item.title" />
              </div>

              <!-- 商品信息 -->
              <div class="item-info">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-id">
                  <span class="item-id-text">- 商品编号:</span>
                  {{ item.id }}
                </div>
                <div class="item-price">
                  <span class="item-id-text"
                    >- 单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 价:</span
                  >
                  ￥{{ item.price.toFixed(2) }}
                </div>

                <div class="item-total-price">
                  ￥ {{ item.quantity * item.price }}
                </div>

                <div class="item-actions">
                  <!-- 数量控制 -->
                  <div class="quantity-control">
                    <button
                      class="qty-btn minus"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="qty-display">{{ item.quantity }}</span>
                    <button
                      class="qty-btn plus"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>

                  <!-- 删除按钮 -->
                  <button class="remove-btn" @click="removeItem(item.id)">
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 空购物车状态 -->
          <div v-else class="empty-cart">
            <div class="empty-cart-content">
              <div>
                <svg
                  t="1732909998482"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3209"
                  width="100"
                  height="100"
                >
                  <path
                    d="M855.930143 390.219399 520.426927 220.999346 623.978351 94.302783c5.387707-6.592139 14.685467-8.455579 22.197558-4.447289L945.015088 249.306043c9.958816 5.313006 12.535501 18.426675 5.328355 27.113521L855.930143 390.219399 855.930143 390.219399zM415.439804 94.525863l99.281167 126.4786L182.193529 390.219399 82.559321 273.774317c-7.486508-8.750291-4.838192-22.196535 5.408173-27.453259L393.277038 89.671299C400.874063 85.773526 410.16773 87.808882 415.439804 94.525863zM509.37215 549.57478l-56.830333 160.529113c-1.352811 3.820002-5.750981 5.585205-9.368368 3.76065L131.658575 554.153052c-5.16565-2.605338-7.543813-8.68173-5.517667-14.101159l55.812143-149.306514L509.37215 549.57478 509.37215 549.57478zM506.779092 612.285031 506.779092 906.759809c0 3.888564-4.033873 6.465249-7.562233 4.830005L171.387415 757.291612c-6.221702-2.882654-10.183943-9.135054-10.136871-15.992229l0.967024-140.454916c0.029676-4.295839 4.563946-7.062859 8.398274-5.124717l279.498692 144.370085c5.1503 2.603291 11.423167 0.183172 13.489222-5.204535L506.779092 612.285031zM581.904093 711.284789 527.029298 549.57478l328.900845-158.829402 62.5895 147.423631c2.359744 5.557576-0.047072 11.989055-5.475711 14.633279L587.747171 713.722304C585.462129 714.834638 582.720691 713.690582 581.904093 711.284789zM873.742834 742.890624c0 5.89629-3.419889 11.257391-8.766664 13.743002L536.828478 911.576511c-3.52836 1.64036-7.567349-0.935302-7.567349-4.826935L529.261129 612.285031l40.581254 124.105552c1.482771 4.180206 6.28617 6.123464 10.258645 4.15053l282.95849-142.617162c4.91494-2.441609 10.683317 1.133823 10.683317 6.621814L873.742834 742.890624z"
                    fill="#272636"
                    p-id="3210"
                  ></path>
                </svg>
              </div>
              <div class="empty-cart-title">购物车列表为空</div>
              <router-link to="/" class="continue-shopping"
                >随便逛逛</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 70%;
  margin: 0 auto;
  min-height: 90vh;
  font-family: var(--ff-kai);
}

/* 购物车头部 */
.cart-header {
  height: 120px;
  margin-bottom: 10px;
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #e5e7eb;
}

.header-left {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header-left .cart-title {
  font-size: 36px;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 14px;
}

.header-left .item-count {
  font-size: 18px;
  font-weight: 600;
  color: #2a2b2c;
  font-family: var(--ff-kai);
}

.header-left .shipping-fee {
  font-size: 14px;
  color: #6b7280;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.shipping-fee span {
  color: #bdbec0;
}

.header-left .clear-cart {
  width: fit-content;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  letter-spacing: 1px;
  transition: color 0.2s ease;
}

.header-left .clear-cart:hover {
  color: #ef4444;
}

.header-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 16px;
}

.header-right .total-price {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  font-family: var(--ff-kai);
}

.header-right .checkout-btn {
  width: 250px;
  padding: 7px;
  background: #d1a2f0;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--ff-kai);
}

.header-right .checkout-btn:hover:not(:disabled) {
  background: #7b19c2;
}

.header-right .checkout-btn:disabled {
  background: #e5e7eb;
  cursor: not-allowed;
}

/* 商品列表区域 */
.cart-list-section {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

/* .select-all-bar {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #4b5563;
}

.selected-count {
  font-size: 14px;
  color: #6b7280;
} */

/* 商品列表滚动区域 */
.cart-items-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

.cart-items {
  padding: 12px 0;
}

.cart-item {
  display: grid;
  /* grid-template-columns: auto 100px 1fr; */
  grid-template-columns: 100px 1fr;
  gap: 15px;
  padding: 20px 0;
  align-items: center;
  position: relative;
}

.item-image {
  width: 100px;
  height: 120px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-title {
  font-size: 20px;
  color: #1f2937;
  font-weight: 600;
  font-family: var(--ff-kai);
}

.item-id {
  font-size: 14px;
  color: #6b7280;
}

.item-price {
  font-size: 14px;
  color: #6b7280;
}
.item-id-text {
  letter-spacing: 1px;
}

.item-actions {
  display: flex;
  align-items: center;
}

.item-total-price {
  position: absolute;
  font-size: 24px;
  font-weight: 600;
  right: 20px;
  top: calc(50% - 12px);
  font-family: var(--ff-kai);
}

/* 数量控制器 */
.quantity-control {
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.qty-btn {
  width: 25px;
  height: 25px;
  border: none;
  background: white;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.qty-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.qty-display {
  width: 50px;
  margin: 0 2px;
  text-align: center;
  background: white;
  font-size: 14px;
}

/* 删除按钮 */
.remove-btn {
  padding: 6px 15px;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  color: #ef4444;
}

.empty-cart {
  width: 100%;
  height: 100%;
}

.empty-cart-content {
  display: flex;
  width: 100%;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-cart-title {
  font-size: 22px;
  font-weight: 600;
}

.continue-shopping {
  color: #6b7280;
  text-decoration: underline;
}

.continue-shopping:hover {
  color: #ef4444;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .checkout-section {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 16px;
    background: white;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  }

  .checkout-card {
    box-shadow: none;
    padding: 0;
  }

  .cart-list-section {
    height: calc(100vh - 300px);
  }

  .cart-items-scroll {
    padding-bottom: 180px;
  }
}
</style>
