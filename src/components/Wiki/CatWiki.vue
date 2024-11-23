<script setup>
import { ref, computed, onMounted } from "vue";

const searchQuery = ref("");
const selectedCat = ref(null);
const page = ref(1);
const loading = ref(false);

// 存放宠物数据
const cats = ref([
  {
    id: 1,
    name: "英国短毛猫",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
    shortDesc: "“性格温和的理想猫”",
    description:
      "英国短毛猫是食肉目猫科猫属的哺乳动物。身体中等到大型，胸、肩、臀均宽；肌肉发达；头宽、圆而大，满月脸颊，鼻子短，下巴坚固，和鼻子构成垂线；耳朵大小中等，眼睛大而圆，间距大；尾巴长度为身长的2/3，毛型短而密，质地暗。英国短毛猫是最善于捕猎的猫类之一，被英国人公认为是“捕鼠能手”。 英国短毛猫天生爱洁净，好奇心强烈，喜欢夜游，喜爱鸡肉和鱼肉，可选择真空包装的湿性食品或罐头食品饲喂。英国短毛猫举止端庄，任性，独立性较强；善与小孩和狗共同玩耍，是成年人的忠实伴侣；有良好的心理素质，能自如地应付不良环境的影响。英国短毛猫寿命14～20年。英国短毛猫是最古老的猫种之一， 家猫育种鼻祖哈里森·威尔单独一人将英国“无主跑街猫”培育成英国短毛猫。于17世纪20年代随移民船到达美国，成为美国短毛猫的培育基础。在19世纪末期，该猫是英国水晶宫猫展的宠儿，很受青睐。在刘易斯·卡罗尔的童话《爱丽丝漫游奇境》中登场的柴郡猫，便是以英国短毛猫为原型创作的，英国短毛猫也因此名声大噪。目前英国短毛猫已经成为英国第3大纯种猫族群，并且在世界上也广受欢迎。英国短毛猫叫声甜美，喜欢亲近主人，为一种可爱和理想的家庭宠物",
    tags: ["温顺", "好养", "适合新手"],
    traits: ["性格温和友善", "适应能力强", "不太粘人", "叫声较少"],
    tips: ["定期梳理被毛", "控制饮食避免肥胖", "每年定期体检", "保持适度运动"],
  },
  {
    id: 2,
    name: "美国短毛猫",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    shortDesc: "“温和且适应性强”",
    description:
      "美国短毛猫原产于美国。关于其起源有两种说法，一部分人认为该猫是美洲大陆土著猫，经长期选育而成，另一部分人认为它是17世纪从欧洲随移民带入美国后，经改良而育成。 美国短毛猫体格强壮，肌肉发达，脸呈圆形，眼睛大小适中；脊背平直，胸部浑圆；背毛柔而厚，毛色与波斯猫相似，并以银色条纹为珍贵， 雄性体型比雌性稍大。美国短毛猫又称短毛家猫。 美国短毛猫性格温顺，与人亲近，聪明，喜欢冒险，遗传了其祖先的健壮、勇敢和脾气好，性格温和，不会因为环境或心情的改变而改变。其充满耐性，和蔼可亲，不会乱发脾气，不喜欢乱吵乱叫，适合有小孩子的家庭饲养。另外，美国短毛猫抵抗力较强。美国短毛猫的体力很好，因此，家中需要有足够的空间让其尽情玩耍。 美国短毛猫每窝产4只仔猫，寿命可达15-20年。 美国短毛猫是美国的代表猫种。最初其并不是作为宠物，而是作为消灭老鼠和蛇的实用性动物被人们饲养。成为宠物后，美国短毛猫的人气也渐渐高涨。1906年美国短毛猫以“短毛家猫”的名字正式登记在册。1966年更名为美国短毛猫。 ",
    tags: ["活泼", "亲人", "耐心"],
    traits: ["性格活泼开朗", "亲近人类", "智商较高", "适应能力强"],
    tips: ["需要充足的玩耍时间", "注意营养均衡", "定期驱虫", "保持环境清洁"],
  },
  {
    id: 3,
    name: "波斯猫",
    image: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?w=800",
    shortDesc: "“优雅的长毛猫”",
    description:
      "波斯猫（学名：Felis catus）又称长毛猫，是猫科猫属的哺乳动物 。其体重为3.5-5千克，体长40-50厘米，尾长25-30厘米，肩高30厘米，体型矮壮；头圆宽，脸颊丰满；耳小圆尖；鼻短，眼大圆，多为黄色，眼色因毛色而异；四肢粗短，脚爪大，尾短且毛蓬松。波斯猫被毛密集光泽，包括柔软蓬松的底毛和稍粗长的长毛，毛色及毛型多样。波斯猫原产于伊朗，自19世纪起在英国培育，目前分布于全球。其捕鼠能力不如普通家猫，主要依赖家庭投食，饮食包括动物内脏、鱼、虾和杂粮。波斯猫不耐热，因被毛厚而易中暑，性格喜静，不善运动 。公猫性成熟时间为10-14月龄，母猫为7-12月龄，属季节性发情动物，通常9月开始发情，周期14天，持续2-4天；妊娠期约63天，每窝产仔3-5只 。波斯猫是最常饲养的猫种之一，有“猫中王子”“猫中王妃”之称，观赏价值高。其性情温和，举止优雅，恋家、乐观，对人友好，适合作为伴侣动物。",
    tags: ["优雅", "安静", "需要护理"],
    traits: ["性格安静优雅", "喜欢安静环境", "较为依赖主人", "不太运动"],
    tips: ["每日梳理毛发", "定期清洁面部", "保持室内适宜温度", "注意眼部护理"],
  },
  {
    id: 4,
    name: "暹罗猫",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    shortDesc: "“聪明活泼的伴侣”",
    description:
      "暹（xiān）罗猫是世界著名的短毛猫，也是短毛猫的代表品种。种族原产于暹罗（今泰国），故名暹罗猫。在200多年前，这种珍贵的猫仅在泰国的皇宫和大寺院中饲养，是足不出户的贵族。暹罗猫能够较好适应主人当地的气候，且性格刚烈好动，机智灵活，好奇心特强，善解人意。",
    tags: ["聪明", "粘人", "话多"],
    traits: ["性格外向活泼", "非常粘人", "叫声多样", "智商很高"],
    tips: ["需要大量互动", "适合有时间陪伴的家庭", "注意保暖", "需要智力游戏"],
  },
  {
    id: 5,
    name: "缅因猫",
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=800",
    shortDesc: "“温和巨人”",
    description:
      "缅因猫是美国最大、最古老的猫种 。缅因猫体型较大，被毛厚密 ；头较小巧，面部较方，耳朵大而直，耳根较阔，眼睛较大，有绿色、金黄色和铜色；鼻子中长，形似狮子鼻；四肢又粗又圆，被毛细密的爪子强壮有力；尾巴根部粗壮，末端被毛较长，尖削 。缅因猫名字中的“coon”在英语中意为浣熊，或许人们给它取这个名字就是因为它那毛发浓密的尾巴很像小浣熊的尾巴 。缅因猫性情温顺，对人亲近，喜欢睡在偏僻、古怪的地方 ；喜欢独处 ，能忍受恶劣的天气，捕鼠技巧精湛 。缅因猫能发出像小鸟般唧唧的轻叫声，非常动听 。缅因猫较早熟，长到约5个月就开始发情，7个月可交配产仔。缅因猫寿命一般为16～18年，有的甚至更长 [15]。缅因猫和人友好相处，是良好的宠物 。缅因猫体格较大，因此还被人们亲切地称为“温柔的巨人” ，亦可作为看门猫 。缅因猫早在19世纪中期的农业展览会上就作为捕鼠能手参展，并迅速被认可为一个独立的品种。",
    tags: ["大型", "温柔", "长毛"],
    traits: ["体型巨大", "性格温和", "适应能力强", "喜欢玩水"],
    tips: ["需要大空间", "定期梳理毛发", "提供攀爬设施", "注意关节健康"],
  },
  {
    id: 6,
    name: "苏格兰折耳猫",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
    shortDesc: "“耳朵向下的猫咪”",
    description:
      "苏格兰折耳猫因其独特的向前折叠的耳朵而闻名，性格温顺亲人苏格兰猫原产于英国。苏格兰猫留恋家庭，依赖主人，性格平静、懒动，但遇到猎物时会迅速出击， 抗病力强，耐寒。苏格兰猫每窝平均产3-4仔，但其后代并不一定都是塌耳，幼猫出生时，两耳直立状，4周之后，耳才向前垂下，随着年龄的增长，耳朵越垂越低。",
    tags: ["折耳", "温顺", "特殊护理"],
    traits: ["耳朵独特", "性格安静", "亲近人类", "适应性强"],
    tips: ["注意骨骼发育", "定期体检", "避免过度运动", "合理搭配营养"],
  },
  {
    id: 7,
    name: "俄罗斯蓝猫",
    image: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=800",
    shortDesc: "“拥有独特的绿眼睛”",
    description:
      "俄罗斯蓝猫（Russian Blue），历史上曾被称作阿契安吉蓝猫，曾有过三种不同的名字。最初是阿契安吉蓝猫，直到20世纪40年代才有俄罗斯蓝猫的名字，另外有段时间它则叫作马耳他猫。证据显示，这种猫确实原产于俄罗斯，因为已在俄罗斯寒带地区发现了同种的猫。俄罗斯蓝猫体型细长，大而直立的尖耳朵，脚掌小而圆，走路像是用脚尖在走。身上披着银蓝色光泽的短被毛，配上修长苗条的体型和轻盈的步态，尽显一派猫中的贵族风度。",
    tags: ["优雅", "安静", "低过敏"],
    traits: ["性格矜持", "对主人忠诚", "适合过敏人士", "不太喜欢陌生人"],
    tips: ["保持安静环境", "定期梳理", "提供独处空间", "适量运动"],
  },
  {
    id: 8,
    name: "布偶猫",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800",
    shortDesc: "“温顺如布偶”",
    description:
      "布偶猫（英文名：Ragdoll Cat），是一种体格较大的宠物猫， 体长可达1米（包含尾巴），雄性体重约为6.8-9.0千克，雌性体重约为4.5-6.8千克。 面部较宽，双颊线条平顺，耳朵中等大小，眼睛蓝色。 有六种毛色，分别为海豹色、蓝色、巧克力色、丁香色、浅红色和白色根据毛色和图案分布的不同，国际猫协会（The International Cat Association，TICA）将布偶猫分为重点色、手套色和双色三种类型。布偶猫因其温顺的性格和被抱起时放松的姿态而得名，如同柔软的布偶一般。 该品种由美国加利福尼亚州的育种专家安·贝克（Ann Baker）在20世纪 60年代培育出来。 1993年，猫爱好者协会（CFA）注册了布偶猫， 2000年2月布偶猫获得了CFA的冠军。 布偶猫生长速度缓慢，2岁时毛色趋于稳定，3-4岁时身体发育完全。 布偶猫是一种可爱、安静、温和大方的猫， 对儿童宽容，喜欢玩耍，它们友善聪明，乐于和人类互动，是较为理想的室内伴侣。",
    tags: ["大型", "粘人", "长毛"],
    traits: ["性格超温顺", "非常粘人", "适合家庭", "智商较高"],
    tips: ["每日梳理毛发", "保持运动量", "注意饮食均衡", "定期健康检查"],
  },
]);

// 关键词搜索
const filteredCats = computed(() => {
  if (!searchQuery.value) return cats.value;
  const query = searchQuery.value.toLowerCase();
  return cats.value.filter(
    (cat) =>
      cat.name.toLowerCase().includes(query) ||
      cat.tags.some((tag) => tag.toLowerCase().includes(query))
  );
});

// 显示详情
const showDetail = (cat) => {
  selectedCat.value = cat;
};

// 模拟加载更多数据
const loadMorePets = async () => {
  if (loading.value) return;
  loading.value = true;

  // 模拟API请求延迟 -- 调用接口获取宠物数据
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newCats = [
    {
      id: 8,
      name: "布偶猫",
      image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800",
      shortDesc: "“温顺如布偶”",
      description:
        "布偶猫（英文名：Ragdoll Cat），是一种体格较大的宠物猫， 体长可达1米（包含尾巴），雄性体重约为6.8-9.0千克，雌性体重约为4.5-6.8千克。 面部较宽，双颊线条平顺，耳朵中等大小，眼睛蓝色。 有六种毛色，分别为海豹色、蓝色、巧克力色、丁香色、浅红色和白色根据毛色和图案分布的不同，国际猫协会（The International Cat Association，TICA）将布偶猫分为重点色、手套色和双色三种类型。布偶猫因其温顺的性格和被抱起时放松的姿态而得名，如同柔软的布偶一般。 该品种由美国加利福尼亚州的育种专家安·贝克（Ann Baker）在20世纪 60年代培育出来。 1993年，猫爱好者协会（CFA）注册了布偶猫， 2000年2月布偶猫获得了CFA的冠军。 布偶猫生长速度缓慢，2岁时毛色趋于稳定，3-4岁时身体发育完全。 布偶猫是一种可爱、安静、温和大方的猫， 对儿童宽容，喜欢玩耍，它们友善聪明，乐于和人类互动，是较为理想的室内伴侣。",
      tags: ["大型", "粘人", "长毛"],
      traits: ["性格超温顺", "非常粘人", "适合家庭", "智商较高"],
      tips: ["每日梳理毛发", "保持运动量", "注意饮食均衡", "定期健康检查"],
    },
  ];

  cats.value.push(...newCats);
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
  <div class="wiki-cats">
    <!-- 搜索框 -->
    <div class="wiki-search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        v-model="searchQuery"
        class="wiki-search__input"
        placeholder="搜些什么吧 ε٩(๑> ₃ <)۶з"
      />
    </div>

    <!-- wiki 表格 -->
    <div class="wiki-grid">
      <article
        v-for="cat in filteredCats"
        :key="cat.id"
        class="wiki-card"
        @click="showDetail(cat)"
      >
        <div class="wiki-card__image">
          <img :src="cat.image" :alt="cat.name" />
        </div>
        <div class="wiki-card__content">
          <h3 class="wiki-card__title">{{ cat.name }}</h3>
          <p class="wiki-card__description">{{ cat.shortDesc }}</p>
          <div class="wiki-card__tags">
            <span v-for="tag in cat.tags" :key="tag" class="wiki-card__tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- 加载更多指示器 -->
    <div v-if="loading" class="loading-indicator">
      <div class="loader"></div>
      <span>猫咪正在赶来的路上...</span>
    </div>

    <!-- 详情弹窗 -->
    <teleport to="body">
      <div v-if="selectedCat" class="wiki-modal">
        <div class="wiki-modal__backdrop" @click="selectedCat = null"></div>
        <div class="wiki-modal__content">
          <button class="wiki-modal__close" @click="selectedCat = null">
            <i class="fas fa-times"></i>
          </button>

          <div class="wiki-modal__header">
            <img :src="selectedCat.image" :alt="selectedCat.name" />
            <h2>{{ selectedCat.name }}</h2>
          </div>

          <div class="wiki-modal__body">
            <div class="wiki-modal__section">
              <h3>宠物信息</h3>
              <p>{{ selectedCat.description }}</p>
            </div>

            <div class="wiki-modal__section">
              <h3>性格特点</h3>
              <ul>
                <li v-for="trait in selectedCat.traits" :key="trait">
                  {{ trait }}
                </li>
              </ul>
            </div>

            <div class="wiki-modal__section">
              <h3>养护建议</h3>
              <ul>
                <li v-for="tip in selectedCat.tips" :key="tip">
                  {{ tip }}
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
.wiki-cats {
  padding: 2rem;
  padding-top: 0;
  box-sizing: border-box;
}

// 搜索框
.wiki-search {
  position: relative;
  margin-bottom: 2rem;

  &__input {
    width: 94%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 14px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--deongaree);
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

.wiki-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

// 卡片样式
.wiki-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

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
    color: #64748b;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  &__tags {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__tag {
    padding: 0.25rem 0.75rem;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 9999px;
    font-size: 0.875rem;
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
