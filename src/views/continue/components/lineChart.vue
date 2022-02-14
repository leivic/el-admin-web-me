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
      type: Object,
      required: true
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
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
        title: {
          text: 'Sgmw重庆分公司质量生态持续等级分布',
          textStyle: {
            fontSize: 24,
            fontWeight: 'normal',
            fontFamily: 'KaiTi'
          },
          left: 'center'
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
		    right: '2%'
        },
        legend: {
          data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '发动机工厂'],
          top: 30
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
            data: this.chartdata.chongyadata,
            smooth: true,
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
            data: this.chartdata.cheshendata,
            smooth: true,
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
            data: this.chartdata.tuzhuangdata,
            smooth: true,
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
            data: this.chartdata.zongzhuangdata,
            smooth: true,
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
            name: '发动机工厂',
            type: 'line',
            data: this.chartdata.fadongjidata,
            smooth: true,
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
        ],
         dataZoom: [
          {
            type: 'inside', // 内置于坐标系中
            start: 0,
            end: 100, // 30%
            xAxisIndex: [0]
          }
        ]

      })
    }
  }
}
</script>
