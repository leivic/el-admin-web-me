<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth ref="selectmonth" /> <!--props传值只能父传子，不能子传父-->
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <Chart height="500px" :chart-data="chartData.ydata" :x-data="chartData.xdata" :title="chartData.title" />
    </el-row>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'// 使用vuex状态管理器
import { fetchSelfStation, fetchListGongwei } from '@/api/qe'
import SelectMonth from '@/components/SelectMonth'
import Chart from './components/Chart'

export default {
  components: {
    SelectMonth,
    Chart
  },
  data() {
    return {
      chartData: {
        xdata: [],
        ydata: [],
        title: '各区域自评工位符合率'
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

    fetchSelfStation('2021-06')
  },

  computed: {
    ...mapGetters(['month'])
  },
  watch: {
    month(newval) {
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
