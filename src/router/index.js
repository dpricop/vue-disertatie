import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'MainLayout' },
    component: Home
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
