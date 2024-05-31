<script lang="ts" setup>
const email = ref<string>('')
const password = ref<string>('')
const authStore = useAuthStore()

const { isLogged } = storeToRefs(authStore)
const { onLogin } = authStore

const onSubmit = async (event: Event) => {
  event.preventDefault()
  
  await onLogin({ email: email.value, password: password.value })

  if (isLogged.value) {
    return await navigateTo('/')
  }
}
</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col py-6 gap-3">
    <h1 class="text-3xl font-bold">Login Page</h1>
    <form class="flex flex-col gap-4 items-end" @submit="onSubmit">
      <label for="email" class="w-full">
        <input v-model="email" type="email" name="email" id="email" class="w-full border-2 border-blue-400 p-2" placeholder="Email" />
      </label>
      <label for="password" class="w-full">
        <input v-model="password" type="password" name="password" id="password" class="w-full border-2 border-blue-400 p-2" placeholder="Password" />
      </label>
      <div class="flex gap-4 w-max items-center">
        <span>
          Belum punya akun?
          <NuxtLink to="/auth/login" class="text-blue-400"> Register</NuxtLink>
        </span>
        <button type="submit" class="bg-blue-400 px-4 py-2 w-max">Login</button>
      </div>
    </form>
  </div>
</template>
