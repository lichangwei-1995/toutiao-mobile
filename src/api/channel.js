/**
 * 频道相关请求模块
 */

import request from '@/untils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
