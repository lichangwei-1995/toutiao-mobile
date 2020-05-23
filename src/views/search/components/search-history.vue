<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <span
          class="delete"
          @click="searchHistory = []"
        >
          全部删除
        </span>
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="onDelete(item, index)"
    >
      <van-icon
        name="close"
        v-show="isDeleteShow"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onDelete (item, index) {
      if (this.isDeleteShow) {
        return this.searchHistory.splice(index, 1)
      }

      this.$emit('search', item)
    }
  }
}
</script>

<style scoped lang="less">
  .delete {
    margin-right: 10px;
  }
</style>
