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
// 批量修改用户频道列表
export const addUserChannels = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
// 删除用户指定频道
export const deleteUserChannels = ChannelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${ChannelId}`
  })
}
