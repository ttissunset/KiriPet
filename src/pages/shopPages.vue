<script setup>
import { ref, onMounted, computed } from 'vue';
import HomeHeader from "../components/Home/HomeHeader.vue";
import notification from "@/components/Notify/notification.vue";

// 商品分类
const categories = ref([
  { id: 1, name: '狗狗食品', icon: 'restaurant' },
  { id: 2, name: '猫咪食品', icon: 'set_meal' },
  { id: 3, name: '宠物玩具', icon: 'toys' },
  { id: 4, name: '宠物服饰', icon: 'checkroom' },
  { id: 5, name: '宠物用品', icon: 'pets' },
  { id: 6, name: '保健护理', icon: 'healing' },
  { id: 7, name: '美容清洁', icon: 'shower' },
  { id: 8, name: '出行装备', icon: 'luggage' }
]);

// 商品列表
const products = ref([
  {
    id: 1,
    name: '皇家狗粮 幼犬全犬种',
    price: 239.00,
    originalPrice: 299.00,
    discount: '8折',
    image: '/src/assets/image/cat-1.jpg',
    category: 1,
    sales: 2145,
    rating: 4.9,
    tags: ['幼犬', '营养均衡', '促进发育'],
    isNew: true,
    stock: 86
  },
  {
    id: 2,
    name: '猫家猫粮 成猫海洋鱼味',
    price: 119.00,
    originalPrice: 159.00,
    discount: '7.5折',
    image: '/src/assets/image/cat-10.jpg',
    category: 2,
    sales: 3340,
    rating: 4.8,
    tags: ['成猫', '海洋鱼味', '毛发亮丽'],
    isNew: false,
    stock: 153
  },
  {
    id: 3,
    name: '互动猫玩具 电动逗猫棒',
    price: 49.90,
    originalPrice: 69.90,
    discount: '7折',
    image: '/src/assets/image/cat-11.jpg',
    category: 3,
    sales: 5678,
    rating: 4.7,
    tags: ['电动', '互动', '减压'],
    isNew: true,
    stock: 42
  },
  {
    id: 4,
    name: '狗狗牵引绳 伸缩可调节',
    price: 59.00,
    originalPrice: 79.00,
    discount: '7.5折',
    image: '/src/assets/image/doctor-1.jpg',
    category: 8,
    sales: 2897,
    rating: 4.6,
    tags: ['伸缩', '舒适', '反光'],
    isNew: false,
    stock: 76
  },
  {
    id: 5,
    name: '宠物洗澡刷 硅胶按摩梳',
    price: 29.90,
    originalPrice: 39.90,
    discount: '7.5折',
    image: '/src/assets/image/doctor-2.jpg',
    category: 7,
    sales: 4562,
    rating: 4.8,
    tags: ['舒适', '按摩', '耐用'],
    isNew: false,
    stock: 125
  },
  {
    id: 6,
    name: '猫咪窝垫 四季通用',
    price: 89.00,
    originalPrice: 129.00,
    discount: '6.9折',
    image: '/src/assets/image/cat-1.jpg',
    category: 5,
    sales: 3456,
    rating: 4.9,
    tags: ['舒适', '保暖', '易清洗'],
    isNew: true,
    stock: 58
  },
  {
    id: 7,
    name: '狗狗钙片 健骨补钙',
    price: 68.00,
    originalPrice: 88.00,
    discount: '7.7折',
    image: '/src/assets/image/doctor-2.png',
    category: 6,
    sales: 1987,
    rating: 4.7,
    tags: ['补钙', '促进发育', '易吸收'],
    isNew: false,
    stock: 93
  },
  {
    id: 8,
    name: '宠物冬季保暖衣',
    price: 79.00,
    originalPrice: 109.00,
    discount: '7.2折',
    image: '/src/assets/image/cat-10.jpg',
    category: 4,
    sales: 2765,
    rating: 4.8,
    tags: ['保暖', '舒适', '可爱'],
    isNew: true,
    stock: 67
  },
  {
    id: 9,
    name: '猫砂盆全封闭除臭型',
    price: 129.00,
    originalPrice: 169.00,
    discount: '7.6折',
    image: '/src/assets/image/cat-11.jpg',
    category: 5,
    sales: 3987,
    rating: 4.9,
    tags: ['封闭式', '除臭', '易清理'],
    isNew: false,
    stock: 43
  },
  {
    id: 10,
    name: '狗狗磨牙玩具',
    price: 39.90,
    originalPrice: 59.90,
    discount: '6.7折',
    image: '/src/assets/image/08.jpg',
    category: 3,
    sales: 5342,
    rating: 4.7,
    tags: ['耐咬', '磨牙', '洁齿'],
    isNew: false,
    stock: 106
  },
  {
    id: 11,
    name: '猫咪零食罐头',
    price: 15.90,
    originalPrice: 19.90,
    discount: '8折',
    image: '/src/assets/image/cat-1.jpg',
    category: 2,
    sales: 8769,
    rating: 4.8,
    tags: ['鲜肉', '开胃', '营养'],
    isNew: true,
    stock: 215
  },
  {
    id: 12,
    name: '狗狗鸡肉干零食',
    price: 29.90,
    originalPrice: 39.90,
    discount: '7.5折',
    image: '/src/assets/image/a1.png',
    category: 1,
    sales: 7654,
    rating: 4.9,
    tags: ['鸡肉', '低脂', '营养'],
    isNew: false,
    stock: 187
  }
]);

// 当前选择的分类
const selectedCategory = ref(0); // 0表示全部

// 搜索关键词
const searchQuery = ref('');

// 排序方式
const sortOption = ref('default'); // default, priceAsc, priceDesc, salesDesc, ratingDesc

// 筛选后的商品
const filteredProducts = computed(() => {
  let result = [...products.value];
  
  // 应用分类筛选
  if (selectedCategory.value !== 0) {
    result = result.filter(product => product.category === selectedCategory.value);
  }
  
  // 应用搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // 应用排序
  switch(sortOption.value) {
    case 'priceAsc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'salesDesc':
      result.sort((a, b) => b.sales - a.sales);
      break;
    case 'ratingDesc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // 默认排序，不做处理
      break;
  }
  
  return result;
});

// 购物车数量
const cartCount = ref(0);

// 添加到购物车
function addToCart(product) {
  cartCount.value++;
  showNotification(`已将 ${product.name} 添加到购物车`);
}

// 显示通知
function showNotification(message) {
  // 这里应该调用通知组件显示消息
  console.log(message);
}

// 切换分类
function selectCategory(categoryId) {
  selectedCategory.value = categoryId;
}

// 跳转到商品详情
function goToProductDetail(productId) {
  // 实际项目中跳转到商品详情页
  console.log(`跳转到商品ID:${productId}的详情页`);
}

// 模拟获取数据
onMounted(() => {
  // 实际项目中可能从API获取数据
  console.log('商城页面加载完成');
});
</script>

<template>
  <div class="shop-container">
    <HomeHeader></HomeHeader>
    <notification></notification>
    
    <!-- 英雄区域（首屏） -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>宠物商城</h1>
        <p>为您的爱宠挑选品质优选</p>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="搜索商品..."
            v-model="searchQuery"
            class="search-input"
          >
          <button class="search-button">
            <span class="material-icons-sharp">search</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 分类导航 -->
    <section class="category-section">
      <div class="container">
        <div class="categories">
          <button 
            class="category-button"
            :class="{ active: selectedCategory === 0 }"
            @click="selectCategory(0)"
          >
            全部
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="category-button"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <span class="category-icon material-icons-sharp">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </button>
        </div>
      </div>
    </section>
    
    <!-- 商品区域 -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2>商品</h2>
          <div class="sorting">
            <select v-model="sortOption" class="sort-select">
              <option value="default">默认排序</option>
              <option value="priceAsc">价格: 低 - 高</option>
              <option value="priceDesc">价格: 高 - 低</option>
              <option value="salesDesc">销量优先</option>
              <option value="ratingDesc">好评优先</option>
            </select>
          </div>
        </div>
        
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
          >
            <div class="product-image" @click="goToProductDetail(product.id)">
              <img :src="product.image" :alt="product.name">
              <div class="product-badges">
                <span class="discount-badge" v-if="product.discount">{{ product.discount }}</span>
                <span class="new-badge" v-if="product.isNew">新品</span>
              </div>
            </div>
            
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              
              <div class="product-price">
                <span class="current-price">¥{{ product.price.toFixed(2) }}</span>
                <span class="original-price">¥{{ product.originalPrice.toFixed(2) }}</span>
              </div>
              
              <div class="product-meta">
                <div class="rating">
                  <span class="material-icons-sharp">star</span>
                  <span>{{ product.rating }}</span>
                </div>
                <div class="sales">{{ product.sales }}人已购</div>
              </div>
              
              <div class="product-tags">
                <span v-for="(tag, index) in product.tags.slice(0, 3)" :key="index" class="tag">
                  {{ tag }}
                </span>
              </div>
              
              <button class="add-to-cart" @click="addToCart(product)">
                <span class="material-icons-sharp">add</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div class="empty-state" v-if="filteredProducts.length === 0">
          <div class="empty-icon">
            <span class="material-icons-sharp">search_off</span>
          </div>
          <p>未找到商品</p>
          <button @click="searchQuery = ''; selectedCategory = 0" class="reset-button">
            重置筛选
          </button>
        </div>
      </div>
    </section>
    
    <!-- 悬浮购物车按钮 -->
    <div class="cart-button" v-show="cartCount > 0">
      <span class="material-icons-sharp">shopping_bag</span>
      <span class="cart-count">{{ cartCount }}</span>
    </div>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>© 2024 KiriPet 宠物商城. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ===== 基础样式 ===== */
.shop-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

section {
  margin: 80px 0;
}

h1, h2, h3 {
  font-weight: 500;
  letter-spacing: -0.02em;
}

/* ===== 英雄区域 ===== */
.hero-section {
  height: 70vh;
  min-height: 500px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  width: 90%;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 16px;
  color: #000;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #666;
}

.search-container {
  display: flex;
  margin: 0 auto;
  max-width: 500px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.search-input {
  flex: 1;
  border: none;
  background: #fff;
  padding: 0 24px;
  font-size: 1rem;
  outline: none;
}

.search-button {
  width: 60px;
  background: #000;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-button:hover {
  background: #333;
}

/* ===== 分类导航 ===== */
.category-section {
  margin-top: -50px;
  position: relative;
  z-index: 3;
}

.categories {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 8px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.categories::-webkit-scrollbar {
  display: none;
}

.category-button {
  background: white;
  border: 1px solid #eee;
  border-radius: 100px;
  padding: 12px 24px;
  min-width: 100px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.category-button:hover, .category-button.active {
  background: #000;
  color: white;
}

.category-icon {
  font-size: 1.2rem;
}

/* ===== 商品区域 ===== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2rem;
  color: #000;
}

.sort-select {
  background: white;
  border: 1px solid #eee;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.sort-select:focus {
  border-color: #000;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 280px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  cursor: pointer;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.discount-badge, .new-badge {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  font-weight: 500;
}

.discount-badge {
  background: #000;
  color: white;
}

.new-badge {
  background: white;
  color: #000;
}

.product-info {
  padding: 24px;
  position: relative;
}

.product-name {
  font-size: 1rem;
  color: #000;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 0.85rem;
  color: #666;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating .material-icons-sharp {
  font-size: 1rem;
  color: #000;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tag {
  padding: 4px 12px;
  background: #f2f2f2;
  border-radius: 100px;
  font-size: 0.75rem;
  color: #666;
}

.add-to-cart {
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #000;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart:hover {
  transform: scale(1.1);
  background: #333;
}

.add-to-cart .material-icons-sharp {
  font-size: 1.5rem;
}

/* ===== 空状态 ===== */
.empty-state {
  padding: 80px 0;
  text-align: center;
  color: #666;
}

.empty-icon {
  margin-bottom: 24px;
}

.empty-icon .material-icons-sharp {
  font-size: 4rem;
  color: #ddd;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 32px;
}

.reset-button {
  background: #000;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 100px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover {
  background: #333;
  transform: translateY(-2px);
}

/* ===== 购物车按钮 ===== */
.cart-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  background: #000;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.cart-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 22px;
  height: 22px;
  background: white;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* ===== 页脚 ===== */
.footer {
  background: #f2f2f2;
  padding: 40px 0;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 80px;
  border-top: 1px solid #eee;
}

/* ===== 响应式调整 ===== */
@media (max-width: 1024px) {
  .container {
    padding: 0 30px;
  }
  
  section {
    margin: 60px 0;
  }
  
  .products-grid {
    gap: 30px;
  }
  
  .hero-content h1 {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
  
  section {
    margin: 40px 0;
  }
  
  .hero-section {
    height: 60vh;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }
  
  .product-image {
    height: 220px;
  }
  
  .product-info {
    padding: 16px;
  }
  
  .cart-button {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .categories {
    gap: 8px;
  }
  
  .category-button {
    padding: 8px 16px;
    min-width: auto;
  }
  
  .category-name {
    display: none;
  }
  
  .category-icon {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>

