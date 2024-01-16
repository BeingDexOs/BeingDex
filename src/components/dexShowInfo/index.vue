<script setup lang="ts">

</script>

<template>
  <div class="dexshowinfo-style">
    <div class="box2">
      <div class="item">
        <div class="item-text1">$3.1086</div>
        <div class="item-text2">{{ $t('text.t8') }}</div>
      </div>
      <div class="item">
        <div class="item-text1">$42.2983B</div>
        <div class="item-text2">{{ $t('text.t9') }}</div>
      </div>
      <div class="item">
        <div class="item-text1">70.24K</div>
        <div class="item-text2">{{ $t('text.t10') }}</div>
      </div>
      <div class="item">
        <div class="item-text1">4.73M</div>
        <div class="item-text2">{{ $t('text.t11') }}</div>
      </div>
      <div class="item">
        <div class="item-text1">$33.0224B</div>
        <div class="item-text2">{{ $t('text.t12') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.dexshowinfo-style {
  .box2 {
    padding-bottom: 150px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    // flex-wrap: wrap;
    .item {
      padding: 30px 45px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 15px;
      text-align: center;
      .item-text1 {
        color: @dex-color1;
        font-size: 32px;
        line-height: 1.5;
      }
      .item-text2 {
        color: @dex-color3;
        font-size: 18px;
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      padding-bottom: 25Px;
      gap: 10Px;
      .item {
        padding: 10Px 20Px;
        border-radius: 5Px;
        .item-text1 {
          font-size: 16Px;
        }
        .item-text2 {
          font-size: 12Px;
        }
      }
    }
  }
}
</style>