<template>
  <div v-if="show" class="center" style="width: 100%; height: 100%; background: #00f; position: fixed; top: 0;">
    <el-card class="c-white" style="position: relative; width: 500px; background: transparent; border: transparent;">
      <div class="center" style="margin-bottom: 20px; font-size: 50px;">内容审核</div>
      <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" size="large" style="margin-bottom: 40px;">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="password" show-password @keyup.enter.native="login" />
        </el-form-item>
      </el-form>
      <section class="center">
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login">登录</el-button>
      </section>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  computed: {
    show() { return this.$store.state.me.showLogin },
  },
  components: {
  },
  methods: {
    async login() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return false
        this.loading = true
        let pList = await Promise.all([this.$store.dispatch('me/login', this.form), this.$wait(1000)])
        this.loading = false
        if (!pList[0]) return
        this.$notify({ type: 'success', title: '成功' })
      })
    },
    off() {
      this.$store.dispatch('me/offLogin')
    },
  },
}
</script>

<style scoped>
</style>

<style>

</style>
