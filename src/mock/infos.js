const infos = [
  {
    id: 1,
    imageUrl:
      "http://catid.net//upload_files/cat_news_/118/41_20230407200416_a7iiq.jpg",
    petName: "布偶猫",
    miniDes: "“温顺如同布偶”",
    details: {
      description: "",
    },
  },
  {
    id: 2,
    imageUrl:
      "http://catid.net//upload_files/cat_news_/119/41_20230330090353_r8p35.jpg",
    petName: "内伯龙根",
    miniDes: "“雾中的生物”",
    details: {
      description:
        "尼伯龙根猫也被称为长毛俄罗斯蓝猫，是一个相对较新的品种，也是现存最稀有的猫品种之。如果您有幸将尼伯龙根的猫带入您的家中，您可以期待一个友好、悠闲的伴侣，拥有令人惊叹的美貌，以匹配出色的个性。这只猫的银色面漆和纯蓝色底毛赋予了令人钦佩的神奇外观。这只小猫是丝般柔软的，虽然它在技术上是一个长毛品种，但外套实际上是中等长度的;比短毛猫长，但不如长毛猫（即波斯猫）长。尼伯龙根猫非常深情，有很多爱可以与家人分享。他们喜欢蜷缩起来小睡和看电视，如果有机会，他们会在睡前拥抱她最喜欢的人。尼伯龙根猫既俏皮又温柔。这个品种非常聪明，很容易被教导如何玩有趣的游戏，比如取物。这些小猫可以学习如何用皮带行走，这样可以安全地探索户外世界并提供一些急需的锻炼。虽然有些品种需要人们的持续关注，但尼伯龙根猫只要有一点独处时间就可以了。这并不意味着你可以让你的猫连续几天无人看管，但这确实意味着你的小猫在你外出工作时可以自娱自乐。当然，这些猫与孩子和其他宠物相处得很好，只要社交发生在他们的家庭群体中，它们就会喜欢随时社交的机会。说到社交，从很小的时候就向尼伯龙根猫介绍各种情况、声音和人是非常重要的。这些小猫容易紧张，需要比普通猫更多的社交。",
    },
  },
  {
    id: 3,
    imageUrl:
      "http://catid.net//upload_files/cat_news_/110/41_20230304220330_yohm0.jpg",
    petName: "孟加拉猫",
    miniDes: "“拥有玫瑰花结的家猫”",
    details: {
      description: "",
    },
  },
];

export const catInfos = [
  {
    id: 1,
    name: "英国短毛猫",
    breed: "英短",
    images: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
      "https://images.unsplash.com/photo-1520315342629-6ea920342047?w=800"
    ],
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
    description:
      "英国短毛猫性格温和友善，适合家庭饲养。圆圆的脸和大眼睛是其标志性特征。被毛短而密，易于护理，是受欢迎的家庭宠物。",
    tags: ["温顺", "友好", "易护理"],
    stats: {
      size: 60,
      activity: 50,
      friendly: 90,
    },
    livingRange: "室内为主，不喜远行",
    bodySize: "中型",
    shedding: "中等",
    intelligence: "中等",
    lifespan: "12-15年",
    origin: "英国",
    geneticProfile: {
      dominantGenes: ["蓝色被毛基因", "圆形脸部轮廓基因", "肥胖倾向基因"],
      recessiveGenes: ["长毛基因", "折耳基因", "色点基因"],
      healthRisks: ["心肌病风险中等", "肾脏疾病风险低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "古罗马时期", event: "由罗马军团携带到英国岛屿" },
      { year: "中世纪", event: "在英国被用作老鼠猎手，负责守卫粮仓" },
      { year: "1800年代", event: "开始被选育为专门品种" },
      { year: "1871年", event: "在伦敦水晶宫举办的猫展上首次亮相" },
      { year: "1980年代", event: "成为全球最受欢迎的猫品种之一" },
    ],
    globalDistribution: {
      regions: [
        { name: "欧洲", percentage: 45 },
        { name: "北美", percentage: 30 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 7 },
        { name: "其他", percentage: 3 },
      ],
      popularityRank: 3,
    },
    personalityTraits: [
      "性格温和平静，不易激动",
      "独立性强，不需要过多关注",
      "对家人友善亲近，但不粘人",
      "与小孩和其他宠物相处融洽",
      "比较安静，不经常发出声音"
    ],
    careAdvice: [
      "适量喂食，监控体重避免肥胖",
      "每周刷毛2-3次，减少掉毛和毛球症",
      "定期检查和清洁耳朵",
      "提供适当玩具和攀爬空间",
      "保持猫砂盆清洁，定期更换"
    ],
  },
  {
    id: 2,
    name: "美国短毛猫",
    breed: "美短",
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      "https://images.unsplash.com/photo-1549221987-25a490f65d34?w=800",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800"
    ],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    description:
      "美国短毛猫温和且适应性强，是理想的家庭宠物。体格健壮，被毛短密，性格友善，与人和其他宠物相处融洽。寿命长，护理简单。",
    tags: ["活泼", "亲人", "耐心"],
    stats: {
      size: 65,
      activity: 55,
      friendly: 85,
    },
    livingRange: "室内室外均可",
    bodySize: "中型",
    shedding: "低",
    intelligence: "高",
    lifespan: "15-20年",
    origin: "美国",
    geneticProfile: {
      dominantGenes: ["银虎斑图案基因", "肌肉发达基因", "强健骨骼基因"],
      recessiveGenes: ["白色斑点基因", "短尾基因"],
      healthRisks: ["肥胖风险中等", "牙齿问题风险低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1600年代", event: "欧洲移民将家猫带到北美" },
      { year: "1800年代", event: "开始在农场用作捕鼠能手" },
      { year: "1900年", event: "开始参加猫展并被正式认可为品种" },
      { year: "1950年代", event: "品种标准确立" },
      { year: "1965年", event: "美国猫协会(CFA)正式承认该品种" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 55 },
        { name: "欧洲", percentage: 20 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 4,
    },
    personalityTraits: [
      "好奇心强，喜欢探索环境",
      "性格温顺友好，适应能力强",
      "聪明机智，善于学习新技能",
      "对待陌生人比较友好开放",
      "猎食本能强，喜欢追逐玩具"
    ],
    careAdvice: [
      "提供均衡饮食，注意热量控制",
      "每周梳理被毛1-2次",
      "提供多样化玩具和游戏",
      "定期检查牙齿健康",
      "室内饲养更安全，延长寿命"
    ],
  },
  {
    id: 3,
    name: "波斯猫",
    breed: "波斯",
    images: [
      "https://images.unsplash.com/photo-1616089966833-d61352757708?w=800",
      "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=800",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800"
    ],
    image: "https://images.unsplash.com/photo-1616089966833-d61352757708?w=800",
    description:
      "波斯猫是长毛猫的代表，性格安静优雅。扁平的脸和长而密的被毛是其特色。性格温和，活动量低，适合室内饲养，需要定期梳理毛发。",
    tags: ["优雅", "安静", "长毛"],
    stats: {
      size: 55,
      activity: 30,
      friendly: 70,
    },
    livingRange: "仅室内",
    bodySize: "中型至大型",
    shedding: "高",
    intelligence: "中等",
    lifespan: "10-15年",
    origin: "伊朗波斯",
    geneticProfile: {
      dominantGenes: ["长毛基因", "扁脸基因", "大眼睛基因"],
      recessiveGenes: ["多色基因", "绿眼睛基因"],
      healthRisks: ["呼吸道问题风险高", "泪腺问题风险高", "多囊肾病风险中等"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      {
        year: "公元前1600年",
        event: "在波斯帝国(今伊朗)出现第一批类似波斯猫的猫",
      },
      { year: "1500年代", event: "意大利探险家将波斯猫带入欧洲" },
      { year: "1800年代晚期", event: "在英国猫展上大受欢迎" },
      { year: "1900年代初", event: "品种标准开始偏好扁平脸型" },
      { year: "1950年代", event: "成为美国最受欢迎的纯种猫" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 35 },
        { name: "欧洲", percentage: 30 },
        { name: "亚洲", percentage: 25 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 2,
    },
    personalityTraits: [
      "优雅高贵，性格安静",
      "不太活跃，喜欢安静环境",
      "亲近主人但独立性强",
      "声音柔美，不经常叫唤",
      "适应能力强，但讨厌变化"
    ],
    careAdvice: [
      "每日梳理长毛，避免打结",
      "定期清洁眼睛和鼻褶皱",
      "控制饮食量，避免肥胖",
      "保持环境温度适中，避免过热",
      "定期专业修剪毛发"
    ],
  },
  {
    id: 4,
    name: "暹罗猫",
    breed: "暹罗",
    images: [
      "https://images.unsplash.com/photo-1576120634744-ee3e08b3be0d?w=800",
      "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=800",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800"
    ],
    image: "https://images.unsplash.com/photo-1576120634744-ee3e08b3be0d?w=800",
    description:
      "暹罗猫体型修长优雅，面部特征明显。性格活泼，声音洪亮，非常粘人。极其聪明，喜欢互动和玩耍，需要大量关注和陪伴。",
    tags: ["聪明", "活泼", "粘人"],
    stats: {
      size: 50,
      activity: 85,
      friendly: 80,
    },
    livingRange: "适应性强，室内外均可",
    bodySize: "中等偏瘦",
    shedding: "低",
    intelligence: "非常高",
    lifespan: "12-20年",
    origin: "泰国",
    geneticProfile: {
      dominantGenes: ["色点基因", "蓝眼睛基因", "瘦长体型基因"],
      recessiveGenes: ["长毛基因", "短尾基因"],
      healthRisks: ["肝淀粉样变性风险高", "口腔疾病风险中等"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "14世纪", event: "在泰国古籍中首次记载" },
      { year: "1800年代", event: "作为礼物赠送给欧洲皇室成员" },
      { year: "1878年", event: "英国驻暹罗(泰国)领事将暹罗猫带回英国" },
      { year: "1930年代", event: "开始在美国广泛饲养" },
      { year: "1950-1960年代", event: "经过选择性繁殖，形成现代暹罗猫体型" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 40 },
        { name: "欧洲", percentage: 35 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 9,
    },
    personalityTraits: [
      "极其聪明，学习能力强",
      "非常活跃，精力充沛",
      "社交性强，需要大量关注",
      "声音洪亮，爱'说话'",
      "对主人极其依恋，形成深厚感情"
    ],
    careAdvice: [
      "提供充分游戏和互动时间",
      "准备智力玩具和爬架",
      "注意口腔健康，预防牙龈疾病",
      "饮食控制，保持健康体重",
      "考虑养两只，防止孤独"
    ],
  },
  {
    id: 5,
    name: "缅因猫",
    breed: "缅因",
    images: [
      "https://images.unsplash.com/photo-1596854407944-02c825635ef5?w=800",
      "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=800",
      "https://images.unsplash.com/photo-1598935888738-cd2a3a5b5e58?w=800"
    ],
    image: "https://images.unsplash.com/photo-1596854407944-02c825635ef5?w=800",
    description:
      "缅因猫是体型最大的家猫品种之一，性格温和友善。被毛长而蓬松，尾巴粗大丰满，是猫中的'gentle giants'。",
    tags: ["大型", "温和", "长毛"],
    stats: {
      size: 90,
      activity: 60,
      friendly: 85,
    },
    livingRange: "室内为主，喜欢有攀爬空间的环境",
    bodySize: "超大型",
    shedding: "高",
    intelligence: "高",
    lifespan: "12-15年",
    origin: "美国缅因州",
    geneticProfile: {
      dominantGenes: ["大型体格基因", "长毛基因", "浓密被毛基因"],
      recessiveGenes: ["六趾基因", "色点基因"],
      healthRisks: ["肥厚性心肌病风险中等", "髋关节发育不良风险低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1800年代初", event: "在美国缅因州农场出现作为工作猫" },
      { year: "1861年", event: "在纽约的猫展上首次被介绍给公众" },
      { year: "1900年代初", event: "由于汽车和机械化农业的发展，数量减少" },
      { year: "1950年代", event: "爱好者开始有计划地繁育保护" },
      { year: "1985年", event: "被缅因州指定为官方州宠" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 55 },
        { name: "欧洲", percentage: 25 },
        { name: "亚洲", percentage: 12 },
        { name: "澳洲", percentage: 6 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 6,
    },
    personalityTraits: [
      "性格温和友善，像'gentle giants'",
      "聪明好奇，爱探索环境",
      "非常亲人但不过分粘人",
      "猎食本能强，喜欢玩耍",
      "声音柔和，不常大声吵闹"
    ],
    careAdvice: [
      "定期梳理长毛，尤其是换毛季",
      "提供大型猫爬架和足够活动空间",
      "高质量饮食，满足大型猫需求",
      "定期检查关节健康",
      "提供坚固的猫抓板和玩具"
    ],
  },
  {
    id: 6,
    name: "苏格兰折耳猫",
    breed: "折耳",
    images: [
      "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?w=800",
      "https://images.unsplash.com/photo-1596706696066-97cdcdb7c4e9?w=800",
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800"
    ],
    image: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?w=800",
    description:
      "苏格兰折耳猫因其独特的向前折叠的耳朵而闻名。性格温和且适应性强，喜欢与家人相处但不会过分粘人。声音轻柔，活动量适中。",
    tags: ["折耳", "温顺", "圆脸"],
    stats: {
      size: 55,
      activity: 50,
      friendly: 80,
    },
    livingRange: "室内饲养",
    bodySize: "中型",
    shedding: "中等",
    intelligence: "良好",
    lifespan: "11-14年",
    origin: "苏格兰",
    geneticProfile: {
      dominantGenes: ["折耳基因(Fd)", "圆脸基因", "短毛基因"],
      recessiveGenes: ["长毛基因", "多色基因"],
      healthRisks: ["骨骼发育异常风险高", "关节问题风险高", "听力问题风险低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      {
        year: "1961年",
        event: "在苏格兰的一个农场发现第一只自然变异的折耳猫Susie",
      },
      { year: "1970年代", event: "开始在美国有计划地繁育" },
      { year: "1974年", event: "被猫协会正式认可为品种" },
      { year: "1990年代", event: "在全球范围内流行起来" },
      { year: "2000年代", event: "因遗传健康问题引发繁育争议" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 35 },
        { name: "欧洲", percentage: 30 },
        { name: "亚洲", percentage: 25 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 5,
    },
    personalityTraits: [
      "性格温柔甜美，极少攻击性",
      "适应性强，适合多种家庭环境",
      "喜欢与主人互动但不粘人",
      "好奇心强，喜欢观察周围环境",
      "声音轻柔，较为安静"
    ],
    careAdvice: [
      "定期检查耳部健康状况",
      "监控关节和骨骼健康",
      "合理控制饮食和体重",
      "提供舒适的休息场所",
      "中等强度的互动和游戏"
    ],
  },
  {
    id: 7,
    name: "俄罗斯蓝猫",
    breed: "俄罗斯蓝",
    images: [
      "https://images.unsplash.com/photo-1562009910-924d68796602?w=800",
      "https://images.unsplash.com/photo-1585072857532-3c93d388d38f?w=800",
      "https://images.unsplash.com/photo-1629551531237-b900e6a35ad5?w=800"
    ],
    image: "https://images.unsplash.com/photo-1562009910-924d68796602?w=800",
    description:
      "俄罗斯蓝猫拥有银蓝色的短密被毛和翡翠绿的眼睛。性格安静优雅，温和害羞但忠诚。低过敏性，适合对猫毛过敏的人。",
    tags: ["安静", "优雅", "低过敏"],
    stats: {
      size: 50,
      activity: 60,
      friendly: 70,
    },
    livingRange: "室内饲养",
    bodySize: "中型",
    shedding: "低",
    intelligence: "较高",
    lifespan: "15-20年",
    origin: "俄罗斯阿尔汉格尔斯克",
    geneticProfile: {
      dominantGenes: ["蓝色被毛基因", "绿眼睛基因", "双层被毛基因"],
      recessiveGenes: ["白色斑点基因", "长毛基因"],
      healthRisks: ["泌尿系统疾病风险低", "遗传性疾病风险极低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1800年代", event: "在俄罗斯北部港口城市阿尔汉格尔斯克首次出现" },
      { year: "1900年", event: "英国水手将其带到英国" },
      { year: "1912年", event: "在伦敦水晶宫猫展中正式亮相" },
      { year: "二战期间", event: "数量急剧下降，几乎灭绝" },
      { year: "1960年代", event: "通过与暹罗猫杂交重建品种" },
    ],
    globalDistribution: {
      regions: [
        { name: "欧洲", percentage: 45 },
        { name: "北美", percentage: 30 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 12,
    },
    personalityTraits: [
      "安静优雅，不喜喧闹",
      "对主人忠诚，形成深厚感情",
      "害羞谨慎，对陌生人保持距离",
      "聪明敏锐，善于观察",
      "独立性强，自我管理能力好"
    ],
    careAdvice: [
      "提供安静、稳定的生活环境",
      "轻柔梳理短毛，减少掉毛",
      "定期检查牙齿健康",
      "提供高蛋白质饮食",
      "提供安全的躲藏和观察空间"
    ],
  },
  {
    id: 8,
    name: "孟买猫",
    breed: "孟买",
    images: [
      "https://images.unsplash.com/photo-1555876484-a71a693b161b?w=800",
      "https://images.unsplash.com/photo-1542652735873-fb2825bac6e2?w=800",
      "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800"
    ],
    image: "https://images.unsplash.com/photo-1555876484-a71a693b161b?w=800",
    description:
      "孟买猫是一种全黑色的中型猫，被称为'客厅里的小黑豹'。性格活泼开朗，与人亲近，喜欢玩耍和互动。被毛短而光亮，护理简单。",
    tags: ["黑色", "活泼", "粘人"],
    stats: {
      size: 55,
      activity: 75,
      friendly: 90,
    },
    livingRange: "室内为主",
    bodySize: "中型",
    shedding: "低",
    intelligence: "高",
    lifespan: "12-16年",
    origin: "美国",
    geneticProfile: {
      dominantGenes: ["黑色被毛基因", "短毛基因", "肌肉发达基因"],
      recessiveGenes: ["白色斑点基因", "长毛基因"],
      healthRisks: ["心肌病风险低", "血栓形成风险低"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1950年代", event: "在美国通过将缅甸猫与美国短毛猫杂交培育出" },
      { year: "1958年", event: "品种命名为孟买猫，取自印度黑豹" },
      { year: "1970年", event: "被猫协会正式认可为品种" },
      { year: "1980年代", event: "在美国和欧洲逐渐流行" },
      { year: "2000年代", event: "因其友好性格和黑豹外观在全球受到喜爱" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 50 },
        { name: "欧洲", percentage: 30 },
        { name: "亚洲", percentage: 10 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 18,
    },
    personalityTraits: [
      "活泼好动，精力充沛",
      "极度亲人，喜欢依偎在主人身边",
      "智商高，容易学习新技能",
      "好奇心强，喜欢探索环境",
      "适应性强，易于融入家庭"
    ],
    careAdvice: [
      "提供充分的玩耍和互动时间",
      "偶尔用湿布擦拭被毛增加光泽",
      "控制热量摄入，避免肥胖",
      "提供丰富的玩具和攀爬空间",
      "定期检查心脏健康"
    ],
  },
];

export const dogInfos = [
  {
    id: 1,
    name: "金毛寻回犬",
    breed: "金毛",
    images: [
      "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800",
      "https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?w=800",
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=800"
    ],
    image: "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800",
    avatar: "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800",
    shortDesc: '"最受欢迎的友善家庭犬"',
    tags: ["友善", "聪明", "忠诚"],
    stats: {
      size: 80,
      exercise: 85,
      friendly: 95,
    },
    livingRange: "需要院子的住宅",
    bodySize: "大型",
    shedding: "高",
    intelligence: "第4名 (优秀工作犬等级)",
    lifespan: "10-12年",
    trainability: "易于训练",
    origin: "苏格兰",
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
    geneticProfile: {
      dominantGenes: ["金黄色被毛基因", "友善性格基因", "狩猎本能基因"],
      recessiveGenes: ["白色被毛基因", "黑色被毛基因"],
      healthRisks: ["髋关节发育不良风险中等", "心脏问题风险低", "癌症风险中等"],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1800年代初", event: "在苏格兰高地被培育，用于狩猎水鸟" },
      { year: "1911年", event: "英国养犬俱乐部正式认可金毛犬为独立品种" },
      { year: "1920年代", event: "传入美国并迅速流行" },
      { year: "1950年代", event: "开始被训练为导盲犬和搜救犬" },
      { year: "2000年代", event: "连续多年成为美国最受欢迎的家庭犬之一" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 40 },
        { name: "欧洲", percentage: 35 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 3,
    },
  },
  {
    id: 2,
    name: "拉布拉多犬",
    breed: "拉布拉多",
    images: [
      "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?w=800"
    ],
    image: "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
    avatar: "https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800",
    shortDesc: '"工作犬中的全能选手"',
    tags: ["温顺", "聪明", "活泼"],
    stats: {
      size: 80,
      exercise: 90,
      friendly: 90,
    },
    livingRange: "需要院子的住宅",
    bodySize: "大型",
    shedding: "高",
    intelligence: "第7名 (优秀工作犬等级)",
    lifespan: "10-14年",
    trainability: "易于训练",
    origin: "纽芬兰岛",
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
    geneticProfile: {
      dominantGenes: ["水猎能力基因", "友善性格基因", "耐寒基因"],
      recessiveGenes: ["银色被毛基因", "瘦长体型基因"],
      healthRisks: [
        "髋关节发育不良风险中等",
        "肘关节发育不良风险中等",
        "眼部疾病风险低",
      ],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1700年代", event: "在纽芬兰岛被渔民培育，用于捕鱼和水中救援" },
      { year: "1800年代中期", event: "英国贵族发现并带回英国进一步培育" },
      { year: "1903年", event: "英国养犬俱乐部正式认可为独立品种" },
      { year: "1930-40年代", event: "成为受欢迎的家庭宠物" },
      { year: "1991年", event: "成为美国最受欢迎的犬种，至今保持领先地位" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 45 },
        { name: "欧洲", percentage: 30 },
        { name: "亚洲", percentage: 15 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 1,
    },
  },
  {
    id: 3,
    name: "边境牧羊犬",
    breed: "边牧",
    images: [
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800",
      "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=800"
    ],
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
    avatar: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800",
    shortDesc: '"世界上最聪明的犬种"',

    tags: ["聪明", "敏捷", "工作型"],
    stats: {
      size: 65,
      exercise: 95,
      friendly: 75,
    },
    livingRange: "农场或有大院子的房子",
    bodySize: "中型",
    shedding: "中等至高",
    intelligence: "第1名 (最聪明犬种)",
    lifespan: "12-15年",
    trainability: "非常容易训练",
    origin: "英国苏格兰边境",
    personalityTraits: [
      "极其聪明，被公认为犬类中智商最高的品种",
      "精力充沛，需要大量运动和智力挑战",
      "工作欲望强，喜欢有任务的生活",
      "对主人忠诚，形成强烈的依恋关系",
      "警觉性高，有很好的保护意识",
    ],
    careAdvice: [
      "需要大量身体和心理刺激，每天至少2小时",
      "训练时需要多样化和挑战性",
      "需要明确的领导，否则会尝试控制局面",
      "早期社会化训练非常必要",
      "不适合久坐生活方式的家庭",
    ],
    description:
      "边境牧羊犬是世界上智商最高的犬种，精力充沛，工作热情强。需要大量身体和心理活动，不适合缺乏经验的主人和久坐生活方式。",
    geneticProfile: {
      dominantGenes: ["高智商基因", "牧羊本能基因", "敏捷性基因"],
      recessiveGenes: ["蓝眼睛基因", "双色毛基因"],
      healthRisks: [
        "髋关节发育不良风险中等",
        "胶原蛋白缺陷风险低",
        "癫痫风险中等",
      ],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "1700年代", event: "在英格兰和苏格兰边境地区发展为牧羊犬" },
      {
        year: "1893年",
        event: "Adam Telfer的Old Hemp被认为是现代边境牧羊犬的始祖",
      },
      { year: "1906年", event: "首次使用'边境牧羊犬'这一名称" },
      { year: "1976年", event: "美国养犬俱乐部正式认可该品种" },
      { year: "2000年代", event: "在敏捷性、服从性等犬类运动中占据主导地位" },
    ],
    globalDistribution: {
      regions: [
        { name: "英国", percentage: 35 },
        { name: "北美", percentage: 30 },
        { name: "欧洲其他地区", percentage: 20 },
        { name: "澳洲和新西兰", percentage: 10 },
        { name: "其他", percentage: 5 },
      ],
      popularityRank: 35,
    },
  },
  {
    id: 4,
    name: "哈士奇",
    breed: "哈士奇",
    images: [
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800",
      "https://images.unsplash.com/photo-1605796788248-22eeb48299d4?w=800"
    ],
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
    avatar: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
    shortDesc: '"雪橇三傻之一"',
    tags: ["活泼", "独立", "叛逆"],
    stats: {
      size: 70,
      exercise: 90,
      friendly: 80,
    },
    livingRange: "凉爽气候，需要大空间",
    bodySize: "中型至大型",
    shedding: "极高，季节性脱毛严重",
    intelligence: "第45名 (一般工作犬等级)",
    lifespan: "12-15年",
    trainability: "较难训练，需要耐心",
    origin: "西伯利亚",
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
    geneticProfile: {
      dominantGenes: ["极度耐寒基因", "狼系外表基因", "高能量代谢基因"],
      recessiveGenes: ["蓝眼睛基因", "异色瞳基因"],
      healthRisks: [
        "眼部疾病风险中等",
        "髋关节发育不良风险低",
        "自身免疫疾病风险低",
      ],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "公元前3000年", event: "在西伯利亚东北部由楚科奇人培育" },
      { year: "1908年", event: "首批哈士奇被带入阿拉斯加用于雪橇竞赛" },
      { year: "1925年", event: "在阿拉斯加诺姆白喉疫情中运送血清，成为英雄" },
      { year: "1930年代", event: "开始在美国作为宠物犬饲养" },
      { year: "1990年代", event: "在全球范围内作为宠物犬流行" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 45 },
        { name: "欧洲", percentage: 25 },
        { name: "亚洲", percentage: 20 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 14,
    },
  },
  {
    id: 5,
    name: "德国牧羊犬",
    breed: "德牧",
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800",
      "https://images.unsplash.com/photo-1566231546605-42f386ab6df2?w=800",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800"
    ],
    image: "https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800",
    avatar: "https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800",
    shortDesc: '"忠诚勇敢的工作犬"',
    tags: ["智能", "勇敢", "工作型"],
    stats: {
      size: 85,
      exercise: 85,
      friendly: 70,
    },
    livingRange: "需要院子，适合乡村生活",
    bodySize: "大型",
    shedding: "高",
    intelligence: "第3名 (优秀工作犬等级)",
    lifespan: "9-13年",
    trainability: "非常容易训练",
    origin: "德国",
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
    geneticProfile: {
      dominantGenes: ["高警觉性基因", "服从性基因", "保护性基因"],
      recessiveGenes: ["长毛基因", "独狼性格基因"],
      healthRisks: [
        "髋关节发育不良风险高",
        "脊椎疾病风险中等",
        "胃扭转风险中等",
      ],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      {
        year: "1899年",
        event: "马克斯·冯·斯特凡尼茨创建了第一个德国牧羊犬俱乐部",
      },
      { year: "一战期间", event: "大量用于军事目的，如信使和救援犬" },
      { year: "1920年代", event: "在美国开始流行" },
      { year: "二战期间", event: "再次大量用于军事和警察工作" },
      { year: "1950年代至今", event: "成为全球最受欢迎的工作犬之一" },
    ],
    globalDistribution: {
      regions: [
        { name: "北美", percentage: 30 },
        { name: "欧洲", percentage: 40 },
        { name: "亚洲", percentage: 20 },
        { name: "澳洲", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 2,
    },
  },
  {
    id: 6,
    name: "法国斗牛犬",
    breed: "法斗",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800",
      "https://images.unsplash.com/photo-1521907554502-7440e4702fc3?w=800"
    ],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    avatar: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    shortDesc: '"小型伴侣犬中的明星"',
    tags: ["友善", "活泼", "性格好"],
    stats: {
      size: 40,
      exercise: 50,
      friendly: 90,
    },
    livingRange: "公寓或小户型住宅",
    bodySize: "小型",
    shedding: "低",
    intelligence: "第58名 (一般工作犬等级)",
    lifespan: "10-12年",
    trainability: "中等难度",
    origin: "法国",
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
    breed: "柴犬",
    images: [
      "https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800",
      "https://images.unsplash.com/photo-1537151672256-6caf2e9f8c95?w=800",
      "https://images.unsplash.com/photo-1618359560315-eb7fbca64c1a?w=800"
    ],
    image: "https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800",
    avatar: "https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800",
    shortDesc: '"日本国宝级犬种"',
    tags: ["独立", "忠诚", "警觉"],
    stats: {
      size: 45,
      exercise: 70,
      friendly: 65,
    },
    livingRange: "适应性强，公寓或有院子均可",
    bodySize: "小型至中型",
    shedding: "中等至高",
    intelligence: "第93名",
    lifespan: "12-15年",
    trainability: "中等难度，较固执",
    origin: "日本",
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
      "柴犬是日本的国宝级犬种，体型小巧，性格独立忠诚。表情丰富，网络上著名的'狗头'表情包犬种。适合公寓生活，需要适当训练和社会化。",
    geneticProfile: {
      dominantGenes: ["独立性格基因", "警觉基因", "紧凑体型基因"],
      recessiveGenes: ["黑色被毛基因", "卷尾基因"],
      healthRisks: [
        "髋关节发育不良风险低",
        "过敏性皮肤病风险中等",
        "白内障风险低",
      ],
      dnaVisualUrl:
        "https://images.unsplash.com/photo-1603126857599-f935e2b25fa0?w=800",
    },
    history: [
      { year: "公元前300年", event: "在日本出现最早的类似柴犬的狩猎犬" },
      { year: "1928年", event: "日本开始有计划地保护纯种柴犬" },
      { year: "二战期间", event: "由于战争和狗瘟热，数量急剧下降" },
      { year: "1954年", event: "被日本政府指定为'天然纪念物'" },
      { year: "1990年代", event: "开始受到全球宠物爱好者的关注" },
    ],
    globalDistribution: {
      regions: [
        { name: "日本", percentage: 50 },
        { name: "北美", percentage: 25 },
        { name: "欧洲", percentage: 15 },
        { name: "亚洲其他地区", percentage: 8 },
        { name: "其他", percentage: 2 },
      ],
      popularityRank: 44,
    },
  },
  {
    id: 8,
    name: "萨摩耶犬",
    breed: "萨摩耶",
    images: [
      "https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800",
      "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=800",
      "https://images.unsplash.com/photo-1508440767412-59ce0b206bbc?w=800"
    ],
    image: "https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800",
    avatar: "https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800",
    shortDesc: '"微笑天使"',
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
];

export const knowledge = []

export default infos;
