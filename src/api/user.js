import Http from '@/utils/request'
const http = new Http() // 多个服务时，实例化时可传入baseURL

export const getUserInfo = params => http.request({
  method: 'get',
  url: '/api',
  params
})

export const getUserInfo2 = params => http.get('/api', params)

export const login = data => http.post('/api', data)
