import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueSmoothScroll from "vue3-smooth-scroll";

const app = createApp(App);
app.use(VueSmoothScroll, {
  duration: 400,
  updateHistory: false,
});

app.use(router);
app.mount("#app");
