<template>
  <div v-if="show" class="center" style="width: 100%; height: 100%; background: rgba(0, 0, 0, .3); position: fixed; top: 0;  z-index: 1;" @click="off">
    <el-alert type="error" :title="name" :description="content" center effect="dark" show-icon :closable="false"></el-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    show() { return this.$store.state.failBox.show },
    name() {
      return this.$store.state.failBox.name
    },
    content() { return this.$store.state.failBox.content },
  },
  methods: {
    off() {
      this.$store.dispatch('failBox/off')
    },
  },
}
</script>
