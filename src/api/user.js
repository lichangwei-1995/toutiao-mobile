/**
 * 用户相关请求模块
 */
import request from '@/untils/request'

// 用户登录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}