<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";

const route = useRoute();
const router = useRouter();
const storeId = route.params.id;

const store = ref(null);
const loading = ref(true);

// 定义门店服务类别
const serviceCategories = [
  { id: 1, name: "医疗服务", icon: "icon-stethoscope" },
  { id: 2, name: "美容服务", icon: "icon-scissors" },
  { id: 3, name: "训练服务", icon: "icon-dog" },
  { id: 4, name: "寄养服务", icon: "icon-home" },
  { id: 5, name: "商品销售", icon: "icon-shopping-cart" },
];

// 获取门店详细信息
const fetchStoreData = () => {
  loading.value = true;

  // 模拟API调用，获取门店详情
  setTimeout(() => {
    // 根据门店ID获取不同的数据
    const storeData = getStoreById(storeId);
    store.value = storeData;
    loading.value = false;
  }, 1000);
};

// 模拟门店数据
const getStoreById = (id) => {
  const stores = {
    1: {
      id: 1,
      name: "KiriPet 三里屯",
      address: "北京市朝阳区三里屯路19号院三里屯太古里南区7号楼",
      phone: "010-12345678",
      hours: "10:00 - 22:00",
      description:
        "KiriPet三里屯店坐落于北京市中心繁华商业区，是我们的旗舰店。店内环境宽敞明亮，设有专业的宠物医疗区、美容区、活动区及商品销售区。我们的专业团队提供全方位的宠物护理服务。",
      image:
        "https://cdn.pixabay.com/photo/2017/11/13/14/05/architectural-2945830_1280.jpg",
      gallery: [
        "https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg",
        "https://images.pexels.com/photos/6816865/pexels-photo-6816865.jpeg",
        "https://images.pexels.com/photos/6816884/pexels-photo-6816884.jpeg",
      ],
      location: {
        latitude: 39.938522,
        longitude: 116.454971,
        mapUrl:
          "https://maps.baidu.com/?x=116.454971&y=39.938522&title=KiriPet三里屯店",
      },
      services: [
        {
          id: 1,
          name: "宠物全面体检",
          category: 1,
          price: "¥299起",
          description:
            "专业兽医提供全面身体检查，包括常规体温、心率检测及基础血液检查",
        },
        {
          id: 2,
          name: "疫苗接种",
          category: 1,
          price: "¥150起",
          description: "提供猫狗核心疫苗接种服务，确保宠物健康",
        },
        {
          id: 3,
          name: "宠物洗护",
          category: 2,
          price: "¥120起",
          description: "专业洗浴、皮肤护理和毛发维护",
        },
        {
          id: 4,
          name: "宠物美容",
          category: 2,
          price: "¥180起",
          description: "包括造型修剪、指甲修整等全套美容服务",
        },
        {
          id: 5,
          name: "宠物训练",
          category: 3,
          price: "¥280/次",
          description: "专业训犬师提供的基础服从训练和行为矫正",
        },
        {
          id: 6,
          name: "短期寄养",
          category: 4,
          price: "¥150/天",
          description: "舒适环境下的短期照料服务，包含日常喂食和活动",
        },
      ],
      staff: [
        {
          name: "王医生",
          position: "主任兽医师",
          avatar:
            "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
        },
        {
          name: "李医生",
          position: "兽医师",
          avatar:
            "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg",
        },
        {
          name: "张美容师",
          position: "首席美容师",
          avatar:
            "https://images.pexels.com/photos/8434637/pexels-photo-8434637.jpeg",
        },
      ],
      reviews: [
        {
          name: "陈先生",
          rating: 5,
          comment: "服务非常专业，医生很耐心地解答了我所有问题。",
        },
        { name: "王女士", rating: 4, comment: "美容做得很好，就是价格略贵。" },
        { name: "刘先生", rating: 5, comment: "环境很好，宠物在这里很开心。" },
      ],
    },
    2: {
      id: 2,
      name: "KiriPet 王府井",
      address: "北京市东城区王府井大街138号北京apm",
      phone: "010-87654321",
      hours: "10:00 - 22:00",
      description:
        "KiriPet王府井店位于北京apm购物中心，交通便利，环境舒适。我们提供宠物医疗、美容及日常用品销售等综合服务，致力于为您的爱宠提供最优质的呵护。",
      image:
        "https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg",
      gallery: [
        "https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg",
        "https://images.pexels.com/photos/6816862/pexels-photo-6816862.jpeg",
        "https://images.pexels.com/photos/6816863/pexels-photo-6816863.jpeg",
      ],
      location: {
        latitude: 39.914492,
        longitude: 116.411478,
        mapUrl:
          "https://maps.baidu.com/?x=116.411478&y=39.914492&title=KiriPet王府井店",
      },
      services: [
        {
          id: 1,
          name: "宠物体检",
          category: 1,
          price: "¥259起",
          description: "基础体检服务，包括体温、心率等生命体征检查",
        },
        {
          id: 2,
          name: "宠物口腔护理",
          category: 1,
          price: "¥220起",
          description: "专业洁牙和口腔检查，预防口腔疾病",
        },
        {
          id: 3,
          name: "精致洗浴",
          category: 2,
          price: "¥150起",
          description: "使用进口沐浴产品，呵护宠物皮肤",
        },
        {
          id: 4,
          name: "高级美容",
          category: 2,
          price: "¥200起",
          description: "根据宠物品种特点定制美容方案",
        },
        {
          id: 5,
          name: "寄养服务",
          category: 4,
          price: "¥180/天",
          description: "舒适环境，全天候照料，定时户外活动",
        },
      ],
      staff: [
        {
          name: "赵医生",
          position: "兽医师",
          avatar:
            "https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg",
        },
        {
          name: "钱美容师",
          position: "美容师",
          avatar:
            "https://images.pexels.com/photos/4498214/pexels-photo-4498214.jpeg",
        },
      ],
      reviews: [
        { name: "张女士", rating: 5, comment: "店里很干净，服务很周到。" },
        { name: "李先生", rating: 5, comment: "给狗狗洗澡很仔细，推荐！" },
      ],
    },
    3: {
      id: 3,
      name: "KiriPet 西单大悦城",
      address: "北京市西城区西单北大街131号大悦城",
      phone: "010-67123456",
      hours: "10:00 - 21:30",
      description:
        "KiriPet西单大悦城店是我们在北京西城区的核心门店，店内拥有先进的医疗设备和专业的美容工具。我们的团队经验丰富，为您的宠物提供一站式服务体验。",
      image:
        "https://cdn.pixabay.com/photo/2016/08/11/23/55/trees-1587301_1280.jpg",
      gallery: [
        "https://images.pexels.com/photos/6816864/pexels-photo-6816864.jpeg",
        "https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg",
        "https://images.pexels.com/photos/6816867/pexels-photo-6816867.jpeg",
      ],
      location: {
        latitude: 39.913818,
        longitude: 116.373711,
        mapUrl:
          "https://maps.baidu.com/?x=116.373711&y=39.913818&title=KiriPet西单大悦城店",
      },
      services: [
        {
          id: 1,
          name: "疾病诊断与治疗",
          category: 1,
          price: "¥200起",
          description: "针对常见宠物疾病的诊断和治疗方案",
        },
        {
          id: 2,
          name: "绝育手术",
          category: 1,
          price: "¥800起",
          description: "安全、专业的绝育手术服务",
        },
        {
          id: 3,
          name: "日常洗护",
          category: 2,
          price: "¥130起",
          description: "基础清洁和毛发护理",
        },
        {
          id: 4,
          name: "专业美容",
          category: 2,
          price: "¥190起",
          description: "根据宠物品种特点进行专业修剪",
        },
        {
          id: 5,
          name: "行为训练",
          category: 3,
          price: "¥260/次",
          description: "解决常见的行为问题，建立良好习惯",
        },
      ],
      staff: [
        {
          name: "孙医生",
          position: "主治兽医",
          avatar:
            "https://images.pexels.com/photos/5214947/pexels-photo-5214947.jpeg",
        },
        {
          name: "周训练师",
          position: "首席训练师",
          avatar:
            "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg",
        },
      ],
      reviews: [
        {
          name: "赵先生",
          rating: 4,
          comment: "训练课程效果很好，狗狗进步很大。",
        },
        { name: "钱女士", rating: 5, comment: "医疗服务专业，价格合理。" },
      ],
    },
  };

  return stores[id] || null;
};

onMounted(() => {
  fetchStoreData();
});
</script>

<template>
  <div class="store-detail-page">
    <HomeHeader />

    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
      <p>正在加载门店信息...</p>
    </div>

    <div class="store-detail-container" v-else-if="store">
      <!-- 门店头部信息 -->
      <div
        class="store-header"
        :style="{ backgroundImage: `url(${store.image})` }"
      >
        <div class="store-header-overlay">
          <div class="store-header-content">
            <h1>{{ store.name }}</h1>
            <div class="store-basic-info">
              <div class="info-item">
                <span class="icon-map-marker"></span>
                <span>{{ store.address }}</span>
              </div>
              <div class="info-item">
                <span class="icon-phone"></span>
                <span>{{ store.phone }}</span>
              </div>
              <div class="info-item">
                <span class="icon-clock"></span>
                <span>营业时间: {{ store.hours }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="container">
        <div class="back-link" @click="router.push('/serve')">
          <span class="icon-arrow-left"></span> 返回门店列表
        </div>

        <!-- 门店描述 -->
        <section class="store-section">
          <h2>门店介绍</h2>
          <p class="store-description">{{ store.description }}</p>

          <!-- 门店图片展示 -->
          <div class="store-gallery">
            <div
              v-for="(image, index) in store.gallery"
              :key="index"
              class="gallery-item"
            >
              <img :src="image" :alt="`${store.name} - 图片 ${index + 1}`" />
            </div>
          </div>
        </section>

        <!-- 门店位置 -->
        <section class="store-section">
          <h2>门店位置</h2>
          <div class="store-location">
            <div class="location-map">
              <a
                :href="store.location.mapUrl"
                target="_blank"
                class="map-placeholder"
              >
                <span class="icon-map-marker"></span>
                <span>查看地图</span>
              </a>
            </div>
            <div class="location-details">
              <h3>地址信息</h3>
              <p><span class="icon-map-marker"></span> {{ store.address }}</p>
              <p><span class="icon-bus"></span> 交通指南:</p>
              <ul>
                <li>地铁: 10号线三里屯站，步行约500米</li>
                <li>公交: 113路、115路、813路，三里屯站下车</li>
              </ul>
              <div class="action-buttons">
                <a
                  :href="store.location.mapUrl"
                  target="_blank"
                  class="primary-btn"
                >
                  <span class="icon-directions"></span> 获取导航
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- 门店服务 -->
        <section class="store-section">
          <h2>提供的服务</h2>
          <div class="service-categories">
            <div
              v-for="category in serviceCategories"
              :key="category.id"
              class="category-item"
            >
              <span :class="category.icon"></span>
              <span>{{ category.name }}</span>
            </div>
          </div>

          <div class="services-list">
            <div
              v-for="service in store.services"
              :key="service.id"
              class="service-item"
            >
              <div class="service-header">
                <h3>{{ service.name }}</h3>
                <span class="service-price">{{ service.price }}</span>
              </div>
              <p class="service-description">{{ service.description }}</p>
              <button class="secondary-btn">了解详情</button>
            </div>
          </div>
        </section>

        <!-- 门店团队 -->
        <section class="store-section" v-if="store.staff && store.staff.length">
          <h2>专业团队</h2>
          <div class="staff-list">
            <div
              v-for="(member, index) in store.staff"
              :key="index"
              class="staff-item"
            >
              <div class="staff-avatar">
                <img :src="member.avatar" :alt="member.name" />
              </div>
              <div class="staff-info">
                <h3>{{ member.name }}</h3>
                <p>{{ member.position }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 用户评价 -->
        <section
          class="store-section"
          v-if="store.reviews && store.reviews.length"
        >
          <h2>顾客评价</h2>
          <div class="reviews-list">
            <div
              v-for="(review, index) in store.reviews"
              :key="index"
              class="review-item"
            >
              <div class="review-header">
                <h3>{{ review.name }}</h3>
                <div class="review-rating">
                  <span
                    v-for="n in 5"
                    :key="n"
                    :class="
                      n <= review.rating ? 'icon-star-filled' : 'icon-star'
                    "
                  ></span>
                </div>
              </div>
              <p class="review-comment">{{ review.comment }}</p>
            </div>
          </div>
        </section>

        <!-- 预约和联系信息 -->
        <section class="store-section">
          <h2>预约与咨询</h2>
          <div class="contact-methods">
            <div class="contact-method">
              <span class="icon-phone"></span>
              <div class="contact-info">
                <h3>电话预约</h3>
                <p>{{ store.phone }}</p>
                <small>营业时间内接听</small>
              </div>
            </div>
            <div class="contact-method">
              <span class="icon-calendar"></span>
              <div class="contact-info">
                <h3>在线预约</h3>
                <p>快速便捷，全天候服务</p>
                <button class="primary-btn">立即预约</button>
              </div>
            </div>
            <div class="contact-method">
              <span class="icon-wechat"></span>
              <div class="contact-info">
                <h3>微信咨询</h3>
                <p>扫码添加客服</p>
                <small>工作时间: 09:00-21:00</small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="error-container" v-else>
      <h2>抱歉，未找到门店信息</h2>
      <p>该门店可能不存在或已关闭</p>
      <button class="primary-btn" @click="router.push('/serve')">
        返回门店列表
      </button>
    </div>

    <HomeFooter />
  </div>
</template>

<style scoped>
.store-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  flex: 1;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--deongaree);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  flex: 1;
}

/* 返回链接 */
.back-link {
  display: inline-block;
  margin: 1.5rem 0;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--deongaree);
}

/* 门店头部 */
.store-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.store-header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  display: flex;
  align-items: flex-end;
}

.store-header-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: white;
}

.store-header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.store-basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 内容部分 */
.store-section {
  margin-bottom: 3rem;
}

.store-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--deongaree);
  position: relative;
  padding-bottom: 0.5rem;
}

.store-section h2::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--deongaree);
}

.store-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

/* 门店图片 */
.store-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.gallery-item {
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

/* 门店位置 */
.store-location {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.location-map {
  height: 300px;
  background-color: #f8f8f8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;
}

.map-placeholder span:first-child {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.map-placeholder:hover {
  color: var(--deongaree);
}

.location-details {
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.location-details h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.location-details p {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-details ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.location-details li {
  margin-bottom: 0.5rem;
}

.action-buttons {
  margin-top: 1.5rem;
}

/* 服务类别 */
.service-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background-color: #f5f5f5;
  border-radius: 50px;
  transition: all 0.3s;
}

.category-item:hover {
  background-color: var(--deongaree);
}

.category-item span:first-child {
  font-size: 1.2rem;
}

/* 服务列表 */
.services-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-item {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.service-header h3 {
  font-size: 1.2rem;
}

.service-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--deongaree);
}

.service-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* 员工列表 */
.staff-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.staff-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s;
}

.staff-item:hover {
  transform: translateY(-5px);
}

.staff-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.staff-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.staff-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.staff-info p {
  color: #666;
}

/* 评价列表 */
.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.review-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.review-header h3 {
  font-size: 1.1rem;
}

.review-rating {
  color: #ffc107;
}

.review-comment {
  color: #555;
  line-height: 1.5;
}

/* 联系方式 */
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.contact-method span:first-child {
  font-size: 2rem;
  color: var(--deongaree);
}

.contact-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
}

.contact-info small {
  color: #888;
  display: block;
  margin-bottom: 0.5rem;
}

/* 错误状态 */
.error-container {
  text-align: center;
  padding: 4rem 0;
  flex: 1;
}

.error-container h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.error-container p {
  color: #666;
  margin-bottom: 2rem;
}

/* 按钮样式 */
.primary-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--deongaree);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: rgba(var(--deongaree), 0.9);
  color: var(--deongaree);
  border: 1px solid var(--deongaree);
}

.secondary-btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  color: var(--deongaree);
  border: 1px solid var(--deongaree);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background-color: var(--deongaree);
  color: white;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .store-location {
    grid-template-columns: 1fr;
  }

  .store-header-content h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .store-header {
    height: 300px;
  }

  .store-header-content h1 {
    font-size: 1.8rem;
  }

  .store-basic-info {
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-method {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }

  .contact-method span:first-child {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .store-section h2 {
    font-size: 1.5rem;
  }

  .gallery-item {
    height: 180px;
  }

  .services-list,
  .staff-list,
  .reviews-list,
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>
