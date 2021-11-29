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
    xdata: { //x轴数据 多少个月
      type: Array,
      required: true
    },
    ydata1: { //所有y轴数据
      type: Object,
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
          data: ['售后反馈质量问题','涉嫌违规车辆问题管理','外部抽查问题管理'],
          top: 35
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
            name: '售后反馈质量问题',
	          type: 'bar',
            barGap: '1%',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.shouhoufankui // ydata1是一个二维数组 ydata1[0]也是一个数组
          },
          {
            name: '涉嫌违规车辆问题管理',
	          type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.shexianweigui
          },
          {
            name: '外部抽查问题管理',
	          type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.waibuchoucha
          },
        
         
        ]
      })
    }
  }
}
</script>
<style scoped>
</style>
