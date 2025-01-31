<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { SignUp } from '@yuki/api/validators/auth'
import { toast } from '@yuki/ui/hooks/use-toast.vue'
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

import { api } from '@/lib/api'

const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationKey: ['signUp'],
  mutationFn: (data: SignUp) => api.auth.signUp.mutate(data),
  onError: (error) => toast({ variant: 'error', description: error.message }),
  onSuccess: async () => {
    toast({ variant: 'success', description: 'Sign up successfully!' })
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
        <fieldset class="space-y-2">
          <Label for="name">Name</Label>
          <Input v-model="formData.name" placeholder="Name" />
        </fieldset>

        <fieldset class="space-y-2">
          <Label for="email">Email</Label>
          <Input v-model="formData.email" placeholder="Email" />
        </fieldset>

        <fieldset class="space-y-2">
          <Label for="password">Password</Label>
          <Input v-model="formData.password" placeholder="Password" type="password" />
        </fieldset>

        <fieldset class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            v-model="formData.confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
        </fieldset>

        <p>
          Already have an account?
          <RouterLink to="/sign-in" class="hover:underline"> Login here </RouterLink>
        </p>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full" :disabled="isPending"> Register </Button>
      </CardFooter>
    </Card>
  </main>
</template>
