<script setup>
import ScrollReveal from "scrollreveal";
import { reactive, ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
// 改回直接导入，避免异步问题
import vips from "../../mock/vips";
import infos from "../../mock/infos";
import shops from "../../mock/shops";
import goods from "../../mock/goods";
// 导入新的FloatingEffects组件
import FloatingEffects from "../Common/FloatingEffects.vue";

const router = useRouter();

// 声明订阅栏的显示id
let isOpen = ref(0);
// 在reactive()中声明scrollReveal组件
const data = reactive({
  scrollReveal: null,
});

// 性能优化：延迟初始化ScrollReveal
const initScrollReveal = () => {
  if (!data.scrollReveal) {
    data.scrollReveal = ScrollReveal({
      distance: "60px",
      duration: 1000,
      delay: 100,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      reset: false,
      useDelay: 'onload',
      viewFactor: 0.1, // 元素需要在视口中可见10%才会触发动画
      viewOffset: { top: 25, right: 0, bottom: 0, left: 0 }
    });
  }
};

// 设置scrollReveal的方法
const retScroll = () => {
  // 初始化ScrollReveal
  initScrollReveal();
  
  // 使用批量配置来减少重复代码
  const commonConfig = {
    origin: "top",
    reset: false,
    distance: "100px",
    easing: "cubic-bezier(0.5, 0, 0, 1)",
  };
  
  // 使用序列化动画来优化性能
  data.scrollReveal.reveal(".main-box-text", {
    ...commonConfig,
    duration: 1000,
    delay: 200,
  });
  
  data.scrollReveal.reveal(".main-box-subText", {
    ...commonConfig,
    duration: 1000,
    delay: 300,
  });
  
  data.scrollReveal.reveal(".main-box-startBtn", {
    ...commonConfig,
    duration: 800,
    delay: 400,
  });
  

  data.scrollReveal.reveal(".img", {
    ...commonConfig,
    origin: "right",
    duration: 800,
    delay: 500,
  });

  // 其他元素的动画在用户滚动时触发
  data.scrollReveal.reveal(".home-serve-right-list-item", {
    ...commonConfig,
    interval: 150, // 序列化显示时间间隔
    origin: "bottom",
  });

  data.scrollReveal.reveal(".all-services-item", {
    ...commonConfig,
    interval: 100,
    origin: "bottom",
  });
};

// 懒加载图片处理函数
const lazyLoadImage = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute("data-src");
      if (src) {
        img.setAttribute("src", src);
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    }
  });
};

onMounted(() => {
  // 延迟非关键资源的加载
  nextTick(() => {
    // 初始化懒加载
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(lazyLoadImage, {
        rootMargin: "50px 0px",
        threshold: 0.01,
      });

      // 对所有带有data-src属性的图片应用懒加载
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // 对不支持IntersectionObserver的浏览器使用兼容方案
      document.querySelectorAll("img[data-src]").forEach((img) => {
        img.setAttribute("src", img.getAttribute("data-src"));
        img.removeAttribute("data-src");
      });
    }

    // 延迟初始化动画
    setTimeout(retScroll, 100);
  });
});

const currentStory = ref(0);
const stories = ref([
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    quote: "Loom 帮助我们的团队提高了 50% 的沟通效率",
    authorName: "John Doe",
    authorTitle: "产品经理",
    company: "Netflix",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Atlassian-logo.svg",
    quote: "使用 Loom 后，我们的产品文档制作效率提升了 200%",
    authorName: "Sarah Johnson",
    authorTitle: "技术主管",
    company: "Atlassian",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    quote: "视频消息让我们的远程团队协作变得更加顺畅",
    authorName: "Michael Zhang",
    authorTitle: "工程经理",
    company: "Google",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
]);

const nextStory = () => {
  currentStory.value = (currentStory.value + 1) % stories.value.length;
};
const prevStory = () => {
  currentStory.value =
    (currentStory.value - 1 + stories.value.length) % stories.value.length;
};
const goToStory = (index) => {
  currentStory.value = index;
};

// 在script setup部分，添加处理动态图片懒加载的方法
const getImageSrc = (url) => {
  return {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3C/svg%3E",
    "data-src": url,
  };
};
</script>

<template>
  <!-- 使用新的浮动形状和光效组件，并自定义属性 -->
  <FloatingEffects 
    shapesColor="rgba(139, 152, 228, 0.15)"
    lightColor="rgba(139, 152, 228, 0.25)"
    :dogPawPosition="{ top: '12%', left: '8%' }"
    :catPawPosition="{ top: '65%', left: '18%' }"
    :birdPrintPosition="{ top: '18%', right: '10%' }"
    :rabbitPawPosition="{ top: '75%', right: '15%' }"
  />

  <div class="home-main">
    <div class="home-main-left">
      <div class="mian-box" ref="main"></div>
      <div class="main-box-text">
        <span style="color: var(--deongaree); font-family: var(--ff-hymhtw)"
          >KiriPet</span
        >提供优质的宠物知识
      </div>
      <div class="main-box-text">宠物改变了我们的生活 让我们 离"他"更近</div>
      <div class="main-box-subText">
        探索毛茸茸朋友的奇妙世界 了解更多您所未知探索毛茸茸朋友的奇妙世界
        我们一起找到一种方法来利用爱的力量，使社区和宠物家庭更亲密、更强大。
        凭借宠物的爱，我们正在打造一个充满知识的网站
      </div>
      <button class="main-box-startBtn" href="#servePage" v-smooth-scroll>
        开始浏览
      </button>
    </div>
    <div class="home-mian-right">
      <img
        class="img"
        src="https://kiripet.tos-cn-beijing.volces.com/image/undraw_passing_by_0un9.svg"
        loading="lazy"
        alt="宠物主题图片"
      />
    </div>
  </div>

  <!-- 服务内容 Start -->
  <div class="home-serve" id="servePage">
    <div class="home-serve-left">
      <img
        src="https://kiripet.tos-cn-beijing.volces.com/image/0111.jpg"
        loading="lazy"
        alt="服务内容图片"
      />
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
                fill="#8B98E4"
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
                fill="#8B98E4"
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
                fill="#8B98E4"
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
                fill="#8B98E4"
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
                fill="#8B98E4"
                p-id="2729"
              ></path>
            </svg>
          </div>
          <div class="home-serve-right-list-item-text text-4">更多....</div>
        </div>
      </div>
      <div class="home-serve-right-btn">
        <button @click="router.push('/social')">前往乐园</button>
      </div>
    </div>
  </div>
  <!-- 服务内容 End -->

  <!-- 全部服务 Start-->
  <div class="all-services">
    <div class="all-services-grid">
      <div class="all-services-item">
        <div class="all-services-icon">
          <i class="fas fa-laptop-code"></i>
        </div>
        <h3>宠物百科</h3>
        <p>专业的宠物知识库，解答您的所有疑惑</p>
        <ul>
          <li>宠物信息</li>
          <li>宠物特征</li>
          <li>.....</li>
        </ul>
      </div>
      <div class="all-services-item">
        <div class="all-services-icon">
          <i class="fa-solid fa-store"></i>
        </div>
        <h3>宠物商城</h3>
        <p>严选优质商品，为爱宠提供更好的生活</p>
        <ul>
          <li>宠物食品</li>
          <li>宠物玩具</li>
          <li>.....</li>
        </ul>
      </div>
      <div class="all-services-item">
        <div class="all-services-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>宠物服务</h3>
        <p>专业的服务，值得您的信赖</p>
        <ul>
          <li>宠物医疗</li>
          <li>宠物寄养</li>
          <li>.....</li>
        </ul>
      </div>
      <div class="all-services-item">
        <div class="all-services-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>宠物乐园</h3>
        <p>与志同道合的人一起</p>
        <ul>
          <li>分享生活</li>
          <li>答疑解惑</li>
          <li>.....</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 用户案例 Start -->
  <div class="use-cases">
    <div class="container">
      <div class="section-header">
        <h2>关于宠物，我们是专业的</h2>
        <p>无论是宠物知识还是宠物服务，我们都能满足您的需求</p>
      </div>
      <div class="cases-grid">
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
          />
          <h3>销售演示</h3>
          <p>通过个性化视频展示产品价值</p>
          <span class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></span>
        </div>
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
          />
          <h3>团队培训</h3>
          <p>提供有保障的专业服务</p>
          <span class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></span>
        </div>
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
          />
          <h3>客户支持</h3>
          <p>提供清晰直观的问题解答</p>
          <span class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></span>
        </div>
      </div>
    </div>
  </div>

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
            <img :src="info.imageUrl" loading="lazy" />
          </div>
          <h3 class="info-section-item-petName">{{ info.petName }}</h3>
          <p class="info-section-item-description">{{ info.miniDes }}</p>
          <div class="info-section-dots-background">
            <img
              class="info-section-dots"
              src="https://kiripet.tos-cn-beijing.volces.com/image/dots.svg"
            />
          </div>
          <div class="info-section-button">
            <button class="info-section-infoBtn" @click="router.push('/info')">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 宠物百科 End -->

  <!-- 宠物商店 Start -->
  <div class="home-petShop">
    <section class="shop-section">
      <div class="shop-section-content-wrapper">
        <div class="shop-section-heading">宠物商店</div>
        <div class="shop-section-subHeading">
          "人与宠物相互依偎陪伴" 精选的宠物用品 让宠物的陪伴更美好
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
                  <img :src="item.imageUrl" loading="lazy" />
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
                  <img :src="item.imageUrl" loading="lazy" />
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
                <div>严格筛选 质量保障 只为给"他/她"最好的</div>
              </div>
              <div class="right-box-footer-btn">
                <button @click="router.push('/shop')">立即选购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 宠物商店 End -->

  <!-- 宠物服务 Start -->
  <div class="home-petSevere">
    <section class="severe-section">
      <div class="severe-section-content-wrapper">
        <div class="severe-section-heading">宠物服务</div>
        <div class="severe-section-subHeading">您的宠物，交给我们，请放心</div>
      </div>
      <div class="severe-main">
        <div class="severe-item">
          <div class="item-left">
            <img
              src="http://www.chengdupet.net/d/file/p/2018/11-15/3b280523507f6657685fc0e7b9aecc5b.jpg"
            />
          </div>
          <div class="item-right">
            <div class="severe-gird-item">
              <div class="severe-gird-item-main">
                <div class="title">宠物医疗</div>
                <div class="info">
                  执业兽医师，专业的医疗团队，为宠物健康保驾护航
                  执业兽医师，专业的医疗团队，为宠物健康保驾护航
                  执业兽医师，专业的医疗团队，为宠物健康保驾护航
                </div>
                <ul class="gird-item-describe">
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span><strong>200+</strong>专业兽医师</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>每年超<strong>2000+</strong>服务案例</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span><strong>10+</strong>宠物门诊</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>专业医疗设施</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>更多...</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="severe-item">
          <div class="item-right">
            <div class="severe-gird-item">
              <div class="severe-gird-item-main">
                <div class="title">宠物领养</div>
                <div class="info">
                  选择领养，用心去爱，让每一个毛孩子都能拥有幸福的归宿
                </div>
                <ul class="gird-item-describe">
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>近<strong>50+</strong>宠物类型可供领养</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span><strong>免费</strong>申请 急速审核</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>提供三针<strong>免费疫苗</strong></span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>所有宠物均已驱虫</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>更多....</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="item-left">
            <img
              src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F1019%2F665c5271j00slltyd003dd200nk00hog00nk00ho.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
            />
          </div>
        </div>
        <div class="severe-item">
          <div class="item-left">
            <img
              src="http://www.petchecked.cn/static/upload/image/20240104/1704301959675954.png"
            />
          </div>
          <div class="item-right">
            <div class="severe-gird-item">
              <div class="severe-gird-item-main">
                <div class="title">宠物托运</div>
                <div class="info">
                  提供专业宠物托运出行服务 。宠物出行更 轻松，一键下单，跨城无忧
                </div>
                <ul class="gird-item-describe">
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span><strong>300+</strong>专用托运车</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>全国<strong>800+</strong>托运点</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>覆盖全国<strong>45</strong>省</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>累计托运<strong>10000+</strong>深受好评</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>更多...</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="severe-item">
          <div class="item-right">
            <div class="severe-gird-item">
              <div class="severe-gird-item-main">
                <div class="title">线下门店</div>
                <div class="info">到店咨询，到店体验，提供更适宜的服务</div>
                <ul class="gird-item-describe">
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>全国<strong>120+</strong>门店</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>专业的服务培训</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>提供免费咨询</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>提供免费咨询 先咨询再付费</span>
                  </li>
                  <li>
                    <span class="icon">
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
                          fill="#8B98E4"
                          p-id="2729"
                        ></path>
                      </svg>
                    </span>
                    <span>更多...</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="item-left">
            <img
              src="http://www.ananpet.com/Public/Uploads/Hospital/2018-12-04/5c062967c6dc3.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 宠物服务 ENd -->

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
              <!-- 修改图片绑定方式，确保数据加载完成 -->
              <img class="vip-section-image" :src="vip.details.imageUrl" loading="lazy" />
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
                <button >订阅计划</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
  <!-- 会员计划 End -->
</template>

<style scoped lang="scss">
// 添加content-visibility属性，优化渲染性能
.home-serve,
.all-services,
.shop-section,
.testimonials-section {
  content-visibility: auto;
  contain-intrinsic-size: 1px 1000px; // 预估尺寸，防止布局抖动
}

// 使用will-change优化transform动画
.main-box-startBtn:hover,
.shop-section-card:hover {
  will-change: transform;
}

// 使用GPU加速
.img,
.main-box-text,
.main-box-subText,
.main-box-startBtn {
  transform: translateZ(0);
}

/* 移除浮动形状相关的样式，现在使用独立组件 */

/* 主体部分 */
.home-main {
  width: 85%;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.home-main-left {
  z-index: 5;
  width: 50%;
}

.home-main-left .main-box-text {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: var(--ff-llt);
}

.home-main-left .main-box-subText {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  width: 80%;
  line-height: 1.8;
}

.home-main-left .main-box-startBtn {
  background-color: var(--youth-blue);
  padding: 0.8rem 2rem;
  color: var(--light-white);
  font-family: var(--ff-llt);
  font-weight: 500;
  font-size: 1rem;
  border-radius: var(--radius-5);
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid var(--youth-blue);
}

.home-main-left .main-box-startBtn:hover {
  background-color: rgba(0, 0, 0, 0);
  color: var(--youth-blue);
}

.home-mian-right {
  width: 45%;
  max-height: 600px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.home-mian-right .img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 服务部分 */
.home-serve {
  width: 85%;
  height: auto;
  margin: 80px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-serve-left {
  width: 45%;
  border-radius: 12px;
  overflow: hidden;
}

.home-serve-left img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all 0.5s;
}

.home-serve-left img:hover {
  transform: scale(1.2);
}

.home-serve-right {
  width: 50%;
}

.home-serve-right-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  font-family: var(--ff-llt);
}

.home-serve-right-list {
  display: flex;
  flex-direction: column;
}

.home-serve-right-list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.home-serve-right-list-item-img {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-serve-right-list-item-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  width: 90%;
}

.home-serve-right-btn {
  display: flex;
  justify-content: end;
}

.home-serve-right-btn button {
  width: 180px;
  height: 48px;
  background-color: var(--deongaree);
  border-radius: var(--radius-10);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--light-white);
}

.home-serve-right-btn button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

/* 媒体查询 - 大屏幕 */
@media screen and (max-width: 1200px) {
  .home-main {
    width: 90%;
    height: auto;
    padding: 4rem 0;
  }

  .home-main-left .main-box-text {
    font-size: 2.2rem;
  }

  .home-main-left .main-box-subText {
    width: 95%;
  }

  .home-serve {
    width: 90%;
    margin: 60px auto;
  }

  .home-serve-right-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
}

/* 媒体查询 - 平板 */
@media screen and (max-width: 992px) {
  .home-main {
    flex-direction: column;
    padding: 4rem 0 2rem;
  }

  .home-main-left {
    width: 90%;
    margin-bottom: 3rem;
    text-align: center;
  }

  .home-main-left .main-box-text {
    font-size: 2rem;
  }

  .home-main-left .main-box-subText {
    width: 100%;
    margin: 0 auto 2rem;
  }

  .home-mian-right {
    width: 80%;
    justify-content: center;
  }

  .home-serve {
    flex-direction: column;
    margin: 40px auto;
  }

  .home-serve-left {
    width: 80%;
    margin-bottom: 3rem;
  }

  .home-serve-right {
    width: 90%;
  }

  .home-serve-right-title {
    text-align: center;
    font-size: 1.6rem;
  }
}

/* 媒体查询 - 手机 */
@media screen and (max-width: 768px) {
  .home-main {
    padding: 3rem 0 1.5rem;
  }

  .home-main-left {
    width: 100%;
  }

  .home-main-left .main-box-text {
    font-size: 1.7rem;
    margin-bottom: 0.8rem;
  }

  .home-main-left .main-box-subText {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .home-main-left .main-box-startBtn {
    padding: 0.7rem 1.8rem;
    font-size: 0.9rem;
  }

  .home-mian-right {
    width: 90%;
  }

  .home-serve-left {
    width: 100%;
  }

  .home-serve-right {
    width: 100%;
  }

  .home-serve-right-title {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  .home-serve-right-list-item-text {
    font-size: 0.9rem;
  }

  .shape {
    display: none;
  }
}

/* 媒体查询 - 小屏手机 */
@media screen and (max-width: 576px) {
  .home-main {
    width: 95%;
    padding: 2rem 0 1rem;
  }

  .home-main-left .main-box-text {
    font-size: 1.4rem;
  }

  .home-main-left .main-box-subText {
    font-size: 0.85rem;
  }

  .home-main-left .main-box-startBtn {
    padding: 0.6rem 1.5rem;
    font-size: 0.85rem;
  }

  .home-mian-right {
    width: 100%;
  }

  .home-serve {
    width: 95%;
    margin: 30px auto;
  }

  .home-serve-right-title {
    font-size: 1.2rem;
  }

  .home-serve-right-list-item-img {
    width: 30px;
    height: 30px;
  }

  .home-serve-right-list-item-text {
    font-size: 0.85rem;
    width: 100%;
  }

  .light-effect {
    display: none;
  }

  .home-serve-right-btn button {
    font-size: 14px;
    width: 120px;
    height: 40px;
  }
}

// All Services  Styles
.all-services {
  margin: 0 auto;
  height: fit-content;
  width: 80%;

  .all-services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    .all-services-item {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
      transition: var(--transition-2);

      &:hover {
        transform: translateY(-8px);

        .all-services-icon {
          background: var(--deongaree);
          transform: scale(1.1);

          i {
            color: white;
          }
        }
      }

      .all-services-icon {
        width: 64px;
        height: 64px;
        background: #f3f4f6;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        transition: all 0.3s ease;

        i {
          font-size: 24px;
          color: var(--deongaree);
        }
      }

      h3 {
        font-size: 24px;
        color: #1b1b1b;
        margin-bottom: 12px;
      }

      p {
        color: #6b7280;
        margin-bottom: 24px;
        line-height: 1.6;
      }

      ul {
        list-style: none;

        li {
          color: #4b5563;
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;

          &:before {
            content: "•";
            color: #565bef;
            position: absolute;
            left: 0;
            font-size: 20px;
            line-height: 1;
          }
        }
      }
    }
  }
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
  /* all-services模块适配 */
  .all-services {
    width: 90%;
  }

  .all-services-grid {
    gap: 1.5rem;
  }
}

/* 平板设备媒体查询 */
@media screen and (max-width: 992px) {
  /* all-services模块适配 */
  .all-services {
    width: 80%;
  }

  .all-services .all-services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .all-services .all-services-grid .all-services-item .all-services-icon {
    width: 60px;
    height: 60px;
  }

  .all-services .all-services-grid .all-services-item h3 {
    font-size: 1.4rem;
  }

  .all-services .all-services-grid .all-services-item p {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 768px) {
  .all-services .all-services-grid .all-services-item .all-services-icon {
    width: 50px;
    height: 50px;
  }

  .all-services .all-services-grid .all-services-item h3 {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 576px) {
  .all-services .all-services-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

// Use Cases Styles
.use-cases {
  width: 76%;
  margin: 0 auto;
  position: relative;
  margin-top: 50px;

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
    margin-bottom: 64px;

    h2 {
      font-size: var(--fs-36);
      font-weight: var(--fw-600);
      letter-spacing: 15px;
      font-family: var(--ff-llt);
      margin-bottom: 18px;
    }

    p {
      color: var(--dark-gray);
      font-size: var(--fs-20);
      letter-spacing: 15px;
    }
  }

  .cases-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .case-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
      box-shadow: var(--shadow-1);

      &:first-child {
        grid-row: span 2;
        height: 600px;

        img {
          height: 320px;
        }

        h3 {
          font-size: 24px;
          margin: 24px 32px 16px;
        }

        p {
          font-size: 16px;
          margin: 0 32px 10px;
          line-height: 1.6;
        }

        .learn-more {
          margin: 0 32px 0;
          font-size: 16px;
        }
      }

      &:not(:first-child) {
        height: 288px;

        img {
          height: 140px;
        }

        h3 {
          font-size: 20px;
          margin: 20px 24px 12px;
        }

        p {
          font-size: 14px;
          margin: 0 24px 16px;
          line-height: 1.5;
        }

        .learn-more {
          margin: 0 24px 24px;
          font-size: 14px;
        }
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

        img {
          transform: scale(1.05);
        }

        .learn-more {
          color: var(--deongaree);

          i {
            transform: translateX(4px);
          }
        }
      }

      img {
        width: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      h3 {
        color: #1b1b1b;
        font-weight: 600;
      }

      p {
        color: #6b7280;
      }

      .learn-more {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4b5563;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;

        i {
          font-size: 14px;
          transition: transform 0.3s ease;
        }
      }
    }
  }
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
  .use-cases {
    width: 95%;
  }
}

/* 平板设备媒体查询 */
@media screen and (max-width: 992px) {
  .use-cases .section-header h2 {
    font-size: 30px;
  }

  .use-cases .section-header p {
    font-size: 18px;
  }

  .use-cases .cases-grid .case-card:first-child h3 {
    font-size: 20px;
  }

  .use-cases .cases-grid .case-card:first-child p {
    font-size: 16px;
  }

  .use-cases .cases-grid .case-card:first-child .learn-more {
    font-size: 14px;
  }

  .use-cases .cases-grid .case-card:not(:first-child) h3 {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .use-cases .section-header h2 {
    font-size: 24px;
  }

  .use-cases .section-header p {
    font-size: 16px;
  }
  .use-cases .cases-grid {
    grid-template-columns: 1fr;
    max-width: 95%;
  }

  .use-cases .cases-grid .case-card {
    border-radius: 10px;
  }

  .use-cases .cases-grid .case-card:not(:first-child) img {
    object-fit: cover;
  }
}

@media screen and (max-width: 576px) {
  .use-cases .cases-grid .case-card:first-child {
    height: 400px;
  }

  .use-cases .cases-grid .case-card:first-child img {
    height: 240px;
  }
}

/* 宠物百科部分Start */
.home-petInfo {
  width: 76%;
  height: fit-content;
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
  letter-spacing: 15px;
  margin-top: 28px;
}

.home-petInfo .info-section-card {
  display: flex;
  width: 100%;
  justify-content: space-around;
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
  width: 300px;
  height: 250px;
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
  margin: 18px 0;
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
  background-color: var(--deongaree);
  border-radius: var(--radius-10);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
  color: var(--light-white);
}

.home-petInfo .info-section-infoBtn:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
  .home-petInfo {
    width: 95%;
    overflow: hidden;
  }

  .home-petInfo .info-section {
    width: 100%;
  }

  .info-section-card-item {
    height: fit-content;
  }

  .home-petInfo .info-section-card-item-left {
    margin-bottom: 20px;
  }

  .home-petInfo .info-section-card-item-mid {
    margin-top: 20px;
  }

  .home-petInfo .info-section-card-item-right {
    margin-top: 40px;
    margin-bottom: -20px;
  }

  .home-petInfo .info-section-img-wrapper {
    margin-top: 24px;
  }

  .home-petInfo .info-section-img-wrapper img {
    transform: scale(0.8);
  }

  .home-petInfo .info-section-item-petName {
    font-size: 20px;
    margin-top: 18px;
  }

  .home-petInfo .info-section-item-description {
    font-size: 18px;
  }

  .home-petInfo .info-section-infoBtn {
    transform: scale(0.8);
  }
}

/* 平板设备媒体查询 */
@media screen and (max-width: 992px) {
  .home-petInfo {
    width: 90%;
  }

  .home-petInfo .info-section-heading {
    font-size: 30px;
  }

  .home-petInfo .info-section-subheading {
    font-size: 16px;
  }

  .home-petInfo .info-section {
    padding-top: 24px;
  }

  .home-petInfo .info-section-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .home-petInfo .info-section-img-wrapper img {
    transform: scale(1);
  }

  .home-petInfo .info-section-card-item-right {
    margin-top: 40px;
    margin-bottom: -20px;
  }
}

@media screen and (max-width: 768px) {
  .home-petInfo .info-section-card-item {
    width: 90%;
  }

  .home-petInfo .info-section-img-wrapper img {
    transform: scale(0.8);
  }
}

@media screen and (max-width: 576px) {
  .home-petInfo .info-section-card {
    grid-template-columns: 1fr;
  }

  .home-petInfo .info-section-card-item {
    width: 90%;
    margin: 0 auto;
  }

  .home-petInfo .info-section-card-item-left,
  .info-section-card-item-mid,
  .info-section-card-item-right {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .home-petInfo .info-section-card-item-right {
    margin-top: 30px;
  }

  .home-petInfo .info-section-img-wrapper img {
    transform: scale(1);
  }
}
/* 宠物百科部分 End */

/* 宠物服务Start */
.home-petSevere {
  width: 80%;
  margin: 0 auto;
}

.severe-section {
  padding: 64px 0;
}

.severe-section-content-wrapper {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.severe-section-heading {
  font-size: var(--fs-36);
  font-weight: var(--fw-600);
  letter-spacing: 15px;
  font-family: var(--ff-llt);
}

.severe-section-subHeading {
  color: var(--dark-gray);
  font-size: var(--fs-20);
  margin-top: 28px;
  letter-spacing: 15px;
  position: relative;
}

.severe-main {
  width: 95%;
  margin: 0 auto;
  margin-top: 50px;
}

.severe-item {
  display: flex;
  width: 100%;
  height: 500px;
  padding: 10px;
  border-radius: var(--radius-10);
  justify-content: space-between;
  box-shadow: var(--shadow-1);
  margin-top: 10px;
}

.item-left {
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-left img {
  width: 100%;
  height: 75%;
  border-radius: var(--radius-10);
}

.item-right {
  width: 45%;
  align-content: center;
  margin: 0 auto;
}

.severe-gird-item {
  color: #697e91;
}

.severe-gird-item strong {
  font-weight: 600;
  color: #425275;
}

.severe-gird-item .severe-gird-item-main {
  align-items: center;
  padding: 20px;
  padding-top: 40px;
  border-radius: 12px;
  position: relative;
}

.severe-gird-item .title {
  font-weight: 600;
  font-size: var(--fs-24);
  letter-spacing: 2px;
  color: #19191a;
}

.severe-gird-item .title + * {
  margin-top: 15px;
}

.severe-gird-item .info + * {
  margin-top: 20px;
}

.severe-gird-item .gird-item-describe {
  display: flex;
  flex-direction: column;
}

.severe-gird-item .gird-item-describe li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.severe-gird-item .gird-item-describe li + * {
  margin-top: 0.75rem;
}

.severe-gird-item .gird-item-describe .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.severe-gird-item .gird-item-describe .icon svg {
  width: 18px;
  height: 18px;
}

.severe-gird-item .gird-item-describe + * {
  margin-top: 1.25rem;
}

.severe-gird-item .action {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.severe-section-main-right {
  display: flex;
  width: 59%;
  margin-top: 50px;
  background-color: #c92b2b;
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
  .home-petSevere {
    width: 95%;
  }

  .item-left img {
    transform: scale(0.9);
  }
}

/* 平板设备媒体查询 */
@media screen and (max-width: 992px) {
  .severe-item {
    height: 350px;
  }

  .item-left img {
    height: 85%;
  }

  .home-petSevere .severe-section-heading {
    font-size: 30px;
  }

  .home-petSevere .severe-section-subHeading {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .home-petSevere .severe-section-heading {
    font-size: 24px;
  }

  .home-petSevere .severe-section-subHeading {
    font-size: 16px;
  }
}

@media screen and (max-width: 576px) {
  .severe-item {
    flex-direction: column;
    height: fit-content;
  }

  .item-left,
  .item-right {
    width: 100%;
  }

  .item-left img {
    height: 250px;
  }

  .severe-gird-item .title {
    font-size: 20px;
  }

  .severe-gird-item .info {
    font-size: 14px;
  }

  .severe-gird-item .gird-item-describe li {
    font-size: 14px;
  }
}

/* 宠物服务 End */

/* 宠物商店部分 Start */
.home-petShop {
  width: 80%;
  height: fit-content;
  margin: 0 auto;
  margin-top: 80px;
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
  background-color: #f1f3fae0;
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
  background-color: rgba(241, 243, 250, 0.88);
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
  font-weight: var(--fw-600);
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
  background-color: var(--deongaree);
}

.right-box-footer-btn button:hover {
  background-color: var(--light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
  transition: var(--transition-4);
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
  .home-petShop {
    display: none;
  }
}
/* 宠物商店部分 End */

/* vip部分Start */
.home-petvip {
  width: 85%;
  margin: 0 auto;
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
  color: var(--deongaree);
  border-bottom: 3px solid var(--deongaree);
}

.vip-section-tab-content-wrapper {
  margin-top: 30px;
  padding: 30px 0;
  border-radius: var(--radius-20);
  overflow: hidden;
  box-shadow: var(--shadow-1);
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
  color: var(--danger);
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
  color: var(--dark);
}

.vip-section-subscribe button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  font-weight: var(--fw-600);
  border-radius: var(--radius-8);
  color: var(--light-white);
  background-color: var(--deongaree);
}

.vip-section-subscribe button:hover {
  background-color: var(----light-white);
  color: var(--deongaree);
  border: 2px solid var(--deongaree);
  transition: var(--transition-3);
}

/* 大屏设备媒体查询  */
@media screen and (max-width: 1200px) {
}

/* 平板设备媒体查询 */
@media screen and (max-width: 992px) {
  .vip-section-tab-content-wrapper .vip-section-image {
    transform: scale(0.8);
  }

  .vip-section-heading {
    font-size: 30px;
  }

  .vip-section-subHeading {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .vip-section {
    padding-top: 0;
  }
  .vip-section-heading {
    font-size: 24px;
  }
  .vip-section-tab {
    font-size: 20px;
  }

  .vip-section-subHeading {
    font-size: 16px;
  }
  .vip-section-image-wrapper {
    display: none;
  }
  .vip-section-tab-content-wrapper {
    padding: 30px;
  }

  .vip-section-vip-name {
    font-size: 20px;
  }
  .vip-section-vip-serve span {
    font-size: 18px;
  }
  .vip-section-vip-description {
    font-size: 16px;
  }
  .vip-section-vip-price {
    font-size: 24px;
  }
}

@media screen and (max-width: 576px) {
}
/* vip部分End */

// 动画
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes scrollIntegrations {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - 16px));
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }

  50% {
    transform: translateY(-40px) rotate(5deg);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}
</style>
