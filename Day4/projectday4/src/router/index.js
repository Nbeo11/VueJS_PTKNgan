import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Page',
      component: () => import('../views/Page.vue'), // Đường dẫn đến Page.vue
    },
    {
      name: 'Exercise1',
      path: '/exercise1',
      component: () => import('../views/Exercise1/App.vue'),
    },
    {
      name: 'Exercise2',
      path: '/exercise2',
      component: () => import('../views/Exercise2/Exercise2.vue'),
    },
    {
      name: 'Exercise3',
      path: '/exercise3',
      component: () => import('../views/Exercise3/Exercise3.vue'),
    },
    {
      name: 'Exercise4',
      path: '/exercise4',
      component: () => import('../views/Exercise4/Exercise4.vue'),
    },
    {
      name: 'Exercise5',
      path: '/exercise5',
      component: () => import('../views/Exercise5/Exercise5.vue'),
    },
    {
      name: 'Exercise6',
      path: '/exercise6',
      component: () => import('../views/Exercise6/Exercise6.vue'),
    },
    {
      name: 'Exercise7',
      path: '/exercise7',
      component: () => import('../views/Exercise7/Exercise7.vue'),
    },
    {
      name: 'Exercise8',
      path: '/exercise8',
      component: () => import('../views/Exercise8/Exercise8.vue'),
    },
    {
      name: 'Exercise9',
      path: '/exercise9',
      component: () => import('../views/Exercise9/Exercise9.vue'),
    },
    {
      name: 'Exercise10',
      path: '/exercise10',
      component: () => import('../views/Exercise10/Exercise10.vue'),
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'ErrorView',
    //   component: () => import('../views/Error.vue'),
    // },
  ],
})

export default router
