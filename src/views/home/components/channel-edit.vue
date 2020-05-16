<template>
  <div class="channel-edit">
    <van-cell title="频道编辑">
      <van-button
        class="edit-btn"
        small
        round
        color="#f86363"
        plain
      >
        编辑
      </van-button>
    </van-cell>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-cell title="频道推荐" />
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
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
  .channel-edit {
    .van-cell__title {
      font-size: 16px;
      color: #333;
    }
    .edit-btn {
      height: 24px;
    }
  }
</style>
