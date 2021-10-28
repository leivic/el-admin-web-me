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
          data: ['车间'],
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
          data: this.xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '车间',
            type: 'line',
            data: this.chartdata,
            smooth: false
          }
        ]

      })
    }
  }
}
</script>
