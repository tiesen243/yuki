<template>
  <main class="grid min-h-[90dvh] place-items-center">
    <Card as="form" @submit.prevent="signIn(formData)">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input
          v-model="formData.email"
          type="email"
          placeholder="Email"
          :disabled="isSigning"
          required
        />
        <Input
          v-model="formData.password"
          type="password"
          placeholder="Password"
          :disabled="isSigning"
          required
        />
      </CardContent>

      <CardFooter>
        <Button class="w-full" :disabled="isSigning">Sign In</Button>
      </CardFooter>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@yuki/ui/vue/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@yuki/ui/vue/card'
import { Input } from '@yuki/ui/vue/input'

import { useSession } from '@/hooks/use-session'

const { signIn, isSigning } = useSession()
const formData = ref({
  email: '',
  password: '',
})
</script>
