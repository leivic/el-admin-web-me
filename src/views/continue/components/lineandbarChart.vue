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
        this.setOptions(val)//
      }
    },
    linearr: {
      deep: true,
      handler(val) {
        this.setOptions(val)//
      }
    }
  },
  created() {
    // this.getlinedata(this.ydata1.tiyanzhiliang,this.ydata1.shiwuzhiliang,this.linearr)
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
    /* getlinedata(arr1,arr2,linearr){ //传入三个数组 合并两个数组的方法  这当然也是个vue文件啊 只要环境正确 一切环境下最基础的方法当然都可以用
      for (let i=0;i<arr1.length;i++) {
        linearr.push(arr1[i]+arr2[i])
      }
      console.log('linearr',linearr)
    } */ // 数据储存在本页面内 有数据的重载和重新加载视图的问题 导致储存在本页面的datapropety里面的数据不能动态更新
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        color: ['#00ABA9', '#1BA1E2', '#0050EF'],
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
        legend: {
          data: ['体验质量', '实物质量'],
          top: 30
        },
        toolbox: {
		    feature: {
            saveAsImage: { show: true }
		    },
		    right: '2%'
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
            name: '体验质量',
	    type: 'bar',
	    stack: '质量',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.tiyanzhiliang, // ydata1是一个二维数组 ydata1[0]也是一个数组,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            stack: '折线',
            color: '#909399',
            type: 'line',
            data: this.ydata1.tiyanzhiliang,
            smooth: false
          },
          {
            name: '实物质量',
	    type: 'bar',
            stack: '质量',
            emphasis: {
              focus: 'series'
            },
            data: this.ydata1.shiwuzhiliang,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            stack: '折线',
            color: '#909399',
            type: 'line',
            data: this.ydata1.shiwuzhiliang,
            smooth: false
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
