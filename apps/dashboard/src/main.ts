import '@/globals.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from '@/App.vue'
import { queryClientConfigs } from '@/lib/query-client'
import { routes } from '@/routes'

const app = createApp(App)

app.use(VueQueryPlugin, queryClientConfigs)

app.use(routes)
app.mount('#app')
