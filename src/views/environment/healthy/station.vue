<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth />
        </div>
      </el-col>
    </el-row>

     <el-row :gutter="16"><!--三个图表组件 布局是elment-ui栅栏布局-->
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart1.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart1.xdata" :title="chart1.title" :stationdata="chart1.stationdata" :groupdata="chart1.groupdata" :workshopdata="chart1.workshopdata" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart2.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart2.xdata" :title="chart2.title" :stationdata="chart2.stationdata" :groupdata="chart2.groupdata" :workshopdata="chart2.workshopdata" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart3.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart3.xdata" :title="chart3.title" :stationdata="chart3.stationdata" :groupdata="chart3.groupdata" :workshopdata="chart3.workshopdata" />
        </div>
      </el-col>
    </el-row>

     <el-row :gutter="16"><!--三个图表组件 布局是elment-ui栅栏布局-->
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart4.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart4.xdata" :title="chart4.title" :stationdata="chart4.stationdata" :groupdata="chart4.groupdata" :workshopdata="chart4.workshopdata"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart5.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart5.xdata" :title="chart5.title" :stationdata="chart5.stationdata" :groupdata="chart5.groupdata" :workshopdata="chart5.workshopdata"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" v-loading="chart6.listLoading">
        <div class="chart-wrapper">
		<RowBarchart :chartData="chart6.xdata" :title="chart6.title" :stationdata="chart6.stationdata" :groupdata="chart6.groupdata" :workshopdata="chart6.workshopdata"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import SelectMonth from '@/components/SelectMonth'
import { mapGetters } from 'vuex'
import RowBarchart from './../components/RowBarchart'
import { findEnvironmentBaseStationHealthy,findEnvironmentBaseGroupHealthy,findEnvironmentBaseWorkshopHealthy } from '@/api/qe/environment'
export default {
  components: {
    SelectMonth,
    RowBarchart
  },
  data() {
    return {
	    chart1:{
		    title:"冲压-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart2:{
		    title:"车身-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart3:{
		    title:"涂装-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart4:{
		    title:"总装-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart5:{
		    title:"机加-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
	    chart6:{
		    title:"装配-健康水平运行状态",
		    xdata: [],
		    stationdata: [],
		    groupdata: [],
		    workshopdata: [],
		    listLoading: true
	    },
    }
  },
  mounted() {
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"冲压车间",this.chart1.stationdata,this.chart1.xdata),findEnvironmentBaseGroupHealthy(this.year,'冲压车间',this.chart1.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'冲压车间',this.chart1.workshopdata)]).then(() => {
		this.chart1.listLoading=false
	}) //promise.all 几个promise都执行完成后再执行回调
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"车身车间",this.chart2.stationdata,this.chart2.xdata),findEnvironmentBaseGroupHealthy(this.year,'车身车间',this.chart2.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'车身车间',this.chart2.workshopdata)]).then(() => {
		this.chart2.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"涂装车间",this.chart3.stationdata,this.chart3.xdata),findEnvironmentBaseGroupHealthy(this.year,'涂装车间',this.chart3.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'涂装车间',this.chart3.workshopdata)]).then(() => {
		this.chart3.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"总装车间",this.chart4.stationdata,this.chart4.xdata),findEnvironmentBaseGroupHealthy(this.year,'总装车间',this.chart4.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'总装车间',this.chart4.workshopdata)]).then(() => {
		this.chart4.listLoading=false
	}) //promise.all 几个promise都执行完成后再执行回调
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"机加车间",this.chart5.stationdata,this.chart5.xdata),findEnvironmentBaseGroupHealthy(this.year,'机加车间',this.chart5.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'机加车间',this.chart5.workshopdata)]).then(() => {
		this.chart5.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(this.year,"装配车间",this.chart6.stationdata,this.chart6.xdata),findEnvironmentBaseGroupHealthy(this.year,'装配车间',this.chart6.groupdata),findEnvironmentBaseWorkshopHealthy(this.year,'装配车间',this.chart6.workshopdata)]).then(() => {
		this.chart6.listLoading=false
	})
  },
  computed: {
    ...mapGetters(['month']),
    year() {
      return this.month.substring(0, 4)
    }

  },
  methods: {

  },
  watch: {
    year(newval) {
	this.chart1.listLoading=true
	this.chart2.listLoading=true
	this.chart3.listLoading=true
	this.chart4.listLoading=true
	this.chart5.listLoading=true
	this.chart6.listLoading=true	
	Promise.all([findEnvironmentBaseStationHealthy(newval,"冲压车间",this.chart1.stationdata,this.chart1.xdata),findEnvironmentBaseGroupHealthy(newval,'冲压车间',this.chart1.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'冲压车间',this.chart1.workshopdata)]).then(() => {
		this.chart1.listLoading=false
	}) //promise.all 几个promise都执行完成后再执行回调
	Promise.all([findEnvironmentBaseStationHealthy(newval,"车身车间",this.chart2.stationdata,this.chart2.xdata),findEnvironmentBaseGroupHealthy(newval,'车身车间',this.chart2.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'车身车间',this.chart2.workshopdata)]).then(() => {
		this.chart2.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(newval,"涂装车间",this.chart3.stationdata,this.chart3.xdata),findEnvironmentBaseGroupHealthy(newval,'涂装车间',this.chart3.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'涂装车间',this.chart3.workshopdata)]).then(() => {
		this.chart3.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(newval,"总装车间",this.chart4.stationdata,this.chart4.xdata),findEnvironmentBaseGroupHealthy(newval,'总装车间',this.chart4.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'总装车间',this.chart4.workshopdata)]).then(() => {
		this.chart4.listLoading=false
	}) //promise.all 几个promise都执行完成后再执行回调
	Promise.all([findEnvironmentBaseStationHealthy(newval,"机加车间",this.chart5.stationdata,this.chart5.xdata),findEnvironmentBaseGroupHealthy(newval,'机加车间',this.chart5.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'机加车间',this.chart5.workshopdata)]).then(() => {
		this.chart5.listLoading=false
	})
	Promise.all([findEnvironmentBaseStationHealthy(newval,"装配车间",this.chart6.stationdata,this.chart6.xdata),findEnvironmentBaseGroupHealthy(newval,'装配车间',this.chart6.groupdata),findEnvironmentBaseWorkshopHealthy(newval,'装配车间',this.chart6.workshopdata)]).then(() => {
		this.chart6.listLoading=false
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
