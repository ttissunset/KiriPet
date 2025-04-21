import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCheckoutStore = defineStore(
  "checkout",
  () => {
    // 用户银行卡列表
    const creditCards = ref([
      {
        id: "card1",
        cardNumber: "4111 1111 1111 1111",
        expirationDate: "12/25",
        cardHolder: "张三",
        cardType: "visa", // visa, mastercard, amex, jcb
        isDefault: true,
      },
    ]);

    // 收货地址列表
    const shippingAddresses = ref([]);

    // 订单列表
    const orders = ref([]);

    // 当前选中的银行卡ID
    const selectedCardId = ref(
      creditCards.value.length > 0 ? creditCards.value[0].id : null
    );

    // 当前选中的地址ID
    const selectedAddressId = ref(
      shippingAddresses.value.find((addr) => addr.isDefault)?.id ||
        (shippingAddresses.value.length > 0
          ? shippingAddresses.value[0].id
          : null)
    );

    // 获取当前选中的银行卡
    const selectedCard = computed(() => {
      return (
        creditCards.value.find((card) => card.id === selectedCardId.value) ||
        null
      );
    });

    // 获取当前选中的地址
    const selectedAddress = computed(() => {
      return (
        shippingAddresses.value.find(
          (addr) => addr.id === selectedAddressId.value
        ) || null
      );
    });

    // 添加新的银行卡
    const addCreditCard = (card) => {
      // 生成唯一ID
      const newId = `card${Date.now()}`;

      // 如果是第一张卡或者设为默认卡，则更新其他卡的默认状态
      if (creditCards.value.length === 0 || card.isDefault) {
        creditCards.value.forEach((existingCard) => {
          existingCard.isDefault = false;
        });
      }

      // 添加新卡
      creditCards.value.push({
        ...card,
        id: newId,
      });

      // 如果是第一张卡或设为默认卡，则选中该卡
      if (creditCards.value.length === 1 || card.isDefault) {
        selectedCardId.value = newId;
      }

      return newId;
    };

    // 删除银行卡
    const removeCreditCard = (cardId) => {
      const index = creditCards.value.findIndex((card) => card.id === cardId);
      if (index > -1) {
        const isDefault = creditCards.value[index].isDefault;
        creditCards.value.splice(index, 1);

        // 如果删除的是默认卡并且还有其他卡，则将第一张卡设为默认
        if (isDefault && creditCards.value.length > 0) {
          creditCards.value[0].isDefault = true;
          selectedCardId.value = creditCards.value[0].id;
        } else if (creditCards.value.length === 0) {
          selectedCardId.value = null;
        }
      }
    };

    // 设置默认银行卡
    const setDefaultCreditCard = (cardId) => {
      creditCards.value.forEach((card) => {
        card.isDefault = card.id === cardId;
      });
      selectedCardId.value = cardId;
    };

    // 更新银行卡
    const updateCreditCard = (cardId, updatedCard) => {
      const card = creditCards.value.find((card) => card.id === cardId);
      if (card) {
        Object.assign(card, updatedCard);

        // 如果设为默认卡，则更新其他卡的默认状态
        if (updatedCard.isDefault) {
          creditCards.value.forEach((otherCard) => {
            if (otherCard.id !== cardId) {
              otherCard.isDefault = false;
            }
          });
        }
      }
    };

    // 添加新的收货地址
    const addShippingAddress = (address) => {
      // 生成唯一ID
      const newId =
        shippingAddresses.value.length > 0
          ? Math.max(...shippingAddresses.value.map((addr) => addr.id)) + 1
          : 1;

      // 如果是第一个地址或者设为默认地址，则更新其他地址的默认状态
      if (shippingAddresses.value.length === 0 || address.isDefault) {
        shippingAddresses.value.forEach((existingAddr) => {
          existingAddr.isDefault = false;
        });
      }

      // 添加新地址
      shippingAddresses.value.push({
        ...address,
        id: newId,
      });

      // 如果是第一个地址或设为默认地址，则选中该地址
      if (shippingAddresses.value.length === 1 || address.isDefault) {
        selectedAddressId.value = newId;
      }

      return newId;
    };

    // 删除收货地址
    const removeShippingAddress = (addressId) => {
      const index = shippingAddresses.value.findIndex(
        (addr) => addr.id === addressId
      );
      if (index > -1) {
        const isDefault = shippingAddresses.value[index].isDefault;
        shippingAddresses.value.splice(index, 1);

        // 如果删除的是默认地址并且还有其他地址，则将第一个地址设为默认
        if (isDefault && shippingAddresses.value.length > 0) {
          shippingAddresses.value[0].isDefault = true;
          selectedAddressId.value = shippingAddresses.value[0].id;
        } else if (shippingAddresses.value.length === 0) {
          selectedAddressId.value = null;
        }
      }
    };

    // 设置默认收货地址
    const setDefaultShippingAddress = (addressId) => {
      shippingAddresses.value.forEach((addr) => {
        addr.isDefault = addr.id === addressId;
      });
      selectedAddressId.value = addressId;
    };

    // 更新收货地址
    const updateShippingAddress = (addressId, updatedAddress) => {
      const address = shippingAddresses.value.find(
        (addr) => addr.id === addressId
      );
      if (address) {
        Object.assign(address, updatedAddress);

        // 如果设为默认地址，则更新其他地址的默认状态
        if (updatedAddress.isDefault) {
          shippingAddresses.value.forEach((otherAddr) => {
            if (otherAddr.id !== addressId) {
              otherAddr.isDefault = false;
            }
          });
        }
      }
    };

    // 创建新订单
    const createOrder = (orderData) => {
      const newOrder = {
        id: `ORD${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "pending", // pending, processing, shipped, delivered, cancelled
        ...orderData,
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
      }
    };

    return {
      // 状态
      creditCards,
      shippingAddresses,
      orders,
      selectedCardId,
      selectedAddressId,

      // 计算属性
      selectedCard,
      selectedAddress,

      // 银行卡方法
      addCreditCard,
      removeCreditCard,
      setDefaultCreditCard,
      updateCreditCard,

      // 收货地址方法
      addShippingAddress,
      removeShippingAddress,
      setDefaultShippingAddress,
      updateShippingAddress,

      // 订单方法
      createOrder,
      getOrder,
      updateOrderStatus,
    };
  },
  {
    persist: true,
  }
);
