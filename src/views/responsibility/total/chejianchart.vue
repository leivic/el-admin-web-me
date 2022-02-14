<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectYear />
        </div>
      </el-col>

    </el-row>
    <el-row v-loading="chart1.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->

      <lineChart :chartdata="zongji" :title="chart1.title" />
    </el-row>
    <el-row :gutter="16"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart2.listloading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineChart1 :chartdata="quexian" :title="chart2.title" />
        </div>
      </el-col>
      <el-col v-loading="chart3.listloading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineChart1 :chartdata="anquan" :title="chart3.title" />
        </div>
      </el-col>
      <el-col v-loading="chart4.listloading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineChart1 :chartdata="zhiliang" :title="chart4.title" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getzonglanzongjichartdata, getzonglanquexianchartdata, getzonglananquanchartdata, getzonglanzhiliangchartdata } from '@/api/qe/reponsibility'
import lineChart from './components/lineChart'
import lineChart1 from './components/lineChart1'
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'

export default {
  components: {
    lineChart,
    SelectYear,
    lineChart1
  },
  data() {
    return {
      zongji: {

      },
      chart1: {
        listloading: true,
        title: '车间质量生态责任状态'
      },
      quexian: {

      },
      chart2: {
        listloading: true,
        title: '缺陷拦截能力'
      },
      anquan: {

      },
      chart3: {
        listloading: true,
        title: '安全保障能力'
      },
      zhiliang: {

      },
      chart4: {
        listloading: true,
        title: '质量防御能力'
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
    getzonglanzongjichartdata(this.year).then(res => {
      console.log(res)// 像这种同步代码 是一碰到就直接执行 执行完才执行下一句（一条条执行 没执行完就会卡在这里） 所以一碰到这一句 就会在控制台出打印出来
      this.zongji = res
      this.chart1.listloading = false
    })
    getzonglanquexianchartdata(this.year).then(res => {
      this.quexian = res
      this.chart2.listloading = false
    }
    )
    getzonglananquanchartdata(this.year).then(res => {
      this.anquan = res
      this.chart3.listloading = false
    })
    getzonglanzhiliangchartdata(this.year).then(res => {
      this.zhiliang = res
      this.chart4.listloading = false
    })
  },
  computed: {
    ...mapGetters(['year'])
  },
  watch: {
    year(newval) {
      this.chart1.listloading = true
      this.chart2.listloading = true
      this.chart3.listloading = true
      this.chart4.listloading = true
      getzonglanzongjichartdata(newval).then(res => {
        this.zongji = res
        this.chart1.listloading = false
      })
      getzonglanquexianchartdata(this.year).then(res => {
        this.quexian = res
        this.chart2.listloading = false
      }
      )
      getzonglananquanchartdata(this.year).then(res => {
        this.anquan = res
        this.chart3.listloading = false
      })
      getzonglanzhiliangchartdata(this.year).then(res => {
        this.zhiliang = res
        this.chart4.listloading = false
      })
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
.chart1label{
  float: left
}
</style>
