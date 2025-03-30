<script setup>
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import { ref, computed, provide } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const showSearchResults = ref(false);

// Provide search state to child components
provide("searchQuery", searchQuery);
provide("showSearchResults", showSearchResults);

// Search functionality
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    showSearchResults.value = true;
    // Instead of navigation, we'll just update the state
    // and let child components handle filtering
  } else {
    showSearchResults.value = false;
  }
};

// Reset search
const resetSearch = () => {
  searchQuery.value = "";
  showSearchResults.value = false;
};

const navItems = [
  { name: "猫咪百科", path: "/wiki/cats" },
  { name: "狗狗百科", path: "/wiki/dogs" },
  { name: "宠物知识", path: "/wiki/knowledges" },
];

// 热门科数据
const hotTopics = [
  {
    id: 1,
    title: "宠物健康",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "了解如何通过定期检查、健康饮食和适当运动来保持您的宠物健康。预防胜于治疗，定期兽医检查至关重要...",
  },
  {
    id: 2,
    title: "猫咪行为",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "猫咪的行为有时让人费解，从喵喵叫到踩踏，了解这些行为背后的原因可以帮助您更好地理解和照顾您的猫咪...",
  },
  {
    id: 3,
    title: "狗狗训练",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "正确的训练方法可以塑造良好的狗狗行为，从基础服从训练到高级技巧，为您的爱犬提供全面的教育指南...",
  },
  {
    id: 4,
    title: "宠物营养",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "适当的营养对宠物健康至关重要，了解不同年龄、品种和健康状况的宠物的饮食需求，为它们提供均衡营养...",
  },
  {
    id: 5,
    title: "宠物认养",
    image:
      "https://images.unsplash.com/photo-1553322396-0c9cd410975e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "收养而非购买，给予流浪动物一个温暖的家。了解收养流程、如何选择适合您家庭的宠物以及收养后的适应期...",
  },
];

// Wiki分类数据
const wikiCategories = [
  {
    id: 1,
    title: "猫咪品种",
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "从波斯猫到缅因猫，探索不同猫咪品种的特点、性格、护理需求和健康考虑，帮助您找到最适合家庭的猫咪伙伴...",
  },
  {
    id: 2,
    title: "狗狗品种",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "从小型的吉娃娃到大型的德国牧羊犬，了解不同狗狗品种的历史、特性、训练需求和适合的家庭环境...",
  },
  {
    id: 3,
    title: "宠物健康",
    image:
      "https://images.unsplash.com/photo-1576612119301-a8f8910d4e89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "预防和治疗宠物常见疾病，包括疫苗接种、定期检查、应急处理以及如何识别潜在健康问题的早期征兆...",
  },
  {
    id: 4,
    title: "宠物训练",
    image:
      "https://images.unsplash.com/photo-1569775309092-fd5b0ace7ef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "有效的训练技巧和方法，从基础服从训练到解决行为问题，帮助您的宠物成为一个行为良好的家庭成员...",
  },
  {
    id: 5,
    title: "宠物护理",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description:
      "全面的宠物护理指南，包括洗澡、梳理、牙齿清洁、指甲修剪和耳朵清洁，确保您的宠物保持清洁和健康...",
  },
];

// 当前选择的时间筛选
const timeFilter = "今天";

// 特色百科
const featuredWiki = {
  title: "如何选择适合家庭的宠物",
  image:
    "https://images.unsplash.com/photo-1593620659530-7f98c53ab683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description:
    "选择合适的宠物是一个重要决定，需要考虑生活方式、住房条件、时间承诺和预算。本指南帮助您评估不同宠物的需求和特点，做出最适合您家庭的选择。",
  author: "宠物专家小明",
  time: "已编辑 3 天前",
};

// Wiki页面标题
const wikiPageTitle = "宠物百科全书";
const wikiPageDescription =
  "全面的宠物信息资源，包括猫咪、狗狗品种介绍，健康护理指南，行为和训练技巧，以及宠物饲养的最佳实践。";
</script>

<template>
  <HomeHeader></HomeHeader>

  <!-- 新增的特色区域 -->
  <div class="wiki-featured-container">
    <!-- 热门科 -->
    <div class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon hot"></span>
          热门科
        </h2>
        <div class="section-filter">
          <span>{{ timeFilter }}</span>
          <span class="dropdown-icon">▼</span>
        </div>
      </div>
      <div class="topic-list">
        <div v-for="topic in hotTopics" :key="topic.id" class="topic-item">
          <div class="topic-image">
            <img :src="topic.image" :alt="topic.title" />
          </div>
          <div class="topic-content">
            <h3 class="topic-title">{{ topic.title }}</h3>
            <p class="topic-description">{{ topic.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Wiki 分类 -->
    <div class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon wiki"></span>
          Wiki 分类
        </h2>
        <div class="section-more">
          <span>查看更多</span>
          <span class="more-icon"></span>
        </div>
      </div>
      <div class="category-list">
        <div
          v-for="category in wikiCategories"
          :key="category.id"
          class="category-item"
        >
          <div class="category-image">
            <img :src="category.image" :alt="category.title" />
          </div>
          <div class="category-content">
            <h3 class="category-title">{{ category.title }}</h3>
            <p class="category-description">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 特色百科 -->
    <div class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon featured"></span>
          特色百科
        </h2>
      </div>
      <div class="featured-wiki">
        <div class="featured-wiki-image">
          <img :src="featuredWiki.image" :alt="featuredWiki.title" />
        </div>
        <div class="featured-wiki-content">
          <h3 class="featured-wiki-title">{{ featuredWiki.title }}</h3>
          <p class="featured-wiki-description">
            {{ featuredWiki.description }}
          </p>
          <div class="featured-wiki-footer">
            <div class="author">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="Author"
                class="author-avatar"
              />
              <span>{{ featuredWiki.author }}</span>
            </div>
            <div class="edit-time">{{ featuredWiki.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="wiki-container">
    <!-- 页面标题 -->
    <div class="wiki-page-header">
      <h1 class="wiki-page-title">{{ wikiPageTitle }}</h1>
      <p class="wiki-page-description">{{ wikiPageDescription }}</p>
    </div>

    <!-- 新的水平导航栏 -->
    <div class="wiki-nav-tabs">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-tab"
        active-class="nav-tab-active"
      >
        <span class="nav-text">{{ item.name }}</span>
      </router-link>

      <!-- 搜索框 -->
      <div class="nav-search">
        <input
          type="text"
          placeholder="Search..."
          class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
        />
        <span
          v-if="showSearchResults && searchQuery.trim()"
          class="clear-search"
          @click="resetSearch"
        >
          ✕
        </span>
        <span class="search-icon"
          ><svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height="20px"
            width="20px"
          >
            <path
              d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
              fill-rule="evenodd"
              fill="#17202A"
            ></path></svg
        ></span>
      </div>
    </div>

    <main class="wiki-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
  <HomeFooter></HomeFooter>
</template>

<style scoped lang="scss">
// 特色区域样式
.wiki-featured-container {
  max-width: 76%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.featured-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  font-family: var(--ff-llt);
}

.title-icon {
  display: inline-block;
  width: 5px;
  height: 18px;
  margin-right: 10px;
  border-radius: 2px;

  &.hot {
    background-color: var(--deongaree-pr);
  }

  &.wiki {
    background-color: var(--deongaree-pr);
  }

  &.featured {
    background-color: var(--deongaree);
  }
}

.section-filter,
.section-more {
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: var(--deongaree-pr);
  }
}

.dropdown-icon {
  font-size: 10px;
  margin-left: 5px;
}

.more-icon {
  margin-left: 5px;
}

// 热门科样式
.topic-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.topic-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 5px;

  &:hover {
    background-color: #eeeeeea9;
  }

  &:last-child {
    border-bottom: none;
  }
}

.topic-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.topic-content {
  flex: 1;
}

.topic-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  font-family: var(--ff-llt);
  transition: color 0.2s ease;

  .topic-item:hover & {
    color: var(--deongaree);
  }
}

.topic-description {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// Wiki分类样式
.category-list {
  flex: 1;
  padding: 15px;
}

.category-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 5px;

  &:hover {
    background-color: #eeeeeea9;
  }

  &:last-child {
    border-bottom: none;
  }
}

.category-image {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.category-content {
  flex: 1;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  font-family: var(--ff-llt);
}

.category-description {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 特色百科样式
.featured-wiki {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px;
}

.featured-wiki-image {
  width: 100%;
  height: 210px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.featured-wiki-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  font-family: var(--ff-llt);
}

.featured-wiki-description {
  font-size: 15px;
  color: #64748b;
  margin: 0 0 18px 0;
  line-height: 1.6;
}

.featured-wiki-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.author {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64748b;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.edit-time {
  font-size: 14px;
  color: #94a3b8;
}

// 原有样式
.wiki-container {
  max-width: 76%;
  min-height: 68vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgba(var(--deongaree-rgb), 0.02);
  border-radius: 16px;
  margin-bottom: 2rem;
}

// 新增页面标题样式
.wiki-page-header {
  margin-bottom: 1.5rem;
}

.wiki-page-title {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: var(--ff-llt);
  margin-bottom: 0.75rem;
}

.wiki-page-description {
  font-size: 1rem;
  color: var(--dark-variant);
  margin: 0;
  line-height: 1.5;
}

// 新增水平导航栏样式
.wiki-nav-tabs {
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(var(--deongaree-rgb), 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 2px;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.nav-tab {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: var(--dark-variant);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: var(--deongaree);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: var(--deongaree-pr);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

.nav-tab-active {
  color: var(--deongaree);
  font-weight: 600;

  &::after {
    width: 100%;
    background-color: var(--deongaree);
  }
}

.nav-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.nav-search {
  margin-left: auto;
  position: relative;
}

.search-input {
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  background-color: rgba(var(--deongaree-rgb), 0.05);
  font-size: 0.875rem;
  width: 220px;
  outline: none;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--deongaree);

  &:focus {
    border-bottom: 1px solid var(--deongaree-pr);
    width: 250px;
  }
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--deongaree);
  font-size: 0.875rem;
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--deongaree);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  border-radius: 50%;
  background-color: rgba(var(--deongaree-rgb), 0.1);
  height: 18px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background-color: var(--deongaree);
  color: white;
}

.wiki-content {
  flex: 1;
  min-height: 500px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

// 响应式调整
@media (max-width: 1200px) {
  .wiki-featured-container {
    grid-template-columns: 1fr;
    max-width: 90%;
  }

  .wiki-container {
    max-width: 90%;
  }

  .search-input {
    width: 150px;
  }
}

@media (max-width: 640px) {
  .wiki-nav-tabs {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .nav-tab {
    padding: 0.5rem 0.75rem;
  }
}
</style>
