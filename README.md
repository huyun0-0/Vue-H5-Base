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

## 目录结构
```
├── public                                    // 静态文件
├── src 
|  ├── api                                    // 存放api
|  ├── assets                                 // 资源文件
|  ├── components                             // 组件
|  ├── router                                 // 路由目录
|  ├── store                                  // 状态仓库
|  ├── style                                  // 公用样式
|  ├── utils                                  // 工具类、方法
|  ├── views                                  // 界面文件
|  ├── App.vue                                // 主界面文件
|  └── main.js                                // 入口文件
├── .browserslistrc                           // 浏览器适配
├── .env.development                          // 开发环境变量配置
├── .env.production                           // 生产环境变量配置
├── .eslintignore                             // eslint忽略文件配置
├── .eslintrc.js                              // eslint配置
├── .gitignore                                // git仓库忽略配置
├── .npmrc                                    // 配置npm源
├── babel.config.js                           // babel配置
├── package-lock.json
├── package.json
├── postcss.config.js                         // postcss配置
├── README.md
└── vue.config.js                             // vue-cli配置
```

### 移动端适配
在src/style/comm.scss, 设置了根元素的字体大小，原理和rem一样。由于viewport已经得到很好的支持，所以用viewport结合rem来进行移动端的适配。

- 根目录postcss.config.js文件配置postcss-pxtorem。
``` js
'postcss-pxtorem': {
  rootValue: 32,  // 按照根元素 32px进行rem转换
  unitPrecision: 5,
  propList: ['*', '!border'],  // 匹配值进行转换
  minPixelValue: 5,
  selectorBlackList: ['html']
}
```

- 忽略转换
```css
/* 不转换的另一种方式 -> 使用 Px */
.ignore{
  border: 1Px solid #000;
}
```

- comm.scss 设置根元素字体大小。（按照750px设计图计算）
``` css
  /* 100 / 750 得到1px = 0.13333...(vw) */
  /* 再乘以设置的rootValue 32 */
  html {
    font-size: 4.266666666vw;
  }
```

- 这样适配的好处在于终于不用动态适配根元素的font-size了，并且flexible.js也不在维护，推荐使用viewport适配方案。 而在使用postcss-px-to-viewport这种viewport适配方案的时候，遇到了在pc浏览时无法限制最大宽度，导致页面完全撑开无法浏览。所以，这样适配还有一个好处就是，即使在pc端，可以通过媒体查询限制html的宽度。
```css
@media (min-width: 640px) {
  html {
    max-width:640px;
    margin:0 auto;
    font-size:28px;
  }
}
```
- 使用
```css
.test{
  width: 750px;
  height: 750px;
}
```

### Vue-Router、Vuex的配置
- 使用require.context来配置，省去了每次新增文件还需import
```js
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
```js
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
```js
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
使用了最严格的的配置，如需修改请自行配置。参考[eslint](https://eslint.org/)，[eslint-plugin-vue](https://eslint.vuejs.org/)

- 详细配置请查看.eslintrc.js文件。

- 代码校验：husky + lint-staged。在每次commit的时候会执行校验，如不符合规则会自动执行eslint --fix自动修复。修复失败则会提示你错误。

- lint-staged 解决husky每次提交会校验所有的文件，而它只会校验你提交修改的部分。
``` js
// package.json

"husky": {
  "hooks": {
    "pre-commit": "lint-staged" // 提交到本地时进行校验
  }
},
"lint-staged": {
  "src/**/*.{js,vue}": [
    "eslint --fix",
    "git add"
  ]
},
```

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
