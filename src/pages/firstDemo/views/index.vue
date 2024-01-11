<template>
  <div class="home-page">
    <div class="module">
      <BarEchart :yData="yDataTwo" legend="bottom" unit="单位:人/个"></BarEchart>
    </div>
    <div class="module">
      <PieEchart :yData="yDataThree"></PieEchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarEchart, PieEchart } from '@/components/CostomGlobal/PageEcharts';

const yDataTwo = ref([
  { name: '人数', stack: 'one', seriesItemStyle1: { color: '#7592FF' }, data: [150, 230, 224, 218, 135, 147, 260] },
  { name: '床位', stack: 'one', seriesItemStyle2: { color: '#ccc' }, data: [150, 230, 224, 218, 135, 147, 260] },
]);

const yDataThree = ref([
  {
    name: '各年级学生贷款分布',
    data: [
      { value: 735, name: '2023级' },
      { value: 580, name: '2022级' },
      { value: 484, name: '2021级' },
      { value: 300, name: '2020级' },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  .module {
    width: 40vw;
    height: 40vh;
  }
}
</style>
