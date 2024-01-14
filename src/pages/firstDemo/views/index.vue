<template>
  <div class="home-page">
    <EleTree></EleTree>
    <Echarts></Echarts>
  </div>
</template>

<script setup>
import Echarts from './cpn-use/echarts.vue';
import EleTree from './cpn-use/ele-tree.vue';
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100%;
  overflow: auto;
}
</style>
