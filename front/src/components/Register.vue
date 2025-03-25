<script setup lang="ts">
import api from '@/lib/api';
import router from '@/router';
import { Loader2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const processing = ref(false);
const errors = ref<ErrorDataType>();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

interface ErrorDataType {
  [key: string]: string[]
}

function register() {
  processing.value = true;

  api.post('register', {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  })
    .then(() => {
      errors.value = undefined;

      router.push({ name: 'Login', replace:true });
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
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Registrasi</h2>

      <form class="space-y-4" @submit.prevent="register">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="nama">Nama Lengkap</Label>
          <Input v-model="name" type="text" id="nama" placeholder="Masukkan nama lengkap" :is-error="Boolean(errors && errors.name)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.name" v-for="error in errors.name">{{ error }}</p>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="email">Email</Label>
          <Input v-model="email" type="email" id="email" placeholder="Masukkan email" :is-error="Boolean(errors && errors.email)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.email" v-for="error in errors.email">{{ error }}</p>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="password">Password</Label>
          <Input v-model="password" type="password" id="password" placeholder="Masukkan password" :is-error="Boolean(errors && errors.password)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.password" v-for="error in errors.password">{{ error }}</p>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="password_confirmation">Re-Password</Label>
          <Input v-model="password_confirmation" type="password" id="password_confirmation" placeholder="Masukkan ulang password" :is-error="Boolean(errors && errors.password_confirmation)" />
          <p class="text-red-500 text-xs italic" v-if="errors && errors.password" v-for="error in errors.password">{{ error }}</p>
        </div>

        <Button @click="register" :disabled="processing"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="processing" />
          Submit
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <a @click="router.push({name: 'Login'})" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</a>
      </div>
    </div>
  </div>
</template>