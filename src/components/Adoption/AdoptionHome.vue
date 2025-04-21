<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Notification from "@/components/Notify/notification.vue";

const router = useRouter();

// 表单数据
const contactName = ref("");
const contactEmail = ref("");
const contactMessage = ref("");

// 领养数据统计
const adoptionStats = ref({
  totalAdoptions: 2843,
  thisMonthAdoptions: 128,
  waitingPets: 347,
  happyFamilies: 2436
});

// 宠物类型
const petTypes = ref([
  { id: 1, name: "猫咪", icon: "🐱", count: 187 },
  { id: 2, name: "狗狗", icon: "🐶", count: 142 },
  { id: 3, name: "兔子", icon: "🐰", count: 18 },
  { id: 4, name: "小型宠物", icon: "🐹", count: 25 }
]);

// 推荐宠物列表
const recommendedPets = ref([]);

// 成功案例
const successStories = ref([
  {
    id: 1,
    petName: "小橘",
    petType: "橘猫",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60",
    story: "小橘是一只1岁的橘猫，非常活泼好动，喜欢追逐玩具。被一个年轻夫妇领养后，成为了他们家庭的开心果。",
    adoptionDate: "2024-02-15"
  },
  {
    id: 2,
    petName: "豆豆",
    petType: "柴犬",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60",
    story: "豆豆是一只3岁的柴犬，性格温顺，非常喜欢和人亲近。现在它已经成为了一个小男孩最好的朋友。",
    adoptionDate: "2024-01-20"
  },
  {
    id: 3,
    petName: "灰灰",
    petType: "英短猫",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60",
    story: "灰灰是一只2岁的英短猫，安静优雅，喜欢在窗台晒太阳。现在它陪伴着一位老奶奶，给她带来了很多欢乐。",
    adoptionDate: "2024-03-05"
  }
]);

// 显示通知
const showNotification = (message, type = 'success') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

// 提交咨询表单
const submitContactForm = (e) => {
  e.preventDefault();
  if (!contactName.value || !contactEmail.value || !contactMessage.value) {
    showNotification('请填写完整的咨询信息', 'warning');
    return;
  }
  
  // 模拟表单提交
  showNotification('咨询提交成功，我们将尽快与您联系', 'success');
  
  // 重置表单
  contactName.value = '';
  contactEmail.value = '';
  contactMessage.value = '';
};

// 模拟获取推荐宠物数据
const fetchRecommendedPets = () => {
  // 模拟API调用
  setTimeout(() => {
    recommendedPets.value = [
      {
        id: 101,
        name: "咪咪",
        type: "英短猫",
        age: "1岁2个月",
        gender: "母",
        image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&auto=format&fit=crop&q=60",
        description: "咪咪是一只非常友好的英短猫，喜欢和人玩耍，已经完成所有疫苗接种。",
        traits: ["友好", "安静", "亲人"],
        vaccinated: true,
        neutered: true
      },
      {
        id: 102,
        name: "旺财",
        type: "金毛犬",
        age: "2岁",
        gender: "公",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
        description: "旺财是一只活泼的金毛，喜欢户外活动，适合有院子的家庭。",
        traits: ["活泼", "友好", "聪明"],
        vaccinated: true,
        neutered: false
      },
      {
        id: 103,
        name: "小黑",
        type: "拉布拉多",
        age: "10个月",
        gender: "公",
        image: "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=500&auto=format&fit=crop&q=60",
        description: "小黑是一只年轻的拉布拉多，精力充沛，适合喜欢户外活动的家庭。",
        traits: ["活泼", "忠诚", "适合家庭"],
        vaccinated: true,
        neutered: true
      },
      {
        id: 104,
        name: "花花",
        type: "三花猫",
        age: "3岁",
        gender: "母",
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500&auto=format&fit=crop&q=60",
        description: "花花是一只温顺的三花猫，喜欢安静的环境，非常适合独居人士。",
        traits: ["温顺", "安静", "独立"],
        vaccinated: true,
        neutered: true
      }
    ];
  }, 500);
};

// 跳转到宠物详情页
const goToPetDetail = (id) => {
  router.push(`/adoption/detail/${id}`).then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// 组件挂载时获取数据
onMounted(() => {
  fetchRecommendedPets();
});
</script>

<template>
  <div class="adoption-home">
    <Notification />
    
    <!-- 头部横幅 -->
    <div class="hero-banner">
      <div class="banner-content">
        <h1>给它们一个温暖的家</h1>
        <p>每一次领养，都是一段爱的旅程的开始</p>
        <button class="primary-btn">了解领养流程</button>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="stats-section">
      <div class="section-title">
        <h2>领养数据一览</h2>
        <p>每一个数字背后都是一个温暖的故事</p>
      </div>
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">🏠</div>
          <div class="stat-number">{{ adoptionStats.totalAdoptions }}</div>
          <div class="stat-title">总领养数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-number">{{ adoptionStats.thisMonthAdoptions }}</div>
          <div class="stat-title">本月领养</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-number">{{ adoptionStats.waitingPets }}</div>
          <div class="stat-title">待领养宠物</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">❤️</div>
          <div class="stat-number">{{ adoptionStats.happyFamilies }}</div>
          <div class="stat-title">幸福家庭</div>
        </div>
      </div>
    </div>

    <!-- 宠物类型选择 -->
    <div class="pet-types-section">
      <div class="section-title">
        <h2>宠物分类</h2>
        <p>选择您喜欢的宠物类型</p>
      </div>
      <div class="pet-types-grid">
        <div class="pet-type-card" v-for="type in petTypes" :key="type.id">
          <div class="pet-type-icon">{{ type.icon }}</div>
          <div class="pet-type-name">{{ type.name }}</div>
          <div class="pet-type-count">{{ type.count }}只待领养</div>
        </div>
      </div>
    </div>

    <!-- 推荐宠物 -->
    <div class="recommended-section">
      <div class="section-title">
        <h2>为您推荐</h2>
        <p>根据您的浏览习惯，我们为您推荐以下宠物</p>
      </div>
      <div class="pets-grid">
        <div class="pet-card" v-for="pet in recommendedPets" :key="pet.id" @click="goToPetDetail(pet.id)">
          <div class="pet-card-image">
            <img :src="pet.image" :alt="pet.name">
            <div class="pet-card-badge" v-if="pet.vaccinated">已接种疫苗</div>
          </div>
          <div class="pet-card-body">
            <h3>{{ pet.name }}</h3>
            <div class="pet-card-info">
              <span>{{ pet.type }}</span>
              <span>{{ pet.age }}</span>
              <span>{{ pet.gender }}生</span>
            </div>
            <div class="pet-card-traits">
              <span class="trait-tag" v-for="(trait, index) in pet.traits" :key="index">{{ trait }}</span>
            </div>
            <p class="pet-card-description">{{ pet.description }}</p>
            <button class="secondary-btn">查看详情</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功案例 -->
    <div class="success-stories-section">
      <div class="section-title">
        <h2>成功领养故事</h2>
        <p>看看这些宠物如何成为家庭的一部分</p>
      </div>
      <div class="stories-grid">
        <div class="story-card" v-for="story in successStories" :key="story.id">
          <div class="story-card-image">
            <img :src="story.image" :alt="story.petName">
          </div>
          <div class="story-card-body">
            <h3>{{ story.petName }} - {{ story.petType }}</h3>
            <p class="adoption-date">领养于 {{ story.adoptionDate }}</p>
            <p class="story-text">{{ story.story }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 领养流程 -->
    <div class="adoption-process-section">
      <div class="section-title">
        <h2>领养流程</h2>
        <p>从申请到迎接新成员的步骤</p>
      </div>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <div class="step-icon">📋</div>
          <h3>填写申请表</h3>
          <p>提交您的基本信息和家庭情况，帮助我们了解您的领养意向。</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <div class="step-icon">🔍</div>
          <h3>家访评估</h3>
          <p>我们会安排工作人员进行家访，确保您能为宠物提供良好的生活环境。</p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <div class="step-icon">🤝</div>
          <h3>见面互动</h3>
          <p>与心仪的宠物见面互动，确认双方的适配度。</p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <div class="step-icon">📝</div>
          <h3>签署协议</h3>
          <p>签署领养协议，了解并承诺宠物的责任和义务。</p>
        </div>
        <div class="process-step">
          <div class="step-number">5</div>
          <div class="step-icon">🏠</div>
          <h3>带它回家</h3>
          <p>恭喜您！带着新成员回家，开始新的生活。</p>
        </div>
      </div>
    </div>

    <!-- 领养须知 -->
    <div class="adoption-notes-section">
      <div class="section-title">
        <h2>领养须知</h2>
        <p>领养不是一时的善举，而是一生的责任</p>
      </div>
      <div class="notes-container">
        <div class="note-item">
          <div class="note-icon">⚠️</div>
          <div class="note-content">
            <h3>年满18岁</h3>
            <p>领养人需年满18岁，有稳定的收入来源，能够负担宠物的日常开销。</p>
          </div>
        </div>
        <div class="note-item">
          <div class="note-icon">⚠️</div>
          <div class="note-content">
            <h3>提供适宜环境</h3>
            <p>家庭环境需适合宠物生活，有足够的活动空间，安全且无危险因素。</p>
          </div>
        </div>
        <div class="note-item">
          <div class="note-icon">⚠️</div>
          <div class="note-content">
            <h3>长期陪伴</h3>
            <p>领养是一生的承诺，需要有足够的时间陪伴和照顾宠物。</p>
          </div>
        </div>
        <div class="note-item">
          <div class="note-icon">⚠️</div>
          <div class="note-content">
            <h3>接受回访</h3>
            <p>领养后，我们将定期进行回访，确保宠物得到良好的照顾。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="contact-section">
      <div class="contact-container">
        <div class="contact-info">
          <h2>有疑问？联系我们</h2>
          <p>如果您对领养流程有任何疑问，或者想了解更多关于待领养宠物的信息，请随时联系我们。</p>
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">📞</div>
              <div class="contact-detail">
                <h3>电话咨询</h3>
                <p>400-888-9999</p>
              </div>
            </div>
            <div class="contact-method">
              <div class="contact-icon">✉️</div>
              <div class="contact-detail">
                <h3>邮件咨询</h3>
                <p>adoption@kiripet.com</p>
              </div>
            </div>
            <div class="contact-method">
              <div class="contact-icon">🏠</div>
              <div class="contact-detail">
                <h3>实体站点</h3>
                <p>查看全国领养中心地址</p>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <h3>发送咨询</h3>
          <form @submit.prevent="submitContactForm">
            <div class="form-group">
              <label for="name">您的姓名</label>
              <input type="text" id="name" v-model="contactName" placeholder="请输入姓名">
            </div>
            <div class="form-group">
              <label for="email">电子邮箱</label>
              <input type="email" id="email" v-model="contactEmail" placeholder="请输入邮箱">
            </div>
            <div class="form-group">
              <label for="message">咨询内容</label>
              <textarea id="message" rows="4" v-model="contactMessage" placeholder="请输入您的咨询内容"></textarea>
            </div>
            <button type="submit" class="primary-btn">提交咨询</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adoption-home {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #f9f9f9;
}

/* 头部横幅 */
.hero-banner {
  height: 500px;
  width: 100%;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1920&auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.banner-content {
  max-width: 800px;
  padding: 0 20px;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: var(--ff-hymhtw);
}

.banner-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-family: var(--ff-llt);
}

/* 通用部分 */
.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-family: var(--ff-hymhtw);
}

.section-title p {
  font-size: 1rem;
  color: #666;
  font-family: var(--ff-llt);
}

.primary-btn {
  background-color: var(--deongaree);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: var(--ff-llt);
}

.primary-btn:hover {
  background-color: #ff5252;
  transform: translateY(-2px);
}

.secondary-btn {
  background-color: transparent;
  color: var(--deongaree);
  border: 1px solid var(--deongaree);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: var(--ff-llt);
}

.secondary-btn:hover {
  background-color: var(--deongaree);
  color: white;
}

/* 数据统计部分 */
.stats-section {
  padding: 5rem 0;
  background-color: white;
}

.stats-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--deongaree);
  font-family: var(--ff-hymhtw);
}

.stat-title {
  font-size: 1rem;
  color: #666;
  font-family: var(--ff-llt);
}

/* 宠物类型选择 */
.pet-types-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.pet-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.pet-type-card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.pet-type-card:hover {
  background-color: var(--deongaree);
  color: white;
  transform: translateY(-5px);
}

.pet-type-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.pet-type-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: var(--ff-hymhtw);
}

.pet-type-count {
  font-size: 0.9rem;
  font-family: var(--ff-llt);
}

/* 推荐宠物 */
.recommended-section {
  padding: 5rem 0;
  background-color: white;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.pet-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.pet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.pet-card-image {
  height: 200px;
  width: 100%;
  position: relative;
}

.pet-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--youth-green-2);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: var(--ff-llt);
}

.pet-card-body {
  padding: 1.5rem;
}

.pet-card-body h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-family: var(--ff-hymhtw);
}

.pet-card-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
  font-family: var(--ff-llt);
}

.pet-card-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.trait-tag {
  background-color: #f0f0f0;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: var(--ff-llt);
}

.pet-card-description {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: var(--ff-llt);
}

/* 成功案例 */
.success-stories-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.story-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.story-card-image {
  height: 200px;
  width: 100%;
}

.story-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-card-body {
  padding: 1.5rem;
}

.story-card-body h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--ff-hymhtw);
}

.adoption-date {
  color: var(--deongaree);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: var(--ff-llt);
}

.story-text {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: var(--ff-llt);
}

/* 领养流程 */
.adoption-process-section {
  padding: 5rem 0;
  background-color: white;
}

.process-steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.process-step {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 200px;
  position: relative;
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--deongaree);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: var(--ff-llt);
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.process-step h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--ff-hymhtw);
}

.process-step p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: var(--ff-llt);
}

/* 领养须知 */
.adoption-notes-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.notes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.note-item {
  display: flex;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.note-icon {
  font-size: 2rem;
  margin-right: 1.5rem;
}

.note-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--ff-hymhtw);
}

.note-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: var(--ff-llt);
}

/* 联系我们 */
.contact-section {
  padding: 5rem 0;
  background-color: white;
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-info, .contact-form {
  flex: 1;
  min-width: 300px;
}

.contact-info h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-family: var(--ff-hymhtw);
}

.contact-info p {
  margin-bottom: 2rem;
  color: #666;
  font-family: var(--ff-llt);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
}

.contact-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.contact-detail h3 {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
  font-family: var(--ff-hymhtw);
}

.contact-detail p {
  margin-bottom: 0;
  color: #666;
  font-size: 0.9rem;
  font-family: var(--ff-llt);
}

.contact-form {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.contact-form h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  font-family: var(--ff-hymhtw);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  font-family: var(--ff-llt);
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: var(--ff-llt);
}

.form-group textarea {
  resize: vertical;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-banner {
    height: 400px;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-content p {
    font-size: 1rem;
  }

  .stat-card, .pet-type-card {
    min-width: 150px;
  }
}
</style> 