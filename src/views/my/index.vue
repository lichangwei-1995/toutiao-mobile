<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        class="base-info"
        :border="false"
        title="单元格"
        value="内容"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div
          class="name"
          slot="title"
        >
          昵称
        </div>
        <van-button
          class="update-btn"
          type="default"
          round
        >
          编辑资料
        </van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item>
          <div slot="text">
            <div class="count">111</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">111</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">111</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">111</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="no-login">
        <div>
          <img class="mobile" src="./no-login.png" alt="">
        </div>
        <div class="text">
          登录 / 注册
        </div>
      </div>

    <van-grid
      class="nav-grid"
      :column-num="2"
    >
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="clock-o" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="实名认证" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell v-if="user" class="logout" title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url(./banner.png) no-repeat;
    background-size: cover;
    height: 180px;
    .base-info {
      background-color: unset;
      height: 115px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 16px;
        color: #fff;
      }
      .update-btn {
        font-size: 10px;
        color: #666;
        padding: 0 9px;
        height: 20px;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
      height: 65px;
      font-size: 18px;
      text-align: center;
      color: #fff;
      .text {
        font-size: 12px;
      }
    }
  }
  .no-login {
    height: 180px;
    background: url(./banner.png) no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .nav-grid {
    box-sizing: border-box;
    margin-bottom: 5px;
    .nav-grid-item {
      height: 70px;
    }
    /deep/ .van-icon-star-o {
      color: #eb5253;
    }
    /deep/ .van-icon-clock-o {
      color: #ff9d1d;
    }
    /deep/ .van-grid-item__text {
      font-size: 14px;
    }
  }
  .logout {
    text-align: center;
    color: #d86262;
    margin-top: 5px;
  }
}
</style>
