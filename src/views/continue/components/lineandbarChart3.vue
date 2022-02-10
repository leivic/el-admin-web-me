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
    ydata1: {
      type: Object
    },
    xdata: {
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
        color: ['#409EFF', '#67C23A', '#E6A23C'],
        title: {
		  text: this.title,
		  textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'KaiTi'
          },
          left: 'center'
        },
        tooltip: {
		  trigger: 'axis',
		  axisPointer: {
		    type: 'shadow'
		  }
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
		    feature: {
            saveAsImage: { show: true }
		    },
		    right: '2%'
        },
        legend: {
          data: ['预测质量水平', '预计目标', '实际状态'],
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
        xAxis: [
          {
            type: 'category',
            data: this.xdata,
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              rotate: -90// -30度角倾斜显示
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: [

	     {
            name: '预测质量水平',
	    type: 'line',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.xianzhuang, // ydata1是一个二维数组 ydata1[0]也是一个数组,
            label: {
              show: true,
              position: 'inside'
            }
          },

          {
            name: '预计目标',
	    type: 'line',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.zhiliangcehua,
            label: {
              show: true,
              position: 'inside'
            }
          },

	  {
            name: '实际状态',
	    type: 'line',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.zhixing,
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
