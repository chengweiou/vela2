<template>
  <div v-if="show" class="center" style="width: 100%; height: 100%; background: rgba(255, 255, 255, .3); position: fixed; top: 0; left: 0;" >
    <slot></slot>
  </div>
</template>
<script>
/**
 * 一个固定位置，白色小透明的模态窗，用于覆盖在其他部分纸上，不使用z-index，需配合首页布置层级
 */
export default {
  data() {
    return {
    }
  },
  computed: {
    show() { return this.$store.state.modal.show },
  },
  methods: {
    off() {
      this.$store.dispatch('modal/off')
    },
  },
}
</script>
