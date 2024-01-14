<template>
  <!-- swiper/element 版 -->
  <div class="swiper-element-cpn">
    <swiper-container
      :space-between="spaceBetween"
      :centered-slides="true"
      :autoplay="autoplay"
      :direction="direction"
      :initialSlide="initialSlide"
      :speed="speed"
      :loop="loop"
      :effect="effect"
      :navigation="true"
      :pagination="pagination"
      @swiperprogress="onProgress"
      @swiperslidechange="onSlideChange"
    >
      <!-- <swiper-slide>
          <div class="item-slide" :style="{ background: `url(${url}) no-repeat cover` }"></div>
          <el-image style="width: 100%; height: 100%" :src="url" fit="cover" />
        </swiper-slide> -->
      <swiper-slide v-for="item in slideList" :delay="delay">
        <el-image style="width: 100%; height: 100%" :src="`${item.url}`" fit="cover" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="container-start"></div>
      <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
      <div class="swiper-button-next" slot="container-end"></div>
      <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
    </swiper-container>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle';
register();

const props = defineProps({
  // slide 数据列表
  slideList: {
    type: Array,
    default: () => [],
  },
  // slide 之间的距离
  spaceBetween: {
    type: Number,
    default: 10,
  },
  // 是否自动播放
  autoplay: {
    type: [Object, Boolean],
    default: () => ({
      delay: 1000, // 自动播放间隔
      stopOnLastSlide: false, // 非 loop 模式，切换到最后一个是否停止切换
      disableOnInteraction: false, // 用户操作之后是否停止自动播放
      pauseOnMouseEnter: true, // 鼠标移入停止自动播放
    }),
  },
  // 左右监听
  navigation: {
    type: [Object, Boolean],
    default: () => ({
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }),
  },
  // 方向 'horizontal/vertical' 横/纵
  direction: {
    type: String,
    default: 'horizontal',
  },
  // 默认显示第几个 slide
  initialSlide: {
    type: Number,
    default: 1,
  },
  // 一次滑动消耗的时间(毫秒)
  speed: {
    type: Number,
    default: 500,
  },
  // 是否开启无限循环模式
  loop: {
    type: Boolean,
    default: true,
  },
  // 自动切换时间间隔
  delay: {
    type: Number,
    default: 100,
  },
  // 分页器
  pagination: {
    type: Object,
    default: () => ({
      dynamicBullets: true, // 很多时 ... 隐藏
    }),
  },
  // 切换效果
  effect: {
    type: String,
    default: 'coverflow',
  },
});

// 动态导入图片
// let url = computed(() => {
//   let obj = new URL('@/assets/images/2.jpg', import.meta.url);
//   return obj.pathname;
// });

const onProgress = e => {
  const [swiper, progress] = e.detail;
  //   console.log('onProgress:', progress);
};

const onSlideChange = e => {
  //   console.log('onSlideChange:', e);
};
</script>
<style lang="scss" scoped>
.swiper-element-cpn {
  width: 100%;
  height: 100%;
  swiper-container {
    width: 100%;
    height: 100%;
  }
}
.item-slide {
  width: 100%;
  height: 100%;
}
</style>
