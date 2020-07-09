export default [
  {
    path: '/',
    name: 'Home',
    // webpackChunkName 路由懒加载
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/personal.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  }
]
