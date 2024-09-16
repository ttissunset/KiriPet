import { createWebHashHistory, createRouter } from "vue-router";

// 创建路由规则
const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home",
    component: () => import("../pages/homePages.vue"),
    children: [
      {
        path: "/home",
        component: () => import("../pages/homePages.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/loginPages.vue"),
  },
  {
    path: "/reg",
    name: "register",
    component: () => import("../pages/regPages.vue"),
  },
  {
    path: "/info",
    component: () => import("../pages/infoPages.vue"),
  },
  {
    path: "/shop",
    component: () => import("../pages/shopPages.vue"),
  },
  {
    path: "/adopt",
    component: () => import("../pages/shopPages.vue"),
  },
  {
    path: "/vip",
    component: () => import("../pages/vipPages.vue"),
    redirect:'/vip-0',
    children: [
      {
        path: "/vip-0",
        component: () => import("../components/Vip/VipFree.vue"),
      },
      {
        path: "/vip-1",
        component: () => import("../components/Vip/VipMonth.vue"),
      },
      {
        path: "/vip-2",
        component: () => import("../components/Vip/VipPermanent.vue"),
      },
    ],
  },
];

// 创建路由对象
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 导出路由对象
export default router;
