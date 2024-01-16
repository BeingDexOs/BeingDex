<script setup lang="ts">
import { ref, computed } from 'vue';
import headers from '@/components/header/index.vue';
import '@/assets/font/iconfont.css';
import chartbox from '@/components/chartbox/index.vue';
import dexTable from '@/components/dexTable/index.vue';
import { $post, imgurl } from '@/request';
import { ChartDataType, CurrencyItemType } from '@/interface';
import { getPointTwo } from '@/utils/web3';
import { userStore } from '@/store/user';

const user_store = userStore()

const chainData = ref<ChartDataType[]>([])
const chainList = computed(() => {
  if (chainData.value.length <= 3) {
    return chainData.value
  } else {
    if (user_store.wWidth > 1280) {
      return chainData.value.length > 6 ? chainData.value.slice(0, 6) : chainData.value
    } else if (user_store.wWidth > 768 && user_store.wWidth <= 1280) {
      return chainData.value.length > 5 ? chainData.value.slice(0, 5) : chainData.value
    } else {
      return chainData.value.slice(0, 3)
    }
  }
})

const getChainData = () => {
  $post('/swap/candles').then(res => {
    chainData.value = res.data
  })
}
getChainData()

const increase = ref<CurrencyItemType[]>([])
const latest = ref<CurrencyItemType[]>([])
const popular = ref<CurrencyItemType[]>([])
const volume = ref<CurrencyItemType[]>([])
const getCurrencyList = () => {
  $post('/swap/currencyList').then(res => {
    increase.value = res.data.increase
    latest.value = res.data.latest
    popular.value = res.data.popular
    volume.value = res.data.volume
  })
}
getCurrencyList()
</script>

<template>
  <headers active="swap" />
  <div class="swap-style box-px">
    <div class="box1 between-center">
      <div class="b1-text1">{{ $t('text.t249') }}</div>
      <!-- <div class="b1-auto">
        <div class="b1a-box">
          <div class="b1a-text1">{{ $t('text.t250') }}</div>
          <div class="b1a-box1">
            <div class="b1ab1">
              <img src="@/assets/img/img36.png" class="b1ab1-img1" alt="">
              <div>
                <div class="b1ab1-text1">Blast</div>
                <div class="b1ab1-text2">$0.2873</div>
              </div>
            </div>
            <div class="b1ab1">
              <div>
                <div class="b1ab1-text2">{{ $t('text.t251') }}(M)</div>
                <div class="b1ab1-text1">593.48M</div>
              </div>
            </div>
            <div class="start-center">
              <span class="iconfont icon-arrow-right-top b1ab1-text3"></span>
              <span class="b1ab1-text3">+194.12%</span>
            </div>
            <div class="b1ab1">
              <div>
                <div class="b1ab1-text2">{{ $t('text.t252') }}(USDT)</div>
                <div class="b1ab1-text1">$12.79M</div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="b1-inp">
        <!-- <n-input round placeholder="搜索" clearable>
          <template #prefix>
            <img src="@/assets/img/img35.png" class="b1-img1" alt="">
          </template>
        </n-input> -->
      </div>
    </div>
    <div class="box2">
      <div class="b2-chart-box" v-for="item in chainList" :key="item.baseCoin">
        <div class="between-center">
          <span class="b2c-text1">{{ item.baseCoin }}</span>
          <span :class="Number(item.risefall) > 0 ? 'b2c-text2-up' : 'b2c-text2'">{{ item.risefall }}%</span>
        </div>
        <div class="center-center">
          <span :class="Number(item.risefall) > 0 ? 'b2c-text3-up' : 'b2c-text3'">${{ getPointTwo(item.lastPr, 5)
          }}</span>
        </div>
        <div>
          <chartbox :data="item.linechart" :risefall="Number(item.risefall)" :id="item.baseCoin" />
        </div>
      </div>
    </div>
    <div class="box3">
      <div class="b3-item">
        <div class="b3item-text1">{{ $t('text.t253') }}</div>
        <div>
          <div class="b3item-b1 between-center" v-for="item in popular" :key="item.symbol">
            <div class="b3item-re">
              <img :src="imgurl + item.image" class="b3item-img1" alt="">
              <!-- <img src="@/assets/img/img38.png" class="b3item-img2" alt=""> -->
            </div>
            <div class="b3item-text2 flexauto1280">{{ item.baseCoin }}</div>
            <div class="b3item-text2 show1280">${{ getPointTwo(item.lastPr, 5) }}</div>
            <div class="b3item-text3" :class="Number(item.risefall) > 0 ? 'b3item-text3' : 'b3item-text3-down'">
              {{ getPointTwo(item.risefall, 5) }}%</div>
          </div>
        </div>
      </div>
      <div class="b3-item">
        <div class="b3item-text1">{{ $t('text.t254') }}</div>
        <div>
          <div class="b3item-b1 between-center" v-for="item in latest" :key="item.symbol">
            <div class="b3item-re">
              <img :src="imgurl + item.image" class="b3item-img1" alt="">
              <!-- <img src="@/assets/img/img38.png" class="b3item-img2" alt=""> -->
            </div>
            <div class="b3item-text2 flexauto1280">{{ item.baseCoin }}</div>
            <div class="b3item-text2 show1280">${{ getPointTwo(item.lastPr, 5) }}</div>
            <div class="b3item-text3" :class="Number(item.risefall) > 0 ? 'b3item-text3' : 'b3item-text3-down'">
              {{ getPointTwo(item.risefall, 5) }}%</div>
          </div>
        </div>
      </div>
      <div class="b3-item">
        <div class="b3item-text1">{{ $t('text.t255') }}</div>
        <div>
          <div class="b3item-b1 between-center" v-for="item in increase" :key="item.symbol">
            <div class="b3item-re">
              <img :src="imgurl + item.image" class="b3item-img1" alt="">
              <!-- <img src="@/assets/img/img38.png" class="b3item-img2" alt=""> -->
            </div>
            <div class="b3item-text2 flexauto1280">{{ item.baseCoin }}</div>
            <div class="b3item-text2 show1280">${{ getPointTwo(item.lastPr, 5) }}</div>
            <div class="b3item-text3" :class="Number(item.risefall) > 0 ? 'b3item-text3' : 'b3item-text3-down'">
              {{ getPointTwo(item.risefall, 5) }}%</div>
          </div>
        </div>
      </div>
      <div class="b3-item">
        <div class="b3item-text1">{{ $t('text.t256') }}</div>
        <div>
          <div class="b3item-b1 between-center" v-for="item in volume" :key="item.symbol">
            <div class="b3item-re">
              <img :src="imgurl + item.image" class="b3item-img1" alt="">
              <!-- <img src="@/assets/img/img38.png" class="b3item-img2" alt=""> -->
            </div>
            <div class="b3item-text2 flexauto1280">{{ item.baseCoin }}</div>
            <div class="b3item-text2 show1280">${{ getPointTwo(item.lastPr, 5) }}</div>
            <div class="b3item-text3" :class="Number(item.risefall) > 0 ? 'b3item-text3' : 'b3item-text3-down'">
              {{ getPointTwo(item.risefall, 5) }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box4">
      <dexTable type="swap" />
    </div>
  </div>
</template>

<style lang="less">
.swap-style {
  padding-top: 80px;
  .box1 {
    gap: 30px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    .b1-text1 {
      font-size: 36px;
      flex-shrink: 0;
    }
    .b1-inp {
      width: 40%;
    }
    @media (max-width: 768px) {
      .b1-text1 {
        width: 100%;
        font-size: 18Px;
      }
      .b1-inp {
        width: 100%;
      }
    }
    .b1-img1 {
      width: 24px;
      margin-right: 5px;
    }
    .b1-auto {
      flex: auto;
      @media (min-width: 768px) {
        display: none;
      }
      .b1a-box {
        background: linear-gradient(158deg, #D4E2FF 1%, #F0F5FF 99%);
        border-radius: 5Px;
        padding: 15Px;
        .b1a-text1 {
          font-size: 14Px;
          font-weight: 600;
          padding-bottom: 10Px;
          border-bottom: 1Px solid @dex-color15;
        }
        .b1a-box1 {
          padding-top: 10Px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15Px;
          .b1ab1 {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10Px;
            .b1ab1-img1 {
              width: 28Px;
            }
            .b1ab1-text1 {
              font-size: 14Px;
              font-weight: 500;
              line-height: 1.5;
              color: @dex-color1;
            }
            .b1ab1-text2 {
              font-size: 12Px;
              color: @dex-color14;
            }
          }
          .b1ab1-text3 {
            font-size: 16Px;
            color: @dex-color2;
            margin-right: 5px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .box2 {
    padding-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    @media (min-width: 768px) and (max-width: 1280px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    .b2-chart-box {
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      background: @dex-color16;
      .b2c-text1 {
        font-size: 20px;
        font-weight: 500;
        color: @dex-color1;
        line-height: 1.5;
      }
      .b2c-text2 {
        font-size: 16px;
        font-weight: 500;
        color: @dex-color9;
      }
      .b2c-text2-up {
        font-size: 16px;
        font-weight: 500;
        color: @dex-color10;
      }
      .b2c-text3 {
        font-size: 20px;
        font-weight: 500;
        color: @dex-color9;
        line-height: 1.8;
      }
      .b2c-text3-up {
        font-size: 20px;
        font-weight: 500;
        color: @dex-color10;
        line-height: 1.8;
      }
    }
  }
  .box3 {
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    overflow-x: auto;
    @media (max-width: 768px) {
      display: none;
    }
    .b3-item {
      border: 1px solid @dex-color5;
      border-radius: 10px;
      padding: 20px;
      .b3item-text1 {
        font-size: 20px;
        color: @dex-color17;
        margin-bottom: 20px;
      }
      .b3item-b1 {
        gap: 6px;
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .b3item-re {
          position: relative;
          width: 40px;
          height: 36px;
          .b3item-img1 {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
          .b3item-img2 {
            width: 20px;
            height: 20px;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 2;
          }
        }
        .b3item-text2 {
          font-size: 16px;
          font-weight: 500;
          color: @dex-color1;
        }
        .b3item-text3 {
          font-size: 16px;
          font-weight: 500;
          color: @dex-color8;
        }
        .b3item-text3-down {
          font-size: 16px;
          font-weight: 500;
          color: @dex-color11;
        }
        .b3item-text4 {
          font-size: 16px;
          font-weight: 500;
          color: @dex-color9;
        }
      }
    }
  }
  .box4 {
    padding-bottom: 80px;
  }
  @media (max-width: 768px) {
    padding-top: 15Px;
    .box1 {
      gap: 10Px;
    }
  }
}
</style>