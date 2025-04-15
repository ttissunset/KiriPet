<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import { catInfos } from "../../../src/mock/infos.js";

// Inject search state from parent
const parentSearchQuery = inject("searchQuery", ref(""));
const showSearchResults = inject("showSearchResults", ref(false));

const selectedTags = ref([]);
const selectedCat = ref(null);
const page = ref(1);
const loading = ref(false);
const router = useRouter();
const viewMode = ref("grid");
const filterTags = ["温顺", "活泼", "短毛", "长毛", "聪明", "独立"];

// 存放宠物数据 - 使用infos.js中的catInfos
const cats = ref(catInfos);

// Filter cats based on tags and search query
const filteredCats = computed(() => {
  let result = cats.value;

  // If search is active, filter by search query
  if (showSearchResults.value && parentSearchQuery.value.trim()) {
    const query = parentSearchQuery.value.toLowerCase().trim();
    result = result.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.breed.toLowerCase().includes(query) ||
        cat.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    result = result.filter((cat) =>
      cat.tags.some((tag) => selectedTags.value.includes(tag))
    );
  }

  return result;
});

// 根据 tag 筛选
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// 根据标签获取特殊样式类
const getTagClass = (tag) => {
  const specialTags = {
    "温顺": "tag-gentle",
    "友好": "tag-friendly",
    "易护理": "tag-easy-care",
    "亲人": "tag-friendly",
    "大型猫": "tag-size",
    "中型猫": "tag-size",
    "聪明": "tag-smart",
    "活泼": "tag-active",
    "短毛": "tag-short-hair",
    "长毛": "tag-long-hair",
    "独立": "tag-independent",
    "优雅": "tag-elegant",
    "安静": "tag-quiet",
    "粘人": "tag-clingy",
    "好奇": "tag-curious",
    "警觉": "tag-alert"
  };
  
  return specialTags[tag] || "";
};

// 生成随机颜色
const getRandomColor = () => {
  // 在网站的配色范围内生成随机颜色
  const colors = [
    '#4285F4', // 蓝色
    '#EA4335', // 红色
    '#FBBC05', // 黄色
    '#34A853', // 绿色
    '#FF6D00', // 橙色
    '#9C27B0', // 紫色
    '#00BCD4', // 青色
    '#009688', // 青绿色
    '#673AB7', // 深紫色
    '#FF5722', // 深橙色
    '#795548', // 棕色
    '#607D8B'  // 蓝灰色
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 处理猫爪悬停事件
const handlePawHover = (event) => {
  // 获取猫爪图标元素
  const icon = event.currentTarget.querySelector('.material-icons-sharp');
  if (icon) {
    // 应用随机颜色
    icon.style.color = getRandomColor();
  }
};

// 显示详情
const showDetail = (cat) => {
  router.push({
    name: "WikiPetDetail",
    params: {
      type: "cats",
      id: cat.id,
    },
  });
};

// 模拟加载更多数据
const loadMorePets = async () => {
  if (loading.value) return;
  loading.value = true;

  // 模拟API请求延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 计算当前每行显示的卡片数量
  const containerWidth = document.querySelector(".cats-grid").offsetWidth;
  const cardWidth = 300; // 卡片最小宽度
  const cardsPerRow = Math.floor(containerWidth / cardWidth);

  // 计算需要加载的卡片数量，确保是整行
  const currentCards = cats.value.length;
  const remainingCards = cardsPerRow - (currentCards % cardsPerRow);
  const cardsToLoad =
    remainingCards === cardsPerRow ? cardsPerRow : remainingCards;

  const newCats = [
    {
      id: cats.value.length + 1,
      name: "布偶猫",
      breed: "布偶",
      image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800",
      description: "布偶猫性格温顺，体型较大，非常适合家庭饲养。",
      stats: {
        size: 70,
        activity: 50,
        friendly: 95,
      },
      tags: ["大型猫", "温顺", "亲人"],
    },
    {
      id: cats.value.length + 2,
      name: "缅因猫",
      breed: "缅因",
      image:
        "https://images.unsplash.com/photo-1595752776689-aebef37b5d32?w=800",
      description: "缅因猫是最大的家猫品种之一，性格温和友善。",
      stats: {
        size: 90,
        activity: 60,
        friendly: 85,
      },
      tags: ["大型猫", "长毛", "温和"],
    },
    {
      id: cats.value.length + 3,
      name: "暹罗猫",
      breed: "暹罗",
      image:
        "https://images.unsplash.com/photo-1576120634744-ee3e08b3be0d?w=800",
      description: "暹罗猫聪明活泼，性格外向，善于交流。",
      stats: {
        size: 50,
        activity: 80,
        friendly: 75,
      },
      tags: ["中型猫", "聪明", "活泼"],
    },
    {
      id: cats.value.length + 4,
      name: "俄罗斯蓝猫",
      breed: "俄蓝",
      image:
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800",
      description: "俄罗斯蓝猫优雅安静，性格温和，被毛短而密，呈银蓝色。",
      stats: {
        size: 45,
        activity: 60,
        friendly: 70,
      },
      tags: ["中型猫", "安静", "优雅"],
    },
  ];

  // 加载新数据
  cats.value.push(...newCats.slice(0, Math.max(4, cardsToLoad)));
  page.value++;
  loading.value = false;
};

// 折叠面板状态
const openPanels = ref({
  personality: true,
  care: false,
  description: false,
});

// 打开详情弹窗
const openDetail = (cat) => {
  selectedCat.value = cat;
  // 重置折叠面板状态
  openPanels.value = {
    personality: true,
    care: false,
    description: false,
  };
};

// 切换折叠面板
const togglePanel = (panel) => {
  openPanels.value[panel] = !openPanels.value[panel];
};
</script>

<template>
  <div class="catwiki-container">
    <!-- 搜索和筛选部分 - 上方区域 -->
    <div class="top-section">
      <div class="tag-panel">
        <div class="filter-chips">
          <div
            v-for="(tag, index) in filterTags"
            :key="index"
            :class="['filter-chip', { active: selectedTags.includes(tag) }]"
            @click="toggleTag(tag)"
          >
            <span>{{ tag }}</span>
            <span class="material-icons-sharp" v-if="selectedTags.includes(tag)"
              >close</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 宠物详情区域 - 下方区域 -->
    <div class="bottom-section">
      <div class="wiki-header">
        <h1 class="wiki-title">
          <span class="material-icons-sharp">pets</span>
          猫咪百科
          <span class="cat-count">{{ filteredCats.length }}只猫咪</span>
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

      <!-- 猫咪卡片网格 -->
      <div :class="['cats-grid', viewMode]" v-if="viewMode === 'grid'">
        <div v-for="cat in filteredCats" :key="cat.id" class="cat-card">
          <div class="image-container" @click="showDetail(cat)">
            <img :src="cat.image" :alt="cat.name" />
            <div class="breed-tag">{{ cat.breed }}</div>
            <div class="overlay">
              <div class="view-details">查看详情</div>
            </div>
          </div>

          <div class="cat-info">
            <h3 class="cat-name">{{ cat.name }}</h3>
            <p class="cat-description">{{ cat.description }}</p>

            <div class="cat-stats">
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">体型</span>
                  <span class="stat-value">{{ cat.stats.size }}%</span>
                </div>
                <div class="paw-progress">
                  <span 
                    v-for="n in 5" 
                    :key="n" 
                    :class="['paw-icon', { filled: n <= Math.round(cat.stats.size / 20) }]"
                    @mouseenter="handlePawHover"
                  >
                    <span class="material-icons-sharp">pets</span>
                  </span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">活跃度</span>
                  <span class="stat-value">{{ cat.stats.activity }}%</span>
                </div>
                <div class="paw-progress">
                  <span 
                    v-for="n in 5" 
                    :key="n" 
                    :class="['paw-icon', { filled: n <= Math.round(cat.stats.activity / 20) }]"
                    @mouseenter="handlePawHover"
                  >
                    <span class="material-icons-sharp">pets</span>
                  </span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">友善度</span>
                  <span class="stat-value">{{ cat.stats.friendly }}%</span>
                </div>
                <div class="paw-progress">
                  <span 
                    v-for="n in 5" 
                    :key="n" 
                    :class="['paw-icon', { filled: n <= Math.round(cat.stats.friendly / 20) }]"
                    @mouseenter="handlePawHover"
                  >
                    <span class="material-icons-sharp">pets</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="cat-tags">
              <span
                v-for="(tag, tagIndex) in cat.tags"
                :key="tagIndex"
                :class="['cat-tag', getTagClass(tag)]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 列表视图 -->
      <div class="cats-list" v-else>
        <div v-for="cat in filteredCats" :key="cat.id" class="cat-list-item">
          <div class="list-image" @click="showDetail(cat)">
            <img :src="cat.image" :alt="cat.name" />
            <div class="breed-tag">{{ cat.breed }}</div>
          </div>

          <div class="list-content">
            <h3 class="cat-name">{{ cat.name }}</h3>
            <p class="cat-description">{{ cat.description }}</p>

            <div class="list-stats">
              <div class="stat-item">
                <span class="stat-label">体型</span>
                <span class="stat-value">{{ cat.stats.size }}%</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">活跃度</span>
                <span class="stat-value">{{ cat.stats.activity }}%</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">友善度</span>
                <span class="stat-value">{{ cat.stats.friendly }}%</span>
              </div>
            </div>

            <div class="cat-tags">
              <span
                v-for="(tag, tagIndex) in cat.tags"
                :key="tagIndex"
                :class="['cat-tag', getTagClass(tag)]"
              >
                {{ tag }}
              </span>
            </div>

            <button class="detail-btn" @click="showDetail(cat)">
              <span class="material-icons-sharp">visibility</span>
              查看详情
            </button>
          </div>
        </div>
      </div>

      <!-- 加载更多按钮 -->
      <div class="load-more-container">
        <button 
          class="load-more-btn" 
          @click="loadMorePets" 
          :class="{loading: loading}"
          :disabled="loading"
        >
          <span v-if="!loading" class="button-text">加载更多</span>
          <span class="button-loader" v-if="loading"></span>
        </button>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredCats.length === 0">
        <span class="material-icons-sharp">sentiment_dissatisfied</span>
        <p>没有找到符合条件的猫咪</p>
        <button @click="selectedTags = []" class="reset-btn">重置搜索</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catwiki-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
}

/* 上方区域样式 */
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

/* 下方区域样式 */
.bottom-section {
  background-color: var(--white);
  border-radius: var(--radius-16);
  box-shadow: var(--shadow-1);
  padding: 20px;
}

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

.cat-count {
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

.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.cat-card {
  background-color: white;
  border-radius: var(--radius-16);
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
}

.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-3);
  border-color: var(--deongaree-yw);
}

.image-container {
  height: 220px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.breed-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--dark);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-12);
  font-weight: 600;
  box-shadow: var(--shadow-1);
}

.image-container:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .overlay {
  opacity: 1;
}

.view-details {
  background-color: var(--deongaree);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.image-container:hover .view-details {
  transform: translateY(0);
}

.cat-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cat-name {
  font-size: var(--fs-22);
  margin: 0 0 12px 0;
  color: var(--dark);
  font-weight: 600;
}

.cat-description {
  color: var(--dark-variant);
  font-size: var(--fs-14);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.cat-stats {
  margin-bottom: 20px;
}

.stat-item {
  margin-bottom: 15px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat-label {
  font-size: var(--fs-14);
  color: var(--dark-variant);
}

.stat-value {
  font-size: var(--fs-14);
  color: var(--dark);
  font-weight: 600;
}

/* 爪印进度条样式 */
.paw-progress {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 24px;
}

.paw-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.25;
  transition: all 0.3s ease;
  filter: grayscale(100%);
  transform: scale(0.9);
  cursor: pointer;
}

.paw-icon .material-icons-sharp {
  font-size: 20px;
  color: var(--deongaree);
  transition: color 0.3s ease, transform 0.3s ease;
}

.paw-icon:hover .material-icons-sharp {
  transform: scale(1.2);
}

.paw-icon.filled {
  opacity: 1;
  filter: grayscale(0%);
  transform: scale(1.05);
}

.paw-icon.filled .material-icons-sharp {
  animation: pawPulse 0.5s ease-in-out;
  color: var(--deongaree);
}

@keyframes pawPulse {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.cat-tag {
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-12);
  color: var(--dark-variant);
  background-color: var(--light);
  transition: all 0.3s ease;
}

/* 特殊标签样式 */
.cat-tag.tag-gentle {
  background-color: #FFEFD5; /* 浅橙色 */
  color: #E67E22;
  border: 1px dashed #FFCC80;
  box-shadow: 0 2px 4px rgba(255, 152, 0, 0.1);
}

.cat-tag.tag-friendly {
  background-color: #FFF8E1; /* 奶油白 */
  color: #FF9800;
  border: 1px dashed #FFE082;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.1);
}

.cat-tag.tag-easy-care {
  background-color: #F1F8E9; /* 浅绿色 */
  color: #8BC34A;
  border: 1px dashed #C5E1A5;
  box-shadow: 0 2px 4px rgba(139, 195, 74, 0.1);
}

.cat-tag.tag-size {
  background-color: #E1F5FE; /* 浅蓝色 */
  color: #03A9F4;
  border: 1px dashed #81D4FA;
  box-shadow: 0 2px 4px rgba(3, 169, 244, 0.1);
}

.cat-tag.tag-smart {
  background-color: #E8EAF6; /* 浅紫色 */
  color: #5C6BC0;
  border: 1px dashed #9FA8DA;
  box-shadow: 0 2px 4px rgba(92, 107, 192, 0.1);
}

.cat-tag.tag-active {
  background-color: #FFE0B2; /* 浅黄色 */
  color: #FF7043;
  border: 1px dashed #FFCC80;
  box-shadow: 0 2px 4px rgba(255, 112, 67, 0.1);
}

.cat-tag.tag-short-hair {
  background-color: #E0F7FA; /* 浅青色 */
  color: #00ACC1;
  border: 1px dashed #80DEEA;
  box-shadow: 0 2px 4px rgba(0, 172, 193, 0.1);
}

.cat-tag.tag-long-hair {
  background-color: #F3E5F5; /* 浅紫红色 */
  color: #AB47BC;
  border: 1px dashed #CE93D8;
  box-shadow: 0 2px 4px rgba(171, 71, 188, 0.1);
}

.cat-tag.tag-independent {
  background-color: #E8F5E9; /* 浅绿色 */
  color: #43A047;
  border: 1px dashed #A5D6A7;
  box-shadow: 0 2px 4px rgba(67, 160, 71, 0.1);
}

.cat-tag.tag-elegant {
  background-color: #ECEFF1; /* 淡蓝灰色 */
  color: #607D8B;
  border: 1px dashed #B0BEC5;
  box-shadow: 0 2px 4px rgba(96, 125, 139, 0.1);
}

.cat-tag.tag-quiet {
  background-color: #E1F5FE; /* 极淡蓝色 */
  color: #039BE5;
  border: 1px dashed #81D4FA;
  box-shadow: 0 2px 4px rgba(3, 155, 229, 0.1);
}

.cat-tag.tag-clingy {
  background-color: #F8BBD0; /* 粉色 */
  color: #EC407A;
  border: 1px dashed #F48FB1;
  box-shadow: 0 2px 4px rgba(236, 64, 122, 0.1);
}

.cat-tag.tag-curious {
  background-color: #BBDEFB; /* 淡蓝色 */
  color: #1E88E5;
  border: 1px dashed #90CAF9;
  box-shadow: 0 2px 4px rgba(30, 136, 229, 0.1);
}

.cat-tag.tag-alert {
  background-color: #FFECB3; /* 淡黄色 */
  color: #FFA000;
  border: 1px dashed #FFD54F;
  box-shadow: 0 2px 4px rgba(255, 160, 0, 0.1);
}

/* hover effect for all tags */
.cat-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.detail-btn {
  width: 100%;
  background-color: var(--deongaree);
  color: white;
  border: none;
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  font-size: var(--fs-14);
  cursor: pointer;
  transition: all 0.3s ease;
}

.detail-btn:hover {
  background-color: var(--deongaree-dark);
  color: var(--deongaree);
  transform: translateY(-2px);
}

.detail-btn .material-icons-sharp {
  font-size: 18px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: var(--dark-variant);
}

.empty-state .material-icons-sharp {
  font-size: 64px;
  color: var(--light);
  margin-bottom: 20px;
}

.empty-state p {
  font-size: var(--fs-18);
  margin-bottom: 20px;
}

.reset-btn {
  background-color: var(--deongaree);
  color: white;
  border: none;
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  font-size: var(--fs-14);
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background-color: var(--deongaree-dark);
  transform: translateY(-2px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .wiki-container {
    padding: 10px;
    gap: 15px;
  }

  .cats-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .wiki-title {
    font-size: var(--fs-24);
  }

  .cat-count {
    display: none;
  }

  .view-toggle {
    display: none;
  }
}

/* 添加列表视图样式 */
.cats-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cat-list-item {
  display: flex;
  gap: 20px;
  background-color: white;
  border-radius: var(--radius-16);
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;
}

.cat-list-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-3);
  border-color: var(--deongaree-yw);
}

.list-image {
  width: 240px;
  height: 240px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.list-image:hover img {
  transform: scale(1.05);
}

.list-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.list-stats {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  padding: 12px;
  border-radius: 12px;
}

.list-stats .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.list-stats .stat-label {
  font-size: var(--fs-12);
  color: var(--dark-variant);
  font-weight: 500;
}

.list-stats .stat-value {
  font-size: var(--fs-18);
  font-weight: 600;
  color: var(--dark);
  display: flex;
  align-items: center;
}

.list-stats .stat-value::after {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 6px;
}

.list-stats .stat-item:nth-child(1) .stat-value::after {
  background-color: #4caf50;
}

.list-stats .stat-item:nth-child(2) .stat-value::after {
  background-color: #2196f3;
}

.list-stats .stat-item:nth-child(3) .stat-value::after {
  background-color: #ff9800;
}

.detail-btn {
  align-self: flex-end;
  background: linear-gradient(135deg, var(--deongaree), #3d85c6);
  color: white;
  border: none;
  border-radius: var(--radius-pill);
  padding: 12px 24px;
  font-size: var(--fs-14);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: auto;
  margin-bottom: 8px;
}

.detail-btn:hover {
  background: linear-gradient(135deg, #3d85c6, var(--deongaree));
  transform: translateY(-3px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.detail-btn .material-icons-sharp {
  font-size: 18px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cat-list-item {
    flex-direction: column;
  }

  .list-image {
    width: 100%;
    height: 200px;
  }

  .list-stats {
    flex-wrap: wrap;
  }
}

/* 加载更多按钮样式 */
.load-more-container {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  margin-top: 60px;
  background-color: var(--deongaree);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.load-more-btn {
  background: none;
  border: none;
  color: white;
  padding: 12px 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  min-width: 140px;
  min-height: 44px;
}

.load-more-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: height 0.5s ease;
}

.load-more-btn:hover::after {
  height: 100%;
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.load-more-btn.loading {
  background-color: var(--deongaree);
  color: transparent;
}

.button-loader {
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
