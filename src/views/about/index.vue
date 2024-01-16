<script setup lang="ts">
import headers from '@/components/header/index.vue';
import dexButtom1 from '@/components/dexButton1/index.vue';
</script>

<template>
  <headers />
  <div class="about-style">
    <div class="box1 box-px between-center">
      <div>
        <div class="b1-text1">{{ $t('text.t56') }}</div>
        <div class="b1-text2 b1-mb20">{{ $t('text.t57') }}</div>
        <div class="b1-text2">{{ $t('text.t58') }}</div>
      </div>
      <div>
        <img src="@/assets/img/img46.png" class="b1-img1" alt="">
      </div>
    </div>
    <div class="box-px">
      <div class="box2">
        <div class="b2-item">
          <div class="b2i-text1">#1</div>
          <div class="b2i-text2">{{ $t('text.t59') }}</div>
        </div>
        <div class="b2-item">
          <div class="b2i-text1">{{ $t('text.t61') }}</div>
          <div class="b2i-text2">{{ $t('text.t60') }}</div>
        </div>
        <div class="b2-item">
          <div class="b2i-text1">{{ $t('text.t62') }}</div>
          <div class="b2i-text2">{{ $t('text.t63') }}</div>
        </div>
      </div>
      <div class="box3">
        <div class="b3-title">{{ $t('text.t64') }}</div>
        <div class="b3-text1" v-html="$t('text.t65')"></div>
        <div class="b3-flex">
          <div class="b3f-item b3f-item-bg1">
            <div class="b3f-text1">{{ $t('text.t66') }}</div>
            <div class="b3f-text2">{{ $t('text.t67') }}</div>
          </div>
          <div class="b3f-item b3f-item-bg2">
            <div class="b3f-text1">{{ $t('text.t68') }}</div>
            <div class="b3f-text2">{{ $t('text.t69') }}</div>
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="b4-title">{{ $t('text.t70') }}</div>
        <div class="b4-list">
          <div class="b4-item column-center">
            <img src="@/assets/img/img47.png" class="b4i-img" alt="">
            <div class="b4i-text1">{{ $t('text.t71') }}</div>
            <div class="b4i-text2">{{ $t('text.t72') }}</div>
          </div>
          <div class="b4-item">
            <img src="@/assets/img/img48.png" class="b4i-img" alt="">
            <div class="b4i-text1">{{ $t('text.t73') }}</div>
            <div class="b4i-text2">{{ $t('text.t74') }}</div>
          </div>
          <div class="b4-item column-center">
            <img src="@/assets/img/img49.png" class="b4i-img" alt="">
            <div class="b4i-text1">{{ $t('text.t75') }}</div>
            <div class="b4i-text2">{{ $t('text.t76') }}</div>
          </div>
          <div class="b4-item column-center">
            <img src="@/assets/img/img50.png" class="b4i-img" alt="">
            <div class="b4i-text1">{{ $t('text.t77') }}</div>
            <div class="b4i-text2">{{ $t('text.t78') }}</div>
          </div>
        </div>
      </div>
      <div class="box5">
        <div class="b5-title">{{ $t('text.t79') }}</div>
        <div class="b5-text1">{{ $t('text.t80') }}</div>
        <img src="@/assets/img/img51.png" class="b5-img" alt="">
      </div>
      <div class="box6">
        <div class="b6-title">{{ $t('text.t81') }}</div>
        <div class="b6-list">
          <div class="b6-item">
            <img src="@/assets/img/img52.png" class="b6i-img" alt="">
            <div class="b6i-text1">{{ $t('text.t82') }}</div>
            <div class="b6i-text2">{{ $t('text.t83') }}</div>
          </div>
          <div class="b6-item">
            <img src="@/assets/img/img53.png" class="b6i-img" alt="">
            <div class="b6i-text1">{{ $t('text.t84') }}</div>
            <div class="b6i-text2">{{ $t('text.t85') }}</div>
          </div>
          <div class="b6-item">
            <img src="@/assets/img/img54.png" class="b6i-img" alt="">
            <div class="b6i-text1">{{ $t('text.t86') }}</div>
            <div class="b6i-text2">{{ $t('text.t87') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box10">
      <div class="b10-text1">{{ $t('text.t88') }}</div>
      <div class="b10-text2">{{ $t('text.t89') }}</div>
      <div>
        <dexButtom1 />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.about-style {
  overflow-x: hidden;
  .box1 {
    padding-top: 96px;
    padding-bottom: 96px;
    gap: 50Px;
    color: @dex-color1;
    background: @dex-color7;
    .b1-text1 {
      font-size: 48px;
      font-weight: 500;
    }
    .b1-text2 {
      font-size: 18px;
    }
    .b1-mb20 {
      margin-bottom: 20px;
    }
    .b1-img1 {
      width: 419px;
      height: auto;
    }
    @media (max-width: 768px) {
      flex-wrap: wrap;
      flex-direction: column-reverse;
      padding-top: 25Px;
      padding-bottom: 25Px;
      gap: 25Px;
      .b1-text1 {
        font-size: 18Px;
        text-align: center;
        margin-bottom: 10Px;
      }
      .b1-text2 {
        font-size: 12Px;
      }
    }
  }
  .box2 {
    padding-top: 50px;
    padding-bottom: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50Px;
    .b2-item {
      text-align: center;
      color: @dex-color1;
      .b2i-text1 {
        font-size: 36px;
        font-weight: 500;
        margin-bottom: 18px;
      }
      .b2i-text2 {
        font-size: 18px;
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 25Px;
      padding-top: 25Px;
      padding-bottom: 40Px;
      .b2-item {
        .b2i-text1 {
          font-size: 18Px;
          margin-bottom: 5Px;
        }
        .b2i-text2 {
          font-size: 12Px;
        }
      }
    }
  }
  .box3 {
    color: @dex-color1;
    padding-bottom: 120px;
    .b3-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 50px;
    }
    .b3-text1 {
      font-size: 18px;
      margin-bottom: 50px;
    }
    .b3-flex {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      .b3f-item {
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
        padding: 30px;
        color: @dex-color1;
        height: 240px;
        .b3f-text1 {
          font-size: 32px;
          margin-bottom: 20px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .b3f-text2 {
          font-size: 16px;
        }
      }
      .b3f-item-bg1 {
        background-image: url('@/assets/img/bg2.png');
      }
      .b3f-item-bg2 {
        background-image: url('@/assets/img/bg3.png');
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 40Px;
      .b3-title {
        margin-bottom: 10Px;
        text-align: center;
        font-size: 18Px;
        font-weight: 600;
      }
      .b3-text1 {
        font-size: 12Px;
        margin-bottom: 25Px;
      }
      .b3-flex {
        grid-template-columns: 1fr;
        .b3f-item {
          padding: 15Px;
          height: 120Px;
          .b3f-text1 {
            font-size: 18Px;
            margin-bottom: 10Px;
          }
          .b3f-text2 {
            font-size: 13Px;
          }
        }
      }
    }
  }
  .box4 {
    color: @dex-color1;
    padding-bottom: 120px;
    .b4-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 80px;
    }
    .b4-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30Px;
      .b4-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .b4i-img {
          width: 90px;
          margin-bottom: 30px;
        }
        .b4i-text1 {
          font-size: 24px;
          line-height: 1.5;
        }
        .b4i-text2 {
          font-size: 16px;
          line-height: 2;
          text-align: center;
        }
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 25Px;
      .b4-title {
        text-align: center;
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 25Px;
      }
      .b4-list {
        grid-template-columns: 1fr;
        gap: 15Px;
      }
    }
  }
  .box5 {
    color: @dex-color1;
    padding-bottom: 120px;
    .b5-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 50px;
    }
    .b5-text1 {
      font-size: 18px;
      margin-bottom: 50px;
    }
    .b5-img {
      width: 100%;
      height: auto;
    }
    @media (max-width: 768px) {
      padding-bottom: 40Px;
      .b5-title,
      .b5-text1 {
        text-align: center;
      }
      .b5-title {
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 15Px;
      }
    }
  }
  .box6 {
    color: @dex-color1;
    padding-bottom: 120px;
    .b6-title {
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 80px;
    }
    .b6-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30Px;
      .b6-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .b6i-img {
          width: 90px;
          margin-bottom: 30px;
        }
        .b6i-text1 {
          margin-bottom: 10px;
          font-size: 24px;
        }
        .b6i-text2 {
          font-size: 16px;
          color: @dex-color14;
        }
      }
    }
    @media (max-width: 768px) {
      .b6-title {
        text-align: center;
        font-size: 18Px;
        font-weight: 600;
        margin-bottom: 15Px;
      }
      .b6-list {
        grid-template-columns: 1fr;
        gap: 15Px;
        .b6-item {
          .b6i-text2 {
            text-align: center;
          }
        }
      }
    }
  }
  .box10 {
    padding-top: 120px;
    padding-bottom: 120px;
    text-align: center;
    background: @dex-color21;
    .b10-text1 {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.5;
    }
    .b10-text2 {
      font-size: 24px;
      line-height: 2;
      margin-bottom: 30px;
    }
    @media (max-width: 768px) {
      padding-top: 40Px;
      padding-bottom: 40Px;
      .b10-text1 {
        font-size: 18Px;
        font-weight: 600;
      }
      .b10-text2 {
        font-size: 12Px;
      }
    }
  }
}
</style>