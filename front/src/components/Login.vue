<script setup lang="ts">
import api from '@/lib/api';
import router from '@/router';
import { Loader2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Success from './alerts/Success.vue'

defineProps<{
  successRegister?: string | undefined
}>();

const processing = ref(false);
const errors = ref<ErrorDataType>();
const email = ref('');
const password = ref('');

interface ErrorDataType {
  [key: string]: string[]
}

function login() {
  processing.value = true;

  api.post('login', {
    email: email.value,
    password: password.value
  })
    .then(() => {
      errors.value = undefined;

      router.push({ name: 'Dashboard', replace: true });
    })
    .catch((res) => {
      if (res.status == 422) errors.value = res.response.data.errors;
      if (res.status == 401) errors.value = { error: [res.response.data.message] };
    })
    .finally(() => {
      processing.value = false;
    });
}
</script>

<template>
  <!-- component -->
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <Success v-if="successRegister"></Success>
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
      {{ successRegister ?? 'aowkaowkwaoakw' }}
      <form class="space-y-4" @submit.prevent="login">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="email">Email</Label>
          <Input v-model="email" type="email" id="email" placeholder="Masukkan email"
            :is-error="Boolean(errors && errors.email)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.email" v-for="error in errors.email">{{ error }}
          </p>
        </div>

        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="password">Password</Label>
          <Input v-model="password" type="password" id="password" placeholder="••••••••"
            :is-error="Boolean(errors && errors.password)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.password" v-for="error in errors.password">{{
            error }}</p>
          <p class="text-red-500 text-xs italic" v-if="errors && errors.error" v-for="error in errors.error">{{ error }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        </div>

        <Button @click="login" :disabled="processing"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="processing" />
          Login
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <span @click="router.push({ name: 'Register' })"
          class="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer">Sign up</span>
      </div>
    </div>
  </div>
</template>