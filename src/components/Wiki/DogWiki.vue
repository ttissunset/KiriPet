<script setup>
import { ref, computed, onMounted, inject, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { dogInfos } from "../../../src/mock/infos.js";

// Inject search state from parent
const parentSearchQuery = inject('searchQuery', ref(''));
const showSearchResults = inject('showSearchResults', ref(false));

const selectedTags = ref([]);
const selectedDog = ref(null);
const page = ref(1);
const loading = ref(false);
const filterTags = ["活泼", "可爱", "友善", "聪明", "敏捷", "叛逆"];
const router = useRouter();
const viewMode = ref("grid");

// 使用infos.js中的dogInfos数据
const dogs = ref(dogInfos);

// Update filteredDogs computed property to handle search query
const filteredDogs = computed(() => {
  let result = dogs.value;
  
  // If search is active, filter by search query
  if (showSearchResults.value && parentSearchQuery.value.trim()) {
    const query = parentSearchQuery.value.toLowerCase().trim();
    result = result.filter(
      (dog) =>
        dog.name.toLowerCase().includes(query) ||
        dog.breed.toLowerCase().includes(query) ||
        dog.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }
  
  // Only filter by tags if there are selected tags
  if (selectedTags.value.length > 0) {
    result = result.filter(dog => 
      selectedTags.value.every(tag => dog.tags.includes(tag))
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
const showDetail = (dog) => {
  router.push({
    name: "WikiPetDetail",
    params: {
      type: "dogs",
      id: dog.id,
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
  const containerWidth = document.querySelector(".dogs-grid").offsetWidth;
  const cardWidth = 300; // 卡片最小宽度
  const cardsPerRow = Math.floor(containerWidth / cardWidth);

  // 计算需要加载的卡片数量，确保是整行
  const currentCards = dogs.value.length;
  const remainingCards = cardsPerRow - (currentCards % cardsPerRow);
  const cardsToLoad =
    remainingCards === cardsPerRow ? cardsPerRow : remainingCards;

  const newDogs = [
    {
      id: dogs.value.length + 1,
      name: "金毛寻回犬",
      breed: "金毛",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
      description: "金毛寻回犬智商很高，性格温顺，非常适合作为家庭犬和导盲犬。",
      stats: {
        size: 80,
        exercise: 85,
        friendly: 95,
      },
      tags: ["大型犬", "家庭犬", "温顺"],
    },
    {
      id: dogs.value.length + 2,
      name: "拉布拉多犬",
      breed: "拉布拉多",
      image:
        "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
      description: "拉布拉多犬是友善忠诚的大型犬，智商高，容易训练。",
      stats: {
        size: 75,
        exercise: 90,
        friendly: 90,
      },
      tags: ["大型犬", "工作犬", "聪明"],
    },
    {
      id: dogs.value.length + 3,
      name: "边境牧羊犬",
      breed: "边牧",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
      description: "边境牧羊犬被公认为犬类中智商最高的品种，精力旺盛。",
      stats: {
        size: 65,
        exercise: 95,
        friendly: 75,
      },
      tags: ["中型犬", "工作犬", "聪明"],
    },
    {
      id: dogs.value.length + 4,
      name: "柯基犬",
      breed: "柯基",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800",
      description: "柯基犬是一种小型犬，因其短腿和长身体而闻名，性格活泼友善。",
      stats: {
        size: 35,
        exercise: 65,
        friendly: 90,
      },
      tags: ["小型犬", "牧羊犬", "活泼"],
    },
  ];

  // 加载新数据
  dogs.value.push(...newDogs.slice(0, Math.max(4, cardsToLoad)));
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
const openDetail = (dog) => {
  selectedDog.value = dog;
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
  <div class="dogwiki-container">
    <!-- Top Filter Section -->
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
            <span class="material-icons-sharp" v-if="selectedTags.includes(tag)">close</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 宠物详情区域 - 下方区域 -->
    <div class="bottom-section">
      <div class="wiki-header">
        <h1 class="wiki-title">
          <span class="material-icons-sharp">pets</span>
          狗狗百科
          <span class="dog-count">{{ filteredDogs.length }}只狗狗</span>
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

      <!-- 狗狗卡片网格 -->
      <div :class="['dogs-grid', viewMode]" v-if="viewMode === 'grid'">
        <div v-for="dog in filteredDogs" :key="dog.id" class="dog-card">
          <div class="image-container" @click="showDetail(dog)">
            <img :src="dog.image" :alt="dog.name" />
            <div class="breed-tag">{{ dog.breed }}</div>
            <div class="overlay">
              <span class="view-details">查看详情</span>
            </div>
          </div>

          <div class="dog-info">
            <h3 class="dog-name">{{ dog.name }}</h3>
            <p class="dog-description">{{ dog.description }}</p>

            <div class="dog-stats">
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">体型</span>
                  <span class="stat-value">{{ dog.stats.size }}%</span>
                </div>
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${dog.stats.size}%` }"
                  ></div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">运动量</span>
                  <span class="stat-value">{{ dog.stats.exercise }}%</span>
                </div>
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${dog.stats.exercise}%` }"
                  ></div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-header">
                  <span class="stat-label">友善度</span>
                  <span class="stat-value">{{ dog.stats.friendly }}%</span>
                </div>
                <div class="stat-bar">
                  <div
                    class="stat-fill"
                    :style="{ width: `${dog.stats.friendly}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="dog-tags">
              <span
                v-for="(tag, tagIndex) in dog.tags"
                :key="tagIndex"
                class="dog-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 列表视图 -->
      <div class="dogs-list" v-if="viewMode === 'list'">
        <div v-for="dog in filteredDogs" :key="dog.id" class="dog-list-item">
          <div class="list-image" @click="showDetail(dog)">
            <img :src="dog.image" :alt="dog.name" />
            <div class="breed-tag">{{ dog.breed }}</div>
          </div>

          <div class="list-content">
            <h3 class="dog-name">{{ dog.name }}</h3>
            <p class="dog-description">{{ dog.description }}</p>

            <div class="list-stats">
              <div class="stat-item">
                <span class="stat-label">体型</span>
                <span class="stat-value">{{ dog.stats.size }}%</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">运动需求</span>
                <span class="stat-value">{{ dog.stats.exercise }}%</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">友善度</span>
                <span class="stat-value">{{ dog.stats.friendly }}%</span>
              </div>
            </div>

            <div class="dog-tags">
              <span
                v-for="(tag, tagIndex) in dog.tags"
                :key="tagIndex"
                class="dog-tag"
              >
                {{ tag }}
              </span>
            </div>

            <button class="detail-btn" @click="showDetail(dog)">
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
          :disabled="loading"
        >
          <span v-if="!loading" class="button-text">加载更多</span>
          <span class="button-loader" v-if="loading"></span>
        </button>
      </div>

      <!-- 宠物详情弹窗 (当选中某只狗狗时显示) -->
      <div class="pet-detail-modal" v-if="selectedDog">
        <!-- 宠物详情弹窗内容 -->
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredDogs.length === 0">
        <span class="material-icons-sharp">sentiment_dissatisfied</span>
        <p>没有找到符合条件的狗狗</p>
        <button
          @click="
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
.dogwiki-container {
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

.dog-count {
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

.dogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.dog-card {
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

.dog-card:hover {
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

.dog-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dog-name {
  font-size: var(--fs-22);
  margin: 0 0 12px 0;
  color: var(--dark);
  font-weight: 600;
}

.dog-description {
  color: var(--dark-variant);
  font-size: var(--fs-14);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.dog-stats {
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

.dog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.dog-tag {
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

  .dogs-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .wiki-title {
    font-size: var(--fs-24);
  }

  .dog-count {
    display: none;
  }

  .view-toggle {
    display: none;
  }

  .dog-list-item {
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

/* 添加列表视图样式 */
.dogs-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dog-list-item {
  display: flex;
  gap: 20px;
  background-color: white;
  border-radius: var(--radius-16);
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;
}

.dog-list-item:hover {
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
  background-color: #4CAF50;
}

.list-stats .stat-item:nth-child(2) .stat-value::after {
  background-color: #2196F3;
}

.list-stats .stat-item:nth-child(3) .stat-value::after {
  background-color: #FF9800;
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

/* 加载更多按钮样式 */
.load-more-container {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  margin-top: 60px;
  background-color: var(--deongaree);
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

.button-loader {
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s infinite linear;
}

.load-more-btn.loading .button-text {
  visibility: hidden;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
