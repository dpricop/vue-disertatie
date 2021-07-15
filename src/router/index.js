import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import authorization from "./authorization";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),
    beforeEnter: authorization,
    children: [
      {
        path: ":universitatea/:facultatea",
        name: "AboutView",
        component: () => import("../pages/About.vue"),
        beforeEnter: authorization,
      },
    ],
  },
  {
    path: "/actions",
    name: "actions",
    component: () => import("../pages/Actions.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/partners",
    name: "partners",
    meta: { layout: "main" },
    component: () => import("../pages/Partners.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/partner/:id(\\d+)",
    name: "partner",
    component: () => import("../pages/Partner.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../pages/Dashboard.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/leads",
    name: "leads",
    component: () => import("../pages/Leads.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/lead/:id(\\d+)",
    name: "lead",
    component: () => import("../pages/Lead.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/opportunities",
    name: "opportunities",
    component: () => import("../pages/Opportunities.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/opportunity/:id(\\d+)",
    name: "opportunity",
    component: () => import("../pages/Opportunity.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/offers",
    name: "offers",
    component: () => import("../pages/Offers.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/offer/:id(\\d+)",
    name: "offer",
    component: () => import("../pages/Offer.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../pages/Settings.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../pages/TodeleteValidateTestPage.vue"),
    beforeEnter: authorization,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "EmptyLayout" },
    component: () => import("../views/Login"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
