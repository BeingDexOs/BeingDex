<script setup lang="ts">
import { ref, computed } from 'vue';
import arrowleft from '@/assets/img/banner/arrowleft.png';
import arrowright from '@/assets/img/banner/arrowright.png';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import { userStore } from '@/store/user';
import { $post, imgurl } from '@/request/index';
import { BannerType } from '@/interface/index';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const user_store = userStore()
const modules = [Navigation]
const navigation = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
}
const onSwiper = (swiper: any) => {
  mySwiper.value = swiper
};
const mySwiper = ref<any>(null)
const slidersPerView = computed(() => {
  if (user_store.wWidth >= 1280) {
    return 1280 / 320
  } else {
    return user_store.wWidth / 270
  }
})

const bannerList = ref<BannerType[]>([])
const getBanner = () => {
  $post('/index/banner').then(res => {
    bannerList.value = res.data.data
  })
}
getBanner()

const goPage = (status: string, url: string) => {
  if (status == '1') {
    user_store.windowOpen(url)
  }
}
</script>

<template>
  <div class="swi1-style">
    <swiper :modules="modules" :navigation="navigation" :centered-slides="false" :slides-per-view="slidersPerView"
      @swiper="onSwiper">
      <swiper-slide v-for="item in bannerList" :key="item.id">
        <div class="center-center swi1-slider">
          <img :src="`${imgurl}${item.image}`" :class="item.status == '1' ? 'be_pointer' : ''"
            @click="goPage(item.status, item.url)" alt="">
        </div>
      </swiper-slide>
    </swiper>
    <div class="show768">
      <div class="swiper-button-prev">
        <img :src="arrowleft" class="swi1-btn" alt="">
      </div>
    </div>
    <div class="show768">
      <div class="swiper-button-next">
        <img :src="arrowright" class="swi1-btn" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less">
.swi1-style {
  position: relative;
  .swi1-slider {
    width: 100%;
    img {
      width: 90%;
    }
  }
  .swi1-btn {
    width: 36px;
  }
  @media (min-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    content: '';
  }
  .swiper-button-prev {
    left: 0;
  }
  .swiper-button-next {
    right: 0;
  }
}
</style>