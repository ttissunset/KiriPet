<script setup>
import { ref, computed, onUnmounted, onMounted } from "vue";
import QrcodeVue from "qrcode.vue";
import { useCartStore } from "../stores/cartStore";
import { useRouter } from "vue-router";
import debounce from "lodash/debounce";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);

// 示例地址数据
const Address = ref([
  {
    id: 1,
    name: "张三",
    phone: "138xxxxxxxx",
    province: "广东省",
    tag: "家",
    city: "佛山市",
    district: "南海区",
    detail: "xxxxxxxxxxx",
    isDefault: true,
  },
  {
    id: 6,
    name: "张三",
    phone: "138xxxxxxxx",
    province: "广东省",
    tag: "家",
    city: "佛山市",
    district: "南海区",
    detail: "xxxxxxxxxxx",
    isDefault: true,
  },
  {
    id: 2,
    name: "李四",
    phone: "198xxxxxxxx",
    province: "广东省",
    tag: "公司",
    city: "深圳市",
    district: "南山区",
    detail: "科技园南路XX号XX大厦",
    isDefault: true,
  },
  {
    id: 3,
    name: "王五",
    phone: "159xxxxxxxx",
    province: "广东省",
    tag: "学校",
    city: "中山市",
    district: "五桂山",
    detail: "xxxxxxx",
    isDefault: true,
  },
]);
const selectedAddress = ref(1);

// 支付方式数据
const paymentMethods = [
  {
    id: "alipay",
    name: "支付宝",
    icon: `<svg t="1732912986964" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5256" width="32" height="32"><path d="M1023.795 853.64v6.348a163.807 163.807 0 0 1-163.807 163.807h-696.18A163.807 163.807 0 0 1 0 859.988v-696.18A163.807 163.807 0 0 1 163.807 0h696.181a163.807 163.807 0 0 1 163.807 163.807V853.64z" fill="#009FE9" p-id="5257"></path><path d="M844.836 648.267c-40.952-14.333-95.623-34.809-156.846-57.128a949.058 949.058 0 0 0 90.094-222.573H573.325V307.14h245.711v-43.41l-245.71 2.458V143.33H472.173c-18.223 0-21.704 20.476-21.704 20.476v102.38h-245.71v40.952h245.71v61.427H245.712v40.952H655.23a805.522 805.522 0 0 1-64.909 148.246c-128.384-42.795-266.186-77.604-354.233-55.08a213.564 213.564 0 0 0-112.003 63.27C28.667 682.87 97.875 859.987 299.359 859.987c119.989 0 236.087-67.366 325.771-177.73 134.322 65.932 398.666 176.297 398.666 176.297V701.3s-32.352-4.095-178.96-53.033z m-563.702 144.97c-158.893 0-204.759-124.699-126.336-194.112a191.86 191.86 0 0 1 90.913-46.276c93.575-10.238 189.811 35.629 293.624 86.614-74.941 94.598-166.674 153.774-258.2 153.774z" fill="#FFFFFF" p-id="5258"></path></svg>`,
  },
  {
    id: "wechat",
    name: "微信",
    icon: `<svg t="1732912946027" class="icon" viewBox="0 0 1076 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3304" width="32" height="32"><path d="M410.493712 644.226288c-64.448471 36.97706-74.006881-20.759958-74.006881-20.759958l-80.772173-193.983933c-31.078562-92.178305 26.897497-41.56191 26.897498-41.561909s49.746372 38.732181 87.50193 62.333712c37.732946 23.602608 80.745253 6.927882 80.745254 6.927882l528.043743-250.842313C881.479874 81.578667 720.547129 0 538.352656 0 241.013636 0 0 217.098768 0 484.919453c0 154.046856 79.806318 291.154103 204.11518 380.019214L181.698086 997.56551s-10.92805 38.720336 26.945952 20.759958c25.808892-12.243853 91.603314-56.122953 130.768353-82.82771 61.570288 22.083298 128.651441 34.345455 198.970414 34.345455 297.315331 0 538.378498-217.098768 538.378499-484.924837 0-77.573115-20.313102-150.8338-56.295235-215.861568-168.236416 104.176656-559.545472 346.282128-609.973434 375.167327z" fill="#1EBE1F" p-id="3305"></path></svg>`,
  },
  {
    id: "card",
    name: "银行卡",
    icon: `<svg t="1732913021815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6408" width="32" height="32"><path d="M887.0462301677038 159.14585414162968h-15.53445925925926c-13.315251313777777 0-22.19208430933333 8.876834209185184-22.19208430933333 22.19208430933333s8.876834209185184 22.19208430933333 22.19208430933333 22.19208430933333h15.53445925925926c11.096042154666666 0 22.19208430933333 8.876834209185184 22.19208552296296 22.19208552296296v106.5220056557037H119.20010141392589v-106.5220056557037c0-11.096042154666666 8.876834209185184-22.19208430933333 22.19208430933333-22.19208552296296h596.9670781155555c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208430933333-22.19208430933333s-8.876834209185184-22.19208430933333-22.19208430933333-22.19208430933333h-599.1862860610371c-35.50733562311111 0-66.57625414162963 28.849710573037036-66.57625414162963 66.57625414162963v565.8981583834073c0 35.50733562311111 28.849710573037036 66.57625414162963 66.57625414162963 66.57625414162963h747.8732523899258c35.50733562311111 0 66.57625414162963-28.849710573037036 66.57625414162963-66.57625414162963V225.72210828325927c0-37.72654356859259-31.06891851851852-66.57625414162963-66.57625414162963-66.57625414162963z m22.19208552296296 630.2552045795555c0 11.096042154666666-8.876834209185184 22.19208430933333-22.19208552296296 22.19208430933333H139.17297777777782c-11.096042154666666 0-22.19208430933333-8.876834209185184-22.19208430933333-22.19208430933333V376.62828377125925h790.038213063111v412.77277494992586z" fill="" p-id="6409"></path><path d="M216.8452740740741 538.6305014139259h310.6891851851852c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208430933333-22.19208430933333s-8.876834209185184-22.19208430933333-22.19208430933333-22.19208430933333h-310.6891851851852c-13.315251313777777 0-22.19208430933333 8.876834209185184-22.19208430933333 22.19208430933333s11.096042154666666 22.19208430933333 22.19208430933333 22.19208430933333zM618.5220068693334 538.6305014139259h55.480210773333326c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208552296296-22.19208430933333s-8.876834209185184-22.19208430933333-22.19208552296296-22.19208430933333h-55.480210773333326c-13.315251313777777 0-22.19208430933333 8.876834209185184-22.19208552296296 22.19208430933333s8.876834209185184 22.19208430933333 22.19208552296296 22.19208430933333zM216.8452740740741 658.4677583834074h288.49710087585186c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208430933333-22.19208430933333s-8.876834209185184-22.19208430933333-22.19208430933333-22.19208430933333h-288.49710087585186c-13.315251313777777 0-22.19208430933333 8.876834209185184-22.19208430933333 22.19208430933333s11.096042154666666 22.19208430933333 22.19208430933333 22.19208430933333z" fill="" p-id="6410"></path></svg>`,
  },
];
const selectedPayment = ref("alipay");

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

// 运费
const shipping = computed(() => {
  return totalPrice.value > 199 ? 0 : 10;
});

// 最终总价
const finalTotal = computed(() => {
  return totalPrice.value + shipping.value;
});

// 表单验证
const isFormValid = computed(() => {
  return selectedAddress.value && selectedPayment.value;
});

const router = useRouter();
const showPaymentModal = ref(false);
const showSuccessModal = ref(false);
const isProcessing = ref(false);
const paymentTimer = ref(900); // 15分钟倒计时
const isPaymentStep = ref(false);
const isCompleteStep = ref(false);

let timerInterval = null;

// 防抖处理的提交订单函数
const handleSubmit = debounce(async () => {
  if (!isFormValid.value) {
    if (!selectedAddress.value) {
      alert("请选择收货地址");
      return;
    }
    if (!selectedItems.value.length) {
      alert("选择要购买的商品");
      return;
    }
    if (!selectedPayment.value) {
      alert("请选择支付方式");
      return;
    }
    return;
  }

  isPaymentStep.value = true;
  startPaymentTimer();
}, 300);

// 开始支付倒计时
const startPaymentTimer = () => {
  timerInterval = setInterval(() => {
    if (paymentTimer.value > 0) {
      paymentTimer.value--;
    } else {
      cancelPayment();
    }
  }, 1000);
};

// 格式化时间
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// 生成订单号
const generateOrderNumber = () => {
  const date = new Date();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORDER${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${random}`;
};

// 获取支付方式名称
const getPaymentMethodName = () => {
  const method = paymentMethods.find((m) => m.id === selectedPayment.value);
  return method ? method.name : "";
};

// 取消支付
const cancelPayment = () => {
  showPaymentModal.value = false;
  isPaymentStep.value = false;
  clearInterval(timerInterval);
  paymentTimer.value = 900;
};

// 二维码
const isGeneratingQR = ref(true);
const isQRScanned = ref(false);
const isChecking = ref(false);
const orderNumber = ref(generateOrderNumber());
const paymentStatusText = ref("等待扫码支付");

// 添加新的响应式变量
const showSimulateButton = ref(false);

// 修改模拟支付过程
const simulatePayment = async () => {
  if (isProcessing.value) return;

  isProcessing.value = true;
  paymentStatusText.value = "支付处理中...";

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 更新状态
    isPaymentStep.value = true;
    showPaymentModal.value = false;
    showSuccessModal.value = true;
    isCompleteStep.value = true;
    clearInterval(timerInterval);

    // 清空购物车
    cartStore.clearCart();

    // 3秒后跳转
    // setTimeout(() => {
    //   router.push("/orders");
    // }, 3000);
  } catch (error) {
    console.error("支付失败:", error);
    paymentStatusText.value = "支付失败，请重试";
  } finally {
    isProcessing.value = false;
  }
};

// 修改生成二维码效果
onMounted(() => {
  // 模拟二维码生成
  setTimeout(() => {
    isGeneratingQR.value = false;

    // 模拟10秒后扫码成功
    setTimeout(() => {
      isQRScanned.value = true;
      showSimulateButton.value = true;
    }, 10000);
  }, 1500);
});

// 组件卸载时清理定时器
onUnmounted(() => {
  clearInterval(timerInterval);
});

// 添加步骤状态计算
const stepStatus = computed(() => ({
  confirm: true, // 第一步总是激活的
  payment: isPaymentStep.value,
  complete: isCompleteStep.value,
}));

// 获取已选中的商品
const selectedItems = computed(() => {
  return cartStore.items.filter((item) => item.selected);
});

// 添加返回方法
const goBack = () => {
  if (isPaymentStep.value) {
    // 如果在支付步骤，返回到确认订单步骤
    isPaymentStep.value = false;
    clearInterval(timerInterval);
    paymentTimer.value = 900;
  } else {
    // 否则返回到购物车页面
    router.push("/cart");
  }
};
</script>

<template>
  <div class="checkout-container">
    <!-- 页面标题 -->
    <div class="checkout-header">
      <button class="back-btn" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>返回上一步</span>
      </button>
      <h1>订单结算</h1>
      <p>请确认您的订单信息并完成支付</p>
    </div>

    <!-- 进度条 -->
    <div class="checkout-progress">
      <div class="progress-steps">
        <div
          class="step active"
          :class="{ completed: stepStatus.payment || stepStatus.complete }"
        >
          <div class="step-icon">
            <span>1</span>
          </div>
          <span class="step-text">确认订单</span>
        </div>
        <div
          class="step-line"
          :class="{ active: stepStatus.payment || stepStatus.complete }"
        ></div>
        <div
          class="step"
          :class="{
            active: stepStatus.payment,
            completed: stepStatus.complete,
          }"
        >
          <div class="step-icon">
            <span>2</span>
          </div>
          <span class="step-text">支付订单</span>
        </div>
        <div class="step-line" :class="{ active: stepStatus.complete }"></div>
        <div class="step" :class="{ active: stepStatus.complete }">
          <div class="step-icon">
            <span>3</span>
          </div>
          <span class="step-text">交易完成</span>
        </div>
      </div>
    </div>

    <!-- 订单确认页面 -->
    <div v-if="!isPaymentStep" class="checkout-content">
      <!-- 左侧地址信息 -->
      <div class="address-section">
        <!-- <div class="address-header">
          <h3>地址信息</h3>
        </div> -->
        <div class="address-items">
          <label
            v-for="address in Address"
            :key="address.id"
            class="address-option"
            :class="{ active: selectedAddress === address.id }"
          >
            <input
              type="radio"
              :value="address.id"
              v-model="selectedAddress"
              class="address-radio"
            />
            <div class="address-item">
              <div class="address-header">
                <div class="address-name">
                  {{ address.name }} <span class="tag">{{ address.tag }}</span>
                </div>
                <div class="address-edit">
                  <span>编辑</span> <span class="divider">|</span>
                  <span class="delete">删除</span>
                </div>
              </div>
              <div class="address-info">
                <div class="address-detail">
                  <span
                    >{{ address.province }} {{ address.city
                    }}{{ address.district }} {{ address.detail }}</span
                  >
                </div>
                <div class="address-phone">联系方式: {{ address.phone }}</div>
              </div>
            </div>
          </label>
        </div>
        <div class="add-address">
          <svg
            t="1732915500607"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10282"
            width="20"
            height="20"
          >
            <path
              d="M512 213.344c23.552 0 42.656 19.104 42.656 42.656v213.344H768a42.656 42.656 0 1 1 0 85.312h-213.344V768a42.656 42.656 0 1 1-85.312 0v-213.344H256a42.656 42.656 0 1 1 0-85.312l213.344-0.032V256c0-23.552 19.104-42.656 42.656-42.656z"
              fill="#37a6a0"
              p-id="10283"
            ></path>
          </svg>
          <div class="add-address-text" @click="router.push('/address/edit')">
            新增地址
          </div>
        </div>
      </div>

      <!-- 右侧支付信息 -->
      <div class="payment-section">
        <!-- 订单信息 -->
        <div class="order-section">
          <div class="order-header">
            <h2>订单详情</h2>
          </div>

          <div class="order-info">
            <div class="summary-row">
              <span>价格:</span>
              <span>¥ {{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>邮费</span>
              <span class="fee">{{
                shipping > 0 ? `¥${shipping.toFixed(2)}` : "免费"
              }}</span>
            </div>
            <div class="summary-row">
              <span>已使用优惠卷</span>
              <span>￥ 0</span>
            </div>
            <hr class="divider" />
            <div class="summary-row">
              <span>总计</span>
              <span>¥ {{ finalTotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>实付款</span>
              <span>¥ {{ finalTotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>订单编号</span>
              <span>{{ orderNumber }}</span>
            </div>
            <div class="summary-row">
              <span>送货时间</span>
              <span>2024 - 12-01</span>
            </div>
            <div class="summary-row input">
              <input type="text" placeholder="请输入优惠卷" maxlength="24" />
              <span class="input-icon"
                ><svg
                  t="1732913734149"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="9254"
                  width="25"
                  height="25"
                >
                  <path
                    d="M441.813333 156.010667a106.666667 106.666667 0 0 1 85.077334 30.784l326.698666 326.72a106.666667 106.666667 0 0 1 0 150.848l-211.2 211.2a106.666667 106.666667 0 0 1-150.826666 0L164.842667 548.842667a106.666667 106.666667 0 0 1-30.805334-85.077334l17.6-193.6a106.688 106.688 0 0 1 96.576-96.576l193.578667-17.578666zM176.256 474.709333a64 64 0 0 0 18.730667 43.946667l326.72 326.72a64 64 0 0 0 90.496 0l211.2-211.2a64 64 0 0 0 0-90.496L496.704 216.981333a64 64 0 0 0-51.050667-18.496l-193.578666 17.6A64 64 0 0 0 194.133333 274.026667l-17.6 193.6c-0.213333 2.346667-0.298667 4.714667-0.256 7.061333z"
                    fill="#000000"
                    p-id="9255"
                  ></path>
                  <path
                    d="M401.045333 332.501333a64 64 0 1 1-90.496 90.496 64 64 0 0 1 90.496-90.496z"
                    fill="#000000"
                    p-id="9256"
                  ></path></svg
              ></span>
            </div>
          </div>

          <!--  -->
          <div class="payment-options">
            <label
              v-for="method in paymentMethods"
              :key="method.id"
              class="payment-option"
              :class="{ active: selectedPayment === method.id }"
            >
              <input
                type="radio"
                :value="method.id"
                v-model="selectedPayment"
                class="payment-radio"
              />
              <span class="payment-icon" v-html="method.icon"></span>
            </label>
          </div>
        </div>

        <!-- 提交订单按钮 -->
        <div class="submit-section">
          <button
            class="submit-button"
            :disabled="!isFormValid"
            @click="handleSubmit"
          >
            提交订单
          </button>
        </div>
      </div>
    </div>

    <!-- 支付页面 -->
    <div v-else-if="isPaymentStep && !isCompleteStep" class="payment-content">
      <div class="payment-info-section">
        <div class="payment-order-info">
          <h2>订单信息</h2>
          <div class="payment-order-number">订单号：{{ orderNumber }}</div>
          <div class="payment-order-number">创建时间：2024-11-30 18:45:07</div>
          <div class="payment-amount">
            <span>支付金额</span>
            <div class="amount">
              <span class="value">￥{{ finalTotal.toFixed(2) }}</span>
            </div>
          </div>
          <div class="payment-timer">
            <span>支付剩余时间：</span>
            <span class="timer">{{ formatTime(paymentTimer) }}</span>
          </div>
        </div>

        <div class="order-details">
          <div class="order-details-header">商品清单</div>
          <div class="order-items">
            <div v-for="item in cartItems" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.title" class="item-image" />
              <div class="item-info">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-meta">
                  <span class="item-price">¥ {{ item.price.toFixed(2) }}</span>
                  <span class="item-quantity">× {{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-method-section">
        <h2>请使用{{ getPaymentMethodName() }}扫码支付</h2>
        <div class="qr-code-container">
          <div class="qr-code-wrapper">
            <div class="mock-qr-code">
              <div v-if="isGeneratingQR" class="qr-loading">
                <div class="loading-spinner"></div>
                <span>正在生成支付维码...</span>
              </div>
              <div v-else-if="isQRScanned" class="qr-scanned">
                <svg
                  class="success-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="#FFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>扫码成功</span>
              </div>
              <div v-else class="qr-code">
                <QrcodeVue
                  :value="'https://example.com'"
                  :size="230"
                  level="H"
                />
              </div>
            </div>
            <p class="scan-tip" v-if="!isQRScanned">
              请使用{{ getPaymentMethodName() }}扫描二维码完成支付
            </p>
            <p class="scan-tip success" v-else>扫码成功，请在手机上确认支付</p>
          </div>
        </div>

        <!-- 仅用于演示的模拟支付按钮 -->
        <button
          v-if="showSimulateButton"
          class="simulate-payment-btn"
          @click="simulatePayment"
          :disabled="isProcessing"
        >
          {{ isProcessing ? "支付处理中..." : "支付完成" }}
        </button>
      </div>
    </div>

    <!-- 支付完成页面 -->
    <div v-else class="payment-success">
      <div class="success-content">
        <div class="success-animation">
          <div class="checkmark-circle">
            <div class="background">
              <svg
                t="1732962206377"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2342"
                width="50"
                height="50"
              >
                <path
                  d="M918.485333 248.490667a62.762667 62.762667 0 0 0-88.746666 0l-418.176 418.218666-217.130667-217.130666a62.848 62.848 0 1 0-88.874667 88.874666l259.754667 259.754667a65.237333 65.237333 0 0 0 92.245333 0L918.485333 337.28a62.762667 62.762667 0 0 0 0-88.746667z"
                  fill="#ffffff"
                  p-id="2343"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <h2>支付成功</h2>
        <div class="success-details">
          <div class="detail-item">
            <span class="label">订单编号：</span>
            <span class="value">{{ orderNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="label">支付金额：</span>
            <span class="value price">¥ {{ finalTotal.toFixed(2) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">支付方式：</span>
            <span class="value">{{ getPaymentMethodName() }}</span>
          </div>
          <div class="detail-item">
            <span class="label">创建时间：</span>
            <span class="value">2024-11-30 18:45:07</span>
          </div>
          <div class="detail-item">
            <span class="label">支付时间：</span>
            <span class="value">2024-11-30 18:45:47</span>
          </div>
        </div>
        <div class="success-message">
          <p>感谢您的购买！订单确认后会尽快为您发货</p>
          <p class="tip">您可以在订单中心查看订单状态和物流信息</p>
        </div>
        <div class="success-actions">
          <router-link to="/orders" class="btn btn-primary"
            >查看订单</router-link
          >
          <router-link to="/" class="btn btn-default">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  background: #fff;
  font-family: var(--ff-kai);
}

.checkout-header {
  text-align: center;
  margin-bottom: 32px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: none;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.checkout-header h1 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 8px;
}

.checkout-header p {
  color: #6b7280;
  font-size: 14px;
}

/* 进度条容器样式 */
.checkout-progress {
  margin-bottom: 40px;
  padding: 32px;
  border-radius: 16px;
}

.progress-steps {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
}

.step-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  color: #94a3b8;
  border: 2px solid #e2e8f0;
  transition: all 0.5s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(148, 163, 184, 0.1);
  margin: 0 auto;
}

.step-icon span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.step span {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s ease;
}

/* 活动步骤样式 */
.step.active .step-icon {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.step.active span {
  color: #1e40af;
  font-weight: 600;
}

.step.active .step-text {
  color: #1e40af;
  font-weight: 600;
}

/* 已完成步骤样式 */
.step.completed .step-icon {
  background: #22c55e;
  color: white;
  border-color: #22c55e;
}

.step.completed .step-icon::before {
  content: "✓";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  animation: checkmark 0.3s ease-out forwards;
}

.step.completed .step-text {
  color: #22c55e;
}

/* 隐藏已完成步骤的数字 */
.step.completed .step-icon > span {
  display: none;
}

/* 添加对勾动画 */
@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 连接线样式 */
.step-line {
  flex: 1;
  height: 2px;
  background: #cecfcf;
  position: relative;
  align-items: center;
  margin: 0 12px 30px 12px;
  transition: all 0.5s ease;
}

.step-line::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: #ab9fd4;
  transition: width 0.5s ease;
}

.step-line.active::before {
  width: 100%;
}

/* 内容区域样式 */
.checkout-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

/* 地址部分样式 */
.address-section {
  height: 60vh;
  overflow-y: auto;
}

.address-items {
  height: fit-content;
}

.address-option {
  display: flex;
  padding: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.address-option:hover {
  border-color: #37a6a0;
  background: rgba(147, 197, 253, 0.05);
}

.address-option.active {
  background: rgba(55, 166, 160, 0.05);
}

.address-radio {
  width: 15px;
  height: 15px;
}

.address-item {
  width: 100%;
  padding: 0 48px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-header .address-name {
  font-size: 20px;
  font-weight: 600;
}

.address-header .tag {
  font-size: 12px;
  color: #37a6a0;
  border: 1px solid #37a6a0;
  border-radius: 4px;
  padding: 1px 5px;
  margin-left: 8px;
}

.address-header .divider {
  margin: 0 20px;
  color: #b6bbc4;
}

.address-edit {
  cursor: pointer;
  font-size: 14px;
}

.address-header .delete {
  color: #ef4444;
}

.address-info {
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
}

.add-address {
  padding: 24px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.add-address-text {
  font-size: 15px;
  color: #37a6a0;
}

/* 支付部分样式 */
.payment-section {
  border: 1px solid #ddd;
  padding: 24px;
}

/* 订单部分样式 */
.order-section {
  border-radius: 16px;
}

.order-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
}

.fee {
  color: #439467;
}

.divider {
  margin: 20px 0;
  border-top: 1px solid #e5e7eb;
}

.input {
  position: relative;
}

.input input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 14px;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: calc(50% - 12px);
}

/* 支付方式样式 */
.payment-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.payment-option:hover {
  border-color: #93c5fd;
  background: rgba(147, 197, 253, 0.05);
}

.payment-option .active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.payment-radio {
  width: 15px;
  height: 15px;
}

.payment-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 提交按钮样式 */
.submit-section {
  margin-top: 22px;
  text-align: center;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: #37a6a0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  color: #37a6a0;
  background-color: #fff;
  border: 2px solid #37a6a0;
}

.submit-button:disabled {
  background: #bfbfbf;
  cursor: not-allowed;
}

.agreement-text {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}

.link {
  color: #4096ff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .checkout-header {
    margin-bottom: 24px;
  }

  .checkout-header h1 {
    font-size: 24px;
  }

  .order-item {
    padding: 12px;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }
}

.no-address span {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .selected-address {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .change-address {
    align-self: flex-end;
  }
}

.manage-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 14px;
  text-decoration: none;
}

.manage-link svg {
  width: 16px;
  height: 16px;
}

.final-price {
  color: #ff4d4f;
  font-size: 20px;
  font-weight: 600;
}

.total-amount {
  text-align: right;
  margin-bottom: 16px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .order-section {
    margin-bottom: 12px;
  }
}

/* 支付页面*/
.payment-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;
}

/* 支付信息区域 */
.payment-info-section {
  padding: 12px 24px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #e4e0e015;
}

.payment-order-number {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
}

.payment-amount {
  text-align: center;
  margin-bottom: 24px;
}

.payment-amount span {
  display: block;
  color: #64748b;
  margin-bottom: 8px;
}

.amount {
  font-size: 32px;
  font-weight: 600;
  color: #ef4444;
}

.payment-timer {
  text-align: center;
  padding: 12px;
  background: #fffbeb;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
}

/* 订单详情区域 */
.order-details {
  padding: 24px 0;
}

.order-details-header {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.order-details .order-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 60vh;
  overflow-y: auto;
}

.order-details .order-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.order-details .item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.order-details .item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.order-details .item-info {
  flex: 1;
}

.order-details .item-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.order-details .item-meta {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 14px;
}

/* 支付方式区域 */
.payment-method-section {
  padding: 24px;
  position: sticky;
  top: 24px;
  max-height: 50vh;
  border: 1px solid #e5e7eb;
}

.payment-method-section h2 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 24px;
  text-align: center;
}

.qr-code-container {
  margin: 24px 0;
}

.qr-code-wrapper {
  max-width: 240px;
  margin: 0 auto;
}

.mock-qr-code {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  position: relative;
}

.qr-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  gap: 12px;
}

.qr-code {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.scan-tip {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-top: 16px;
}

/* 模拟支付按钮 */
.simulate-payment-btn {
  width: 100%;
  padding: 14px;
  background: #37a6a0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.simulate-payment-btn:hover:not(:disabled) {
  color: #37a6a0;
  background-color: #fff;
  border: 2px solid #37a6a0;
}

.simulate-payment-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .payment-content {
    grid-template-columns: 1fr;
  }

  .payment-method-section {
    position: static;
  }

  .step span {
    font-size: 12px;
  }

  .step-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

.qr-scanned {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  gap: 12px;
}

.qr-scanned .success-icon {
  width: 64px;
  height: 64px;
  animation: scaleIn 0.3s ease-out;
}

.qr-scanned span {
  color: #4caf50;
  font-weight: 600;
  font-size: 16px;
}

.scan-tip.success {
  color: #4caf50;
  font-weight: 500;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 支付成功页面样式 */
.payment-success {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 20px;
}

.success-content {
  max-width: 500px;
  width: 100%;
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.success-animation {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}

.checkmark-circle {
  width: 80px;
  height: 80px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  overflow: visible;
}

.background {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #37a6a0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-content h2 {
  font-size: 28px;
  color: #37a6a0;
  margin-bottom: 24px;
  font-weight: 600;
}

.success-details {
  margin: 32px 0;
  text-align: left;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item .label {
  color: #6b7280;
}

.detail-item .value {
  font-weight: 500;
  color: #1f2937;
}

.detail-item .value.price {
  color: #37a6a0;
  font-weight: 600;
}

.success-message {
  margin: 24px 0;
}

.success-message p {
  margin: 8px 0;
  color: #4b5563;
}

.success-message .tip {
  font-size: 14px;
  color: #6b7280;
}

.success-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}

.success-actions .btn {
  padding: 5px 24px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.success-actions .btn-primary {
  background: #37a6a0;
  color: white;
  border: 2px solid #37a6a0;
}

.success-actions .btn-primary:hover {
  background: #2c8480;
  border-color: #2c8480;
}

.success-actions .btn-default {
  background: white;
  color: #37a6a0;
  border: 2px solid #37a6a0;
}

.success-actions .btn-default:hover {
  background: #f3f4f6;
}
</style>
