<script setup lang="ts">
import { ref, h, computed, watch } from 'vue';
import headers from '@/components/header/index.vue';
import { NEllipsis, type MenuOption } from 'naive-ui'
import { $post, imgurl } from '@/request';
import { userStore } from '@/store/user';
import { useI18n } from 'vue-i18n';
import { HelpDetailType } from '@/interface';
import { useRoute, useRouter } from 'vue-router';
import i18n from '@/locals/i18n'

const { t } = i18n.global
const { locale } = useI18n()
const user_store = userStore()
const route = useRoute()
const router = useRouter()

const options = computed(() => {
  const res = user_store.helpList.map(e => {
    return {
      label: () => h(NEllipsis, null, { default: () => e.title }),
      key: e.id.toString(),
      icon: () => h('img', {
        src: `${imgurl}${e.image}`,
        width: '20',
        height: '20'
      }),
      children: e.list.map(chi => {
        return {
          label: () => h(NEllipsis, null, { default: () => chi.title }),
          key: chi.id.toString(),
        }
      })
    }
  })
  return res
})
const menuValue = ref('')
const menuChange = (key: string, item: MenuOption) => {
  console.log(key, item);
  router.replace(`/help/${key}`)
  drawerActive.value = false
}

const drawerActive = ref(false)
const changeDrawerStatus = () => {
  drawerActive.value = !drawerActive.value
}

const helpDetail = ref<HelpDetailType>()
const getHelpDetail = () => {
  $post('/index/helpDetail', { help_id: menuValue.value }).then(res => {
    helpDetail.value = res.data
  })
}

watch(() => user_store.helpList, (val) => {
  if (val && val.length) {
    if (route.params.id) {
      menuValue.value = route.params.id as string
    } else {
      const item = val.find(ele => ele.list.length > 0)
      menuValue.value = item ? item?.list[0].id.toString() : ''
    }
  }
}, { immediate: true })

watch(() => menuValue.value, (val) => {
  if (val) {
    getHelpDetail()
  }
}, { immediate: true })

watch(() => route.params.id, (val) => {
  if (val) {
    console.log(val);
    menuValue.value = val as string
  }
})

const searchOptions = computed(() => {
  let arr: any = []
  user_store.helpList.forEach(e1 => {
    e1.list.forEach(e2 => {
      arr.push({
        value: e2.title,
        key: e2.id
      })
    })
  })
  return arr
})
const helpMenu = ref('')
const querySearch = (queryString: string, cb: (arg: any) => void) => {
  let results;
  if (queryString) {
    results = searchOptions.value.filter((item: any) => (item.value.indexOf(queryString) !== -1))
  } else {
    results = searchOptions.value
  }
  console.log(results);
  if (!results.length) {
    cb([{ value: t('text.t24'), key: 'nodata' }])
  } else {
    cb(results)
  }
}
const handleSelect = (item: Record<string, any>) => {
  if (item.key == 'nodata') {
    helpMenu.value = ''
  } else {
    router.replace(`/help/${item.key}`)
    helpMenu.value = ''
  }
}
</script>

<template>
  <headers active="help" />
  <div class="box-px help-style">
    <div class="box1 between-center">
      <span class="b1-text1">{{ $t('text.t31') }}</span>
      <img src="@/assets/img/img39.png" alt="" @click="changeDrawerStatus" class="b1-img2 be_pointer">
      <div class="b1-inp">
        <!-- <n-input round placeholder="搜索" clearable>
          <template #prefix>
            <img src="@/assets/img/img35.png" class="b1-img1" alt="">
          </template>
        </n-input> -->
        <el-autocomplete v-model="helpMenu" :placeholder="$t('text.t156')" :highlight-first-item="false"
          :trigger-on-focus="true" value-key="value" :fetch-suggestions="querySearch" :fit-input-width="true"
          @select="handleSelect">
          <template #prefix>
            <img src="@/assets/img/img35.png" class="b1-img1" alt="">
          </template>
        </el-autocomplete>
      </div>
    </div>
    <div class="box2">
      <div class="b2-left">
        <n-menu :indent="20" accordion mode="vertical" :options="options" :value="menuValue" @update:value="menuChange" />
      </div>
      <div class="b2-bottom">
        <div class="b2b-text1">{{ helpDetail?.detail.title }}</div>
        <div class="b2b-text2" v-html="helpDetail?.detail.content">
        </div>
        <div class="b2b-box1 between-center">
          <div class="start-center b2b-change be_pointer" @click="router.replace(`/help/${helpDetail?.previous.id}`)">
            <template v-if="helpDetail?.previous">
              <img src="@/assets/img/img42.png" class="b2b-img1" alt="">
              <div class="b2b-text2 ellipsis">{{ helpDetail.previous.title }}</div>
            </template>
          </div>
          <div class="end-center b2b-change be_pointer" @click="router.replace(`/help/${helpDetail?.next.id}`)">
            <template v-if="helpDetail?.next">
              <div class="b2b-text2 ellipsis">{{ helpDetail.next.title }}
              </div>
              <img src="@/assets/img/img10.png" class="b2b-img1" alt="">
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <n-drawer v-model:show="drawerActive" placement="left">
    <div class="left-open-style">
      <div class="los-box1 between-center">
        <div class="los-text1">{{ $t('text.t31') }}</div>
        <img src="@/assets/img/img41.png" class="los-img1" @click="changeDrawerStatus" alt="">
      </div>
      <n-menu :indent="20" accordion mode="vertical" :options="options" :value="menuValue" @update:value="menuChange" />
    </div>
  </n-drawer>
</template>

<style lang="less">
.help-style {
  .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #c0c4cc inset;
  }
  .el-autocomplete {
    display: block;
  }
  .el-input {
    --el-input-border-radius: 100px;
  }
  .box1 {
    padding-top: 80px;
    padding-bottom: 30px;
    border-bottom: 1px solid @dex-color5;
    gap: 30px;
    .b1-text1 {
      font-size: 48px;
      color: @dex-color1;
    }
    .b1-inp {
      width: 40%;
    }
    .b1-img1 {
      width: 24px;
      margin-right: 5px;
    }
    .b1-img2 {
      width: 30Px;
    }
    @media (max-width: 768px) {
      padding-top: 15Px;
      .b1-text1 {
        font-size: 18Px;
        display: none;
      }
      .b1-inp {
        width: 100%;
        flex: auto;
      }
    }
    @media (min-width: 768px) {
      .b1-img2 {
        display: none;
      }
    }
  }
  .box2 {
    display: grid;
    grid-template-columns: 280px 1fr;
    .b2-left {
      padding: 10px 20px;
      border-right: 1px solid @dex-color5;
    }
    .b2-bottom {
      padding-top: 30px;
      padding-left: 30px;
      overflow-x: hidden;

      .b2b-text1 {
        font-size: 32px;
        color: @dex-color1;
        margin-bottom: 20px;
      }
      .b2b-text2 {
        font-size: 16px;
        color: @dex-color4;
      }
      .b2b-box1 {
        padding-top: 50px;
        padding-bottom: 20Px;
        gap: 10px;
        .b2b-img1 {
          width: 18px;
        }
        .b2b-text2 {
          font-size: 18px;
          color: @dex-color2;
          font-weight: bold;
        }
        .b2b-change {
          max-width: 48%;
          gap: 6px;
        }
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      .b2-left {
        display: none;
      }
      .b2-bottom {
        padding-left: 0;
      }
    }
  }
}
.left-open-style {
  .los-box1 {
    padding: 8Px 15Px;
    border-bottom: 1px solid @dex-color13;
    .los-text1 {
      font-size: 18Px;
      color: @dex-color1;
    }
    .los-img1 {
      width: 20Px;
    }
  }
}
</style>