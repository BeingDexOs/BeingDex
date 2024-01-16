<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

const props = defineProps<{
  title: string,
  titleBack: string
}>()

</script>

<template>
  <div class="dex-breadcrumb-style hideen-scrollbar">
    <n-breadcrumb>
      <n-breadcrumb-item @click="router.replace('/')">{{ $t('text.t1') }}</n-breadcrumb-item>
      <n-breadcrumb-item @click="router.go(-1)">{{ props.titleBack }}</n-breadcrumb-item>
      <n-breadcrumb-item>
        <span class="dex-breadcrumb-text1">{{ props.title }}</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<style lang="less">
.dex-breadcrumb-style {
  overflow-x: auto;
  .dex-breadcrumb-text1 {
    color: @dex-color2;
  }
}
</style>