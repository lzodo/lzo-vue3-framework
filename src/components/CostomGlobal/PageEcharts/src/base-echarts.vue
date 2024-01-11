<template>
  <div class="base-echerts">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'BaseEchart',
  data() {
    return {
      echartInit: null,
    };
  },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    options: {
      handler(n, o) {
        // 绘制图表, 监听变化更新数据
        this.echartInit.setOption(n);
      },
      deep: true,
    },
  },
  mounted() {
    console.log(this.options);
    const echartRef = this.$refs.echartRef;
    this.echartInit = echarts.init(echartRef, 'light', { renderer: 'canvas' });
    this.echartInit.setOption(this.options);

    window.addEventListener('resize', () => {
      this.echartInit.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
.base-echerts {
  width: 100%;
  height: 100%;
  .echart {
    width: 100%;
    height: 100%;
  }
}
</style>
