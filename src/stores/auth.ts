import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '../services/apis'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage('user', null),
    token: useStorage('token', null),
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)

        this.$patch({
          user: response.data.user,
          token: response.data.success.token,
        })

        console.log('Login sukses, token:', this.token) // Debugging
      } catch (error) {
        console.error('Login gagal:', error.response?.data?.message || error.message)
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Logout gagal:', error)
      } finally {
        this.$reset() // Reset state ke nilai awal
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
