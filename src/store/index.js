import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

// 引入module
const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  modules[item.name] = item
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexPersistedstate()]
})
