<script setup lang="ts">
import { CircleCheck } from 'lucide-vue-next';

defineProps<{
    title?: string
    message?: string
}>();
</script>

<template>
    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert">
        <CircleCheck :size="20" class="me-2" />
        <div>
            <span class="font-medium">{{ title ?? 'Success!' }}</span> {{ message ?? 'Berhasil' }}
        </div>
    </div>
</template>