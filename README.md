# Vue的移动端项目基础架构

架构包含：Vue、Vue-router、Vuex、axios、vue-cli、eslint、postcss

做了如下几件事：
1. 移动端适配(viewport + postcss-pxtorem)
2. 基于axios的request封装
3. router 和 store 基础搭建
4. eslint规则配置
5. vue.config 简单的配置、基础的环境配置
6. 基本的示例

未包含UI框架，如有需要请自行添加。

### 移动端适配
在src/style/comm.scss, 设置了根元素的字体大小，原理和rem一样。由于viewport已经得到很好的支持，所以用viewport结合rem，是目前移动端适配最好的解决方案。

- 根目录postcss.config.js文件配置postcss-pxtorem。可以直接按照设计图1:1的像素单位适配。
```
'postcss-pxtorem': {
  rootValue: 32,  // 按照根元素 32px进行rem转换
  unitPrecision: 5,
  propList: ['*'],
  minPixelValue: 5,
  selectorBlackList: ['html']
}
```

- comm.scss 设置根元素字体大小
```
  // 100vw / 750px 得到1px = 0.13333...
  // 再乘以设置的rootValue 32px
  font-size: 4.266666666vw;
```

这样适配的好处在于即时在pc端，可以通过媒体查询限制html的宽度。
```
@media (min-width: 640px) {
  html {
    max-width:640px;
    margin:0 auto;
    font-size:28px;
  }
}
```

### Vue-Router、Vuex的配置
- 使用require.context来配置，省去了每次新增文件还需import
```
// 引入routes
const files = require.context('.', false, /\.js$/)
const routes = []
files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  routes.push(...item)
})


// 引入Vuex 的module
const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  modules[item.name] = item
})

// 每个 modules的key定义在文件里的name
export default {
  name: 'user',
  namespaced: true, // 命名空间
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}
```

### Vuex 持久化
使用插件[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme)做本地持久化
```
import vuexPersistedstate from 'vuex-persistedstate'
export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexPersistedstate()] // vuex插件
})
```

### Http请求
基于axios进行了简单了封装，可自行进行扩展。详见/src/utils/request
- 使用
```
import Http from '@/utils/request'
const http = new Http() // 多个服务时，实例化时可传入baseURL

export const getUserInfo = params => http.request({
  method: 'get',
  url: '/api',
  params
})

// get
export const getUserInfo2 = params => http.get('/api', params)
// post
export const login = data => http.post('/api', data)

```

### Eslint
使用了最严格的的配置，如需修改请自行配置。参考[eslint-plugin-vue](https://eslint.vuejs.org/)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
