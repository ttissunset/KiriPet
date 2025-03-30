<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";

const router = useRouter();

// 轮播图相关逻辑
const currentSlide = ref(0);
const totalSlides = ref(6); // 增加总数量
let autoSlideInterval = null;

// 计算是否在最左边或最右边
const isAtFirstSlide = computed(() => currentSlide.value === 0);
const isAtLastSlide = computed(
  () => currentSlide.value === totalSlides.value - 1
);
// 当显示最后三个门店时禁用下一个按钮
const isShowingLastThree = computed(
  () => currentSlide.value >= totalSlides.value - 3
);

const moveToSlide = (index) => {
  currentSlide.value = index;
  updateCarouselPosition();
};

const updateCarouselPosition = () => {
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  if (carouselWrapper) {
    const carouselItems = document.querySelectorAll(".carousel-item");
    if (carouselItems.length > 0) {
      const slideWidth = carouselItems[0].offsetWidth + 20; // 加上margin
      carouselWrapper.style.transform = `translateX(-${
        currentSlide.value * slideWidth
      }px)`;
    }
  }
};

const nextSlide = () => {
  // 如果不是最后一个才能继续向右
  if (!isAtLastSlide.value) {
    currentSlide.value++;
    updateCarouselPosition();
  }
};

const prevSlide = () => {
  // 如果不是第一个才能继续向左
  if (!isAtFirstSlide.value) {
    currentSlide.value--;
    updateCarouselPosition();
  }
};

const startAutoSlide = () => {
  // 此功能已禁用
  // autoSlideInterval = setInterval(() => {
  //   if (isAtLastSlide.value) {
  //     moveToSlide(0);
  //   } else {
  //     nextSlide();
  //   }
  // }, 5000);
};

onMounted(() => {
  // 初始化轮播图位置
  updateCarouselPosition();

  // 窗口大小变化时重新计算位置
  window.addEventListener("resize", updateCarouselPosition);

  // 自动轮播已禁用
  // startAutoSlide();
});

onBeforeUnmount(() => {
  // 清除定时器和事件监听
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  window.removeEventListener("resize", updateCarouselPosition);
});
</script>

<template>
  <HomeHeader></HomeHeader>
  <div class="severe-container">
    <!-- 医生 Start -->
    <div class="severe-doctor">
      <div class="content-wrapper">
        <h2 class="content-heading">宠物医疗</h2>
        <p class="content-subheading">
          执业兽医师，专业的医疗团队，为宠物健康保驾护航
        </p>
      </div>
      <div class="doctor-main">
        <div class="main-images">
          <div class="doctor-img">
            <img src="../assets/image/doctor-1.jpg" />
          </div>
          <div
            class="info-card"
            style="background-color: rgba(241, 243, 250, 0.88)"
          >
            <div class="info-card-header">实力雄厚</div>
            <div class="info-card-main">
              医护团队以"精益求精、奉献毕生"的职人精神要求自己，以持续提高接诊率和治愈率为目标，忠实地履行着"提升动物福利"的使命...
            </div>
          </div>
          <div class="doctor-img">
            <img src="../assets/image/doctor-2.jpg" />
          </div>
          <div
            class="info-card"
            style="background-color: rgba(241, 243, 250, 0.88)"
          >
            <div class="info-card-header">保障品质</div>
            <div class="info-card-main">
              kiripet宠物平台所有商品均从正规渠道采购，享有正品保障及价格优势...
            </div>
          </div>
          <div class="doctor-img">
            <img src="../assets/image/doctor-3.png" />
          </div>
          <div
            class="info-card"
            style="background-color: rgba(241, 243, 250, 0.88)"
          >
            <div class="info-card-header">医疗技术</div>
            <div class="info-card-main">
              年接诊逾2000+病例，在宠物骨科、眼科、肿瘤、牙科、皮肤科、心肺科、中兽医等专科领域，引领着国内宠物专科的发展方向.
            </div>
          </div>
        </div>
        <div class="doctor-btn">
          <h3 class="btn-content">专业的宠物医疗服务，让您安心</h3>
          <div class="btn-button">
            <button>前往查看</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 医生 End -->

    <!-- 领养 Start -->
    <div class="severe-petAdopt">
      <section class="adopt-section">
        <div class="content-wrapper">
          <h2 class="content-heading">宠物领养</h2>
          <p class="content-subheading">
            选择领养，用心去爱，让每一个毛孩子都能拥有幸福的归宿
          </p>
        </div>
        <div class="adopt-section-main">
          <div class="adopt-section-main-left">
            <div class="adopt-section-main-left-main">
              <div class="adopt-section-main-left-main-title">
                <img
                  src="https://kiripet.tos-cn-beijing.volces.com/image/undraw_pet_adoption_-2-qkw.svg"
                  class="circle-1"
                />
              </div>
            </div>
          </div>
          <div class="adopt-section-main-right">
            <div class="adopt-section-main-right-title">
              <h3>仅需4步，即可把"他"带回家</h3>
              <button @click="router.push('/severe')">立即领养</button>
            </div>
            <div class="adopt-section-main-right-steps-list">
              <div class="adopt-section-steps-item">
                <div class="adopt-section-steps-item-top-container">
                  <div class="adopt-section-steps-item-top">1</div>
                </div>

                <div class="adopt-section-steps-item-main">
                  <div class="adopt-section-steps-item-title">注册账号</div>
                  <div class="adopt-section-steps-item-text">
                    拥有KiriPet的账号，您将解锁更多功能
                  </div>
                </div>
              </div>

              <div class="adopt-section-steps-item">
                <div class="adopt-section-steps-item-top-container">
                  <div class="adopt-section-steps-item-top top-white">2</div>
                </div>

                <div class="adopt-section-steps-item-main">
                  <div class="adopt-section-steps-item-title">完善信息</div>
                  <div class="adopt-section-steps-item-text">
                    完善您的姓名、电话(或电邮)、地址等信息，以便我们能够及时联系您
                  </div>
                </div>
              </div>

              <div class="adopt-section-steps-item">
                <div class="adopt-section-steps-item-top-container">
                  <div class="adopt-section-steps-item-top">3</div>
                </div>

                <div class="adopt-section-steps-item-main">
                  <div class="adopt-section-steps-item-title">发送申请</div>
                  <div class="adopt-section-steps-item-text">
                    如果您有心仪的领养目标，提交您的宠物领养申请，我们们尽快处理您的申请信息
                  </div>
                </div>
              </div>

              <div class="adopt-section-steps-item">
                <div class="adopt-section-steps-item-top-container">
                  <div class="adopt-section-steps-item-top top-white">4</div>
                </div>

                <div class="adopt-section-steps-item-main">
                  <div class="adopt-section-steps-item-title">资质审核</div>
                  <div class="adopt-section-steps-item-text">
                    我们将会审核您是否有资格领养，并给予您相应的资格证书，审核通过后，您将获得专属的宠物，专属的服务
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 领养 End -->

    <!-- 线下 Start -->
    <div class="severe-xianxia">
      <div class="content-wrapper">
        <h2 class="content-heading">线下门店</h2>
        <p class="content-subheading">到店咨询，到店体验，提供更适宜的服务</p>
      </div>

      <!-- 门店图片轮播 -->
      <div class="store-carousel-section">
        <div class="store-carousel">
          <div class="carousel-container">
            <div class="carousel-wrapper">
              <!-- 轮播项 1 -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/11/13/14/05/architectural-2945830_1280.jpg"
                    alt="KiriPet 北京三里屯店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 三里屯</h4>
                  <p>
                    北京市朝阳区三里屯路 19 号院<br />三里屯太古里南区 7 号楼
                  </p>
                  <div class="carousel-hours">营业至 22:00</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/1')"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <!-- 轮播项 2 -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg"
                    alt="KiriPet 王府井店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 王府井</h4>
                  <p>北京市东城区王府井大街 138 号<br />北京 apm</p>
                  <div class="carousel-hours">营业至 22:00</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/2')"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <!-- 轮播项 3 -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/11/23/55/trees-1587301_1280.jpg"
                    alt="KiriPet 西单大悦城店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 西单大悦城</h4>
                  <p>北京市西城区西单北大街 131 号<br />大悦城</p>
                  <div class="carousel-hours">营业至 22:00</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/3')"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <!-- 轮播项 4 (新增) -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_1280.jpg"
                    alt="KiriPet 上海南京东路店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 南京东路</h4>
                  <p>上海市黄浦区南京东路 138 号<br />世茂广场 5 楼</p>
                  <div class="carousel-hours">营业至 21:30</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/4')"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <!-- 轮播项 5 (新增) -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/08/01/09/34/white-2563976_1280.jpg"
                    alt="KiriPet 广州天河城店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 天河城</h4>
                  <p>广州市天河区天河路 208 号<br />天河城购物中心 4 楼</p>
                  <div class="carousel-hours">营业至 22:30</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/5')"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <!-- 轮播项 6 (新增) -->
              <div class="carousel-item">
                <div class="carousel-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256_1280.jpg"
                    alt="KiriPet 深圳万象城店"
                  />
                </div>
                <div class="carousel-content">
                  <h4>KiriPet 万象城</h4>
                  <p>深圳市南山区深南大道 9668 号<br />万象城购物中心 L2 层</p>
                  <div class="carousel-hours">营业至 22:00</div>
                  <button
                    class="store-details-btn"
                    @click="router.push('/store/6')"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 轮播控制按钮 -->
          <div class="carousel-controls">
            <button
              class="carousel-prev-btn"
              aria-label="上一个"
              @click="prevSlide"
              :class="{ disabled: isAtFirstSlide }"
              :disabled="isAtFirstSlide"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-indicators">
              <span
                class="indicator"
                :class="{ active: currentSlide === 0 }"
                @click="moveToSlide(0)"
              ></span>
              <span
                class="indicator"
                :class="{ active: currentSlide === 1 }"
                @click="moveToSlide(1)"
              ></span>
              <span
                class="indicator"
                :class="{ active: currentSlide === 2 }"
                @click="moveToSlide(2)"
              ></span>
              <span
                class="indicator"
                :class="{
                  active:
                    currentSlide === 3 ||
                    currentSlide === 4 ||
                    currentSlide === 5,
                }"
                @click="moveToSlide(3)"
              ></span>
            </div>
            <button
              class="carousel-next-btn"
              aria-label="下一个"
              @click="nextSlide"
              :class="{ disabled: isShowingLastThree }"
              :disabled="isShowingLastThree"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 全国门店导航 -->
      <div class="nationwide-store-section">
        <div class="nationwide-store-title">
          <h3>按地区查找门店</h3>
        </div>
        <div class="regions-grid">
          <div class="region-column">
            <h4>华北地区</h4>
            <ul class="region-cities">
              <li><a href="#">北京 (4)</a></li>
              <li><a href="#">天津 (2)</a></li>
              <li><a href="#">石家庄 (1)</a></li>
              <li><a href="#">太原 (1)</a></li>
            </ul>
          </div>
          <div class="region-column">
            <h4>华东地区</h4>
            <ul class="region-cities">
              <li><a href="#">上海 (6)</a></li>
              <li><a href="#">杭州 (3)</a></li>
              <li><a href="#">南京 (2)</a></li>
              <li><a href="#">苏州 (2)</a></li>
              <li><a href="#">宁波 (1)</a></li>
            </ul>
          </div>
          <div class="region-column">
            <h4>华南地区</h4>
            <ul class="region-cities">
              <li><a href="#">广州 (3)</a></li>
              <li><a href="#">深圳 (3)</a></li>
              <li><a href="#">福州 (1)</a></li>
              <li><a href="#">厦门 (1)</a></li>
            </ul>
          </div>
          <div class="region-column">
            <h4>西南地区</h4>
            <ul class="region-cities">
              <li><a href="#">成都 (2)</a></li>
              <li><a href="#">重庆 (2)</a></li>
              <li><a href="#">昆明 (1)</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 线下 End -->
  </div>
  <HomeFooter></HomeFooter>
</template>

<style scoped lang="scss">
button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--deongaree);
}

button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

.severe-container {
  width: 74%;
  margin: 0 auto;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235661ef' fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
}

.content-wrapper {
  margin-left: auto;
  max-width: 600px;
  margin-right: auto;
  text-align: center;
}

.content-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.content-subheading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
}

/* 宠物医生 Start */
.severe-doctor {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
}

.doctor-main {
  margin-top: 50px;
}

.main-images {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
}

.main-images div {
  border-radius: var(--radius-6);
}

.doctor-img img {
  width: 400px;
  height: 350px;
}

.info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 80px;
}

.info-card-header {
  font-size: var(--fs-24);
  font-weight: var(--fw-600);
}

.info-card-main {
  font-size: var(--fs-14);
  margin-top: 20px;
  color: #6e6d6d;
}

.doctor-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;
}

.btn-content {
  margin-right: 20px;
}

.btn-button button {
  align-content: center;
  margin-top: 0px;
}
/* 宠物医生 End */

/* 宠物领养 Starrt */
.severe-petAdopt {
  width: 100%;
  height: auto; /* 改为自适应高度 */
  display: flex;
  margin: 0 auto;
  margin-top: 50px; /* 减少与上方区域的间距 */
  justify-content: center;
}

.severe-petAdopt .adopt-section {
  padding: 64px 0;
  padding-top: 72px;
}

.adopt-section-main {
  width: 100%;
  display: flex;
  margin-top: 50px;
  height: 450px;
}

.adopt-section-main-left {
  width: 50%;
  display: flex;
}

.adopt-section-main-left-main {
  width: 100%;
  display: flex;
  justify-content: center;
}

.circle-1 {
  width: 500px;
  height: 450px;
}

.adopt-section-main-right {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.adopt-section-main-right-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* 增加底部间距，防止与步骤卡片重叠 */
}

.adopt-section-main-right-steps-list {
  width: 100%;
  height: auto; /* 改为自适应高度 */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px; /* 添加间隙 */
  align-items: start; /* 顶部对齐 */
  justify-content: center;
  justify-items: center;
  padding-top: 10px; /* 添加顶部内边距 */
}

.adopt-section-steps-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: auto; /* 改为自适应高度 */
  min-height: 180px; /* 设置最小高度 */
  background-color: rgba(241, 243, 250, 0.88);
  z-index: 1; /* 降低z-index以避免与按钮重叠 */
  border-radius: var(--radius-10);
  box-shadow: var(--shadow-1);
  padding: 15px 0; /* 添加内边距 */
}

.adopt-section-steps-item:hover {
  transform: scale(1.1);
  transition: var(--transition-2);
}

.adopt-section-steps-item-title {
  text-align: center;
  font-weight: var(--fw-600);
  font-size: var(--fs-18);
  letter-spacing: 1px;
}

.adopt-section-steps-item-text {
  text-align: center;
  font-size: var(--fs-12);
  width: 75%;
  line-height: 25px;
  letter-spacing: 1px;
  margin-top: 5%;
  color: #6e6d6d;
}

.adopt-section-steps-item-top {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-circle);
  background-color: #e8e5fa;
  box-shadow: var(--shadow-3);
  font-size: var(--fs-18);
  font-family: "Adobe Garamond Pro Bold";
}

.top-white {
  background-color: white;
}

.adopt-section-steps-item-top-container {
  width: 100%;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
}

.adopt-section-steps-item-main {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 宠物领养 End */

/* 宠物线下 Start */
.severe-xianxia {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
}

/* 门店轮播样式 */
.store-carousel-section {
  margin-bottom: 80px;
  margin-top: 20px;
}

.carousel-title {
  text-align: center;
  margin-bottom: 40px;
}

.carousel-title h3 {
  font-size: 28px;
  color: var(--deongaree);
  margin-bottom: 15px;
}

.carousel-title p {
  font-size: 16px;
  color: #6e6d6d;
  max-width: 600px;
  margin: 0 auto;
}

.store-carousel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px; /* 添加左右padding防止内容溢出 */
}

.carousel-container {
  overflow: hidden;
  padding: 10px 0; /* 修改为只有上下padding */
  position: relative; /* 添加相对定位 */
  width: 100%; /* 确保容器占满宽度 */
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  margin-left: 0; /* 确保没有左边距 */
}

.carousel-item {
  min-width: calc(33.333% - 20px);
  margin: 0 10px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* 添加轻微阴影增强边界感 */
}

.carousel-image {
  height: 220px;
  overflow: hidden;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.carousel-item:hover .carousel-image img {
  transform: scale(1.05);
}

.carousel-content {
  padding: 25px;
}

.carousel-content h4 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--deongaree);
}

.carousel-content p {
  font-size: 14px;
  color: #6e6d6d;
  line-height: 1.5;
  margin-bottom: 15px;
}

.carousel-hours {
  font-size: 14px;
  color: #888;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.carousel-prev-btn,
.carousel-next-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--deongaree);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 15px;

  &.disabled {
    opacity: 0.3; /* 降低透明度使禁用状态更明显 */
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #ccc;
    border-color: #eee;
    pointer-events: none; /* 确保禁用时完全不可点击 */

    &:hover {
      background-color: #f5f5f5;
      color: #ccc;
      border-color: #eee;
      transform: none;
      box-shadow: none;
    }
  }
}

.carousel-prev-btn:hover,
.carousel-next-btn:hover {
  background-color: var(--deongaree);
  color: white;
  border-color: var(--deongaree);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.carousel-indicators {
  display: flex;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: var(--deongaree);
  width: 20px;
  border-radius: 4px;
}

/* 响应式调整 */
@media screen and (max-width: 1024px) {
  .carousel-item {
    min-width: calc(50% - 20px);
  }
}

@media screen and (max-width: 768px) {
  .carousel-item {
    min-width: calc(100% - 40px);
    margin: 0 20px;
  }
}

/* 全国门店导航 */
.nationwide-store-section {
  background-color: rgba(241, 243, 250, 0.5);
  padding: 60px 0;
  border-radius: 16px;
  margin-bottom: 80px;
}

.nationwide-store-title {
  text-align: center;
  margin-bottom: 40px;
}

.nationwide-store-title h3 {
  font-size: 24px;
  color: var(--deongaree);
}

.regions-grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.region-column {
  width: 180px;
  margin-bottom: 30px;
}

.region-column h4 {
  font-size: 18px;
  color: var(--deongaree);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(var(--deongaree-rgb), 0.2);
}

.region-cities {
  list-style: none;
  padding: 0;
  margin: 0;
}

.region-cities li {
  margin-bottom: 10px;
}

.region-cities a {
  color: #6e6d6d;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.region-cities a:hover {
  color: var(--deongaree);
}

/* 门店服务简介 */
.store-services-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 80px;
}

.service-card {
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background-color: rgba(var(--deongaree-rgb), 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon i {
  font-size: 30px;
  color: var(--deongaree);
}

.service-card h3 {
  font-size: 18px;
  color: var(--deongaree);
  margin-bottom: 15px;
}

.service-card p {
  font-size: 14px;
  color: #6e6d6d;
  line-height: 1.6;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .store-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-store {
    flex-direction: column;
  }

  .featured-store-image {
    max-width: 100%;
    height: 300px;
  }

  .store-services-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .store-grid {
    grid-template-columns: 1fr;
  }

  .regions-grid {
    justify-content: space-between;
  }

  .region-column {
    width: 48%; /* 改为略小于50%的宽度，确保两列布局 */
    margin: 0 0 20px; /* 移除左右边距，保留底部边距 */
  }

  .service-card {
    padding: 20px;
  }

  .featured-store-content {
    padding: 30px 20px;
  }

  .featured-badge {
    top: 30px;
    right: 20px;
  }
}

@media screen and (max-width: 480px) {
  .store-services-section {
    grid-template-columns: 1fr;
  }

  .region-column {
    width: 100%;
    margin-bottom: 20px;
  }

  .featured-store-actions {
    flex-direction: column;
  }
}
/* 宠物线下 End */

/* 添加详情按钮样式 */
.store-details-btn {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 8px 0;
  background-color: transparent;
  color: var(--deongaree);
  border: 1px solid var(--deongaree);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.store-details-btn:hover {
  background-color: var(--deongaree);
  color: white;
}

/* 响应式设计 - 整体布局 */
@media screen and (max-width: 1400px) {
  .severe-container {
    width: 85%;
  }
  
  .doctor-img img {
    width: 100%;
    height: auto;
  }
  
  .info-card {
    padding: 0 40px;
  }
}

@media screen and (max-width: 1200px) {
  .severe-container {
    width: 90%;
  }
  
  .content-heading {
    font-size: 30px;
    letter-spacing: 10px;
  }
  
  .content-subheading {
    font-size: 18px;
    letter-spacing: 8px;
  }
  
  /* 医生板块响应式 */
  .main-images {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  
  .info-card {
    padding: 20px 30px;
  }
  
  .severe-doctor {
    height: auto;
    padding-bottom: 50px;
  }
  
  /* 领养板块响应式 */
  .severe-petAdopt {
    height: auto;
    padding-bottom: 50px;
  }
  
  .adopt-section-main {
    flex-direction: column;
    height: auto;
  }
  
  .adopt-section-main-left, 
  .adopt-section-main-right {
    width: 100%;
  }
  
  .adopt-section-main-left {
    margin-bottom: 30px;
  }
  
  .circle-1 {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
}

@media screen and (max-width: 992px) {
  .adopt-section-main-right-steps-list {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .adopt-section-steps-item {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .doctor-btn {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-content {
    margin-right: 0;
    margin-bottom: 15px;
    text-align: center;
  }
  
  /* 医生板块在手机端改为一列布局 */
  .main-images {
    grid-template-columns: 1fr;
  }
  
  .carousel-image {
    height: 180px;
  }
  
  .carousel-content {
    padding: 15px;
  }
  
  .carousel-content h4 {
    font-size: 18px;
  }
}

@media screen and (max-width: 576px) {
  .severe-container {
    width: 95%;
  }
  
  .content-heading {
    font-size: 24px;
    letter-spacing: 5px;
  }
  
  .content-subheading {
    font-size: 16px;
    letter-spacing: 3px;
  }
  
  .adopt-section-main-right-title {
    flex-direction: column;
    text-align: center;
    margin-bottom: 25px; /* 增加底部间距 */
  }
  
  .adopt-section-main-right-title h3 {
    margin-bottom: 15px;
  }
  
  .adopt-section-main-right-steps-list {
    grid-template-columns: 1fr 1fr; /* 小屏幕上改为两列 */
    gap: 15px;
  }
  
  .region-column {
    width: 48%; /* 确保即使在最小屏幕也保持两列 */
  }
  
  .nationwide-store-section {
    padding: 40px 0;
  }
  
  .carousel-controls {
    flex-wrap: wrap;
  }
  
  .carousel-indicators {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 15px;
  }
}
</style>
