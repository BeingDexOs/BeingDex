<script setup lang="ts">
import headers from '@/components/header/index.vue';
</script>

<template>
  <headers />
  <div class="license-style">
    <div class="box1 box-px between-center">
      <div class="b1-left">
        <div class="b1-text1">{{ $t('text.t232') }}</div>
        <div class="b1-text2" v-html="$t('text.t233')"></div>
      </div>
      <img src="@/assets/img/img70.png" class="b1-right" alt="">
    </div>
    <div class="box2 box-px">
      <div class="b2-title">{{ $t('text.t234') }}</div>
      <div class="b2-list between-center">
        <div class="b2-item column-center">
          <img src="@/assets/img/img71.png" class="b2i-img1" alt="">
          <span class="b2i-text1">{{ $t('text.t235') }}</span>
        </div>
        <div class="b2-item column-center">
          <img src="@/assets/img/img72.png" class="b2i-img1" alt="">
          <span class="b2i-text1">{{ $t('text.t236') }}</span>
        </div>
        <div class="b2-item column-center">
          <img src="@/assets/img/img73.png" class="b2i-img1" alt="">
          <span class="b2i-text1">{{ $t('text.t237') }}</span>
        </div>
        <div class="b2-item column-center">
          <img src="@/assets/img/img74.png" class="b2i-img1" alt="">
          <span class="b2i-text1">{{ $t('text.t238') }}</span>
        </div>
      </div>
    </div>
    <div class="box3 box-px">
      <n-collapse arrow-placement="right" :accordion="true">
        <n-collapse-item :title="$t('text.t239')">
          <div class="b3-item" v-html="$t('text.t240')"></div>
        </n-collapse-item>
        <n-collapse-item :title="$t('text.t243')">
          <div class="b3-item" v-html="$t('text.t244')"></div>
        </n-collapse-item>
        <n-collapse-item :title="$t('text.t245')">
          <div class="b3-item" v-html="$t('text.t246')"></div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<style lang="less">
.license-style {
  .n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main {
    justify-content: space-between;
  }
  .box1 {
    padding-top: 95px;
    padding-bottom: 95px;
    gap: 100px;
    color: @dex-color1;
    .b1-left {
      .b1-text1 {
        font-size: 48px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .b1-text2 {
        font-size: 18px;
        line-height: 2;
      }
    }
    .b1-right {
      width: 380px;
    }
  }
  .box2 {
    padding-top: 100px;
    padding-bottom: 100px;
    color: @dex-color1;
    background: @dex-color7;
    .b2-title {
      font-size: 48px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 80px;
    }
    .b2-list {
      .b2-item {
        .b2i-img1 {
          width: 90px;
          margin-bottom: 30px;
        }
        .b2i-text1 {
          font-size: 24px;
        }
      }
    }
  }
  .box3 {
    padding-top: 120px;
    padding-bottom: 120px;
    color: @dex-color1;
    .b3-item {
      font-size: 16px;
    }
  }
  @media (max-width: 768px) {
    .box1 {
      padding-top: 25Px;
      padding-bottom: 25Px;
      flex-direction: column-reverse;
      gap: 25Px;
      .b1-left {
        .b1-text1 {
          text-align: center;
          font-size: 18Px;
          font-weight: 600;
        }
      }
    }
    .box2 {
      padding-top: 15Px;
      padding-bottom: 15Px;
      .b2-title {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 25Px;
      }
      .b2-list {
        .b2-item {
          .b2i-img1 {
            width: 45Px;
            margin-bottom: 10Px;
          }
          .b2i-text1 {
            font-size: 14Px;
          }
        }
      }
    }
    .box3 {
      padding-top: 25Px;
      padding-bottom: 40Px;
    }
  }
}
</style>