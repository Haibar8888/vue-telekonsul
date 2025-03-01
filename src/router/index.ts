import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import { useAuthStore } from '../stores/auth'
import { nextTick } from 'vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes = [
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
        meta: { requiresAuth: true },
        children: [
          {
            name: 'doctors',
            path: 'doctors',
            component: () => import('../pages/doctors/DoctorsPage.vue'),
          },
          {
            name: 'schedules',
            path: 'schedules',
            component: () => import('../pages/users/UsersPage.vue'),
          },
        ],
      },
      {
        name: 'management-access',
        path: '/management-access',
        component: RouteViewComponent,
        meta: { requiresAuth: true },
        children: [
          {
            name: 'users',
            path: 'users',
            component: () => import('../pages/users/UsersPage.vue'),
          },
          {
            name: 'roles',
            path: 'roles',
            component: () => import('../pages/roles/rolesPage.vue'),
          },
          {
            name: 'permission',
            path: 'permissions',
            component: () => import('../pages/permisions/permisionPage.vue'),
          },
        ],
      },
      {
        name: 'operational',
        path: '/operational',
        component: RouteViewComponent,
        meta: { requiresAuth: true },
        children: [
          {
            name: 'appointment',
            path: 'appointment',
            component: () => import('../pages/users/UsersPage.vue'),
          },
          {
            name: 'transaction',
            path: 'transaction',
            component: () => import('../pages/payments/PaymentsPage.vue'),
          },
        ],
      },
      {
        name: 'payments',
        path: '/payments',
        component: RouteViewComponent,
        meta: { requiresAuth: true },
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
        component: () => import('../pages/settings/Settings.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'preferences',
        path: 'preferences',
        component: () => import('../pages/preferences/Preferences.vue'),
      },
      {
        name: 'chats',
        path: 'chats',
        component: () => import('../pages/chat/chatPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'projects',
        path: 'projects',
        component: () => import('../pages/projects/ProjectsPage.vue'),
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
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  await nextTick()

  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
