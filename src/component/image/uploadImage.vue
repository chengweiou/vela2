<template>
  <div class="pointer" style="width: 100%; height: 100%;">
    <div v-show="src" style="position: relative; width: 100%; height: 100%;">
      <label class="df" style="width: 100%; height: 100%;">
        <centerImage :src="src"/>
        <input type="file" style="display: none;" @change="readPic">
      </label>
      <i class="el-icon-delete" style="padding: 5px; background: #F56C6C; border-radius: 50%; position: absolute; top: -5px; right: -5px;" @click="readPic"></i>
    </div>
    <label v-show="!src" class="center btn-white" style="width: 100%; height: 100%;">
      Upload Photo <input style="display: none;" type="file" @change="readPic" >
    </label>
  </div>
</template>

<script>
import centerImage from '@/component/image/centerImage'
export default {
  props: {
    src: { type: String, default: '' },
    readPic: { type: Function },
  },
  components: {
    centerImage,
  },
}
</script>
<style scoped>
</style>