<script setup>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { knowledge } from "../../mock/infos.js";

// 使用router跳转到文章详情页
const router = useRouter();

// Inject search state from parent
const parentSearchQuery = inject("searchQuery", ref(""));
const showSearchResults = inject("showSearchResults", ref(false));

// 视图模式
const viewMode = ref("grid");

// 宠物知识分类
const categories = [
  { id: 1, name: "宠物健康" },
  { id: 2, name: "宠物训练" },
  { id: 3, name: "宠物饮食" },
  { id: 4, name: "宠物行为" },
];

// 从infos.js导入知识库文章
const knowledgeArticles = knowledge;

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

// 跳转到文章详情页
const goToArticleDetail = (articleId) => {
  router.push(`/wiki/article/${articleId}`);
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

    <!-- 宠物知识百科标题 -->
    <div class="wiki-header">
      <h1 class="wiki-title">
        <span class="material-icons-sharp">menu_book</span>
        宠物知识百科
        <span class="article-count">{{ filteredArticles.length }}篇文章</span>
      </h1>

      <div class="view-toggle">
        <button
          class="view-toggle-btn"
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          <span class="material-icons-sharp">grid_view</span>
        </button>
        <button
          class="view-toggle-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <span class="material-icons-sharp">view_list</span>
        </button>
      </div>
    </div>

    <!-- 知识文章列表 -->
    <div :class="['articles-grid', viewMode]">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="article-card"
        @click="goToArticleDetail(article.id)"
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
  margin-bottom: 20px;
}

/* Wiki Header 样式 */
.wiki-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--deongaree-yw);
}

.wiki-title {
  display: flex;
  align-items: center;
  font-size: var(--fs-32);
  color: var(--dark);
}

.wiki-title .material-icons-sharp {
  margin-right: 12px;
  color: var(--deongaree);
}

.article-count {
  margin-left: 15px;
  font-size: var(--fs-16);
  color: var(--dark-variant);
  background-color: var(--deongaree-yw);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}

.view-toggle {
  display: flex;
  gap: 10px;
}

.view-toggle-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: var(--radius-8);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--dark-variant);
}

.view-toggle-btn:hover,
.view-toggle-btn.active {
  background-color: var(--light);
  color: var(--deongaree);
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

/* 网格和列表视图样式 */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.articles-grid.list {
  grid-template-columns: 1fr;
}

.articles-grid.list .article-card {
  display: flex;
  height: 180px;
}

.articles-grid.list .article-image {
  flex: 0 0 250px;
  height: 100%;
}

.articles-grid.list .article-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.articles-grid.list .article-summary {
  flex: 1;
}

.article-card {
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
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
  padding: 4px 8px;
  background-color: var(--light);
  border-radius: var(--radius-4);
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  color: var(--gray);
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--dark);
  line-height: 1.4;
}

.article-summary {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: var(--gray);
  font-size: 0.8rem;
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
  
  .wiki-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
  
  .view-toggle {
    align-self: flex-end;
  }
  
  .articles-grid.list .article-card {
    flex-direction: column;
    height: auto;
  }
  
  .articles-grid.list .article-image {
    flex: none;
    height: 180px;
  }
}
</style>
