<script setup lang="ts">
import { ref, watch } from 'vue';
import headers from '@/components/header/index.vue';
import { userStore } from '@/store/user';
import { copy } from '@/utils/copy';
import { $post } from '@/request';
import { dateFormat } from '@/utils/date';
import listLoadMore from '@/components/listLoadMore/index.vue';

const user_store = userStore()

const inviteCode = ref('')

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

const inviteUser = () => {
  if (user_store.islogin) {
    copy(inviteCode.value)
  }
}

const page = ref(1)
const limit = 20
const loading = ref(false)
const finished = ref(false)
const firstLoadData = ref(false)
const inviteRecord = ref<any[]>([])
const getinviteList = (refresh: boolean = false) => {
  if (refresh) {
    page.value = 1
    loading.value = true
    finished.value = false
    firstLoadData.value = false
    inviteRecord.value = []
  }

  $post('/index/invitationList', {
    page: page.value,
    limit: limit,
    address: user_store.user_address
  }).then(res => {
    const { current_page, data, last_page } = res.data.info
    if (current_page >= last_page) finished.value = true;
    page.value++
    loading.value = false;
    firstLoadData.value = true

    inviteRecord.value = [...inviteRecord.value, ...data]
  })
}

watch(() => user_store.islogin, (val) => {
  if (val) {
    if (val) inviteCode.value = `${import.meta.env.VITE_INVITE_DOMAIN}/#/?invite=${user_store.user_address}`
    getinviteList(true)
  }
}, { immediate: true })
</script>

<template>
  <headers />
  <div class="invite-style">
    <div class="between-start box1 box-px">
      <div class="b1-left" v-html="$t('text.t218')"></div>
      <div class="b1-right">
        <!-- <div class="b1r-inp">
          <n-input v-model:value="inviteCode" type="text" placeholder="邀请码" />
        </div> -->
        <div class="b1r-inp">
          <n-input readonly v-model:value="inviteCode" type="text" :placeholder="$t('text.t219')" />
        </div>
        <div class="b1r-btns between-center">
          <div class="b1r-btn">
            <van-button round block color="#06061A" @click="inviteUser">{{ user_store.islogin ? $t('text.t220') :
              $t('text.t221')
            }}</van-button>
          </div>
          <!-- <div class="b1r-logo center-center">
            <img src="@/assets/img/img96.png" class="b1r-img1" alt="">
          </div>
          <div class="b1r-logo center-center">
            <img src="@/assets/img/img96.png" class="b1r-img1" alt="">
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="box2 box-px">
      <div class="b2-row1">
        <div class="b2r1-item" v-for="i in 10">
          <img src="@/assets/img/logo.png" class="b2r1-img" alt="">
          <span class="b2r1-text1">用户 BJU***nh8R 获得 5USDT 现金券奖励</span>
        </div>
      </div>
      <div class="b2-row2">
        <div class="b2-item">
          <div class="b2r2-text1">折扣券:</div>
          <div class="b2r2-text2">每位好友累计净充值 ≥50 USDT 后获得 100 USDT 抵扣券</div>
          <div class="b2r2-btn1">
            <van-button round block color="#06061A">立即邀请</van-button>
          </div>
        </div>
        <div class="b2-item">
          <div class="b2r2-text1">现金盲盒:</div>
          <div class="b2r2-text2">每位好友累计交易额 ≥200 USDT 可获得一个盲盒</div>
          <div class="b2r2-btn1">
            <van-button round block color="#06061A">立即邀请</van-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="box3 box-px">
      <div class="b3-row1 between-center">
        <div class="start-center b3r1-left">
          <span class="b3r1-text1">{{ $t('text.t222') }}</span>
          <!-- <span class="b3r1-text2">奖励记录</span> -->
        </div>
        <div>
          <!-- <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <div class="b4d-title center-center be_pointer">
              <span class="b4d-item">全部价格</span>
              <img src="@/assets/img/img8.png" class="b4d-img" alt="">
            </div>
          </n-dropdown> -->
        </div>
      </div>
      <div class="b3-row2">
        <div class="b3r2-grid b3r2-head">
          <div>{{ $t('text.t223') }}</div>
          <div>{{ $t('text.t224') }}</div>
          <div>{{ $t('text.t225') }}</div>
          <div>{{ $t('text.t226') }}</div>
          <div>{{ $t('text.t227') }}</div>
          <div>{{ $t('text.t228') }}</div>
        </div>
        <div class="add-invitelist" id="loadmore_style_id">
          <listLoadMore :loading="loading" :loading-text="$t('text.t54')" :finished-text="$t('text.t55')" :isRoot="false"
            :finished="finished" :first-load-data="firstLoadData" @load-data="getinviteList">
            <div class="b3r2-grid b3r2-item" v-for="item in inviteRecord" :key="item.id">
              <div>{{ item.username.slice(0, 4) }}...{{ item.username.slice(item.username.length - 3) }}</div>
              <div>{{ dateFormat(item.createtime, 'yyyy-MM-dd') }}</div>
              <div>--</div>
              <div>--</div>
              <div>--</div>
              <div>--</div>
            </div>
          </listLoadMore>
        </div>
      </div>
    </div>
    <div class="box4 box-px">
      <div class="b4-text1">{{ $t('text.t229') }}</div>
      <div class="b4-grid">
        <img src="@/assets/img/banner/banner1.png" class="b4-img" alt="">
        <img src="@/assets/img/banner/banner2.png" class="b4-img" alt="">
        <img src="@/assets/img/banner/banner3.png" class="b4-img" alt="">
      </div>
      <div class="b4-text1">{{ $t('text.t230') }}</div>
      <div class="b4-text2" v-html="$t('text.t231')"></div>
    </div>
  </div>
</template>

<style lang="less">
.invite-style {
  overflow-x: hidden;
  .add-invitelist {
    min-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .box1 {
    padding-top: 76px;
    padding-bottom: 76px;
    background: @dex-color7;
    .b1-left {
      font-size: 48px;
      font-weight: 500;
      color: @dex-color1;
    }
    .b1-right {
      width: 40.6%;
      background: @dex-color6;
      box-shadow: 0px 4px 10px 0px rgba(6, 6, 26, 0.04);
      border-radius: 10px;
      padding: 50px;
      .n-input {
        background-color: @dex-color7;
      }
      .b1r-inp {
        margin-bottom: 30px;
      }
      .b1r-btns {
        gap: 20px;
        .b1r-btn {
          flex: auto;
        }
        .b1r-logo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: @dex-color7;
          border: 1px solid @dex-color5;
          .b1r-img1 {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      padding-top: 25Px;
      padding-bottom: 25Px;
      gap: 25Px;
      .b1-left {
        width: 100%;
        text-align: center;
        font-size: 18Px;
        font-weight: 600;
      }
      .b1-right {
        width: 100%;
        padding: 25Px;
      }
    }
  }
  .box2 {
    padding-top: 50px;
    padding-bottom: 120px;
    @media (max-width: 768px) {
      padding-top: 15Px;
    }
    .b2-row1 {
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 50px;
      .b2r1-item {
        background: @dex-color18;
        border-radius: 50px;
        padding: 15px 20px 15px 10px;
        margin-right: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        .b2r1-img {
          width: 40px;
          height: 40px;
        }
        .b2r1-text1 {
          font-size: 14px;
          color: @dex-color1;
          line-height: 40px;
        }
      }
    }
    .b2-row2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      .b2-item {
        border: 1px solid @dex-color5;
        border-radius: 10px;
        padding: 30px;
        height: 540px;
        .b2r2-text1 {
          font-size: 32px;
          font-weight: 500;
          color: @dex-color1;
          margin-bottom: 10px;
        }
        .b2r2-text2 {
          font-size: 18px;
          color: @dex-color1;
          margin-bottom: 20px;
        }
        .b2r2-btn1 {
          width: 30%;
        }
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        .b2-item {
          .b2r2-text1 {
            font-size: 18Px;
            font-weight: 600;
            margin-bottom: 5Px;
          }
        }
      }
    }
  }
  .box3 {
    padding-top: 50px;
    padding-bottom: 100px;
    .b3-row1 {
      margin-bottom: 20px;
      .b3r1-left {
        gap: 50px;
        .b3r1-text1 {
          font-size: 24px;
          font-weight: 500;
          color: @dex-color1;
        }
        .b3r1-text2 {
          font-size: 18px;
          font-weight: 500;
          color: @dex-color4;
        }
      }
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
    .b3-row2 {
      overflow-x: hidden;
      .b3r2-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(120Px, 1fr));
        gap: 20Px;
      }
      .b3r2-head {
        font-size: 16px;
        color: @dex-color4;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid @dex-color6;
      }
      .b3r2-item {
        font-size: 16px;
        color: @dex-color1;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid @dex-color6;
      }
    }
  }
  .box4 {
    padding-bottom: 120px;
    .b4-text1 {
      font-size: 48px;
      font-weight: 500;
      color: @dex-color1;
      margin-bottom: 30px;
    }
    .b4-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      margin-bottom: 120px;
      @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }
      .b4-img {
        width: 100%;
      }
    }
    .b4-text2 {
      font-size: 16px;
      color: @dex-color1;
    }
    @media (max-width: 768px) {
      padding-bottom: 40Px;
      .b4-text1 {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 10Px;
      }
      .b4-grid {
        margin-bottom: 25Px;
      }
    }
  }
}
</style>