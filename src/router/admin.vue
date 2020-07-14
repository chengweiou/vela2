<template>
  <el-container style="min-height: 100%;">
    <el-header style="border-bottom: solid 1px #fff; "><projHeader /></el-header>
    <el-container>
      <el-aside style="width: auto;"><projAsider></projAsider></el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer>
      <projFooter/>
    </el-footer>
  </el-container>
</template>
<script>
import projHeader from '@/component/nav/projHeader'
import projFooter from '@/component/nav/projFooter'
import projAsider from '@/component/nav/projAsider'
export default {
  computed: {
  },
  components: {
    projHeader, projFooter, projAsider,
  },
  created() {
    this.$store.dispatch('ws/connect')
  },
}
</script>
