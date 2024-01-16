<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { getPointTwo } from '@/utils/web3';
import { LinechartType } from '@/interface';

const props = defineProps<{
  id: string,
  data: LinechartType[],
  risefall: number
}>()

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;
let chartDom: HTMLElement
let myChart: echarts.ECharts
let option: EChartsOption;
let resizeFun = function () {
  myChart.resize();
}
option = {
  xAxis: {
    show: false,
    data: [],
    inverse: true //x轴从右向左展示
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      symbolSize: 0,
      lineStyle: {
        color: props.risefall > 0 ? '#3FA6AD' : '#EA6E8B' //数值判断用绿色还是红色
      }
    }
  ],
  grid: {
    bottom: 0,
    left: 0,
    top: 0,
    right: 0
  }
};
const initCharts = () => {
  chartDom = document.getElementById(props.id)!;
  myChart = echarts.init(chartDom);
  if (myChart == null) {
    myChart = echarts.init(chartDom);
  } else {
    myChart.dispose()
    myChart = echarts.init(chartDom);
  }

  option && myChart.setOption(option);
  window.addEventListener("resize", resizeFun);
}

onMounted(() => {
  initCharts()
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeFun)
  myChart.dispose()
})

watch(() => props.data, (val, old) => {
  if (val) {
    setTimeout(() => {
      getData()
    }, 200);
  }
}, { immediate: true })
const getData = () => {
  //拿到数据后覆盖初始化的数据
  let arr1 = props.data.map(e => e.closing)
  const priceList = arr1.map((ele: any) => Number(ele))

  const trueMax = Math.max(...priceList)
  const trueMin = Math.min(...priceList)
  const differ = (trueMax - trueMin) / 10
  const max = getPointTwo((trueMax + differ).toString(), 5)
  const min = getPointTwo((trueMin - differ).toString(), 5)
  myChart.setOption({
    yAxis: {
      max: max,
      min: min
    },
    series: [
      {
        data: priceList,
      }
    ]
  })
}
</script>

<template>
  <div class="chart-data-style" :id="props.id"></div>
</template>

<style lang="less">
.chart-data-style {
  width: 100%;
  height: 50px;
}
</style>