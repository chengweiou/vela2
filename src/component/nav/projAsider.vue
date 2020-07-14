<template>
<div>
  <el-menu :default-active="active" :collapse="isCollapse">
    <el-menu-item index="personRoomRelate" @click="go('personRoomRelateList')"><i class="el-icon-document-checked"></i>聊天房间</el-menu-item>
    <el-menu-item index="friend" @click="go('friendList')"><i class="el-icon-s-custom"></i>好友</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    me() { return this.$store.state.me.user },
    active() { return this.$store.state.tab.asider },
  },
  mounted() {
    window.onresize = () => {
      let w = document.body.clientWidth
      this.isCollapse = w < 800
    }
  },
  methods: {
    go(v) {
      if (this.$route.name == v) return
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
    onLogin() {
      this.$store.dispatch('me/onLogin')
    },
    logout() {
      this.$store.dispatch('me/logout')
    },
  },
}
</script>

<style scoped>
.el-menu {
  color: #fff;
  background: transparent;
}
.el-menu-item {
  color: #fff;
}
.el-menu-item.is-active {
  background: rgba(7, 11, 52, .6);
}
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
