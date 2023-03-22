import { createRouter, createWebHistory } from "vue-router";

import defaultLayout from "../layouts/default.vue";

const routes = [
  {
    path: "/",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/Home.vue"),
      },
    ],
  },
  {
    path: "/about",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "about",
        component: () => import("../pages/About.vue"),
      },
    ],
  },
  {
    path: "/project",
    component: defaultLayout,
    children: [
      {
        path: "/project/:id",
        name: "project",
        component: () => import("../pages/project/_id.vue"),
      },
    ],
  },
  {
    path: "/settings",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "settings",
        component: () => import("../pages/Settings.vue"),
      },
    ],
  },
  {
    path: "/explore",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "explore",
        component: () => import("../pages/Explore.vue"),
      },
    ],
  },
  {
    path: "/create",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "create",
        component: () => import("../pages/Create.vue"),
      },
    ],
  },
  {
    path: "/auth_callback",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "auth_callback",
        component: () => import("../pages/Auth_Callback.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
