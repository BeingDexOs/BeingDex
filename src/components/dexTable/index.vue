<script setup lang="ts">
import { ref, computed } from 'vue';
import { TabsType, TickersType } from '@/interface/index';
import dexTabs from '@/components/dexTabs/index.vue';
import { $post, imgurl } from '@/request/index';
import { useRouter } from 'vue-router';
import { removeEndZero } from '@/utils/web3';
import i18n from '@/locals/i18n'
import { ElMessage } from "element-plus"
import 'element-plus/es/components/message/style/css'

const { t } = i18n.global
const router = useRouter()

type TableType = 'home' | 'swap'
const props = defineProps<{
  type: TableType
}>()

const active = ref(0)
const tabList = computed(() => {
  if (props.type == 'home') {
    return [
      { id: 0, title: t('text.t13') },
      { id: 1, title: t('text.t14') },
      { id: 2, title: t('text.t15') },
      { id: 3, title: t('text.t16') },
    ]
  } else {
    return [
      { id: 0, title: t('text.t13') },
      { id: 1, title: t('text.t14') },
      { id: 2, title: t('text.t15') },
      { id: 4, title: 'GameFi' }]
  }
})
const changeActive = () => {
  if (props.type == 'swap') page.value = 1
  getData()
}

const options = [
  {
    label: '全部价格',
    key: "1"
  },
  {
    label: '部分价格',
    key: "2"
  },
  {
    label: '测试选项',
    key: "3"
  }
]
const handleSelect = (key: string | number) => {
  console.log(key);
}

const sortType = ref('') //1=价格升序,2=价格降序,3=涨幅升序,4=涨幅降序,5=24小时成交量升序,6=24小时成交量降序,
type SortAgeType = 'price' | 'Increase' | 'hour'
const changeSort = (type: SortAgeType) => {
  if (type == 'price') {
    if (sortType.value == '1') {
      sortType.value = '2'
    } else if (sortType.value == '2') {
      sortType.value = ''
    } else {
      sortType.value = '1'
    }
  } else if (type == 'Increase') {
    if (sortType.value == '3') {
      sortType.value = '4'
    } else if (sortType.value == '4') {
      sortType.value = ''
    } else {
      sortType.value = '3'
    }
  } else if (type == 'hour') {
    if (sortType.value == '5') {
      sortType.value = '6'
    } else if (sortType.value == '6') {
      sortType.value = ''
    } else {
      sortType.value = '5'
    }
  }
  getData()
}

const list = ref<TickersType[]>([])
const isloading = ref(false)
const page = ref(1)
const lastPage = ref(1)
const getData = () => {
  if (isloading.value) return
  isloading.value = true
  list.value = []
  $post('/swap/tickers', {
    type: active.value,
    sort: sortType.value,
    page: props.type == 'home' ? 1 : page.value,
    limit: 10
  }).then(res => {
    const { last_page, data } = res.data
    lastPage.value = last_page
    list.value = data
  }).finally(() => {
    isloading.value = false
  })
}
getData()

const changePage = (value: number) => {
  page.value = value
  getData()
}

const notOpen = () => {
  ElMessage.info(t('text.t296'))
}
</script>

<template>
  <!-- swap不展示 b4down -->
  <div class="dex-table-choose-style">
    <div class="b4tab">
      <dexTabs @change="changeActive" v-model:active="active" :tab-list="tabList" />
    </div>
    <!-- <div class="b4down start-center">
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <div class="b4d-title center-center be_pointer">
          <span class="b4d-item">全部价格</span>
          <img src="@/assets/img/img8.png" class="b4d-img" alt="">
        </div>
      </n-dropdown>
    </div> -->
  </div>
  <div class="dex-table-style">
    <div class="dt-addbox">
      <div class="dt-title dt-grid">
        <div class="dt1-item start-center">
          <div>#&nbsp; {{ $t('text.t17') }}</div>
        </div>
        <div class="dt1-item start-center">
          <div class="start-center be_pointer" @click="changeSort('price')">
            <span>{{ props.type == 'home' ? $t('text.t18') : $t('text.t19') }}</span>
            <img v-if="sortType == '1'" src="@/assets/img/img100.png" class="dt1-item-img" alt="">
            <img v-else-if="sortType == '2'" src="@/assets/img/img101.png" class="dt1-item-img" alt="">
            <img v-else src="@/assets/img/img9.png" class="dt1-item-img" alt="">
          </div>
        </div>
        <div class="dt1-item start-center">
          <div class="start-center be_pointer" @click="changeSort('Increase')">
            <span>{{ props.type == 'home' ? $t('text.t20') : $t('text.t21') }}</span>
            <img v-if="sortType == '3'" src="@/assets/img/img100.png" class="dt1-item-img" alt="">
            <img v-else-if="sortType == '4'" src="@/assets/img/img101.png" class="dt1-item-img" alt="">
            <img v-else src="@/assets/img/img9.png" class="dt1-item-img" alt="">
          </div>
        </div>
        <div class="dt1-item start-center">
          <div class="start-center be_pointer" @click="changeSort('hour')">
            <span>{{ $t('text.t22') }}</span>
            <img v-if="sortType == '5'" src="@/assets/img/img100.png" class="dt1-item-img" alt="">
            <img v-else-if="sortType == '6'" src="@/assets/img/img101.png" class="dt1-item-img" alt="">
            <img v-else src="@/assets/img/img9.png" class="dt1-item-img" alt="">
          </div>
        </div>
        <div class="dt1-item start-center">
          <div>{{ $t('text.t297') }}</div>
        </div>
      </div>
      <div v-if="list.length">
        <div class="dt-list dt-grid" v-for="(item, index) in list" :key="item.symbol">
          <div class="dt-item start-center">
            <div class="dtitem-text2" v-if="props.type == 'home'">{{ index }}</div>
            <img :src="imgurl + item.image" class="dtitem-img" alt="">
            <div class="dtitem-text1">
              {{ item.baseCoin }}<span>/{{ item.quoteCoin }}</span>
            </div>
          </div>
          <div class="dt-item">
            <div class="dtitem-text3">
              <n-ellipsis>
                {{ removeEndZero(item.lastPr) }}
              </n-ellipsis>
            </div>
          </div>
          <div class="dt-item">
            <div :class="Number(item.risefall) > 0 ? 'dtitem-text4' : 'dtitem-text5'">{{ Number(item.risefall) > 0 ? '+' :
              '' }}{{ item.risefall }}%</div>
          </div>
          <div class="dt-item">
            <div class="dtitem-text3">
              <n-ellipsis>
                {{ removeEndZero(item.baseVolume) }}
              </n-ellipsis>
            </div>
          </div>
          <div class="dt-item">
            <div class="dtitem-text6">
              <span class="be_pointer" @click="notOpen">{{ $t('text.t23') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="list-kong center-center">
        <template v-if="isloading">
          <van-loading type="spinner" color="#83838D" />
        </template>
        <template v-else>
          <span class="list-nodata">{{ $t('text.t24') }}</span>
        </template>
      </div>
      <div v-if="props.type == 'swap'" class="swap-page center-center">
        <n-pagination :page="page" @update:page="changePage" :page-slot="5" :page-count="lastPage" />
      </div>
    </div>
    <div class="dt-checkmore center-center" v-if="props.type == 'home'">
      <n-button strong secondary round @click="router.push('/swap')">
        <div class="center-center dtc-btn">
          <span class="dtc-text1">{{ $t('text.t25') }}</span>
          <img src="@/assets/img/img10.png" class="dtc-img" alt="">
        </div>
      </n-button>
    </div>
  </div>
</template>

<style lang="less">
.list-nodata {
  font-size: 14Px;
  color: @dex-color3;
}
.list-kong {
  height: 400px;
}
.dex-table-choose-style {
  .b4tab {
    padding-bottom: 20px;
  }
  .b4down {
    padding-bottom: 10px;
    gap: 20px;
    .b4d-title {
      border: 1px solid @dex-color5;
      background: @dex-color6;
      padding: 5px 20px;
      gap: 20px;
      border-radius: 50px;
      .b4d-item {
        font-size: 16px;
        color: @dex-color4;
      }
      .b4d-img {
        width: 16px;
      }
    }
  }
}
.dex-table-style {
  .swap-page {
    padding-top: 25Px;
  }
  .dt-addbox {
    overflow-x: auto;
  }
  .dt-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(120Px, 1fr));
    gap: 20Px;
  }
  .dt-title {
    padding: 10px 0;
    border-bottom: 1px solid @dex-color5;
    .dt1-item {
      font-size: 18px;
      color: @dex-color4;
      .dt1-item-img {
        width: 16px;
        flex-shrink: 0;
      }
    }
  }
  .dt-list {
    padding: 24px 0;
    border-bottom: 1px solid @dex-color5;
    .dt-item {
      .dtitem-text1 {
        font-size: 18px;
        color: @dex-color1;
        span {
          font-size: 16px;
          color: @dex-color3;
        }
      }
      .dtitem-text2 {
        font-size: 18px;
        color: @dex-color4;
      }
      .dtitem-text3 {
        font-size: 18px;
        color: @dex-color1;
      }
      .dtitem-text4 {
        font-size: 18px;
        color: @dex-color8;
      }
      .dtitem-text5 {
        font-size: 18px;
        color: @dex-color9;
      }
      .dtitem-text6 {
        font-size: 18px;
        color: @dex-color2;
        font-weight: bold;
      }
      .dtitem-img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-left: 20px;
        margin-right: 10px;
      }
    }
  }
  .dt-checkmore {
    padding-top: 50px;
    .n-button {}
    .dtc-btn {
      gap: 5px;
      .dtc-img {
        width: 16px;
      }
      .dtc-text1 {
        font-size: 18px;
        color: @dex-color1;
      }
    }
  }
  @media (max-width: 768px) {
    .dt-checkmore {
      padding-top: 15Px;
    }
  }
}
</style>