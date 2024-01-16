<script setup lang="ts">
import { computed } from 'vue';
import dexButtom2 from '@/components/dexButton2/index.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// import { getImgPath } from '@/utils/common';
import img102_zh from '@/assets/img/zh/img102.png';
import img102_en from '@/assets/img/en/img102.png';
import img103_zh from '@/assets/img/zh/img103.png';
import img103_en from '@/assets/img/en/img103.png';
import img16_zh from '@/assets/img/zh/img16.png';
import img16_en from '@/assets/img/en/img16.png';

const { locale } = useI18n()
const router = useRouter()

// const img102 = computed(() => {
//   return getImgPath(locale.value, 'img102')
// })
// const img103 = computed(() => {
//   return getImgPath(locale.value, 'img103')
// })
// const img16 = computed(() => {
//   return getImgPath(locale.value, 'img16')
// })
</script>

<template>
  <div class="plugin-style">
    <div class="box1 between-center box-px">
      <img src="@/assets/img/img1.png" @click="router.replace('/')" class="b1-img1 be_pointer" alt="">
      <div class="b1-text1 show768">{{ $t('text.t283') }}</div>
      <div class="b1-text2">{{ $t('text.t284') }}</div>
    </div>
    <div class="between-center box2 box-px">
      <div class="b2-left">
        <div class="b2-text1" v-html="$t('text.t285')"></div>
        <div class="b2-text2 show768"></div>
        <img :src="locale == 'zh' ? img16_zh : img16_en" class="b2-img1 hide768" alt="">
        <div class="show768">
          <div class="start-center b2-text3">
            <dexButtom2 down-type="chrome" />
            <dexButtom2 down-type="local" />
          </div>
        </div>
        <div class="hide768">
          <div class="evenly-center">
            <dexButtom2 down-type="apple" />
            <dexButtom2 down-type="android" />
          </div>
        </div>
      </div>
      <img :src="locale == 'zh' ? img16_zh : img16_en" class="b2-img1 show768" alt="">
    </div>
    <div class="center-center box3 box-px">
      <img src="@/assets/img/img85.png" class="b3-left" alt="">
      <div class="b2-right">
        <div class="b2-text1">{{ $t('text.t286') }}</div>
        <div class="b2-text2">{{ $t('text.t195') }}</div>
        <div class="b2-text3">
          <n-button round color="#0449E4">{{ $t('text.t287') }}</n-button>
        </div>
      </div>
    </div>
    <div class="between-center box4 box-px">
      <div class="b2-right">
        <div class="b2-text1">{{ $t('text.t288') }}</div>
        <div class="b2-text2">{{ $t('text.t289') }}</div>
        <div class="b2-text3">
          <n-button round color="#0449E4">{{ $t('text.t287') }}</n-button>
        </div>
      </div>
      <div class="b5bwallet-right">
        <img :src="locale == 'zh' ? img103_zh : img103_en" class="b5bwallet-img1" alt="">
        <img :src="locale == 'zh' ? img102_zh : img102_en" class="b5bwallet-img2" alt="">
        <img src="@/assets/img/img15.png" class="b5bwallet-img3" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less">
.plugin-style {
  overflow-x: hidden;
  .box1 {
    padding-top: 30px;
    padding-bottom: 30px;
    gap: 10px;
    z-index: 999;
    background-color: @dex-color6;
    position: sticky;
    top: 0;
    .b1-img1 {
      width: 200px;
      height: auto;
    }
    .b1-text1 {
      flex: auto;
      font-size: 32px;
      color: @dex-color2;
    }
    .b1-text2 {
      font-size: 18px;
      color: @dex-color1;
    }
  }
  .box2 {
    padding-top: 130px;
    gap: 90px;
    .b2-img1 {
      width: 55%;
    }
    .b2-left {
      .b2-text1 {
        font-size: 56px;
        font-weight: 500;
        color: @dex-color1;
        margin-bottom: 20px;
      }
      .b2-text2 {
        width: 60px;
        height: 6px;
        border-radius: 10px;
        background: @dex-color2;
      }
      .b2-text3 {
        padding-top: 100px;
        gap: 20px;
      }
      @media (max-width: 768px) {
        .b2-img1 {
          width: 100%;
        }
        .b2-text1 {
          text-align: center;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      .b2-left {
        .b2-text1 {
          font-size: 24Px;
          font-weight: 600;
        }
      }
    }
  }
  .box3 {
    padding-top: 200px;
    gap: 150px;
    .b3-left {
      width: 50%;
    }
    .b2-right {
      .b2-text1 {
        font-size: 48px;
        font-weight: 500;
        color: @dex-color1;
        margin-bottom: 30px;
      }
      .b2-text2 {
        font-size: 28px;
        color: @dex-color1;
      }
      .b2-text3 {
        padding-top: 80px;
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      flex-direction: column;
      gap: 30px;
      .b3-left {
        width: 70%;
      }
      .b2-right {
        text-align: center;
        .b2-text1 {
          margin-bottom: 10Px;
          font-size: 18Px;
        }
        .b2-text2 {
          font-size: 14Px;
        }
        .b2-text3 {
          padding-top: 10Px;
        }
      }
    }
  }
  .box4 {
    padding-top: 200px;
    padding-bottom: 200px;
    gap: 40px;
    .b2-right {
      .b2-text1 {
        font-size: 48px;
        font-weight: 500;
        color: @dex-color1;
        margin-bottom: 30px;
      }
      .b2-text2 {
        font-size: 28px;
        color: @dex-color1;
      }
      .b2-text3 {
        padding-top: 80px;
      }
    }
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
    @media (max-width: 768px) {
      flex-direction: column-reverse;
      flex-wrap: wrap;
      padding-top: 45Px;
      padding-bottom: 45Px;
      .b5bwallet-right {
        width: 100%;
      }
      .b2-right {
        text-align: center;
        .b2-text1 {
          margin-bottom: 10Px;
          font-size: 18Px;
          font-weight: 600;
          margin-bottom: 5Px;
        }
        .b2-text2 {
          font-size: 14Px;
        }
        .b2-text3 {
          padding-top: 10Px;
        }
      }
    }
  }
}
</style>