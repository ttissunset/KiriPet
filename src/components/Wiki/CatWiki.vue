<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const selectedTags = ref([]);
const selectedCat = ref(null);
const page = ref(1);
const loading = ref(false);
const router = useRouter();
const viewMode = ref("grid");
const filterTags = ["温顺", "活泼", "短毛", "长毛", "聪明", "独立"];

// 存放宠物数据
const cats = ref([
  {
    id: 1,
    name: "英国短毛猫",
    breed: "英短",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
    description:
      "英国短毛猫性格温和友善，适合家庭饲养。圆圆的脸和大眼睛是其标志性特征。被毛短而密，易于护理，是受欢迎的家庭宠物。",
    tags: ["温顺", "友好", "易护理"],
    stats: {
      size: 60,
      activity: 50,
      friendly: 90,
    },
  },
  {
    id: 2,
    name: "美国短毛猫",
    breed: "美短",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    description:
      "美国短毛猫温和且适应性强，是理想的家庭宠物。体格健壮，被毛短密，性格友善，与人和其他宠物相处融洽。寿命长，护理简单。",
    tags: ["活泼", "亲人", "耐心"],
    stats: {
      size: 65,
      activity: 55,
      friendly: 85,
    },
  },
  {
    id: 3,
    name: "波斯猫",
    breed: "波斯",
    image: "https://images.unsplash.com/photo-1616089966833-d61352757708?w=800",
    description:
      "波斯猫是长毛猫的代表，性格安静优雅。扁平的脸和长而密的被毛是其特色。性格温和，活动量低，适合室内饲养，需要定期梳理毛发。",
    tags: ["优雅", "安静", "长毛"],
    stats: {
      size: 55,
      activity: 30,
      friendly: 70,
    },
  },
  {
    id: 4,
    name: "暹罗猫",
    breed: "暹罗",
    image: "https://images.unsplash.com/photo-1576120634744-ee3e08b3be0d?w=800",
    description:
      "暹罗猫聪明活泼，性格外向。蓝眼睛和颜色对比强烈的四肢是其特征。声音响亮，善于交流，需要大量互动和陪伴。",
    tags: ["聪明", "外向", "粘人"],
    stats: {
      size: 50,
      activity: 80,
      friendly: 75,
    },
  },
  {
    id: 5,
    name: "缅因猫",
    breed: "缅因",
    image: "https://images.unsplash.com/photo-1595752776689-aebef37b5d32?w=800",
    description:
      "缅因猫是最大的家猫品种之一，体型巨大，性格温和友善。毛发浓密且长，具有防水特性。适应性强，喜欢与人互动，但不过分粘人。",
    tags: ["大型", "温和", "聪明"],
    stats: {
      size: 90,
      activity: 60,
      friendly: 85,
    },
  },
  {
    id: 6,
    name: "苏格兰折耳猫",
    breed: "折耳",
    image: "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?w=800",
    description:
      "苏格兰折耳猫以其特殊的耳朵形状而闻名。性格温顺，对人友善，适合家庭饲养。活动量适中，可以适应公寓生活。需要注意遗传性骨骼问题。",
    tags: ["独特", "温顺", "可爱"],
    stats: {
      size: 55,
      activity: 55,
      friendly: 80,
    },
  },
  {
    id: 7,
    name: "孟加拉猫",
    breed: "孟加拉",
    image: "https://images.unsplash.com/photo-1638524222399-1a8607fa0daa?w=800",
    description:
      "孟加拉猫是家猫与亚洲豹猫杂交的品种，外表像小型豹子。精力充沛，智商高，需要足够的活动空间。性格友善但独立，喜欢互动和玩耍。",
    tags: ["豹纹", "活跃", "聪明"],
    stats: {
      size: 60,
      activity: 90,
      friendly: 70,
    },
  },
  {
    id: 8,
    name: "挪威森林猫",
    breed: "森林猫",
    image: "https://images.unsplash.com/photo-1538488881038-e252a119ace7?w=800",
    description:
      "挪威森林猫体型大，毛发长且防水。适应能力强，性格温和且独立。喜欢攀爬，需要足够的活动空间。对家庭友善，但不会过分黏人。",
    tags: ["大型", "独立", "长毛"],
    stats: {
      size: 85,
      activity: 70,
      friendly: 75,
    },
  },
]);

// 关键词搜索
const filteredCats = computed(() => {
  let result = cats.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

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
  ];

  // 只添加需要的卡片数量
  cats.value.push(...newCats.slice(0, cardsToLoad));
  page.value++;
  loading.value = false;
};

// 监听滚动加载更多
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  // 当滚动到距离底部200px时触发加载
  if (scrollHeight - scrollTop - clientHeight < 200 && !loading.value) {
    loadMorePets();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

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
      <div class="search-bar-container">
        <div class="search-bar">
          <span class="material-icons-sharp">search</span>
          <input
            type="text"
            placeholder="搜索猫咪品种..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <div class="tag-panel">
        <h2 class="tag-panel-title">品种分类</h2>
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
              <span class="view-details">查看详情</span>
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
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${cat.stats.size}%` }"
                  ></div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">活跃度</span>
                  <span class="stat-value">{{ cat.stats.activity }}%</span>
                </div>
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${cat.stats.activity}%` }"
                  ></div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">友善度</span>
                  <span class="stat-value">{{ cat.stats.friendly }}%</span>
                </div>
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${cat.stats.friendly}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="cat-tags">
              <span
                v-for="(tag, tagIndex) in cat.tags"
                :key="tagIndex"
                class="cat-tag"
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
                class="cat-tag"
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

      <!-- 加载更多指示器 -->
      <div class="loading-more" v-if="loading">
        <div class="spinner"></div>
        <span>加载更多猫咪...</span>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredCats.length === 0">
        <span class="material-icons-sharp">sentiment_dissatisfied</span>
        <p>没有找到符合条件的猫咪</p>
        <button
          @click="
            searchQuery = '';
            selectedTags = [];
          "
          class="reset-btn"
        >
          重置搜索
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catwiki-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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

.search-bar-container {
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--white_a3);
  border-radius: var(--radius-pill);
  padding: 12px 20px;
  box-shadow: var(--shadow-1);
  transition: all 0.3s ease;
  width: 100%;
}

.search-bar:focus-within {
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
}

.search-bar .material-icons-sharp {
  color: var(--dark-variant);
  margin-right: 10px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--fs-16);
  color: var(--dark);
  width: 100%;
}

.tag-panel {
  padding: 20px 0 0 0;
  border-top: 1px solid var(--light);
}

.tag-panel-title {
  font-size: var(--fs-18);
  color: var(--dark);
  margin-bottom: 15px;
  font-weight: 600;
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
  background-color: var(--white_a3);
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
  margin-bottom: 5px;
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

.stat-bar {
  height: 8px;
  background-color: var(--light);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background-color: var(--deongaree);
  border-radius: var(--radius-pill);
  transition: width 0.5s ease;
}

.cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.cat-tag {
  padding: 4px 12px;
  background-color: var(--deongaree-yw);
  border-radius: var(--radius-pill);
  font-size: var(--fs-12);
  color: var(--dark);
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

.loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  color: var(--dark-variant);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--light);
  border-top-color: var(--deongaree);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
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
}

.cat-list-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-3);
}

.list-image {
  width: 200px;
  height: 200px;
  position: relative;
  cursor: pointer;
}

.list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.list-stats {
  display: flex;
  gap: 20px;
  margin: 15px 0;
}

.list-stats .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.list-stats .stat-label {
  font-size: var(--fs-12);
  color: var(--dark-variant);
}

.list-stats .stat-value {
  font-size: var(--fs-16);
  font-weight: 600;
  color: var(--dark);
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
</style>
