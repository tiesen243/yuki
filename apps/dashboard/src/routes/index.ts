import { createRouter, createWebHistory } from 'vue-router'

import { api } from '@/lib/api'
import DeniedPage from './auth/denied.vue'
import SignInPage from './auth/sign-in.vue'
import SignUpPage from './auth/sign-up.vue'
import CategoriesPage from './categories.vue'
import CustomersPage from './customers.vue'
import HomePage from './home.vue'
import NotFoundPage from './not-found.vue'
import OrdersPage from './orders.vue'
import ProductsPage from './products.vue'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const routes = [
  { path: '/', component: HomePage },
  { path: '/sign-up', component: SignUpPage },
  { path: '/sign-in', component: SignInPage },
  { path: '/denied', component: DeniedPage },
  { path: '/categories', component: CategoriesPage },
  { path: '/customers', component: CustomersPage },
  { path: '/orders', component: OrdersPage },
  { path: '/products', component: ProductsPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const session = await api.auth.getSession.query()

  if (!session.user && to.path !== '/sign-in' && to.path !== '/sign-up') next('/sign-in')
  else if (session.user?.role === 'USER' && to.path !== '/denied') next('/denied')
  else if (to.path === '/sign-in' || to.path === '/sign-up' || to.path === '/denied')
    next('/')
  next()
})

export { router }
