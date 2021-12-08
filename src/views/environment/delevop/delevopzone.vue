<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectYear />
        </div>
      </el-col>
    </el-row>

    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Barchart :ydata1="chart1.chartdata" :lengenddata="chart1.lengenddata" :title="chart1.title" />
    </el-row>

  </div>
</template>
<script>
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import Barchart from './../components/Barchart'
import { getthisYearEnvironmentDevelopZone } from '@/api/qe/environment'
export default {
  components: {
    SelectYear,
    Barchart
  },
  data() {
    return {
      chart1: {
        listLoading: true,
        title: '', // 会响应式刷新的不只是data里面的数据，还有vuex，vuex里面的数据一旦变化  使用该数据的地方也会刷新
        chartdata: [[], [], [], [], [], [], [], [], [], [], [], []],
        lengenddata: []
      }
    }
  },
  mounted() {
	  getthisYearEnvironmentDevelopZone(this.year, this.chart1.chartdata, this.chart1.lengenddata).then(() => {
      this.chart1.title=this.year+'车间均衡发展运行状态'
      this.chart1.listLoading = false}) // 直接.then(this.chart1.listLoading = false) 里面的代码会直接执行，但是这样可不是回调函数
  },
  computed: {
    ...mapGetters(['year'])

  },
  methods: {

  },
  watch: {
    year(newval) {
      this.chart1.listLoading = true
      getthisYearEnvironmentDevelopZone(newval, this.chart1.chartdata, this.chart1.lengenddata).then(() => {
        this.chart1.title=newval+'车间均衡发展状态'
        this.chart1.listLoading = false})
    }
  }
}
</script>
<style lang="scss" scoped>

.continue-chart-container {
  padding: 16px;
  background-color: #fff;
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
