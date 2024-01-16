<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import i18n from '@/locals/i18n'

const { t } = i18n.global

const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  finished: {
    type: Boolean,
    required: true
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  finishedText: {
    type: String,
    default: "No more..."
  },
  firstLoadData: {
    type: Boolean,
    default: true
  },
  isRoot: {
    // 为false时 外层需要定义高度
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['loadData', 'update:loading'])

onMounted(() => {
  initRegisterNode()
})
onUnmounted(() => {
  observer.unobserve(statusNode);
})

let observer: IntersectionObserver;
let statusNode: Element
function initRegisterNode() {
  const fatherNode = document.querySelector('#loadmore_style_id')
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      //触发加载数据
      if (!props.loading && !props.finished && props.firstLoadData) {
        emit('update:loading', true);
        emit('loadData');
      }
    }
  }, { root: props.isRoot ? null : fatherNode, threshold: 0 })
  statusNode = document.querySelector('#list_loadmore_statue')!
  observer.observe(statusNode)
}

</script>

<template>
  <div class="loadmore_style" id="loadmore_style_id">
    <div>
      <slot></slot>
    </div>
    <div class="status center-center" id="list_loadmore_statue">
      <span class="text1" v-if="!props.loading && props.finished">{{ props.finishedText }}</span>
      <van-loading v-else type="spinner" size="20">{{ props.loadingText }}</van-loading>
    </div>
  </div>
</template>

<style lang="less" scoped>
.loadmore_style {
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  .status {
    overflow: hidden;
    padding: 10px;
    .text1 {
      color: #969799;
      font-size: 14px;
    }
  }
}
</style>