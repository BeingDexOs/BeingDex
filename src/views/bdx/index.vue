<script setup lang="ts">
import { ref } from 'vue';
import headers from '@/components/header/index.vue';
import { $post, imgurl } from '@/request';
import { BgdType } from '@/interface';
import { useI18n } from 'vue-i18n';
import { TntroduceListType } from '@/interface';
import { userStore } from '@/store/user';
import { removeEndZero } from '@/utils/web3';
import { dateFormat } from '@/utils/date';

const user_store = userStore()
const { locale } = useI18n()

const bgdList = ref<BgdType[]>([])
const obtainList = ref<BgdType[]>([])
const getBdx = (type: number) => {
  $post('/bgd/equity', { type: type }).then(res => {
    if (type === 0) {
      bgdList.value = res.data
    } else {
      obtainList.value = res.data
    }
  })
}
getBdx(0)
getBdx(1)

const introduceActice = ref<IntroduceType>(1)
const introduceList = ref<TntroduceListType[]>([])
type IntroduceType = 0 | 1 | 2  //0=打新认购,1=优惠服务,2=通缩机制
const getIntroduce = (type: IntroduceType) => {
  $post('/bgd/introduce', { type: type }).then(res => {
    introduceList.value = res.data
  })
}
getIntroduce(1)

const changeActive = (type: IntroduceType) => {
  introduceActice.value = type
  getIntroduce(type)
}
</script>

<template>
  <headers />
  <div class="bdx-style">
    <div class="box1 box-px between-center">
      <div class="b1-left">
        <div class="b1-text1">{{ $t('text.t117') }}</div>
        <div class="b1-text2">{{ $t('text.t118') }}</div>
        <div class="b1-img-box b1-img-show1">
          <img src="@/assets/img/img55.png" class="b1-img" alt="">
        </div>
        <div class="b1-btns">
          <div class="b1-btn1">
            <button class="ellipsis">{{ $t('text.t119') }}</button>
          </div>
          <div class="b1-btn2">
            <n-button strong round secondary type="tertiary">
              {{ $t('text.t120') }}
            </n-button>
          </div>
        </div>
      </div>
      <img src="@/assets/img/img55.png" class="b1-img b1-img-show2" alt="">
    </div>
    <div class="box2 box-px">
      <div class="b2-title">{{ $t('text.t121') }}</div>
      <div class="b2-list">
        <div class="b2-item" :class="item.is == '1' ? 'box-pointer-hover' : ''" v-for="item in bgdList" :key="item.id">
          <img :src="imgurl + item.image" class="b2i-img" alt="">
          <div class="b2i-right">
            <div class="b2i-text1">{{ item.title }}</div>
            <div class="b2i-text2">{{ item.introduction }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box3 box-px">
      <div class="b3-title">{{ $t('text.t122') }}</div>
      <div class="b3-tabs">
        <div class="be_pointer" :class="introduceActice == 0 ? 'b3t-text2' : 'b3t-text1'" @click="changeActive(0)">{{
          $t('text.t123') }}
        </div>
        <div class="be_pointer" :class="introduceActice == 1 ? 'b3t-text2' : 'b3t-text1'" @click="changeActive(1)">{{
          $t('text.t124') }}
        </div>
        <div class="be_pointer" :class="introduceActice == 2 ? 'b3t-text2' : 'b3t-text1'" @click="changeActive(2)">{{
          $t('text.t125') }}
        </div>
      </div>
      <div class="b3-list hideen-scrollbar">
        <div class="b3-item" :class="item.is == '1' ? 'box-pointer-hover' : ''" v-for="item in introduceList"
          :key="item.id">
          <img src="@/assets/img/img61.png" class="b3i-img1" alt="">
          <div class="start-center b3i-box1">
            <div class="b3i-text1">{{ item.title }}</div>
            <div class="b3i-text2" v-if="item.status == '1'">{{ $t('text.t126') }}</div>
            <div class="b3i-text4" v-else-if="item.status == '2'">{{ $t('text.t127') }}</div>
          </div>
          <div class="b3i-text3">{{ item.introduction }}</div>
          <img src="@/assets/img/img60.png" class="b3i-img2" v-if="item.is == '1'" alt="">
        </div>
      </div>
    </div>
    <div class="box2 box-px">
      <div class="b2-title">{{ $t('text.t128') }}</div>
      <div class="b2-list">
        <div class="b2-item" :class="item.is == '1' ? 'box-pointer-hover' : ''" v-for="item in obtainList" :key="item.id">
          <img :src="imgurl + item.image" class="b2i-img3" alt="">
          <div class="b2i-right">
            <div class="b2i-text1">{{ item.title }}</div>
            <div class="b2i-text2">{{ item.introduction }}</div>
          </div>
          <img src="@/assets/img/img60.png" class="b2i-img2" alt="">
        </div>
      </div>
    </div>
    <div class="box4 box-px">
      <div class="b4-title">{{ $t('text.t129') }}</div>
      <div class="b4-text1">
        {{ $t('text.t130') }}
      </div>
      <div class="b4-tab">
        <n-table :bordered="true" :single-line="false">
          <tbody>
            <tr>
              <td>{{ $t('text.t131') }}</td>
              <td>{{ user_store.bdkInfo?.full_name }}</td>
            </tr>
            <tr>
              <td>{{ $t('text.t132') }}</td>
              <td>{{ user_store.bdkInfo?.name }}</td>
            </tr>
            <tr>
              <td>{{ $t('text.t292') }}</td>
              <td>{{ user_store.bdkInfo?.token_type }}</td>
            </tr>
            <tr>
              <td>{{ $t('text.t134') }}</td>
              <td>{{ user_store.bdkInfo?.contract.slice(0, 5) }}...{{
                user_store.bdkInfo?.contract.slice(user_store.bdkInfo.contract.length - 4) }}</td>
            </tr>
            <tr v-if="user_store.bdkInfo">
              <td>{{ $t('text.t135') }}</td>
              <td>{{ removeEndZero(user_store.bdkInfo.issue_price) }}</td>
            </tr>
            <tr>
              <td>{{ $t('text.t136') }}</td>
              <td>{{ user_store.bdkInfo?.circulation_supply }}</td>
            </tr>
            <tr>
              <td>{{ $t('text.t137') }}</td>
              <td>{{ user_store.bdkInfo?.total_supply }}</td>
            </tr>
            <tr v-if="user_store.bdkInfo">
              <td>{{ $t('text.t138') }}</td>
              <td>{{ dateFormat(user_store.bdkInfo.issue_time) }}</td>
            </tr>
          </tbody>
        </n-table>
      </div>
      <div class="b4-grid">
        <div class="b4g-item1">
          <div class="b4g1-row1">
            <div class="b4g1-text1">{{ $t('text.t139') }}</div>
            <div class="b4g1-text2">{{ user_store.bdkInfo?.displace_num }} BDX</div>
          </div>
          <div class="b4g1-row2">
            <div class="b4g2-text1">{{ user_store.bdkInfo?.displace_ratio }}%</div>
            <div class="b4g2-text2">{{ $t('text.t140') }}</div>
            <div class="b4g2-text3">
              <img src="@/assets/img/img67.png" class="b4g2-img1" alt="">
            </div>
          </div>
        </div>
        <div class="b4g-item2">
          <div class="b4g1-row1">
            <div class="b4g1-text1">{{ $t('text.t141') }}</div>
            <div class="b4g1-text2">{{ user_store.bdkInfo?.team_incentive }} BDX</div>
          </div>
          <div class="b4g1-row2">
            <div class="b4g2-text1">{{ user_store.bdkInfo?.team_ratio }}%</div>
            <div class="b4g2-text2">{{ $t('text.t142') }}</div>
            <div class="b4g2-text3">
              <img src="@/assets/img/img68.png" class="b4g2-img1" alt="">
            </div>
          </div>
        </div>
        <div class="b4g-item4">
          <div class="b4g1-row1">
            <div class="b4g1-text1">{{ $t('text.t143') }}</div>
            <div class="b4g1-text2">{{ user_store.bdkInfo?.ecological_investment }} BDX</div>
          </div>
          <div class="b4g1-centerline"></div>
          <div class="b4g1-row2">
            <div class="b4g2-text1">{{ user_store.bdkInfo?.fund_Investment }}%</div>
            <div class="b4g2-text2">{{ $t('text.t144') }}</div>
          </div>
        </div>
        <div class="b4g-item4">
          <div class="b4g1-row1">
            <div class="b4g1-text1">{{ $t('text.t145') }}</div>
            <div class="b4g1-text2">{{ user_store.bdkInfo?.branding_num }} BDX</div>
          </div>
          <div class="b4g1-centerline"></div>
          <div class="b4g1-row2">
            <div class="b4g2-text1">{{ user_store.bdkInfo?.branding_ratio }}%</div>
            <div class="b4g2-text2">{{ $t('text.t146') }}3%</div>
          </div>
        </div>
        <div class="b4g-item4">
          <div class="b4g1-row1">
            <div class="b4g1-text1">{{ $t('text.t147') }}</div>
            <div class="b4g1-text2">{{ user_store.bdkInfo?.user_input }} BDX</div>
          </div>
          <div class="b4g1-centerline"></div>
          <div class="b4g1-row2">
            <div class="b4g2-text1">{{ user_store.bdkInfo?.user_input_ratio }}%</div>
            <div class="b4g2-text2">{{ $t('text.t146') }}4%</div>
          </div>
        </div>
        <div class="b4g-item3">
          <div class="b4g3-row1">
            <div class="b4g3-text1">BeingDex {{ $t('text.t148') }}</div>
            <div class="b4g3-text2">{{ user_store.bdkInfo?.fund_protect_num }} BDX</div>
          </div>
          <div class="b4g3-centerline"></div>
          <div class="b4g3-row2">
            <div class="b4g3-text3">{{ user_store.bdkInfo?.fund_protect_ratio }}%</div>
            <div class="b4g3-text4">{{ $t('text.t149') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box5 box-px between-center">
      <div class="b5-left">
        <div class="b5-text1">{{ $t('text.t150') }}</div>
        <div class="b5-btn">
          <div class="b1-btn1 add-b1-btn1">
            <button class="ellipsis">{{ $t('text.t151') }}</button>
          </div>
        </div>
      </div>
      <div class="b5-right">
        <img src="@/assets/img/img69.png" class="b5-img1" alt="">
      </div>
    </div>
  </div>
</template>


<style lang="less">
.bdx-style {
  .b1-btn1 {
    max-width: 50%;
    button {
      max-width: 100%;
      background-color: transparent;
      border: 1px solid @dex-color2;
      padding: 12px 40px;
      font-size: 18px;
      border-radius: 100px;
      color: @dex-color2;
      box-shadow: 0 5px @dex-color2;
      cursor: pointer;
      // white-space: nowrap;
    }
    button:active {
      color: white;
      box-shadow: 0 4px @dex-color2;
      transform: translateY(4px);
    }
    button:hover:not(:disabled) {
      background: @dex-color2;
      color: white;
      text-shadow: 0 1px #bcb4b4;
    }
    button:disabled {
      cursor: auto;
      color: grey;
    }
  }
  .add-b1-btn1 {
    max-width: 100%;
  }
  .box1 {
    background: @dex-color7;
    padding-top: 70px;
    padding-bottom: 70px;
    gap: 40Px;
    .b1-img {
      width: 413px;
    }
    .b1-text1 {
      font-size: 48px;
      font-weight: 500;
      color: @dex-color1;
      margin-bottom: 10px;
    }
    .b1-text2 {
      font-size: 18px;
      color: @dex-color1;
      margin-bottom: 40px;
    }
    .b1-btns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      .b1-btn2 {
        .n-button {
          padding: 12px 40px;
          font-size: 18px;
          border: 1px solid @dex-color4;
          color: @dex-color4;
          background-color: transparent;
          height: auto;
          line-height: 1.5;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      padding-bottom: 25Px;
      flex-wrap: wrap;
      .b1-left {
        width: 100%;
      }
      .b1-img-box {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
      }
      .b1-img {
        width: 70%;
      }
      .b1-img-show2 {
        display: none;
      }
      .b1-text1 {
        text-align: center;
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 5Px;
      }
      .b1-text2 {
        text-align: center;
        font-size: 12Px;
        margin-bottom: 10Px;
      }
      .b1-btns {
        justify-content: center;
      }
    }
    @media (min-width: 768px) {
      .b1-img-show1 {
        display: none;
      }
    }
  }
  .box2 {
    padding-top: 100px;
    padding-bottom: 100px;
    color: @dex-color1;
    .b2-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 50px;
    }
    .b2-list {
      .b2-item {
        margin-bottom: 30px;
        border: 1px solid @dex-color5;
        border-radius: 10px;
        padding: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .b2i-img {
          width: 90px;
          flex-shrink: 0;
        }
        .b2i-img3 {
          width: 56px;
          flex-shrink: 0;
        }
        .b2i-right {
          flex: auto;
        }
        .b2i-img2 {
          width: 24px;
        }
        .b2i-text1 {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .b2i-text2 {
          font-size: 16px;
          font-weight: 400;
        }
      }
      @media (max-width: 768px) {
        .b2-item {
          gap: 10Px;
          flex-wrap: wrap;
        }
        .b2i-right {
          width: 100%;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      padding-bottom: 25Px;
      .b2-title {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 25Px;
      }
      .b2-list {
        .b2-item {
          padding: 15Px;
          margin-bottom: 15Px;
        }
      }
    }
  }
  .box3 {
    padding-top: 100px;
    padding-bottom: 80px;
    background: @dex-color21;
    .b3-title {
      font-size: 48px;
      font-weight: 500;
      color: @dex-color1;
      margin-bottom: 50px;
    }
    .b3-tabs {
      display: flex;
      align-items: baseline;
      gap: 50px;
      margin-bottom: 30px;
      .b3t-text1 {
        font-size: 18px;
        font-weight: 500;
        color: @dex-color4;
      }
      .b3t-text2 {
        font-size: 24px;
        font-weight: 500;
        color: @dex-color1;
      }
    }
    .b3-list {
      padding: 20px;
      overflow-x: auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(250px, 1fr));
      gap: 40px;
      .b3-item {
        background: @dex-color6;
        border-radius: 10px;
        border: 1px solid @dex-color12;
        padding: 30px 30px 25px;
        .b3i-img1 {
          width: 56px;
          margin-bottom: 20px;
        }
        .b3i-box1 {
          margin-bottom: 10px;
          gap: 10px;
          .b3i-text1 {
            font-size: 24px;
            color: @dex-color1;
          }
          .b3i-text2 {
            background: @dex-color2;
            border-radius: 10px;
            padding: 4px 20px;
            color: @dex-color6;
            font-size: 14px;
            white-space: nowrap;
          }
          .b3i-text4 {
            background: @dex-color12;
            border-radius: 10px;
            padding: 4px 20px;
            color: @dex-color1;
            font-size: 14px;
            white-space: nowrap;
          }
        }
        .b3i-text3 {
          font-size: 16px;
          color: @dex-color14;
          margin-bottom: 10px;
        }
        .b3i-img2 {
          width: 16px;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      padding-bottom: 25Px;
      .b3-title {
        font-size: 18Px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20Px;
      }
      .b3-list {
        gap: 15Px;
        .b3-item {
          padding: 15Px;
          .b3i-img1 {
            width: 28Px;
            margin-bottom: 10Px;
          }
          .b3i-box1 {
            gap: 5Px;
            .b3i-text1 {
              font-size: 14Px;
            }
            .b3i-text2 {
              padding: 2Px 10Px;
              font-size: 12Px;
            }
            .b3i-text4 {
              padding: 2Px 10Px;
              font-size: 12Px;
            }
          }
          .b3i-text3 {
            font-size: 12Px;
          }
        }
      }
    }
  }
  .box4 {
    color: @dex-color1;
    padding-top: 100px;
    padding-bottom: 100px;
    background: @dex-color7;
    .b4-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .b4-text1 {
      font-size: 24px;
      margin-bottom: 50px;
    }
    .b4-tab {
      margin-bottom: 50px;
    }
    .b4-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'box1 box2 .'
        'box1 box2 .'
        'box1 box2 .'
        'box1 box3 box3';
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:
          'box1'
          'box2'
          '.'
          '.'
          '.'
          'box3';
      }
      .b4g-item1 {
        grid-area: box1;
        background: @dex-color6;
        border-radius: 10px;
        .b4g1-row1 {
          padding: 20px 20px 10px;
          border-bottom: 1px solid @dex-color5;
          line-height: 2;
          .b4g1-text1 {
            font-size: 24px;
            font-weight: 600;

          }
          .b4g1-text2 {
            font-size: 18px;
          }
          @media (max-width: 768px) {
            .b4g1-text1 {
              font-size: 14Px;
            }
            .b4g1-text2 {
              font-size: 12Px;
            }
          }
        }
        .b4g1-row2 {
          padding: 20px 30px 20px 20px;
          .b4g2-text1 {
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 10px;
            @media (max-width: 768px) {
              font-size: 18Px;
              font-weight: 600;
            }
          }
          .b4g2-text2 {
            font-size: 16px;
            margin-bottom: @dex-color4;
            margin-bottom: 100px;
          }
          .b4g2-text3 {
            width: 100%;
            text-align: right;
            .b4g2-img1 {
              width: 200px;
            }
          }
        }
      }
      .b4g-item2 {
        grid-area: box2;
        background: @dex-color6;
        border-radius: 10px;
        .b4g1-row1 {
          padding: 20px 20px 10px;
          border-bottom: 1px solid @dex-color5;
          line-height: 2;
          .b4g1-text1 {
            font-size: 24px;
            font-weight: 600;
          }
          .b4g1-text2 {
            font-size: 18px;
          }
          @media (max-width: 768px) {
            .b4g1-text1 {
              font-size: 14Px;
            }
            .b4g1-text2 {
              font-size: 12Px;
            }
          }
        }
        .b4g1-row2 {
          padding: 20px 30px 20px 20px;
          .b4g2-text1 {
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 10px;
            @media (max-width: 768px) {
              font-size: 18Px;
              font-weight: 600;
            }
          }
          .b4g2-text2 {
            font-size: 16px;
            margin-bottom: @dex-color4;
            margin-bottom: 20px;
          }
          .b4g2-text3 {
            width: 100%;
            text-align: right;
            .b4g2-img1 {
              width: 140px;
            }
          }
        }
      }
      .b4g-item4 {
        background: @dex-color6;
        border-radius: 10px;
        padding: 20px;
        display: grid;
        grid-template-columns: 38% 1Px 1fr;
        gap: 20px;
        .b4g1-row1 {
          line-height: 2;
          .b4g1-text1 {
            font-size: 24px;
            font-weight: 600;
          }
          .b4g1-text2 {
            font-size: 18px;
          }
          @media (max-width: 768px) {
            .b4g1-text1 {
              font-size: 14Px;
            }
            .b4g1-text2 {
              font-size: 12Px;
            }
          }
        }
        .b4g1-centerline {
          width: 1Px;
          height: 100%;
          background: @dex-color5;
        }
        .b4g1-row2 {
          .b4g2-text1 {
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 10px;
            @media (max-width: 768px) {
              font-size: 18Px;
              font-weight: 600;
            }
          }
          .b4g2-text2 {
            font-size: 16px;
            margin-bottom: @dex-color4;
            margin-bottom: 20px;
          }
        }
      }
      .b4g-item3 {
        grid-area: box3;
        display: grid;
        grid-template-columns: 1fr 1Px 1fr;
        gap: 20px;
        padding: 20px;
        background: @dex-color18;
        border: 1px solid @dex-color19;
        border-radius: 10px;
        color: @dex-color20;
        .b4g3-row1 {
          line-height: 2;
          .b4g3-text1 {
            font-size: 24px;
            font-weight: 600;
          }
          .b4g3-text2 {
            font-size: 14px;
          }
          @media (max-width: 768px) {
            .b4g3-text1 {
              font-size: 14Px;
            }
            .b4g3-text2 {
              font-size: 11Px;
            }
          }
        }
        .b4g3-centerline {
          width: 1Px;
          height: 100%;
          background: @dex-color19;
        }
      }
      .b4g3-row2 {
        .b4g3-text3 {
          font-size: 36px;
          font-weight: 500;
          @media (max-width: 768px) {
            font-size: 18Px;
            font-weight: 600;
          }
        }
        .b4g3-text4 {
          font-size: 16px;
          line-height: 2;
        }
      }
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      padding-bottom: 25Px;
      .b4-title {
        font-size: 18Px;
        margin-bottom: 5Px;
      }
      .b4-text1 {
        font-size: 14Px;
        margin-bottom: 15Px;
      }
      .b4-tab {
        margin-bottom: 15Px;
      }
    }
  }
  .box5 {
    padding-top: 100px;
    padding-bottom: 90px;
    gap: 20px;
    .b5-left {
      .b5-text1 {
        font-size: 24px;
        color: @dex-color1;
        margin-bottom: 40px;
      }
      .b5-btn {
        display: flex;
        justify-content: flex-start;
      }
    }
    .b5-right {
      .b5-img1 {
        width: 434px;
      }
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      padding-bottom: 40Px;
      .b5-left {
        width: 100%;
        .b5-text1 {
          text-align: center;
          font-size: 14Px;
          margin-bottom: 15Px;
        }
        .b5-btn {
          justify-content: center;
        }
      }
      .b5-right {
        display: none;
      }
    }
  }
}
</style>