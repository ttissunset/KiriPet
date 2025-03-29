<script setup>
import { ref, computed, onMounted } from "vue";
import { useOrderStore } from "../stores/orderStore";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();
const activeTab = ref("all"); // all, pending, paid, shipped, delivered, cancelled

// 获取所有订单
const allOrders = computed(() => orderStore.getAllOrders);

// 根据状态过滤订单
const filteredOrders = computed(() => {
  if (activeTab.value === "all") {
    return allOrders.value;
  } else {
    return orderStore.getOrdersByStatus(activeTab.value);
  }
});

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

// 订单状态映射
const statusMap = {
  pending: { text: "待付款", color: "#ff9800", bgColor: "#fff8e1", icon: "📋" },
  paid: { text: "已付款", color: "#4caf50", bgColor: "#e8f5e9", icon: "💰" },
  shipped: { text: "已发货", color: "#2196f3", bgColor: "#e3f2fd", icon: "🚚" },
  delivered: { text: "已送达", color: "#9c27b0", bgColor: "#f3e5f5", icon: "📦" },
  cancelled: { text: "已取消", color: "#f44336", bgColor: "#ffebee", icon: "❌" },
};

// 获取订单状态文本
const getStatusText = (status) => {
  return statusMap[status]?.text || status;
};

// 获取订单状态颜色
const getStatusColor = (status) => {
  return statusMap[status]?.color || "#999";
};

// 获取订单状态背景色
const getStatusBgColor = (status) => {
  return statusMap[status]?.bgColor || "#f5f5f5";
};

// 获取订单状态图标
const getStatusIcon = (status) => {
  return statusMap[status]?.icon || "🔄";
};

// 查看订单详情
const viewOrderDetail = (orderId) => {
  router.push(`/orders/${orderId}`);
};

// 订单详情（如果有orderId参数）
const orderDetail = computed(() => {
  if (route.params.id) {
    return orderStore.getOrder(route.params.id);
  }
  return null;
});

// 加载模拟数据（仅用于演示）
onMounted(() => {
  if (allOrders.value.length === 0) {
    // 如果没有订单数据，可以添加一些模拟数据进行展示
    // 实际应用中，这些数据应从后端API获取
    // orderStore.createOrder({...});
  }
});
</script>

<template>
  <div class="order-page">
    <h1 class="page-title">我的订单</h1>

    <!-- 订单筛选标签 -->
    <div class="order-tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'all' }"
        @click="activeTab = 'all'"
      >
        全部订单
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'pending' }"
        @click="activeTab = 'pending'"
      >
        待付款
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'paid' }"
        @click="activeTab = 'paid'"
      >
        已付款
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'shipped' }"
        @click="activeTab = 'shipped'"
      >
        已发货
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'delivered' }"
        @click="activeTab = 'delivered'"
      >
        已送达
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'cancelled' }"
        @click="activeTab = 'cancelled'"
      >
        已取消
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list" v-if="!orderDetail">
      <div v-if="filteredOrders.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <p>暂无订单信息</p>
        <button class="shop-btn" @click="router.push('/shop')">去购物</button>
      </div>

      <div v-else class="order-items">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-item"
          @click="viewOrderDetail(order.id)"
        >
          <div class="order-header">
            <div class="order-number">订单号: {{ order.orderNumber }}</div>
            <div
              class="order-status"
              :style="{ 
                color: getStatusColor(order.status),
                backgroundColor: getStatusBgColor(order.status)
              }"
            >
              <span class="status-icon">{{ getStatusIcon(order.status) }}</span>
              {{ getStatusText(order.status) }}
            </div>
          </div>

          <div class="order-content">
            <div class="order-products">
              <div
                v-for="item in order.items.slice(0, 3)"
                :key="item.id"
                class="product-thumbnail"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="thumbnail-image"
                />
              </div>
              <div class="product-count" v-if="order.items.length > 3">
                +{{ order.items.length - 3 }}
              </div>
            </div>
            <div class="order-info">
              <div class="order-amount">
                ¥ {{ order.finalAmount.toFixed(2) }}
              </div>
              <div class="order-date">
                {{ formatDate(order.createdAt) }}
              </div>
            </div>
          </div>

          <div class="order-footer">
            <button class="detail-btn">查看详情</button>
            <button
              v-if="order.status === 'pending'"
              class="pay-btn"
              @click.stop="router.push(`/checkout?orderId=${order.id}`)"
            >
              去支付
            </button>
            <button
              v-if="order.status === 'shipped'"
              class="receive-btn"
              @click.stop="orderStore.updateOrderStatus(order.id, 'delivered')"
            >
              确认收货
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单详情 -->
    <div v-if="orderDetail" class="order-detail">
      <div class="detail-header">
        <button class="back-btn" @click="router.push('/orders')">
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
          返回订单列表
        </button>
        <h2>订单详情</h2>
      </div>

      <div class="detail-card">
        <div class="detail-section">
          <div class="section-header">
            <h3>订单信息</h3>
            <div
              class="order-status-badge"
              :style="{ 
                backgroundColor: getStatusBgColor(orderDetail.status),
                color: getStatusColor(orderDetail.status)
              }"
            >
              <span class="status-icon">{{ getStatusIcon(orderDetail.status) }}</span>
              {{ getStatusText(orderDetail.status) }}
            </div>
          </div>
          <div class="detail-row">
            <span class="label">订单编号:</span>
            <span class="value">{{ orderDetail.orderNumber }}</span>
          </div>
          <div class="detail-row">
            <span class="label">创建时间:</span>
            <span class="value">{{ formatDate(orderDetail.createdAt) }}</span>
          </div>
          <div class="detail-row" v-if="orderDetail.paidAt">
            <span class="label">支付时间:</span>
            <span class="value">{{ formatDate(orderDetail.paidAt) }}</span>
          </div>
          <div class="detail-row">
            <span class="label">支付方式:</span>
            <span class="value">{{ orderDetail.paymentMethod }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h3>收货信息</h3>
          <div class="detail-row">
            <span class="label">收货人:</span>
            <span class="value">{{ orderDetail.shippingAddress.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">联系电话:</span>
            <span class="value">{{ orderDetail.shippingAddress.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="label">收货地址:</span>
            <span class="value"
              >{{ orderDetail.shippingAddress.province }}
              {{ orderDetail.shippingAddress.city }}
              {{ orderDetail.shippingAddress.district }}
              {{ orderDetail.shippingAddress.detail }}</span
            >
          </div>
        </div>

        <div class="detail-section">
          <h3>商品信息</h3>
          <div class="product-list">
            <div
              v-for="item in orderDetail.items"
              :key="item.id"
              class="product-item"
            >
              <div class="product-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="product-info">
                <div class="product-title">{{ item.title }}</div>
                <div class="product-attrs" v-if="item.color || item.size">
                  <span v-if="item.color">颜色: {{ item.color }}</span>
                  <span v-if="item.size">尺寸: {{ item.size }}</span>
                </div>
                <div class="product-price">
                  <span class="price">¥ {{ item.price.toFixed(2) }}</span>
                  <span class="quantity">x {{ item.quantity }}</span>
                </div>
              </div>
              <div class="product-subtotal">
                <span>小计</span>
                <span>¥ {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section payment-info">
          <div class="payment-row">
            <span>商品总价</span>
            <span>¥ {{ orderDetail.totalAmount.toFixed(2) }}</span>
          </div>
          <div class="payment-row">
            <span>运费</span>
            <span
              >{{
                orderDetail.shippingFee > 0
                  ? `¥ ${orderDetail.shippingFee.toFixed(2)}`
                  : "免费"
              }}</span
            >
          </div>
          <div class="payment-row total">
            <span>实付款</span>
            <span>¥ {{ orderDetail.finalAmount.toFixed(2) }}</span>
          </div>
        </div>

        <div class="detail-actions">
          <button
            v-if="orderDetail.status === 'pending'"
            class="pay-btn"
            @click="router.push(`/checkout?orderId=${orderDetail.id}`)"
          >
            去支付
          </button>
          <button
            v-if="orderDetail.status === 'shipped'"
            class="receive-btn"
            @click="orderStore.updateOrderStatus(orderDetail.id, 'delivered')"
          >
            确认收货
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.page-title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: #37a6a0;
  margin-right: 12px;
  border-radius: 2px;
}

.order-tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.order-tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  padding: 12px 24px;
  font-size: 15px;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab:hover {
  color: #37a6a0;
}

.tab.active {
  color: #37a6a0;
  border-bottom-color: #37a6a0;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: #64748b;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.shop-btn {
  padding: 10px 24px;
  background-color: #37a6a0;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shop-btn:hover {
  background-color: #2c8480;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(55, 166, 160, 0.1);
}

.order-items {
  display: grid;
  gap: 20px;
}

.order-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.order-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  border-color: #37a6a0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.order-number {
  font-weight: 600;
  color: #1e293b;
}

.order-status {
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-icon {
  font-size: 16px;
  margin-right: 2px;
}

.order-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.order-products {
  display: flex;
  align-items: center;
}

.product-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: -8px;
  border: 2px solid white;
  transition: transform 0.3s ease;
}

.product-thumbnail:hover {
  transform: translateY(-4px);
  z-index: 1;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #f1f5f9;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
}

.order-info {
  text-align: right;
}

.order-amount {
  font-size: 18px;
  font-weight: 600;
  color: #37a6a0;
  margin-bottom: 4px;
}

.order-date {
  font-size: 14px;
  color: #64748b;
}

.order-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

.detail-btn,
.pay-btn,
.receive-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-btn {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #64748b;
}

.detail-btn:hover {
  border-color: #37a6a0;
  color: #37a6a0;
}

.pay-btn {
  background-color: #37a6a0;
  color: white;
  border: none;
}

.pay-btn:hover {
  background-color: #2c8480;
}

.receive-btn {
  background-color: #f97316;
  color: white;
  border: none;
}

.receive-btn:hover {
  background-color: #ea580c;
}

/* 订单详情样式 */
.order-detail {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.detail-header {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #64748b;
  font-size: 14px;
  cursor: pointer;
  margin-right: 16px;
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.detail-header h2 {
  font-size: 20px;
  color: #1e293b;
  margin: 0;
}

.detail-card {
  padding: 24px;
}

.detail-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 18px;
  color: #1e293b;
  margin: 0;
}

.order-status-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 16px;
}

.detail-row {
  display: flex;
  margin-bottom: 12px;
}

.label {
  width: 120px;
  color: #64748b;
  font-size: 14px;
}

.value {
  flex: 1;
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
}

.address-card {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
}

.address-info {
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 4px;
}

.address-contact {
  font-size: 14px;
  color: #64748b;
}

.product-list {
  margin-top: 12px;
}

.product-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
}

.product-item:last-child {
  border-bottom: none;
}

.product-image-container {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
}

.product-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-attrs {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.product-attr {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 14px;
}

.product-price {
  font-weight: 500;
  color: #0f172a;
}

.product-subtotal {
  text-align: right;
  min-width: 80px;
}

.subtotal-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}

.subtotal-value {
  font-size: 16px;
  font-weight: 600;
  color: #ef4444;
}

.summary {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #64748b;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-row.total {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e2e8f0;
}

.summary-row.total span:last-child {
  color: #ef4444;
}

.track-delivery {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}

.delivery-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #1e293b;
}

.tracking-timeline {
  margin-top: 8px;
}

.timeline-item {
  display: flex;
  margin-bottom: 12px;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #37a6a0;
  margin-right: 12px;
  margin-top: 4px;
  position: relative;
  z-index: 2;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 5px;
  width: 2px;
  height: calc(100% + 12px);
  background-color: #e2e8f0;
  z-index: 1;
}

.timeline-content {
  flex: 1;
}

.timeline-status {
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 4px;
}

.timeline-time {
  font-size: 12px;
  color: #64748b;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .order-page {
    padding: 24px 16px;
  }
  
  .tab {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  .order-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .order-info {
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  
  .product-thumbnail {
    width: 50px;
    height: 50px;
  }
  
  .product-count {
    width: 50px;
    height: 50px;
  }
  
  .detail-row {
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .label {
    width: 100%;
    margin-bottom: 4px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .order-status-badge {
    align-self: flex-start;
  }
}
</style> 