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
      @submit="onUserLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
        name="手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
        name="验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button size="small">发送验证码</van-button>
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
import { userLogin } from '@/api/user'
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
      }
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
        // console.log('登录成功')
        console.log(res)
        Toast.success('登录成功')
      } catch (err) {
        console.log(err)
        console.log('登录失败', err)
        Toast.fail('登录失败, 手机号或验证码输入错误')
      }
    },
    onFailed (error) {
      // console.log(error)
      if (error.errors[0]) {
        Toast(error.errors[0].message)
      }
    },
    onClickLeft () {}
  }
}
</script>

<style scoped lang="less">
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
