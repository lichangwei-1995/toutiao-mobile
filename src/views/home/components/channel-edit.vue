<template>
  <div class="channel-edit">
    <van-cell title="频道编辑" :border="false">
      <van-button
        class="edit-btn"
        small
        round
        color="#f86363"
        plain
        @click="isEditShow = !isEditShow"
      >
        {{ isEditShow ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        class="channel-item"
        :class="{ active: index === active }"
        :icon="(isEditShow && index !== 0) ? 'close' : '' "
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell title="频道推荐" :border="false" />
    <van-grid>
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '@/api/channel'

import { mapState } from 'vuex'
import { setItem } from '@/untils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannel: [],
      isEditShow: false // 控制我的频道中按钮编辑状态
    }
  },
  computed: {
    ...mapState(['user']),
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
      this.allChannel = res.data.data.channels
    },

    async onAddChannel (channel) {
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 登录则数据存储到线上
        await addUserChannels({
          channels: [{
            id: channel.id,
            seq: this.userChannels.length
          }]
        })
      } else {
        // 未登录则存储到本地
        setItem('user-channels', this.userChannels)
      }
    },

    onUserChannelClick (channel, index) {
      if (this.isEditShow && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },

    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      // console.log(index)
      this.userChannels.splice(index, 1)

      // 数据持久化
      if (this.user) {
        // 登录则数据存储到线上
        await deleteUserChannels(channel.id)
      } else {
        // 未登录则数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },

    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
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
          font-size: 12px;
        }
      }
      /deep/ .van-grid-item__icon {
        position: absolute;
        right: -7px;
        top: -7px;
        font-size: 18px;
        color: #f86363;
      }
    }
    .active {
      /deep/ .van-grid-item__text {
        color: #f86363;
      }
    }
  }
</style>
