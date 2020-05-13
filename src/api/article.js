/**
 * 文章请求模块
 */

import request from '@/untils/request'

// 加载文章数据列表
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
