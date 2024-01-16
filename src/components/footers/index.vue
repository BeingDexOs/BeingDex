<script setup lang="ts">
import { userStore } from '@/store/user';
import dexButtom2 from '@/components/dexButton2/index.vue';
import { useRouter } from 'vue-router';
import { copy } from '@/utils/copy';

const router = useRouter()
const user_store = userStore()
</script>

<template>
  <div class="footer-style box-px" v-if="user_store.wWidth >= 768">
    <div class="f-box-pc between-start">
      <div>
        <img src="@/assets/img/img1.png" class="f-img1" alt="">
        <div class="f-text1 f-mb10">{{ $t('text.t26') }}</div>
        <div class="f-text2"></div>
        <div class="f-text3 start-center">
          <img src="@/assets/img/img24.png" class="f-img2 be_pointer"
            @click="user_store.windowOpen(user_store.config.twitter)" alt="">
          <img src="@/assets/img/img26.png" class="f-img2 be_pointer"
            @click="user_store.windowOpen(user_store.config.telegram)" alt="">
          <img src="@/assets/img/img25.png" class="f-img2 be_pointer"
            @click="user_store.windowOpen(user_store.config.youtube)" alt="">
          <img src="@/assets/img/img27.png" class="f-img2 be_pointer"
            @click="user_store.windowOpen(user_store.config.github)" alt="">
        </div>
        <div class="f-text4 start-center">
          <dexButtom2 down-type="download" />
        </div>
        <div class="f-text5">{{ $t('text.t27') }}</div>
        <div class="f-mb30 start-center">
          <img src="@/assets/img/img33.png" class="f-img3" alt="">
          <span class="f-text1 be_pointer" @click="user_store.windowOpen(user_store.config.telegram)">{{
            user_store.config?.telegram }}</span>
        </div>
        <div class="f-text5">{{ $t('text.t28') }}</div>
        <div class="start-center">
          <img src="@/assets/img/img32.png" class="f-img3" alt="">
          <span class="f-text1 be_pointer" @click="copy(user_store.config?.cooperation)">{{ user_store.config?.cooperation
          }}</span>
        </div>
      </div>
      <div class="f-right">
        <div class="fr-item">
          <span class="fr-text1">{{ $t('text.t29') }}</span>
          <span @click="router.push('/aboutUs')">{{ $t('text.t30') }}</span>
          <span @click="router.push('/help')">{{ $t('text.t31') }}</span>
          <span @click="router.push('/blogList')">{{ $t('text.t301') }}</span>
          <span @click="router.push('/notice')">{{ $t('text.t32') }}</span>
          <span @click="router.push('/bdx')">{{ $t('text.t33') }}</span>
        </div>
        <div class="fr-item">
          <span class="fr-text1">{{ $t('text.t34') }}</span>
          <span>{{ $t('text.t35') }}</span>
          <span @click="router.push('/swap')">{{ $t('text.t299') }}</span>
          <!-- <span @click="user_store.windowOpen('https://www.trueshop.top/#/')">NFT</span> -->
          <span @click="router.push('/dapp')">{{ $t('text.t300') }}</span>
          <span>{{ $t('text.t36') }}</span>
        </div>
        <div class="fr-item">
          <span class="fr-text1">{{ $t('text.t37') }}</span>
          <span @click="router.push('/feedback')">{{ $t('text.t38') }}</span>
          <span @click="router.push('/apply')">{{ $t('text.t39') }}</span>
          <span @click="router.push('/invite')">{{ $t('text.t40') }}</span>
        </div>
        <div class="fr-item">
          <span class="fr-text1">{{ $t('text.t41') }}</span>
          <span @click="router.push('/license')">{{ $t('text.t42') }}</span>
          <span @click="router.push('/help/7')">{{ $t('text.t43') }}</span>
          <span @click="router.push('/help/8')">{{ $t('text.t44') }}</span>
          <span @click="router.push('/help/9')">{{ $t('text.t45') }}</span>
          <span @click="router.push('/help/10')">{{ $t('text.t46') }}</span>
          <span @click="router.push('/help/11')">{{ $t('text.t47') }}</span>
          <span @click="router.push('/help/12')">{{ $t('text.t48') }}</span>
        </div>
      </div>
    </div>
    <div class="f-text6">Copyright © 2024 BeingDex SC&C Capital Canada Inc. All Rights Reserved</div>
  </div>
  <div class="footer-mobile-style" v-else>
    <div class="fm-box1 between-start">
      <div>
        <img src="@/assets/img/img1.png" class="fm-img1" alt="">
        <div class="fm-text1">{{ $t('text.t26') }}</div>
        <div class="fm-text2"></div>
      </div>
      <div>
        <dexButtom2 down-type="download" />
      </div>
    </div>
    <div>
      <n-collapse arrow-placement="right" :accordion="true">
        <n-collapse-item :title="$t('text.t29')">
          <div class="fm-coll-item">
            <span @click="router.push('/aboutUs')">{{ $t('text.t30') }}</span>
            <span @click="router.push('/help')">{{ $t('text.t31') }}</span>
            <span @click="router.push('/blogList')">{{ $t('text.t301') }}</span>
            <span @click="router.push('/notice')">{{ $t('text.t32') }}</span>
            <span @click="router.push('/bdx')">{{ $t('text.t33') }}</span>
          </div>
        </n-collapse-item>
        <n-collapse-item :title="$t('text.t34')">
          <div class="fm-coll-item">
            <span>{{ $t('text.t35') }}</span>
            <span @click="router.push('/swap')">{{ $t('text.t299') }}</span>
            <!-- <span @click="user_store.windowOpen('https://www.trueshop.top/#/')">NFT</span> -->
            <span @click="router.push('/dapp')">{{ $t('text.t300') }}</span>
            <span>{{ $t('text.t36') }}</span>
          </div>
        </n-collapse-item>
        <n-collapse-item :title="$t('text.t37')">
          <div class="fm-coll-item">
            <span @click="router.push('/feedback')">{{ $t('text.t38') }}</span>
            <span @click="router.push('/apply')">{{ $t('text.t39') }}</span>
            <span @click="router.push('/invite')">{{ $t('text.t40') }}</span>
          </div>
        </n-collapse-item>
        <n-collapse-item :title="$t('text.t41')">
          <div class="fm-coll-item">
            <span @click="router.push('/license')">{{ $t('text.t42') }}</span>
            <span @click="router.push('/help/7')">{{ $t('text.t43') }}</span>
            <span @click="router.push('/help/8')">{{ $t('text.t44') }}</span>
            <span @click="router.push('/help/9')">{{ $t('text.t45') }}</span>
            <span @click="router.push('/help/10')">{{ $t('text.t46') }}</span>
            <span @click="router.push('/help/11')">{{ $t('text.t47') }}</span>
            <span @click="router.push('/help/12')">{{ $t('text.t48') }}</span>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div class="fm-box2">
      <div class="fm2-text1">{{ $t('text.t27') }}</div>
      <div class="fm2-mb10 center-center">
        <img src="@/assets/img/img33.png" class="fm2-img1" alt="">
        <span class="fm2-text2" @click="user_store.windowOpen(user_store.config.telegram)">{{ user_store.config?.telegram
        }}</span>
      </div>
      <div class="fm2-text1">{{ $t('text.t28') }}</div>
      <div class="fm2-mb10 center-center">
        <img src="@/assets/img/img32.png" class="fm2-img1" alt="">
        <span class="fm2-text2 be_pointer" @click="copy(user_store.config?.cooperation)">{{ user_store.config?.cooperation
        }}</span>
      </div>
      <div class="fm2-icons center-center">
        <img src="@/assets/img/img28.png" class="fm2-img2" alt="">
        <img src="@/assets/img/img30.png" class="fm2-img2" alt="">
        <img src="@/assets/img/img29.png" class="fm2-img2" alt="">
        <img src="@/assets/img/img31.png" class="fm2-img2" alt="">
      </div>
      <div class="fm2-cop">Copyright © 2024 BeingDex SC&C Capital Canada Inc. All Rights Reserved</div>
    </div>
  </div>
</template>

<style lang="less">
.footer-style {
  padding-top: 60px;
  border-top: 1px solid @dex-color12;
  .f-box-pc {
    gap: 180px;
    .f-img1 {
      width: 200px;
      margin-bottom: 10px;
    }
    .f-text1 {
      font-size: 14px;
      line-height: 2;
      color: @dex-color4;
    }
    .f-mb10 {
      margin-bottom: 10px;
    }
    .f-text2 {
      width: 60px;
      height: 1px;
      background: @dex-color2;
      margin-bottom: 20px;
    }
    .f-text3 {
      gap: 20px;
      margin-bottom: 20px;
    }
    .f-img2 {
      width: 20px;
    }
    .f-text4 {
      margin-bottom: 30px;
    }
    .f-text5 {
      font-size: 14px;
      line-height: 2;
      color: @dex-color1;
    }
    .f-mb30 {
      margin-bottom: 30px;
    }
    .f-img3 {
      width: 16px;
      margin-right: 6px;
    }
    .f-right {
      padding-top: 40px;
      flex: auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      .fr-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        color: @dex-color1;
        font-size: 14px;
        .fr-text1 {
          color: @dex-color4;
        }
        span {
          cursor: pointer;
        }
      }
    }
  }
  .f-text6 {
    padding-top: 100px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: @dex-color4;
  }
}
.footer-mobile-style {
  background: @dex-color7;
  padding: 25Px 25Px 0;
  .fm-box1 {
    padding-bottom: 15Px;
    .fm-img1 {
      width: 80Px;
      margin-bottom: 10Px;
    }
    .fm-text1 {
      font-size: 12Px;
      margin-bottom: 5Px;
    }
    .fm-text2 {
      width: 30Px;
      height: 1Px;
      background: @dex-color2;
    }
  }
  .n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main {
    justify-content: space-between;
  }
  .fm-coll-item {
    padding-left: 15Px;
    font-size: 12Px;
    color: @dex-color4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10Px;
  }
  .fm-box2 {
    margin-top: 15Px;
    border-top: 1Px solid @dex-color12;
    padding-top: 15Px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .fm2-text1 {
      font-size: 14Px;
      color: @dex-color1;
      margin-bottom: 5Px;
    }
    .fm2-text2 {
      font-size: 12Px;
      color: @dex-color4;
    }
    .fm2-img1 {
      width: 12Px;
      margin-right: 5Px;
    }
    .fm2-mb10 {
      margin-bottom: 10Px;
    }
    .fm2-icons {
      gap: 40Px;
      padding-bottom: 10Px;
      padding-top: 5Px;
      border-bottom: 1Px solid @dex-color12;
    }
    .fm2-img2 {
      width: 16Px;
    }
    .fm2-cop {
      padding-top: 10Px;
      padding-bottom: 10Px;
      text-align: center;
      font-size: 12Px;
      color: @dex-color3;
    }
  }
}
</style>