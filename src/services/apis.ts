import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // Ganti dengan URL backend kamu
  headers: {
    'Content-Type': 'application/json',
  },
})

// Tambahkan interceptor untuk menyisipkan token di setiap request
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
