import { createRouter, createWebHistory } from 'vue-router'

import { api } from '@/lib/api'

const routes = [
  { path: '/', component: () => import('./routes/home.vue') },
  { path: '/sign-up', component: () => import('./routes/auth/sign-up.vue') },
  { path: '/sign-in', component: () => import('./routes/auth/sign-in.vue') },
  { path: '/denied', component: () => import('./routes/auth/denied.vue') },
  { path: '/categories', component: () => import('./routes/categories.vue') },
  { path: '/customers', component: () => import('./routes/customers.vue') },
  { path: '/orders', component: () => import('./routes/orders.vue') },
  { path: '/products', component: () => import('./routes/products.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('./routes/not-found.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const session = await api.auth.getSession.query()

  if (!session.user && to.path !== '/sign-in' && to.path !== '/sign-up') next('/sign-in')
  else if (session.user?.role === 'USER' && to.path !== '/denied') next('/denied')
  next()
})

export { router }
