import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),

    children: [
      // { path: "", redirect: { name: "About" } },
      // {
      //   path: '/:pathMatch(.*)*',
      //   name: "AboutView",
      //   // redirect: { name: "About" },
      //   component: () => import("../pages/About.vue"),
      // },
      {
        path: ":universitatea/:facultatea",
        // path: ":id/:universitatea/:facultatea",
        name: "AboutView",
        component: () => import("../pages/About.vue"),
      },
    ],
  },
  {
    path: "/partners",
    name: "partners",
    meta: { layout: "main" },
    component: () => import("../pages/Partners.vue"),
    children: [
      {
        path: ":id(\\d+)",
        name: "partner",
        component: () => import("../pages/Partner.vue"),
      },
    ],
  },
  {
    path: "/partner/:id(\\d+)",
    name: "partner",
    component: () => import("../pages/Partner.vue"),
  },
  {
    path: "/campaingas",
    name: "Campaingas",
    component: () => import("../pages/EmailCampaigns.vue"),
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () => import("../pages/Contacts.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../pages/Dashboard.vue"),
  },
  {
    path: "/leads",
    name: "leads",
    component: () => import("../pages/Leads.vue"),
  },
  {
    path: "/opportunities",
    name: "opportunities",
    component: () => import("../pages/Opportunities.vue"),
  },
  {
    path: "/offers",
    name: "offers",
    component: () => import("../pages/Opportunities.vue"),
  },
  // {
  //   path: "/reports",
  //   name: "Reports",
  //   component: () => import("../pages/Reports.vue"),
  // },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../pages/Settings.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../pages/Tasks.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "EmptyLayout" },
    component: () => import("../views/Login"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
