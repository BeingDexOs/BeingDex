<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import swiper2 from '@/components/swiper2/index.vue';
import swiper1 from '@/components/swiper1/index.vue';
import dexTable from '@/components/dexTable/index.vue';
import dexButtom1 from '@/components/dexButton1/index.vue';
import dexButtom2 from '@/components/dexButton2/index.vue';
import headers from '@/components/header/index.vue';
import dexShowInfo from '@/components/dexShowInfo/index.vue';
import { $post, imgurl } from '@/request/index';
import { TickerssListType } from '@/interface';
import { userStore } from '@/store/user';
import { removeEndZero } from '@/utils/web3';
import { NoticeType } from '@/interface';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import crossImg1 from '@/components/crossImg/index_zh.vue';
import crossImg2 from '@/components/crossImg/index_en.vue';
// import { getImgPath } from '@/utils/common';
import img13_zh from '@/assets/img/zh/img13.png';
import img13_en from '@/assets/img/en/img13.png';
import img14_zh from '@/assets/img/zh/img14.png';
import img14_en from '@/assets/img/en/img14.png';
import img16_zh from '@/assets/img/zh/img16.png';
import img16_en from '@/assets/img/en/img16.png';
import img17_zh from '@/assets/img/zh/img17.png';
import img17_en from '@/assets/img/en/img17.png';

const { locale } = useI18n()
const route = useRoute()
const user_store = userStore()

user_store.inviter_address = route.query.invite as string

// const img13 = computed(() => {
//   return getImgPath(locale.value, 'img13')
// })
// const img14 = computed(() => {
//   return getImgPath(locale.value, 'img14')
// })
// const img16 = computed(() => {
//   return getImgPath(locale.value, 'img16')
// })
// const img17 = computed(() => {
//   return getImgPath(locale.value, 'img17')
// })

type PartnerType = {
  image: string
}
const partnerList = ref<PartnerType[]>([])
const getPartner = () => {
  $post('/index/partner', { type: 0 }).then(res => {
    partnerList.value = [...res.data, ...res.data]
  })
}
getPartner()

const tickerssList = ref<TickerssListType[]>([])
const getTickerss = () => {
  $post('/swap/tickerss', { page: 1, limit: 10 }).then(res => {
    tickerssList.value = [...res.data.data, ...res.data.data]
  })
}
getTickerss()

const noticeList = ref<NoticeType[]>([])
const getNoticeList = () => {
  $post('/index/notic', {
    page: 1,
    limit: 1,
    address: user_store.user_address
  }).then(res => {
    noticeList.value = res.data.data
  })
}
getNoticeList()
const goNoticeItem = () => {
  router.push(`/noticeDetail/${noticeList.value[0].id}`)
}
</script>

<template>
  <headers />
  <div class="home-style">
    <div class="box-px box-bg">
      <div class="box1 between-center">
        <div class="b1_left">
          <!-- <div class="b1_text1">{{ $t('text.t26') }}</div> -->
          <div class="b1_text2" v-html="$t('text.t293')"></div>
          <div class="b1_text3">
            <div>
              <div class="start-center b1_text3_item">
                <div class="b1_text4"></div>
                <div>{{ $t('text.t195') }}</div>
              </div>
              <div class="start-center b1_text3_item">
                <div class="b1_text4"></div>
                <div>{{ $t('text.t196') }}</div>
              </div>
              <div class="start-center b1_text3_item">
                <div class="b1_text4"></div>
                <div>{{ $t('text.t197') }}</div>
              </div>
            </div>
          </div>
          <div class="show768">
            <div class="b1_down start-center">
              <dexButtom2 down-type="apple" />
              <dexButtom2 down-type="google" />
              <dexButtom2 down-type="android" />
            </div>
          </div>
        </div>
        <div class="swi1">
          <swiper2 />
        </div>
      </div>
      <dexShowInfo />
      <div class="box3">
        <swiper1 />
      </div>
      <div class="box3-bro" v-if="noticeList.length">
        <van-notice-bar @click="goNoticeItem" mode="link" scrollable left-icon="volume-o"
          :text="noticeList[0].introduction" />
      </div>
      <div class="box4">
        <div class="title">{{ $t('text.t198') }}</div>
        <div class="b4table">
          <dexTable type="home" />
        </div>
      </div>
      <div class="box5">
        <div class="b5list">
          <div class="b5item">
            <div class="start-center b5item-add">
              <div class="b5item-chi center-center" v-for="(item, i) in tickerssList" :key="i">
                <div class="start-center">
                  <img :src="imgurl + item.image" class="b5chi-img1" alt="">
                  <span class="b5chi-text1">{{ item.baseCoin }}</span>
                </div>
                <div class="text-right">
                  <div class="b5chi-text1">
                    <n-ellipsis>
                      {{ removeEndZero(item.lastPr) }}
                    </n-ellipsis>
                  </div>
                  <div class="end-center">
                    <img v-if="Number(item.risefall) > 0" src="@/assets/img/img11.png" class="b5chi-img2" alt="">
                    <img v-else src="@/assets/img/img12.png" class="b5chi-img2" alt="">
                    <span :class="Number(item.risefall) > 0 ? 'b5chi-text2' : 'b5chi-text3'">{{ Number(item.risefall) > 0
                      ?
                      '+' : '' }}{{ item.risefall }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="b5box">
          <div class="b5b-text-box">
            <div class="b5b-text1">{{ $t('text.t199') }}</div>
            <div class="b5b-text2">{{ $t('text.t200') }}</div>
            <div class="b5b-text3">{{ $t('text.t201') }}</div>
          </div>
          <div class="b5b-wallet between-center">
            <div class="b5bwallet-left">
              <div class="b5bwallet-text1">{{ $t('text.t202') }}</div>
              <div class="b1_text3">
                <div>
                  <div class="start-center b1_text3_item">
                    <div class="b1_text4"></div>
                    <div>{{ $t('text.t203') }}</div>
                  </div>
                  <div class="start-center b1_text3_item">
                    <div class="b1_text4"></div>
                    <div>{{ $t('text.t204') }}</div>
                  </div>
                  <div class="start-center b1_text3_item">
                    <div class="b1_text4"></div>
                    <div>{{ $t('text.t205') }}</div>
                  </div>
                </div>
              </div>
              <div class="b5bwallet-text2">
                <n-button round color="#0449E4">{{ $t('text.t291') }}</n-button>
              </div>
            </div>
            <div class="b5bwallet-right">
              <img :src="locale == 'zh' ? img14_zh : img14_en" class="b5bwallet-img1" alt="">
              <img :src="locale == 'zh' ? img13_zh : img13_en" class="b5bwallet-img2" alt="">
              <img src="@/assets/img/img15.png" class="b5bwallet-img3" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="box6">
        <div class="b6-text1">{{ $t('text.t206') }}</div>
        <div class="b6-text2">{{ $t('text.t207') }}</div>
        <div class="b6-flex between-center">
          <div class="b6-left">
            <img :src="locale == 'zh' ? img16_zh : img16_en" class="b6-img1" alt="">
            <img :src="locale == 'zh' ? img17_zh : img17_en" class="b6-img2" alt="">
          </div>
          <div class="b6-right">
            <div class="b6r-row1 start-center">
              <div class="b6r-img1"></div>
              <div>
                <div class="b6r-text1">{{ $t('text.t208') }}</div>
                <div class="b6r-text2">IOS & Android apps</div>
              </div>
            </div>
            <div class="b6r-row2 around-center">
              <div class="b6r-flexitem column-center">
                <img src="@/assets/img/img5.png" class="b6r-img2" alt="">
                <div class="b6r-text3">Google Play</div>
              </div>
              <div class="b6r-flexitem column-center">
                <img src="@/assets/img/img6.png" class="b6r-img2" alt="">
                <div class="b6r-text3">App Store</div>
              </div>
              <div class="b6r-flexitem column-center">
                <img src="@/assets/img/img7.png" class="b6r-img2" alt="">
                <div class="b6r-text3">APK</div>
              </div>
              <div class="b6r-flexitem column-center">
                <img src="@/assets/img/img18.png" class="b6r-img2" alt="">
                <div class="b6r-text3">APls</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box7">
      <div class="b7title">{{ $t('text.t209') }}</div>
      <div class="b7list-add-father">
        <div class="start-center b7-list">
          <img v-for="(item, i) in partnerList" :key="i" :src="imgurl + item.image" class="b7-item" alt="">
        </div>
      </div>
    </div>
    <div class="box-px">
      <div class="box8">
        <div class="b8-text1">{{ $t('text.t210') }}</div>
        <div class="b8-text2">{{ $t('text.t211') }}</div>
        <div class="b8-flex center-stretch">
          <div class="b8-item">
            <img src="@/assets/img/img19.png" class="b8-img1" alt="">
            <div class="b8-text3">{{ $t('text.t212') }}</div>
            <div class="b8-text4">{{ $t('text.t213') }}</div>
          </div>
          <div class="b8-item">
            <img src="@/assets/img/img20.png" class="b8-img2" alt="">
            <div class="b8-text3">{{ $t('text.t214') }}</div>
          </div>
          <div class="b8-item">
            <div class="b8-imgbox1 center-center">
              <img src="@/assets/img/img22.png" class="b8-img3" alt="">
            </div>
            <div class="b8-text3">{{ $t('text.t215') }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="box9">
      <div class="b9title">{{ $t('text.t216') }}</div>
      <div class="b9info box-px center-center">
        <img src="@/assets/img/img23.png" class="b9-img" alt="">
        <div class="b9-right">
          <div class="b9-text1">Aryan Nava</div>
          <div class="b9-text2" v-html="$t('text.t217')"></div>
        </div>
      </div>
    </div> -->
    <div class="box9">
      <div class="b9title">{{ $t('text.t294') }}</div>
      <div class="b9info add-b9info text-align">
        <component :is="locale == 'zh' ? crossImg1 : crossImg2" />
      </div>
    </div>
    <div class="box10">
      <div class="b10-text1">{{ $t('text.t88') }}</div>
      <div class="b10-text2">{{ $t('text.t89') }}</div>
      <div>
        <dexButtom1 />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.home-style {
  overflow-x: hidden;
  .box-bg {
    background-image: url('@/assets/img/bg1.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 1400px auto;
  }
  .box1 {
    padding-top: 100px;
    padding-bottom: 150px;
    gap: 50px;
    .swi1 {
      flex-shrink: 0;
      width: 33%;
      margin: auto;
    }
    .b1_left {
      .b1_text1 {
        font-size: 28px;
        color: @dex-color1;
        margin-bottom: 10px;
      }
      .b1_text2 {
        font-size: 56px;
        font-weight: 600;
        line-height: 1.5;
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
        }
      }
      .b1_down {
        padding-top: 80px;
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
      padding-top: 25Px;
      padding-bottom: 25Px;
      gap: 25Px;
      flex-wrap: wrap;
      .swi1 {
        width: 70%;
      }
      .b1_left {
        width: 100%;
        // text-align: center;
        .b1_text1 {
          font-size: 13Px;
          margin-bottom: 5Px;
          text-align: center;
        }
        .b1_text2 {
          font-size: 21Px;
          text-align: center;
        }
        .b1_text3 {
          font-size: 12Px;
          display: flex;
          justify-content: center;
          align-items: center;
          .b1_text3_item {
            padding-top: 10Px;
          }
        }
      }
    }
  }
  .box3 {
    margin-bottom: 100px;
    @media (max-width: 768px) {
      margin-bottom: 25Px;
    }
  }
  .box3-bro {
    margin-bottom: 50px;
    @media (max-width: 768px) {
      margin-bottom: 25Px;
    }
  }
  .box4 {
    .title {
      font-size: 48px;
      color: @dex-color1;
      padding-bottom: 30px;
    }
    @media (max-width: 768px) {
      .title {
        font-size: 18Px;
        padding-bottom: 10Px;
      }
    }
  }
  .box5 {
    padding-top: 40Px;
    @media (min-width: 768px) {
      padding-top: 140px;
      background-image: url('@/assets/img/bg1.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1400px auto;
    }
    .b5list {
      padding-bottom: 194px;
      .b5item {
        width: 100%;
        height: 56Px;
        overflow-x: hidden;
        overflow-y: hidden;
        position: relative;
        .b5item-add {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          animation: moveMove 35s linear infinite;
        }
        .b5item-chi {
          flex-shrink: 0;
          background: @dex-color6;
          border-radius: 100px;
          min-width: 250px;
          gap: 35px;
          border: 1px solid @dex-color5;
          padding: 0 15Px;
          margin-right: 40px;
          height: 100%;
          .b5chi-img1 {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .b5chi-text1 {
            max-width: 120px;
            font-size: 18px;
            color: @dex-color1;
          }
          .b5chi-text2 {
            font-size: 14px;
            color: @dex-color10;
          }
          .b5chi-text3 {
            font-size: 14px;
            color: @dex-color11;
          }
          .b5chi-img2 {
            width: 16px;
          }
        }
      }
    }
    .b5box {
      .b5b-text-box {
        color: @dex-color1;
        text-align: center;
        line-height: 1.8;
        padding-bottom: 60px;
        .b5b-text1 {
          font-size: 24px;
          font-weight: 500;
        }
        .b5b-text2 {
          font-size: 48px;
          font-weight: 600;
        }
        .b5b-text3 {
          font-size: 20px;
        }
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
        @media (max-width: 768px) {
          flex-wrap: wrap;
          .b5bwallet-right {
            width: 100%;
          }
        }
        .b5bwallet-left {
          .b5bwallet-text1 {
            font-size: 36px;
            font-weight: 500;
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
      }
    }
    @media (max-width: 768px) {
      .b5list {
        padding-bottom: 40Px;
      }
      .b5box {
        .b5b-text-box {
          padding-bottom: 20Px;
          .b5b-text1 {
            font-size: 12Px;
          }
          .b5b-text2 {
            font-size: 18Px;
          }
          .b5b-text3 {
            font-size: 10Px;
          }
        }
        .b5b-wallet {
          .b5bwallet-left {
            width: 100%;
            .b5bwallet-text1 {
              font-size: 16Px;
              text-align: center;
            }
            .b1_text3 {
              font-size: 12Px;
              display: flex;
              justify-content: center;
              align-items: center;
              .b1_text3_item {
                padding-top: 10Px;
              }
            }
            .b5bwallet-text2 {
              padding-top: 25Px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
  .box6 {
    padding-top: 120px;
    color: @dex-color1;
    .b6-text1 {
      text-align: center;
      line-height: 1.8;
      font-size: 48px;
      font-weight: 500;
    }
    .b6-text2 {
      text-align: center;
      line-height: 1.8;
      font-size: 24px;
    }
    .b6-flex {
      gap: 60px;
      .b6-left {
        width: 59.3%;
        height: 540px;
        position: relative;
        .b6-img1 {
          width: 100%;
          height: auto;
          position: absolute;
          left: 0;
          top: 0;
        }
        .b6-img2 {
          width: 241px;
          height: auto;
          position: absolute;
          right: 0;
          top: 60px;
        }
      }
      .b6-right {
        flex: auto;
        .b6r-row1 {
          background: @dex-color7;
          border-radius: 10px;
          padding: 20px;
          gap: 20px;
          margin-bottom: 40px;
          .b6r-img1 {
            width: 120px;
            height: 120px;
            background-color: #fff;
          }
          .b6r-text1 {
            font-size: 18px;
          }
          .b6r-text2 {
            font-size: 24px;
            font-weight: 500;
          }
        }
        .b6r-row2 {
          gap: 20px;
          .b6r-flexitem {
            text-align: center;
            .b6r-img2 {
              width: auto;
              height: 24px;
              margin-bottom: 10px;
            }
            .b6r-text3 {
              font-size: 20px;
            }
          }
        }
      }
      @media (max-width: 768px) {
        flex-wrap: wrap;
        .b6-left {
          width: 100%;
        }
        .b6-right {
          .b6r-row1 {
            .b6r-img1 {
              width: 60Px;
              height: 60Px;
            }
            .b6r-text1 {
              font-size: 14Px;
            }
            .b6r-text2 {
              font-size: 12Px;
            }
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 80Px;
      .b6-text1 {
        font-size: 18Px;
      }
      .b6-text2 {
        font-size: 10Px;
      }
    }
  }
  .box7 {
    margin-top: 180px;
    background: @dex-color7;
    padding: 40px 100px;
    .b7title {
      font-size: 32px;
      color: @dex-color4;
      margin-bottom: 36px;
      text-align: center;
    }
    .b7list-add-father {
      position: relative;
      overflow-x: hidden;
      height: 40px;
    }
    .b7-list {
      row-gap: 46px;
      column-gap: 120px;
      // flex-wrap: wrap;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      animation: moveMove 40s linear infinite;
      .b7-item {
        height: 100%;
        width: auto;
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }
      }
    }
    @media (max-width: 768px) {
      margin-top: 40Px;
      padding: 20Px 30Px;
      .b7title {
        font-size: 16Px;
        margin-bottom: 14Px;
      }
      .b7list-add-father {
        height: 20Px;
      }
      .b7-list {
        row-gap: 14Px;
        column-gap: 35Px;
        .b7-item {
          height: 20Px;
        }
      }
    }
  }
  .box8 {
    padding-top: 120px;
    color: @dex-color1;
    .b8-text1 {
      text-align: center;
      line-height: 1.8;
      font-size: 48px;
      font-weight: 500;
    }
    .b8-text2 {
      text-align: center;
      line-height: 1.8;
      font-size: 24px;
    }
    .b8-flex {
      padding-top: 40px;
      gap: 40px;
      .b8-item {
        border-radius: 10px;
        width: 33%;
        background: @dex-color7;
        padding: 46px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .b8-img1 {
          width: 65px;
          margin-bottom: 10px;
        }
        .b8-img2 {
          width: 129px;
          margin-bottom: 20px;
        }
        .b8-text3 {
          font-size: 20px;
          line-height: 1.8;
        }
        .b8-text4 {
          font-size: 16px;
          line-height: 1.8;
          color: @dex-color4;
        }
        .b8-imgbox1 {
          width: 58px;
          height: 50px;
          background-image: url('@/assets/img/img21.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-bottom: 15px;
        }
        .b8-img3 {
          width: 24px;
        }
      }
      @media (max-width: 768px) {
        flex-wrap: wrap;
        .b8-item {
          width: 100%;
          .b8-text3 {
            font-size: 13Px;
          }
          .b8-text4 {
            font-size: 12Px;
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      .b8-text1 {
        font-size: 18Px;
      }
      .b8-text2 {
        font-size: 10Px;
      }
      .b8-flex {
        padding-top: 10Px;
        gap: 10Px;
      }
    }
  }
  .box9 {
    color: @dex-color1;
    padding-top: 150px;
    .b9title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 60px;
      text-align: center;
    }
    .b9info {
      padding-top: 66px;
      padding-bottom: 66px;
      gap: 40px;
      background: @dex-color7;
      .add-b9info-img {
        min-width: 900Px;
        width: 100%;
        height: auto;
      }
      .b9-img {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
      }
      .b9-text1 {
        font-size: 28px;
        font-weight: 500;
        line-height: 2;
      }
      .b9-text2 {
        font-size: 20px;
        line-height: 2;
      }
      @media (max-width: 768px) {
        flex-wrap: wrap;
        padding-top: 20Px;
        padding-bottom: 20Px;
        gap: 10Px;
        .b9-right {
          width: 100%;
        }
        .b9-text1 {
          font-size: 14Px;
          font-weight: 600;
        }
        .b9-text2 {
          font-size: 13Px;
        }
      }
    }
    .add-b9info {
      overflow-x: auto;
      object {
        width: 100%;
      }
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      .b9title {
        font-size: 18Px;
        margin-bottom: 15Px;
      }
    }
  }
  .box10 {
    padding-top: 120px;
    padding-bottom: 120px;
    text-align: center;
    .b10-text1 {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.5;
    }
    .b10-text2 {
      font-size: 24px;
      line-height: 2;
      margin-bottom: 30px;
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      padding-bottom: 40Px;
      .b10-text1 {
        font-size: 18Px;
      }
      .b10-text2 {
        font-size: 12Px;
      }
    }
  }
}
</style>