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
      <el-table
        :data="chart1.chartdata"
        style="width: 100%"
        max-height="400"
      >

        <el-table-column
          fixed
          prop="cengci"
          label="层次"
          width="100"
          align="center"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="100"
          align="center"
        />
        <el-table-column
          prop="chongya"
          label="冲压车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="cheshen"
          label="车身车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="tuzhuang"
          label="涂装车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="zongzhuang"
          label="总装车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="jijia"
          label="机加车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="zhuangpei"
          label="装配车间"
          width="120"
          align="center"
        />
      </el-table>

    </el-row>

    <el-row v-loading="chart2.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件--> <!--v-loadning是vue封装的加载样式-->
      <el-table
        :data="chart2.chartdata"
        style="width: 100%"
        max-height="400"
      >

        <el-table-column
          fixed
          prop="cengci"
          label="层次"
          width="100"
          align="center"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="100"
          align="center"
        />
        <el-table-column
          prop="chongya"
          label="冲压车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="cheshen"
          label="车身车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="tuzhuang"
          label="涂装车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="zongzhuang"
          label="总装车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="jijia"
          label="机加车间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="zhuangpei"
          label="装配车间"
          width="120"
          align="center"
        />
      </el-table>
    </el-row>

  </div>
</template>
<script>
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import { getstationzhiliangrenzhi, getgroupzhiliangrenzhi } from '@/api/qe/consicious'
export default {
  components: {
    SelectYear
  },
  data() {
    return {
      chart1: {
        listLoading: true,
        title: '工位-质量认知', // 会响应式刷新的不只是data里面的数据，还有vuex，vuex里面的数据一旦变化  使用该数据的地方也会刷新
        chartdata: [] // 每个数组里面都是一个月的从冲压 到装配的6个数据
      },
      chart2: {
        listLoading: true,
        title: '班组-质量认知', // 会响应式刷新的不只是data里面的数据，还有vuex，vuex里面的数据一旦变化  使用该数据的地方也会刷新
        chartdata: []
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
    getstationzhiliangrenzhi(this.year, this.chart1.chartdata).then(() => {
      this.chart1.listLoading = false
      console.log(this.chart1.chartdata)
    }) // 前面函数的最后是个then then函数的返回值还是promise，后面可以继续调用then
    getgroupzhiliangrenzhi(this.year, this.chart2.chartdata).then(() => this.chart2.listLoading = false)
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
      getstationzhiliangrenzhi(newval, this.chart1.chartdata).then(() => this.chart1.listLoading = false)
      getgroupzhiliangrenzhi(newval, this.chart2.chartdata).then(() => this.chart2.listLoading = false)
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
