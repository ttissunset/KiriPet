<script setup>
import ScrollReveal from "scrollreveal";
import { reactive, ref, onMounted } from "vue";
import vips from "../mock/vips";
import infos from "../mock/infos";
import shops from "../mock/shops";
import goods from "../mock/goods";

let isOpen = ref(1);

// 在reactive()中声明scrollReveal组件
const data = reactive({
  scrollReveal: ScrollReveal(),
});
// 设置scrollReveal的方法
const retScroll = () => {
  // reveal()的类名可以为id (#reveal-top) 也可以为class(.reveal-top) 名称随意 并且也支持并集class写法 注意必须设置类否则无法使用
  data.scrollReveal.reveal(".main-box-text", {
    // 动画的时长
    duration: 1000,
    // 延迟时间
    delay: 200,
    // 动画开始的位置，'bottom', 'left', 'top', 'right'
    origin: "top",
    // 回滚的时候是否再次触发动画
    reset: false,
    // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
    // 滚动的距离，单位可以用%，rem等
    distance: "100px",
    // 执行速度 线性函数啥的
    easing: "cubic-bezier(0.5, 0, 0, 1)",
  });
  data.scrollReveal.reveal(".main-box-subText", {
    // 动画的时长
    duration: 1000,
    // 延迟时间
    delay: 150,
    // 动画开始的位置，'bottom', 'left', 'top', 'right'
    origin: "top",
    // 回滚的时候是否再次触发动画
    reset: false,
    // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
    // 滚动的距离，单位可以用%，rem等
    distance: "110px",
    // 执行速度 线性函数啥的
    easing: "cubic-bezier(0.5, 0, 0, 1)",
  });
  data.scrollReveal.reveal(".main-box-startBtn", {
    // 动画的时长
    duration: 800,
    // 延迟时间
    delay: 100,
    // 动画开始的位置，'bottom', 'left', 'top', 'right'
    origin: "top",
    // 回滚的时候是否再次触发动画
    reset: false,
    // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
    // 滚动的距离，单位可以用%，rem等
    distance: "110px",
    // 执行速度 线性函数啥的
    easing: "cubic-bezier(0.5, 0, 0, 1)",
  });
  data.scrollReveal.reveal(".img", {
    // 动画的时长
    duration: 800,
    // 延迟时间
    delay: 100,
    // 动画开始的位置，'bottom', 'left', 'top', 'right'
    origin: "right",
    // 回滚的时候是否再次触发动画
    reset: false,
    // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
    // 滚动的距离，单位可以用%，rem等
    distance: "110px",
    // 执行速度 线性函数啥的
    easing: "cubic-bezier(0.5, 0, 0, 1)",
  });
};

onMounted(retScroll);
</script>

<template>
  <div class="home-main">
    <div class="home-main-left">
      <div class="mian-box" ref="main"></div>
      <div class="main-box-text">
        <span style="color: var(--orange-crayola)">KiriPet</span
        >提供最佳的宠物服务
      </div>
      <div class="main-box-text">宠物改变了我们的生活 让我们 离“他”更近</div>
      <div class="main-box-subText">
        探索毛茸茸朋友的奇妙世界 了解更多您所未知探索毛茸茸朋友的奇妙世界
        我们一起找到一种方法来利用爱的力量，使社区和宠物家庭更亲密、更强大。
        凭借宠物的爱，我们正在打造一个充满知识的网站
      </div>
      <button class="main-box-startBtn"><span href="#servePage" v-smooth-scroll>开始浏览</span></button>
    </div>
    <div class="home-mian-right">
      <img class="img" src="../assets/image/undraw_passing_by_0un9.svg" />
    </div>
  </div>

  <!-- 服务内容 Start -->
  <div class="home-serve" id="servePage">
    <div class="home-serve-left">
      <img src="../assets/image/0111.jpg" alt="" />
    </div>
    <div class="home-serve-right">
      <div class="home-serve-right-title">我们的内容都适用于哪些人?</div>
      <div class="home-serve-right-list">
        <div class="home-serve-right-list-item">
          <div class="home-serve-right-list-item-img">
            <svg
              t="1726210282944"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2728"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m245.521067-707.413333l-298.939734 275.387733-169.984-147.421867-38.263466 39.662934 208.145066 230.6048 331.229867-365.226667-32.187733-33.006933z"
                fill="#1296db"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text">
            我没有养宠物的经验，想了解一些关于养宠物的基础知识以便于我的入门。
          </div>
        </div>
        <div class="home-serve-right-list-item">
          <div class="home-serve-right-list-item-img">
            <svg
              t="1726210282944"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2728"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m245.521067-707.413333l-298.939734 275.387733-169.984-147.421867-38.263466 39.662934 208.145066 230.6048 331.229867-365.226667-32.187733-33.006933z"
                fill="#1296db"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text">
            我已经拥有许多年的养宠经验，现在我想更加深入地了解我的伙伴。
          </div>
        </div>
        <div class="home-serve-right-list-item">
          <div class="home-serve-right-list-item-img">
            <svg
              t="1726210282944"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2728"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m245.521067-707.413333l-298.939734 275.387733-169.984-147.421867-38.263466 39.662934 208.145066 230.6048 331.229867-365.226667-32.187733-33.006933z"
                fill="#1296db"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text">
            我对毛茸茸宠物有着及其浓烈的兴趣，我十分渴望能够学习到更多有关他们的知识。
          </div>
        </div>
        <div class="home-serve-right-list-item">
          <div class="home-serve-right-list-item-img">
            <svg
              t="1726210282944"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2728"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m245.521067-707.413333l-298.939734 275.387733-169.984-147.421867-38.263466 39.662934 208.145066 230.6048 331.229867-365.226667-32.187733-33.006933z"
                fill="#1296db"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text">
            我想和其他人分享我的宠物，也想了解别人的宠物，我希望我的宝贝能和他们成为朋友。
          </div>
        </div>
        <div class="home-serve-right-list-item">
          <div class="home-serve-right-list-item-img">
            <svg
              t="1726210282944"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2728"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m245.521067-707.413333l-298.939734 275.387733-169.984-147.421867-38.263466 39.662934 208.145066 230.6048 331.229867-365.226667-32.187733-33.006933z"
                fill="#1296db"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text text-4">更多....</div>
        </div>
      </div>
      <div class="home-serve-right-btn">
        <button>前往乐园</button>
      </div>
    </div>
  </div>
  <!-- 服务内容 End -->

  <!-- 宠物百科 Start -->
  <div class="home-petInfo">
    <section class="info-section">
      <div class="info-section-content-wrapper">
        <h2 class="info-section-heading">宠物百科</h2>
        <p class="info-section-subheading">
          旨在带您了解更多有关宠物的知识，增进您与宠物之间情感交流
        </p>
      </div>
      <div class="info-section-card">
        <div
          v-for="(info, index) in infos"
          :key="info.id"
          :class="[
            index === 0 ? 'info-section-card-item-left' : '',
            index === 1 ? 'info-section-card-item-mid' : '',
            index === 2 ? 'info-section-card-item-right' : '',
          ]"
          class="info-section-card-item"
        >
          <div class="info-section-img-wrapper">
            <img :src="info.imageUrl" />
          </div>
          <h3 class="info-section-item-petName">{{ info.petName }}</h3>
          <p class="info-section-item-description">{{ info.miniDes }}</p>
          <div class="info-section-dots-background">
            <img class="info-section-dots" src="../assets/image/dots.svg" />
          </div>
          <div class="info-section-button">
            <button class="info-section-infoBtn">了解更多</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 宠物百科 End -->

  <!-- 宠物领养 Start -->
  <div class="home-petAdopt">
    <section class="adopt-section">
      <div class="adopt-section-content-wrapper">
        <h2 class="adopt-section-heading">宠物领养</h2>
        <p class="adopt-section-subheading">
          选择领养，用心去爱，让每一个毛孩子都能拥有幸福的归宿
        </p>
      </div>
      <div class="adopt-section-main">
        <div class="adopt-section-main-left">
          <div class="adopt-section-main-left-main">
            <div class="adopt-section-main-left-main-title">
              <img
                src="../assets/image/undraw_pet_adoption_-2-qkw.svg"
                class="circle-1"
              />
            </div>
          </div>
        </div>
        <div class="adopt-section-main-right">
          <div class="adopt-section-main-right-title">
            <h3>仅需4步，即可把“他”带回家</h3>
            <button>立即领养</button>
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
  <!-- 宠物领养 End -->

  <!-- 宠物商店 Start -->
  <div class="home-petShop">
    <section class="shop-section">
      <div class="shop-section-content-wrapper">
        <div class="shop-section-heading">宠物商店</div>
        <div class="shop-section-subHeading">
          “人与宠物相互依偎陪伴” 精选的宠物用品 让宠物的陪伴更美好
        </div>
      </div>
      <div class="shop-section-main">
        <div class="shop-section-main-left">
          <div class="circle"></div>
          <div class="left-box">
            <div
              class="shop-section-main-left-gird"
              v-for="(item, index) in shops"
              :key="index"
            >
              <div class="gird-main">
                <div class="gird-img">
                  <img :src="item.imageUrl" />
                </div>
                <div class="gird-title">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="shop-section-main-right">
          <div class="right-box">
            <div class="right-box-main">
              <div
                class="right-box-main-item"
                v-for="(item, index) in goods"
                :key="index"
              >
                <div class="main-item-img">
                  <img :src="item.imageUrl" />
                </div>
                <div class="main-item-info">
                  <div class="main-item-name">{{ item.name }}</div>
                  <div class="main-item-price">{{ item.price }}</div>
                  <div class="main-item-des">
                    {{ item.description }}
                  </div>
                </div>
              </div>
            </div>
            <div class="right-box-footer">
              <div class="right-box-footer-text">
                <div>严格筛选 质量保障 只为给“他/她”最好的</div>
              </div>
              <div class="right-box-footer-btn">
                <button>立即选购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 宠物商店 End -->

  <!-- 会员计划 Start -->
  <div id="vips" class="home-petvip">
    <section class="vip-section">
      <div class="vip-section-content-wrapper">
        <div class="vip-section-heading">会员计划</div>
        <div class="vip-section-subHeading">
          加入会员计划，享受更多高品质服务发现更多乐趣
        </div>
      </div>

      <div class="vip-section-vip-tabs">
        <ul class="vip-section-tabs">
          <li v-for="vip in vips" :key="vip.id" class="vip-section-tab-item">
            <a
              @click.prevent="isOpen = vip.id"
              href="#"
              :class="
                isOpen === vip.id ? 'vip-section-tab-active' : 'vip-section-tab'
              "
              >{{ vip.name }}</a
            >
          </li>
        </ul>
      </div>

      <div class="vip-section-tab-content-wrapper">
        <template v-for="vip in vips" :key="vip.id">
          <div v-show="isOpen === vip.id" class="vip-section-tab-content">
            <div class="vip-section-image-wrapper">
              <img class="vip-section-image" :src="vip.details.imageUrl" />
              <div class="vip-section-background-shape"></div>
            </div>
            <div class="vip-section-text-wrapper">
              <div class="vip-section-vip-name">
                {{ vip.details.title }}
              </div>
              <div class="vip-section-vip-price">
                {{ vip.details.price }}
              </div>
              <div class="vip-section-vip-serve">
                <span>会员权益:</span>
                <ul>
                  <li>{{ "1." + vip.details.serve.serve1 }}</li>
                  <li>{{ "2." + vip.details.serve.serve2 }}</li>
                  <li>{{ "3." + vip.details.serve.serve3 }}</li>
                  <li>{{ "4." + vip.details.serve.serve4 }}</li>
                </ul>
              </div>
              <div class="vip-section-vip-description">
                {{ vip.details.description }}
              </div>
              <div class="vip-section-subscribe">
                <button>订阅计划</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
  <!-- 会员计划 End -->
</template>

<style scoped>
.home-main {
  width: 76%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}

.home-main-left {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-main-left .main-box-text {
  color: var(--dark);
  font-size: var(--fs-48);
  font-weight: var(--fw-600);
  margin-top: 5px;
  font-family: var(--ff-llt);
}
.home-main-left .main-box-subText {
  color: var(--info-dark);
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
  line-height: 1.75rem;
  margin-top: 30px;
}

.home-main-left .main-box-startBtn {
  width: 200px;
  height: 60px;
  font-size: var(--fs-24);
  white-space: 2px;
  font-weight: var(--fw-600);
  background-color: var(--blue-crayola);
  color: var(--light-white);
  border: none;
  border-radius: var(--radius-10);
  margin-top: 30px;
  box-shadow: var(--box-shadow);
  position: relative;
}

.home-main-left .main-box-startBtn:hover{
  background-color: var(----light-white);
  border: 2px solid var(--blue-crayola);
  color: var(--blue-crayola);
  transition: var(--transition-4);
}

/* HomeServe Start */
.home-serve {
  width: 76%;
  height: 450px;
  display: flex;
  flex-direction: row;
  margin: 50px auto;
}

.home-serve .home-serve-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
}

.home-serve .home-serve-left img {
  width: 90%;
  height: 100%;
  border-radius: var(--radius-20);
}

.home-serve .home-serve-right {
  width: 40%;
  height: 100%;
}

.home-serve-right .home-serve-right-title {
  width: 100%;
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 1px;
  font-family: var(--ff-llt);
}

.home-serve-right .home-serve-right-list {
  margin-top: 50px;
}

.home-serve-right .home-serve-right-list-item {
  width: 90%;
  display: flex;
  margin: 15px 0;
  margin-left: 0;
}

.home-serve-right .home-serve-right-list-item-img {
  margin: 10px;
}

.home-serve-right .home-serve-right-list-item-text {
  width: 80%;
  font-size: var(--fs-16);
  letter-spacing: 1px;
  color: var(--dark-gray);
}

.text-4 {
  margin-top: 8px;
}

.home-serve-right .home-serve-right-btn {
  width: 78%;
  display: flex;
  justify-content: end;
}

.home-serve-right .home-serve-right-btn button {
  width: 120px;
  height: 40px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--blue-crayola);
}

.home-serve-right .home-serve-right-btn button:hover {
  background-color: var(--light-white);
  color: var(--orange-crayola);
  border: 2px solid var(--orange-crayola);
  transform: translateY(-5px);
  transition: var(--transition-4);
}
/* HomeServe End */

/* 宠物百科部分Start */
.home-petInfo {
  width: 76%;
  height: 800px;
  display: flex;
  margin: 0 auto;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
}

.home-petInfo .info-section {
  padding: 64px 0;
  padding-top: 72px;
}

.home-petInfo .info-section-content-wrapper {
  margin-left: auto;
  max-width: 600px;
  margin-right: auto;
  text-align: center;
}

.home-petInfo .info-section-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.home-petInfo .info-section-subheading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
}

.home-petInfo .info-section-card {
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
}

.home-petInfo .info-section-card-item {
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-8);
  margin: 0 20px;
  width: 405px;
}

.home-petInfo .info-section-card-item:hover {
  transform: scale(1.01);
  transition: var(--transition-1);
  box-shadow: var(--box-shadow);
}

.home-petInfo .info-section-card-item-left {
  margin-bottom: 40px;
}

.home-petInfo .info-section-card-item-mid {
  margin-top: 40px;
}

.home-petInfo .info-section-card-item-right {
  margin-top: 80px;
  margin-bottom: -40px;
}

.home-petInfo .info-section-img-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.home-petInfo .info-section-img-wrapper img {
  width: 250px;
  height: 200px;
  border-radius: var(--radius-8);
}

.home-petInfo .info-section-item-petName {
  font-size: var(--fs-24);
  font-weight: var(--fw-500);
  text-align: center;
  margin-top: 24px;
  font-family: var(--ff-llt);
}

.home-petInfo .info-section-item-description {
  font-size: 1rem;
  color: var(--info-dark);
  text-align: center;
  margin-top: 12px;
}

.home-petInfo .info-section-dots-background {
  margin: 28px 0;
}

.home-petInfo .info-section-dots {
  width: 100%;
}

.home-petInfo .info-section-button {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.home-petInfo .info-section-infoBtn {
  width: 180px;
  height: 48px;
  background-color: var(--blue-crayola);
  border-radius: var(--radius-10);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--light-white);
}

.home-petInfo .info-section-infoBtn:hover {
  background-color: var(--light-white);
  border: 2px solid var(--orange-crayola);
  color: var(--orange-crayola);
  transition: var(--transition-4);
}
/* 宠物百科部分End */

/* 宠物领养部分Start */
.home-petAdopt {
  width: 76%;
  height: 600px;
  display: flex;
  margin: 0 auto;
  margin-top: 50px;
  justify-content: center;
}

.home-petAdopt .adopt-section {
  padding: 64px 0;
  padding-top: 72px;
}

.home-petAdopt .adopt-section-content-wrapper {
  margin-left: auto;
  max-width: 600px;
  margin-right: auto;
  text-align: center;
}

.home-petAdopt .adopt-section-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.home-petAdopt .adopt-section-subheading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
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
  margin-left: 50px;
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

.adopt-section-main-right-title button {
  width: 120px;
  height: 40px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--blue-crayola);
}

.adopt-section-main-right-title button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--orange-crayola);
  color: var(--orange-crayola);
  transition: var(--transition-4);
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
/* 宠物领养部分End */

/* 宠物商店部分 Start */
.home-petShop {
  width: 76%;
  height: 800px;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 50px;
}

.shop-section {
  padding: 64px 0;
}

.shop-section-content-wrapper {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.shop-section-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.shop-section-subHeading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
  position: relative;
}

.shop-section-main {
  width: 100%;
  height: 600px;
  display: flex;
  margin-top: 50px;
}

.shop-section-main-left {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  width: 500px;
  height: 500px;
  position: absolute;
  border-radius: var(--radius-circle);
  border: 2px solid var(--youth-blue);
  z-index: -99;
}

.shop-section-main-left .left-box {
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.left-box .shop-section-main-left-gird {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop-section-main-left .gird-main {
  width: 250px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-10);
  background-color: rgba(241, 243, 250, 0.88);
}

.gird-main:hover {
  transform: scale(1.1);
  transition: var(--transition-2);
}

.shop-section-main-left .gird-main .gird-img img {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
}

.shop-section-main-left .gird-main .gird-title {
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
  font-size: var(--fs-18);
  letter-spacing: 1px;
}

.shop-section-main-right {
  width: 60%;
  height: 100%;
  display: flex;
  margin-left: 20px;
  align-items: center;
}

.right-box {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
}

.right-box .right-box-main {
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.right-box-main-item {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  text-align: center;
  border-radius: var(--radius-10);
  box-shadow: var(--box-shadow);
  background-color: rgba(245, 245, 220, 0.74);
}

.right-box-main-item:hover {
  box-shadow: var(--box-shadow-1);
}

.main-item-name {
  font-family: var(--ff-llt);
  margin: 3px 0;
}

.main-item-price {
  color: var(--danger);
  font-size: var(--fs-16);
  margin: 3px 0;
}

.main-item-des {
  max-width: 200px;
  font-size: var(--fs-14);
  margin: 3px 0;
}

.main-item-img {
  width: 100%;
  height: 70%;
  padding-top: 20px;
}

.main-item-info {
  height: 30%;
}

.main-item-img img {
  width: 192px;
  height: 240px;
}

.main-item-img img:hover {
  transform: translateY(-10px);
  transition: all 0.4s ease-in-out;
}

.right-box-footer {
  width: 100%;
  height: 20%;
  display: flex;
}

.right-box-footer-text {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
}

.right-box-footer-text div {
  width: 100%;
  font-size: var(--fs-18);
  padding-left: 20px;
  letter-spacing: 2px;
  font-weight: var(--fw-600);
}

.right-box-footer-btn {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: end;
  padding-right: 10px;
  align-items: center;
}

.right-box-footer-btn button {
  width: 120px;
  height: 40px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--blue-crayola);
}

.right-box-footer-btn button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--orange-crayola);
  color: var(--orange-crayola);
  transition: var(--transition-4);
}
/* 宠物商店部分 End */

/* vip部分Start */
.home-petvip {
  width: 76%;
  height: 800px;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 50px;
}

.vip-section {
  padding: 64px 0;
}

.vip-section-content-wrapper {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.vip-section-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.vip-section-subHeading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
}

.vip-section-vip-tabs {
  margin-top: 40px;
}

.vip-section-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vip-section-tab-item {
  width: 100%;
  max-width: 224px;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s;
}

.vip-section-tab {
  padding: 20px 0;
  display: block;
  font-size: var(--fs-20);
  font-weight: var(--fw-500);
  font-family: var(--ff-llt);
}

.vip-section-tab-active {
  font-size: var(--fs-20);
  display: block;
  padding: 20px 0;
  padding-bottom: 21px;
  font-weight: var(--fw-500);
  font-family: var(--ff-llt);
  color: var(--purplr-crayola);
  border-bottom: 3px solid var(--blue-crayola);
}

.vip-section-tab-content-wrapper {
  margin-top: 30px;
  padding: 30px;
  border-radius: var(--radius-20);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.vip-section-tab-content {
  width: 100%;
  display: flex;
  align-items: center;
}

.vip-section-image-wrapper {
  position: relative;
  margin: 0 20px;
}

.vip-section-image {
  position: relative;
  z-index: 10;
  height: 380px;
  width: 400px;
  border-radius: var(--radius-10);
}

.vip-section-text-wrapper {
  text-align: start;
}

.vip-section-vip-name {
  font-size: var(--fs-24);
  font-weight: var(--fw-500);
  margin-top: 0;
  font-family: var(--ff-llt);
}

.vip-section-vip-price {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  color: var(--red);
  margin: 10px 0;
}

.vip-section-vip-serve span {
  font-size: var(--fs-20);
  font-weight: var(--fw-500);
  font-family: var(--ff-llt);
}

.vip-section-vip-serve ul li {
  font-size: var(--fs-16);
  font-weight: var(--fw-500);
  color: var(--dark-gray);
  margin: 5px 0;
}

.vip-section-vip-description {
  margin-top: 28px;
  font-size: var(--fs-18);
  color: var(--dark-gray);
}

.vip-section-subscribe button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--danger);
}

.vip-section-subscribe button:hover {
  background-color: var(----light-white);
  color: var(--danger);
  border: 2px solid var(--danger);
  transition: var(--transition-3);
}
/* vip部分End */
</style>
