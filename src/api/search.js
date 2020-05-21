/**
 * 搜索请求模块
 */

import request from '@/untils/request'

export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    data: {
      q
    }
  })
}