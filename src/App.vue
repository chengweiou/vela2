<template>
  <div class="f-c" style="height: 100%;">
    <router-view name="full"/>
    <failBox/>
  </div>
</template>
<script>
import failBox from '@/component/failBox'
export default {
  name: 'App',
  components: {
    failBox,
  },
}
</script>
