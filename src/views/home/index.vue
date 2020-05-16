<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-navbar">
      <van-button
        class="search-btn"
        slot="title"
        size="small"
        round
        icon="search"
      >
       搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <van-tabs v-model="active" class="article-channel">
      <van-tab
        class="channel-item"
        :title="channel.name"
        v-for="(channel, index) in channels"
        :key="index"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="wap-right"></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="channeledit-icon"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- /文章频道列表 -->

    <!-- 弹出层 -->
    <van-popup
      class="channel-popup"
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="top"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :user-channels="channels"
      />
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import {
  getUserChannels
} from '@/api/user'

import ArticleList from './components/article-list'

import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      channels: [],
      active: 0,
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const res = await getUserChannels()
      this.channels = res.data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .app-navbar {
    background-color: #3296fa;
    .search-btn {
      width: 275px;
      height: 32px;
      border: 0;
      background: rgba(255, 255, 255, .2);
      color: #fff;
    }
  }
  .article-channel {
    /deep/ .van-tabs__line {
        width: 15px !important;
        height: 3px;
        background-color: #3296fa;
        border-radius: 4px;
        bottom: 20px;
      }
  }
  .channel-popup {
    padding-top: 50px;
    box-sizing: border-box;
  }
  .wap-right {
    width: 33px;
    flex-shrink: 0;
  }
  .channeledit-icon {
    position: fixed;
    right: 0;
    width: 33px;
    background-color: rgba(255, 255, 255, .9);
    height: 44px;
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    border-left: 1px solid #eee;
  }
</style>
