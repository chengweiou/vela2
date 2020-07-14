<template>
  <canvas style="width: 100%; height: 100%;" ref="canvas"/>
</template>
<script>
/**
 * 小球跳跃
 */
export default {
  data() {
    return {
      jumpTime: 30,
      current: 30,
      ball: { x: 0, y: 0 },
      floor: 3,
      viewMoveTime: 100,
      viewMove: 0,
    }
  },
  computed: {
  },
  components: {
  },
  created() {

  },
  mounted() {
    let canvas = this.$refs.canvas
    canvas.width = canvas.clientWidth * 2
    canvas.height = canvas.clientHeight * 2
    requestAnimationFrame(this.draw)
  },
  methods: {
    draw() {
      let canvas = this.$refs.canvas
      if (!canvas) {
        return
      }
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, -canvas.height, canvas.width * 2, canvas.height * 2)
      let w = canvas.width
      let h = canvas.height
      ctx.beginPath()

      ctx.moveTo(w * 2 / 16, h)
      ctx.lineTo(w * 2 / 16, h * 8 / 10)
      ctx.moveTo(w * 5 / 16, h)
      ctx.lineTo(w * 5 / 16, h * 7 / 10)
      ctx.moveTo(w * 8 / 16, h)
      ctx.lineTo(w * 8 / 16, h * 6 / 10)
      ctx.moveTo(w * 11 / 16, h)
      ctx.lineTo(w * 11 / 16, h * 5 / 10)
      ctx.moveTo(w * 14 / 16, h)
      ctx.lineTo(w * 14 / 16, h * 4 / 10)

      ctx.moveTo(w * 17 / 16, h)
      ctx.lineTo(w * 17 / 16, h * 3 / 10)
      ctx.moveTo(w * 20 / 16, h)
      ctx.lineTo(w * 20 / 16, h * 2 / 10)
      ctx.moveTo(w * 23 / 16, h)
      ctx.lineTo(w * 23 / 16, h * 1 / 10)
      ctx.moveTo(w * 26 / 16, h)
      ctx.lineTo(w * 26 / 16, h * 0 / 10)

      ctx.lineWidth = w / 8
      ctx.strokeStyle = '#4A90E2'
      ctx.stroke()
      ctx.closePath()

      ctx.beginPath()
      if (this.floor < 5) {
        // start : w * (-1 + 3 * 1) / 16, h * (9 - 1) / 10 - w / 16
        // end : w * (-1 + 3 * 2) / 16, h * (9 - 2) / 10 - w / 16
        let k = this.current / this.jumpTime
        this.ball.x = w * (-1 + 3 * k) / 16 + (this.floor - 1) * w * 3 / 16
        let y = (-4.2 * k * k + 13.5 * k - 8.33)
        this.ball.y = h * (9 - y) / 10 - w / 16 - (this.floor - 1) * h / 10
      }
      ctx.arc(this.ball.x, this.ball.y, w / 16, 0, 2 * Math.PI)
      ctx.fillStyle = '#4A90E2'
      ctx.fill()
      ctx.closePath()
      this.current++

      if (this.floor === 5) {
        if (this.viewMoveTime > this.viewMove) {
          ctx.translate(-w * 12 / 16 * 1 / this.viewMoveTime, h * 4 / 10 * 1 / this.viewMoveTime)
          this.viewMove++
        } else {
          this.current = this.jumpTime
          this.floor = 1
          this.viewMove = 0
          ctx.translate(w * 12 / 16, -h * 4 / 10)
        }
        requestAnimationFrame(this.draw)
        return
      }

      if (this.current >= this.jumpTime * 2 && this.current <= this.jumpTime * 2 + 10) {
        requestAnimationFrame(this.hold)
        return
      }
      requestAnimationFrame(this.draw)
    },
    hold() {
      this.current++
      if (this.current > this.jumpTime * 2 + this.jumpTime / 1.5) {
        // 下一起点
        this.current = this.jumpTime
        this.floor++
        requestAnimationFrame(this.draw)
        return
      }
      requestAnimationFrame(this.hold)
    },
  },
}
</script>
<style scoped>

</style>
<style>

</style>
