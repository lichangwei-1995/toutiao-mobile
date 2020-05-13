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
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >

      </van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
import {
  getUserChannels
} from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [],
      active: 0
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
</style>
