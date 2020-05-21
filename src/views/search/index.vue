<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索历史记录 -->
    <search-result class="search-result" v-if="isResultShow" />
    <!-- /搜索历史记录 -->

    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />
    <!-- /搜索建议 -->

    <!-- 历史记录 -->
    <search-history v-else />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-results'

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
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('val')
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
