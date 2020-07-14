<template>
<!-- // todo 提交到vue项目 -->
  <div style="border-radius: 50%; overflow: hidden;" :style="{width: width, height: height}">
    <centerImage :src="src"/>
  </div>
</template>

<script>
import centerImage from '@/component/image/centerImage'
export default {
  props: {
    width: { default: '100%' },
    height: { default: '100%' },
    src: { type: String },
  },
  components: {
    centerImage,
  },
}
</script>
<style scoped>
</style>
