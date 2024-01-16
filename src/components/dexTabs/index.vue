<script setup lang="ts">
import { TabsType } from '@/interface/index';
const props = defineProps<{
  tabList: TabsType[],
  active: number
}>()
const emit = defineEmits(['update:active', 'change'])

const changeTab = (id: number) => {
  emit('update:active', id)
  emit('change', id)
}
</script>

<template>
  <div class="dex-tab-style start-center hideen-scrollbar">
    <div class="center-center be_pointer" :class="props.active === item.id ? 'item-ac' : 'item'"
      @click="changeTab(item.id)" v-for="item in tabList" :key="item.id">
      <span class="text1">{{ item.title }}</span>
    </div>
  </div>
</template>

<style lang="less">
.dex-tab-style {
  gap: 10px;
  overflow-x: auto;
  .item {
    padding: 5px 22px;
    border: 1px solid @dex-color5;
    border-radius: 50px;
    background: @dex-color6;
    .text1 {
      color: @dex-color4;
      font-size: 18px;
      white-space: nowrap;
    }
  }
  .item-ac {
    padding: 5px 22px;
    border: 1px solid @dex-color5;
    border-radius: 50px;
    background: @dex-color7;
    white-space: nowrap;
    .text1 {
      color: @dex-color1;
      font-size: 18px;
    }
  }
}
</style>