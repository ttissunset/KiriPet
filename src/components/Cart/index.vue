<template>
  <Teleport to="body">
    <div class="cart-overlay" v-if="visible" @click="closeCart"></div>
    <div class="cart-sidebar" :class="{ 'cart-open': visible }">
      <div class="cart-header">
        <h2>购物车 ({{ cartItemCount }})</h2>
        <button class="close-btn" @click="closeCart">
          <span class="material-icons-sharp close-icon">close</span>
        </button>
      </div>

      <div class="cart-content">
        <div class="cart-items">
          <div
            v-for="item in cartStore.groupedItems"
            :key="item.id"
            class="cart-item"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="item-details">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-price">$ {{ item.price.toFixed(2) }}</p>
              <div class="item-attributes">
                <p v-if="item.color">颜色: {{ item.color }}</p>
                <p v-if="item.size">尺寸: {{ item.size }}</p>
              </div>
              <div class="quantity-control">
                <span>商品数量:</span>
                <button
                  class="quantity-btn decrease"
                  @click="decreaseQuantity(item.id)"
                >
                  -
                </button>
                <span class="quantity-value">{{ item.quantity }}</span>
                <button
                  class="quantity-btn increase"
                  @click="increaseQuantity(item.id)"
                >
                  +
                </button>
              </div>
            </div>
            <button class="remove-item" @click="removeItem(item.id)">
              删除
            </button>
          </div>
        </div>

        <div v-if="cartStore.groupedItems.length === 0" class="empty-cart">
          <p>你的购物车中没有商品!!!.</p>
          <button class="continue-shopping" @click="closeCart">继续购物</button>
        </div>

        <div
          v-if="cartStore.groupedItems.length > 0"
          class="recommended-products"
        >
          <h3>为您推荐</h3>
          <div class="recommended-items">
            <div
              v-for="(product, index) in recommendedProducts"
              :key="index"
              class="recommended-item"
            >
              <div class="item-image">
                <img :src="product.image" :alt="product.title" />
              </div>
              <div class="item-info">
                <h4>{{ product.title }}</h4>
                <p class="item-attributes">颜色: {{ product.color }}</p>
                <p class="item-price">¥{{ product.price.toFixed(2) }}</p>
              </div>
              <button class="add-to-bag" @click="addToBag(product)">
                添加到购物车
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cartStore.groupedItems.length > 0" class="cart-footer">
        <div class="subtotal">
          <span>总计:</span>
          <span>$ {{ cartStore.selectedTotal.toFixed(2) }} </span>
        </div>
        <p class="shipping-note">* 运费和税费将会在结算时计算</p>
        <button class="checkout-button" @click="checkout">结算</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const cartStore = useCartStore();

// 推荐商品列表 - 扩展
const allRecommendedProducts = ref([
  {
    id: "rec-1",
    title: "宽松条纹休闲袜",
    price: 36.0,
    color: "白色",
    image: "https://picsum.photos/200/200?random=11",
    quantity: 1,
  },
  {
    id: "rec-2",
    title: "旅行装护肤套装",
    price: 60.0,
    color: "轻薄便携款",
    image: "https://picsum.photos/200/200?random=12",
    quantity: 1,
  },
  {
    id: "rec-3",
    title: "时尚保温杯",
    price: 89.0,
    color: "磨砂黑",
    image: "https://picsum.photos/200/200?random=13",
    quantity: 1,
  },
  {
    id: "rec-4",
    title: "舒适纯棉T恤",
    price: 79.0,
    color: "浅灰色",
    image: "https://picsum.photos/200/200?random=14",
    quantity: 1,
  },
  {
    id: "rec-5",
    title: "户外运动背包",
    price: 169.0,
    color: "深蓝色",
    image: "https://picsum.photos/200/200?random=15",
    quantity: 1,
  },
  {
    id: "rec-6",
    title: "防蓝光眼镜",
    price: 129.0,
    color: "透明框",
    image: "https://picsum.photos/200/200?random=16",
    quantity: 1,
  },
  {
    id: "rec-7",
    title: "无线蓝牙耳机",
    price: 249.0,
    color: "珍珠白",
    image: "https://picsum.photos/200/200?random=17",
    quantity: 1,
  },
  {
    id: "rec-8",
    title: "便携式充电宝",
    price: 119.0,
    color: "黑色",
    image: "https://picsum.photos/200/200?random=18",
    quantity: 1,
  }
]);

// 当前显示的推荐商品
const recommendedProducts = ref([]);

// 随机获取两个推荐商品
const getRandomRecommendedProducts = () => {
  // 过滤掉已经在购物车中的商品
  const availableProducts = allRecommendedProducts.value.filter(product => 
    !cartStore.items.some(item => item.id === product.id)
  );
  
  // 如果可用商品不足两个，则返回所有可用商品
  if (availableProducts.length <= 2) {
    return availableProducts;
  }
  
  // 随机选择两个商品
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

// 更新推荐商品列表
const updateRecommendedProducts = () => {
  recommendedProducts.value = getRandomRecommendedProducts();
};

// 计算购物车商品总数
const cartItemCount = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.quantity, 0);
});

// 监听购物车显示状态，控制滚动条
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = "hidden";
      // 当购物车显示时，更新推荐商品
      updateRecommendedProducts();
    } else {
      document.body.style.overflow = "";
    }
  }
);

// 关闭购物车
const closeCart = () => {
  emit("close");
};

// 增加商品数量
const increaseQuantity = (id) => {
  const item = cartStore.items.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
  }
};

// 减少商品数量
const decreaseQuantity = (id) => {
  cartStore.decreaseQuantity(id);
};

// 移除商品
const removeItem = (id) => {
  cartStore.removeItem(id);
};

// 添加商品到购物车
const addToBag = (product) => {
  cartStore.addItem({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
    image: product.image,
    color: product.color,
    selected: false,
  });
  
  // 更新推荐商品列表，替换已添加的商品
  updateRecommendedProducts();
};

// 结算
const checkout = () => {
  // 实现结算逻辑
  console.log("Checkout with items:", cartStore.groupedItems);
  // 可以导航到结算页面
  router.push("/checkout");
};

// 组件挂载时初始化推荐商品
onMounted(() => {
  updateRecommendedProducts();
});

// 在组件销毁时恢复滚动条
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -600px;
  width: 600px;
  height: 100vh;
  background: #fff;
  z-index: 1001;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.cart-open {
  right: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-header h2 {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.close-icon {
  transition: transform 0.3s ease;
}

.close-btn:hover .close-icon {
  transform: rotate(90deg);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.cart-items {
  padding: 0;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.item-image {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 5px 0;
  text-transform: uppercase;
}

.item-price {
  font-size: 16px;
  margin: 5px 0;
  font-weight: 600;
  color: var(--danger);
}

.item-attributes {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-control span {
  margin-right: 10px;
  font-size: 14px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.quantity-btn.decrease:hover {
  color: #f44336;
}

.quantity-btn.increase:hover {
  color: #4caf50;
}

.quantity-value {
  width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.remove-item {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
}

.remove-item:hover {
  transition: var(--transition-1);
  color: var(--danger);
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
}

.continue-shopping {
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
}

.recommended-products {
  padding: 20px;
  border-top: 1px solid #eee;
}

.recommended-products h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 20px 0;
  text-transform: uppercase;
}

.recommended-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.recommended-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
}

.recommended-item .item-image {
  width: 100%;
  height: auto;
  margin-right: 0;
}

.recommended-item .item-info {
  padding: 10px;
}

.recommended-item h4 {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 5px 0;
  text-transform: uppercase;
}

.add-to-bag {
  background: var(--deongaree);
  color: #fff;
  border: none;
  padding: 10px 0;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
}

.add-to-bag:hover {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-1);
}

.cart-footer {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 20px;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 500;
}

.subtotal span:last-child {
  font-size: 18px;
  font-weight: 600;
  color: var(--danger);
}

.shipping-note {
  font-size: 12px;
  color: #666;
  margin: 10px 0 20px;
  text-transform: uppercase;
}

.checkout-button {
  width: 100%;
  background: var(--deongaree);
  color: #fff;
  border: none;
  padding: 15px 0;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
}

.checkout-button:hover {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-1);
}

@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }

  .recommended-items {
    grid-template-columns: 1fr;
  }
}

/* 移动端购物车弹窗样式 */
@media screen and (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    max-width: 100%;
    height: 90vh;
    max-height: 90vh;
    position: fixed;
    top: auto;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .cart-sidebar.cart-open {
    transform: translateY(0);
  }
  
  .cart-header {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
  
  .cart-header h2 {
    font-size: 18px;
    margin: 0;
  }
  
  .cart-content {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    -webkit-overflow-scrolling: touch;
  }
  
  /* 购物车项目样式优化 */
  .cart-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    position: relative;
    padding: 15px 0;
  }
  
  .item-image {
    grid-row: span 2;
    width: 80px;
    height: 80px;
  }
  
  .item-details {
    padding-right: 25px;
  }
  
  .remove-item {
    position: absolute;
    top: 15px;
    right: 0;
    background: none;
    border: none;
    color: #999;
    font-size: 12px;
    cursor: pointer;
    padding: 5px;
  }
  
  .item-title {
    font-size: 14px;
    margin: 0 0 5px;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .item-price {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0;
  }
  
  .item-attributes {
    font-size: 12px;
    color: #666;
    margin: 5px 0;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
  
  .quantity-control span {
    font-size: 12px;
    color: #666;
    margin-right: 10px;
  }
  
  .quantity-btn {
    width: 24px;
    height: 24px;
    background: #f5f5f5;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
  }
  
  .quantity-value {
    margin: 0 8px;
  }
  
  /* 推荐产品区域优化 */
  .recommended-products {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding: 15px 5px 0; /* 减小左右内边距，增加内容区域宽度 */
  }
  
  .recommended-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px; /* 缩小间隙以增加卡片宽度 */
  }
  
  .recommended-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 5px; /* 减小底部内边距 */
    width: 100%; /* 确保宽度占满整个空间 */
  }
  
  .recommended-item .item-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    grid-row: auto;
  }
  
  .recommended-item .item-info {
    padding: 8px 8px 0; /* 减小内边距 */
  }
  
  .recommended-item h4 {
    font-size: 13px;
    margin: 0 0 3px; /* 减小下边距 */
    height: 32px; /* 适当减小高度 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .recommended-item .item-attributes {
    font-size: 12px;
    margin: 2px 0;
    color: #666;
  }
  
  .recommended-item .item-price {
    font-size: 14px;
    font-weight: bold;
    margin: 3px 0;
    color: #e53935;
  }
  
  .add-to-bag {
    margin: 5px 8px 0; /* 调整左右边距 */
    padding: 6px 0;
    background: var(--deongaree, #5661ef);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  
  /* 超小屏幕单列布局适配 */
  @media screen and (max-width: 375px) {
    .recommended-items {
      grid-template-columns: 1fr; /* 在极小屏幕上改为单列布局 */
    }
    
    .recommended-item {
      max-width: 100%;
    }
  }
  
  /* 购物车底部 */
  .cart-footer {
    padding: 15px;
    border-top: 1px solid #eee;
    background: white;
  }
  
  .subtotal {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .shipping-note {
    font-size: 12px;
    color: #666;
    margin-bottom: 15px;
  }
  
  .checkout-button {
    display: block;
    width: 100%;
    padding: 12px 0;
    background: var(--deongaree, #5661ef);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
  }
  
  /* 增加底部安全区域间距 (对iPhone X及以上机型) */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .cart-footer {
      padding-bottom: calc(15px + env(safe-area-inset-bottom));
    }
  }
  
  /* 空购物车状态 */
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    text-align: center;
  }
  
  .empty-cart p {
    margin-bottom: 20px;
    color: #666;
  }
  
  .continue-shopping {
    padding: 10px 20px;
    background: var(--deongaree, #5661ef);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
