<template>
  <div class="continue-chart-container">
    <el-row>

      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <span><SelectYear /></span>
          <span>
            <el-select v-model="value" clearable placeholder="请选择" style="width:120px;border:none;float: left; margin-right: 5px ;padding: 3px 0;"><!--v-model相当于一个属性绑定和一个事件-->
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <lineChart2 :xdata="chart1.xdata" :chartdata="chart1.chartdata" :title="chart1.title" />
    </el-row>
    <el-row :gutter="16"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineandbarChart :linearr="chart2.linearr" :xdata="chart2.xdata" :ydata1="chart2.ydata1" :title="chart2.title" />
        </div> <!--组件数据传值也是动态更新的-->
      </el-col>
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineandbarChart3 :xdata="chart3.xdata" :ydata1="chart3.ydata1" :title="chart3.title" />
        </div>
      </el-col>
      <el-col v-loading="chart4.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <barChart2 :chart-data="chart4.chartdata" :x-data="chart4.xdata" :title="chart4.title" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart2 from './components/lineChart2'
import barChart2 from './components/barChart2'
import lineandbarChart from './components/lineandbarChart'
import lineandbarChart3 from './components/lineandbarChart3'
import piechart from './components/piechart'
import SelectMonth from '@/components/SelectMonth'
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import { gettotalcontinueBydateandzone, getzhiliangtishenqianli, getzhiliangshuipin, getneibusunshi } from '@/api/qe/continue'

export default {
  components: {
	  SelectMonth,
	  lineChart2,
    	 SelectYear,
	    lineandbarChart,
	   lineandbarChart3,
	    piechart,
	    barChart2
  },
  data() {
    return {
      chart1: {
	      listLoading: true,
	      xdata: [],
        chartdata: [],
        title: '冲压车间各层级质量生态持续状态'
      },
      chart2: {
	      listLoading: true,
	      title: '冲压车间质量水平各模块状态',
	      xdata: [],
	      ydata1: {
		      shiwuzhilaing: [],
		      tiyanzhiliang: []
        },
        linearr: []
      },
      chart3: {
	      listLoading: true,
        xdata: [],
        title: '冲压车间质量提升潜力各模块状态',
	      ydata1: {
		      xianzhuang: [],
		      zhiliangcehua: [],
		      zhixing: []
	      }
      },
      chart4: {
        title: '冲压车间内部损失趋势图',
        listLoading: true,
        chartdata: [],
        xdata: []
      },
      options: [{ // 工具栏下拉框数据
        value: '冲压车间',
        label: '冲压车间'
      }, {
        value: '车身车间',
        label: '车身车间'

      }, {
        value: '涂装车间',
        label: '涂装车间'
      }, {
        value: '总装车间',
        label: '总装车间'
      }, {
        value: '发动机工厂',
        label: '发动机工厂'
      }
      ],
      value: '冲压车间' // 工具栏下拉框数据
    }
  },
  created() {
    const theDate = new Date()
    let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1) //r如果这个month1是函数里的 修改就不起作用 因为函数里面的是拷贝
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
            }
    this.$store.commit('CHANGE_YEAR',theDate.getFullYear() + '') //每次加载组件 更新store里面的数据 
    this.$store.commit('CHANGE_MONTH',month1)
    this.$store.commit('CHANGE_ZONE','冲压车间')
  },
  mounted() {
	  this.gettotalcontinueBydateandzone(this.value, this.year)
	  this.getzhiliangshuipin(this.value, this.year)
	  this.getzhiliangtishenqianli(this.value, this.year)
	  this.getneibusunshi(this.value, this.year)
  },
  computed: {
    ...mapGetters(['year'])

  },
  methods: {
	  gettotalcontinueBydateandzone(zone, year) {
		  this.chart1.chartdata.splice(0, this.chart1.chartdata.length)
		  this.chart1.xdata.splice(0, this.chart1.xdata.length)
		  this.chart1.listLoading = true
		  gettotalcontinueBydateandzone(zone, year).then(
			  res => {
				  for (let i = 1; i < res.length + 1; i++) {
					  this.chart1.xdata.push(i + '月')
				  }
				  this.chart1.chartdata = res
				  this.chart1.listLoading = false
			  }
		  )
	  },
	  getzhiliangshuipin(zone, year) {
		  this.chart2.listLoading = true
		  this.chart2.xdata.splice(0, this.chart2.xdata.length)
		  this.chart2.ydata1 = {}
		  getzhiliangshuipin(zone, year).then(
			  res => {
				 for (let i = 1; i < res.tiyanzhiliang.length + 1; i++) {
					  this.chart2.xdata.push(i + '月')
				  }
          this.chart2.ydata1 = res
          this.chart2.listLoading = false
			  }
		  )
	  },
	   getzhiliangtishenqianli(zone, year) {
		  this.chart3.listLoading = true
		  this.chart3.xdata.splice(0, this.chart3.xdata.length)
		  this.chart3.ydata1 = {}
		  getzhiliangtishenqianli(zone, year).then(
			  res => {
				  console.log(res)
				 for (let i = 1; i < res.xianzhuang.length + 1; i++) {
					  this.chart3.xdata.push(i + '月')
				  }
				  this.chart3.ydata1 = res
				  this.chart3.listLoading = false
			  }
		  )
	  },
	  getneibusunshi(zone, year) {
		  this.chart4.listLoading = true
		  this.chart4.xdata.splice(0, this.chart4.xdata.length)
		  this.chart4.chartdata.splice(0, this.chart4.chartdata.length)
		  getneibusunshi(zone, year).then(
			  res => {
          console.log(res)
				 for (let i = 1; i < res.length + 1; i++) {
					  this.chart4.xdata.push(i + '月')
				  }
				  this.chart4.chartdata = res
				  this.chart4.listLoading = false
			  }
		  )
    },
    getlinedata(arr1, arr2, linearr) {
      for (let i = 0; i < arr1.length; i++) {
        linearr.push(arr1[i] + arr2[i])
      }
      console.log('linearr', linearr)
    }
  },
  watch: {
	  year(newval) {
		  this.gettotalcontinueBydateandzone(this.value, newval)
		  this.getzhiliangshuipin(this.value, newval)
		  this.getzhiliangtishenqianli(this.value, newval)
		  this.getneibusunshi(this.value, newval)
    },
	  value(newval) {
      this.chart1.title = newval + '各层级质量生态持续状态'
      this.chart2.title = newval + '质量水平各模块状态'
      this.chart3.title = newval + '质量提升潜力各模块状态'
      this.chart4.title = newval + '内部损失趋势图'
      this.gettotalcontinueBydateandzone(newval, this.year)
      this.getzhiliangshuipin(newval, this.year)
      this.getzhiliangtishenqianli(newval, this.year)
      this.getneibusunshi(newval, this.year)
    }
  }
}
</script>
<style lang="scss" scoped>

.continue-chart-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .tool {
	  margin-bottom: 16px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>
