<template>
  <div class="el-input-div">
    <slot></slot>
  </div>
</template>

<style scoped>
.el-input-div {
  margin-left: 16px;
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
