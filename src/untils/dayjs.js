import Vue from 'vue'
import dayjs from 'dayjs'

// 配置中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn') // 全局使用

dayjs.extend(relativeTime)

// 设置过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
