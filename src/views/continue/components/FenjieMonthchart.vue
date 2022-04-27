<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: { // 子组件的prop在父组件中使用时成为父组件的属性
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
      default: '550px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    xdata: {
      type: Array
    },
    zhibiaoshu: {
      type: Array
    },
    lvsedata: {
      type: Array
    },
    hongsedata: {
      type: Array
    },
    dabiaolv: {
      type: Array
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    xdata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    zhibiaoshu: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    lvsedata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    hongsedata: {
      deep: true,
      handler(val) {
        console.log('-----子组件红色项更新后', val)
        this.setOptions(val)
      }
    },
    dabiaolv: {
      deep: true,
      handler(val) {
        console.log('-----子组件达标率更新后', val)
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => { // dom更新后的调用
      this.initChart()
      console.log('-----子组件达标率', this.dabiaolv)
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
        color: ['#0050EF', '#00ABA9', '#E51400', '#808080'],
        title: {
		  text: this.title,
		  textStyle: {
            fontSize: 20,
            fontWeight: 'normal',
            fontFamily: 'KaiTi'
          },
          left: '5%'
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
          data: ['指标数', '绿色项', '红色项', '达标率'],
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
          data: this.xdata,
          axisLabel: {
            interval: 0, // 横轴信息全部显示
            rotate: -90// -30度角倾斜显示
          },
          axisTick: {
            show: false
          }
        },
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
            name: '指标数',
	          type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.zhibiaoshu, // ydata1是一个二维数组 ydata1[0]也是一个数组,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '绿色项',
	          type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.lvsedata,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '红色项',
	          type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.hongsedata,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '达标率',
            type: 'line',
            data: this.dabiaolv,
            smooth: false
          }

        ]
      })
    }
  }
}
</script>
