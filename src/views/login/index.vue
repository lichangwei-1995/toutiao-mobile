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
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- /登录表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" @click="onUserLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>
import { userLogin } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
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
      try {
        const res = await userLogin(this.user)
        console.log('登录成功')
        console.log(res)
      } catch (err) {
        console.log(err)
        console.log('登录失败', err)
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
