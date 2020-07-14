<template>
  <div class="center" style="height: 100%;">
    <div style="width: 500px;">
      <section class="df">
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(1)">登录-1</el-button>
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(2)">登录-2</el-button>
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(2)">登录-3</el-button>
      </section>
    </div>
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
        personId: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      },
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    async login(personId) {
      this.loading = true
      let pList = await Promise.all([this.$store.dispatch('me/login', {person: {id: personId}}), this.$wait(1000)])
      this.loading = false
      if (!pList[0]) return
      this.$store.dispatch('ws/connect')
      this.$notify({ type: 'success', title: '成功' })
      this.$router.push({ name: 'personRoomRelateList' })
    },
  },
}
</script>

<style scoped>
</style>

<style>

</style>
