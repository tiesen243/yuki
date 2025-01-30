import '@/globals.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './routes'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(VueQueryPlugin).mount('#app')
