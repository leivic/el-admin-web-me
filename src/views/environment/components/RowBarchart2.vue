<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    groupdata: {
      type: Array,
      required: true
    },
    workshopdata: {
      type: Array,
      required: true
    }

  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    groupdata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    workshopdata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        color: ['#00ABA9', '#E51400', '#FA6800'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
            fontFamily: 'Courier New'
          	},
          left: '5px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['工位', '班组', '工段'],
          right: '2px'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.chartData
        },
        series: [
          {
            name: '工段',
            type: 'bar',
            data: this.workshopdata,
            barGap: '1%',
            barWidth: 16
          },
          {
            name: '班组',
            type: 'bar',
            data: this.groupdata,
            barWidth: 16
          }
        ],
         dataZoom: [
          {
            type: 'inside', // 内置于坐标系中
            start: 0,
            end: 50,
            yAxisIndex: [0]
          }
        ]
      })
    }
  }
}
</script>
