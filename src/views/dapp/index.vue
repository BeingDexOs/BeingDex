<script setup lang="ts">
import { computed } from 'vue';
import headers from '@/components/header/index.vue';
import type { MenuOption } from 'naive-ui'
import { ref } from 'vue';
import { userStore } from '@/store/user';
import { useI18n } from 'vue-i18n';
import { $post, imgurl } from '@/request';
import { DappType } from '@/interface/index';
import i18n from '@/locals/i18n'

const { t } = i18n.global
const { locale } = useI18n()
const user_store = userStore()

const options = computed(() => {
  const res = user_store.classification.map(e => {
    return {
      label: e.title,
      key: e.id.toString()
    }
  })
  return res
})
const menuValue = ref('')
const menuChange = (key: string, item: MenuOption) => {
  console.log(key, item);
  menuValue.value = key
  getDapp()
}
const tabChange = (value: string) => {
  console.log(value);
  menuValue.value = value
  getDapp()
}

const selectValue = ref('')
const selectOptions = computed(() => {
  const res = user_store.categorys.map(e => {
    return {
      label: e.title,
      value: e.id
    }
  })
  return res
})
const selectChange = (e: string) => {
  console.log(e);
  getDapp()
}

const dappName = ref('')

const dappList = ref<DappType[]>([])
const getDapp = () => {
  if (user_store.wWidth <= 768) {
    selectValue.value = ''
  }
  dappName.value = ''
  $post('/index/dapp', {
    categorys_id: selectValue.value,
    classification_id: menuValue.value,
    page: 1,
    limit: 100
  }).then(res => {
    dappList.value = res.data.data
  })
}

const searchDapp = async () => {
  const res = await $post('/index/dapp', {
    categorys_id: '',
    classification_id: '',
    title: dappName.value,
    page: 1,
    limit: 100
  })
  return res.data.data
}
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  const res = await searchDapp()
  console.log(res);
  if (res.length) {
    // const results = res.map((e: any) => ({ value: locale.value == 'zh' ? e.title : e.e_title, key: e.id }))
    res.forEach((e: any) => {
      e.value = e.title;
    })
    cb(res)
  } else {
    cb([{ value: t('text.t154'), key: 'nodata' }])
  }
}
const handleSelect = (item: any) => {
  console.log(item);
  if (item.key == 'nodata') {
    dappName.value = ''
  } else {
    dappList.value = [item]
  }
}
</script>

<template>
  <headers active="dapp" />
  <div class="dapp-style box-px">
    <div class="box1 between-center">
      <span class="b1-text1">{{ $t('text.t155') }}</span>
      <div class="b1-inp">
        <!-- <n-input round placeholder="搜索" v-model:value="dappName" clearable>
          <template #prefix>
            <img src="@/assets/img/img35.png" class="b1-img1" alt="">
          </template>
        </n-input> -->
        <el-autocomplete v-model="dappName" :placeholder="$t('text.t156')" :highlight-first-item="false"
          :trigger-on-focus="false" value-key="value" :fetch-suggestions="querySearchAsync" :fit-input-width="true"
          @select="handleSelect">
          <template #prefix>
            <img src="@/assets/img/img35.png" class="b1-img1" alt="">
          </template>
        </el-autocomplete>
      </div>
    </div>
    <div class="box2">
      <div class="b2-left">
        <n-menu mode="vertical" :options="options" :value="menuValue" @update:value="menuChange" />
      </div>
      <div class="b2-top">
        <van-tabs swipe-threshold="2" :border="true" line-width="30px" line-height="2px" color="#06061A"
          :active="menuValue" @update:active="tabChange">
          <van-tab v-for="item in options" :key="item.key" :name="item.key" :title="item.label" />
        </van-tabs>
      </div>
      <div class="b2-bottom">
        <div class="b2-select">
          <el-select v-model="selectValue" @change="selectChange" :placeholder="$t('text.t157')">
            <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="b2-list">
          <div class="b2-items box-pointer-hover" v-for="item in dappList" :key="item.id"
            @click="user_store.windowOpen(item.url)">
            <div class="b2i-row1 start-center">
              <img :src="imgurl + item.image" class="b2i-img1" alt="">
              <span class="b2i-text1">{{ item.title }}</span>
            </div>
            <div class="b2i-row2 van-multi-ellipsis--l2">{{ item.introduction }}
            </div>
            <div class="b2i-row3 end-center">
              <img src="@/assets/img/img97.png" class="b2i-img2" @click.stop="user_store.windowOpen(item.twitter)" alt="">
              <img src="@/assets/img/img98.png" class="b2i-img2" @click.stop="user_store.windowOpen(item.discord)" alt="">
              <img src="@/assets/img/img99.png" class="b2i-img2" @click.stop="user_store.windowOpen(item.telegram)"
                alt="">
            </div>
          </div>
        </div>
        <div class="b2-tips">
          {{ $t('text.t158') }}:
          <span>{{ $t('text.t159') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.dapp-style {
  .el-autocomplete {
    display: block;
  }
  .box1 {
    padding-top: 80px;
    padding-bottom: 30px;
    border-bottom: 1px solid @dex-color5;
    .b1-text1 {
      font-size: 48px;
      color: @dex-color1;
    }
    @media (max-width: 768px) {
      .b1-text1 {
        font-size: 18Px;
      }
    }
    .b1-inp {
      width: 40%;
    }
    .b1-img1 {
      width: 24px;
      margin-right: 5px;
    }
  }
  .box2 {
    display: grid;
    grid-template-columns: 280px 1fr;
    .b2-left {
      padding: 10px 20px;
      border-right: 1px solid @dex-color5;
    }
    .b2-top {
      overflow-x: hidden;
    }
    .b2-bottom {
      padding-top: 20px;
      padding-left: 20px;
      .b2-select {
        width: 50%;
        padding-bottom: 20px;
        @media (max-width: 768px) {
          display: none;
        }
      }
      .b2-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        @media (min-width: 1000px) and (max-width: 1280px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 768px) and (max-width: 1000px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) and (max-width: 768px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 640px) {
          grid-template-columns: repeat(2, 1fr);
        }
        .b2-items {
          border-radius: 10px;
          border: 1px solid @dex-color5;
          padding: 20px 20px 14px;
          .b2i-row1 {
            gap: 6px;
            margin-bottom: 10px;
            .b2i-img1 {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }
            .b2i-text1 {
              font-size: 18px;
              font-weight: 500;
              color: @dex-color1;
            }
          }
          .b2i-row2 {
            font-size: 14px;
            color: @dex-color14;
            margin-bottom: 14px;
          }
          .b2i-row3 {
            gap: 20px;
            .b2i-img2 {
              width: 16px;
            }
          }
        }
      }
      .b2-tips {
        padding-top: 110px;
        padding-bottom: 30px;
        font-size: 14px;
        color: @dex-color1;
        font-weight: 500;
        span {
          color: @dex-color4;
          font-weight: 400;
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
        .b2-tips {
          padding-top: 35Px;
        }
      }
    }
    @media (min-width: 768px) {
      .b2-top {
        display: none;
      }
    }
  }
}
</style>
<style lang="less">
.el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px @dex-color5 inset !important;
}
.el-select {
  --el-select-input-focus-border-color: @dex-color5;
  display: block;
  --el-select-border-color-hover: @dex-color5;
}
.el-select-dropdown__item.selected {
  color: @dex-color2;
  background-color: @dex-color13;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: @dex-color13;
}
.el-popper {
  border-radius: 10px;
}
.el-input {
  --el-input-border: 1px solid @dex-color5;
  --el-input-focus-border: @dex-color5;
  --el-input-border-color: @dex-color5;
  --el-input-border-radius: 30px;
  --el-input-focus-border-color: @dex-color5;
  --el-input-height: 52px;
}
.van-tabs__nav--line.van-tabs__nav--shrink,
.van-tabs__nav--line.van-tabs__nav--complete {
  padding-left: 0;
  padding-right: 0;
}
</style>