<template>
  <div>
    <div class="module">
      <vSwiperVue :slide-list="slideList"></vSwiperVue>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import vSwiperVue from '../../../../components/CostomGlobal/v-swiper.vue';

const slideList = ref([
  {
    url: new URL('@/assets/images/2.jpg', import.meta.url),
  },
  {
    url: new URL('@/assets/images/3.jpg', import.meta.url),
  },
  {
    url: new URL('@/assets/images/4.jpg', import.meta.url),
  },
]);
</script>

<style lang="scss" scoped>
.module {
  width: 40vw;
  height: 40vh;
}
</style>
