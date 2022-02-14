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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    xdata: {
      type: Array,
      required: true
    },
    chartdata: {
      type: Array,
      required: true
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartdata: {
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
      this.setOptions(this.chartdata)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#7B68EE'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'KaiTi'
          },
          left: '0%'
        },

        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
		    feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
		    },
		    right: '-10'
        },
        legend: {
          data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '机加车间', '装配车间'],
          top: 30,
          textStyle: {
            fontSize: 10
          },
          itemWidth: 20,
          itemHeight: 15,
          itemGap: 4
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xdata,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '冲压车间',
            type: 'line',
            data: [this.chartdata[0].yiyue, this.chartdata[0].eryue, this.chartdata[0].sanyue, this.chartdata[0].siyue, this.chartdata[0].wuyue, this.chartdata[0].liuyue, this.chartdata[0].qiyue, this.chartdata[0].bayue, this.chartdata[0].jiuyue, this.chartdata[0].shiyue, this.chartdata[0].shiyiyue, this.chartdata[0].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '车身车间',
            type: 'line',
            data: [this.chartdata[1].yiyue, this.chartdata[1].eryue, this.chartdata[1].sanyue, this.chartdata[1].siyue, this.chartdata[1].wuyue, this.chartdata[1].liuyue, this.chartdata[1].qiyue, this.chartdata[1].bayue, this.chartdata[1].jiuyue, this.chartdata[1].shiyue, this.chartdata[1].shiyiyue, this.chartdata[1].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '涂装车间',
            type: 'line',
            data: [this.chartdata[2].yiyue, this.chartdata[2].eryue, this.chartdata[2].sanyue, this.chartdata[2].siyue, this.chartdata[2].wuyue, this.chartdata[2].liuyue, this.chartdata[2].qiyue, this.chartdata[2].bayue, this.chartdata[2].jiuyue, this.chartdata[2].shiyue, this.chartdata[2].shiyiyue, this.chartdata[2].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '总装车间',
            type: 'line',
            data: [this.chartdata[3].yiyue, this.chartdata[3].eryue, this.chartdata[3].sanyue, this.chartdata[3].siyue, this.chartdata[3].wuyue, this.chartdata[3].liuyue, this.chartdata[3].qiyue, this.chartdata[3].bayue, this.chartdata[3].jiuyue, this.chartdata[3].shiyue, this.chartdata[3].shiyiyue, this.chartdata[3].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '机加车间',
            type: 'line',
            data: [this.chartdata[4].yiyue, this.chartdata[4].eryue, this.chartdata[4].sanyue, this.chartdata[4].siyue, this.chartdata[4].wuyue, this.chartdata[4].liuyue, this.chartdata[4].qiyue, this.chartdata[4].bayue, this.chartdata[4].jiuyue, this.chartdata[4].shiyue, this.chartdata[4].shiyiyue, this.chartdata[4].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '装配车间',
            type: 'line',
            data: [this.chartdata[5].yiyue, this.chartdata[5].eryue, this.chartdata[5].sanyue, this.chartdata[5].siyue, this.chartdata[5].wuyue, this.chartdata[5].liuyue, this.chartdata[5].qiyue, this.chartdata[5].bayue, this.chartdata[5].jiuyue, this.chartdata[5].shiyue, this.chartdata[5].shiyiyue, this.chartdata[5].shieryue],
            smooth: false,
            lineStyle: {
              normal: {
                width: 5
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          }
        ]

      })
    }
  }
}
</script>
