<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import notification from "@/components/Notify/notification.vue";
import Cart from "@/components/Cart/index.vue";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const router = useRouter();
const cartStore = useCartStore();
gsap.registerPlugin(Flip, ScrollTrigger);

// 通知组件引用
const notificationRef = ref(null);

// 检测用户是否开启了减弱动画
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// 商品分类
const categories = ref([
  { id: 1, name: "狗狗食品", icon: "restaurant" },
  { id: 2, name: "猫咪食品", icon: "set_meal" },
  { id: 3, name: "宠物玩具", icon: "toys" },
  { id: 4, name: "宠物服饰", icon: "checkroom" },
  { id: 5, name: "宠物用品", icon: "pets" },
  { id: 6, name: "保健护理", icon: "healing" },
  { id: 7, name: "美容清洁", icon: "shower" },
  { id: 8, name: "出行装备", icon: "luggage" },
]);

// 初始每页显示数量和当前页
const pageSize = 8;
const currentPage = ref(1);

// 商品列表 - 添加更多商品
const allProducts = ref([
  {
    id: 1,
    name: "皇家狗粮 幼犬全犬种",
    price: 239.0,
    originalPrice: 299.0,
    discount: "8折",
    image:
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop",
    category: 1,
    sales: 2145,
    rating: 4.9,
    tags: ["幼犬", "营养均衡", "促进发育"],
    isNew: true,
    stock: 86,
  },
  {
    id: 2,
    name: "猫家猫粮 成猫海洋鱼味",
    price: 119.0,
    originalPrice: 159.0,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop",
    category: 2,
    sales: 3340,
    rating: 4.8,
    tags: ["成猫", "海洋鱼味", "毛发亮丽"],
    isNew: false,
    stock: 153,
  },
  {
    id: 3,
    name: "互动猫玩具 电动逗猫棒",
    price: 49.9,
    originalPrice: 69.9,
    discount: "7折",
    image:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&auto=format&fit=crop",
    category: 3,
    sales: 5678,
    rating: 4.7,
    tags: ["电动", "互动", "减压"],
    isNew: true,
    stock: 42,
  },
  {
    id: 4,
    name: "狗狗牵引绳 伸缩可调节",
    price: 59.0,
    originalPrice: 79.0,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop",
    category: 8,
    sales: 2897,
    rating: 4.6,
    tags: ["伸缩", "舒适", "反光"],
    isNew: false,
    stock: 76,
  },
  {
    id: 5,
    name: "宠物洗澡刷 硅胶按摩梳",
    price: 29.9,
    originalPrice: 39.9,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=600&auto=format&fit=crop",
    category: 7,
    sales: 4562,
    rating: 4.8,
    tags: ["舒适", "按摩", "耐用"],
    isNew: false,
    stock: 125,
  },
  {
    id: 6,
    name: "猫咪窝垫 四季通用",
    price: 89.0,
    originalPrice: 129.0,
    discount: "6.9折",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop",
    category: 5,
    sales: 3456,
    rating: 4.9,
    tags: ["舒适", "保暖", "易清洗"],
    isNew: true,
    stock: 58,
  },
  {
    id: 7,
    name: "狗狗钙片 健骨补钙",
    price: 68.0,
    originalPrice: 88.0,
    discount: "7.7折",
    image:
      "https://images.unsplash.com/photo-1553736026-ff14d158d222?w=600&auto=format&fit=crop",
    category: 6,
    sales: 1987,
    rating: 4.7,
    tags: ["补钙", "促进发育", "易吸收"],
    isNew: false,
    stock: 93,
  },
  {
    id: 8,
    name: "宠物冬季保暖衣",
    price: 79.0,
    originalPrice: 109.0,
    discount: "7.2折",
    image:
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&auto=format&fit=crop",
    category: 4,
    sales: 2765,
    rating: 4.8,
    tags: ["保暖", "舒适", "可爱"],
    isNew: true,
    stock: 67,
  },
  {
    id: 9,
    name: "猫砂盆全封闭除臭型",
    price: 129.0,
    originalPrice: 169.0,
    discount: "7.6折",
    image:
      "https://images.unsplash.com/photo-1559235038-1b0fadf76f78?w=600&auto=format&fit=crop",
    category: 5,
    sales: 3987,
    rating: 4.9,
    tags: ["封闭式", "除臭", "易清理"],
    isNew: false,
    stock: 43,
  },
  {
    id: 10,
    name: "狗狗磨牙玩具",
    price: 39.9,
    originalPrice: 59.9,
    discount: "6.7折",
    image:
      "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&auto=format&fit=crop",
    category: 3,
    sales: 5342,
    rating: 4.7,
    tags: ["耐咬", "磨牙", "洁齿"],
    isNew: false,
    stock: 106,
  },
  {
    id: 11,
    name: "猫咪零食罐头",
    price: 15.9,
    originalPrice: 19.9,
    discount: "8折",
    image:
      "https://images.unsplash.com/photo-1601758176175-45914394491c?w=600&auto=format&fit=crop",
    category: 2,
    sales: 8769,
    rating: 4.8,
    tags: ["鲜肉", "开胃", "营养"],
    isNew: true,
    stock: 215,
  },
  {
    id: 12,
    name: "狗狗鸡肉干零食",
    price: 29.9,
    originalPrice: 39.9,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&auto=format&fit=crop",
    category: 1,
    sales: 7654,
    rating: 4.9,
    tags: ["鸡肉", "低脂", "营养"],
    isNew: false,
    stock: 187,
  },
  // 新增商品，用于加载更多
  {
    id: 13,
    name: "猫咪智能喂食器",
    price: 349.0,
    originalPrice: 399.0,
    discount: "8.8折",
    image:
      "https://images.unsplash.com/photo-1535696588143-945e1379f1b0?w=600&auto=format&fit=crop",
    category: 5,
    sales: 2876,
    rating: 4.8,
    tags: ["智能", "定时", "APP控制"],
    isNew: true,
    stock: 42,
  },
  {
    id: 14,
    name: "狗狗智能项圈",
    price: 199.0,
    originalPrice: 249.0,
    discount: "8折",
    image:
      "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=600&auto=format&fit=crop",
    category: 8,
    sales: 1897,
    rating: 4.7,
    tags: ["GPS定位", "健康监测", "防丢失"],
    isNew: true,
    stock: 53,
  },
  {
    id: 15,
    name: "猫咪按摩梳",
    price: 59.0,
    originalPrice: 79.0,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1609859705325-eb94c1e21d37?w=600&auto=format&fit=crop",
    category: 7,
    sales: 3567,
    rating: 4.9,
    tags: ["按摩", "去浮毛", "舒适"],
    isNew: false,
    stock: 98,
  },
  {
    id: 16,
    name: "狗狗洗澡沐浴露",
    price: 89.0,
    originalPrice: 118.0,
    discount: "7.5折",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop",
    category: 7,
    sales: 4325,
    rating: 4.8,
    tags: ["天然", "去味", "护毛"],
    isNew: false,
    stock: 75,
  },
]);

// 商品列表 - 当前显示
const products = computed(() => {
  return allProducts.value.slice(0, currentPage.value * pageSize);
});

// 判断是否还有更多商品
const hasMoreProducts = computed(() => {
  return products.value.length < allProducts.value.length;
});

// 当前选择的分类
const selectedCategory = ref(0); // 0表示全部

// 搜索关键词
const searchQuery = ref("");
const productsRef = ref(null); // 引用商品区域

// 视图模式 - grid 或 list
const viewMode = ref("grid");

// 切换视图模式
const toggleViewMode = (mode) => {
  viewMode.value = mode;
};

// 排序方式
const sortOption = ref("default"); // default, priceAsc, priceDesc, salesDesc, ratingDesc

// 筛选后的商品
const filteredProducts = computed(() => {
  let result = [...products.value];

  // 应用分类筛选
  if (selectedCategory.value !== 0) {
    result = result.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  // 应用搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // 应用排序
  switch (sortOption.value) {
    case "priceAsc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "salesDesc":
      result.sort((a, b) => b.sales - a.sales);
      break;
    case "ratingDesc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // 默认排序，不做处理
      break;
  }

  return result;
});

// 购物车状态
const isCartOpen = ref(false);
const cartCount = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.quantity, 0);
});

// 购物车侧边栏状态
const isCartSidebarOpen = ref(false);

// 打开购物车侧边栏
const openCartSidebar = () => {
  isCartSidebarOpen.value = true;
};

// 关闭购物车侧边栏
const closeCartSidebar = () => {
  isCartSidebarOpen.value = false;
};

// 修改现有的toggleCart方法，使用侧边栏购物车
const toggleCart = () => {
  if (isCartOpen.value) {
    isCartOpen.value = false;
  } else {
    // 使用侧边栏购物车而不是弹出式购物车
    openCartSidebar();
  }
};

// 购物车动画
const cartBtnAnimation = () => {
  const cartBtn = document.querySelector(".cart-button");
  const cartCount = document.querySelector(".cart-count");

  gsap
    .timeline()
    .fromTo(
      cartBtn,
      { yPercent: 0, rotation: 0 },
      {
        duration: 0.6,
        ease: "power4.out",
        yPercent: -10,
        rotation: -5,
        clearProps: "all",
      }
    )
    .fromTo(
      cartCount,
      { rotation: 0 },
      {
        duration: 1,
        ease: "power4.out",
        rotation: 360,
        y: -20,
      },
      "<"
    )
    .to(
      cartCount,
      {
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
        y: 0,
        clearProps: "all",
      },
      "-=0.4"
    );
};

// 加载更多商品
function loadMoreProducts() {
  if (hasMoreProducts.value) {
    // 添加loading状态
    const loadMoreBtn = document.querySelector(".load-more-btn");
    loadMoreBtn.classList.add("loading");

    // 模拟加载延迟
    setTimeout(() => {
      currentPage.value++;

      // 加载动画
      const productsGrid = document.querySelector(".products-grid");
      const newItems = productsGrid.querySelectorAll(
        ".product-card:nth-last-child(-n+" + pageSize + ")"
      );

      gsap.fromTo(
        newItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      // 移除loading状态
      loadMoreBtn.classList.remove("loading");
    }, 800); // 模拟网络请求延迟
  }
}

// 切换收藏状态
function toggleFavorite(productId) {
  cartStore.toggleFavorite(productId);

  // 爱心动画
  const heartIcon = event.currentTarget.querySelector(".material-icons-sharp");
  if (cartStore.isFavorite(productId)) {
    gsap.fromTo(
      heartIcon,
      { scale: 1 },
      {
        scale: 1.5,
        duration: 0.3,
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(heartIcon, { scale: 1, duration: 0.2 });
        },
      }
    );
  }
}

// 检查商品是否被收藏
const isFavorite = (productId) => {
  return cartStore.isFavorite(productId);
};

// 检查商品是否在购物车中
const isInCart = (productId) => {
  return cartStore.items.some((item) => item.id === productId.toString());
};

// 添加到购物车 - 带抛物线动画
function addToCart(product, event) {
  // 获取按钮和购物车的位置
  const btnEl = event.currentTarget;
  const btnRect = btnEl.getBoundingClientRect();
  const cartBtnEl = document.querySelector(".cart-button");
  const cartRect = cartBtnEl.getBoundingClientRect();

  // 创建一个复制的产品图片用于动画
  const productImg = document.querySelector(`[alt="${product.name}"]`);
  const clone = document.createElement("div");
  clone.classList.add("flying-item");
  clone.style.backgroundImage = `url(${product.image})`;
  document.body.appendChild(clone);

  // 设置初始位置
  gsap.set(clone, {
    x: btnRect.left + btnRect.width / 2 - 20, // 居中调整
    y: btnRect.top + btnRect.height / 2 - 20, // 居中调整
    opacity: 1,
    scale: 0.2,
    borderRadius: "50%",
    zIndex: 1000,
  });

  // 创建时间轴
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后移除元素
      document.body.removeChild(clone);

      // 使用Pinia store添加商品
      cartStore.addItem({
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        selected: false,
      });

      // 显示通知
      showNotification(`已将 ${product.name} 添加到购物车`);

      // 执行购物车动画
      !reducedMotion && cartBtnAnimation();
    },
  });

  // 执行抛物线动画
  tl.to(clone, {
    duration: 0.3,
    scale: 0.5,
    ease: "power1.out",
  })
    .to(clone, {
      duration: reducedMotion ? 0.5 : 0.8,
      x: cartRect.left + cartRect.width / 2 - 20,
      y: cartRect.top + cartRect.height / 2 - 20,
      scale: 0.3,
      ease: "power1.in",
      motionPath: {
        path: [
          { x: btnRect.left + 50, y: btnRect.top - 100 }, // 控制点1：向上弧度
          { x: cartRect.left + 50, y: cartRect.top - 50 }, // 控制点2：接近购物车的弧度
        ],
        type: "cubic",
      },
    })
    .to(clone, {
      duration: 0.2,
      scale: 0,
      opacity: 0,
      ease: "power2.in",
    });
}

// 显示通知
function showNotification(message) {
  if (notificationRef.value) {
    notificationRef.value.addNotification(message, "success");
  } else {
    console.log(message);
  }
}

// 切换分类
function selectCategory(categoryId) {
  selectedCategory.value = categoryId;

  // 分类切换动画
  const productsGrid = document.querySelector(".products-grid");
  const state = Flip.getState(productsGrid.children);

  setTimeout(() => {
    Flip.from(state, {
      duration: 0.6,
      ease: "power1.out",
      stagger: 0.05,
      absolute: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.6 });
      },
    });
  }, 10);
}

// 跳转到商品详情
function goToProductDetail(productId) {
  // 实际项目中跳转到商品详情页
  console.log(`跳转到商品ID:${productId}的详情页`);
}

// 执行搜索
const handleSearch = () => {
  // 如果搜索框有内容，执行搜索
  if (searchQuery.value.trim()) {
    // 滚动到商品区域
    setTimeout(() => {
      if (productsRef.value) {
        productsRef.value.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
};

// 合作品牌数据
const brands = ref([
  {
    name: "皇家",
    logo: "https://cdn-icons-png.flaticon.com/512/8363/8363081.png",
  },
  {
    name: "宝路",
    logo: "https://cdn-icons-png.flaticon.com/512/7633/7633570.png",
  },
  {
    name: "普瑞纳",
    logo: "https://cdn-icons-png.flaticon.com/512/4107/4107735.png",
  },
  {
    name: "希尔思",
    logo: "https://cdn-icons-png.flaticon.com/512/3460/3460335.png",
  },
  {
    name: "伟嘉",
    logo: "https://cdn-icons-png.flaticon.com/512/3063/3063183.png",
  },
  {
    name: "冠能",
    logo: "https://cdn-icons-png.flaticon.com/512/3047/3047928.png",
  },
  {
    name: "爱肯拿",
    logo: "https://cdn-icons-png.flaticon.com/512/9333/9333188.png",
  },
  {
    name: "渴望",
    logo: "https://cdn-icons-png.flaticon.com/512/4006/4006511.png",
  },
]);

// 品牌走马灯暂停状态
const isMarqueePaused = ref(false);

// 模拟获取数据和初始化动画
onMounted(() => {
  // 初始化收藏状态
  allProducts.value.forEach((product) => {
    if (!cartStore.favorites[product.id]) {
      cartStore.favorites[product.id] = false;
    }
  });

  // 页面加载动画
  if (!reducedMotion) {
    const productsGrid = document.querySelector(".products-grid");
    const productCards = productsGrid.querySelectorAll(".product-card");

    gsap.fromTo(
      productCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    // Hero section动画
    gsap.fromTo(
      ".hero-content h1",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );

    gsap.fromTo(
      ".hero-content h2",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo(
      ".search-container",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7 }
    );

    // 滚动触发动画
    ScrollTrigger.batch(".collection-item", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }
        );
      },
      once: true,
    });

    ScrollTrigger.batch(".featured-banner", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );

        gsap.fromTo(
          ".featured-content",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, delay: 0.3 }
        );
      },
      once: true,
    });
  }
});
</script>

<template>
  <div class="shop-container">
    <HomeHeader></HomeHeader>

    <!-- 头部横幅区域-->
    <div class="hero-banner">
      <img
        src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&auto=format&fit=crop"
        alt="Banner"
        class="hero-image"
      />
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>KIRIPET</h1>
          <h2>宠物商城系列</h2>
          <div class="search-container">
            <input
              type="text"
              placeholder="搜索商品..."
              v-model="searchQuery"
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-button" @click="handleSearch">
              <span class="material-icons-sharp">search</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 公告条 -->
    <div class="announcement-strip">
      <div class="container">
        <p>订单满<span style="color: var(--danger)">299</span>元 | 免费配送</p>
      </div>
    </div>

    <!-- 系列导航 -->
    <section class="collection-nav">
      <div class="container">
        <h2 class="section-title">系列分类</h2>
        <div class="collections">
          <div class="collection-item" @click="selectCategory(5)">
            <img
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop"
              alt="宠物用品"
            />
            <div class="collection-title">宠物用品</div>
          </div>
          <div class="collection-item" @click="selectCategory(1)">
            <img
              src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&auto=format&fit=crop"
              alt="狗狗食品"
            />
            <div class="collection-title">狗狗食品</div>
          </div>
          <div class="collection-item" @click="selectCategory(2)">
            <img
              src="https://images.unsplash.com/photo-1601758176175-45914394491c?w=600&auto=format&fit=crop"
              alt="猫咪食品"
            />
            <div class="collection-title">猫咪食品</div>
          </div>
          <div class="collection-item" @click="selectCategory(3)">
            <img
              src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&auto=format&fit=crop"
              alt="宠物玩具"
            />
            <div class="collection-title">宠物玩具</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类导航条 -->
    <section class="category-strip">
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
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- 商品区域 -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">商品</h2>
          <div class="section-filters">
            <div class="view-mode">
              <button
                class="view-btn"
                :class="{ active: viewMode === 'grid' }"
                @click="toggleViewMode('grid')"
              >
                <span class="material-icons-sharp">grid_view</span>
              </button>
              <button
                class="view-btn"
                :class="{ active: viewMode === 'list' }"
                @click="toggleViewMode('list')"
              >
                <span class="material-icons-sharp">view_list</span>
              </button>
            </div>
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
        </div>

        <div
          class="products-grid"
          :class="{ 'products-list': viewMode === 'list' }"
          ref="productsRef"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image" @click="goToProductDetail(product.id)">
              <img
                :src="product.image"
                :alt="product.name"
                class="hover-zoom"
              />
              <div class="product-badges">
                <span class="discount-badge" v-if="product.discount">{{
                  product.discount
                }}</span>
                <span class="new-badge" v-if="product.isNew">新品</span>
              </div>
              <div class="quick-view">
                <span>查看详情</span>
              </div>
            </div>

            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="product-price">
                <span class="current-price"
                  >${{ product.price.toFixed(2) }}</span
                >
                <span class="original-price"
                  >${{ product.originalPrice.toFixed(2) }}</span
                >
              </div>

              <div class="product-tags">
                <span
                  v-for="(tag, index) in product.tags.slice(0, 3)"
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="product-actions">
                <button class="action-btn" @click="toggleFavorite(product.id)">
                  <span
                    class="material-icons-sharp"
                    :class="{ 'favorite-active': isFavorite(product.id) }"
                  >
                    {{
                      isFavorite(product.id) ? "favorite" : "favorite_border"
                    }}
                  </span>
                </button>
                <button
                  class="add-to-cart-btn"
                  @click="addToCart(product, $event)"
                  :class="{ 'in-cart': isInCart(product.id) }"
                >
                  {{ isInCart(product.id) ? "已加入购物车" : "加入购物车" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载更多按钮 -->
        <div class="load-more" v-if="hasMoreProducts">
          <button class="load-more-btn" @click="loadMoreProducts">
            <span class="button-text">加载更多</span>
            <span class="button-loader"></span>
          </button>
        </div>

        <!-- 空状态 -->
        <div class="empty-state" v-if="filteredProducts.length === 0">
          <div class="empty-icon">
            <span class="material-icons-sharp">search_off</span>
          </div>
          <p>未找到商品</p>
          <button
            @click="
              searchQuery = '';
              selectedCategory = 0;
            "
            class="reset-button"
          >
            重置筛选
          </button>
        </div>
      </div>
    </section>

    <!-- 特色系列 -->
    <section class="featured-collection">
      <div class="container">
        <h2 class="section-title">特色系列</h2>
        <div class="featured-banner">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&auto=format&fit=crop"
            alt="Featured collection"
            class="featured-image"
          />
          <div class="featured-content">
            <h3>全新季节系列</h3>
            <p>为您的爱宠准备的特别系列</p>
            <button class="shop-now-btn">立即购买</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 品牌区域 -->
    <section class="brands-section">
      <div class="container">
        <h2 class="section-title">合作品牌</h2>
        <div
          class="brands-marquee"
          @mouseenter="isMarqueePaused = true"
          @mouseleave="isMarqueePaused = false"
        >
          <div class="brands-container" :class="{ paused: isMarqueePaused }">
            <div
              v-for="brand in [...brands, ...brands]"
              :key="brand.name + Math.random()"
              class="brand-item"
            >
              <img :src="brand.logo" :alt="brand.name" />
              <span class="brand-name">{{ brand.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 悬浮购物车按钮 -->
    <div class="cart-wrapper">
      <div class="cart" :class="{ open: isCartOpen }">
        <div class="cart-button" @click="openCartSidebar">
          <span class="material-icons-sharp cart-icon">shopping_cart</span>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
        <div class="cart-content" v-if="isCartOpen" @click.stop>
          <div class="cart-header">
            <h3>购物车</h3>
            <button class="close-cart" @click="toggleCart">
              <span class="material-icons-sharp">close</span>
            </button>
          </div>
          <div class="cart-items">
            <div v-if="cartStore.groupedItems.length === 0" class="empty-cart">
              <span class="material-icons-sharp">shopping_cart</span>
              <p>您的购物车是空的</p>
              <button class="continue-shopping" @click="toggleCart">
                继续购物
              </button>
            </div>
            <div v-else class="cart-item-list">
              <div
                v-for="item in cartStore.groupedItems"
                :key="item.id"
                class="cart-item"
              >
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="item-details">
                  <h4>{{ item.title }}</h4>
                  <div class="item-info">
                    <p class="item-price">¥{{ item.price.toFixed(2) }}</p>
                    <p class="item-quantity">x{{ item.quantity }}</p>
                  </div>
                </div>
                <button
                  class="remove-item"
                  @click="cartStore.decreaseQuantity(item.id)"
                >
                  <span class="material-icons-sharp"
                    >remove_circle_outline</span
                  >
                </button>
              </div>
            </div>
          </div>
          <div class="cart-footer" v-if="cartStore.groupedItems.length > 0">
            <div class="cart-total">
              <span>总计:</span>
              <span class="total-price"
                >¥{{ cartStore.selectedTotal.toFixed(2) }}</span
              >
            </div>
            <div class="cart-actions">
              <button class="view-cart" @click="openCartSidebar">
                查看购物车
              </button>
              <button class="checkout" @click="openCartSidebar">结算</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车侧边栏组件 -->
    <Cart :visible="isCartSidebarOpen" @close="closeCartSidebar" />

    <HomeFooter></HomeFooter>

    <!-- 通知组件 -->
    <notification ref="notificationRef"></notification>
  </div>
</template>

<style scoped>
/* 添加主题色变量 */
:root {
  --deongaree: #1e90ff; /* dodgerblue */
  --deongaree-light: #90caf9;
  --deongaree-dark: #0d47a1;
  --deongaree-hover: #1976d2;
}

.shop-container {
  width: 100%;
  background-color: #fff;
  color: #000;
  font-family: "Helvetica Neue", "Arial", sans-serif;
  letter-spacing: -0.02em;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

section {
  margin: 80px 0;
}

/* 排版样式 */
h1,
h2,
h3,
h4 {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 400;
  color: var(--deongaree-dark);
}

/* 头部横幅区域 */
.hero-banner {
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slowZoom 20s linear infinite alternate;
}

@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 4rem;
  font-family: var(--ff-llt);
  margin-bottom: 10px;
  letter-spacing: 0.1em;
}

.hero-content h2 {
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-weight: 300;
}

.search-container {
  display: flex;
  margin: 40px auto 0;
  max-width: 500px;
  height: 50px;
  border-radius: 0;
  overflow: hidden;
}

.search-input {
  flex: 1;
  border: none;
  background: white;
  padding: 0 20px;
  font-size: 0.9rem;
  outline: none;
}

.search-button {
  width: 50px;
  background: var(--deongaree);
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-button:hover {
  background: var(--deongaree-hover);
}

/* 公告条 */
.announcement-strip {
  background-color: #f2f2f2;
  padding: 12px 0;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

/* 系列导航区域 */
.collections {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.collection-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 1;
}

.collection-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.collection-item:hover img {
  transform: scale(1.05);
}

.collection-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  transition: transform 0.3s ease;
}

.collection-item:hover .collection-title {
  transform: translateY(-5px);
}

/* 分类导航条 */
.category-strip {
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: 40px 0;
}

.categories {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.categories::-webkit-scrollbar {
  display: none;
}

.category-button {
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
}

.category-button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #000;
  transition: width 0.3s ease;
}

.category-button:hover::after,
.category-button.active::after {
  width: 100%;
}

.category-button.active {
  color: #000;
  font-weight: 500;
}

/* 商品区域 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-filters {
  display: flex;
  align-items: center;
  gap: 20px;
}

.view-mode {
  display: flex;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

.view-btn {
  background: none;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease;
}

.view-btn.active {
  color: #fff;
  background-color: var(--deongaree);
}

.view-btn:hover:not(.active) {
  background-color: #f5f5f5;
}

.sort-select {
  background: white;
  border: 1px solid #eee;
  padding: 8px 15px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 35px;
}

.sort-select:focus {
  border-color: #000;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* 列表视图样式 */
.products-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.products-list .product-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.products-list .product-image {
  width: 180px;
  min-width: 180px;
  aspect-ratio: 1;
}

.products-list .product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}

.products-list .product-name {
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-left: 10px;
}

.products-list .product-actions {
  margin-top: auto;
  width: max-content;
  align-self: flex-end;
}

.product-card {
  background: white;
  position: relative;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.product-image {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f9f9f9;
  cursor: pointer;
}

.hover-zoom {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.product-card:hover .hover-zoom {
  transform: scale(1.05);
}

.quick-view {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.product-card:hover .quick-view {
  transform: translateY(0);
}

.product-badges {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.discount-badge,
.new-badge {
  padding: 5px 10px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  background: #f34f4f;
  color: white;
}

.new-badge {
  background: #444;
}

.product-info {
  padding: 20px 0;
}

.product-name {
  font-size: 1.05rem;
  color: #000;
  margin-bottom: 12px;
  font-weight: 500;
  text-transform: none;
  line-height: 1.3;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 15px;
  color: var(--danger);
}

.current-price {
  font-size: 1.1rem;
  font-weight: 600;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  padding: 5px 10px;
  background: #f2f2f2;
  font-size: 0.8rem;
  color: #666;
  border-radius: 4px;
}

.product-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #000;
}

.favorite-active {
  color: #e91e63 !important;
}

.add-to-cart-btn {
  flex: 1;
  background: var(--deongaree);
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: height 0.5s ease;
}

.add-to-cart-btn:hover::after {
  height: 100%;
}

.add-to-cart-btn.in-cart {
  background: #4caf50;
}

/* 加载更多按钮 */
.load-more {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  margin-top: 60px;
  background-color: var(--deongaree);
}

.load-more-btn {
  background: none;
  border: none;
  color: white;
  padding: 12px 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
}

.load-more-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: height 0.5s ease;
}

.load-more-btn:hover::after {
  height: 100%;
}

.button-loader {
  display: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s infinite linear;
}

.load-more-btn.loading .button-text {
  visibility: hidden;
}

.load-more-btn.loading .button-loader {
  display: block;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 20px;
}

.reset-button {
  background: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  cursor: pointer;
}

/* 特色系列区域 */
.featured-collection {
  margin: 100px 0;
}

.featured-banner {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
}

.featured-banner:hover .featured-image {
  transform: scale(1.05);
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.5s ease;
}

.featured-banner:hover .featured-content {
  transform: translateY(-10px);
}

.featured-content h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.featured-content p {
  margin-bottom: 20px;
  font-size: 1rem;
}

.shop-now-btn {
  background: var(--deongaree);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.shop-now-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%) rotate(45deg);
  transition: height 0.5s ease;
}

.shop-now-btn:hover::after {
  height: 300%;
}

/* 品牌区域 */
.brands-section {
  padding: 80px 0;
  background-color: #f9f9f9;
  overflow: hidden; /* 防止走马灯溢出 */
}

.brands-marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.brands-container {
  display: flex;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.brands-container.paused {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.brand-item {
  flex-shrink: 0;
  min-width: 180px;
  max-width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 0 15px;
  padding: 15px;
  border-radius: 8px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.brand-item:hover {
  filter: grayscale(0);
  opacity: 1;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: #f3f3f3;
}

.brand-item img {
  max-width: 100%;
  max-height: 50px;
  margin-bottom: 8px;
}

.brand-name {
  font-size: 0.8rem;
  color: #666;
  margin-top: 8px;
}

/* 购物车 */
.cart-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.cart {
  position: relative;
}

.cart-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--deongaree);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-button:hover {
  color: var(--deongaree);
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background: var(--deongaree-hover);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-content {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  background: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  transform-origin: bottom right;
  animation: cartOpen 0.3s ease;
}

@keyframes cartOpen {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.cart-header h3 {
  margin: 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.close-cart {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.cart-items {
  max-height: 350px;
  overflow-y: auto;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
  color: #999;
}

.empty-cart .material-icons-sharp {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #eee;
}

.continue-shopping {
  background: var(--deongaree);
  color: white;
  border: none;
  padding: 8px 20px;
  margin-top: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.continue-shopping:hover {
  background: var(--deongaree-hover);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s ease;
}

.cart-item:hover {
  background: #f9f9f9;
}

.item-image {
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: none;
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-weight: 600;
  margin: 0;
}

.item-quantity {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 12px;
}

.remove-item {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.remove-item:hover {
  color: #e74c3c;
}

.cart-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: 500;
}

.total-price {
  font-size: 1.1rem;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.view-cart,
.checkout {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.view-cart {
  background: #f5f5f5;
  color: #000;
}

.view-cart:hover {
  background: #e0e0e0;
}

.checkout {
  background: var(--deongaree);
  color: white;
  position: relative;
  overflow: hidden;
}

.checkout::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%) rotate(45deg);
  transition: height 0.5s ease;
}

.checkout:hover::after {
  height: 300%;
}

/* 飞行元素动画 */
.flying-item {
  position: fixed;
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 1100;
}

/* 媒体查询 */
@media (max-width: 1024px) {
  .container {
    padding: 0 30px;
  }
  .collections {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured-content {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content h2 {
    font-size: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .collections {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .featured-content {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .footer-content {
    flex-direction: column;
    gap: 40px;
  }

  .footer-sections {
    flex-direction: column;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .cart-button {
    width: 50px;
    height: 50px;
  }

  .cart-content {
    width: 300px;
    right: -20px;
  }

  .cart-wrapper {
    bottom: 20px;
    right: 20px;
  }
}
</style>
