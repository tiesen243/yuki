import '@/globals.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import SignInPage from './routes/auth/sign-in.vue'
import SignUpPage from './routes/auth/sign-up.vue'
import CategoriesPage from './routes/categories.vue'
import CustomersPage from './routes/customers.vue'
import HomePage from './routes/home.vue'
import NotFoundPage from './routes/not-found.vue'
import OrdersPage from './routes/orders.vue'
import ProductsPage from './routes/products.vue'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const routes = [
  { path: '/', component: HomePage },
  { path: '/auth/sign-up', component: SignUpPage },
  { path: '/auth/sign-in', component: SignInPage },
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(VueQueryPlugin).mount('#app')
