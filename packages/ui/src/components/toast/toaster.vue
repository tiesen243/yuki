<script setup lang="ts">
import { isVNode } from 'vue'

import { useToast } from '@yuki/ui/hooks/use-toast.vue'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './index.vue'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <CircleCheckIcon v-if="toast.variant === 'success'" size="{20}" />
      <CircleAlertIcon v-if="toast.variant === 'warning'" size="{20}" />
      <InfoIcon v-if="toast.variant === 'info'" size="{20}" />
      <TriangleAlertIcon v-if="toast.variant === 'error'" size="{20}" />

      <div class="grid grow gap-1">
        <ToastTitle v-if="toast.title">
          {{ toast.title }}
        </ToastTitle>
        <template v-if="toast.description">
          <ToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </ToastDescription>
          <ToastDescription v-else>
            {{ toast.description }}
          </ToastDescription>
        </template>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
