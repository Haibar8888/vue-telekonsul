export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    // master
    {
      name: 'Master',
      displayName: 'Master',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'doctors',
          displayName: 'Doctors',
          meta: {
            icon: 'group',
          },
        },
        {
          name: 'schedules',
          displayName: 'schedules',
          meta: {
            icon: 'group',
          },
        },
      ],
    },
    // management access
    {
      name: 'management-access',
      displayName: 'Management Access',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'users',
          displayName: 'menu.users',
          meta: {
            icon: 'group',
          },
        },
        {
          name: 'permission',
          displayName: 'Permisions',
          meta: {
            icon: 'group',
          },
        },
        {
          name: 'roles',
          displayName: 'Roles',
          meta: {
            icon: 'group',
          },
        },
      ],
    },
    // operational
    {
      name: 'opeartional',
      displayName: 'Opeartional',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'appointment',
          displayName: 'Appointment',
          meta: {
            icon: 'group',
          },
        },
        {
          name: 'transaction',
          displayName: 'Transaction',
          meta: {
            icon: 'group',
          },
        },
      ],
    },
    {
      name: 'chats',
      displayName: 'chats',
      meta: {
        icon: 'group',
      },
    },
    // {
    //   name: 'projects',
    //   displayName: 'menu.projects',
    //   meta: {
    //     icon: 'folder_shared',
    //   },
    // },
    // {
    //   name: 'payments',
    //   displayName: 'menu.payments',
    //   meta: {
    //     icon: 'credit_card',
    //   },
    //   children: [
    //     {
    //       name: 'payment-methods',
    //       displayName: 'menu.payment-methods',
    //     },
    //     {
    //       name: 'pricing-plans',
    //       displayName: 'menu.pricing-plans',
    //     },
    //     {
    //       name: 'billing',
    //       displayName: 'menu.billing',
    //     },
    //   ],
    // },
    // {
    //   name: 'auth',
    //   displayName: 'menu.auth',
    //   meta: {
    //     icon: 'login',
    //   },
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login',
    //     },
    //     {
    //       name: 'signup',
    //       displayName: 'menu.signup',
    //     },
    //     {
    //       name: 'recover-password',
    //       displayName: 'menu.recover-password',
    //     },
    //   ],
    // },

    // {
    //   name: 'faq',
    //   displayName: 'menu.faq',
    //   meta: {
    //     icon: 'quiz',
    //   },
    // },
    // {
    //   name: '404',
    //   displayName: 'menu.404',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    // },
    // {
    //   name: 'preferences',
    //   displayName: 'menu.preferences',
    //   meta: {
    //     icon: 'manage_accounts',
    //   },
    // },
    // {
    //   name: 'settings',
    //   displayName: 'menu.settings',
    //   meta: {
    //     icon: 'settings',
    //   },
    // },
  ] as INavigationRoute[],
}
