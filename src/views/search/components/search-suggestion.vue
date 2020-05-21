<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :title="item"
      v-for="(item, index) in suggestions"
      :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // searchText () {
    //   console.log(111)
    // }
    searchText: {
      handler: debounce(async function () {
        const res = await getSearchSuggestion(this.searchText)
        // console.log(res)
        this.suggestions = res.data.data.options
      }, 500),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
