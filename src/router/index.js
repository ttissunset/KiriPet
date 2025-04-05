import { createWebHistory, createRouter } from "vue-router";

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
    path: "/wiki",
    component: () => import("../pages/wikiPages.vue"),
    children: [
      {
        path: "",
        redirect: "/wiki/cats",
      },
      {
        path: "cats",
        name: "Cats",
        component: () => import("../components/Wiki/CatWiki.vue"),
      },
      {
        path: "dogs",
        name: "Dogs",
        component: () => import("../components/Wiki/DogWiki.vue"),
      },
      {
        path: "knowledges",
        name: "Knowledges",
        component: () => import("../components/Wiki/KnowledgeWiki.vue"),
      },
      {
        path: ":type/:id",
        name: "WikiPetDetail",
        component: () => import("../pages/petDetailPage.vue"),
      },
    ],
  },
  {
    path: "/chat",
    component: () => import("../pages/chatPages.vue"),
    children: [
      {
        path: "",
        redirect: "/chat/user",
      },
      {
        path: "user",
        name: "ChatMain",
        component: () => import("../components/Chat/ChatMain.vue"),
      },
      {
        path: "/chat/:id",
        name: "ChatRoom",
        component: () => import("../components/Chat/ChatRoom.vue"),
      },
    ],
  },
  {
    path: "/shop",
    component: () => import("../pages/shopPages.vue"),
  },
  {
    path: "/serve",
    component: () => import("../pages/servePages.vue"),
  },
  {
    path: "/userinfo",
    component: () => import("../pages/userInfo.vue"),
  },
  {
    path: "/goods",
    component: () => import("../pages/goodsPages.vue"),
  },
  {
    path: "/user",
    component: () => import("../pages/userPages.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../pages/checkoutPage.vue"),
  },
  {
    path: "/social",
    component: () => import("../pages/socialPages.vue"),
    children: [
      {
        path: "",
        redirect: "/social/foru",
      },
      {
        path: "foru",
        name: "Foru",
        component: () => import("../components/Social/ForYou.vue"),
      },
      {
        path: "trending",
        name: "Trending",
        component: () => import("../components/Social/Trending.vue"),
      },
    ],
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("../pages/uploadPages.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../pages/orderPages.vue"),
  },
  {
    path: "/vip",
    name: "vip",
    component: () => import("../pages/vipPages.vue"),
  },
];

// 创建路由对象
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior(to, from) {
    // 比较主路由路径是否发生变化
    const toPathSegments = to.path.split('/');
    const fromPathSegments = from.path.split('/');
    
    // 只有当主路由（第一级路径）变化时才滚动到顶部
    if (toPathSegments[1] !== fromPathSegments[1]) {
      return { 
        top: 0,
        behavior: 'smooth'  // 平滑滚动
      }
    }
    
    // 子路由变化时保持当前滚动位置
    return false;
  },
});

// 导出路由对象
export default router;
