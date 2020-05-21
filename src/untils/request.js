/**
 * 封装请求模块
 */

import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  // 基础路径
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已经登录，统一给接口设置 token 信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
