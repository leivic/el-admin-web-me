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
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    lengenddata: {
      type: Array
    },
    ydata1: {
      type: Array
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
     ydata1: {
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
        color: ['#00ABA9', '#1BA1E2', '#0050EF', '#6A00FF', '#D80073', '#A20025', '#E51400', '#FA6800', '#F0A30A', '#E3C800', '#825A2C', '#6D8764'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 20,
            fontWeight: 'normal',
            fontFamily: 'KaiTi'
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
          data: this.lengenddata,
          right: '2px'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value', //横轴是值
          boundaryGap: [0, 0.01],
          axisTick: {
              show: false
            }
        },
        yAxis: {
          type: 'category', //纵轴是类别
          data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '机加车间', '装配车间'],
          axisTick: {
              show: false
            }
        },
        series: [ 
          {
            name: '01月', // 12个月  每个月的数组内 有6个数据
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[0], // ydata1是一个二维数组 ydata1[0]也是一个数组,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '02月',
	    type: 'bar',
            stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[1],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '03月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[2],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '04月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[3],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '05月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[4],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '06月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[5],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '07月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[6],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '08月', // 这里的值要与lengend里面的值对应才能显示出来
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[7],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '09月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[8],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '10月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[9],
            label: {
              show: true,
              position: 'inside'
            }
          },
	 {
            name: '11月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[10],
            label: {
              show: true,
              position: 'inside'
            }
          },
	 {
            name: '12月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1[11],
            label: {
              show: true,
              position: 'inside'
            }
          }
        ]
      })
    }
  }
}
</script>
