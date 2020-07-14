<template>
  <div>
    <detailcard>
      <template #name>基本信息</template>
      <template>
        <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="120px">
          <div class="df">
            <el-form-item label="Name" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </div>
          <div class="df" v-if="me.type=='SUPER'">
            <el-form-item label="Type" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio-button v-for="(e, i) in typeList" :key="`${i}`" :label="e.k">{{e.v}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </detailcard>
    <detailcard>
      <template #name>账号</template>
      <template>
        <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="120px">
          <div class="df">
            <el-form-item label="username" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="form.password" show-password />
            </el-form-item>
          </div>
        </el-form>
      </template>
      <template #add><el-button v-loading="loading" :disabled="loading" style="width: 160px;" type="primary" @click="save">保存</el-button></template>
    </detailcard>
  </div>
</template>

<script>

import detailcard from '@/component/proj/detail/card'
export default {
  data() {
    return {
      form: { },
      rules: {
        name: [{ required: true, message: 'please input name', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: (rule, value, callback) => this.$valid.checkUsername('account', value, callback), trigger: 'blur' }],
        password: [{ required: true, message: 'please input password', trigger: 'blur' }],
      },
      loading: false,
    }
  },
  computed: {
    me() { return this.$store.state.me.user },
    typeMap() { return this.$store.state.personTrans.typeMap },
    typeList() { return this.$store.state.personTrans.typeList },
  },
  components: {
    detailcard,
  },
  created() {
    this.getDb()
  },
  methods: {
    go(v) {
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
    getDb() {
      this.form = this.$store.state.personDb.save
    },
    async save() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return false
        this.loading = true
        if (!this.form.type) this.form.type = 'MEMBER'
        let pList = await Promise.all([this.$store.dispatch('person/save', this.form), this.$wait(1000)])
        this.loading = false
        if (!pList[0]) return
        this.$notify({ type: 'success', title: '成功' })
        this.go('personList')
      })
    },
  },
}
</script>
<style>
</style>
