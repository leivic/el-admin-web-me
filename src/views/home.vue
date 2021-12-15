<template>
  <div class="continue-chart-container">
   
   
    <el-row :gutter="16"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart1.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <lineChart :chartdata="chart1.chartdata" :xdata="chart1.xdata" :title="chart1.title" /> 
        </div>
      </el-col>
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <lineChart :chartdata="chart2.chartdata" :xdata="chart1.xdata" :title="chart2.title" /> 
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="16">
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
         <Stackchart :chartData="chart3.chartdata" :title="chart3.title" :lengenddata="chart3.lengenddata"></Stackchart>
        </div>
      </el-col>

      <el-col v-loading="chart4.listLoading" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <Stackchart :chartData="chart4.chartdata" :title="chart4.title" :lengenddata="chart3.lengenddata"></Stackchart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart from './components/lineChart'
import Stackchart from './components/Stackchart'
import { mapGetters } from 'vuex'
import { findAllIndexdata1,findAllIndexdata2,findAllIndexdata3,findAllIndexdata4 } from '@/api/qe/other'

export default {
  components: {
    lineChart,
    Stackchart
  },
  data() {
    return {
         chart1:{
          listLoading:true,
          chartdata:[],
          xdata:[],
          title:''
        },
        chart2:{
          listLoading:true,
          chartdata:[],
          xdata:[],
          title:''
        },
        chart3:{
          listLoading:true,
          chartdata:[],
          lengenddata:[],
          title:''
        },
        chart4:{
          listLoading:true,
          chartdata:[],
          lengenddata:[],
          title:''
        }

    }
  },
  mounted() {
   this.getmontharray() 
   this.findAllIndexdata1()
   this.findAllIndexdata2()
   this.findAllIndexdata3()
   this.findAllIndexdata4()
  },
  computed: {
    ...mapGetters(['month','year']),
   
  },
  methods: {
	  findAllIndexdata1(){
      this.chart1.listLoading=true
      this.chart1.title="["+this.year+"]"+"制造车间质量生态文明指数表现"
		  findAllIndexdata1().then(
			  res=>{
          console.log(res)
          this.chart1.chartdata=res
          this.chart1.listLoading=false
			  }
		  )
    },
     findAllIndexdata2(){
      this.chart2.listLoading=true
      this.chart2.title="["+this.year+"]"+"制造车间工段级质量生态文明指数表现"
		  findAllIndexdata2().then(
			  res=>{
          console.log(res)
          this.chart2.chartdata=res
          this.chart2.listLoading=false
			  }
		  )
    },
    findAllIndexdata3(){
      this.chart3.listLoading=true
      this.chart3.title="["+this.year+"]"+"制造班组质量生态文明指数表现"
		  findAllIndexdata3().then(
			  res=>{
          console.log(res)
          this.chart3.chartdata=res
          this.chart3.listLoading=false
			  }
		  )
    },
    findAllIndexdata4(){
      this.chart4.listLoading=true
      this.chart4.title="["+this.year+"]"+"制造工位质量生态文明指数表现"
		  findAllIndexdata4().then(
			  res=>{
          console.log(res)
          this.chart4.chartdata=res
          this.chart4.listLoading=false
			  }
		  )
    },
    getmontharray(){
      let i=(this.month+'').substring(5,7)
      console.log(i)
      
      for(let x=1;x<parseInt(i)+1;x++){
        this.chart1.xdata.push(x+'月')
        this.chart3.lengenddata.push(x+'月')
      }
      console.log(this.chart1.xdata)
      console.log('lengenddata',this.chart3.lengenddata)
    }
  },
  watch: {
	
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
.chart1label{
  float: left
}
</style>
