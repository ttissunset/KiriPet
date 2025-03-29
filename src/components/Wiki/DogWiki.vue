<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const selectedTags = ref([]);
const selectedDog = ref(null);
const page = ref(1);
const loading = ref(false);
const filterTags = ["活泼", "可爱", "友善", "聪明", "敏捷", "叛逆"];
const router = useRouter();
const viewMode = ref("grid");

const dogs = ref([
  {
    id: 1,
    name: "金毛寻回犬",
    age: "2-4岁",
    breed: "金毛",
    avatar:
      "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800",
    image: "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800",
    shortDesc: '"最受欢迎的友善家庭犬"',
    gender: "公",
    weight: "25-34公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["友善", "聪明", "忠诚"],
    stats: {
      size: 80,
      exercise: 85,
      friendly: 95,
    },
    personalityTraits: [
      "性格极其友善，适合家庭饲养",
      "对儿童有极高的耐心和包容性",
      "聪明好学，容易训练",
      "喜欢户外活动，精力充沛",
      "忠诚度高，对主人非常依恋",
    ],
    careAdvice: [
      "每天需要至少1小时的户外运动",
      "定期梳理被毛，春秋季节脱毛多",
      "注意耳部清洁，预防耳道感染",
      "定期驱虫和疫苗接种",
      "控制饮食，防止肥胖",
    ],
    description:
      "金毛寻回犬原产于苏格兰，性格友善活泼，智商高且易于训练。是理想的家庭犬和工作犬，适合有孩子的家庭。需要充分的运动和社交活动。",
  },
  {
    id: 2,
    name: "拉布拉多犬",
    age: "1-3岁",
    breed: "拉布拉多",
    avatar:
      "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
    image: "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
    shortDesc: '"工作犬中的全能选手"',
    gender: "母",
    weight: "25-36公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["温顺", "聪明", "活泼"],
    stats: {
      size: 80,
      exercise: 90,
      friendly: 90,
    },
    personalityTraits: [
      "性格温和友善，是优秀的家庭犬",
      "适应性强，喜欢与人互动",
      "学习能力强，容易训练",
      "对人友好，几乎不会有攻击性",
      "喜欢水，游泳能力极佳",
    ],
    careAdvice: [
      "需要大量运动，每天至少1-2小时",
      "控制饮食，容易肥胖",
      "定期梳理被毛，减少掉毛",
      "注意耳朵清洁，预防感染",
      "定期检查牙齿健康",
    ],
    description:
      "拉布拉多犬是友善忠诚的大型犬，智商高，容易训练。性格温和，特别适合家庭饲养。喜欢水，游泳能力强，需要充分的运动和互动。",
  },
  {
    id: 3,
    name: "边境牧羊犬",
    age: "1-2岁",
    breed: "边牧",
    avatar: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
    shortDesc: '"世界上最聪明的犬种"',
    gender: "公",
    weight: "14-20公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["聪明", "敏捷", "工作型"],
    stats: {
      size: 65,
      exercise: 95,
      friendly: 75,
    },
    personalityTraits: [
      "极其聪明，被公认为犬类中智商最高的品种",
      "精力充沛，需要大量运动和智力挑战",
      "工作欲望强，喜欢有任务的生活",
      "对主人忠诚，形成强烈的依恋关系",
      "警觉性高，有很好的保护意识",
    ],
    careAdvice: [
      "需要大量身体和智力活动，每天至少2小时",
      "定期梳理被毛，特别是换毛季节",
      "提供智力玩具和挑战性任务",
      "系统性训练，建立良好的沟通",
      "避免长时间独处，防止分离焦虑",
    ],
    description:
      "边境牧羊犬被公认为犬类中智商最高的品种，源自英国边境地区。精力旺盛，需要大量身体和智力活动，适合有经验的养犬人士。",
  },
  {
    id: 4,
    name: "哈士奇",
    age: "1-3岁",
    breed: "哈士奇",
    avatar:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
    shortDesc: '"雪橇三傻之一"',
    gender: "公",
    weight: "16-27公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["活泼", "独立", "叛逆"],
    stats: {
      size: 70,
      exercise: 90,
      friendly: 80,
    },
    personalityTraits: [
      "性格独立，有时显得叛逆",
      "极其友善，对陌生人也很友好",
      "聪明但倔强，训练时需要耐心",
      "活力充沛，需要大量运动",
      "喜欢挖掘和探索，好奇心强",
    ],
    careAdvice: [
      "需要大量运动，每天至少2小时",
      "定期梳理被毛，尤其是换毛季节",
      "牢固的围栏，防止逃跑",
      "夏季注意防暑，不适合炎热环境",
      "一致性训练，建立明确规则",
    ],
    description:
      "哈士奇是西伯利亚原产的中型犬，性格活泼独立。喜欢户外活动，需要大量运动。不适合高温环境，换毛期掉毛量大。适合有经验的饲养者。",
  },
  {
    id: 5,
    name: "德国牧羊犬",
    age: "2-4岁",
    breed: "德牧",
    avatar:
      "https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800",
    shortDesc: '"忠诚勇敢的工作犬"',
    gender: "公",
    weight: "30-40公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["智能", "勇敢", "工作型"],
    stats: {
      size: 85,
      exercise: 85,
      friendly: 70,
    },
    personalityTraits: [
      "性格勇敢、自信、稳定",
      "极其忠诚，对主人有强烈保护欲",
      "聪明且工作热情高，易训练",
      "警觉性强，是优秀的看门犬",
      "对家庭成员温顺友善",
    ],
    careAdvice: [
      "需要大量运动和训练，每天至少1.5小时",
      "定期梳理被毛，减少脱毛",
      "提供智力挑战和任务",
      "社会化训练，避免过度保护行为",
      "注意关节健康，避免幼犬剧烈运动",
    ],
    description:
      "德国牧羊犬是一种勇敢、聪明的工作犬，警觉性高，保护意识强。需要系统训练和大量运动，适合有经验的主人。是优秀的警犬和服务犬。",
  },
  {
    id: 6,
    name: "法国斗牛犬",
    age: "1-2岁",
    breed: "法斗",
    avatar:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    shortDesc: '"小型伴侣犬中的明星"',
    gender: "母",
    weight: "8-14公斤",
    health: "注意呼吸系统",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["友善", "活泼", "性格好"],
    stats: {
      size: 40,
      exercise: 50,
      friendly: 90,
    },
    personalityTraits: [
      "性格友善、活泼、充满活力",
      "与家人建立亲密关系，喜欢陪伴",
      "警觉性强但不常吠叫",
      "对陌生人友好，社交性好",
      "适应性强，适合公寓生活",
    ],
    careAdvice: [
      "控制运动量，避免过度运动",
      "注意呼吸问题，避免高温环境",
      "定期清洁面部褶皱，预防感染",
      "控制体重，提供均衡饮食",
      "避免游泳，大多数法斗不善游泳",
    ],
    description:
      "法国斗牛犬是受欢迎的小型伴侣犬，性格友善活泼。适合公寓生活，不需要大量运动。注意呼吸道健康，避免高温环境。温和友善，适合各类家庭。",
  },
  {
    id: 7,
    name: "柴犬",
    age: "1-3岁",
    breed: "柴犬",
    avatar: "https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800",
    image: "https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800",
    shortDesc: '"日本国宝级犬种"',
    gender: "公",
    weight: "8-11公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["独立", "忠诚", "警觉"],
    stats: {
      size: 45,
      exercise: 70,
      friendly: 65,
    },
    personalityTraits: [
      "性格独立自主，有时显得高冷",
      "对主人极其忠诚，形成强烈依恋",
      "警觉性高，是优秀的看门犬",
      "有丰富的表情，喜欢表达自己",
      "适应能力强，适合公寓生活",
    ],
    careAdvice: [
      "需要适量运动，每天1小时左右",
      "定期梳理被毛，尤其是换毛期",
      "早期社会化训练非常重要",
      "建立明确的规则和界限",
      "保持一致性训练，避免混淆",
    ],
    description:
      '柴犬是日本的国宝级犬种，体型小巧，性格独立忠诚。表情丰富，网络上著名的"狗头"表情包犬种。适合公寓生活，需要适当训练和社会化。',
  },
  {
    id: 8,
    name: "萨摩耶犬",
    age: "1-2岁",
    breed: "萨摩耶",
    avatar:
      "https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800",
    image: "https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800",
    shortDesc: '"微笑天使"',
    gender: "母",
    weight: "16-30公斤",
    health: "健康",
    vaccinated: "已接种",
    neutered: "已绝育",
    tags: ["友善", "活泼", "漂亮"],
    stats: {
      size: 70,
      exercise: 80,
      friendly: 95,
    },
    personalityTraits: [
      "性格友善开朗，永远面带微笑",
      "对人友好，几乎没有攻击性",
      "聪明但有独立性，训练需要耐心",
      "活力充沛，喜欢户外活动",
      "与家人亲密，享受家庭生活",
    ],
    careAdvice: [
      "需要大量梳理，每周至少3-4次",
      "需要适量运动，每天1-2小时",
      "夏季注意防暑，不适合炎热环境",
      "社会化训练要尽早开始",
      "注意牙齿和耳朵的清洁",
    ],
    description:
      '萨摩耶犬因其上扬的嘴角被称为"微笑天使"，原产于西伯利亚。纯白色被毛，性格友善，几乎没有攻击性。需要频繁梳理毛发，不适合高温环境。',
  },
]);

// 关键词搜索
const filteredDogs = computed(() => {
  let result = dogs.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (dog) =>
        dog.name.toLowerCase().includes(query) ||
        dog.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (selectedTags.value.length > 0) {
    result = result.filter((dog) =>
      dog.tags.some((tag) => selectedTags.value.includes(tag))
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
  ];

  // 只添加需要的卡片数量
  dogs.value.push(...newDogs.slice(0, cardsToLoad));
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
    <!-- 搜索和筛选部分 - 上方区域 -->
    <div class="top-section">
      <div class="search-bar-container">
        <div class="search-bar">
          <span class="material-icons-sharp">search</span>
          <input
            type="text"
            placeholder="搜索狗狗品种..."
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
      <div class="dogs-list" v-else>
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
                <span class="stat-label">运动量</span>
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

      <!-- 加载更多指示器 -->
      <div class="loading-more" v-if="loading">
        <div class="spinner"></div>
        <span>加载更多狗狗...</span>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredDogs.length === 0">
        <span class="material-icons-sharp">sentiment_dissatisfied</span>
        <p>没有找到符合条件的狗狗</p>
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
.dogwiki-container {
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
}

.dog-list-item:hover {
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
</style>
