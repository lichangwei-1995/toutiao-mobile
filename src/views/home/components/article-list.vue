<template>
  <div class="articel-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="加载失败了"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in articlelist" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // 频道对象
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articlelist: [],
      loading: false,
      isLoading: false,
      finished: false,
      timestamp: null, // 时间戳
      error: false,
      refreshSuccessText: '' // 刷新成功提示
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        console.log(data)

        // 将数据添加到list数组中
        const { results } = data.data
        this.articlelist.push(...results)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        // 关闭loading提示
        this.loading = false
        // 开启错误提示
        this.error = true
      }
    },

    async onRefresh () {
      // console.log(111)
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      // 往数据顶部追加数据
      const { results } = data.data
      this.articlelist.unshift(...results)

      // 加载状态结束
      this.isLoading = false

      // 刷新成功提示
      this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
  .articel-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
