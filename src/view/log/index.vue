<template>
  <div>
    connect status: {{ws.readyState}}<button @click="start">connect</button><button @click="clean">clean</button>
    <div>
      <article v-for="(e, i) in list" :key="i">
        <div>{{e}}</div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: {},
      list: [],
    }
  },
  computed: {
  },
  components: {
  },
  created() {
    this.start()
  },
  methods: {
    async start() {
      this.ws = new WebSocket('ws://127.0.0.1:8907/piscespath/log')
      this.ws.onopen = () => {
        this.ws.onmessage = (response) => {
          let message = JSON.parse(response.data)
          this.list.unshift(message)
        }
      }
    },
    clean() {
      this.list = []
    },
  },
}
</script>
