<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectMonth />
        </div>
      </el-col>

    </el-row>
    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <div class="chart1label">
        <div style="background: #00FF00">月度最佳:{{ best }}</div>
        <div style="background: #FF0000">月度最差:{{ lowest }}</div>
      </div>
      <lineChart :xdata="chart1.xdata" :chartdata="chart1.chartdata" />
    </el-row>
    <el-row :gutter="16"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <lineChart1 :xdata="chart2.xdata" :chartdata="chart2.chartdata" />
        </div>
      </el-col>
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <barChart :x-data="chart3.xdata" :chart-data="chart3.chartdata" :title="chart3.title" />
        </div>
      </el-col>
      <el-col v-loading="chart4.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <piechart :chartdata="chart4.chartdata" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart1 from './components/lineChart1'
import lineChart from './components/lineChart'
import barChart from './components/barChart'
import piechart from './components/piechart'
import SelectMonth from '@/components/SelectMonth'
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import { getzhiliangtishen, gettotalcontinueBydateandzone, gettotalcontinueBydate, getcontinuezhiliangshuipinBydate, getContinuePiechartvalue } from '@/api/qe/continue'

export default {
  components: {
	  SelectMonth,
	  lineChart,
    SelectYear,
    barChart,
    piechart,
    lineChart1
  },
  data() {
    return {
      best: undefined,
      lowest: undefined,
      chart1: {
	      listLoading: true,
	      a: [],
	      xdata: [],
	      chartdata: {
          chongyadata: [],
          cheshendata: [],
          tuzhuangdata: [],
          zongzhuangdata: [],
          fadongjidata: []
        }
      },
      chart2: {
	      listLoading: true,
	      a: [],
	      xdata: [],
	      chartdata: {
          chongyadata: [],
          cheshendata: [],
          tuzhuangdata: [],
          zongzhuangdata: [],
          fadongjidata: []
        }
      },
      chart3: {
        title: 'Sgmw重庆分公司各区域质量提升潜力分布',
        listLoading: true,
        chartdata: [],
        xdata: ['冲压车间', '车身车间', '涂装车间', '总装车间', '发动机工厂']
      },
      chart4: {
        listLoading: true,
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
    this.gettotalcontinueBydate(this.year)
    this.getcontinuezhiliangshuipinBydate(this.year)
    this.getzhiliangtishen(this.month) // 我之前在这一句后加了consle.log(this.chart3.chartdata) 结果没有输出 是因为回调函数里面给this.chart3.chartdata赋值是在回调函数 同步代码执行完成后才会执行 所以这句consle.log() 比回调函数更先执行
    this.getContinuePiechartvalue(this.month)
  },
  computed: {
    ...mapGetters(['month']),
    year() {
      return this.month.substring(0, 4) // //vuex状态管理器和data property都是响应式的 这两更新后 返回计算属性也会随之更新 如果没更新 返回的是之前的缓存
    }
  },
  methods: {
    getzhiliangtishen(month) {
      this.chart3.listLoading = true
      getzhiliangtishen(month).then(res => { // 像这几个then（）里面的异步代码 谁先执行，要看网络 谁先网络读取完成 回调函数的异步代码就先加入队列 等待同步代码执行后从队列里按序执行异步代码
        this.chart3.chartdata = res
        console.log(res)
        this.chart3.listLoading = false
      })
    },
	  gettotalcontinueBydate(year) {
      this.chart1.xdata.splice(0, this.chart1.xdata.length) // 得清空之前数组才行
		  this.chart1.listLoading = true
		  this.chart1.chartdata = {}
      gettotalcontinueBydate(year).then(res => {
      	for (let i = 1; i < res.cheshendata.length + 1; i++) {
          this.chart1.xdata.push(i + '月') // 由res的第一个数组判断有几个月
        }

        this.chart1.chartdata = res // 这样写应该是引用复制 浅拷贝 等于地址 而不是直接拷贝值的等于
        this.chart1.listLoading = false
        console.log('总数据', res)
        const arr = [res.chongyadata[res.chongyadata.length - 1], res.cheshendata[res.cheshendata.length - 1], res.tuzhuangdata[res.tuzhuangdata.length - 1], res.zongzhuangdata[res.zongzhuangdata.length - 1], res.fadongjidata[res.fadongjidata.length - 1]]
        console.log('arr', arr)
        this.getIndexMAx(arr)
      })
    },
    getcontinuezhiliangshuipinBydate(year) { // 和上面几乎一模一样的代码 其实应该写成一个函数 传参数处理部分不同的
      this.chart2.xdata.splice(0, this.chart2.xdata.length) // 得清空之前数组才行
		  this.chart2.listLoading = true
		  this.chart2.chartdata = {}
      getcontinuezhiliangshuipinBydate(year).then(res => {
      	for (let i = 1; i < res.cheshendata.length + 1; i++) {
          this.chart2.xdata.push(i + '月') // 由res的第一个数组判断有几个月
        }

        this.chart2.chartdata = res // 这样写应该是引用复制 浅拷贝
        this.chart2.listLoading = false
        console.log(res)
      })
    },
    getIndexMAx(arr) { // 基于es6的解构  获取数组的最大最小值和键名 getMaxMin = (data, key) => {}的形式在vue的method方法里不可用
      const maxNum = Math.max(...arr)
      const minNum = Math.min(...arr)
      const [maxIndex, minIndex] = [arr.indexOf(maxNum), arr.indexOf(minNum)]
      console.log('maxmin', maxNum, minNum, maxIndex, minIndex)
      switch (minIndex) {
        case 0:
          this.lowest = '冲压车间'
          break
        case 1:
          this.lowest = '车身车间'
          break
        case 2:
          this.lowest = '涂装车间'
          break
        case 3:
          this.lowest = '总装车间'
          break
        case 4:
          this.lowest = '发动机工厂'
          break
        default:
          this.lowest = 'NAN'
          break
      }
      switch (maxIndex) {
        case 0:
          this.best = '冲压车间'
          break
        case 1:
          this.best = '车身车间'
          break
        case 2:
          this.best = '涂装车间'
          break
        case 3:
          this.best = '总装车间'
          break
        case 4:
          this.best = '发动机工厂'
          best
        default:
          this.best = 'NAN'
          break
      }
      console.log('lowets', this.lowest)
    },
    getContinuePiechartvalue(month) {
      this.chart4.listLoading = true
      this.chart4.chartdata.splice(0, this.chart4.chartdata)
      getContinuePiechartvalue(month).then(
        res => {
          this.chart4.chartdata = res
          this.chart4.listLoading = false
        }
      )
    }

	  /* gettotalcontinueBydateandzone(year){ //之前写的每个区域的数据分别取  报错的代码
		  let that=this
		  gettotalcontinueBydateandzone("冲压车间",year).then(res=>{
			  console.log(res)
			  this.chart1.xdata.splice(0, this.chart1.xdata.length)//根据数组字符个数得出几月的数据
				for (let i = 1; i < res.length + 1; i++) {
					this.chart1.xdata.push(i + '月')
				}
		  })
		  Promise.all([gettotalcontinueBydateandzone("冲压车间",year),gettotalcontinueBydateandzone("车身车间",year),gettotalcontinueBydateandzone("涂装车间",year),gettotalcontinueBydateandzone("总装车间",year),gettotalcontinueBydateandzone("发动机工厂",year)]).then(response=>{
			  console.log(response)
			  that.chart1.chongyadata.splice(0,that.chart1.chongyadata.length)
			  that.chart1.cheshendata.splice(0,that.chart1.cheshendata.length)
			  that.chart1.tuzhuangdata.splice(0,that.chart1.tuzhuangdata.length)
			  that.chart1.zongzhuangdata.splice(0,that.chart1.zongzhuangdata.length)
			  that.chart1.fadongjidata.splice(0,that.chart1.fadongjidata.length)
			  this.chart1.chongyadata=JSON.parse(JSON.stringify(response[0]));//深拷贝直接拷贝整个数组的值  而不只是复制一个引用
			  console.log(this.chart1.chongyadata)//此处的报错是传入子组件时的数据 从

		  })//promise.all() 返回值是几个promise返回值的和
	  }*/
  },
  watch: {
	  year(newval) {
      this.gettotalcontinueBydate(newval)
      this.getcontinuezhiliangshuipinBydate(newval)
    },
    month(newval) {
      this.getzhiliangtishen(newval)
      this.getContinuePiechartvalue(newval)
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
