<script setup lang="ts">
import {useRouter} from 'vue-router';

const props = defineProps({
  title:String
})

const router = useRouter()
const goBack = ()=>{
  router.back()
}
</script>

<template>
  <van-sticky :offset-top="48">
    <div class="backpage_style between-center">
      <van-icon class="be_pointer" name="arrow-left" size="22" @click="goBack" />
      <div class="title">{{ props.title }}</div>
      <div class="back_slot"><slot></slot></div>
    </div>
  </van-sticky>
</template>

<style lang="less" scoped>
.backpage_style{
  width: 100%;
  height: 48px;
  background: #F4F4F4;
  border-bottom: 1px solid #F4F4F4;
  padding: 0 20px;
}
.title{
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  flex: auto;
}
.back_slot{
  text-align: right;
  width: 22px;
}
</style>