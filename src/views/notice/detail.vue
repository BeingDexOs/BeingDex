<script setup lang="ts">
import { ref } from 'vue';
import headers from '@/components/header/index.vue';
import dexBreadcrumb from '@/components/dexBreadcrumb/index.vue';
import { $post } from '@/request';
import { useRoute } from 'vue-router';
import { NoticeDetailType } from '@/interface';
import { useI18n } from 'vue-i18n';
import { userStore } from '@/store/user';

const user_store = userStore()
const { locale } = useI18n()
const route = useRoute()

const noticeDetail = ref<NoticeDetailType>()
const getNoticeDetail = () => {
  $post('/index/noticDetail', {
    notic_id: route.params.id,
    address: user_store.user_address
  }).then(res => {
    noticeDetail.value = res.data.detail
  })
}
getNoticeDetail()
</script>

<template>
  <headers />
  <div class="noticedetail-style box-px">
    <div class="box1" v-if="noticeDetail">
      <dexBreadcrumb :title-back="$t('text.t32')" :title="noticeDetail.title" />
    </div>
    <div class="box2">
      <div class="b2-item">
        <div class="b2i-box">
          <div class="b2i-text1">{{ noticeDetail?.title }}</div>
        </div>
        <div class="b2i-text2" v-html="noticeDetail?.content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.noticedetail-style {
  .box1 {
    padding-top: 50px;
    padding-bottom: 100px;
    @media (max-width: 768px) {
      padding-top: 15Px;
      padding-bottom: 25Px;
    }
  }
  .box2 {
    padding-bottom: 30px;
    .b2-item {
      .b2i-box {
        margin-bottom: 30px;
      }
      .b2i-text1 {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
      }
      .b2i-text2 {
        font-size: 20px;
      }
      .b2i-text3 {
        width: 10Px;
        height: 10Px;
        background: @dex-color9;
        border-radius: 50%;
      }
    }
  }
}
</style>