<template>
  <div class="echarts-pkg line">
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script>
import { baseEchart } from '..';
export default {
  name: 'PieEchart',
  data() {
    return {
      seriesList: [],
      pieLabel: {
        show: true,
        formatter: '人数: {@2012} \n 占比: ({d}%)',
        lineHeight: 18,
        align: 'left',
      },
      legendPos: {},
    };
  },
  components: {
    baseEchart,
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    legend: { type: String, default: 'right' },

    //饼图数据
    yData: {
      type: Array,
      default: () => [
        {
          name: '默认',
          data: [
            { value: 1048, name: 'Search ' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union' },
            { value: 300, name: 'Video' },
          ],
        },
      ],
    },
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: this.legendPos,
        grid: {
          left: '3%', // 配置图表距离容器的边距
          right: '3%',
          bottom: '15%',
        },
        series: this.seriesList,
      };
    },
  },
  watch: {
    yData: {
      handler() {
        this.initLine();
      },
      immediate: true,
      deep: true,
    },
    legend: {
      handler(n, o) {
        if (n == 'right') {
          this.legendPos = {
            top: 'center',
            left: 'right',
            orient: 'vertica',
            align: 'right',
          };
        } else if (n == 'bottom') {
          this.legendPos = {
            bottom: 'bottom',
            left: 'center',
            align: 'right',
          };
        }
      },
      immediate: true,
    },
  },
  methods: {
    initLine() {
      this.seriesList = this.yData.map(item => {
        return {
          type: 'pie',
          radius: ['40%', '70%'],
          center: item.center || ['50%', '50%'],
          avoidLabelOverlap: false,

          label: item.pieLabel || this.pieLabel,
          labelLine: {
            show: true,
          },
          name: item.name,
          data: item.data,
        };
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.echarts-pkg {
  width: 100%;
  height: 100%;
}
</style>
