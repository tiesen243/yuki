<script setup lang="ts">
import { ref } from 'vue'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@yuki/ui/vue'

import { useSession } from '@/hooks/use-session'

const { signIn, isSigningIn } = useSession()

const formData = ref({
  email: '',
  password: '',
})

const handleSubmit = () => {
  signIn(formData.value)
}
</script>

<template>
  <main class="container grid min-h-[90dvh] place-items-center">
    <Card as="form" class="min-w-3/5" @submit.prevent="handleSubmit">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input v-model="formData.email" placeholder="Email" />
        <Input v-model="formData.password" placeholder="Password" type="password" />
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isSigningIn">
          Sign In
        </Button>
      </CardFooter>
    </Card>
  </main>
</template>
