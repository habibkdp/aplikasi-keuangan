<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  isError?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue"
    :class="cn('bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 px-3 py-2 transition duration-300 ease focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-slate-50 hover:border-blue-600 shadow-sm focus:shadow', props.class, props.isError ? 'border-red-400 hover:border-red-600 focus:ring-red-300' : '')">
</template>
