<template>
  <canvas :style="{width: width, height: height}" ref="canvas"/>
</template>

<script scoped>
/**
 * 中心图片一般两种形式，以下采用: 1
 * 1.剪裁掉超出显示框的部分
 * 2.保留全图，宽高比不足的部分纯色填充
 */
export default {
  props: {
    width: { default: '100%' },
    height: { default: '100%' },
    src: { type: String },
  },
  data() {
    return {
      perc: 0,
      cpyList: [0, 900],
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      let canvas = this.$refs.canvas
      canvas.width = canvas.clientWidth * 2
      canvas.height = canvas.clientHeight * 2
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.src = this.src
      if (!img.width) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 3, canvas.height / 3)
        ctx.lineTo(canvas.width * 2 / 3, canvas.height * 2 / 3)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#aaa'
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(canvas.width * 2 / 3, canvas.height / 3)
        ctx.lineTo(canvas.width / 3, canvas.height * 2 / 3)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#aaa'
        ctx.stroke()
        ctx.closePath()
      }
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let imgsw, imgsh, imgw, imgh
        if (img.naturalWidth > img.naturalHeight * canvas.width / canvas.height) {
          imgsh = 0
          imgh = img.naturalHeight
          imgw = canvas.width / canvas.height * img.naturalHeight
          imgsw = (img.naturalWidth - imgw) / 2
        } else {
          imgsw = 0
          imgw = img.naturalWidth
          imgh = canvas.height / canvas.width * img.naturalWidth
          imgsh = (img.naturalHeight - imgh) / 2
        }

        ctx.drawImage(img, imgsw, imgsh, imgw, imgh, 0, 0, canvas.width, canvas.height)
      }
    },
  },
  watch: {
    src() {
      this.draw()
    },
  },
}
</script>
<style scoped>
</style>
