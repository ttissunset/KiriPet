import ImageView from "./ImageView/index.vue";

// 全局注册放大镜组件
export const componentPlugin = {
  install(app) {
    // app.component("组件名","组件配置对象")
    app.component("ImageView", ImageView);
  },
};
