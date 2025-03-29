import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useOrderStore = defineStore(
  "order",
  () => {
    // 订单列表
    const orders = ref([]);

    // 获取所有订单
    const getAllOrders = computed(() => orders.value);

    // 按状态过滤订单
    const getOrdersByStatus = (status) => {
      return orders.value.filter(order => order.status === status);
    };

    // 创建新订单
    const createOrder = (orderData) => {
      const newOrder = {
        id: `ORDER${Date.now()}`,
        orderNumber: generateOrderNumber(),
        createdAt: new Date().toISOString(),
        paidAt: orderData.paidAt || null,
        status: orderData.status || "pending", // pending, paid, shipped, delivered, cancelled
        items: [...orderData.items],
        totalAmount: orderData.totalAmount,
        shippingFee: orderData.shippingFee || 0,
        finalAmount: orderData.finalAmount,
        shippingAddress: { ...orderData.shippingAddress },
        paymentMethod: orderData.paymentMethod,
        ...orderData.additionalData
      };

      orders.value.push(newOrder);
      return newOrder.id;
    };

    // 获取订单详情
    const getOrder = (orderId) => {
      return orders.value.find((order) => order.id === orderId) || null;
    };

    // 更新订单状态
    const updateOrderStatus = (orderId, status) => {
      const order = orders.value.find((order) => order.id === orderId);
      if (order) {
        order.status = status;
        
        // 如果状态为已付款，记录支付时间
        if (status === 'paid' && !order.paidAt) {
          order.paidAt = new Date().toISOString();
        }
      }
    };

    // 删除订单（管理员功能，一般不提供给用户）
    const deleteOrder = (orderId) => {
      const index = orders.value.findIndex(order => order.id === orderId);
      if (index > -1) {
        orders.value.splice(index, 1);
      }
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

    return {
      orders,
      getAllOrders,
      getOrdersByStatus,
      createOrder,
      getOrder,
      updateOrderStatus,
      deleteOrder
    };
  },
  {
    persist: true,
  }
); 