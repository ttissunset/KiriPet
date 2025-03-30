<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 返回上一页
const goBack = () => {
  router.back();
};

// 宠物数据
const petData = ref({});

// 根据路由参数获取宠物数据
const fetchPetData = () => {
  const petType = route.params.type; // 'cats' 或 'dogs'
  const petId = Number(route.params.id);
  
  console.log(`正在获取宠物数据: 类型=${petType}, ID=${petId}`);
  
  // 这里应该使用API获取数据，现在模拟从本地数据
  if (petType === 'cats') {
    // 猫咪数据
    const catsData = [
      {
        id: 1,
        name: "英国短毛猫",
        age: "3岁",
        breed: "英短",
        avatar: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
        shortDesc: "英国短毛猫性格温和友善，适合家庭饲养。",
        gender: "公",
        weight: "5公斤",
        health: "健康",
        vaccinated: "已接种",
        neutered: "已绝育",
        tags: ["温顺", "友好", "易护理", "适合家庭"],
        personalityTraits: [
          "性格温和，对人友善",
          "适应能力强，容易与家人建立感情",
          "独立性强，但也喜欢陪伴",
          "不需要太多的运动量，适合室内饲养",
          "好奇心适中，不会过分调皮"
        ],
        careAdvice: [
          "定期梳理毛发，尤其是换季时期",
          "保持清洁的饮水和食物环境",
          "提供适当的猫爬架和玩具",
          "定期检查耳朵和牙齿健康",
          "保持规律的喂食和健康饮食"
        ],
        description: "英国短毛猫起源于古罗马时期，是英国本土猫种，在维多利亚时代得到正式认可。它们身体强壮，胸部宽阔，四肢粗短有力，被毛短而密，手感如丝绒般柔软。因其友善的性格和低需求的照顾要求，成为全球最受欢迎的猫品种之一。"
      },
      {
        id: 2,
        name: '美国短毛猫',
        age: '1-3岁',
        breed: '美短',
        avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        shortDesc: '"温和且适应性强"',
        gender: '母',
        weight: '3.5-6公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['活泼', '亲人', '耐心'],
        personalityTraits: [
          '性格活泼开朗，喜欢与人互动',
          '亲近人类，特别适合家庭饲养',
          '智商较高，容易训练',
          '适应能力强，能适应各种生活环境',
          '与其他宠物相处融洽'
        ],
        careAdvice: [
          '需要充足的玩耍时间和互动',
          '注意营养均衡，提供高质量猫粮',
          '定期驱虫和疫苗接种',
          '保持环境清洁，定期更换猫砂',
          '提供适当的爬高和运动空间'
        ],
        description: '美国短毛猫原产于美国。关于其起源有两种说法，一部分人认为该猫是美洲大陆土著猫，经长期选育而成，另一部分人认为它是17世纪从欧洲随移民带入美国后，经改良而育成。美国短毛猫体格强壮，肌肉发达，脸呈圆形，眼睛大小适中；脊背平直，胸部浑圆；背毛柔而厚，毛色与波斯猫相似，并以银色条纹为珍贵，雄性体型比雌性稍大。'
      }
    ];
    const foundCat = catsData.find(cat => cat.id === petId);
    if (foundCat) {
      petData.value = foundCat;
      console.log('成功获取猫咪数据:', foundCat.name);
    } else {
      console.error(`未找到ID为${petId}的猫咪数据`);
      // 设置默认数据或错误信息
      petData.value = {
        name: "未找到猫咪",
        description: "抱歉，我们找不到这只猫咪的信息",
        tags: [],
        personalityTraits: [],
        careAdvice: []
      };
    }
  } else if (petType === 'dogs') {
    // 狗狗数据 - 确保与DogWiki.vue中的狗狗数据一致
    const dogsData = [
      {
        id: 1,
        name: '金毛寻回犬',
        age: '2-4岁',
        breed: '金毛',
        avatar: 'https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800',
        image: 'https://images.unsplash.com/photo-1508532566027-b2032cd8a715?w=800',
        shortDesc: '"最受欢迎的友善家庭犬"',
        gender: '公',
        weight: '25-34公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['友善', '聪明', '忠诚'],
        stats: {
          size: 80,
          exercise: 85,
          friendly: 95,
        },
        personalityTraits: [
          '性格极其友善，适合家庭饲养',
          '对儿童有极高的耐心和包容性',
          '聪明好学，容易训练',
          '喜欢户外活动，精力充沛',
          '忠诚度高，对主人非常依恋'
        ],
        careAdvice: [
          '每天需要至少1小时的户外运动',
          '定期梳理被毛，春秋季节脱毛多',
          '注意耳部清洁，预防耳道感染',
          '定期驱虫和疫苗接种',
          '控制饮食，防止肥胖'
        ],
        description: '金毛寻回犬原产于苏格兰，性格友善活泼，智商高且易于训练。是理想的家庭犬和工作犬，适合有孩子的家庭。需要充分的运动和社交活动。'
      },
      {
        id: 2,
        name: '拉布拉多犬',
        age: '1-3岁',
        breed: '拉布拉多',
        avatar: 'https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800',
        image: 'https://images.unsplash.com/photo-1579213838942-6723a7979e33?w=800',
        shortDesc: '"工作犬中的全能选手"',
        gender: '母',
        weight: '25-36公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['温顺', '聪明', '活泼'],
        stats: {
          size: 80,
          exercise: 90,
          friendly: 90,
        },
        personalityTraits: [
          '性格温和友善，是优秀的家庭犬',
          '适应性强，喜欢与人互动',
          '学习能力强，容易训练',
          '对人友好，几乎不会有攻击性',
          '喜欢水，游泳能力极佳'
        ],
        careAdvice: [
          '需要大量运动，每天至少1-2小时',
          '控制饮食，容易肥胖',
          '定期梳理被毛，减少掉毛',
          '注意耳朵清洁，预防感染',
          '定期检查牙齿健康'
        ],
        description: '拉布拉多犬是友善忠诚的大型犬，智商高，容易训练。性格温和，特别适合家庭饲养。喜欢水，游泳能力强，需要充分的运动和互动。'
      },
      {
        id: 3,
        name: '边境牧羊犬',
        age: '1-2岁',
        breed: '边牧',
        avatar: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800',
        shortDesc: '"世界上最聪明的犬种"',
        gender: '公',
        weight: '14-20公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['聪明', '敏捷', '工作型'],
        stats: {
          size: 65,
          exercise: 95,
          friendly: 75,
        },
        personalityTraits: [
          '极其聪明，被公认为犬类中智商最高的品种',
          '精力充沛，需要大量运动和智力挑战',
          '工作欲望强，喜欢有任务的生活',
          '对主人忠诚，形成强烈的依恋关系',
          '警觉性高，有很好的保护意识'
        ],
        careAdvice: [
          '需要大量身体和智力活动，每天至少2小时',
          '定期梳理被毛，特别是换毛季节',
          '提供智力玩具和挑战性任务',
          '系统性训练，建立良好的沟通',
          '避免长时间独处，防止分离焦虑'
        ],
        description: '边境牧羊犬被公认为犬类中智商最高的品种，源自英国边境地区。精力旺盛，需要大量身体和智力活动，适合有经验的养犬人士。'
      },
      {
        id: 4,
        name: '哈士奇',
        age: '1-3岁',
        breed: '哈士奇',
        avatar: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
        image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
        shortDesc: '"雪橇三傻之一"',
        gender: '公',
        weight: '16-27公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['活泼', '独立', '叛逆'],
        stats: {
          size: 70,
          exercise: 90,
          friendly: 80,
        },
        personalityTraits: [
          '性格独立，有时显得叛逆',
          '极其友善，对陌生人也很友好',
          '聪明但倔强，训练时需要耐心',
          '活力充沛，需要大量运动',
          '喜欢挖掘和探索，好奇心强'
        ],
        careAdvice: [
          '需要大量运动，每天至少2小时',
          '定期梳理被毛，尤其是换毛季节',
          '牢固的围栏，防止逃跑',
          '夏季注意防暑，不适合炎热环境',
          '一致性训练，建立明确规则'
        ],
        description: '哈士奇是西伯利亚原产的中型犬，性格活泼独立。喜欢户外活动，需要大量运动。不适合高温环境，换毛期掉毛量大。适合有经验的饲养者。'
      },
      {
        id: 5,
        name: '德国牧羊犬',
        age: '2-4岁',
        breed: '德牧',
        avatar: 'https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f2e6d268?w=800',
        shortDesc: '"忠诚勇敢的工作犬"',
        gender: '公',
        weight: '30-40公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['智能', '勇敢', '工作型'],
        stats: {
          size: 85,
          exercise: 85,
          friendly: 70,
        },
        personalityTraits: [
          '性格勇敢、自信、稳定',
          '极其忠诚，对主人有强烈保护欲',
          '聪明且工作热情高，易训练',
          '警觉性强，是优秀的看门犬',
          '对家庭成员温顺友善'
        ],
        careAdvice: [
          '需要大量运动和训练，每天至少1.5小时',
          '定期梳理被毛，减少脱毛',
          '提供智力挑战和任务',
          '社会化训练，避免过度保护行为',
          '注意关节健康，避免幼犬剧烈运动'
        ],
        description: '德国牧羊犬是一种勇敢、聪明的工作犬，警觉性高，保护意识强。需要系统训练和大量运动，适合有经验的主人。是优秀的警犬和服务犬。'
      },
      {
        id: 6,
        name: '法国斗牛犬',
        age: '1-2岁',
        breed: '法斗',
        avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        shortDesc: '"小型伴侣犬中的明星"',
        gender: '母',
        weight: '8-14公斤',
        health: '注意呼吸系统',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['友善', '活泼', '性格好'],
        stats: {
          size: 40,
          exercise: 50,
          friendly: 90,
        },
        personalityTraits: [
          '性格友善、活泼、充满活力',
          '与家人建立亲密关系，喜欢陪伴',
          '警觉性强但不常吠叫',
          '对陌生人友好，社交性好',
          '适应性强，适合公寓生活'
        ],
        careAdvice: [
          '控制运动量，避免过度运动',
          '注意呼吸问题，避免高温环境',
          '定期清洁面部褶皱，预防感染',
          '控制体重，提供均衡饮食',
          '避免游泳，大多数法斗不善游泳'
        ],
        description: '法国斗牛犬是受欢迎的小型伴侣犬，性格友善活泼。适合公寓生活，不需要大量运动。注意呼吸道健康，避免高温环境。温和友善，适合各类家庭。'
      },
      {
        id: 7,
        name: '柴犬',
        age: '1-3岁',
        breed: '柴犬',
        avatar: 'https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800',
        image: 'https://images.unsplash.com/photo-1562221440-abcf93a4c1c6?w=800',
        shortDesc: '"日本国宝级犬种"',
        gender: '公',
        weight: '8-11公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['独立', '忠诚', '警觉'],
        stats: {
          size: 45,
          exercise: 70,
          friendly: 65,
        },
        personalityTraits: [
          '性格独立自主，有时显得高冷',
          '对主人极其忠诚，形成强烈依恋',
          '警觉性高，是优秀的看门犬',
          '有丰富的表情，喜欢表达自己',
          '适应能力强，适合公寓生活'
        ],
        careAdvice: [
          '需要适量运动，每天1小时左右',
          '定期梳理被毛，尤其是换毛期',
          '早期社会化训练非常重要',
          '建立明确的规则和界限',
          '保持一致性训练，避免混淆'
        ],
        description: '柴犬是日本的国宝级犬种，体型小巧，性格独立忠诚。表情丰富，网络上著名的"狗头"表情包犬种。适合公寓生活，需要适当训练和社会化。'
      },
      {
        id: 8,
        name: '萨摩耶犬',
        age: '1-2岁',
        breed: '萨摩耶',
        avatar: 'https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800',
        image: 'https://images.unsplash.com/photo-1565708097881-9eeaad9cc335?w=800',
        shortDesc: '"微笑天使"',
        gender: '母',
        weight: '16-30公斤',
        health: '健康',
        vaccinated: '已接种',
        neutered: '已绝育',
        tags: ['友善', '活泼', '漂亮'],
        stats: {
          size: 70,
          exercise: 80,
          friendly: 95,
        },
        personalityTraits: [
          '性格友善开朗，永远面带微笑',
          '对人友好，几乎没有攻击性',
          '聪明但有独立性，训练需要耐心',
          '活力充沛，喜欢户外活动',
          '与家人亲密，享受家庭生活'
        ],
        careAdvice: [
          '需要大量梳理，每周至少3-4次',
          '需要适量运动，每天1-2小时',
          '夏季注意防暑，不适合炎热环境',
          '社会化训练要尽早开始',
          '注意牙齿和耳朵的清洁'
        ],
        description: '萨摩耶犬因其上扬的嘴角被称为"微笑天使"，原产于西伯利亚。纯白色被毛，性格友善，几乎没有攻击性。需要频繁梳理毛发，不适合高温环境。'
      }
    ];    
    const foundDog = dogsData.find(dog => dog.id === petId);
    if (foundDog) {
      petData.value = foundDog;
      console.log('成功获取狗狗数据:', foundDog.name);
    } else {
      console.error(`未找到ID为${petId}的狗狗数据`);
      // 设置默认数据或错误信息
      petData.value = {
        name: "未找到狗狗",
        description: "抱歉，我们找不到这只狗狗的信息",
        tags: [],
        personalityTraits: [],
        careAdvice: []
      };
    }
  } else {
    console.error(`不支持的宠物类型: ${petType}`);
    // 设置错误信息
    petData.value = {
      name: "类型错误",
      description: "不支持的宠物类型",
      tags: [],
      personalityTraits: [],
      careAdvice: []
    };
  }
};

// 用于3D渲染的变量
let camera, scene, renderer, model, controls;
const modelContainer = ref(null);

// 初始化3D场景
function initScene() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  // 设置环境光和方向光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    45, 
    modelContainer.value.clientWidth / modelContainer.value.clientHeight, 
    0.1, 
    1000
  );
  camera.position.set(5, 3, 5);
  camera.lookAt(0, 0, 0);

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  modelContainer.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3;
  controls.maxDistance = 10;

  // 创建临时模型（实际应该加载GLB文件）
  createTempModel();

  // 加载3D模型（注释掉，因为模型路径不确定）
  // loadModel();

  // 添加窗口大小调整监听
  window.addEventListener('resize', onWindowResize);

  // 开始动画循环
  animate();
}

// 创建临时模型（如果没有真实模型可用）
function createTempModel() {
  // 创建一个简单的狗形状（简化版）
  const group = new THREE.Group();
  
  // 身体
  const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.rotation.z = Math.PI / 2;
  group.add(body);
  
  // 头部
  const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const headMaterial = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(-0.8, 0, 0);
  group.add(head);
  
  // 鼻子
  const noseGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(-1.2, 0, 0);
  group.add(nose);
  
  // 前腿
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8);
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
  
  const frontLegL = new THREE.Mesh(legGeometry, legMaterial);
  frontLegL.position.set(-0.3, 0, 0.3);
  frontLegL.rotation.x = Math.PI / 2;
  group.add(frontLegL);
  
  const frontLegR = new THREE.Mesh(legGeometry, legMaterial);
  frontLegR.position.set(-0.3, 0, -0.3);
  frontLegR.rotation.x = Math.PI / 2;
  group.add(frontLegR);
  
  // 后腿
  const backLegL = new THREE.Mesh(legGeometry, legMaterial);
  backLegL.position.set(0.5, 0, 0.3);
  backLegL.rotation.x = Math.PI / 2;
  group.add(backLegL);
  
  const backLegR = new THREE.Mesh(legGeometry, legMaterial);
  backLegR.position.set(0.5, 0, -0.3);
  backLegR.rotation.x = Math.PI / 2;
  group.add(backLegR);
  
  // 尾巴
  const tailGeometry = new THREE.CylinderGeometry(0.08, 0.02, 0.5, 8);
  const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.set(0.8, 0.3, 0);
  tail.rotation.z = Math.PI / 4;
  group.add(tail);
  
  // 耳朵
  const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 8);
  const earMaterial = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
  
  const earL = new THREE.Mesh(earGeometry, earMaterial);
  earL.position.set(-0.8, 0.4, 0.2);
  earL.rotation.z = -Math.PI / 2;
  group.add(earL);
  
  const earR = new THREE.Mesh(earGeometry, earMaterial);
  earR.position.set(-0.8, 0.4, -0.2);
  earR.rotation.z = -Math.PI / 2;
  group.add(earR);
  
  // 添加到场景
  scene.add(group);
  model = group;
}

// 加载真实的3D模型
function loadModel() {
  const loader = new GLTFLoader();
  loader.load(
    petData.value.modelPath,
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      
      // 调整模型位置和比例
      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);
      
      // 添加动画（如果有）
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
}

// 窗口大小调整响应
function onWindowResize() {
  if (modelContainer.value) {
    camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
  }
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  
  // 更新控制器
  if (controls) controls.update();
  
  // 渲染场景
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
  
  // 如果模型存在，可以添加一些旋转或动画
  if (model) {
    model.rotation.y += 0.003;
  }
}

// 组件挂载后执行
onMounted(() => {
  // 获取宠物数据
  fetchPetData();
  
  // 初始化3D场景
  if (modelContainer.value) {
    initScene();
  }
});
</script>

<template>
  <div class="pet-detail-container">
    <!-- 顶部导航栏 -->
    <div class="pet-nav">
      <button class="back-button" @click="goBack">
        <span class="material-icons-sharp">arrow_back</span>
        返回
      </button>
      <h1>{{ petData.name }}</h1>
    </div>
    
    <div class="pet-detail-content">
      <!-- 左侧图片/3D模型视图 -->
      <div class="pet-model-section">
        <!-- 如果有真实图片，优先显示图片 -->
        <div v-if="petData.image" class="pet-image-container">
          <img :src="petData.image" :alt="petData.name" class="pet-image" />
        </div>
        <!-- 否则显示3D模型 -->
        <div v-else class="model-container" ref="modelContainer"></div>
        
        <div class="pet-badges">
          <span class="pet-badge">{{ petData.age }}</span>
          <span class="pet-badge">{{ petData.gender }}</span>
          <span class="pet-badge">{{ petData.weight }}</span>
        </div>
      </div>
      
      <!-- 右侧宠物信息 -->
      <div class="pet-info-section">
        <div class="pet-header">
          <h1>{{ petData.breed }}</h1>
          <p class="pet-short-desc">{{ petData.shortDesc }}</p>
        </div>
        
        <div class="pet-tags">
          <span class="tag" v-for="(tag, index) in petData.tags" :key="index">
            {{ tag }}
          </span>
        </div>
        
        <div class="pet-description">
          <p>{{ petData.description }}</p>
        </div>
        
        <div class="pet-detail-section">
          <h2>性格特点</h2>
          <ul class="trait-list">
            <li v-for="(trait, index) in petData.personalityTraits" :key="index">
              <span class="material-icons-sharp">check_circle</span>
              <span>{{ trait }}</span>
            </li>
          </ul>
        </div>
        
        <div class="pet-detail-section">
          <h2>养护建议</h2>
          <ul class="care-list">
            <li v-for="(advice, index) in petData.careAdvice" :key="index">
              <span class="material-icons-sharp">tips_and_updates</span>
              <span>{{ advice }}</span>
            </li>
          </ul>
        </div>
        
        <div class="pet-health-info">
          <h2>健康信息</h2>
          <div class="health-grid">
            <div class="health-item">
              <span class="material-icons-sharp">medical_services</span>
              <div>
                <h3>健康状态</h3>
                <p>{{ petData.health || '未知' }}</p>
              </div>
            </div>
            <div class="health-item">
              <span class="material-icons-sharp">vaccines</span>
              <div>
                <h3>疫苗情况</h3>
                <p>{{ petData.vaccinated || '未知' }}</p>
              </div>
            </div>
            <div class="health-item">
              <span class="material-icons-sharp">healing</span>
              <div>
                <h3>绝育情况</h3>
                <p>{{ petData.neutered || '未知' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 联系/领养按钮 -->
        <div class="pet-actions">
          <button class="action-button primary">联系咨询领养</button>
          <button class="action-button secondary">加入收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-detail-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  font-family: var(--ff-llt);
  color: var(--dark);
}

.pet-nav {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--light);
}

.pet-nav h1 {
  margin: 0 auto;
  font-size: var(--fs-30);
  color: var(--deongaree);
  font-weight: 700;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--dark);
  font-size: var(--fs-16);
  transition: var(--transition-1);
  border-radius: 8px;
}

.back-button:hover {
  color: var(--deongaree);
  background-color: rgba(59, 130, 246, 0.1);
}

.pet-detail-content {
  display: flex;
  gap: 40px;
  min-height: 80vh;
}

.pet-model-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.pet-image-container {
  width: 100%;
  height: 500px;
  border-radius: var(--radius-16);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-2);
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pet-image-container:hover .pet-image {
  transform: scale(1.03);
}

.model-container {
  flex: 1;
  width: 100%;
  min-height: 500px;
  background-color: var(--white_a3);
  border-radius: var(--radius-16);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-2);
}

.pet-badges {
  display: flex;
  gap: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.pet-badge {
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--dark);
  padding: 6px 12px;
  border-radius: 30px;
  font-size: var(--fs-14);
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.model-controls {
  margin-top: 15px;
  text-align: center;
  font-size: var(--fs-14);
  color: var(--info-dark);
}

.pet-info-section {
  flex: 1;
  padding: 30px;
  background-color: white;
  border-radius: var(--radius-16);
  box-shadow: var(--shadow-1);
  overflow: auto;
}

.pet-header h1 {
  margin: 0 0 10px 0;
  font-size: var(--fs-36);
  color: var(--dark);
}

.pet-short-desc {
  font-size: var(--fs-18);
  color: var(--dark-variant);
  font-style: italic;
  margin-bottom: 20px;
}

.pet-basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  background-color: var(--white_a3);
  padding: 20px;
  border-radius: var(--radius-10);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--dark-variant);
}

.pet-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.tag {
  padding: 8px 18px;
  background-color: var(--deongaree-yw);
  color: var(--dark);
  border-radius: var(--radius-pill);
  font-size: var(--fs-14);
  font-weight: 500;
  transition: transform 0.2s ease;
}

.tag:hover {
  transform: translateY(-2px);
}

.pet-description {
  line-height: 1.7;
  color: var(--dark-variant);
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 1px dashed var(--light);
  font-size: var(--fs-16);
}

.pet-detail-section {
  margin-bottom: 35px;
}

.pet-detail-section h2 {
  font-size: var(--fs-22);
  color: var(--dark);
  margin-bottom: 20px;
  position: relative;
  padding-left: 18px;
}

.pet-detail-section h2::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 24px;
  background-color: var(--deongaree);
  border-radius: var(--radius-20);
}

.trait-list, .care-list {
  list-style-type: none;
  padding: 0;
}

.trait-list li, .care-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  color: var(--dark-variant);
}

.trait-list .material-icons-sharp {
  color: var(--youth-green-3);
  font-size: 20px;
}

.care-list .material-icons-sharp {
  color: var(--deongaree-pr);
  font-size: 20px;
}

.pet-health-info h2 {
  font-size: var(--fs-22);
  color: var(--dark);
  margin-bottom: 20px;
  position: relative;
  padding-left: 18px;
}

.pet-health-info h2::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 24px;
  background-color: var(--deongaree-pi);
  border-radius: var(--radius-20);
}

.health-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.health-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: var(--white_a3);
  border-radius: var(--radius-12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.health-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-2);
}

.health-item .material-icons-sharp {
  font-size: var(--fs-32);
  color: var(--deongaree);
}

.health-item h3 {
  font-size: var(--fs-16);
  margin: 0 0 5px 0;
  color: var(--dark);
}

.health-item p {
  margin: 0;
  color: var(--deongaree);
  font-weight: var(--fw-600);
}

.pet-actions {
  display: flex;
  gap: 15px;
  margin-top: 40px;
}

.action-button {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: var(--fs-16);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-button.primary {
  background-color: var(--deongaree);
  color: white;
  flex: 2;
}

.action-button.primary:hover {
  background-color: var(--deongaree-dark);
  color: var(--deongaree);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.action-button.secondary {
  background-color: white;
  color: var(--deongaree);
  border: 2px solid var(--deongaree);
  flex: 1;
}

.action-button.secondary:hover {
  background-color: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .pet-detail-content {
    flex-direction: column;
  }
  
  .pet-image-container,
  .model-container {
    min-height: 350px;
  }
  
  .health-grid {
    grid-template-columns: 1fr;
  }
  
  .pet-actions {
    flex-direction: column;
  }
}
</style> 