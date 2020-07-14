<template>
  <div>
    <topbar>
      <template>列表</template>
      <template #search>
        <el-input style="margin-right: 20px;" v-model="filter.k" @keyup.enter.native="changeFilter" placeholder="search" />
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </topbar>
    <el-container class="df-column" v-loading="loading">
      <el-table style="width: 100%" :row-class-name="rowClassName" :data="list" @row-click="goDetail">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="room.id" label="room.id" width="100"></el-table-column>
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="imgsrc" label="imgsrc"></el-table-column>
        <el-table-column prop="unread" label="unread"></el-table-column>
        <el-table-column prop="lastMessage" label="lastMessage"></el-table-column>
        <el-table-column prop="updateAt" label="update Time" width="200"><template #default="scope">{{scope.row.updateAt | date}}</template></el-table-column>
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
    total() { return this.$store.state.personRoomRelate.total },
    page() { return this.$store.state.personRoomRelate.page },
    filter() { return this.$store.state.personRoomRelate.filter },
    list() { return this.$store.state.personRoomRelate.list },
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
      this.$store.dispatch('personRoomRelate/reset')
      this.count()
      this.find()
    },
    changeSort() {
      if (!this.sort) return
      this.filter.sort = this.sort.split(',')[0]
      this.filter.sortAz = this.sort.split(',')[1]
      this.$store.dispatch('personRoomRelate/changeFilter')
      this.find()
      this.count()
    },
    changeFilter() {
      this.$store.dispatch('personRoomRelate/changeFilter')
      this.find()
      this.count()
    },
    changePage(v) {
      this.$store.dispatch('personRoomRelate/changePage', { curr: v })
      this.find()
    },
    async count() {
      this.$store.dispatch('personRoomRelate/count')
    },
    async find() {
      this.loading = true
      await Promise.all([this.$store.dispatch('personRoomRelate/find'), this.$wait(1000)])
      this.loading = false
    },
    goDetail(e) {
      this.$router.push({ name: 'room', params: { id: e.room.id } })
    },
    rowClassName({row}) {
      return row.reject ? 'c-danger' : row.review ? 'c-warning' : ''
    },
  },
}
</script>

<style>
</style>
