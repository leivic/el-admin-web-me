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
      <Stackchart :ydata1="chart1.chartdata" :lengenddata="chart1.lengenddata" :title="chart1.title" />
    </el-row>

    <el-row v-loading="chart2.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件--> <!--v-loadning是vue封装的加载样式-->
      <Stackchart :ydata1="chart2.chartdata" :lengenddata="chart2.lengenddata" :title="chart2.title" />
    </el-row>

  </div>
</template>
<script>
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import Stackchart from './components/Stackchart'
import { getstationzhiliangxinnian, getgroupzhiliangxinnian } from '@/api/qe/consicious'
export default {
  components: {
    Stackchart,
    SelectYear
  },
  data() {
    return {
      chart1: {
        listLoading: true,
        title: '工位-质量信念', // 会响应式刷新的不只是data里面的数据，还有vuex，vuex里面的数据一旦变化  使用该数据的地方也会刷新
        chartdata: [[], [], [], [], [], [], [], [], [], [], [], []], // 每个数组里面都是一个月的从冲压 到装配的6个数据
        lengenddata: []
      },
      chart2: {
        listLoading: true,
        title: '班组-质量信念', // 会响应式刷新的不只是data里面的数据，还有vuex，vuex里面的数据一旦变化  使用该数据的地方也会刷新
        chartdata: [[], [], [], [], [], [], [], [], [], [], [], []],
        lengenddata: []
      }
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
    getstationzhiliangxinnian(this.year, this.chart1.chartdata, this.chart1.lengenddata).then(() => this.chart1.listLoading = false) // 前面函数的最后是个then then函数的返回值还是promise，后面可以继续调用then
    getgroupzhiliangxinnian(this.year, this.chart2.chartdata, this.chart2.lengenddata).then(() => this.chart2.listLoading = false)
  },
  computed: {
    ...mapGetters(['year'])

  },
  methods: {

  },
  watch: {
    year(newval) {
      this.chart1.listLoading = true
      this.chart2.listLoading = true
      getstationzhiliangxinnian(newval, this.chart1.chartdata, this.chart1.lengenddata).then(() => this.chart1.listLoading = false)
      getgroupzhiliangxinnian(newval, this.chart2.chartdata, this.chart2.lengenddata).then(() => this.chart2.listLoading = false)
    }
  }
}
</script>
<style lang="scss" scoped>

.continue-chart-container {
  padding: 32px;
  background-color: #fff;
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
