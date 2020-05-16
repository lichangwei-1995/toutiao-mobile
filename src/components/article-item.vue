<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div
        class="cover-wrap"
        v-if="article.cover.type === 3"
      >
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      class="right-image"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
  .article-item {
    .title {
      font-size: 16px;
      color: #3a3a3a;
    }
    /deep/ .van-cell__value {
      flex: unset;
      width: 116px;
      height: 73px;
    }
    .right-image {
      width: 116px;
      height: 73px;
    }
    .label-info {
      margin-top: 12px;
      span {
        font-size: 12px;
        color: #b4b4b4;
        margin-right: 8px;
      }
    }
    .cover-wrap {
      display: flex;
      padding: 15px 0;
      .cover-item {
        flex: 1;
        &:not(last-child) {
          margin-right: 5px;
        }
        .cover-item-img {
          width: 100%;
          height: 76px;
        }
      }
    }
  }
</style>
