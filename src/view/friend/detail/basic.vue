<template>
  <div>
    <detailcard>
      <template #name>基本信息</template>
      <template #edit v-if="me.type=='SUPER' || detail.type=='MEMBER' || detail.type=='GUEST'">
        <el-button v-if="!showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="onUpdate">修改</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="update">确认</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="offUpdate">取消</el-button>
      </template>
      <template>
        <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="120px">
          <div class="df">
            <el-form-item label="Name" prop="name">
              <el-input v-show="showUpdate" v-model="form.name" />
              <el-input-div v-show="!showUpdate">{{detail.name}}</el-input-div>
            </el-form-item>
          </div>
          <div class="df">
            <el-form-item label="Type" prop="type">
              <el-radio-group v-show="showUpdate" v-model="form.type">
                <el-radio-button v-for="(e, i) in typeList" :key="`${i}`" :label="e.k">{{e.v}}</el-radio-button>
              </el-radio-group>
              <el-input-div v-show="!showUpdate">{{typeMap[detail.type]}}</el-input-div>
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
      form: {},
      rules: {
        name: [{ required: true, message: 'please input name', trigger: 'blur' }],
        type: [{ required: true, message: '请输入用户名', trigger: 'blur' } ],
      },
      loading: false,
      showUpdate: false,
    }
  },
  computed: {
    me() { return this.$store.state.me.user },
    detail() { return this.$store.state.person.detail },
    typeMap() { return this.$store.state.personTrans.typeMap },
    typeList() { return this.$store.state.personTrans.typeList },
  },
  components: {
    detailcard,
  },
  created() {
  },
  methods: {
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
        let pList = await Promise.all([this.$store.dispatch('person/update', this.form), this.$wait(1000)])
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
