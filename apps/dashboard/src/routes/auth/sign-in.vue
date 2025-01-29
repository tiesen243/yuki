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
    <Card as="form" class="w-full max-w-xl" @submit.prevent="handleSubmit">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input v-model="formData.email" placeholder="Email" />
        <Input v-model="formData.password" placeholder="Password" type="password" />

        <p>
          Don't have an account?
          <RouterLink to="/auth/sign-up" class="hover:underline">
            Register now
          </RouterLink>
        </p>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isSigningIn"> Login </Button>
      </CardFooter>
    </Card>
  </main>
</template>
