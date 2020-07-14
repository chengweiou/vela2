<template>
  <div>
    <el-card class="" style="margin-bottom: 20px;">
      <template #header>
        <div class="df df-jcsb df-aic">
          <div class="f-t2"><slot name="name"/></div>
          <section>
            <slot name="edit"/>
          </section>
        </div>
      </template>
      <div>
        <slot></slot>
      </div>
    </el-card>
    <div class="df df-jcfe">
      <slot name="add"></slot>
    </div>

    <!-- example -->
    <!-- <addcard>
      <div slot="header">Recipe Information</div>
      <el-form @submit.native.prevent :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="form.repassword" show-password />
        </el-form-item>
      </el-form>
    </addcard> -->
  </div>
</template>
