<script setup lang="ts">
import { ref } from 'vue';
import headers from '@/components/header/index.vue';
import { useRouter } from 'vue-router';
import { $post } from '@/request';
import { NoticeType } from '@/interface';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui'
import { userStore } from '@/store/user';
import i18n from '@/locals/i18n'

const { t } = i18n.global
const user_store = userStore()
const { locale } = useI18n()
const router = useRouter()
const message = useMessage()

const noticeList = ref<NoticeType[]>([])
const getNoticeList = () => {
  $post('/index/notic', {
    page: 1,
    limit: 50,
    address: user_store.user_address
  }).then(res => {
    noticeList.value = res.data.data
  })
}
getNoticeList()

const checkAll = () => {
  $post('/index/read', {
    address: user_store.user_address
  }).then(res => {
    message.success(t('text.t247'))
    getNoticeList()
  })
}
</script>

<template>
  <headers />
  <div class="notice-style box-px">
    <div class="box1 between-center">
      <span class="b1-text1">{{ $t('text.t32') }}</span>
      <div class="end-center be_pointer" @click="checkAll">
        <img src="@/assets/img/img45.png" class="b1-img1" alt="">
        <span class="b1-text2">{{ $t('text.t248') }}</span>
      </div>
    </div>
    <div class="box2">
      <div class="b2-item be_pointer" @click="router.push(`/noticeDetail/${item.id}`)" v-for="item in noticeList"
        :key="item.id">
        <div class="b2i-box between-center">
          <div class="b2i-text1">{{ item.title }}</div>
          <div class="b2i-text3" v-if="!item.is_read"></div>
        </div>
        <div class="b2i-text2 ellipsis2">{{ item.introduction }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.notice-style {
  padding-bottom: 50px;
  .box1 {
    color: @dex-color1;
    padding-bottom: 30px;
    .b1-text1 {
      font-size: 48px;
      font-weight: 500;
    }
    .b1-img1 {
      width: 27px;
    }
    .b1-text2 {
      font-size: 16px;
      margin-left: 5px;
    }
    @media (max-width: 768px) {
      padding-bottom: 15Px;
      .b1-text1 {
        font-size: 18Px;
      }
      .b1-text2 {
        font-size: 14Px;
      }
    }
  }
  .box2 {
    .b2-item {
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid @dex-color12;
      .b2i-box {
        gap: 20px;
        margin-bottom: 10px;
      }
      .b2i-text1 {
        font-size: 24px;
        font-weight: 500;
      }
      .b2i-text2 {
        font-size: 16px;
      }
      .b2i-text3 {
        width: 10Px;
        height: 10Px;
        background: @dex-color9;
        border-radius: 50%;
      }
    }
    @media (max-width: 768px) {
      .b2-item {
        padding-top: 15Px;
        padding-bottom: 15Px;
      }
    }
  }
}
</style>