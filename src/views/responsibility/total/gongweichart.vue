<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth />
        </div>
      </el-col>

    </el-row>
    <el-row v-loading="chart1.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <barChart :chart-data="zongji" :title="chart1.title" />

    </el-row>
    <el-row v-loading="chart2.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <barChart :chart-data="quexian" :title="chart2.title" />

    </el-row>
  
    <el-row v-loading="chart4.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <barChart :chart-data="zhiliang" :title="chart4.title" />

    </el-row>

  </div>
</template>
<script>
import { findAllgongweilistBydate } from '@/api/qe/reponsibility'
import SelectMonth from '@/components/SelectMonth'
import barChart from './components/barChart'
import { mapGetters } from 'vuex'
export default {
  components: {
    SelectMonth,
    barChart
  },
  data() {
    return {
      chart1: {
        listloading: true,
        title: '工位车间质量生态责任状态'
      },
      zongji: {
        xdata: [],
        ydata: []
      },
      chart2: {
        listloading: true,
        title: '工位缺陷拦截能力'
      },
      quexian: {
        xdata: [],
        ydata: []
      },
     
      chart4: {
        listloading: true,
        title: '工位质量防御能力'
      },
      zhiliang: {
        xdata: [],
        ydata: []
      }
    }
  },
  created() {
    this.getzongjidata(this.month)
    this.getquexiandata(this.month)
    this.getzhiliangdata(this.month)
  },
	 computed: {
    		...mapGetters(['month'])
	 },
	 methods: {
		 getzongjidata(date) {
			 		this.zongji.xdata.splice(0, this.zongji.xdata.length)
      this.zongji.ydata.splice(0, this.zongji.ydata.length)
      this.zongji.xdata = [] // 这一行代码没执行完成是不会跳到下一行的 会卡住
      this.zongji.ydata = []
      findAllgongweilistBydate(date).then(res => {
        console.log(res)
        if (res == []) {
          this.zongji.xdata.splice(0, this.zongji.xdata.length)
          this.zongji.ydata.splice(0, this.zongji.ydata.length)
          this.zongji.xdata = []
          this.zongji.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.zongji.xdata.push(a.gongwei)
            this.zongji.ydata.push(a.zongji) // 这样深层赋值是可以的
          }
        }
      }).then(res => {
        console.log(this.zongji)
        this.chart1.listloading = false
      })
		 },
		 getquexiandata(date) {
      this.quexian.xdata.splice(0, this.quexian.xdata.length)
      this.quexian.ydata.splice(0, this.quexian.ydata.length)
      this.quexian.xdata = []
      this.quexian.ydata = []
      findAllgongweilistBydate(date).then(res => {
        if (res == []) {
          this.quexian.xdata.splice(0, this.quexian.xdata.length)
          this.quexian.ydata.splice(0, this.quexian.ydata.length)
          this.quexian.xdata = []
          this.quexian.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.quexian.xdata.push(a.gongwei)
            this.quexian.ydata.push(a.quexianlanjie) // 这样深层赋值是可以的
          }
        }
      }).then(res => this.chart2.listloading = false)// 直接这样深层赋值是可以的
		 },
    
		 getzhiliangdata(date) {
      this.zhiliang.xdata.splice(0, this.zhiliang.xdata.length)
      this.zhiliang.ydata.splice(0, this.zhiliang.ydata.length)
      this.zhiliang.xdata = []
      this.zhiliang.ydata = []
      findAllgongweilistBydate(date).then(res => {
        if (res == []) {
          this.zhiliang.xdata.splice(0, this.zhiliang.xdata.length)
          this.zhiliang.ydata.splice(0, this.zhiliang.ydata.length)
          this.zhiliang.xdata = []
          this.zhiliang.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.zhiliang.xdata.push(a.gongwei)
            this.zhiliang.ydata.push(a.zhiliangfangyu) // 这样深层赋值是可以的
          }
        }
      }).then(this.chart4.listloading = false)
		 }
		 },
  watch: {
    month(newval) {
      this.chart1.listloading = true
      this.chart2.listloading = true
      this.chart4.listloading = true
      this.getzongjidata(newval)
      this.getquexiandata(newval)
      this.getzhiliangdata(newval)
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
