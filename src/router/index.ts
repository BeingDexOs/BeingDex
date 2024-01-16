import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/dapp",
    name: "dapp",
    component: () => import("@/views/dapp/index.vue")
  },
  {
    path: "/swap",
    name: "swap",
    component: () => import("@/views/swap/index.vue")
  },
  {
    path: "/help/:id?",
    name: "help",
    component: () => import("@/views/helpCenter/index.vue")
  },
  {
    path: "/blogList",
    name: "blogList",
    meta: {
      keepAlive: true
    },
    component: () => import("@/views/blog/list.vue")
  },
  {
    path: "/blogDetail/:id",
    name: "blogDetail",
    component: () => import("@/views/blog/detail.vue")
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/views/notice/index.vue")
  },
  {
    path: "/noticeDetail/:id",
    name: "noticeDetail",
    component: () => import("@/views/notice/detail.vue")
  },
  {
    path: "/aboutUs",
    name: "aboutUs",
    component: () => import("@/views/about/index.vue")
  },
  {
    path: "/bdx",
    name: "bdx",
    component: () => import("@/views/bdx/index.vue")
  },
  {
    path: "/license",
    name: "license",
    component: () => import("@/views/license/index.vue")
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("@/views/wallet/index.vue")
  },
  {
    path: "/pluginwallet",
    name: "pluginwallet",
    component: () => import("@/views/wallet/pluginwallet.vue")
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("@/views/feedBack/index.vue")
  },
  {
    path: "/invite",
    name: "invite",
    component: () => import("@/views/invite/index.vue")
  },
  {
    path: "/apply",
    name: "apply",
    meta: {
      notShowFooters: true
    },
    component: () => import("@/views/apply/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
});

router.beforeEach((to, from) => {
  // console.log('from', from);
  // console.log('to', to);
  // if (from.name == 'b') {
  //   if (to.name == 'a') {
  //     from.matched.forEach(item => {
  //       item.meta.keepAlive = false
  //     })
  //   } else {
  //     from.matched.forEach(item => {
  //       item.meta.keepAlive = true
  //     })
  //   }
  // }

  // if (to.meta.title) {
  //   document.title = to.meta.title as string
  // } else {
  //   document.title = '默认标题'
  // }
})

export default router;