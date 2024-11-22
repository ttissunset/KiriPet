<script setup>
import ScrollReveal from "scrollreveal";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import vips from "../../mock/vips";
import infos from "../../mock/infos";
import shops from "../../mock/shops";
import goods from "../../mock/goods";

const router = useRouter();

// 声明订阅栏的显示id
let isOpen = ref(0);
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
</script>

<template>
  <!-- 添加浮动形状 -->
  <div class="floating-shapes">
    <div class="shape circle"></div>
    <div class="shape square"></div>
    <div class="shape circle"></div>
  </div>

  <!-- 添加光效 -->
  <div class="light-effect"></div>
  <div class="home-main">
    <div class="home-main-left">
      <div class="mian-box" ref="main"></div>
      <div class="main-box-text">
        <span style="color: var(--deongaree)">KiriPet</span>提供优质的宠物知识
      </div>
      <div class="main-box-text">宠物改变了我们的生活 让我们 离“他”更近</div>
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
      />
    </div>
  </div>

  <!-- 服务内容 Start -->
  <div class="home-serve" id="servePage">
    <div class="home-serve-left">
      <img
        src="https://kiripet.tos-cn-beijing.volces.com/image/0111.jpg"
        alt=""
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
        <button @click="router.push('/fun')">前往乐园</button>
      </div>
    </div>
  </div>
  <!-- 服务内容 End -->

  <!-- 全部服务 -->
  <div class="all-services">
    <div class="container">
      <div class="all-services-grid">
        <div class="all-services-item">
          <div class="all-services-icon">
            <i class="fas fa-laptop-code"></i>
          </div>
          <h3>工程团队</h3>
          <p>代码审查、技术文档和问题演示</p>
          <ul>
            <li>异步代码审查</li>
            <li>技术文档录制</li>
            <li>Bug 复现演示</li>
          </ul>
        </div>
        <div class="all-services-item">
          <div class="all-services-icon">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <h3>产品团队</h3>
          <p>产品演示、用户反馈和功能说明</p>
          <ul>
            <li>产品更新说明</li>
            <li>用户研究反馈</li>
            <li>功能使用指南</li>
          </ul>
        </div>
        <div class="all-services-item">
          <div class="all-services-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>人力资源</h3>
          <p>员工培训、入职指导和团队沟通</p>
          <ul>
            <li>新员工入职培训</li>
            <li>工作流程说明</li>
            <li>团队公告发布</li>
          </ul>
        </div>
        <div class="all-services-item">
          <div class="all-services-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>人力资源</h3>
          <p>员工培训、入职指导和团队沟通</p>
          <ul>
            <li>新员工入职培训</li>
            <li>工作流程说明</li>
            <li>团队公告发布</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Customer Stories Start-->
  <div class="customer-stories">
    <div class="container">
      <div class="stories-header">
        <h2>客户故事</h2>
        <div class="story-nav">
          <button class="prev" @click="prevStory">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button class="next" @click="nextStory">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div class="stories-slider">
        <transition-group name="story-slide">
          <div
            class="story-card"
            v-for="(story, index) in stories"
            :key="story.id"
            v-show="currentStory === index"
          >
            <div class="story-video">
              <img :src="story.image" :alt="story.title" />
              <button class="play-button">
                <i class="fas fa-play"></i>
              </button>
            </div>
            <div class="story-content">
              <div class="customer-logo">
                <img :src="story.logo" :alt="story.company" />
              </div>
              <p class="quote">{{ story.quote }}</p>
              <div class="author">
                <img :src="story.authorImage" :alt="story.authorName" />
                <div>
                  <h4>{{ story.authorName }}</h4>
                  <p>{{ story.authorTitle }} @ {{ story.company }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="story-indicators">
          <span
            v-for="(_, index) in stories"
            :key="index"
            :class="{ active: currentStory === index }"
            @click="goToStory(index)"
          ></span>
        </div>
      </div>
    </div>
  </div>
  <!-- Customer Stories End-->

  <!-- Brands Start -->
  <div class="brands">
    <div class="container">
      <h2>全球顶尖企业的选择</h2>
    </div>
    <div class="brands-container">
      <div class="brands-grid">
        <div class="brand-group">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Atlassian-logo.svg"
            alt="Atlassian"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/32/Microsoft_365_logo.svg"
            alt="Microsoft"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/ByteDance_logo_English.svg"
            alt="ByteDance"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Alibaba_en_logo.svg"
            alt="Alibaba"
          />
        </div>
        <!-- 复制一组用于无滚动 -->
        <div class="brand-group">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Atlassian-logo.svg"
            alt="Atlassian"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/32/Microsoft_365_logo.svg"
            alt="Microsoft"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/ByteDance_logo_English.svg"
            alt="ByteDance"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Alibaba_en_logo.svg"
            alt="Alibaba"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Brands End -->

  <!-- Workflow Start -->
  <div class="workflow">
    <div class="container">
      <div class="section-header">
        <h2>简化您的工作流程</h2>
        <p>从录制到分享，只需几秒钟</p>
      </div>
      <div class="workflow-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>一键录制</h3>
            <p>点击浏览器扩展或桌面应用即可开始录制</p>
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
              alt="录制步骤"
            />
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>编辑优化</h3>
            <p>修剪视频、添加字幕、插入标注</p>
            <img
              src="https://images.unsplash.com/photo-1542744094-24638eff58bb"
              alt="编辑步骤"
            />
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>实时分享</h3>
            <p>生成链接一键分享，支持嵌入和下载</p>
            <img
              src="https://images.unsplash.com/photo-1552581234-26160f608093"
              alt="分享步骤"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Workflow End -->

  <!-- Use Cases Start -->
  <div class="use-cases">
    <div class="container">
      <div class="section-header">
        <h2>适用于各种场景</h2>
        <p>无论是远程工还是异步协作，Loom 都能满足您的需求</p>
      </div>
      <div class="cases-grid">
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
            alt="销售演示"
          />
          <h3>销售演示</h3>
          <p>通过个性化视频展示产品价值</p>
          <a href="#" class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></a>
        </div>
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="团队���训"
          />
          <h3>团队培训</h3>
          <p>创建可重复使用的培训内容</p>
          <a href="#" class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></a>
        </div>
        <div class="case-card">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
            alt="客户支持"
          />
          <h3>客户支持</h3>
          <p>提供清晰直观的问题解答</p>
          <a href="#" class="learn-more"
            >了解更多 <i class="fas fa-arrow-right"></i
          ></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Testimonials Section -->
  <div class="testimonials">
    <div class="container">
      <div class="section-header">
        <h2>用户反馈</h2>
        <p>来自全球用户的真实评价</p>
      </div>
      <div class="testimonials-grid">
        <!-- 第一列 -->
        <div class="testimonial-column">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="Netflix"
                />
              </div>
              <p class="quote">
                "Loom
                帮助我们的团队提高了50%的沟通效率，大大减少了不必要的会议。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="用户头像"
                />
                <div>
                  <h4>David Chen</h4>
                  <p>产品经理 @ Netflix</p>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                />
              </div>
              <p class="quote">
                "视频消息让我们的远程团队协作变得更加顺畅，沟通更加清晰。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="用户头像"
                />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>工程经理 @ Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二列 -->
        <div class="testimonial-column">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Atlassian-logo.svg"
                  alt="Atlassian"
                />
              </div>
              <p class="quote">
                "使用 Loom 后，我们的产品文档制作效率提升了
                200%，团队反馈非常积极。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="用户头像"
                />
                <div>
                  <h4>Michael Zhang</h4>
                  <p>技术主管 @ Atlassian</p>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonial-card highlight">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                  alt="Spotify"
                />
              </div>
              <p class="quote">
                "Loom 彻底改变了我们的工作方式，异步沟通让团队协作更加高效。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="用户头像"
                />
                <div>
                  <h4>Emily Wilson</h4>
                  <p>设计总监 @ Spotify</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第三列 -->
        <div class="testimonial-column">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                  alt="IBM"
                />
              </div>
              <p class="quote">
                "客户支持团队使用 Loom 后，问题解决速度提升了
                80%，客户满意度显著提高。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  alt="用户头像"
                />
                <div>
                  <h4>Alex Thompson</h4>
                  <p>客户成功主管 @ IBM</p>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="customer-logo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                  alt="Amazon"
                />
              </div>
              <p class="quote">
                "Loom 让我们的全球团队沟通变得更加便捷，大大提高了工作效率。"
              </p>
              <div class="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                  alt="用户头像"
                />
                <div>
                  <h4>Linda Martinez</h4>
                  <p>项目经理 @ Amazon</p>
                </div>
              </div>
            </div>
          </div>
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
            <img :src="info.imageUrl" />
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
                <button @click="router.push(`/vip-${vip.id}`)">订阅计划</button>
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
// 添加浮动装饰元素
.floating-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;

  .shape {
    position: absolute;
    opacity: 0.03;

    &.circle {
      border-radius: 50%;
      background: var(--deongaree);
    }

    &.square {
      background: #ff5c5c;
      transform: rotate(45deg);
    }

    &:nth-child(1) {
      width: 300px;
      height: 300px;
      top: 10%;
      left: -150px;
      animation: float 20s ease-in-out infinite;
    }

    &:nth-child(2) {
      width: 200px;
      height: 200px;
      top: 60%;
      right: -100px;
      animation: float 15s ease-in-out infinite reverse;
    }

    &:nth-child(3) {
      width: 150px;
      height: 150px;
      bottom: 10%;
      left: 20%;
      animation: float 18s ease-in-out infinite;
    }
  }
}

// 添加光效
.light-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(86, 91, 239, 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 92, 92, 0.05) 0%,
      transparent 40%
    );
  filter: blur(60px);
  animation: pulse 10s ease-in-out infinite alternate;
}

.home-main {
  width: 76%;
  height: 80vh;
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
  background-color: var(--deongaree);
  color: var(--light-white);
  border: none;
  border-radius: var(--radius-10);
  margin-top: 30px;
  box-shadow: var(--box-shadow);
  position: relative;
}

.home-main-left .main-box-startBtn:hover {
  background-color: var(----light-white);
  border: 2px solid var(--deongaree);
  color: var(--deongaree);
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
  background-color: var(--deongaree);
}

.home-serve-right .home-serve-right-btn button:hover {
  background-color: var(--light-white);
  color: var(--deongaree);
  border: 2px solid var(--deongaree);
  transform: translateY(-5px);
  transition: var(--transition-4);
}
/* HomeServe End */

// All Services  Styles
.all-services {
  margin: 0 auto;
  width: 76%;

  .all-services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    .all-services-item {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);

        .all-services-icon {
          background: #565bef;
          color: white;
          transform: scale(1.1);
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
          color: #565bef;
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

// Customer Stories  Styles
.customer-stories {
  width: 76%;
  padding: 100px 0;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.493);

  .stories-header {
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 48px;

    h2 {
      font-size: var(--fs-36);
      font-weight: var(--fw-600);
      letter-spacing: 15px;
      font-family: var(--ff-llt);
    }

    .story-nav {
      display: flex;
      gap: 12px;

      button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #e5e7eb;
        background: white;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--deongaree);
          color: var(--deongaree);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        i {
          font-size: 18px;
        }
      }
    }
  }

  .stories-slider {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;

    .story-card {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 40px;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

      .story-video {
        position: relative;
        height: 100%;
        min-height: 400px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background: rgba(86, 91, 239, 0.9);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            transform: translate(-50%, -50%) scale(1.1);
            background: var(--deongaree);
          }

          i {
            font-size: 24px;
          }
        }
      }
    }

    .story-content {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .customer-logo {
        height: 32px;
        margin-bottom: 32px;

        img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }
      }

      .quote {
        font-size: 24px;
        line-height: 1.5;
        color: #1b1b1b;
        margin-bottom: 32px;
        font-weight: 500;
      }

      .author {
        display: flex;
        align-items: center;
        gap: 16px;

        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        div {
          h4 {
            font-size: 16px;
            color: #1b1b1b;
            margin-bottom: 4px;
            font-weight: 600;
          }

          p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
        }
      }
    }

    .story-indicators {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;

      span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e5e7eb;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          width: 24px;
          border-radius: 4px;
          background: var(--deongaree);
        }

        &:hover:not(.active) {
          background: #d1d5db;
        }
      }
    }
  }
}

// Brands Styles
.brands {
  padding: 80px 0;
  background: #f9fafb;
  overflow: hidden;

  h2 {
    text-align: center;
    font-size: var(--fs-36);
    font-weight: var(--fw-600);
    letter-spacing: 15px;
    font-family: var(--ff-llt);
    margin-bottom: 28px;
  }

  .brands-container {
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 200px;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, #f9fafb 0%, transparent 100%);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, #f9fafb 0%, transparent 100%);
    }

    .brands-grid {
      display: flex;
      gap: 48px;
      padding: 20px 0;
      animation: scrollBrands 30s linear infinite;
      width: max-content;

      .brand-group {
        display: flex;
        gap: 48px;
        padding: 0 24px;

        img {
          height: 32px;
          opacity: 0.6;
          transition: all 0.3s ease;
          filter: grayscale(100%);
          object-fit: contain;

          &:hover {
            opacity: 1;
            filter: grayscale(0%);
            transform: translateY(-2px);
          }
        }
      }

      &:hover {
        animation-play-state: paused;
      }
    }
  }
}

@keyframes scrollBrands {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 24px));
  }
}

// 响应式调整
@media (max-width: 768px) {
  .brands {
    .brands-container {
      .brands-grid {
        gap: 32px;

        .brand-group {
          gap: 32px;
          padding: 0 16px;

          img {
            height: 24px;
          }
        }
      }
    }
  }
}

// Workflow Styles
.workflow {
  width: 76%;
  margin: 0 auto;
  margin-top: 150px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235661ef' fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;

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
        top: 40px;
        right: -20px;
        width: 40px;
        height: 2px;
        background: #e5e7eb;
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

// Use Cases Styles
.use-cases {
  width: 76%;
  margin: 0 auto;
  margin-top: 150px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235661ef' fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;

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

  .cases-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 24px;
    margin-top: 40px;
    max-width: 1200px;
    margin: 0 auto;

    .case-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;

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
          margin: 0 32px 24px;
          line-height: 1.6;
        }

        .learn-more {
          margin: 0 32px 32px;
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

// Testimonials Styles
.testimonials {
  width: 76%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 30px 0;
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235661ef' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;

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

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

    .testimonial-column {
      display: flex;
      flex-direction: column;
      gap: 24px;

      &:nth-child(2) {
        margin-top: 48px;
      }

      &:nth-child(3) {
        margin-top: 24px;
      }
    }
  }

  .testimonial-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    &.highlight {
      background: linear-gradient(145deg, #f6f5ff 0%, #ffffff 100%);
      border: 2px solid rgba(86, 91, 239, 0.1);
    }

    .testimonial-content {
      padding: 32px;

      .customer-logo {
        height: 32px;
        margin-bottom: 24px;

        img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }
      }

      .quote {
        font-size: 16px;
        line-height: 1.6;
        color: #1b1b1b;
        margin-bottom: 24px;
        font-style: italic;
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        gap: 16px;

        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        div {
          h4 {
            font-size: 16px;
            color: #1b1b1b;
            margin-bottom: 4px;
            font-weight: 600;
          }

          p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
        }
      }
    }
  }
}

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
  letter-spacing: 15px;
  margin-top: 28px;
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
/* 宠物百科部分 End */

/* 宠物服务Start */
.home-petSevere {
  width: 76%;
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
  width: 85%;
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

/* 宠物服务 End */

/* 宠物商店部分 Start */
.home-petShop {
  width: 76%;
  height: 750px;
  margin: 0 auto;
  margin-top: 100px;
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
/* 宠物商店部分 End */

/* vip部分Start */
.home-petvip {
  width: 76%;
  height: 800px;
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
  padding: 30px;
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
/* vip部分End */
</style>
