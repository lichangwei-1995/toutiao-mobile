<template>
  <div class="channel-edit">
    <van-cell title="频道编辑" :border="false">
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
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
    <van-cell title="频道推荐" :border="false" />
    <van-grid>
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannel: []
    }
  },
  computed: {
    // 推荐频道
    recommendChannels () {
      return this.allChannel.filter(item => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === item.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const res = await getAllChannels()
      console.log(res)
      this.allChannel = res.data.data.channels
    }
  }
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
    .channel-item {
      height: 43px;
      padding: 10px;
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          color: #222;
          font-size: 12px;
        }
      }
    }
  }
</style>
