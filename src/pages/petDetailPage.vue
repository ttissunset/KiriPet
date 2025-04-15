<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { useRouter, useRoute } from "vue-router";
import { catInfos, dogInfos } from "../mock/infos.js";
import * as echarts from "echarts";

const router = useRouter();
const route = useRoute();

// 返回上一页
const goBack = () => {
  router.back();
};

// 宠物数据
const petData = ref({});

// 基因展示切换
const showDominantGenes = ref(true);

// 图片预览相关状态
const showImagePreview = ref(false);
const currentImageIndex = ref(0);

// 模型控制相关状态
const isAnimationPaused = ref(false);

// 打开图片预览
const openImagePreview = (index) => {
  currentImageIndex.value = index;
  showImagePreview.value = true;
};

// 关闭图片预览
const closeImagePreview = () => {
  showImagePreview.value = false;
};

// 切换预览图片
const changePreviewImage = (index) => {
  currentImageIndex.value = index;
};

// 获取当前预览图片
const getCurrentPreviewImage = () => {
  if (!petData.value.images || petData.value.images.length === 0) {
    return petData.value.image;
  }
  return petData.value.images[currentImageIndex.value];
};

// 获取地区颜色
const getRegionColor = (index) => {
  const colors = [
    "#4CAF50", // 绿色
    "#2196F3", // 蓝色
    "#FF9800", // 橙色
    "#9C27B0", // 紫色
    "#F44336", // 红色
  ];
  return colors[index % colors.length];
};

// 存储ECharts实例的引用
const pieChart = ref(null);
const chartInstance = ref(null);

// 用于3D渲染的变量
let camera, scene, renderer, model, controls;
const modelContainer = ref(null);
let animationFrameId = null;

// 遗传病风险预测仪表盘
const diseaseRiskChart = ref(null);
const riskChartInstance = ref(null);

// 重置模型位置和大小
const resetModelView = () => {
  if (controls) {
    controls.reset();
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);
  }
};

// 切换动画暂停状态
const toggleAnimation = () => {
  isAnimationPaused.value = !isAnimationPaused.value;
};

// 根据路由参数获取宠物数据
const fetchPetData = async () => {
  const petType = route.params.type; // 'cats' 或 'dogs'
  const petId = Number(route.params.id);

  console.log(`正在获取宠物数据: 类型=${petType}, ID=${petId}`);

  if (petType === "cats") {
    // 使用导入的猫咪数据
    const foundCat = catInfos.find((cat) => cat.id === petId);
    if (foundCat) {
      petData.value = foundCat;
      console.log("成功获取猫咪数据:", foundCat.name);
    } else {
      console.error(`未找到ID为${petId}的猫咪数据`);
      // 设置默认数据或错误信息
      petData.value = {
        name: "未找到猫咪",
        description: "抱歉，我们找不到这只猫咪的信息",
        tags: [],
        personalityTraits: [],
        careAdvice: [],
      };
    }
  } else if (petType === "dogs") {
    // 使用导入的狗狗数据
    const foundDog = dogInfos.find((dog) => dog.id === petId);
    if (foundDog) {
      petData.value = foundDog;
      console.log("成功获取狗狗数据:", foundDog.name);
    } else {
      console.error(`未找到ID为${petId}的狗狗数据`);
      // 设置默认数据或错误信息
      petData.value = {
        name: "未找到狗狗",
        description: "抱歉，我们找不到这只狗狗的信息",
        tags: [],
        personalityTraits: [],
        careAdvice: [],
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
      careAdvice: [],
    };
  }

  // 在获取数据后初始化饼图
  setTimeout(() => {
    initPieChart();
  }, 100);
};

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
  renderer.setSize(
    modelContainer.value.clientWidth,
    modelContainer.value.clientHeight
  );
  renderer.setPixelRatio(window.devicePixelRatio);
  modelContainer.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3;
  controls.maxDistance = 10;

  // 创建临时模型（如果没有真实模型可用）
  createTempModel();

  // 加载3D模型（注释掉，因为模型路径不确定）
  // loadModel();

  // 添加窗口大小调整监听
  window.addEventListener("resize", onWindowResize);

  // 开始动画循环
  animate();
}

// 创建临时模型（如果没有真实模型可用）
function createTempModel() {
  // 创建一个更加精细的狗形状
  const group = new THREE.Group();

  // 使用更复杂的几何体和材质
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xf9d71c,
    shininess: 30,
    specular: 0x111111,
  });

  // 高光材质，用于眼睛
  const eyeMaterial = new THREE.MeshPhongMaterial({
    color: 0x222222,
    shininess: 100,
    specular: 0xffffff,
  });

  // 鼻子材质
  const noseMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    shininess: 50,
    specular: 0x555555,
  });

  // 身体 - 使用更平滑的椭球体
  const bodyGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  bodyGeometry.scale(1.8, 1, 1.2);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, 0, 0);
  group.add(body);

  // 头部 - 使用更平滑的球体，略微拉长
  const headGeometry = new THREE.SphereGeometry(0.45, 32, 32);
  headGeometry.scale(1.2, 1, 1);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(-0.9, 0.2, 0);
  group.add(head);

  // 吻部 - 添加立体感的吻部
  const muzzleGeometry = new THREE.SphereGeometry(0.25, 32, 16);
  muzzleGeometry.scale(1.2, 0.8, 1);
  const muzzle = new THREE.Mesh(muzzleGeometry, bodyMaterial);
  muzzle.position.set(-1.3, 0.1, 0);
  group.add(muzzle);

  // 鼻子 - 更立体的鼻子
  const noseGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  noseGeometry.scale(1.2, 0.7, 1);
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(-1.5, 0.15, 0);
  group.add(nose);

  // 眼睛 - 添加更立体的眼睛
  const eyeGeometry = new THREE.SphereGeometry(0.07, 16, 16);

  const eyeL = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeL.position.set(-1.1, 0.3, 0.2);
  group.add(eyeL);

  // 眼睛高光
  const eyeHighlightGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const eyeHighlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const eyeHighlightL = new THREE.Mesh(
    eyeHighlightGeometry,
    eyeHighlightMaterial
  );
  eyeHighlightL.position.set(-1.13, 0.32, 0.23);
  group.add(eyeHighlightL);

  const eyeR = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeR.position.set(-1.1, 0.3, -0.2);
  group.add(eyeR);

  const eyeHighlightR = new THREE.Mesh(
    eyeHighlightGeometry,
    eyeHighlightMaterial
  );
  eyeHighlightR.position.set(-1.13, 0.32, -0.23);
  group.add(eyeHighlightR);

  // 耳朵 - 更自然的耳朵形状
  const earGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  earGeometry.scale(0.7, 1, 0.5);

  const earL = new THREE.Mesh(earGeometry, bodyMaterial);
  earL.position.set(-0.8, 0.5, 0.3);
  earL.rotation.z = -Math.PI / 6;
  earL.rotation.y = Math.PI / 12;
  group.add(earL);

  const earR = new THREE.Mesh(earGeometry, bodyMaterial);
  earR.position.set(-0.8, 0.5, -0.3);
  earR.rotation.z = -Math.PI / 6;
  earR.rotation.y = -Math.PI / 12;
  group.add(earR);

  // 前腿 - 更自然的腿部形状
  const frontLegGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 16);

  const frontLegL = new THREE.Mesh(frontLegGeometry, bodyMaterial);
  frontLegL.position.set(-0.4, -0.6, 0.3);
  frontLegL.rotation.x = Math.PI / 36;
  group.add(frontLegL);

  const frontLegR = new THREE.Mesh(frontLegGeometry, bodyMaterial);
  frontLegR.position.set(-0.4, -0.6, -0.3);
  frontLegR.rotation.x = -Math.PI / 36;
  group.add(frontLegR);

  // 后腿 - 更加强壮的后腿
  const backLegGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.85, 16);

  const backLegL = new THREE.Mesh(backLegGeometry, bodyMaterial);
  backLegL.position.set(0.7, -0.6, 0.32);
  backLegL.rotation.x = Math.PI / 24;
  group.add(backLegL);

  const backLegR = new THREE.Mesh(backLegGeometry, bodyMaterial);
  backLegR.position.set(0.7, -0.6, -0.32);
  backLegR.rotation.x = -Math.PI / 24;
  group.add(backLegR);

  // 脚爪 - 添加脚爪细节
  const pawGeometry = new THREE.SphereGeometry(0.12, 16, 16);
  pawGeometry.scale(1, 0.4, 1);

  const frontPawL = new THREE.Mesh(pawGeometry, bodyMaterial);
  frontPawL.position.set(-0.4, -1, 0.3);
  group.add(frontPawL);

  const frontPawR = new THREE.Mesh(pawGeometry, bodyMaterial);
  frontPawR.position.set(-0.4, -1, -0.3);
  group.add(frontPawR);

  const backPawL = new THREE.Mesh(pawGeometry, bodyMaterial);
  backPawL.position.set(0.7, -1, 0.32);
  group.add(backPawL);

  const backPawR = new THREE.Mesh(pawGeometry, bodyMaterial);
  backPawR.position.set(0.7, -1, -0.32);
  group.add(backPawR);

  // 尾巴 - 更自然弯曲的尾巴
  const tailCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(1.1, 0.1, 0),
    new THREE.Vector3(1.4, 0.3, 0),
    new THREE.Vector3(1.5, 0.6, 0),
    new THREE.Vector3(1.3, 0.9, 0)
  );

  const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 0.08, 16, false);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  group.add(tail);

  // 细节：添加项圈
  const collarGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32);
  const collarMaterial = new THREE.MeshPhongMaterial({
    color: 0x3366ff,
    shininess: 50,
    specular: 0x222222,
  });
  const collar = new THREE.Mesh(collarGeometry, collarMaterial);
  collar.position.set(-0.7, 0.05, 0);
  collar.rotation.y = Math.PI / 2;
  group.add(collar);

  // 调整整体位置和大小
  group.scale.set(0.9, 0.9, 0.9);
  group.position.set(0, 0.3, 0);

  // 添加到场景
  scene.add(group);
  model = group;
}

// 窗口大小调整响应
function onWindowResize() {
  if (modelContainer.value) {
    camera.aspect =
      modelContainer.value.clientWidth / modelContainer.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      modelContainer.value.clientWidth,
      modelContainer.value.clientHeight
    );
  }
}

// 动画循环
function animate() {
  animationFrameId = requestAnimationFrame(animate);

  if (controls) {
    controls.update();
  }

  // 只有在未暂停时才旋转模型
  if (model && !isAnimationPaused.value) {
    model.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

// 计算饼图切片的样式
function getPieSliceStyle(index) {
  const regions = petData.value.globalDistribution.regions;
  let startAngle = 0;

  // 计算当前区域之前所有区域的百分比总和
  for (let i = 0; i < index; i++) {
    startAngle += regions[i].percentage;
  }

  // 将百分比转换为角度（360度 × 百分比）
  const startAngleDeg = startAngle * 3.6; // 3.6 = 360 / 100
  const sliceAngleDeg = regions[index].percentage * 3.6;

  return {
    backgroundColor: getRegionColor(index),
    transform: `rotate(${startAngleDeg}deg)`,
    clip: `rect(0, 150px, 150px, 75px)`,
    // 如果切片角度 > 180度，需要特殊处理
    "--end-angle": `${sliceAngleDeg <= 180 ? sliceAngleDeg : 180}deg`,
    "--next-end-angle": `${sliceAngleDeg > 180 ? sliceAngleDeg - 180 : 0}deg`,
  };
}

// 初始化ECharts饼图
function initPieChart() {
  if (!pieChart.value) return;

  // 销毁已存在的图表实例
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // 创建新的图表实例
  chartInstance.value = echarts.init(pieChart.value);

  // 检查是否有分布数据
  if (
    !petData.value.globalDistribution ||
    !petData.value.globalDistribution.regions
  ) {
    return;
  }

  const regions = petData.value.globalDistribution.regions;

  // 准备数据
  const pieData = regions.map((region) => ({
    value: region.percentage,
    name: region.name,
  }));

  // 配置图表选项
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c}%",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      data: regions.map((region) => region.name),
    },
    series: [
      {
        name: "全球分布",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: "{b}: {c}%",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
          },
        },
        data: pieData,
      },
    ],
  };

  // 设置图表选项并渲染
  chartInstance.value.setOption(option);
}

// 在窗口大小变化时调整图表大小
function resizeChart() {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
}

// 修改图片导出功能
const exportImage = () => {
  const imageUrl = getCurrentPreviewImage();
  if (!imageUrl) return;

  // 创建下载状态指示
  const exportBtn = document.querySelector(".export-btn");
  const originalIcon = exportBtn.innerHTML;
  exportBtn.innerHTML =
    '<span class="material-icons-sharp">hourglass_top</span>';

  // 获取图片并转换为Blob
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // 创建Blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // 创建下载链接
      const link = document.createElement("a");
      link.href = blobUrl;

      // 从URL中提取文件名，如果没有则使用宠物名称作为文件名
      const fileName =
        imageUrl.split("/").pop() || `${petData.value.name}_image.jpg`;
      link.download = fileName;

      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 释放Blob URL
      window.URL.revokeObjectURL(blobUrl);

      // 恢复按钮状态
      exportBtn.innerHTML = originalIcon;
    })
    .catch((error) => {
      console.error("下载图片时出错:", error);
      exportBtn.innerHTML = originalIcon;
    });
};

// 导出3D模型
const exportModel = () => {
  if (!model) return;

  const exporter = new GLTFExporter();
  exporter.parse(
    model,
    (gltf) => {
      // 将导出的数据转换为Blob
      const output = JSON.stringify(gltf, null, 2);
      const blob = new Blob([output], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      // 创建下载链接
      const link = document.createElement("a");
      link.href = url;
      link.download = `${petData.value.name || "pet"}_3d_model.gltf`;
      document.body.appendChild(link);
      link.click();

      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    (error) => {
      console.error("导出模型时出错:", error);
    },
    { binary: false }
  );
};

// 初始化遗传病风险预测仪表盘
function initDiseaseRiskChart() {
  if (!diseaseRiskChart.value) return;

  // 销毁已存在的图表实例
  if (riskChartInstance.value) {
    riskChartInstance.value.dispose();
  }

  // 创建新的图表实例
  riskChartInstance.value = echarts.init(diseaseRiskChart.value);

  // 创建模拟数据（实际应用中应从petData中获取）
  const riskData = petData.value.geneticRiskPrediction || {
    overallRisk: 12,
    specificRisks: [
      { name: "髋关节发育不良", value: 15 },
      { name: "心脏病", value: 8 },
      { name: "白内障", value: 20 },
      { name: "甲状腺功能减退", value: 5 },
    ],
  };

  // 配置仪表盘选项
  const option = {
    title: {
      text: "遗传病风险预测",
      left: "center",
    },
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "总体风险",
        type: "gauge",
        detail: { formatter: "{value}%" },
        data: [{ value: riskData.overallRisk, name: "总体风险" }],
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.2, "#67e0e3"],
              [0.5, "#37a2da"],
              [0.8, "#fd666d"],
              [1, "#e62c2b"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisLabel: {
          show: false,
        },
      },
    ],
  };

  // 设置图表选项并渲染
  riskChartInstance.value.setOption(option);

  // 创建下方的特定风险条形图
  setTimeout(() => {
    initSpecificRisksChart(riskData.specificRisks);
  }, 100);
}

// 初始化特定风险条形图
function initSpecificRisksChart(risksData) {
  const specificRisksContainer = document.getElementById("specificRisksChart");
  if (!specificRisksContainer) return;

  const specificRisksChart = echarts.init(specificRisksContainer);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100,
      name: "风险百分比",
      nameLocation: "end",
    },
    yAxis: {
      type: "category",
      data: risksData.map((item) => item.name),
    },
    series: [
      {
        name: "风险程度",
        type: "bar",
        data: risksData.map((item) => item.value),
        itemStyle: {
          color: function (params) {
            const value = params.value;
            if (value < 10) return "#67e0e3";
            if (value < 30) return "#37a2da";
            if (value < 60) return "#fd666d";
            return "#e62c2b";
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: "{c}%",
        },
      },
    ],
  };

  specificRisksChart.setOption(option);
}

// 组件挂载后执行
onMounted(() => {
  // 获取宠物数据
  fetchPetData();

  // 初始化3D场景
  if (modelContainer.value) {
    initScene();
  }

  // 添加窗口调整大小的事件监听器
  window.addEventListener("resize", resizeChart);

  // 初始化仪表盘
  setTimeout(() => {
    initDiseaseRiskChart();
  }, 500);
});

// 在组件卸载时清理资源
onUnmounted(() => {
  // 移除窗口调整大小的事件监听器
  window.removeEventListener("resize", resizeChart);

  // 销毁图表实例
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }

  if (riskChartInstance.value) {
    riskChartInstance.value.dispose();
    riskChartInstance.value = null;
  }

  // 清理3D资源
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (renderer) {
    renderer.dispose();
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
        <!-- 上方图片展示区 - 只显示第一张图片 -->
        <div
          class="pet-image-container"
          v-if="petData.images && petData.images.length > 0"
        >
          <img
            :src="petData.images[0]"
            :alt="petData.name"
            class="pet-image"
            @click="openImagePreview(0)"
          />
        </div>
        <!-- 单张图片展示（向后兼容） -->
        <div class="pet-image-container" v-else-if="petData.image">
          <img
            :src="petData.image"
            :alt="petData.name"
            class="pet-image"
            @click="openImagePreview(0)"
          />
        </div>
        <!-- 下方3D模型展示区 -->
        <div class="model-container" ref="modelContainer">
          <!-- 模型控制按钮 -->
          <div class="model-controls">
            <button
              class="model-control-btn reset-btn"
              @click="resetModelView"
              title="重置视图"
            >
              <span class="material-icons-sharp">restart_alt</span>
            </button>
            <button
              class="model-control-btn pause-btn"
              @click="toggleAnimation"
              title="暂停/播放"
            >
              <span class="material-icons-sharp">{{
                isAnimationPaused ? "play_arrow" : "pause"
              }}</span>
            </button>
            <button
              class="model-control-btn export-btn"
              @click="exportModel"
              title="导出模型"
            >
              <span class="material-icons-sharp">file_download</span>
            </button>
          </div>
        </div>

        <!-- 遗传病风险预测仪表盘 -->
        <div class="disease-risk-section">
          <div ref="diseaseRiskChart" class="risk-gauge-chart"></div>
          <div id="specificRisksChart" class="specific-risks-chart"></div>
        </div>

        <!-- 生命周期数据轴 -->
        <div class="lifecycle-section">
          <h3>生命周期关键指标</h3>
          <div class="lifecycle-timeline">
            <div class="lifecycle-stage">
              <div class="stage-header">
                <span class="stage-icon">🐶</span>
                <span class="stage-name">幼年期</span>
              </div>
              <ul class="stage-metrics">
                <li>体重: 2-5kg</li>
                <li>活动量: 高</li>
                <li>喂食: 每日3-4次</li>
                <li>社交化: 关键阶段</li>
              </ul>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">
                <span class="stage-icon">🐕</span>
                <span class="stage-name">成年期</span>
              </div>
              <ul class="stage-metrics">
                <li>体重: 5-8kg</li>
                <li>活动量: 中等</li>
                <li>喂食: 每日2次</li>
                <li>健康检查: 每年1次</li>
              </ul>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">
                <span class="stage-icon">🦮</span>
                <span class="stage-name">老年期</span>
              </div>
              <ul class="stage-metrics">
                <li>体重: 4-7kg</li>
                <li>活动量: 低</li>
                <li>喂食: 特殊老年餐</li>
                <li>健康检查: 每半年1次</li>
              </ul>
            </div>
          </div>
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
            <li
              v-for="(trait, index) in petData.personalityTraits"
              :key="index"
            >
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

        <!-- 基本特征区域 -->
        <div class="pet-detail-section">
          <h2>基本特征</h2>
          <div class="features-grid">
            <div class="feature-item" v-if="petData.livingRange">
              <span class="material-icons-sharp">home</span>
              <div>
                <h3>适宜居住范围</h3>
                <p>{{ petData.livingRange }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.bodySize">
              <span class="material-icons-sharp">pets</span>
              <div>
                <h3>体型</h3>
                <p>{{ petData.bodySize }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.shedding">
              <span class="material-icons-sharp">content_cut</span>
              <div>
                <h3>掉毛量</h3>
                <p>{{ petData.shedding }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.intelligence">
              <span class="material-icons-sharp">psychology</span>
              <div>
                <h3>智商</h3>
                <p>{{ petData.intelligence }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.lifespan">
              <span class="material-icons-sharp">favorite</span>
              <div>
                <h3>寿命</h3>
                <p>{{ petData.lifespan }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.origin">
              <span class="material-icons-sharp">public</span>
              <div>
                <h3>原产地</h3>
                <p>{{ petData.origin }}</p>
              </div>
            </div>
            <div class="feature-item" v-if="petData.trainability">
              <span class="material-icons-sharp">school</span>
              <div>
                <h3>可训练度</h3>
                <p>{{ petData.trainability }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 新增基因身份证展示 -->
        <div class="pet-detail-section" v-if="petData.geneticProfile">
          <h2>基因身份证</h2>
          <div class="genetic-profile">
            <div class="gene-image-container">
              <img
                :src="petData.geneticProfile.dnaVisualUrl"
                alt="DNA可视化"
                class="dna-image"
              />
              <div class="gene-image-overlay">
                <button
                  class="gene-toggle-btn"
                  @click="showDominantGenes = !showDominantGenes"
                >
                  {{ showDominantGenes ? "查看隐性基因" : "查看显性基因" }}
                </button>
              </div>
            </div>

            <div class="gene-info">
              <div v-if="showDominantGenes" class="gene-list dominant">
                <h3>显性基因标记</h3>
                <div class="gene-tags">
                  <span
                    class="gene-tag"
                    v-for="(gene, index) in petData.geneticProfile
                      .dominantGenes"
                    :key="'dom-' + index"
                  >
                    <span class="material-icons-sharp">verified</span>
                    {{ gene }}
                  </span>
                </div>
              </div>

              <div v-else class="gene-list recessive">
                <h3>隐性基因标记</h3>
                <div class="gene-tags">
                  <span
                    class="gene-tag"
                    v-for="(gene, index) in petData.geneticProfile
                      .recessiveGenes"
                    :key="'rec-' + index"
                  >
                    <span class="material-icons-sharp">dna</span>
                    {{ gene }}
                  </span>
                </div>
              </div>

              <div class="health-risks">
                <h3>健康风险评估</h3>
                <ul class="risk-list">
                  <li
                    v-for="(risk, index) in petData.geneticProfile.healthRisks"
                    :key="index"
                  >
                    <span class="material-icons-sharp">
                      {{
                        risk.includes("低")
                          ? "check_circle"
                          : risk.includes("中")
                          ? "info"
                          : "warning"
                      }}
                    </span>
                    <span
                      :class="{
                        'risk-low': risk.includes('低'),
                        'risk-medium': risk.includes('中'),
                        'risk-high': risk.includes('高'),
                      }"
                      >{{ risk }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 新增历史溯源轴展示 -->
        <div
          class="pet-detail-section"
          v-if="petData.history && petData.history.length"
        >
          <h2>历史溯源轴</h2>
          <div class="history-timeline">
            <div class="timeline-container">
              <div
                v-for="(historyItem, index) in petData.history"
                :key="index"
                class="timeline-item"
                :class="{ even: index % 2 === 0, odd: index % 2 !== 0 }"
              >
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="year">{{ historyItem.year }}</h3>
                  <p class="event">{{ historyItem.event }}</p>
                </div>
              </div>
              <div class="timeline-line"></div>
            </div>
          </div>
        </div>

        <!-- 修改全球分布热力图展示 -->
        <div class="pet-detail-section" v-if="petData.globalDistribution">
          <h2>全球分布热力图</h2>
          <div class="distribution-container">
            <!-- 使用ECharts的饼图代替原来的CSS实现 -->
            <div class="distribution-chart">
              <div ref="pieChart" class="pie-chart-container"></div>
            </div>
            <div
              class="popularity-rank"
              v-if="petData.globalDistribution.popularityRank"
            >
              <span class="rank-label">全球流行度排名</span>
              <span class="rank-number"
                >#{{ petData.globalDistribution.popularityRank }}</span
              >
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

    <!-- 图片预览弹窗 -->
    <div class="image-preview-modal" v-if="showImagePreview">
      <div class="preview-overlay" @click="closeImagePreview"></div>
      <div class="preview-content">
        <button class="close-preview" @click="closeImagePreview">
          <span class="material-icons-sharp">close</span>
        </button>

        <!-- 上方大图展示 -->
        <div class="preview-main-image">
          <img :src="getCurrentPreviewImage()" :alt="petData.name" />

          <!-- 导出按钮 -->
          <button class="img-export-btn" @click="exportImage" title="导出图片">
            <span class="material-icons-sharp">file_download</span>
          </button>
        </div>

        <!-- 下方缩略图列表 - 修改为居中显示 -->
        <div
          class="preview-thumbnails"
          v-if="petData.images && petData.images.length > 0"
        >
          <div
            v-for="(image, index) in petData.images"
            :key="index"
            class="preview-thumbnail"
            :class="{ active: index === currentImageIndex }"
            @click="changePreviewImage(index)"
          >
            <img :src="image" :alt="`${petData.name} 图片 ${index + 1}`" />
          </div>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 45%;
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
  cursor: pointer;
  transition: transform 0.5s ease;
}

.pet-image:hover {
  transform: scale(1.03);
}

.model-container {
  min-height: 300px;
  border-radius: var(--radius-16);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-2);
  background-color: #f5f5f5;
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

.trait-list,
.care-list {
  list-style-type: none;
  padding: 0;
}

.trait-list li,
.care-list li {
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

/* 添加结构化信息的样式 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  box-shadow: var(--shadow-2);
  border-radius: var(--radius-12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item .material-icons-sharp {
  font-size: var(--fs-28);
  color: var(--deongaree);
}

.feature-item h3 {
  font-size: var(--fs-16);
  margin: 0 0 5px 0;
  color: var(--dark);
  font-weight: var(--fw-500);
}

.feature-item p {
  margin: 0;
  color: var(--dark-variant);
  font-size: var(--fs-15);
}

@media (max-width: 900px) {
  .pet-detail-content {
    flex-direction: column;
  }

  .pet-image-container,
  .model-container {
    min-height: 350px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .pet-actions {
    flex-direction: column;
  }
}

/* 添加基因身份证相关样式 */
.genetic-profile {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.gene-image-container {
  flex: 1;
  position: relative;
  border-radius: var(--radius-12);
  overflow: hidden;
  box-shadow: var(--shadow-2);
  height: 300px;
}

.dna-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gene-image-container:hover .dna-image {
  transform: scale(1.05);
}

.gene-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  justify-content: center;
}

.gene-toggle-btn {
  background-color: var(--deongaree);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.gene-toggle-btn:hover {
  background-color: var(--deongaree-dark);
  transform: translateY(-2px);
}

.gene-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gene-list h3,
.health-risks h3 {
  font-size: var(--fs-18);
  margin-bottom: 15px;
  color: var(--dark);
  border-left: 4px solid var(--deongaree);
  padding-left: 10px;
}

.gene-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gene-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-pill);
  font-size: var(--fs-14);
}

.gene-tag .material-icons-sharp {
  color: var(--deongaree);
  font-size: 16px;
}

.risk-list {
  list-style: none;
  padding: 0;
}

.risk-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-8);
  background-color: var(--white_a3);
}

.risk-list .material-icons-sharp {
  font-size: 20px;
}

.risk-low {
  color: var(--youth-green-3);
}

.risk-medium {
  color: var(--warning);
}

.risk-high {
  color: var(--danger);
}

.risk-list .material-icons-sharp {
  color: inherit;
}

/* 历史溯源轴样式 */
.history-timeline {
  margin-top: 20px;
  padding: 20px 0;
}

.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--deongaree-yw);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  margin-bottom: 30px;
  position: relative;
}

.timeline-item.even {
  flex-direction: row;
  padding-right: 50%;
  padding-left: 0;
}

.timeline-item.odd {
  flex-direction: row-reverse;
  padding-left: 50%;
  padding-right: 0;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 15px;
  width: 16px;
  height: 16px;
  background-color: var(--deongaree);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 0 4px var(--deongaree-yw);
}

.timeline-content {
  background-color: white;
  border-radius: var(--radius-12);
  padding: 15px;
  box-shadow: var(--shadow-1);
  width: 80%;
  transition: transform 0.3s ease;
  position: relative;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-2);
}

.timeline-content::after {
  content: "";
  position: absolute;
  top: 15px;
  width: 15px;
  height: 15px;
  background-color: white;
  transform: rotate(45deg);
}

.timeline-item.even .timeline-content::after {
  right: -7px;
}

.timeline-item.odd .timeline-content::after {
  left: -7px;
}

.timeline-content .year {
  color: var(--deongaree);
  font-size: var(--fs-16);
  margin: 0 0 8px 0;
}

.timeline-content .event {
  color: var(--dark-variant);
  margin: 0;
  font-size: var(--fs-14);
}

/* 全球分布热力图样式 */
.distribution-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.distribution-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pie-chart-container {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}

.pie-chart,
.pie-slice,
.pie-slice::before,
.pie-slice::after {
  display: none;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 3px;
}

.legend-label {
  font-size: var(--fs-14);
}

.popularity-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background-color: var(--deongaree-yw);
  border-radius: var(--radius-12);
  margin-top: 10px;
}

.rank-label {
  font-size: var(--fs-16);
  color: var(--dark);
}

.rank-number {
  font-size: var(--fs-24);
  font-weight: 700;
  color: var(--deongaree);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .genetic-profile {
    flex-direction: column;
  }

  .gene-image-container {
    height: 200px;
  }

  .timeline-item.even,
  .timeline-item.odd {
    flex-direction: column;
    padding: 0 0 0 30px;
  }

  .timeline-line {
    left: 15px;
  }

  .timeline-marker {
    left: 15px;
  }

  .timeline-content {
    width: 100%;
  }

  .timeline-item.even .timeline-content::after,
  .timeline-item.odd .timeline-content::after {
    left: -7px;
  }
}

/* 图片预览弹窗样式 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.preview-content {
  position: relative;
  width: 80%;
  height: 80%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}

.close-preview {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1002;
  transition: background 0.3s ease;
}

.close-preview:hover {
  background: rgba(0, 0, 0, 0.8);
}

.preview-main-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
}

.preview-main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.img-export-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.img-export-btn:hover {
  color: #fff;
  background-color: rgba(224, 28, 21, 0.2);
}

.preview-thumbnails {
  height: 100px;
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #eee;
  justify-content: center;
}

.preview-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-8);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.preview-thumbnail.active {
  border-color: var(--deongaree);
}

.preview-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 模型控制按钮样式 */
.model-controls {
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.model-control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.model-control-btn:hover {
  transform: translateY(-2px);
}

.model-control-btn .material-icons-sharp {
  font-size: 20px;
  color: var(--dark);
}

.reset-btn:hover {
  background-color: rgba(33, 150, 243, 0.2);
}

.pause-btn:hover {
  background-color: rgba(76, 175, 80, 0.2);
}

.export-btn:hover {
  background-color: rgba(230, 127, 216, 0.2);
}

/* 遗传病风险预测仪表盘样式 */
.disease-risk-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: var(--radius-16);
  box-shadow: var(--shadow-1);
  padding: 20px;
}

.risk-gauge-chart {
  height: 300px;
  width: 100%;
}

.specific-risks-chart {
  height: 250px;
  width: 100%;
}

/* 生命周期数据轴样式 */
.lifecycle-section {
  margin-top: 30px;
  background-color: white;
  border-radius: var(--radius-16);
  box-shadow: var(--shadow-1);
  padding: 20px;
}

.lifecycle-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: var(--fs-20);
  color: var(--dark);
  text-align: center;
}

.lifecycle-timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
}

.lifecycle-timeline::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #67e0e3, #37a2da, #fd666d);
  z-index: 0;
}

.lifecycle-stage {
  position: relative;
  background-color: white;
  border-radius: var(--radius-12);
  padding: 15px;
  width: 30%;
  box-shadow: var(--shadow-1);
  z-index: 1;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.stage-icon {
  font-size: 24px;
}

.stage-name {
  font-weight: 600;
  color: var(--dark);
}

.stage-metrics {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stage-metrics li {
  padding: 5px 0;
  font-size: var(--fs-14);
  color: var(--dark-variant);
  border-bottom: 1px dashed #eee;
}

.stage-metrics li:last-child {
  border-bottom: none;
}

@media (max-width: 900px) {
  .lifecycle-timeline {
    flex-direction: column;
    gap: 20px;
  }

  .lifecycle-timeline::before {
    display: none;
  }

  .lifecycle-stage {
    width: 100%;
  }
}
</style>
