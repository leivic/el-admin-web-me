<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="8" :sm="8" :lg="6">
        <div class="tool">
          <SelectDomain />
        </div>
        <div class="tool">
          <SelectMonth />
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Chart :chart-data="chart1.chartData" :x-data="chart1.xData" :title="chart1.title" height="400px" />
    </el-row>
    <el-row :gutter="32"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <Chart :chart-data="chart2.chartData" :x-data="chart2.xData" :title="chart2.title" />
        </div>
      </el-col>
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <Chart :chart-data="chart3.chartData" :x-data="chart3.xData" :title="chart3.title" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import SelectDomain from '@/components/SelectDomain'
import SelectMonth from '@/components/SelectMonth'
import { mapGetters } from 'vuex'
import Chart from './../components/Chart'
import { getStationByZoneAndDate, getGroupByZoneAndDate, getWorkShopByZoneAndDate } from '@/api/qe/environment'

export default {
  components: {
	  SelectDomain,
	  SelectMonth,
	  Chart
  },
  data() {
    return {
      chart1: {
	      title: '各工位健康水平',
	      chartData: [],
	      xData: [],
	      listLoading: true
      },
      chart2: {
	      title: '各班组健康水平',
	      chartData: [],
	      xData: [],
	      listLoading: true
      },
      chart3: {
	      title: '各工段健康水平',
	      chartData: [],
	      xData: [],
	      listLoading: true
      }
    }
  },
  created() {
    const theDate = new Date()
    let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1) // r如果这个month1是函数里的 修改就不起作用 因为函数里面的是拷贝
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
    }
    this.$store.commit('CHANGE_YEAR', theDate.getFullYear() + '') // 每次加载组件 更新store里面的数据
    this.$store.commit('CHANGE_MONTH', month1)
    this.$store.commit('CHANGE_ZONE', '冲压车间')
  },
  mounted() {
    getStationByZoneAndDate(this.month, this.zone, this.chart1.xData, this.chart1.chartData).then(() => this.chart1.listLoading = false)
    getGroupByZoneAndDate(this.month, this.zone, this.chart2.xData, this.chart2.chartData).then(() => this.chart2.listLoading = false)
    getWorkShopByZoneAndDate(this.month, this.zone, this.chart3.xData, this.chart3.chartData).then(() => this.chart3.listLoading = false)
  },
  computed: {
	  ...mapGetters(['month', 'zone'])
  },
  methods: {

  },
  watch: {
	  month(newval) {
      getStationByZoneAndDate(newval, this.zone, this.chart1.xData, this.chart1.chartData).then(() => this.chart1.listLoading = false)
    		getGroupByZoneAndDate(newval, this.zone, this.chart2.xData, this.chart2.chartData).then(() => this.chart2.listLoading = false)
    		getWorkShopByZoneAndDate(newval, this.zone, this.chart3.xData, this.chart3.chartData).then(() => this.chart3.listLoading = false)
	  },
	  zone(newval) {
      getStationByZoneAndDate(this.month, newval, this.chart1.xData, this.chart1.chartData).then(() => this.chart1.listLoading = false)
    		getGroupByZoneAndDate(this.month, newval, this.chart2.xData, this.chart2.chartData).then(() => this.chart2.listLoading = false)
   		getWorkShopByZoneAndDate(this.month, newval, this.chart3.xData, this.chart3.chartData).then(() => this.chart3.listLoading = false)
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
