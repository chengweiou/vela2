<template>
  <div>
    <detailcard>
      <template #name>基本信息</template>
      <template #edit>
        <el-button v-if="!showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="onUpdate">修改</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="update">确认</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="offUpdate">取消</el-button>
      </template>
      <template>
        <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="120px">
          <div class="df">
            <el-form-item label="person.id" prop="person.id">
              <el-input v-show="showUpdate" v-model="form.person.id" />
              <el-input-div v-show="!showUpdate">id: {{personDetail.id}}, ip: {{personDetail.ip}}</el-input-div>
            </el-form-item>
          </div>
          <div class="df">
            <el-form-item label="v" prop="v" style="flex: 1;">
              <el-input v-show="showUpdate" type="textarea" v-model="form.v"/>
              <el-input-div v-show="!showUpdate" style="white-space: pre;">{{detail.v}}</el-input-div>
            </el-form-item>
          </div>
          <div class="df">
            <el-form-item label="review" prop="review" style="flex: 1;">
              <el-input v-show="showUpdate" v-model="form.review" />
              <el-input-div v-show="!showUpdate" class="df">
                <div v-for="(e, i) in detail.reviewList" :key="`${i}`"><el-tag type="warning" style="margin-right: 10px; margin-bottom: 10px;">{{e}}</el-tag></div>
              </el-input-div>
            </el-form-item>
          </div>
          <div class="df">
            <el-form-item label="reject" prop="reject" style="flex: 1;">
              <el-input v-show="showUpdate" v-model="form.reject" />
              <el-input-div v-show="!showUpdate" class="df">
                <div v-for="(e, i) in detail.rejectList" :key="`${i}`"><el-tag type="danger" style="margin-right: 10px; margin-bottom: 10px;">{{e}}</el-tag></div>
              </el-input-div>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </detailcard>
  </div>
</template>

<script>

import detailcard from '@/component/proj/detail/card'
import clone from '@/fn/util/clone'
export default {
  data() {
    return {
      form: { person: {} },
      rules: {
        name: [{ required: true, message: 'please input name', trigger: 'blur' }],
      },
      loading: false,
      showUpdate: false,
    }
  },
  computed: {
    detail() { return this.$store.state.censorRecord.detail },
    personDetail() { return this.$store.state.person.detail },
  },
  components: {
    detailcard,
  },
  async created() {
    await this.findById()
    this.findPerson()
  },
  methods: {
    async findById() {
      this.$store.dispatch('censorRecord/findById', { id: this.$route.params.id })
    },
    async findPerson() {
      if (!this.detail.person.id) {
        this.$store.dispatch('person/resetDetail')
        return
      }
      this.$store.dispatch('person/findById', { id: this.detail.person.id })
    },
    go(v) {
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
    onUpdate() {
      this.showUpdate = true
      this.form = clone(this.detail)
    },
    offUpdate() {
      this.showUpdate = false
      this.form = {}
    },
    async update() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return false
        this.loading = true
        let pList = await Promise.all([this.$store.dispatch('censorRecord/update', this.form), this.$wait(1000)])
        this.loading = false
        if (!pList[0]) return
        this.showUpdate = false
      })
    },
  },
}
</script>
<style>
</style>
