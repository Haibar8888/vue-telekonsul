<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      New to Vuestic?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</RouterLink>
    </p>

    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />

    <VaInput
      v-model="formData.password"
      :rules="[validators.required]"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="mb-4"
      label="Password"
    >
      <template #appendInner>
        <VaIcon
          :name="isPasswordVisible ? 'mso-visibility_off' : 'mso-visibility'"
          class="cursor-pointer"
          color="secondary"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </VaInput>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="Keep me signed in on this device" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        Forgot password?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" :loading="loading" @click="submit"> Login </VaButton>
    </div>
  </VaForm>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const form = ref(null)
const isPasswordVisible = ref(false)

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = async () => {
  if (!(await form.value?.validate())) {
    toast.init({ message: 'Please fill in all required fields.', color: 'warning' })
    return
  }

  try {
    loading.value = true
    await authStore.login({ email: formData.email, password: formData.password })

    // Tunggu state terupdate
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log('Redirect ke:', router.currentRoute.value.query.redirect || '/dashboard')
    router.push(router.currentRoute.value.query.redirect || '/dashboard')

    toast.init({ message: "You've successfully logged in", color: 'success' })
  } catch (error) {
    toast.init({ message: error.response?.data?.msg || 'Login failed', color: 'danger' })
    console.error('Login gagal:', error)
  } finally {
    loading.value = false
  }

  // try {
  //   loading.value = true
  //   await authStore.login({ email: formData.email, password: formData.password })
  //   toast.init({ message: "You've successfully logged in", color: 'success' })

  //   // Redirect ke halaman sebelumnya atau ke dashboard
  //   router.push(router.currentRoute.value.query.redirect || '/dashboard')
  // } catch (error) {
  //   const errorMessage = error.response?.data?.msg || error.message || 'Login failed'
  //   toast.init({ message: errorMessage, color: 'danger' })
  //   console.error('Login gagal:', error)
  // } finally {
  //   loading.value = false
  // }
}
</script>
