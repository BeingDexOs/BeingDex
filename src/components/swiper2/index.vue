<script setup lang="ts">
import { ref } from 'vue';
import arrowup from '@/assets/img/banner/arrowup.png';
import arrowdown from '@/assets/img/banner/arrowdown.png';
import arrowleft from '@/assets/img/banner/arrowleft.png';
import arrowright from '@/assets/img/banner/arrowright.png';
import phone1 from '@/assets/img/banner/phone1.png';
import phone1_en from '@/assets/img/banner/phone1_en.png';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper'
import { userStore } from '@/store/user';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const user_store = userStore()
const modules = [Navigation, Pagination]
const navigation = {
  nextEl: '.swiper-my-next',
  prevEl: '.swiper-my-prev'
}
const pagination = {
  el: '.swiper-my-pagination',
  clickable: true,
  dynamicBullets: false
}
const onSwiper = (swiper: any) => {
  mySwiper.value = swiper
};
const mySwiper = ref<any>(null)
</script>

<template>
  <div class="swi2-style">
    <swiper :auto-height="true" :modules="modules" :direction="user_store.wWidth > 768 ? 'vertical' : 'horizontal'"
      :navigation="navigation" :pagination="pagination" :centered-slides="false" slides-per-view="auto"
      @swiper="onSwiper">
      <swiper-slide>
        <div class="swi-slider">
          <img :src="locale == 'zh' ? phone1 : phone1_en" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swi-slider">
          <img :src="locale == 'zh' ? phone1 : phone1_en" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swi-slider">
          <img :src="locale == 'zh' ? phone1 : phone1_en" alt="">
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-my-prev">
      <img :src="arrowleft" class="swi-change-btn" alt="">
      <img :src="arrowup" class="swi-change-btn1" alt="">
    </div>
    <div class="swiper-my-next">
      <img :src="arrowright" class="swi-change-btn" alt="">
      <img :src="arrowdown" class="swi-change-btn1" alt="">
    </div>
    <div class="swiper-my-pagination swi-change-btn2"></div>
  </div>
</template>

<style lang="less">
.swi2-style {
  width: 100%;
  position: relative;
  padding-left: 50px;
  padding-right: 50px;
  .swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 10Px 0;
  }
  .swi-slider {
    width: 100%;
    min-height: 1px;
    img {
      width: 100%;
    }
  }
  .swi-change-btn {
    width: 36px;
  }
  .swi-change-btn1 {
    width: 36px;
    display: none;
  }
  .swi-change-btn2 {
    display: none;
  }
  @media (min-width: 768px) {
    padding-right: 40Px;
    padding-left: 0;
    .swi-change-btn {
      display: none;
    }
    .swi-change-btn1 {
      display: inline-block;
    }
    .swi-change-btn2 {
      display: inline-block;
    }
  }

  .swiper-my-prev,
  .swiper-my-next {
    width: 27px;
  }
  .swiper-my-prev {
    position: absolute;
    right: calc(100% - 27px);
    top: 50%;
    transform: translateY(-50%);
  }
  .swiper-my-next {
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
  }
  .swiper-my-pagination {
    position: absolute;
    right: 5px;
    // height: 80px !important;
  }
  @media (min-width: 768px) {
    .swiper-my-prev {
      position: absolute;
      right: 0;
      top: 35%;
    }
    .swiper-my-next {
      position: absolute;
      right: 0;
      bottom: 35%;
    }
  }
  .swiper-pagination-bullet-active {
    background: #0449E4;
  }
  .swiper-wrapper {}
}
</style>