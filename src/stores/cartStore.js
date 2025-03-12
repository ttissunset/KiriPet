import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([
      {
        id: "1001 1200 011",
        title: "限定版手办 - 初音未来2024版",
        price: 1299.0,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=1",
        selected: false,
      },
      {
        id: "1005 1200 011",
        title: "动漫周边抱枕 - 特典版",
        price: 129.0,
        quantity: 2,
        image: "https://picsum.photos/400/400?random=2",
        selected: false,
      },
      {
        id: "1003 1200 011",
        title: "原创设计T恤 - 夏日限定",
        price: 199.0,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=3",
        selected: false,
      },
      {
        id: "1002 1200 011",
        title: "动漫角色立牌 - 珍藏版",
        price: 89.0,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=4",
        selected: false,
      },
      {
        id: "1001 1200 011",
        title: "二次元主题帆布包",
        price: 159.0,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=5",
        selected: false,
      },
      {
        id: "1001 1200 011",
        title: "动漫角色钥匙扣套装",
        price: 49.9,
        quantity: 3,
        image: "https://picsum.photos/400/400?random=6",
        selected: false,
      },
      {
        id: "8375 6540 311",
        title: "限量版动漫海报组合",
        price: 79.9,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=7",
        selected: false,
      },
      {
        id: "1281 6475 132`",
        title: "二次元主题笔记本",
        price: 39.9,
        quantity: 2,
        image: "https://picsum.photos/400/400?random=8",
        selected: false,
      },
      {
        id: "1321 1224 053",
        title: "动漫人物徽章套装",
        price: 29.9,
        quantity: 4,
        image: "https://picsum.photos/400/400?random=9",
        selected: false,
      },
      {
        id: "1001 1213 011",
        title: "二次元主题手机壳",
        price: 69.0,
        quantity: 1,
        image: "https://picsum.photos/400/400?random=10",
        selected: false,
      },
    ]);

    // 添加全选状态
    const isAllSelected = computed({
      get: () =>
        items.value.length > 0 && items.value.every((item) => item.selected),
      set: (value) => {
        items.value.forEach((item) => (item.selected = value));
      },
    });

    // 选中商品的总价
    const selectedTotal = computed(() => {
      return items.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const addItem = (item) => {
      items.value.push({ ...item, selected: false });
    };

    const removeItem = (id) => {
      const index = items.value.findIndex((item) => item.id === id);
      if (index > -1) {
        items.value.splice(index, 1);
      }
    };

    const updateQuantity = (id, quantity) => {
      const item = items.value.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    };

    // const toggleSelect = (id) => {
    //   const item = items.value.find(item => item.id === id)
    //   if (item) {
    //     item.selected = !item.selected
    //   }
    // }

    const clearCart = () => {
      items.value = [];
    };

    return {
      items,
      selectedTotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isAllSelected,
      // selectedCount,
      // toggleSelect,
    };
  },
  {
    persist: true,
  }
);
