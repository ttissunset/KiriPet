import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义管理用户数据的state
    const userInfo = ref({});

    // 定义获取接口数据的函数
    const getUserInfo = async (user_name, password) => {
      const res = await loginAPI(user_name, password);
      console.log(res.data);
      userInfo.value = res.data.result;
    };

    // 退出时清除用户信息的action函数
    const clearUserInfo = () => {
      userInfo.value = {};
      // cartStore.clearCart();
    };

    // 以对象格式把state和action 中的数据return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
