<script setup>
import { useRouter } from "vue-router";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "@/components/Home/HomeFooter.vue";

const router = useRouter();
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
              医护团队以“精益求精、奉献毕生”的职人精神要求自己，以持续提高接诊率和治愈率为目标，忠实地履行着“提升动物福利"的使命...
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
              <h3>仅需4步，即可把“他”带回家</h3>
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

    <!-- 托运 Start -->
    <div class="severe-tuoyun">
      <div class="content-wrapper">
        <h2 class="content-heading">宠物托运</h2>
        <p class="content-subheading">
          提供专业宠物托运出行服务的平台。宠物出行更 轻松，一键下单，跨城无忧
        </p>
      </div>
      <!-- Workflow Start -->
      <div class="workflow">
        <div class="container">
          <!-- <div class="section-header">
            <h2>简化您的工作流程</h2>
            <p>从录制到分享，只需几秒钟</p>
          </div> -->
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>平台下单</h3>
                <p>进入托运详情页选择需要的服务下单</p>
                <img src="https://picsum.photos/600/600?random=1" />
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>平台审核</h3>
                <p>修剪视频、添加字幕、插入标注</p>
                <img src="https://picsum.photos/600/500?random=2" />
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>寄出宠物</h3>
                <p>生成链接一键分享，支持嵌入和下载</p>
                <img src="https://picsum.photos/600/500?random=3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Workflow End -->
    </div>
    <!-- 托运 End -->

    <!-- 线下 Start -->
    <div class="severe-xianxia">
      <div class="content-wrapper">
        <h2 class="content-heading">线下门店</h2>
        <p class="content-subheading">到店咨询，到店体验，提供更适宜的服务</p>
      </div>
    </div>
    <!-- 线下 ENd -->
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
  // background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235661ef' fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
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
  height: 750px;
  display: flex;
  margin: 0 auto;
  margin-top: 100px;
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
}

.adopt-section-main-right-steps-list {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.adopt-section-steps-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 90%;
  background-color: rgba(241, 243, 250, 0.88);
  z-index: 88;
  border-radius: var(--radius-10);
  box-shadow: var(--shadow-1);
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

/* 宠物托运 Start */
.severe-tuoyun {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
}

// Workflow Styles
.workflow {
  width: 76%;
  margin: 0 auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .section-header {
    text-align: center;
    margin: 48px 0;

    h2 {
      font-size: var(--fs-36);
      font-weight: var(--fw-600);
      letter-spacing: 15px;
      font-family: var(--ff-llt);
      margin-bottom: 28px;
    }

    p {
      color: var(--dark-gray);
      font-size: var(--fs-20);
      letter-spacing: 15px;
    }
  }

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 60px;

    .step {
      text-align: center;
      position: relative;

      &:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 20px;
        right: -20px;
        width: 40px;
        height: 2px;
        background: #bfc0c4;
      }

      .step-number {
        width: 48px;
        height: 48px;
        background: #f3f4f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        font-size: 20px;
        font-weight: 600;
        color: var(--deongaree);
      }

      .step-content {
        h3 {
          font-size: 24px;
          color: #1b1b1b;
          margin-bottom: 16px;
        }

        p {
          color: #6b7280;
          margin-bottom: 24px;
        }

        img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-8px);
          }
        }
      }
    }
  }
}
/* 宠物托运 End  */

/* 宠物线下 Start */
.severe-xianxia {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50px;
}
/* 宠物线下 End */
</style>
