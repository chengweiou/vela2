<template>
  <div style="width: 100%;">
    <div class="df df-jcsb" style="height: 60px;">
      <section class="center pointer" style="font-size: 24px; " @click="go('home')">聊天测试系统</section>
      <div class="center" style="width: 100px;">
        <el-dropdown @command="handleCommand">
          <div class="center pointer link f-t1" style="width: 50px; height: 50px;">
            <el-badge :value="me.unread" :hidden="me.unread==0">
              <i class="el-icon-user"></i>
            </el-badge>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" class="center">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout" class="center">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    me() { return this.$store.state.me.user },
  },
  methods: {
    handleCommand(v) {
      if (v == 'logout') {
        this.logout()
        return
      }
      this.go(v)
    },
    go(v) {
      if (this.$route.name == v) return
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
    async logout() {
      // 处理在房间内登出的情况
      if (this.$route.name == 'room') await this.$store.dispatch('room/leave', {id: this.$store.state.room.detail.id})
      await this.$store.dispatch('me/logout')
      this.$store.dispatch('ws/disconnect')
    },
  },
}
</script>

<style scoped>
</style>

<style>
</style>

<i18n>
  {
    "en": {
      "login": "login"
    },
    "zh": {
      "login": "登录"
    }
  }
</i18n>
