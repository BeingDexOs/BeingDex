<script setup lang="ts">
import { ref, computed } from 'vue';
import headers from '@/components/header/index.vue';
import dexButtom2 from '@/components/dexButton2/index.vue';
import dexShowInfo from '@/components/dexShowInfo/index.vue';
import { $post, imgurl } from '@/request/index';
import { useI18n } from 'vue-i18n';
// import { getImgPath } from '@/utils/common';
import img75_zh from '@/assets/img/zh/img75.png';
import img75_en from '@/assets/img/en/img75.png';
import img76_zh from '@/assets/img/zh/img76.png';
import img76_en from '@/assets/img/en/img76.png';
import img77_zh from '@/assets/img/zh/img77.png';
import img77_en from '@/assets/img/en/img77.png';

const { locale } = useI18n()

// const img75 = computed(() => {
//   return getImgPath(locale.value, 'img75')
// })
// const img76 = computed(() => {
//   return getImgPath(locale.value, 'img76')
// })
// const img77 = computed(() => {
//   return getImgPath(locale.value, 'img77')
// })

type PartnerType = {
  image: string
}
const partnerList = ref<PartnerType[]>([])
const partnerList2 = ref<PartnerType[]>([])
const getPartner = () => {
  $post('/index/partner', { type: 1 }).then(res => {
    let arr1 = []
    let arr2 = []
    for (let i = 0; i < res.data.length; i++) {
      const element = res.data[i];
      if (i % 2 === 0) {
        arr1.push(element)
      } else {
        arr2.push(element)
      }
    }

    partnerList.value = [...arr1, ...arr1]
    partnerList2.value = [...arr2, ...arr2]
  })
}
getPartner()
</script>

<template>
  <headers />
  <div class="wallet-style">
    <div class="box-px box-bg">
      <div class="box1 between-center">
        <div class="b1_left">
          <div class="b1_text2">{{ $t('text.t257') }}</div>
          <div class="b1_text1">{{ $t('text.t258') }}</div>
          <div class="swi1 hide768">
            <img :src="locale == 'zh' ? img75_zh : img75_en" class="swi1-img" alt="">
          </div>
          <div>
            <div class="b1_down start-center">
              <dexButtom2 down-type="google" />
              <dexButtom2 down-type="apple" />
              <dexButtom2 down-type="android" />
            </div>
          </div>
        </div>
        <div class="swi1 show768">
          <img :src="locale == 'zh' ? img75_zh : img75_en" class="swi1-img" alt="">
        </div>
      </div>
      <div class="show768">
        <dexShowInfo />
      </div>
      <div class="box3">
        <div class="b3-title show768">{{ $t('text.t259') }}</div>
        <div class="b3-text1 show768">{{ $t('text.t260') }}</div>
        <div class="b5b-wallet between-center">
          <div class="b5bwallet-left">
            <div class="b5bwallet-text1">{{ $t('text.t261') }}</div>
            <div class="b5bwallet-text9">{{ $t('text.t262') }}</div>
            <div class="b5bwallet-text2">
              <n-button round color="#0449E4">{{ $t('text.t263') }} NFT</n-button>
            </div>
          </div>
          <div class="b5bwallet-right">
            <img :src="locale == 'zh' ? img77_zh : img77_en" class="b5bwallet-img1" alt="">
            <img :src="locale == 'zh' ? img76_zh : img76_en" class="b5bwallet-img2" alt="">
            <img src="@/assets/img/img15.png" class="b5bwallet-img3" alt="">
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="b4-title">{{ $t('text.t264') }}</div>
        <div class="b4-text1">{{ $t('text.t265') }}</div>
        <div class="b4-box">
          <div class="b4b-item">
            <img src="@/assets/img/img78.png" class="b4b-img1" alt="">
            <div>
              <div class="b4b-text1">{{ $t('text.t266') }}</div>
              <div class="b4b-text2">{{ $t('text.t267') }}</div>
            </div>
          </div>
          <div class="b4b-next center-center">
            <img src="@/assets/img/img81.png" class="b4b-img2" alt="">
          </div>
          <div class="b4b-item">
            <img src="@/assets/img/img79.png" class="b4b-img1" alt="">
            <div>
              <div class="b4b-text1">{{ $t('text.t268') }}</div>
              <div class="b4b-text2">{{ $t('text.t269') }}</div>
            </div>
          </div>
          <div class="b4b-next center-center">
            <img src="@/assets/img/img81.png" class="b4b-img2" alt="">
          </div>
          <div class="b4b-item">
            <img src="@/assets/img/img80.png" class="b4b-img1" alt="">
            <div>
              <div class="b4b-text1">{{ $t('text.t270') }}</div>
              <div class="b4b-text2">{{ $t('text.t271') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-center box5 box-px">
      <div class="end-center b5-left">
        <div class="column-center b5-item">
          <img src="@/assets/img/img83.png" class="b5-img1" alt="">
          <div>
            <div class="b5-text1">{{ $t('text.t272') }}</div>
            <div class="b5-text2">{{ $t('text.t273') }}</div>
          </div>
        </div>
        <div class="b5-add-box1">
          <div class="column-center b5-item b5-item-mb30">
            <img src="@/assets/img/img82.png" class="b5-img1" alt="">
            <div>
              <div class="b5-text1">{{ $t('text.t274') }}</div>
              <div class="b5-text2">{{ $t('text.t275') }}</div>
            </div>
          </div>
          <div class="column-center b5-item">
            <img src="@/assets/img/img84.png" class="b5-img1" alt="">
            <div>
              <div class="b5-text1">{{ $t('text.t276') }}</div>
              <div class="b5-text2">{{ $t('text.t277') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="b5-right">
        <div class="b5-text3">{{ $t('text.t26') }}</div>
        <div class="b5-text4" v-if="$t('text.t194')"></div>
        <div class="b5-text5">
          <div class="start-center b5-text5_item">
            <div class="b5-text6"></div>
            <div>{{ $t('text.t278') }}</div>
          </div>
          <div class="start-center b5-text5_item">
            <div class="b5-text6"></div>
            <div>{{ $t('text.t279') }}</div>
          </div>
          <div class="start-center b5-text5_item">
            <div class="b5-text6"></div>
            <div>{{ $t('text.t280') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box6">
      <div class="b6-title">{{ $t('text.t281') }}</div>
      <div class="b6-text1">{{ $t('text.t282') }}</div>
      <div class="b6-list">
        <div class="start-center b6-item">
          <img class="b6-img1" v-for="(item, i) in partnerList" :key="i" :src="imgurl + item.image" alt="">
        </div>
      </div>
      <div class="b6-add-kongbox"></div>
      <div class="b6-list">
        <div class="start-center b6-item2">
          <img class="b6-img1" v-for="(item, i) in partnerList2" :key="i" :src="imgurl + item.image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.wallet-style {
  overflow-x: hidden;
  .box-bg {
    background-image: url('@/assets/img/bg1.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 1400px auto;
  }
  .box1 {
    padding-top: 40px;
    padding-bottom: 80px;
    gap: 50px;
    .swi1 {
      width: 40%;
      margin: auto;
      .swi1-img {
        width: 100%;
      }
    }
    .b1_left {
      .b1_text1 {
        font-size: 28px;
        color: @dex-color1;
      }
      .b1_text2 {
        font-size: 56px;
        font-weight: 600;
        line-height: 1.5;
        color: @dex-color1;
        margin-bottom: 30px;
      }
      .b1_text3 {
        font-size: 24px;
        line-height: 1.5;
        color: @dex-color3;
        .b1_text3_item {
          padding-top: 20px;
        }
        .b1_text4 {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: @dex-color2;
          margin-right: 10px;
        }
      }
      .b1_down {
        padding-top: 100px;
        gap: 20px;
        .b1ditem {
          border: 1px solid @dex-color4;
          border-radius: 100px;
          padding: 16px 38px;
          gap: 10px;
          .b1ditem-img {
            width: 24px;
          }
          .b1ditem-text {
            font-size: 18px;
            color: @dex-color1;
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 100Px;
      flex-wrap: wrap;
      .swi1 {
        width: 70%;
      }
      .b1_left {
        .b1_text1 {
          font-size: 13Px;
          text-align: center;
          margin-bottom: 25Px;
        }
        .b1_text2 {
          font-size: 24Px;
          text-align: center;
        }
        .b1_down {
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
      }
    }
  }
  .box3 {
    padding-bottom: 180px;
    .b3-title {
      text-align: center;
      font-size: 48px;
      font-weight: 500;
      color: @dex-color1;
      margin-bottom: 10px;
    }
    .b3-text1 {
      font-size: 20px;
      color: @dex-color1;
      margin-bottom: 60px;
      text-align: center;
    }
    .b5b-wallet {
      gap: 40px;
      .b5bwallet-right {
        flex-shrink: 0;
        margin: auto;
        width: 45%;
        height: 731px;
        position: relative;
        .b5bwallet-img1 {
          width: 262px;
          position: absolute;
          top: 163px;
          right: 111px;
          z-index: 2;
        }
        .b5bwallet-img2 {
          width: 296px;
          position: absolute;
          top: 40px;
          left: 1px;
          z-index: 3;
        }
        .b5bwallet-img3 {
          width: 500px;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1;
        }
      }
      .b5bwallet-left {
        .b5bwallet-text1 {
          font-size: 36px;
          font-weight: 500;
          margin-bottom: 20px;
          color: @dex-color1;
        }
        .b5bwallet-text9 {
          font-size: 18px;
          color: @dex-color1;
        }
        .b1_text3 {
          font-size: 24px;
          line-height: 1.5;
          color: @dex-color3;
          .b1_text3_item {
            padding-top: 20px;
          }
          .b1_text4 {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: @dex-color2;
            margin-right: 10px;
            flex-shrink: 0;
          }
        }
        .b5bwallet-text2 {
          padding-top: 80px;
        }
      }
      @media (max-width: 768px) {
        gap: 50Px;
        flex-wrap: wrap;
        .b5bwallet-right {
          width: 100%;
        }
        .b5bwallet-left {
          width: 100%;
          text-align: center;
          .b5bwallet-text1 {
            font-size: 16Px;
            font-weight: 600;
          }
          .b5bwallet-text9 {
            font-size: 11Px;
          }
          .b5bwallet-text2 {
            padding-top: 10Px;
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 52Px;
    }
  }
  .box4 {
    padding-bottom: 130px;
    color: @dex-color1;
    .b4-title {
      font-size: 48px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 10px;
    }
    .b4-text1 {
      font-size: 24px;
      color: #06061A;
      text-align: center;
      margin-bottom: 50px;
    }
    .b4-box {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      .b4b-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .b4b-img1 {
          width: 136px;
          margin-bottom: 30px;
        }
        .b4b-text1 {
          font-size: 24px;
          text-align: center;
        }
        .b4b-text2 {
          font-size: 16px;
          color: @dex-color4;
          text-align: center;
        }
      }
      .b4b-next {
        .b4b-img2 {
          width: 56px;
        }
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 55Px;
        .b4b-next {
          display: none;
        }
        .b4b-item {
          flex-direction: row;
          .b4b-img1 {
            width: 51Px;
            margin-bottom: 0;
            margin-right: 17Px;
          }
          .b4b-text1 {
            text-align: left;
            margin-bottom: 10px;
            font-size: 14Px;
          }
          .b4b-text2 {
            text-align: left;
            font-size: 13Px;
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 40Px;
      .b4-title {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 5Px;
      }
      .b4-text1 {
        font-size: 14Px;
        margin-bottom: 25Px;
      }
    }
  }
  .box5 {
    padding-top: 50px;
    padding-bottom: 150px;
    position: relative;
    gap: 70px;
    .b5-left {
      padding-right: 50px;
      gap: 30px;
    }
    .b5-item {
      background: #FFFFFF;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      padding: 50px 30px 40px;
      width: 260px;
      .b5-img1 {
        width: 56px;
        margin-bottom: 30px;
      }
      .b5-text1 {
        font-size: 24px;
        color: @dex-color1;
        margin-bottom: 10px;
      }
      .b5-text2 {
        font-size: 16px;
        color: @dex-color1;
        line-height: 2;
      }
    }
    .b5-item-mb30 {
      margin-bottom: 30px;
    }
    .b5-right {
      .b5-text3 {
        color: @dex-color1;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .b5-text4 {
        color: @dex-color1;
        font-size: 40px;
        font-weight: 600;
        line-height: 2;
        margin-bottom: 20px;
      }
      .b5-text5 {
        font-size: 24px;
        line-height: 2;
        color: @dex-color4;
        .b5-text6 {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: @dex-color2;
          margin-right: 10px;
        }
      }
    }
    @media (max-width: 768px) {
      gap: 50Px;
      flex-direction: column-reverse;
      background: @dex-color21;
      padding-bottom: 50px;
      .b5-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .b5-text3 {
          font-size: 12Px;
          margin-bottom: 5Px;
        }
        .b5-text4 {
          font-size: 16Px;
          margin-bottom: 10Px;
        }
        .b5-text5 {
          font-size: 11Px;
        }
      }
      .b5-left {
        width: 100%;
        padding-right: 0;
        gap: 30Px;
        flex-direction: column;
      }
      .b5-item {
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        padding: 20Px 15Px 20Px 20Px;
        .b5-img1 {
          margin-bottom: 0;
          margin-right: 30Px;
        }
        .b5-text1 {
          font-size: 14Px;
          margin-bottom: 5Px;
        }
        .b5-text2 {
          font-size: 13Px;
          color: @dex-color4;
        }
      }
      .b5-add-box1 {
        width: 100%;
      }
    }
  }
  .box6 {
    padding-top: 120px;
    color: @dex-color1;
    padding-bottom: 120px;
    .b6-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 10px;
      text-align: center;
    }
    .b6-text1 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 80px;
    }
    .b6-add-kongbox {
      height: 40px;
    }
    .b6-list {
      position: relative;
      overflow-x: hidden;
      height: 80px;
      .b6-item {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        animation: moveMove 40s linear infinite;
      }
      .b6-item2 {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        animation: moveMove2 40s linear infinite;
      }
      .b6-img1 {
        height: 100%;
        margin-right: 40px;
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      padding-bottom: 48Px;
      .b6-title {
        font-size: 18Px;
        margin-bottom: 5Px;
      }
      .b6-text1 {
        font-size: 14Px;
        margin-bottom: 15Px;
      }
    }
  }
}
</style>