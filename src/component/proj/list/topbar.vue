<template>
  <div>
    <section class="df df-jcsb df-wrap">
      <div class="df df-aic f-t1" style="margin-bottom: 20px;">
        <slot />
        <div style="margin-left: 20px;"><slot name="add"/></div>
      </div>
      <div class="df" style="margin-bottom: 20px;">
        <slot name="search"/>
      </div>

    </section>
  </div>
  <!-- example -->
      <!-- <topbar>
      <template>列表</template>
      <template #add><el-button circle @click="go('personAdd')">+</el-button></template>
      <template #search>
        <el-input style="margin-right: 20px;" v-model="filter.k" @keyup.enter.native="changeFilter" placeholder="search" />
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </topbar> -->
</template>
