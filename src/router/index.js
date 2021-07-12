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
      {
        path: ":universitatea/:facultatea",
        name: "AboutView",
        component: () => import("../pages/About.vue"),
      },
    ],
  },
  {
    path: "/actions",
    name: "actions",
    component: () => import("../pages/Actions.vue"),
  },
  {
    path: "/partners",
    name: "partners",
    meta: { layout: "main" },
    component: () => import("../pages/Partners.vue"),
  },
  {
    path: "/partner/:id(\\d+)",
    name: "partner",
    component: () => import("../pages/Partner.vue"),
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
    path: "/lead/:id(\\d+)",
    name: "lead",
    component: () => import("../pages/Lead.vue"),
  },
  {
    path: "/opportunities",
    name: "opportunities",
    component: () => import("../pages/Opportunities.vue"),
  },
  {
    path: "/opportunity/:id(\\d+)",
    name: "opportunity",
    component: () => import("../pages/Opportunity.vue"),
  },
  {
    path: "/offers",
    name: "offers",
    component: () => import("../pages/Offers.vue"),
  },
  {
    path: "/offer/:id(\\d+)",
    name: "offer",
    component: () => import("../pages/Offer.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../pages/Settings.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../pages/TodeleteValidateTestPage.vue"),
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
