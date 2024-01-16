<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import headers from '@/components/header/index.vue';
import dexBreadcrumb from '@/components/dexBreadcrumb/index.vue';
import { ref, watch } from 'vue';
import { $post, imgurl } from '@/request/index';
import { dateFormat } from '@/utils/date';
import { useI18n } from 'vue-i18n';
import { BlogDetailType, BlogType } from '@/interface';

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

const blogDetail = ref<BlogDetailType>()
const getBlogDetail = () => {
  $post('/index/blogDetail', {
    blog_id: route.params.id
  }).then(res => {
    blogDetail.value = res.data
  })
}
getBlogDetail()

const recommendBlog = ref<BlogType[]>([])
const getRecommendBlog = () => {
  $post('/index/blog', {
    type: 1,
    page: 1,
    limit: 3
  }).then(res => {
    const { data } = res.data
    recommendBlog.value = data
  })
}
getRecommendBlog()

watch(() => route.params.id, (val) => {
  if (val) {
    getBlogDetail()
  }
})
</script>

<template>
  <headers active="blog" />
  <div class="blogdetail-style box-px">
    <div class="box1" v-if="blogDetail?.detail">
      <dexBreadcrumb title-back="Blog" :title="blogDetail.detail.title" />
    </div>
    <div class="box2 between-center">
      <img :src="imgurl + blogDetail?.detail.avatar" class="b2-img" alt="">
      <div class="b2-text1">{{ blogDetail?.detail.publisher }}</div>
      <div class="b2-text2" v-if="blogDetail?.detail">{{ dateFormat(blogDetail?.detail.releasetime, 'yyyy-MM-dd') }}</div>
    </div>
    <div class="box3">
      <div class="b3-title">{{ blogDetail?.detail.title }}</div>
      <div class="b3-content" v-html="blogDetail?.detail.content"></div>
      <div class="b2b-box1 between-center">
        <div class="start-center b2b-change be_pointer"
          @click="router.replace(`/blogDetail/${blogDetail?.previous?.id}`)">
          <template v-if="blogDetail?.previous">
            <img src="@/assets/img/img42.png" class="b2b-img1" alt="">
            <div class="b2b-text2 ellipsis">{{ blogDetail?.previous.title }}</div>
          </template>
        </div>
        <div class="end-center b2b-change be_pointer" @click="router.replace(`/blogDetail/${blogDetail?.next?.id}`)">
          <template v-if="blogDetail?.next">
            <div class="b2b-text2 ellipsis">{{ blogDetail?.next.title }}
            </div>
            <img src="@/assets/img/img10.png" class="b2b-img1" alt="">
          </template>
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="b4-title">{{ $t('text.t152') }}</div>
      <div class="b4-list">
        <div class="b4-item be_pointer" v-for="item in recommendBlog" :key="item.id"
          @click="router.replace(`/blogDetail/${item.id}`)">
          <div class="b4i-img">
            <img :src="`${imgurl}${item.image}`" alt="">
          </div>
          <div class="b4i-box">
            <div class="b4i-text1">{{ item.title }}</div>
            <div class="b4i-text2 ellipsis2">{{ item.introduction }}</div>
            <div class="b4i-text3">{{ dateFormat(item.releasetime, 'yyyy-MM-dd') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.blogdetail-style {
  .box1 {
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .box2 {
    gap: 20px;
    margin-bottom: 50px;
    .b2-img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    .b2-text1 {
      flex: auto;
      font-size: 36px;
      color: @dex-color1;
    }
    .b2-text2 {
      color: @dex-color4;
      font-size: 24px;
    }
  }
  .box3 {
    .b3-title {
      text-align: center;
      font-size: 48px;
      color: @dex-color1;
      margin-bottom: 50px;
    }
    .b3-content {
      font-size: 18px;
      color: @dex-color1;
    }
    .b2b-box1 {
      padding-top: 50px;
      padding-bottom: 120px;
      gap: 10px;
      .b2b-img1 {
        width: 18px;
      }
      .b2b-text2 {
        font-size: 18px;
        color: @dex-color2;
        font-weight: bold;
      }
      .b2b-change {
        max-width: 48%;
        gap: 6px;
      }
    }
    @media (max-width: 768px) {
      .b3-title {
        font-size: 16Px;
        margin-bottom: 10Px;
      }
      .b3-content {
        font-size: 13Px;
      }
      .b2b-box1 {
        padding-top: 25Px;
        padding-bottom: 35Px;
      }
    }
  }
  .box4 {
    padding-bottom: 120px;
    .b4-title {
      font-size: 48px;
      color: @dex-color1;
      margin-bottom: 50px;
      @media (max-width: 768px) {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 15Px;
      }
    }
    .b4-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      .b4-item {
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
        border-radius: 10px;
        border: 1px solid @dex-color12;
        overflow: hidden;
        .b4i-img {
          width: 100%;
          height: 240px;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
        .b4i-box {
          padding: 20px 30px;
        }
        .b4i-text1 {
          font-size: 24px;
          color: @dex-color1;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .b4i-text2 {
          font-size: 14px;
          color: @dex-color1;
          margin-bottom: 26px;
        }
        .b4i-text3 {
          font-size: 14px;
          color: @dex-color4;
        }
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        .b4-item {
          .b4i-text1 {
            font-size: 14Px;
            margin-bottom: 5Px;
          }
          .b4i-text2 {
            font-size: 12Px;
            margin-bottom: 10Px;
          }
          .b4i-text3 {
            font-size: 12Px;
          }
        }

      }
    }
  }
  @media (max-width: 768px) {
    .box1 {
      padding-top: 15Px;
      padding-bottom: 15Px;
    }
    .box2 {
      gap: 5Px;
      margin-bottom: 17Px;
      .b2-img {
        width: 28Px;
        height: 28Px;
      }
      .b2-text1 {
        font-size: 16Px;
      }
      .b2-text2 {
        font-size: 12Px;
      }
    }
    .box4 {
      padding-bottom: 50Px;
    }
  }
}
</style>