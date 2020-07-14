<template>
  <div>
    <topbar>
      <template><span class="f-t2">审核记录</span></template>
      <template #add>
        <el-radio-group v-model="show" size="mini">
          <el-radio-button :label="true">开启</el-radio-button>
          <el-radio-button :label="false">关闭</el-radio-button>
        </el-radio-group>
      </template>
      <template #search v-if="show">
        <el-input style="margin-right: 20px;" v-model="filter.k" @keyup.enter.native="changeFilter" placeholder="search" />
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </topbar>
    <el-container class="df-column" v-loading="loading" v-show="show">
      <el-table style="width: 100%" :row-class-name="rowClassName" :data="list" @row-click="goDetail">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="v" label="v"></el-table-column>
        <el-table-column prop="review" label="review"></el-table-column>
        <el-table-column prop="reject" label="reject"></el-table-column>
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
      show: false,
      sortList: [
        { label: 'Date - Oldest first', value: 'updateAt,true' },
      ],
      sort: '',
      loading: false,
    }
  },
  computed: {
    total() { return this.$store.state.censorRecord.total },
    page() { return this.$store.state.censorRecord.page },
    filter() { return this.$store.state.censorRecord.filter },
    list() { return this.$store.state.censorRecord.list },
    detailPerson() { return this.$store.state.person.detail },
  },
  components: {
    topbar,
  },
  created() {
  },
  methods: {
    changeShow(v) {
      this.show = v
    },
    reset() {
      this.$store.dispatch('censorRecord/reset')
      this.count()
      this.find()
    },
    changeSort() {
      if (!this.sort) return
      this.filter.sort = this.sort.split(',')[0]
      this.filter.sortAz = this.sort.split(',')[1]
      this.$store.dispatch('censorRecord/changeFilter')
      this.find()
      this.count()
    },
    changeFilter() {
      this.$store.dispatch('censorRecord/changeFilter')
      this.find()
      this.count()
    },
    changePage(v) {
      this.$store.dispatch('censorRecord/changePage', { curr: v })
      this.find()
    },
    async count() {
      this.$store.dispatch('censorRecord/count', { person: {id: this.detailPerson.id} })
    },
    async find() {
      this.loading = true
      await Promise.all([this.$store.dispatch('censorRecord/find', { person: {id: this.detailPerson.id} }), this.$wait(1000)])
      this.loading = false
    },
    goDetail(e) {
      this.$router.push({ name: 'censorRecord', params: { id: e.id } })
    },
    rowClassName({row}) {
      return row.reject ? 'c-danger' : row.review ? 'c-warning' : ''
    },
  },
}
</script>
