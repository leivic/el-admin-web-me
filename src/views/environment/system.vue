<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
		<SelectMonth />
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<Stackchart   :ydata1="chartdata1" :lengenddata="lengenddata1" :title="title1"  ></Stackchart>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
     <Stackchart   :ydata1="chartdata2" :lengenddata="lengenddata2" :title="title2"  ></Stackchart>
    </el-row>

  </div>
</template>
<script>
import SelectMonth from '@/components/SelectMonth'
import { mapGetters } from 'vuex'
import Stackchart from './components/Stackchart'
import {  getthisYearEnvironmentSystem } from '@/api/qe/environment'
export default {
  components: {
	SelectMonth,
	Stackchart
  },
  data() {
  
    return {
      title1:"车间系统完整水平",
      chartdata1:[[], [],[],[],[],[],[],[],[],[],[],[]],
      lengenddata1:[],
      title2:"工段系统完整水平",
      chartdata2:[[], [],[],[],[],[],[],[],[],[],[],[]],
      lengenddata2:[] 
    }
  },
  mounted() {
	  
    getthisYearEnvironmentSystem(this.year,"区域",this.chartdata1,this.lengenddata1)
    getthisYearEnvironmentSystem(this.year,"工段",this.chartdata2,this.lengenddata2) 
  },
  computed: {
    ...mapGetters(['month']),
    year(){
	return this.month.substring(0,4)
    }
    
  },
  methods: {
	 
  },
  watch: {
    year(newval){
      getthisYearEnvironmentSystem(newval,"区域",this.chartdata1,this.lengenddata1)
      getthisYearEnvironmentSystem(newval,"工段",this.chartdata2,this.lengenddata2)
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
</style>
