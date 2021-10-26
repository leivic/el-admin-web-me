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
		  text: '标题',
		  textStyle: {
            fontSize: 24,
            fontWeight: 'normal',
            fontFamily: 'Courier New'
          },
          left: '39%'
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
        legend: {
          data: ['现状','质量策划','执行'],
          top: 30
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
            data: this.xdata
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [

	     {
            name: '现状',
	    type: 'bar',
	    stack: '质量',
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
            name: '质量策划',
	    type: 'bar',
            stack: '质量',
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
            name: '执行',
	    type: 'bar',
            stack: '质量',
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
