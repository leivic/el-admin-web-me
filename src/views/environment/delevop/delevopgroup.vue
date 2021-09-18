<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectYear />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16"><!--三个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart1.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart1.xdata" :title="chart1.title" :groupdata="chart1.groupdata" :workshopdata="chart1.workshopdata" />
        </div>
      </el-col>
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart2.xdata" :title="chart2.title" :groupdata="chart2.groupdata" :workshopdata="chart2.workshopdata" />
        </div>
      </el-col>
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart3.xdata" :title="chart3.title" :groupdata="chart3.groupdata" :workshopdata="chart3.workshopdata" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16"><!--三个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart4.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart4.xdata" :title="chart4.title" :groupdata="chart4.groupdata" :workshopdata="chart4.workshopdata" />
        </div>
      </el-col>
      <el-col v-loading="chart5.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart5.xdata" :title="chart5.title" :groupdata="chart5.groupdata" :workshopdata="chart5.workshopdata" />
        </div>
      </el-col>
      <el-col v-loading="chart6.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RowBarchart2 :chart-data="chart6.xdata" :title="chart6.title" :groupdata="chart6.groupdata" :workshopdata="chart6.workshopdata" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import RowBarchart2 from './../components/RowBarchart2'
import { findEnvironmentBaseGroupDelevop, findEnvironmentBaseWorkshopDelevop } from '@/api/qe/environment'
export default {
  components: {
    SelectYear,
    RowBarchart2
  },
  data() {
    return {
	    chart1: {
		    title: '冲压-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart2: {
		    title: '车身-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart3: {
		    title: '涂装-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart4: {
		    title: '总装-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart5: {
		    title: '机加-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart6: {
		    title: '装配-均衡发展运行状态',
		    xdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    }
    }
  },
  mounted() {
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart1.xdata, this.year, '冲压车间', this.chart1.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '冲压车间', this.chart1.workshopdata)]).then(() => {
      this.chart1.listLoading = false
    }) // promise.all 几个promise都执行完成后再执行回调
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart2.xdata, this.year, '车身车间', this.chart2.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '车身车间', this.chart2.workshopdata)]).then(() => {
      this.chart2.listLoading = false
    })
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart3.xdata, this.year, '涂装车间', this.chart3.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '涂装车间', this.chart3.workshopdata)]).then(() => {
      this.chart3.listLoading = false
    })
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart4.xdata, this.year, '总装车间', this.chart4.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '总装车间', this.chart4.workshopdata)]).then(() => {
      this.chart4.listLoading = false
    }) // promise.all 几个promise都执行完成后再执行回调
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart5.xdata, this.year, '机加车间', this.chart5.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '机加车间', this.chart5.workshopdata)]).then(() => {
      this.chart5.listLoading = false
    })
    Promise.all([findEnvironmentBaseGroupDelevop(this.chart6.xdata, this.year, '装配车间', this.chart6.groupdata), findEnvironmentBaseWorkshopDelevop(this.year, '装配车间', this.chart6.workshopdata)]).then(() => {
      this.chart6.listLoading = false
    })
  },
  computed: {/*
    ...mapGetters(['month']),
    year() {
      return this.month.substring(0, 4)
    }曾经的写法 */
    ...mapGetters(['year'])

  },
  methods: {

  },
  watch: {
    year(newval) {
      this.chart1.listLoading = true
      this.chart2.listLoading = true
      this.chart3.listLoading = true
      this.chart4.listLoading = true
      this.chart5.listLoading = true
      this.chart6.listLoading = true

      Promise.all([findEnvironmentBaseGroupDelevop(this.chart1.xdata, newval, '冲压车间', this.chart1.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '冲压车间', this.chart1.workshopdata)]).then(() => {
        this.chart1.listLoading = false
      }) // promise.all 几个promise都执行完成后再执行回调
      Promise.all([findEnvironmentBaseGroupDelevop(this.chart2.xdata, newval, '车身车间', this.chart2.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '车身车间', this.chart2.workshopdata)]).then(() => {
        this.chart2.listLoading = false
      })
      Promise.all([findEnvironmentBaseGroupDelevop(this.chart3.xdata, newval, '涂装车间', this.chart3.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '涂装车间', this.chart3.workshopdata)]).then(() => {
        this.chart3.listLoading = false
      })
      Promise.all([findEnvironmentBaseGroupDelevop(this.chart4.xdata, newval, '总装车间', this.chart4.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '总装车间', this.chart4.workshopdata)]).then(() => {
        this.chart4.listLoading = false
      }) // promise.all 几个promise都执行完成后再执行回调
      Promise.all([findEnvironmentBaseGroupDelevop(this.chart5.xdata, newval, '机加车间', this.chart5.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '机加车间', this.chart5.workshopdata)]).then(() => {
        this.chart5.listLoading = false
      })
      Promise.all([findEnvironmentBaseGroupDelevop(this.chart6.xdata, newval, '装配车间', this.chart6.groupdata), findEnvironmentBaseWorkshopDelevop(newval, '装配车间', this.chart6.workshopdata)]).then(() => {
        this.chart6.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.continue-chart-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 8px 8px 0;
    margin-bottom: 16px;
  }
  .tool {
	  margin-bottom: 8px;
  }
}
</style>
