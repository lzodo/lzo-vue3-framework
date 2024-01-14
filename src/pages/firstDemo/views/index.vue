<template>
  <div class="home-page">
    <div class="case">
      <div class="title">视频播放</div>
      <div class="content">
        <videoPlay></videoPlay>
      </div>
    </div>
    <div class="case">
      <div class="title">元素拖拽</div>
      <div class="content">
        <draggable></draggable>
      </div>
    </div>
    <div class="case">
      <div class="title">swiper 轮播图</div>
      <div class="content">
        <SwiperElement></SwiperElement>
      </div>
    </div>
    <div class="case">
      <div class="title">element 树</div>
      <div class="content">
        <EleTree></EleTree>
      </div>
    </div>
    <div class="case">
      <div class="title">Echarts</div>
      <div class="content">
        <Echarts></Echarts>
      </div>
    </div>
  </div>
</template>

<script setup>
import Echarts from './cpn-use/echarts.vue';
import EleTree from './cpn-use/ele-tree.vue';
import SwiperElement from './cpn-use/swiper-element.vue';
import draggable from './cpn-use/draggable.vue';
import videoPlay from './cpn-use/video-play.vue';
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100%;
  overflow: auto;
  .case {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 50px;
    margin-bottom: 50px;
    .title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .content {
      padding-left: 50px;
    }
  }
}
</style>
