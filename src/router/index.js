import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 引入routes
const files = require.context('.', false, /\.js$/)
const routes = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  routes.push(...item)
})

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.token && to.meta.auth) next({ name: 'Login' })
  else next()
})
export default router
