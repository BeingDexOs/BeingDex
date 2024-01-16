<script setup lang="ts">

</script>

<template>
  <div class="dex-buttom1-style center-center">
    <button>
      <span>{{ $t('text.t2') }}</span>
    </button>
  </div>
</template>

<style lang="less">
.dex-buttom1-style {
  button {
    background: transparent;
    position: relative;
    padding: 16px 55px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid @dex-color2;
    border-radius: 100px;
    outline: none;
    overflow: hidden;
    color: @dex-color2;
    transition: color 0.3s 0.1s ease-out;
    text-align: center;
  }

  button::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    // left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  button:hover {
    color: #fff;
    border: 1px solid @dex-color2;
  }

  button:hover::before {
    box-shadow: inset 0 0 0 10em @dex-color2;
  }
}
</style>