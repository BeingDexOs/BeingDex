<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import { userStore } from '@/store/user';
import footers from '@/components/footers/index.vue';
import { NConfigProvider } from 'naive-ui'
import { $post } from '@/request/index';

const user_store = userStore()
const route = useRoute()
const { width } = useWindowSize()

watch(width, () => {
  user_store.wWidth = width.value
}, { immediate: true })

const themeOverrides = {
  "Dropdown": {
    "optionColorHover": "rgba(240, 245, 255, 1)",
    "optionTextColorHover": "rgba(4, 73, 228, 1)",
    "optionTextColor": "rgba(153, 153, 153, 1)",
    "borderRadius": "8px",
    "fontSizeMedium": "12px"
  },
  "Input": {
    "borderFocus": "1px solid #0449E4",
    "borderHover": "1px solid #0449E4",
    "boxShadowFocus": "0 0 0 1px rgba(4, 73, 228, 0.2)"
  },
  "Menu": {
    "itemColorActive": "rgba(240, 245, 255, 1)",
    "itemTextColor": "rgba(6, 6, 26, 1)",
    "itemTextColorHover": "rgba(6, 6, 26, 1)",
    "itemTextColorActive": "#06061AFF",
    "itemTextColorActiveHover": "#06061AFF",
    "itemTextColorChildActive": "#06061AFF",
    "itemTextColorChildActiveHover": "#06061AFF",
    "itemColorActiveHover": "rgba(240, 245, 255, 1)",
    "itemColorActiveCollapsed": "rgba(240, 245, 255, 1)",
    "arrowColorChildActive": "#06061AFF",
    "arrowColorChildActiveHover": "#06061AFF"
  },
  "Tabs": {
    "tabTextColorActiveLine": "#0449E4FF",
    "tabTextColorHoverLine": "#0449E4FF",
    "tabTextColorActiveBar": "#0449E4FF",
    "tabTextColorHoverBar": "#0449E4FF",
    "barColor": "#0449E4FF"
  },
  "Pagination": {
    "itemTextColorHover": "#0449E4FF",
    "itemTextColorActive": "#0449E4FF",
    "itemTextColorPressed": "#0449E4FF",
    "itemBorderActive": "1px solid #0449E4"
  },
  "Upload": {
    "draggerBorderHover": "1px solid #0449E4"
  },
  "Radio": {
    "dotColorActive": "#0449E4FF",
    "buttonBorderColorActive": "#0449E4FF",
    "buttonTextColorActive": "#0449E4FF",
    "buttonTextColorHover": "#0449E4FF",
    "boxShadowHover": "inset 0 0 0 1px #0449E4",
    "buttonBoxShadowHover": "inset 0 0 0 1px #0449E4",
    "boxShadowActive": "inset 0 0 0 1px #0449E4",
    "boxShadowFocus": "inset 0 0 0 1px #0449E4,0 0 0 0px #0449E4"
  }
}

const getConfig = () => {
  $post('/index/configList').then(res => {
    user_store.config = res.data
  })
}
getConfig()

const getCategorys = () => {
  $post('/index/categorys').then(res => {
    user_store.categorys = res.data
  })
}
getCategorys()
const getClassification = () => {
  $post('/index/classification').then(res => {
    user_store.classification = res.data
  })
}
getClassification()

const getHelp = () => {
  $post('/index/help').then(res => {
    user_store.helpList = res.data
  })
}
getHelp()

const getBdkInfo = () => {
  $post('/index/bdkinfo').then(res => {
    user_store.bdkInfo = res.data
  })
}
getBdkInfo()
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
        <keep-alive>
          <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
        </keep-alive>
      </router-view>
      <footers v-if="!route.meta.notShowFooters" />
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="less"></style>
