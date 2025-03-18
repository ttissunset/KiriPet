import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import * as VueSmoothScroll from "vue3-smooth-scroll";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 引入懒加载指令插件
import { lazyPlugin } from "./directives";
// 引入放大镜组件
import { componentPlugin } from "./components";

const app = createApp(App);
const pinia = createPinia();

// 注册持久化插件 --> 会自动将数据存储到localStorage中保持数据持久化 --> 需要在store中添加 presist:true 对象
pinia.use(piniaPluginPersistedstate);

app.use(VueSmoothScroll, {
  duration: 400,
  updateHistory: false,
});

app.use(router);
app.use(pinia);
// 注册插件
app.use(lazyPlugin);
// 注册全局组件插件
app.use(componentPlugin);

app.mount("#app");
