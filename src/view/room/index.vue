<template>
  <div class="df">
    <div class="df df-column" style="flex: 1;">
      <div ref="historyArea" style="margin-right: 20px; height: 300px; overflow: scroll;">
        <div v-if="isServerHistory">
          <div v-if="moreHistory" class="center link pointer" @click="find">加载更多...</div>
          <div v-else class="center">已经是全部记录了</div>
        </div>
        <section v-for="(e, i) in historyList" :key="i">
          <div v-if="e.showTime" class="center" style="margin: 10px;">{{e.updateAt | date}}</div>
          <div class="df" :class="e.sender.id == me.id ? 'selfPosition' : 'otherPosition'">
            <!-- <div style="width: 30px; height: 30px;"><avatar :src="personList.find(p=>p.id=e.sender.id).imgsrc" /></div> -->
            <div>
              <!-- // todo 显示图片 地图 -->
              <section :class="e.sender.id == me.id ? 'selfV' : 'otherV'" style="margin-bottom: 10px; padding: 6px; border-radius: 3px;">
                <div v-if="e.type=='TEXT'">{{e.v}}</div>
                <div v-else-if="e.type=='IMG'"><centerImage :src="e.v"/></div>
                <div v-else-if="e.type=='MAP'"><img :src="`https://maps.googleapis.com/maps/api/staticmap?center=${e.v}&size=300x200&key=YOUR_API_KEY`"></div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <div class="center df-wrap" style="margin: 0 100px;">
        <div class="df">
          <el-button v-loading="loading" :disabled="loading" style="margin-right: 20px; margin-bottom: 20px; width: 160px;" type="primary" @click="sendImg">image</el-button>
          <el-button v-loading="loading" :disabled="loading" style="margin-right: 20px; margin-bottom: 20px; width: 160px;" type="primary" @click="sendMap">map</el-button>
        </div>
        <div class="df" style="flex: 1;">
          <el-input v-model="form.v" style="margin-right: 20px; margin-bottom: 20px; flex: 1;" @keyup.enter.native="send" />
          <el-button v-loading="loading" :disabled="loading" style="margin-bottom: 20px; width: 160px;" type="primary" @click="send">send</el-button>
        </div>
      </div>
    </div>
    <aside style="width: 200px; border-left: 1px solid #fff;">
      <div v-for="(e, i) in personList" :key="`p${i}`">
        <div v-if="e.id!=me.id" class="df df-aic">
          <div v-if="!e.isFriend"><el-button @click="saveFriend(e)">add friend</el-button></div>
          <div style="width: 30px; height: 30px;"><avatar :src="e.imgsrc" /></div>
          <div style="center">{{e.name}}</div>
        </div>

      </div>
    </aside>

  </div>
</template>

<script>
import avatar from '@/component/image/avatar'
export default {
  data() {
    return {
      loading: false,
      form: { v: '' },
    }
  },
  computed: {
    isServerHistory() { return process.env.VUE_APP_SERVER_HISTORY },
    me() { return this.$store.state.me.user },
    detail() { return this.$store.state.room.detail },
    personList() { return this.$store.state.room.personList },
    historyList() { return this.$store.state.room.historyList },
    // todo 判断server history的时候才出现
    moreHistory() { return this.$store.state.room.historyFilter.skip < this.$store.state.room.historyTotal },
    scroll() { return this.$store.state.room.scroll },
  },
  watch: {
    scroll() {
      if (this.scroll) this.toBottom()
      this.$store.dispatch('room/changeScroll', false)
    },
  },
  components: {
    avatar,
  },
  beforeRouteLeave(to, from, next) {
    // 处理在房间内登出的情况
    if (this.detail.id) this.$store.dispatch('room/leave', {id: this.detail.id})
    next()
  },
  async created() {
    if (this.isServerHistory) await this.reset()
    await this.enterRoom()
    this.findPerson()
    await this.read()
    // 需要maxId
    if (this.isServerHistory) this.count()
  },
  methods: {
    // todo 判断server history的时候才出现
    async reset() {
      await this.$store.dispatch('room/reset')
    },
    async enterRoom() {
      this.loading = true
      let pList = await Promise.all([this.$store.dispatch('room/enter', {id: this.$route.params.id}), this.$wait(1000)])
      this.loading = false
      if (!pList[0]) return
      this.$notify({ type: 'success', title: '进入房间成功' })
    },
    async findPerson() {
      this.loading = true
      let pList = await Promise.all([this.$store.dispatch('room/findPerson', {idList: this.detail.personIdList}), this.$wait(1000)])
      this.loading = false
      if (!pList[0]) return
      this.$notify({ type: 'success', title: '读取成员列表成功' })
      this.checkFriend()
    },
    async checkFriend() {
      await this.$store.dispatch('room/checkFriend', {targetIdList: this.detail.personIdList.filter(e=>e!=this.me.id)})
    },
    async read() {
      this.loading = true
      let pList = await Promise.all([this.$store.dispatch('room/read', {room: {id: this.detail.id}}), this.$wait(1000)])
      this.loading = false
      if (!pList[0]) return
      this.$notify({ type: 'success', title: '读取未读消息成功' })
      this.$store.dispatch('room/changeScroll', true)
    },
    // todo 判断server history的时候才出现
    async count() {
      this.$store.dispatch('room/count')
    },
    async find() {
      this.loading = true
      let pList = await Promise.all([this.$store.dispatch('room/find', {room: {id: this.detail.id}}), this.$wait(1000)])
      this.loading = false
      if (!pList[0]) return
    },

    async send() {
      if (!this.form.v.trim()) return
      let msg = {
        id: 0,
        room: {id: this.$route.params.id},
        sender: {id: this.me.id},
        type: 'TEXT',
        v: this.form.v,
      }
      await this.$store.dispatch('room/sendText', msg)
      this.$store.dispatch('room/changeScroll', true)
      this.form.v = ''
    },
    async sendImg() {
      // todo
      // let msg = {
      //   id: 0,
      //   room: {id: this.$route.params.id},
      //   sender: {id: this.me.id},
      //   type: 'IMG',
      // }
      // await this.$store.dispatch('room/sendImg', msg)
    },
    async sendMap() {
      navigator.geolocation.getCurrentPosition(async(position) => {
        let msg = {
          id: 0,
          room: {id: this.$route.params.id},
          sender: {id: this.me.id},
          type: 'MAP',
          v: `${position.coords.latitude},${position.coords.longitude}`,
        }
        await this.$store.dispatch('room/sendText', msg)
        this.$store.dispatch('room/changeScroll', true)
      })

    },
    async toBottom() {
      this.$refs.historyArea.scrollTop = this.$refs.historyArea.scrollHeight
    },
    saveFriend(e) {
      this.$store.dispatch('friend/save', {target: {id: e.id}})
    },
  },
}
</script>
<style scoped>
.selfPosition { flex-direction: row-reverse; }
.otherPosition { flex-direction: row; }
.selfV { background: #070B34; }
.otherV { background: white; color: #070B34; }
</style>