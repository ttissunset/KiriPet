import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);

    // 添加喜欢商品的状态管理
    const favorites = ref({});

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

    // 购物车列表 - 合并相同商品
    const groupedItems = computed(() => {
      const groupedMap = {};

      items.value.forEach((item) => {
        if (!groupedMap[item.id]) {
          // 第一次遇到该商品时，复制对象，设置数量为1
          groupedMap[item.id] = { ...item };
        } else {
          // 已存在该商品，增加数量
          groupedMap[item.id].quantity += item.quantity;
        }
      });

      return Object.values(groupedMap);
    });

    const addItem = (item) => {
      // 检查商品是否已存在于购物车中
      const existingItem = items.value.find((i) => i.id === item.id);

      if (existingItem) {
        // 如果已存在，增加数量
        existingItem.quantity += item.quantity || 1;
      } else {
        // 如果不存在，添加新项
        items.value.push({ ...item, selected: false });
      }
    };

    const removeItem = (id) => {
      const index = items.value.findIndex((item) => item.id === id);
      if (index > -1) {
        items.value.splice(index, 1);
      }
    };

    // 减少商品数量，当数量为1时移除商品
    const decreaseQuantity = (id) => {
      const item = items.value.find((item) => item.id === id);

      if (item) {
        if (item.quantity > 1) {
          // 如果数量大于1，减少数量
          item.quantity--;
        } else {
          // 如果数量为1，移除商品
          removeItem(id);
        }
      }
    };

    const updateQuantity = (id, quantity) => {
      const item = items.value.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    };

    // 管理喜欢状态的方法
    const toggleFavorite = (productId) => {
      favorites.value[productId] = !favorites.value[productId];
    };

    const addToFavorites = (productId) => {
      favorites.value[productId] = true;
    };

    const removeFromFavorites = (productId) => {
      favorites.value[productId] = false;
    };

    const isFavorite = (productId) => {
      return !!favorites.value[productId];
    };

    // 清空购物车
    const clearCart = () => {
      items.value = [];
      updateLocalStorage();
    };

    // 清空已选中的商品
    const clearSelectedItems = () => {
      items.value = items.value.filter(item => !item.selected);
      updateLocalStorage();
    };

    // 更新本地存储
    const updateLocalStorage = () => {
      // 这个函数在使用 pinia-plugin-persistedstate 时通常不需要手动调用
      // 但为了确保清理功能立即生效，我们保留这个方法
      // 实际上，pinia persist 插件会自动处理状态的保存
    };

    return {
      items,
      favorites,
      selectedTotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isAllSelected,
      // 喜欢商品相关方法
      toggleFavorite,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      groupedItems,
      decreaseQuantity,
      clearSelectedItems,
    };
  },
  {
    persist: true,
  }
);
