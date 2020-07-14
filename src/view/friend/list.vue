<template>
  <div>
    <topbar>
      <template>列表</template>
      <template #add><el-button circle @click="go('friendAdd')">+</el-button></template>
      <template #search>
        <el-input style="margin-right: 20px;" v-model="filter.k" @keyup.enter.native="changeFilter" placeholder="search" />
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </topbar>
    <el-container class="df-column" v-loading="loading">
      <el-table style="width: 100%" :data="list" @row-click="goDetail">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="target.id" label="target.id"></el-table-column>
        <el-table-column prop="updateAt" label="update Time" width="200"><template #default="scope">{{scope.row.updateAt | date}}</template></el-table-column>
        <el-table-column width="200"><template #default="scope"><el-button @click.stop="remove(scope.row)">remove</el-button></template></el-table-column>
      </el-table>
      <div class="df df-jcfe df-aic">
        <div>Total: {{total}}</div>
        <el-pagination layout="prev, pager, next" :current-page="page.curr" :page-size="filter.limit" :total="total" @current-change="changePage"></el-pagination>
      </div>
    </el-container>
  </div>
</template>

<script>
import topbar from '@/component/proj/list/topbar'
export default {
  data() {
    return {
      sortList: [
        { label: 'Date - Oldest first', value: 'updateAt,true' },
      ],
      sort: '',
      loading: false,
    }
  },
  computed: {
    total() { return this.$store.state.friend.total },
    page() { return this.$store.state.friend.page },
    filter() { return this.$store.state.friend.filter },
    list() { return this.$store.state.friend.list },
  },
  components: {
    topbar,
  },
  created() {
    this.count()
    this.find()
  },
  methods: {
    go(v) {
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
    reset() {
      this.$store.dispatch('friend/reset')
      this.count()
      this.find()
    },
    changeSort() {
      if (!this.sort) return
      this.filter.sort = this.sort.split(',')[0]
      this.filter.sortAz = this.sort.split(',')[1]
      this.$store.dispatch('friend/changeFilter')
      this.find()
      this.count()
    },
    changeFilter() {
      this.$store.dispatch('friend/changeFilter')
      this.find()
      this.count()
    },
    changePage(v) {
      this.$store.dispatch('friend/changePage', { curr: v })
      this.find()
    },
    async count() {
      this.$store.dispatch('friend/count')
    },
    async find() {
      this.loading = true
      await Promise.all([this.$store.dispatch('friend/find'), this.$wait(1000)])
      this.loading = false
    },
    goDetail(e) {
      this.$router.push({ name: 'friend', params: { id: e.id } })
    },
    remove(e) {
      this.$store.dispatch('friend/remove', {id: e.id})
    },
  },
}
</script>
