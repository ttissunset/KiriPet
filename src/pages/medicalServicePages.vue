<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import Notification from "@/components/Notify/notification.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 服务类别数据
const serviceCategories = ref([
  { id: 1, name: "常规体检", icon: "fa-stethoscope", description: "全面检查宠物健康状况" },
  { id: 2, name: "疫苗接种", icon: "fa-syringe", description: "预防各类常见疾病" },
  { id: 3, name: "内科诊疗", icon: "fa-pills", description: "消化、呼吸、心血管等疾病治疗" },
  { id: 4, name: "牙科服务", icon: "fa-tooth", description: "牙齿清洁、拔牙、口腔治疗" },
  { id: 5, name: "美容服务", icon: "fa-cut", description: "专业修剪、洗护、造型" },
  { id: 6, name: "化验检查", icon: "fa-microscope", description: "血液、尿液、粪便等检查" },
  { id: 7, name: "外科手术", icon: "fa-heartbeat", description: "各类常见手术和紧急手术" },
  { id: 8, name: "急诊服务", icon: "fa-first-aid", description: "24小时紧急医疗服务" }
]);

// 医生团队数据
const doctorTeam = ref([
  {
    id: 1,
    name: "王医生",
    title: "主任兽医师",
    specialty: "小动物内科",
    experience: "10年+",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
  },
  {
    id: 2,
    name: "李医生",
    title: "高级兽医师",
    specialty: "宠物外科手术",
    experience: "8年+",
    image: "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg"
  },
  {
    id: 3,
    name: "张医生",
    title: "兽医师",
    specialty: "皮肤病专科",
    experience: "5年+",
    image: "https://images.pexels.com/photos/5214956/pexels-photo-5214956.jpeg"
  },
  {
    id: 4,
    name: "赵医生",
    title: "兽医师",
    specialty: "宠物牙科",
    experience: "6年+",
    image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg"
  }
]);

// 用户评价数据
const reviews = ref([
  {
    id: 1,
    name: "刘先生",
    pet: "金毛犬",
    content: "医生技术很好，很耐心地解释了狗狗的病情和治疗方案，价格也很合理。",
    rating: 5,
    date: "2023-12-15"
  },
  {
    id: 2,
    name: "王女士",
    pet: "英短猫",
    content: "带猫咪做体检和疫苗，服务很专业，环境也很干净，猫咪很放松。",
    rating: 5,
    date: "2024-01-23"
  },
  {
    id: 3,
    name: "张先生",
    pet: "柯基犬",
    content: "24小时急诊服务很方便，半夜狗狗突然不舒服，很快就得到了救治。",
    rating: 5,
    date: "2024-02-05"
  }
]);

// 常见问题
const faqs = ref([
  {
    question: "我的宠物需要多久做一次体检？",
    answer: "一般建议成年健康宠物每年进行一次全面体检，7岁以上的老年宠物建议每半年检查一次。幼犬幼猫在疫苗接种期间需要更频繁的检查。"
  },
  {
    question: "宠物疫苗需要注射几次？",
    answer: "幼犬幼猫通常需要完成3-4次核心疫苗接种，之后每年需要进行加强免疫。具体疫苗方案会根据宠物品种、年龄和生活环境进行个性化定制。"
  },
  {
    question: "KiriPet医疗服务是否提供上门服务？",
    answer: "是的，我们提供宠物上门医疗服务，包括基础体检、疫苗接种等。对于需要特殊设备的检查和治疗，建议到院进行。"
  },
  {
    question: "如何预约KiriPet的医疗服务？",
    answer: "您可以通过官网、APP或电话预约我们的医疗服务。紧急情况下可直接前往我们的24小时急诊中心。"
  },
  {
    question: "宠物绝育手术需要注意什么？",
    answer: "宠物绝育前需要进行术前检查确认健康状况。手术后需要遵循医嘱正确护理伤口，并注意制止宠物舔舐伤口。一般7-10天后拆线。"
  }
]);

// 动态设置预约时间选项
const currentDate = new Date();
const appointmentDates = ref([]);
const selectedDate = ref("");
const selectedTime = ref("");
const selectedService = ref("");
const petName = ref("");
const petType = ref("");
const contactPhone = ref("");
const specialRequests = ref("");

// 生成未来7天的日期选项
const generateDates = () => {
  const dates = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const weekday = weekdays[date.getDay()];
    
    dates.push({
      value: `${year}-${month}-${day}`,
      label: `${month}月${day}日 (${weekday})`
    });
  }
  appointmentDates.value = dates;
};

// 显示通知
const showNotification = (message, type = 'success') => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  });
  document.dispatchEvent(event);
};

// 提交预约表单
const submitAppointment = () => {
  // 模拟提交预约
  showNotification(`预约提交成功！服务：${selectedService.value}，宠物：${petName.value}（${petType.value}），时间：${selectedDate.value} ${selectedTime.value}`, 'success');
  
  // 重置表单
  selectedService.value = "";
  selectedDate.value = "";
  selectedTime.value = "";
  petName.value = "";
  petType.value = "";
  contactPhone.value = "";
  specialRequests.value = "";
};

onMounted(() => {
  generateDates();
});
</script>

<template>
  <div class="medical-service-page">
    <!-- Add FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <HomeHeader />
    <Notification />
    
    <!-- 顶部横幅 -->
    <div class="hero-banner">
      <div class="hero-content">
        <h1>专业宠物医疗服务</h1>
        <p>专业的兽医团队，先进的医疗设备，全面呵护您爱宠的健康</p>
        <button class="primary-btn" @click="document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' })">
          立即预约
        </button>
      </div>
    </div>
    
    <!-- 服务概览 -->
    <section class="service-overview section">
      <div class="container">
        <div class="section-header">
          <h2>我们的服务</h2>
          <p>为您的爱宠提供全方位的医疗与健康服务</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" v-for="service in serviceCategories" :key="service.id">
            <div class="service-icon">
              <i :class="['fas', service.icon]"></i>
            </div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 医生团队 -->
    <section class="doctor-team section">
      <div class="container">
        <div class="section-header">
          <h2>专业医师团队</h2>
          <p>经验丰富的兽医团队，为您的宠物提供专业医疗服务</p>
        </div>
        
        <div class="doctors-grid">
          <div class="doctor-card" v-for="doctor in doctorTeam" :key="doctor.id">
            <div class="doctor-image">
              <img :src="doctor.image" :alt="doctor.name">
            </div>
            <div class="doctor-info">
              <h3>{{ doctor.name }}</h3>
              <p class="doctor-title">{{ doctor.title }}</p>
              <p class="doctor-specialty">专长：{{ doctor.specialty }}</p>
              <p class="doctor-experience">经验：{{ doctor.experience }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 预约服务 -->
    <section id="appointment" class="appointment-section section">
      <div class="container">
        <div class="section-header">
          <h2>在线预约</h2>
          <p>快速便捷地预约我们的宠物医疗服务</p>
        </div>
        
        <div class="appointment-container">
          <div class="appointment-info">
            <h3>预约指南</h3>
            <ul class="appointment-steps">
              <li>
                <span class="step-number">1</span>
                <div class="step-content">
                  <h4>选择服务</h4>
                  <p>选择您需要的医疗服务类型</p>
                </div>
              </li>
              <li>
                <span class="step-number">2</span>
                <div class="step-content">
                  <h4>选择时间</h4>
                  <p>选择适合您的日期和时间段</p>
                </div>
              </li>
              <li>
                <span class="step-number">3</span>
                <div class="step-content">
                  <h4>填写信息</h4>
                  <p>填写您的联系方式和宠物信息</p>
                </div>
              </li>
              <li>
                <span class="step-number">4</span>
                <div class="step-content">
                  <h4>确认预约</h4>
                  <p>我们将通过电话确认您的预约</p>
                </div>
              </li>
            </ul>
            
            <div class="contact-info">
              <p><i class="fas fa-phone"></i> 电话：400-123-4567</p>
              <p><i class="fas fa-clock"></i> 营业时间：周一至周日 9:00-21:00</p>
              <p class="emergency"><i class="fas fa-ambulance"></i> 24小时急诊服务</p>
              <p><i class="fas fa-map-marker-alt"></i> 地址：各大城市均有连锁医疗机构</p>
            </div>
          </div>
          
          <div class="appointment-form">
            <form @submit.prevent="submitAppointment">
              <div class="form-group">
                <label for="service"><i class="fas fa-briefcase-medical"></i> 选择服务</label>
                <select id="service" v-model="selectedService" required>
                  <option value="">请选择服务类型</option>
                  <option v-for="service in serviceCategories" :key="service.id" :value="service.name">
                    {{ service.name }}
                  </option>
                </select>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="date"><i class="fas fa-calendar-alt"></i> 选择日期</label>
                  <select id="date" v-model="selectedDate" required>
                    <option value="">请选择日期</option>
                    <option v-for="date in appointmentDates" :key="date.value" :value="date.value">
                      {{ date.label }}
                    </option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="time"><i class="fas fa-clock"></i> 选择时间</label>
                  <select id="time" v-model="selectedTime" required>
                    <option value="">请选择时间</option>
                    <option value="09:00-10:00">09:00-10:00</option>
                    <option value="10:00-11:00">10:00-11:00</option>
                    <option value="11:00-12:00">11:00-12:00</option>
                    <option value="14:00-15:00">14:00-15:00</option>
                    <option value="15:00-16:00">15:00-16:00</option>
                    <option value="16:00-17:00">16:00-17:00</option>
                    <option value="17:00-18:00">17:00-18:00</option>
                    <option value="18:00-19:00">18:00-19:00</option>
                  </select>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="petName"><i class="fas fa-paw"></i> 宠物名称</label>
                  <input type="text" id="petName" v-model="petName" placeholder="请输入宠物名称" required>
                </div>
                
                <div class="form-group">
                  <label for="petType"><i class="fas fa-dog"></i> 宠物类型</label>
                  <input type="text" id="petType" v-model="petType" placeholder="如：猫/狗/品种" required>
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone"><i class="fas fa-phone-alt"></i> 联系电话</label>
                <input type="tel" id="phone" v-model="contactPhone" placeholder="请输入您的联系电话" required>
              </div>
              
              <div class="form-group">
                <label for="requests"><i class="fas fa-comment-medical"></i> 特殊需求（选填）</label>
                <textarea id="requests" v-model="specialRequests" placeholder="请描述您的特殊需求或宠物状况"></textarea>
              </div>
              
              <button type="submit" class="primary-btn">
                <i class="fas fa-calendar-check"></i> 提交预约
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 用户评价 -->
    <section class="testimonials section">
      <div class="container">
        <div class="section-header">
          <h2>客户评价</h2>
          <p>听听其他宠物主人的真实体验</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="review in reviews" :key="review.id">
            <div class="testimonial-rating">
              <span v-for="n in 5" :key="n">
                <i :class="['fas', n <= review.rating ? 'fa-star' : 'fa-star-o']"></i>
              </span>
            </div>
            <p class="testimonial-content">{{ review.content }}</p>
            <div class="testimonial-author">
              <p class="author-name">{{ review.name }}</p>
              <p class="author-pet">{{ review.pet }} · {{ review.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 常见问题 -->
    <section class="faq-section section">
      <div class="container">
        <div class="section-header">
          <h2>常见问题</h2>
          <p>解答您关心的宠物医疗问题</p>
        </div>
        
        <div class="faq-list">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 健康科普 -->
    <section class="health-tips section">
      <div class="container">
        <div class="section-header">
          <h2>宠物健康小知识</h2>
          <p>了解更多关于宠物健康的专业知识</p>
        </div>
        
        <div class="health-tips-grid">
          <div class="tip-card">
            <h3>猫咪饮食指南</h3>
            <p>猫咪是严格的肉食动物，需要高蛋白、低碳水化合物的饮食。成年猫每天需要2-3次定时定量喂食，避免食物中毒和肥胖问题。</p>
            <a href="#" class="read-more">阅读更多</a>
          </div>
          
          <div class="tip-card">
            <h3>狗狗口腔护理</h3>
            <p>定期刷牙是保持狗狗口腔健康的最佳方式。建议每周至少刷牙2-3次，使用专用宠物牙膏，避免使用人用牙膏。</p>
            <a href="#" class="read-more">阅读更多</a>
          </div>
          
          <div class="tip-card">
            <h3>宠物疫苗知识</h3>
            <p>及时接种疫苗是预防传染病的关键。犬猫幼年期需要完成一系列基础疫苗接种，成年后需要定期加强免疫。</p>
            <a href="#" class="read-more">阅读更多</a>
          </div>
        </div>
      </div>
    </section>
    
    <HomeFooter />
  </div>
</template>

<style scoped>
.medical-service-page {
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--deongaree);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--deongaree);
}

.section-header p {
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
}

/* 顶部横幅 */
.hero-banner {
  height: 500px;
  background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/7469529/pexels-photo-7469529.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-content {
  max-width: 700px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.primary-btn {
  background-color: var(--deongaree);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background-color: #3f48cc;
  transform: translateY(-3px);
}

/* 服务概览 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.service-card {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 70px;
  height: 70px;
  background-color: rgba(63, 72, 204, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.service-icon i {
  font-size: 28px;
  color: var(--deongaree);
}

.service-card h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #333;
}

.service-card p {
  color: #6c757d;
  font-size: 0.9rem;
}

/* 医生团队 */
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.doctor-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.doctor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  height: 250px;
  overflow: hidden;
}

.doctor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.doctor-card:hover .doctor-image img {
  transform: scale(1.1);
}

.doctor-info {
  padding: 20px;
}

.doctor-info h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 5px;
}

.doctor-title {
  color: var(--deongaree);
  font-weight: 500;
  margin-bottom: 10px;
}

.doctor-specialty, .doctor-experience {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

/* 预约服务 */
.appointment-section {
  background-color: white;
  position: relative;
}

.appointment-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.pexels.com/photos/7469414/pexels-photo-7469414.jpeg');
  background-size: cover;
  background-position: center;
  opacity: 0.05;
  z-index: 0;
}

.appointment-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.appointment-steps {
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
}

.appointment-steps li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: var(--deongaree);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 5px;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #6c757d;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.contact-info p {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.contact-info i {
  color: var(--deongaree);
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.emergency {
  color: #dc3545;
  font-weight: bold;
  margin: 15px 0;
  display: flex;
  align-items: center;
  background-color: rgba(220, 53, 69, 0.08);
  padding: 10px 15px;
  border-radius: 5px;
}

.emergency i {
  margin-right: 10px;
  color: #dc3545;
}

.appointment-form {
  background-color: #fff;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.appointment-form:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

form label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
}

form label i {
  color: var(--deongaree);
  margin-right: 8px;
  font-size: 16px;
}

input, select, textarea {
  width: 100%;
  padding: 14px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--deongaree);
  box-shadow: 0 0 0 3px rgba(63, 72, 204, 0.15);
  outline: none;
  background-color: white;
}

.primary-btn {
  background: linear-gradient(135deg, var(--deongaree), #3f48cc);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(63, 72, 204, 0.3);
  width: 100%;
}

.primary-btn i {
  margin-right: 8px;
}

.primary-btn:hover {
  background: linear-gradient(135deg, #3f48cc, var(--deongaree));
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(63, 72, 204, 0.4);
}

/* 用户评价 */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.testimonial-rating {
  color: #ffc107;
  margin-bottom: 15px;
}

.testimonial-content {
  color: #6c757d;
  margin-bottom: 20px;
  font-style: italic;
  line-height: 1.6;
}

.author-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.author-pet {
  color: #6c757d;
  font-size: 0.9rem;
}

/* 常见问题 */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}

.faq-question {
  background-color: white;
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.faq-answer {
  padding: 0 20px 20px;
  color: #6c757d;
  line-height: 1.6;
}

/* 健康科普 */
.health-tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.tip-card {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.tip-card h3 {
  color: #333;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
}

.tip-card h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--deongaree);
}

.tip-card p {
  color: #6c757d;
  margin-bottom: 20px;
  line-height: 1.6;
}

.read-more {
  color: var(--deongaree);
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.read-more:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .appointment-container {
    grid-template-columns: 1fr;
  }
  
  .appointment-info {
    order: 2;
  }
  
  .appointment-form {
    order: 1;
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
  
  .hero-banner {
    height: 400px;
  }
  
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .hero-banner {
    height: 350px;
  }
  
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .doctor-image {
    height: 200px;
  }
}
</style> 