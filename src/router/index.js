import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'MainLayout' },
    component: Home
  },
  {
    path: '/partners',
    name: 'Partners',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Partners.vue')
  },
  {
    path: '/campaingas',
    name: 'Campaingas',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/EmailCampaigns.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Contacts.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/leads',
    name: 'Leads',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Leads.vue')
  },
  {
    path: '/opportunities',
    name: 'Opportunities',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Opportunities.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Reports.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Settings.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/Tasks.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'MainLayout' },
    component: () => import('../pages/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'EmptyLayout' },
    component: () => import('../views/Login')
  },
  {
    path: '/about',
    meta: {layout: 'MainLayout' },
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
