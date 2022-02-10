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
    chartData: {
      type: Array,
      required: true
    },
    xData: {
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
    chartData: {
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
        title: {
		  text: this.title, // this.title
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
        }, // 鼠标悬浮的提示框组件
        toolbox: {
		    feature: {
            saveAsImage: { show: true }
		    },
		    right: '2%'
        },
        xAxis: {
		    type: 'category',
		    data: this.xData,
		    axisLabel: {
            interval: 0, // 横轴信息全部显示
            rotate: -60// -30度角倾斜显示
        },
         axisTick: {
              show: false
            }
        },
        yAxis: {
		    type: 'value',
		    axisLabel: {
            	formatter: '{value}'
        },
         axisTick: {
              show: false
            }
        },
        series: [{
		    data: this.chartData, // 不加this 怎么取得到props里面的值呢
		    type: 'bar',
		    barCategoryGap: '1%',
          barWidth: 20,
          label: {
            show: true,
            position: 'top'
          }
        }]// echarts的那些配置 就是一个完整的对象 这个对象的很多属性仍然是对象

      })
    }
  }
}
</script>
