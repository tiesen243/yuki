import { createRouter, createWebHistory } from 'vue-router'

export const routes = createRouter({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./pages/index.vue') },
    { path: '/categories', component: () => import('./pages/index.vue') },
    { path: '/products', component: () => import('./pages/index.vue') },
    { path: '/orders', component: () => import('./pages/index.vue') },
    { path: '/customers', component: () => import('./pages/index.vue') },
  ],
})
