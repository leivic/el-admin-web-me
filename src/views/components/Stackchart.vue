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
    lengenddata: {
      type: Array
    },
    chartData: {
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
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    title: {
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
          data: this.lengenddata,
          top: 30,
          textStyle:{
            fontSize:8
          },
          itemWidth:14,
          itemHeight:10,
          itemGap:4
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
            data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '机加车间', '装配车间'],
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
            name: '1月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[0].chongyachejian,this.chartData[0].cheshenchejian,this.chartData[0].tuzhuangchejian,this.chartData[0].zongzhuangchejian,this.chartData[0].jijiachejian,this.chartData[0].zhuangpeichejian],      // ydata1是一个二维数组 ydata1[0]也是一个数组,
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '2月',
	    type: 'bar',
            stack: '月份',
            barWidth: 40,
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[1].chongyachejian,this.chartData[1].cheshenchejian,this.chartData[1].tuzhuangchejian,this.chartData[1].zongzhuangchejian,this.chartData[1].jijiachejian,this.chartData[1].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '3月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[2].chongyachejian,this.chartData[2].cheshenchejian,this.chartData[2].tuzhuangchejian,this.chartData[2].zongzhuangchejian,this.chartData[2].jijiachejian,this.chartData[2].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '4月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[3].chongyachejian,this.chartData[3].cheshenchejian,this.chartData[3].tuzhuangchejian,this.chartData[3].zongzhuangchejian,this.chartData[3].jijiachejian,this.chartData[3].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '5月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[4].chongyachejian,this.chartData[4].cheshenchejian,this.chartData[4].tuzhuangchejian,this.chartData[4].zongzhuangchejian,this.chartData[4].jijiachejian,this.chartData[4].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '6月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[5].chongyachejian,this.chartData[5].cheshenchejian,this.chartData[5].tuzhuangchejian,this.chartData[5].zongzhuangchejian,this.chartData[5].jijiachejian,this.chartData[5].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '7月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[6].chongyachejian,this.chartData[6].cheshenchejian,this.chartData[6].tuzhuangchejian,this.chartData[6].zongzhuangchejian,this.chartData[6].jijiachejian,this.chartData[6].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '8月', // 这里的值要与lengend里面的值对应才能显示出来
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[7].chongyachejian,this.chartData[7].cheshenchejian,this.chartData[7].tuzhuangchejian,this.chartData[7].zongzhuangchejian,this.chartData[7].jijiachejian,this.chartData[7].zhuangpeichejian],
            label: {
              show: true,
              position: 'inside'
            }
          },
          {
            name: '9月',
	    type: 'bar',
	    stack: '月份',
            emphasis: {
              focus: 'series'
            },
            data: [this.chartData[8].chongyachejian,this.chartData[8].cheshenchejian,this.chartData[8].tuzhuangchejian,this.chartData[8].zongzhuangchejian,this.chartData[8].jijiachejian,this.chartData[8].zhuangpeichejian],
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
            data: [this.chartData[9].chongyachejian,this.chartData[9].cheshenchejian,this.chartData[9].tuzhuangchejian,this.chartData[9].zongzhuangchejian,this.chartData[9].jijiachejian,this.chartData[9].zhuangpeichejian],
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
            data: [this.chartData[10].chongyachejian,this.chartData[10].cheshenchejian,this.chartData[10].tuzhuangchejian,this.chartData[10].zongzhuangchejian,this.chartData[10].jijiachejian,this.chartData[10].zhuangpeichejian],
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
            data: [this.chartData[11].chongyachejian,this.chartData[11].cheshenchejian,this.chartData[11].tuzhuangchejian,this.chartData[11].zongzhuangchejian,this.chartData[11].jijiachejian,this.chartData[11].zhuangpeichejian],
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
