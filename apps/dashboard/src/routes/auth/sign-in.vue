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
import { Label } from '@yuki/ui/vue/label'

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
        <fieldset class="space-y-2">
          <Label for="email">Email</Label>
          <Input v-model="formData.email" placeholder="Email" />
        </fieldset>

        <fieldset class="space-y-2">
          <Label for="password">Password</Label>
          <Input v-model="formData.password" placeholder="Password" type="password" />
        </fieldset>

        <p>
          Don't have an account?
          <RouterLink to="/sign-up" class="hover:underline"> Register now </RouterLink>
        </p>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isSigningIn"> Login </Button>
      </CardFooter>
    </Card>
  </main>
</template>
