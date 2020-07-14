<template>
  <div>
    <detailcard>
      <template #name>账号</template>
      <template #edit>
        <el-button v-if="!showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="onUpdate">修改</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="update">确认</el-button>
        <el-button v-if="showUpdate" v-loading="loading" :disabled="loading" type="primary" @click="offUpdate">取消</el-button>
      </template>
      <template>
        <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="120px">
          <div v-if="detail.username" class="df">
            <el-form-item :label="typeMap['NORMAL']" prop="username">
              <template #label><span :class="{delLine: !detail.normalActive}">{{typeMap['NORMAL']}}</span></template>
              <el-input v-show="showUpdate" v-model="form.username" />
              <el-input-div v-show="!showUpdate" :class="{delLine: !detail.normalActive}">{{detail.username}}</el-input-div>
            </el-form-item>
            <el-form-item prop="normalActive">
              <el-radio-group v-show="showUpdate" v-model="form.normalActive">
                <el-radio-button v-for="(eActive, iActive) in activeList" :key="`t${iActive}`" :label="eActive.k">{{eActive.v}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="detail.username || detail.phone || detail.email" class="df">
            <el-form-item label="修改密码">
              <el-radio-group v-model="showResetPassword" size="mini">
                <el-radio-button :label="true">开启</el-radio-button>
                <el-radio-button :label="false">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <div v-show="showResetPassword" class="df">
              <el-form-item label="password" prop="password">
                <el-input v-model="form.password" show-password />
              </el-form-item>
              <el-form-item label="repassword" prop="repassword">
                <el-input v-model="form.repassword" show-password />
              </el-form-item>
            </div>
          </div>
          <div v-if="detail.wechat" class="df">
            <el-form-item :label="typeMap['WECHAT']" prop="wechat">
              <template #label><span :class="{delLine: !detail.wechatActive}">{{typeMap['WECHAT']}}</span></template>
              <el-input-div><span :class="{delLine: !detail.wechatActive}">{{detail.wechat}}</span></el-input-div>
            </el-form-item>
            <el-form-item prop="wechatActive">
              <el-radio-group v-show="showUpdate" v-model="form.wechatActive">
                <el-radio-button v-for="(eActive, iActive) in activeList" :key="`t${iActive}`" :label="eActive.k">{{eActive.v}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <div><loginRecord/></div>
      </template>
    </detailcard>
  </div>
</template>

<script>
import loginRecord from './loginRecord'
import detailcard from '@/component/proj/detail/card'
import clone from '@/fn/util/clone'
export default {
  data() {
    return {
      form: { },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: (rule, value, callback) => this.$valid.checkUsername('account', value, callback, this.form.username==this.detail.username), trigger: 'blur' }],
        password: [{ required: this.showResetPassword, message: 'please input password', trigger: 'blur' }],
        repassword: [{ required: this.showResetPassword, message: '请再次输入密码', trigger: 'blur' }, { validator: (rule, value, callback) => this.$valid.checkRepassword(this.form.password, value, callback, !this.showResetPassword), trigger: 'blur' }],
      },
      loading: false,
      showUpdate: false,
      showResetPassword: false,
    }
  },
  computed: {
    activeMap() { return this.$store.state.accountTrans.activeMap },
    activeList() { return this.$store.state.accountTrans.activeList },
    typeMap() { return this.$store.state.accountTrans.typeMap },
    typeList() { return this.$store.state.accountTrans.typeList },
    list() { return this.$store.state.account.list },
    detail() { return this.$store.state.account.detail },
  },
  components: {
    detailcard, loginRecord,
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
        let pList = await Promise.all([this.$store.dispatch('account/updateComb', this.form), this.$wait(1000)])
        this.loading = false
        if (!pList[0]) return
        this.showUpdate = false
      })
    },
  },
}
</script>
<style scoped>
.delLine {
  text-decoration: line-through #f56c6c; color: #f56c6c;
}
</style>
