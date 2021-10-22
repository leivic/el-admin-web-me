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
    xdata: {
      type: Array,
      required: true    
    },
    chongyadata: {
      type: Array,
      required: true,
    },
     cheshendata: {
      type: Array,
      required: true    
    },
     tuzhuangdata: {
      type: Array,
      required: true    
    },
     fadongjidata: {
      type: Array,
      required: true    
    },
     zongzhuangdata: {
      type: Array,
      required: true    
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chongyadata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    xdata: {
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
      this.setOptions(this.xdata)
    },
		setOptions({ expectedData, actualData } = {}) {
		this.chart.setOption({
					title: {
		text: 'Sgmw重庆分公司质量生态持续等级状态'
		},
		tooltip: {
		trigger: 'axis'
		},
		legend: {
		data: ['冲压车间', '车身车间', '涂装车间', '总装车间', '发动机工厂']
		},
		grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
		},
		toolbox: {
		feature: {
		saveAsImage: {}
		}
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
		name: '冲压车间',
		type: 'line',
		data: this.chongyadata
		},
		{
		name: '车身车间',
		type: 'line',
		data: this.cheshendata
		},
		{
		name: '涂装车间',
		type: 'line',
		data: this.tuzhuangdata
		},
		{
		name: '总装车间',
		type: 'line',
		data: this.zongzhuangdata
		},
		{
		name: '发动机工厂',
		type: 'line',
		data: this.fadongjidata
		}
		]	

		})
    }
  }
}
</script>
