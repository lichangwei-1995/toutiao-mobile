<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索历史记录 -->
    <search-result
      class="search-result"
      v-if="isResultShow"
      :q="searchText"
    />
    <!-- /搜索历史记录 -->

    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /搜索建议 -->

    <!-- 历史记录 -->
    <search-history
      :search-history="searchHistory"
      v-else
      @search="onSearch"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-results'

import { setItem, getItem } from '@/untils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('search-history') || []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      // 去除重复的搜索记录 --- indexOf
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }

      this.searchHistory.unshift(searchText)
      // 用户登录情况下 搜索记录自动保存到线上
      // 未登录情况下 储存到本地
      setItem('search-history', this.searchHistory)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
  .search-container {
    /deep/ .van-search__action {
      color: #fff;
      font-size: 14px;
    }
    .search-result {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 54px;
      overflow-y: auto;
    }
  }
</style>
