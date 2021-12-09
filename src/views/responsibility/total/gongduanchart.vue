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
    <el-row v-loading="chart3.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <barChart :chart-data="anquan" :title="chart3.title" />

    </el-row>
    <el-row v-loading="chart4.listloading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <barChart :chart-data="zhiliang" :title="chart4.title" />

    </el-row>

  </div>
</template>
<script>
import { findAllgongduanlistBydate } from '@/api/qe/reponsibility'
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
        title: '工段车间质量生态责任状态'
      },
      zongji: {
        xdata: [],
        ydata: []
      },
      chart2: {
        listloading: true,
        title: '工段缺陷拦截能力'
      },
      quexian: {
        xdata: [],
        ydata: []
      },
      chart3: {
        listloading: true,
        title: '工段安全保障能力'
      },
      anquan: {
        xdata: [],
        ydata: []
      },
      chart4: {
        listloading: true,
        title: '工段质量防御能力'
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
    this.getanquandata(this.month)
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
      findAllgongduanlistBydate(date).then(res => {
        console.log(res)
        if (res == []) {
          this.zongji.xdata.splice(0, this.zongji.xdata.length)
          this.zongji.ydata.splice(0, this.zongji.ydata.length)
          this.zongji.xdata = []
          this.zongji.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.zongji.xdata.push(a.gongduan)
            this.zongji.ydata.push(a.zongji) // 这样深层赋值是可以的
          }
        }
      }).then(res => {
        console.log(this.zongji)
        this.chart1.title=date+'工段车间质量生态责任状态'
        this.chart1.listloading = false
      })
		 },
		 getquexiandata(date) {
      this.quexian.xdata.splice(0, this.quexian.xdata.length)
      this.quexian.ydata.splice(0, this.quexian.ydata.length)
      this.quexian.xdata = []
      this.quexian.ydata = []
      findAllgongduanlistBydate(date).then(res => {
        if (res == []) {
          this.quexian.xdata.splice(0, this.quexian.xdata.length)
          this.quexian.ydata.splice(0, this.quexian.ydata.length)
          this.quexian.xdata = []
          this.quexian.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.quexian.xdata.push(a.gongduan)
            this.quexian.ydata.push(a.quexianlanjie) // 这样深层赋值是可以的
          }
        }
      }).then(res => {
        this.chart2.title=date+'工段缺陷拦截能力'
        this.chart2.listloading = false})// 直接这样深层赋值是可以的
		 },
    getanquandata(date) {
      this.anquan.xdata.splice(0, this.anquan.xdata.length)
      this.anquan.ydata.splice(0, this.anquan.ydata.length)
      this.anquan.xdata = []
      this.anquan.ydata = []
      findAllgongduanlistBydate(date).then(res => {
        if (res == []) {
          this.anquan.xdata.splice(0, this.anquan.xdata.length)
          this.anquan.ydata.splice(0, this.anquan.ydata.length)
          this.anquan.xdata = []
          this.anquan.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.anquan.xdata.push(a.gongduan)
            this.anquan.ydata.push(a.anquanbaozhang) // 这样深层赋值是可以的
          }
        }
      }).then(res => {
        this.chart3.title=date+'工段安全保障能力'
        this.chart3.listloading = false})
		 },
		 getzhiliangdata(date) {
      this.zhiliang.xdata.splice(0, this.zhiliang.xdata.length)
      this.zhiliang.ydata.splice(0, this.zhiliang.ydata.length)
      this.zhiliang.xdata = []
      this.zhiliang.ydata = []
      findAllgongduanlistBydate(date).then(res => {
        if (res == []) {
          this.zhiliang.xdata.splice(0, this.zhiliang.xdata.length)
          this.zhiliang.ydata.splice(0, this.zhiliang.ydata.length)
          this.zhiliang.xdata = []
          this.zhiliang.ydata = []// 这样赋值涉及到特殊数据类型的引用赋值 深拷贝和浅拷贝
        } else {
          for (const a of res) { // 只有一次回调代码 不是循环回调 回调（异步）代码间不会乱序
            this.zhiliang.xdata.push(a.gongduan)
            this.zhiliang.ydata.push(a.zhiliangfangyu) // 这样深层赋值是可以的
          }
        }
      }).then(res=>{
        this.chart4.title=date+'工段质量防御能力'
        this.chart4.listloading = false})
		 }
		 },
  watch: {
    month(newval) {
      this.chart1.listloading = true
      this.chart2.listloading = true
      this.chart3.listloading = true
      this.chart4.listloading = true
      this.getzongjidata(newval)
      this.getquexiandata(newval)
      this.getanquandata(newval)
      this.getzhiliangdata(newval)
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

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.chart1label{
  float: left
}
</style>
