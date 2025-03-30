<script setup>
import { ref, computed, inject } from "vue";

// Inject search state from parent
const parentSearchQuery = inject("searchQuery", ref(""));
const showSearchResults = inject("showSearchResults", ref(false));

// 宠物知识分类
const categories = [
  { id: 1, name: "宠物健康" },
  { id: 2, name: "宠物训练" },
  { id: 3, name: "宠物饮食" },
  { id: 4, name: "宠物行为" },
];

// 宠物知识文章
const knowledgeArticles = [
  {
    id: 1,
    title: "如何识别猫咪健康问题的早期征兆",
    summary:
      "了解猫咪健康问题的早期征兆，包括行为改变、饮食习惯变化等信号，帮助您及时发现并处理潜在的健康问题。",
    image: "https://s2.loli.net/2023/08/10/1RVJrKnBgQyA4jH.jpg",
    category: "宠物健康",
    timestamp: "2023-05-15",
    readTime: "5分钟",
  },
  {
    id: 2,
    title: "狗狗基础训练：从坐下到握手的完整指南",
    summary:
      '本指南涵盖了从简单的"坐下"命令到更复杂的"握手"技巧的训练方法，适合各个年龄段的狗狗学习基础训练。',
    image: "https://s2.loli.net/2023/08/10/G7WDCZg5RtFXEcu.jpg",
    category: "宠物训练",
    timestamp: "2023-06-02",
    readTime: "8分钟",
  },
  {
    id: 3,
    title: "宠物饮食禁忌：哪些人类食物对宠物有害",
    summary:
      "深入了解哪些日常食物对猫狗有害，包括巧克力、葡萄、洋葱等，以及如何确保您的宠物获得均衡的营养。",
    image: "https://s2.loli.net/2023/08/10/xYHQXyG3R2z6Mtn.jpg",
    category: "宠物饮食",
    timestamp: "2023-04-18",
    readTime: "6分钟",
  },
  {
    id: 4,
    title: "解读猫咪身体语言：尾巴、耳朵和姿态",
    summary:
      "学习如何通过观察猫咪的尾巴姿势、耳朵位置和整体身体姿态来理解它们的情绪和意图，改善您与爱猫的沟通。",
    image: "https://s2.loli.net/2023/08/10/PH9SaZhpmY3QOTG.jpg",
    category: "宠物行为",
    timestamp: "2023-07-10",
    readTime: "7分钟",
  },
  {
    id: 5,
    title: "季节性宠物护理：夏季和冬季的特殊注意事项",
    summary:
      "根据不同季节调整宠物护理方案，包括夏季防暑、冬季保暖，以及季节性皮肤问题的预防和处理方法。",
    image: "https://s2.loli.net/2023/08/10/VKZ1jWl7fAdJwUL.jpg",
    category: "宠物健康",
    timestamp: "2023-06-25",
    readTime: "9分钟",
  },
  {
    id: 6,
    title: "狗狗社交化训练：帮助害羞或过度活跃的狗狗",
    summary:
      "针对性解决狗狗社交问题的训练方法，帮助害羞的狗狗建立信心，或帮助过度活跃的狗狗学会在社交场合中保持冷静。",
    image: "https://s2.loli.net/2023/08/10/D5f9KyWg4q8CQnE.jpg",
    category: "宠物训练",
    timestamp: "2023-05-30",
    readTime: "10分钟",
  },
];

// 活跃分类
const activeCategory = ref("全部");

// 根据分类筛选文章并支持搜索
const filteredArticles = computed(() => {
  let result = knowledgeArticles;

  // If search is active, filter by search query
  if (showSearchResults.value && parentSearchQuery.value.trim()) {
    const query = parentSearchQuery.value.toLowerCase().trim();
    result = result.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }

  // Then filter by category if not showing "全部"
  if (activeCategory.value !== "全部") {
    result = result.filter(
      (article) => article.category === activeCategory.value
    );
  }

  return result;
});

// 切换分类
const setCategory = (categoryName) => {
  activeCategory.value = categoryName;
};
</script>

<template>
  <div class="knowledge-wiki">
    <!-- 分类选择器 - 修改为与 CatWiki 一致的风格 -->
    <div class="top-section">
      <div class="tag-panel">
        <div class="filter-chips">
          <div
            v-for="category in categories"
            :key="category.id"
            class="filter-chip"
            :class="{ active: activeCategory === category.name }"
            @click="setCategory(category.name)"
          >
            <span>{{ category.name }}</span>
            <span
              v-if="activeCategory === category.name"
              class="material-icons-sharp"
              >close</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 知识文章列表 -->
    <div class="articles-grid">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="article-card"
      >
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>
        <div class="article-content">
          <div class="article-category">{{ article.category }}</div>
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="article-date">{{ article.timestamp }}</span>
            <span class="article-readtime">{{ article.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-wiki {
  padding: 1rem 0;
  width: 100%;
  max-width: 100%;
}

/* 上方区域样式 - 与 CatWiki 保持一致 */
.top-section {
  padding: 20px;
  background-color: var(--white);
  border-radius: var(--radius-16);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-chip {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid var(--light);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: var(--fs-14);
  user-select: none;
}

.filter-chip:hover {
  background-color: var(--light);
}

.filter-chip.active {
  background-color: var(--deongaree);
  color: white;
}

.filter-chip .material-icons-sharp {
  font-size: 18px;
  margin-left: 5px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

.article-image {
  height: 180px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-content {
  padding: 1.5rem;
}

.article-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-summary {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }

  .top-section {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 1rem;
  }

  .filter-chip {
    white-space: nowrap;
  }
}
</style>
