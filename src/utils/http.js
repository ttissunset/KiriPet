import axios from 'axios'

import router from '@/router/index'

// 创建axios实例
const http = axios.create({
  // 设置根地址
  baseURL: 'http://localhost:3000',
  // 设置响应时间
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// axios请求拦截器
// http.interceptors.request.use((e) => Promise.reject(e))

// axios响应式拦截器
// http.interceptors.response.use((e) => Promise.reject(e))

export default http
