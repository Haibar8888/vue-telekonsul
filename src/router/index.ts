import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import { useAuthStore } from '../stores/auth'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: '404' },
  },
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'login' },
    children: [
      {
        name: 'master',
        path: '/master',
        component: RouteViewComponent,
        children: [
          {
            name: 'doctors',
            path: 'doctors',
            meta: { requiresAuth: true },
            component: () => import('../pages/doctors/DoctorsPage.vue'),
          },
          {
            name: 'schedules',
            path: 'schedules',
            meta: { requiresAuth: true },
            component: () => import('../pages/users/UsersPage.vue'),
          },
        ],
      },
      {
        name: 'management-access',
        path: '/management-access',
        component: RouteViewComponent,
        children: [
          {
            name: 'users',
            path: 'users',
            meta: { requiresAuth: true },
            component: () => import('../pages/users/UsersPage.vue'),
          },
          {
            name: 'roles',
            path: 'roles',
            meta: { requiresAuth: true },
            component: () => import('../pages/roles/rolesPage.vue'),
          },
          {
            name: 'permission',
            path: 'permisions',
            meta: { requiresAuth: true },
            component: () => import('../pages/permisions/permisionPage.vue'),
          },
        ],
      },
      {
        name: 'opeartional',
        path: '/opeartional',
        component: RouteViewComponent,
        children: [
          {
            name: 'appointment',
            path: 'appointment',
            meta: { requiresAuth: true },
            component: () => import('../pages/users/UsersPage.vue'),
          },
          {
            name: 'transaction',
            path: 'transaction',
            meta: { requiresAuth: true },
            component: () => import('../pages/payments/PaymentsPage.vue'),
          },
        ],
      },
      {
        name: 'payments',
        path: '/payments',
        component: RouteViewComponent,
        children: [
          {
            name: 'payment-methods',
            path: 'payment-methods',
            component: () => import('../pages/payments/PaymentsPage.vue'),
          },
          {
            name: 'billing',
            path: 'billing',
            component: () => import('../pages/billing/BillingPage.vue'),
          },
          {
            name: 'pricing-plans',
            path: 'pricing-plans',
            component: () => import('../pages/pricing-plans/PricingPlans.vue'),
          },
        ],
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'settings',
        path: 'settings',
        meta: { requiresAuth: true },
        component: () => import('../pages/settings/Settings.vue'),
      },
      {
        name: 'preferences',
        path: 'preferences',
        component: () => import('../pages/preferences/Preferences.vue'),
      },
      {
        name: 'users',
        path: 'users',
        meta: { requiresAuth: true },
        component: () => import('../pages/users/UsersPage.vue'),
      },
      {
        name: 'chats',
        path: 'chats',
        meta: { requiresAuth: true },
        component: () => import('../pages/chat/chatPage.vue'),
      },
      {
        name: 'projects',
        path: 'projects',
        component: () => import('../pages/projects/ProjectsPage.vue'),
      },
      {
        name: 'payments',
        path: '/payments',
        component: RouteViewComponent,
        children: [
          {
            name: 'payment-methods',
            path: 'payment-methods',
            component: () => import('../pages/payments/PaymentsPage.vue'),
          },
          {
            name: 'billing',
            path: 'billing',
            component: () => import('../pages/billing/BillingPage.vue'),
          },
          {
            name: 'pricing-plans',
            path: 'pricing-plans',
            component: () => import('../pages/pricing-plans/PricingPlans.vue'),
          },
        ],
      },
      {
        name: 'faq',
        path: '/faq',
        component: () => import('../pages/faq/FaqPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        meta: { guestOnly: true },
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/RecoverPassword.vue'),
      },
      {
        name: 'recover-password-email',
        path: 'recover-password-email',
        component: () => import('../pages/auth/CheckTheEmail.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Jika user belum login dan mencoba mengakses halaman yang butuh autentikasi
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' }) // Redirect ke login
  }
  // Jika user sudah login dan mencoba mengakses halaman guest (login, signup)
  else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'dashboard' }) // Redirect ke dashboard
  } else {
    next() // Lanjutkan navigasi
  }
  // const authStore = useAuthStore()

  // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //   next('/login')
  // } else {
  //   next()
  // }
})

export default router
