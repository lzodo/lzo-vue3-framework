<template>
  <div class="echarts-pkg bar">
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script>
import { baseEchart } from '..';
import * as echarts from 'echarts';
export default {
  name: 'BarEchart',
  data() {
    return {
      seriesList: [],
      xAxisOption: {},
      yAxisOption: {},
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
    unit: {
      type: String,
      default: '',
    },
    legend: { type: String, default: 'right' },

    isReverse: {
      type: Boolean,
      default: false,
    },

    yData: {
      type: Array,
      default: () => [
        { name: '默认', data: [150, 230, 224, 218, 135, 147, 260] },
        { name: '默认2', type: 'line', data: [111, 22, 333, 44, 555, 66, 777] },
        { name: '默认3', data: [111, 22, 333, 44, 555, 66, 777] },
      ],
    },

    // 主方向的类别
    xData: {
      type: Array,
      default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    // 是否有多Y轴
    manyYxis: {
      type: Array,
      default: () => [],
    },
    seriesItemStyle1: {
      type: Object,
      default: () => ({
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#B5CEFB' },
          { offset: 1, color: '#7592FF' },
        ]),
      }),
    },
    seriesItemStyle2: {
      type: Object,
      default: () => ({
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#BD5EFF' },
          { offset: 1, color: '#a65dfa' },
        ]),
      }),
    },
  },
  computed: {
    options() {
      return {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '6%', // 配置图表距离容器的边距
          right: '6%',
          bottom: '25%',
          top: '13%',
          containLabel: false, // grid 区域是否包含坐标轴的刻度标签
        },
        legend: this.legendPos,
        xAxis: this.xAxisOption,
        yAxis: this.yAxisOption,
        dataZoom: [
          {
            type: 'inside',
          },
        ],
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
            padding: [18, 0],
          };
        }
      },
      immediate: true,
    },
  },
  methods: {
    initLine() {
      this.seriesList = this.yData.map((item, i) => {
        return {
          stack: item.stack || null,
          name: item.name,
          type: item.type || 'bar',
          itemStyle: item[`seriesItemStyle${i + 1}`] || this[`seriesItemStyle${i + 1}`],
          barMaxWidth: item.width || 100,
          barGap: item.barGap || null,
          data: item.data,
          yAxisIndex: this.manyYxis.length == 1 ? (i <= 1 ? i : null) : null, // 限制最多两个纵轴
          label: {
            show: item.labelShow,
            color: '#000',
            position: 'top',
            offset: [0, -(i * 8)],
          },
        };
      });
    },
  },
  created() {
    // 横纵转换
    let xAxisOption = {
      data: this.xData,
      type: 'category',
      axisLabel: {},
      axisLine: {
        onZero: false,
        lineStyle: {
          opcity: 0.5,
        },
      },
      axisPointer: {
        type: 'shadow',
      },
      axisTick: {
        show: false,
      },
      offset: 1,
    };
    let yAxisOption = {
      type: 'value',
      nameLocation: 'end',
      axisLabel: {
        color: '#999',
      },
    };
    if (!this.isReverse) {
      this.xAxisOption = xAxisOption;
      this.yAxisOption = yAxisOption;
    } else {
      this.xAxisOption = yAxisOption;
      this.yAxisOption = xAxisOption;
    }
    this.yAxisOption.name = this.unit;

    // 多 Y轴处理
    if (this.manyYxis.length == 1) {
      this.yAxisOption = [{ ...this.yAxisOption }];
      this.manyYxis.map(item => {
        this.yAxisOption.push({
          type: 'value',
          name: item, // 设置多轴单位
        });
        console.log(this.yAxisOption, 888);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.echarts-pkg {
  width: 100%;
  height: 100%;
}
</style>
