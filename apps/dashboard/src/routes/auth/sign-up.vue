<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { SignUp } from '@yuki/api/validators/auth'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  toast,
} from '@yuki/ui/vue'

import { api } from '@/lib/api'

const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationKey: ['signUp'],
  mutationFn: (data: SignUp) => api.auth.signUp.mutate(data),
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: async () => {
    toast.success('Sign up successfully!')
    await router.push('/auth/sign-in')
  },
})

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = () => {
  mutate(formData.value)
}
</script>

<template>
  <main class="container grid min-h-[90dvh] place-items-center">
    <Card as="form" class="w-full max-w-xl" @submit.prevent="handleSubmit">
      <CardHeader>
        <CardTitle>Sign Up a New Account</CardTitle>
        <CardDescription>
          Fill in the form below to create a new account. Your default avatar will be
          gravatars based on your email.
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <Input v-model="formData.name" placeholder="Name" />
        <Input v-model="formData.email" placeholder="Email" />
        <Input v-model="formData.password" placeholder="Password" type="password" />
        <Input
          v-model="formData.confirmPassword"
          placeholder="Confirm Password"
          type="password"
        />

        <p>
          Already have an account?
          <RouterLink to="/auth/sign-in" class="hover:underline">
            Login here
          </RouterLink>
        </p>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isPending">
          Register
        </Button>
      </CardFooter>
    </Card>
  </main>
</template>
