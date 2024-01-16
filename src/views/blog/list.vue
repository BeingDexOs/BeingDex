<script setup lang="ts">
import { ref } from 'vue';
import headers from '@/components/header/index.vue';
import { useRouter } from 'vue-router';
import { $post, imgurl } from '@/request/index';
import { BlogType } from '@/interface/index';
import { useI18n } from 'vue-i18n';
import { dateFormat } from '@/utils/date';

const { locale } = useI18n()
const router = useRouter()
const page = ref(1)
const changePage = (value: number) => {
  page.value = value
  getBlog()
}

const lastPage = ref(1)
const blogList = ref<BlogType[]>([])
const getBlog = () => {
  $post('/index/blog', {
    type: 0,
    page: page.value,
    limit: 10
  }).then(res => {
    const { last_page, data } = res.data
    lastPage.value = last_page
    blogList.value = data
  })
}
getBlog()

const recommendBlog = ref<BlogType[]>([])
const getRecommendBlog = () => {
  $post('/index/blog', {
    type: 2,
    page: 1,
    limit: 1
  }).then(res => {
    const { data } = res.data
    recommendBlog.value = data
  })
}
getRecommendBlog()
</script>

<template>
  <headers active="blog" />
  <div class="bloglist-style box-px">
    <div class="box1">
      <div class="be_pointer" v-for="item in recommendBlog" :key="item.id">
        <div class="b1-row1 between-center">
          <div class="b1r1-text1 ellipsis">{{ item.title }}</div>
          <div class="b1r1-text2">{{ dateFormat(item.releasetime, 'yyyy-MM-dd') }}</div>
        </div>
        <div class="b1-row2 ellipsis2">
          {{ item.introduction }}
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="b2-title">{{ $t('text.t153') }}</div>
      <div class="b2-list">
        <div class="b2-item box-pointer-hover" v-for="item in blogList" :key="item.id"
          @click="router.push(`/blogDetail/${item.id}`)">
          <div class="b2item-box between-center">
            <img :src="`${imgurl}${item.image}`" class="b2item-img1" alt="">
            <div class="b2item-right">
              <div class="b2item-row1 between-center">
                <div class="b2item-text1 ellipsis">{{ item.title }}</div>
                <div class="b2item-text2">{{ dateFormat(item.releasetime, 'yyyy-MM-dd') }}</div>
              </div>
              <div class="b2item-row2 ellipsis2">
                {{ item.introduction }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="b2-page center-center">
        <n-pagination :page="page" @update:page="changePage" :page-slot="5" :page-count="lastPage" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.bloglist-style {
  .box1 {
    padding-top: 100px;
    padding-bottom: 120px;
    border-bottom: 1px solid @dex-color5;
    .b1-row1 {
      margin-bottom: 20px;
      gap: 20px;
      .b1r1-text1 {
        font-size: 48px;
        color: @dex-color1;
        flex: auto;
      }
      .b1r1-text2 {
        font-size: 24px;
        color: @dex-color4;
        flex-shrink: 0;
      }
    }
    .b1-row2 {
      font-size: 18px;
      color: @dex-color1;
    }
    @media (max-width: 768px) {
      padding-top: 15Px;
      padding-bottom: 25Px;
      .b1-row1 {
        .b1r1-text1 {
          font-size: 16Px;
          font-weight: 600;
        }
        .b1r1-text2 {
          font-size: 12Px;
        }
      }
      .b1-row2 {
        font-size: 13Px;
      }
    }
  }
  .box2 {
    color: @dex-color1;
    padding-top: 50px;
    .b2-title {
      font-size: 48px;
    }
    .b2-list {
      .b2-item {
        margin-top: 30px;
        .b2item-box {
          padding: 30px;
          border: 1px solid @dex-color5;
          background: @dex-color6;
          border-radius: 10px;
          gap: 30px;
          .b2item-img1 {
            border-radius: 6Px;
            width: 180px;
            flex-shrink: 0;
          }
          .b2item-right {
            overflow-x: hidden;
            flex: auto;
            .b2item-row1 {
              margin-bottom: 10px;
              gap: 20px;
            }
            .b2item-text1 {
              font-size: 24px;
              font-weight: 500;
            }
            .b2item-text2 {
              font-size: 16px;
              color: @dex-color4;
              flex-shrink: 0;
            }
            .b2item-row2 {
              font-size: 16px;
            }
          }
          @media (max-width: 768px) {
            padding: 0;
            border: none;
            flex-wrap: wrap;
            .b2item-img1 {
              width: 100%;
            }
            .b2item-right {
              .b2item-text1 {
                font-size: 14Px;
              }
              .b2item-text2 {
                font-size: 12Px;
              }
              .b2item-row2 {
                font-size: 12Px;
              }
            }
          }
        }
      }
    }
    .b2-page {
      padding-top: 50px;
      padding-bottom: 50px;
    }
    @media (max-width: 768px) {
      padding-top: 25Px;
      .b2-title {
        font-size: 18Px;
        font-weight: 500;
      }
      .b2-list {
        .b2-item {
          padding-top: 15Px;
        }
      }
      .b2-page {
        padding-top: 25Px;
        padding-bottom: 25Px;
      }
    }
  }
}
</style>