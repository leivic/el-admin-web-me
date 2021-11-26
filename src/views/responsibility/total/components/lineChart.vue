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

    chartdata: {
      type: Object,
      required: true
    },
    title: {
      type: String,
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
        color: ['#00ABA9', '#1BA1E2', '#0050EF', '#6A00FF', '#D80073'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 24,
            fontWeight: 'normal',
            fontFamily: 'Courier New'
          },
          left: '28%'
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
          data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '机加车间','装配车间'],
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
          data: this.chartdata.xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '冲压车间',
            type: 'line',
            data: this.chartdata.chongyachejiandata,
            smooth:true 
          },
          {
            name: '车身车间',
            type: 'line',
            data: this.chartdata.cheshenchejiandata,
            smooth:true 
          },
          {
            name: '涂装车间',
            type: 'line',
            data: this.chartdata.tuzhuangchejiandata,
            smooth:true 
          },
          {
            name: '总装车间',
            type: 'line',
            data: this.chartdata.zongzhuangchejiandata,
            smooth:true 
          },
          {
            name: '机加车间',
            type: 'line',
            data: this.chartdata.jijiachejiandata,
            smooth:true 
          },
          {
            name: '装配车间',
            type: 'line',
            data: this.chartdata.zhuangpeichejiandata,
            smooth:true 
          }
        ]

      })
    }
  }
}
</script>
