import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/partners',
    name: 'Partners',
    meta: {layout: 'main' },
    component: () => import('../pages/Partners.vue')
  },
  {
    path: '/campaingas',
    name: 'Campaingas',
    component: () => import('../pages/EmailCampaigns.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../pages/Contacts.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/leads',
    name: 'Leads',
    component: () => import('../pages/Leads.vue')
  },
  {
    path: '/opportunities',
    name: 'Opportunities',
    component: () => import('../pages/Opportunities.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../pages/Reports.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../pages/Tasks.vue')
  },
  {
    path: '/about',
    name: 'About',
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
    name: 'About',
    component: () => import('../pages/About.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
