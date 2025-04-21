<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const router = useRouter();

// 宠物详情数据
const pet = ref(null);
const loading = ref(true);
const petImages = ref([]);
const activeImageIndex = ref(0);

// 养护费用计算
const careOptions = ref({
  food: true,
  toys: true,
  medical: true,
  grooming: true,
  training: false
});

// 推荐产品
const recommendedProducts = ref([]);
// 推荐服务
const recommendedServices = ref([]);

// 获取宠物详情数据
const fetchPetDetails = () => {
  loading.value = true; // 确保加载状态被设置为true
  
  // 模拟API调用
  setTimeout(() => {
    pet.value = {
      id: props.id,
      name: "咪咪",
      type: "英短猫",
      age: "1岁2个月",
      gender: "母",
      weight: "3.5kg",
      color: "灰色",
      breed: "英国短毛猫",
      neutered: true,
      vaccinated: true,
      description: "咪咪是一只非常友好的英短猫，性格温顺，喜欢和人互动。她已完成所有必要的疫苗接种，健康状况良好。咪咪适合有养猫经验的家庭，也适合初次养猫的人士，因为她非常容易相处。",
      personality: ["友好", "安静", "亲人", "喜欢被抚摸", "独立"],
      healthInfo: {
        vaccinations: ["猫三联（已完成）", "狂犬病（已完成）"],
        medicalHistory: "无特殊病史，健康状况良好"
      },
      background: "咪咪是一只被救助的流浪猫，大约三个月前被发现于小区附近。经过救助和照料，她现在健康状况良好，正在寻找一个永久的家。"
    };

    // 更新为可访问的网络图片
    petImages.value = [
      "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg",
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg",
      "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg"
    ];

    // 获取推荐产品 - 更新为可访问的网络图片
    recommendedProducts.value = [
      {
        id: 201,
        name: "高级猫粮",
        price: 199,
        image: "https://images.pexels.com/photos/8890381/pexels-photo-8890381.jpeg",
        description: "专为成年猫设计的优质猫粮，富含必要的营养成分。"
      },
      {
        id: 202,
        name: "猫咪玩具套装",
        price: 89,
        image: "https://images.pexels.com/photos/6957670/pexels-photo-6957670.jpeg",
        description: "包含多种互动玩具，帮助猫咪保持活力和健康。"
      },
      {
        id: 203,
        name: "猫咪清洁套装",
        price: 129,
        image: "https://images.pexels.com/photos/6957774/pexels-photo-6957774.jpeg",
        description: "包含猫咪洗浴用品和梳毛工具，保持猫咪清洁。"
      }
    ];

    // 获取推荐服务 - 更新为可访问的网络图片
    recommendedServices.value = [
      {
        id: 301,
        name: "宠物医疗保险",
        price: 1299,
        image: "https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg",
        description: "年度宠物医疗保险，覆盖常规检查和紧急治疗。"
      },
      {
        id: 302,
        name: "宠物美容服务",
        price: 199,
        image: "https://images.pexels.com/photos/6816847/pexels-photo-6816847.jpeg",
        description: "专业宠物美容服务，包括洗浴、修剪和造型。"
      }
    ];

    loading.value = false;
  }, 1000);
};

// 计算月度养护费用
const monthlyCost = computed(() => {
  if (!pet.value) return { total: 0, items: [] };

  const costItems = [];
  let total = 0;

  if (careOptions.value.food) {
    const foodCost = pet.value.type.includes("猫") ? 200 : 300;
    costItems.push({ name: "食物", cost: foodCost });
    total += foodCost;
  }

  if (careOptions.value.toys) {
    const toyCost = 50;
    costItems.push({ name: "玩具", cost: toyCost });
    total += toyCost;
  }

  if (careOptions.value.medical) {
    const medicalCost = pet.value.type.includes("猫") ? 100 : 150;
    costItems.push({ name: "医疗保健", cost: medicalCost });
    total += medicalCost;
  }

  if (careOptions.value.grooming) {
    const groomingCost = pet.value.type.includes("猫") ? 80 : 120;
    costItems.push({ name: "美容护理", cost: groomingCost });
    total += groomingCost;
  }

  if (careOptions.value.training) {
    const trainingCost = 200;
    costItems.push({ name: "训练", cost: trainingCost });
    total += trainingCost;
  }

  return {
    total,
    items: costItems
  };
});

// 年度养护费用
const annualCost = computed(() => {
  return monthlyCost.value.total * 12;
});

// 切换图片
const changeImage = (index) => {
  activeImageIndex.value = index;
};

// 跳转到商品详情
const goToProductDetail = (id) => {
  router.push(`/shop/product/${id}`);
};

// 跳转到服务详情
const goToServiceDetail = (id) => {
  router.push(`/serve/detail/${id}`);
};

// 初始化
onMounted(() => {
  // 确保组件加载时立即显示加载状态
  loading.value = true;
  fetchPetDetails();
});
</script>

<template>
  <div class="adoption-detail">
    <div class="container" v-if="!loading && pet">
      <!-- 返回按钮 -->
      <div class="back-link" @click="router.push('/adoption')">
        <span class="icon-arrow-left"></span> 返回宠物列表
      </div>

      <!-- 宠物信息主体 -->
      <div class="pet-detail-main">
        <!-- 宠物图片 -->
        <div class="pet-images-container">
          <div class="main-image">
            <img :src="petImages[activeImageIndex]" :alt="pet.name" />
          </div>
          <div class="image-thumbnails">
            <div
              v-for="(image, index) in petImages"
              :key="index"
              class="thumbnail"
              :class="{ active: index === activeImageIndex }"
              @click="changeImage(index)"
            >
              <img :src="image" :alt="`${pet.name} ${index + 1}`" />
            </div>
          </div>
        </div>

        <!-- 宠物基本信息 -->
        <div class="pet-info-container">
          <div class="pet-header">
            <h1>{{ pet.name }}</h1>
            <div class="pet-tags">
              <span class="tag" v-if="pet.vaccinated">已接种疫苗</span>
              <span class="tag" v-if="pet.neutered">已绝育</span>
            </div>
          </div>

          <div class="pet-basic-info">
            <div class="info-item">
              <span class="label">品种:</span>
              <span class="value">{{ pet.breed }}</span>
            </div>
            <div class="info-item">
              <span class="label">年龄:</span>
              <span class="value">{{ pet.age }}</span>
            </div>
            <div class="info-item">
              <span class="label">性别:</span>
              <span class="value">{{ pet.gender }}</span>
            </div>
            <div class="info-item">
              <span class="label">体重:</span>
              <span class="value">{{ pet.weight }}</span>
            </div>
            <div class="info-item">
              <span class="label">颜色:</span>
              <span class="value">{{ pet.color }}</span>
            </div>
          </div>

          <div class="pet-description">
            <h3>宠物介绍</h3>
            <p>{{ pet.description }}</p>
          </div>

          <div class="pet-personality">
            <h3>性格特点</h3>
            <div class="personality-tags">
              <span class="personality-tag" v-for="(trait, index) in pet.personality" :key="index">
                {{ trait }}
              </span>
            </div>
          </div>

          <div class="adoption-actions">
            <button class="primary-btn">申请领养</button>
            <button class="secondary-btn">收藏</button>
          </div>
        </div>
      </div>

      <!-- 健康信息 -->
      <div class="pet-health-section">
        <h2>健康状况</h2>
        <div class="health-info">
          <div class="health-item">
            <div class="health-item-icon">
              <span class="icon-syringe"></span>
            </div>
            <div class="health-item-content">
              <h3>疫苗接种</h3>
              <ul class="vaccine-list">
                <li v-for="(vaccine, index) in pet.healthInfo.vaccinations" :key="index">
                  <span class="icon-check-circle"></span>
                  <span>{{ vaccine }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="health-item">
            <div class="health-item-icon">
              <span class="icon-heartbeat"></span>
            </div>
            <div class="health-item-content">
              <h3>医疗历史</h3>
              <p>{{ pet.healthInfo.medicalHistory }}</p>
            </div>
          </div>
          <div class="health-item">
            <div class="health-item-icon">
              <span class="icon-shield"></span>
            </div>
            <div class="health-item-content">
              <h3>健康状态</h3>
              <div class="health-status">
                <div class="status-badge">
                  <span class="icon-check"></span>
                  <span>体检合格</span>
                </div>
                <div class="status-badge" v-if="pet.neutered">
                  <span class="icon-check"></span>
                  <span>已绝育</span>
                </div>
                <div class="status-badge" v-if="pet.vaccinated">
                  <span class="icon-check"></span>
                  <span>疫苗齐全</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 宠物背景 -->
      <div class="pet-background-section">
        <h2>背景故事</h2>
        <p>{{ pet.background }}</p>
      </div>

      <!-- 养护费用计算 -->
      <div class="pet-care-costs-section">
        <h2>养护费用计算</h2>
        <p>估算您每月和每年需要的养护费用。选择您计划提供的项目:</p>

        <div class="care-options">
          <div class="option">
            <input type="checkbox" id="food" v-model="careOptions.food" />
            <label for="food">食物</label>
          </div>
          <div class="option">
            <input type="checkbox" id="toys" v-model="careOptions.toys" />
            <label for="toys">玩具</label>
          </div>
          <div class="option">
            <input type="checkbox" id="medical" v-model="careOptions.medical" />
            <label for="medical">医疗保健</label>
          </div>
          <div class="option">
            <input type="checkbox" id="grooming" v-model="careOptions.grooming" />
            <label for="grooming">美容护理</label>
          </div>
          <div class="option">
            <input type="checkbox" id="training" v-model="careOptions.training" />
            <label for="training">训练</label>
          </div>
        </div>

        <div class="cost-results">
          <div class="cost-breakdown">
            <h3>月度费用明细</h3>
            <div class="cost-item" v-for="(item, index) in monthlyCost.items" :key="index">
              <span class="cost-name">{{ item.name }}</span>
              <span class="cost-value">¥{{ item.cost }}</span>
            </div>
            <div class="cost-total">
              <span>每月总费用</span>
              <span>¥{{ monthlyCost.total }}</span>
            </div>
          </div>

          <div class="cost-summary">
            <div class="summary-item">
              <div class="summary-title">月度养护费用</div>
              <div class="summary-value">¥{{ monthlyCost.total }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-title">年度养护费用</div>
              <div class="summary-value">¥{{ annualCost }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐产品 -->
      <div class="recommended-products-section">
        <h2>推荐产品</h2>
        <p>这些产品将帮助您更好地照顾您的新宠物</p>

        <div class="products-grid">
          <div
            class="product-card"
            v-for="product in recommendedProducts"
            :key="product.id"
            @click="goToProductDetail(product.id)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">¥{{ product.price }}</div>
              <button class="secondary-btn">查看详情</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐服务 -->
      <div class="recommended-services-section">
        <h2>推荐服务</h2>
        <p>这些服务将确保您的宠物得到最好的照顾</p>

        <div class="services-grid">
          <div
            class="service-card"
            v-for="service in recommendedServices"
            :key="service.id"
            @click="goToServiceDetail(service.id)"
          >
            <div class="service-image">
              <img :src="service.image" :alt="service.name" />
            </div>
            <div class="service-info">
              <h3>{{ service.name }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <div class="service-price">¥{{ service.price }}</div>
              <button class="secondary-btn">了解更多</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 领养流程 -->
      <div class="adoption-process-section">
        <h2>领养流程</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-icon"><span class="icon-clipboard"></span></div>
            <h3>填写申请表</h3>
            <p>提交您的基本信息和家庭情况，帮助我们了解您的领养意向。</p>
          </div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-icon"><span class="icon-search"></span></div>
            <h3>家访评估</h3>
            <p>我们会安排工作人员进行家访，确保您能为宠物提供良好的生活环境。</p>
          </div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-icon"><span class="icon-handshake"></span></div>
            <h3>与宠物见面</h3>
            <p>见面互动，确认您与宠物的适配度。</p>
          </div>
          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-icon"><span class="icon-file-text"></span></div>
            <h3>签署协议</h3>
            <p>签署领养协议，了解并承诺宠物的责任和义务。</p>
          </div>
          <div class="process-step">
            <div class="step-number">5</div>
            <div class="step-icon"><span class="icon-home"></span></div>
            <h3>带它回家</h3>
            <p>恭喜您！带着新成员回家，开始新的生活。</p>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="contact-info-section">
        <h2>有疑问？联系我们</h2>
        <div class="contact-methods">
          <div class="contact-method">
            <div class="contact-icon"><span class="icon-phone"></span></div>
            <div class="contact-detail">
              <h3>电话咨询</h3>
              <p>400-888-9999</p>
            </div>
          </div>
          <div class="contact-method">
            <div class="contact-icon"><span class="icon-mail"></span></div>
            <div class="contact-detail">
              <h3>邮件咨询</h3>
              <p>adoption@kiripet.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="loading-state" v-else>
      <div class="spinner"></div>
      <p>正在加载宠物信息...</p>
    </div>
  </div>
</template>

<style scoped>
.adoption-detail {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.back-link:hover {
  color: #ff6b6b;
}

/* 主要信息区域 */
.pet-detail-main {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
}

.pet-images-container {
  flex: 1;
  min-width: 300px;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;
}

.thumbnail.active {
  border-color: #ff6b6b;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-info-container {
  flex: 1;
  min-width: 300px;
}

.pet-header {
  margin-bottom: 1.5rem;
}

.pet-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.pet-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background-color: #e6f7ff;
  color: #1890ff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.pet-basic-info {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  margin-bottom: 0.5rem;
}

.info-item .label {
  width: 70px;
  color: #666;
}

.info-item .value {
  font-weight: 500;
}

.pet-description h3,
.pet-personality h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.pet-description p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.personality-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.personality-tag {
  background-color: #f0f2f5;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.adoption-actions {
  display: flex;
  gap: 1rem;
}

.primary-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #ff5252;
}

.secondary-btn {
  background-color: white;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background-color: #ff6b6b;
  color: white;
}

/* 健康信息 */
.pet-health-section,
.pet-background-section,
.pet-care-costs-section,
.recommended-products-section,
.recommended-services-section,
.adoption-process-section,
.contact-info-section {
  margin-bottom: 3rem;
}

.pet-health-section h2,
.pet-background-section h2,
.pet-care-costs-section h2,
.recommended-products-section h2,
.recommended-services-section h2,
.adoption-process-section h2,
.contact-info-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f2f5;
}

.health-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.health-item {
  flex: 1;
  min-width: 250px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.health-item:hover {
  transform: translateY(-5px);
}

.health-item-icon {
  font-size: 2rem;
  color: var(--deongaree);
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.health-item-content {
  flex-grow: 1;
}

.health-item h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
}

.health-item h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--deongaree);
}

.health-item .vaccine-list {
  padding-left: 0;
  list-style: none;
}

.health-item .vaccine-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: #555;
}

.health-item .vaccine-list li span.icon-check-circle {
  color: var(--youth-green-2);
  margin-right: 0.5rem;
}

.health-item p {
  color: #555;
  line-height: 1.6;
}

.health-status {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  background-color: #e6f7ff;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: #1890ff;
  font-size: 0.9rem;
}

.status-badge span.icon-check {
  margin-right: 0.5rem;
}

/* 背景故事 */
.pet-background-section p {
  line-height: 1.6;
  color: #555;
}

/* 养护费用计算 */
.pet-care-costs-section p {
  margin-bottom: 1.5rem;
  color: #555;
}

.care-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cost-results {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.cost-breakdown {
  flex: 1;
  min-width: 250px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
}

.cost-breakdown h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.cost-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  font-weight: bold;
}

.cost-summary {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.summary-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #666;
}

.summary-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
}

/* 推荐产品 */
.recommended-products-section p,
.recommended-services-section p {
  color: #666;
  margin-bottom: 1.5rem;
}

.products-grid,
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card,
.service-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.product-card:hover,
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.product-image,
.service-image {
  height: 200px;
  width: 100%;
}

.product-image img,
.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info,
.service-info {
  padding: 1.5rem;
}

.product-info h3,
.service-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.product-description,
.service-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.product-price,
.service-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

/* 领养流程 */
.process-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.process-step {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  text-align: center;
  flex: 1;
  min-width: 200px;
  position: relative;
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff6b6b;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.process-step h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.process-step p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 联系信息 */
.contact-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 250px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
}

.contact-icon {
  font-size: 2rem;
  margin-right: 1.5rem;
}

.contact-detail h3 {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.contact-detail p {
  margin-bottom: 0;
  color: #666;
  font-size: 0.9rem;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .pet-header h1 {
    font-size: 2rem;
  }

  .main-image {
    height: 300px;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }

  .process-step, .health-item, .contact-method {
    min-width: 100%;
  }
}
</style> 