<script setup>
import { ref, computed, onMounted } from "vue";

const searchQuery = ref("");
const selectedTags = ref([]);
const selectedDog = ref(null);
const page = ref(1);
const loading = ref(false);
const filterTags = ["小型犬", "中型犬", "大型犬", "家庭犬", "工作犬", "运动犬"];

const dogs = ref([
  {
    id: 1,
    name: "金毛寻回犬",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    description: "金毛寻回犬智商很高，性格温顺，非常适合作为家庭犬和导盲犬。",
    stats: {
      size: 80,
      exercise: 85,
      friendly: 95,
    },
    tags: ["大型犬", "家庭犬"],
    characteristics: {
      体重: "25-34kg",
      肩高: "51-61cm",
      寿命: "10-12年",
      毛发: "双层被毛，防水",
    },
    personality:
      "金毛寻回犬性格温顺友善，智商很高，特别适合作为家庭犬和导盲犬。",
    traits: ["聪明", "温顺", "忠诚", "亲人", "易训练"],
  },
  {
    id: 2,
    name: "柴犬",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800",
    description: "柴犬是日本著名犬种，以其机警、忠诚和可爱的外表而闻名。",
    stats: {
      size: 60,
      exercise: 75,
      friendly: 85,
    },
    tags: ["中型犬", "伴侣犬"],
    characteristics: {
      体重: "8-11kg",
      肩高: "35-43cm",
      寿命: "12-15年",
      毛发: "双层被毛，短密",
    },
    personality: "柴犬性格独立，警觉性强，对主人忠诚，但有时会比较固执。",
    traits: ["警觉", "忠诚", "独立", "聪明", "固执"],
  },
  {
    id: 3,
    name: "萨摩耶",
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800",
    description: '萨摩耶以其标志性的"微笑"表情和白色蓬松的被毛而闻名。',
    stats: {
      size: 75,
      exercise: 90,
      friendly: 90,
    },
    tags: ["大型犬", "雪橇犬"],
    characteristics: {
      体重: "20-30kg",
      肩高: "48-60cm",
      寿命: "12-14年",
      毛发: "双层厚实被毛",
    },
    personality: "萨摩耶性格友善活泼，非常喜欢人类，适合作为家庭伴侣犬。",
    traits: ["友善", "活泼", "聪明", "适应力强", "喜欢运动"],
  },
  {
    id: 4,
    name: "边境牧羊犬",
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800",
    description: "边境牧羊犬被认为是世界上最聪明的犬种，工作能力极强。",
    stats: {
      size: 70,
      exercise: 95,
      friendly: 80,
    },
    tags: ["中型犬", "工作犬"],
    characteristics: {
      体重: "14-20kg",
      肩高: "46-56cm",
      寿命: "12-15年",
      毛发: "双层中长被毛",
    },
    personality: "边境牧羊犬智商极高，工作热情，需要大量运动和智力训练。",
    traits: ["聪明", "敏捷", "工作热情", "需要训练", "运动量大"],
  },
  {
    id: 5,
    name: "哈士奇",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
    description: "西伯利亚哈士奇是著名的雪橇犬，性格活泼，充满活力。",
    stats: {
      size: 75,
      exercise: 95,
      friendly: 85,
    },
    tags: ["中型犬", "运动犬"],
    characteristics: {
      体重: "16-27kg",
      肩高: "50-60cm",
      寿命: "12-14年",
      毛发: "双层厚实被毛",
    },
    personality: "哈士奇性格独立活泼，需要大量运动，适合经验丰富的主人。",
    traits: ["活泼", "独立", "聪明", "需要运动", "调皮"],
  },
  {
    id: 6,
    name: "拉布拉多",
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800",
    description:
      "拉布拉多是最受欢迎的家庭犬之一，性格温和，特别适合有孩子的家庭。",
    stats: {
      size: 80,
      exercise: 80,
      friendly: 95,
    },
    tags: ["大型犬", "家庭犬"],
    characteristics: {
      体重: "25-36kg",
      肩高: "54-62cm",
      寿命: "10-12年",
      毛发: "短密双层被毛",
    },
    personality: "拉布拉多性格开朗友善，特别喜欢游泳，是优秀的导盲犬和搜救犬。",
    traits: ["友善", "温和", "聪明", "适合家庭", "喜欢游泳"],
  },
  {
    id: 7,
    name: "法国斗牛犬",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    description: "法国斗牛犬体型小巧，性格活泼可爱，是理想的公寓犬。",
    stats: {
      size: 40,
      exercise: 50,
      friendly: 85,
    },
    tags: ["小型犬", "伴侣犬"],
    characteristics: {
      体重: "8-14kg",
      肩高: "27-35cm",
      寿命: "10-12年",
      毛发: "短毛",
    },
    personality: "法国斗牛犬性格友好活泼，适应性强，是完美的城市伴侣犬。",
    traits: ["活泼", "友好", "适应力强", "不需要大量运动"],
  },
  {
    id: 8,
    name: "德国牧羊犬",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800",
    description: "德国牧羊犬是著名的工作犬，智商高，忠诚度极强。",
    stats: {
      size: 85,
      exercise: 90,
      friendly: 75,
    },
    tags: ["大型犬", "工作犬"],
    characteristics: {
      体重: "30-40kg",
      肩高: "55-65cm",
      寿命: "9-13年",
      毛发: "双层中长毛",
    },
    personality: "德国牧羊犬勇敢忠诚，工作能力出色，需要专业的训练。",
    traits: ["忠诚", "勇敢", "聪明", "需要训练", "保护欲强"],
  },
  {
    id: 9,
    name: "柯基",
    image: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=800",
    description: "威尔士柯基犬以其短腿和可爱的外表闻名，性格活泼开朗。",
    stats: {
      size: 45,
      exercise: 70,
      friendly: 90,
    },
    tags: ["小型犬", "家庭犬"],
    characteristics: {
      体重: "10-12kg",
      肩高: "25-30cm",
      寿命: "12-14年",
      毛发: "双层中等长度",
    },
    personality: "柯基虽然体型小，但性格活泼，有牧羊犬的特性，需要适量运动。",
    traits: ["聪明", "活泼", "友善", "适合家庭", "倔强"],
  },
  {
    id: 10,
    name: "贵宾犬",
    image: "https://images.unsplash.com/photo-1604916287784-c324202b3205?w=800",
    description: "贵宾犬优雅聪明，有多种体型大小，是理想的伴侣犬。",
    stats: {
      size: 50,
      exercise: 75,
      friendly: 90,
    },
    tags: ["小型犬", "不掉毛"],
    characteristics: {
      体重: "3-35kg",
      肩高: "24-60cm",
      寿命: "12-15年",
      毛发: "卷曲不掉毛",
    },
    personality: "贵宾犬智商极高，性格优雅，适合过敏人士。",
    traits: ["聪明", "优雅", "不掉毛", "易训练", "亲人"],
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
  selectedDog.value = dog;
};

// 模拟加载更多数据
const loadMorePets = async () => {
  if (loading.value) return;
  loading.value = true;

  // 模拟API请求延迟 -- 调用接口获取宠物数据
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newDogs = [
    {
      id: 1,
      name: "金毛寻回犬",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
      description: "金毛寻回犬智商很高，性格温顺，非常适合作为家庭犬和导盲犬。",
      stats: {
        size: 80,
        exercise: 85,
        friendly: 95,
      },
      tags: ["大型犬", "家庭犬"],
      characteristics: {
        体重: "25-34kg",
        肩高: "51-61cm",
        寿命: "10-12年",
        毛发: "双层被毛，防水",
      },
      personality:
        "金毛寻回犬性格温顺友善，智商很高，特别适合作为家庭犬和导盲犬。",
      traits: ["聪明", "温顺", "忠诚", "亲人", "易训练"],
    },
  ];

  dogs.value.push(...newDogs);
  page.value++;
  loading.value = false;
};

// 监听滚动加载更多
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollHeight - scrollTop - clientHeight < 200 && !loading.value) {
    loadMorePets();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="wiki-dogs">
    <div class="wiki-filters">
      <div class="wiki-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          v-model="searchQuery"
          class="wiki-search__input"
          placeholder="搜些什么吧 ε٩(๑> ₃ <)۶з"
        />
      </div>

      <div class="wiki-tags">
        <button
          v-for="tag in filterTags"
          :key="tag"
          class="wiki-tags__button"
          :class="{ 'is-active': selectedTags.includes(tag) }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <div class="wiki-grid">
      <article
        v-for="dog in filteredDogs"
        :key="dog.id"
        class="dog-card"
        @click="showDetail(dog)"
      >
        <div class="dog-card__image">
          <img :src="dog.image" :alt="dog.name" />
        </div>
        <div class="dog-card__content">
          <h3 class="dog-card__title">{{ dog.name }}</h3>
          <p class="dog-card__description">{{ dog.description }}</p>

          <div class="dog-card__stats">
            <div class="stat">
              <span class="stat__label">体型</span>
              <div class="stat__bar">
                <div
                  :style="{ width: `${dog.stats.size}%` }"
                  class="stat__fill"
                ></div>
              </div>
            </div>
            <div class="stat">
              <span class="stat__label">运动量</span>
              <div class="stat__bar">
                <div
                  :style="{ width: `${dog.stats.exercise}%` }"
                  class="stat__fill"
                ></div>
              </div>
            </div>
            <div class="stat">
              <span class="stat__label">友善度</span>
              <div class="stat__bar">
                <div
                  :style="{ width: `${dog.stats.friendly}%` }"
                  class="stat__fill"
                ></div>
              </div>
            </div>
          </div>

          <div class="dog-card__tags">
            <span v-for="tag in dog.tags" :key="tag" class="dog-card__tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- 加载更多指示器 -->
    <div v-if="loading" class="loading-indicator">
      <div class="loader"></div>
      <span>狗狗正在赶来的路上...</span>
    </div>

    <!-- 详情弹窗 -->
    <teleport to="body">
      <div v-if="selectedDog" class="wiki-modal">
        <div class="wiki-modal__backdrop" @click="selectedDog = null"></div>
        <div class="wiki-modal__content">
          <button class="wiki-modal__close" @click="selectedDog = null">
            <i class="fas fa-times"></i>
          </button>

          <div class="wiki-modal__header">
            <img :src="selectedDog.image" :alt="selectedDog.name" />
            <h2>{{ selectedDog.name }}</h2>
          </div>

          <div class="wiki-modal__body">
            <div class="wiki-modal__section">
              <h3>宠物信息</h3>
              <p>{{ selectedDog.description }}</p>
            </div>

            <div class="wiki-modal__section">
              <h3>性格特点</h3>
              <ul>
                <li v-for="trait in selectedDog.traits" :key="trait">
                  {{ trait }}
                </li>
              </ul>
            </div>

            <div class="wiki-modal__section">
              <h3>宠物特征</h3>
              <ul>
                <li
                  v-for="characteristic in selectedDog.characteristics"
                  :key="characteristic"
                >
                  {{ characteristic }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.wiki-dogs {
  padding: 2rem;
  padding-top: 0;
}

.wiki-filters {
  margin-bottom: 1rem;
}

.wiki-search {
  position: relative;
  margin-bottom: 1rem;

  &__input {
    width: 94%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 14px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px #dbeafe;
    }
  }

  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
}

.wiki-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  &__button {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: #f1f5f9;
    color: #475569;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:hover {
      background: #e2e8f0;
    }

    &.is-active {
      background: #3b82f6;
      color: white;
    }
  }
}

.wiki-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.dog-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  &__image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
    }
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1e293b;
    font-family: var(--ff-llt);
  }

  &__description {
    color: #475569;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  &__stats {
    margin-bottom: 1.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    padding: 0.25rem 0.75rem;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 9999px;
    font-size: 0.875rem;
  }
}

.stat {
  margin-bottom: 0.75rem;

  &__label {
    display: block;
    font-size: 0.875rem;
    color: #475569;
    margin-bottom: 0.25rem;
  }

  &__bar {
    width: 100%;
    height: 6px;
    background: #f1f5f9;
    border-radius: 9999px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: #3b82f6;
    border-radius: 9999px;
    transition: width 0.3s ease;
  }
}

// 详情样式
.wiki-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  &__content {
    position: relative;
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    background: white;
    border-radius: 1rem;
    overflow-y: auto;
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: rotate(90deg);
      align-self: center;
      justify-self: center;
      background: rgba(0, 0, 0, 0.4);

      i {
        color: #fff;
      }
    }
  }

  &__header {
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    h2 {
      padding: 1.5rem;
      font-size: 2rem;
      font-weight: 700;
      font-family: var(--ff-llt);
    }
  }

  &__body {
    padding: 0 1.5rem 1.5rem;
  }

  &__section {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    p {
      color: #64748b;
      line-height: 1.6;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;
        color: #64748b;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b82f6;
        }
      }
    }
  }
}

// 加载动画
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #718096;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--deongaree);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
