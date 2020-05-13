<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-navbar"
      title="注册 / 登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onUserLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        center
        left-icon="smile-o"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        center
        left-icon="music-o"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            class="sendsms-btn"
            v-else
            size="small"
            @click.prevent="onSendSms"
            :loading="isCountLoading"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info">登录</van-button>
      </div>
      <!-- /登录按钮 -->
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import {
  userLogin,
  sendSms
} from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isCountLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // this.onUserLogin()
  },
  mounted () {},
  methods: {
    async onUserLogin () {
      // 登录消息提示
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await userLogin(this.user)
        // 将后端返回的用户登录状态存储到 Vuex 中
        this.$store.commit('setUser', res.data.data)
        Toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        // console.log(err)
        // console.log('登录失败', err)
        Toast.fail('登录失败, 手机号或验证码输入错误')
      }
    },

    onFailed (error) {
      // console.log(error)
      if (error.errors[0]) {
        Toast(error.errors[0].message)
      }
    },

    // 验证码
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 开启发送验证码按钮loading状态
        this.isCountLoading = true
        // 验证通过 请求发送验证码
        await sendSms(this.user.mobile)
        Toast({
          message: '发送成功'
        })
        // 短信发送成功 隐藏按钮并显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        if (err && err.response && err.response.status === 429) {
          // 频繁发送提示消息
          Toast('发送太频繁了，请稍后重试')
        } else if (err.name === 'mobile') {
          // 表单验证失败提示消息
          Toast({
            message: err.message
          })
        } else {
          // 未知错误提示消息
          Toast('发送失败, 请稍后重试')
        }
      }
      // 不管发送成功还是发送失败都关闭发送验证码按钮loading状态
      this.isCountLoading = false
    },
    onClickLeft () {}
  }
}
</script>

<style scoped lang="less">
  .sendsms-btn {
    height: 24px;
  }
  .login-btn-wrap {
    padding: 20px;
    font-size: 15px;
    .login-btn {
      width: 100%;
      background: #333;
      border: 0;
    }
  }
</style>
