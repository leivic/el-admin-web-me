<template>
  <div class="continue-chart-container">
    <el-row>
      <SelectYear />
    </el-row>
    <el-row v-loading="listLoading1" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
      <lineChart :xdata="zhenchart_datasoure.xdata" :chartdata="zhenchart_datasoure" />
    </el-row>
  </div>
</template>
<script>
import { findAllchejianlistBydate } from '@/api/qe/reponsibility'
import { mapGetters } from 'vuex'
import SelectYear from '@/components/SelectYear'
import lineChart from './components/lineChart'

export default {
  components: {
    SelectYear,
    lineChart
  },
  data() {
    return {
      	listLoading1: true,
      chart_datasource: {
        chongyadata: [], // 冲压车间1到当前月每个月责任的分数总计
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: [],
        xdata: []
      },
      zhenchart_datasoure: {
        chongyadata: [],
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: [],
        xdata: []
      },
      chart_quexianlanjie: {
        chongyadata: [],
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: [],
        xdata: []
      }, chart_anquanbaozhang: {
        chongyadata: [],
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: []
      },
      chart_zhiliangfangyu: {
        chongyadata: [],
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: []
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
    this.getfirstchartdata(1, this.getdatecount() + 1) /* 第二次执行时 第二个参数没有任何变化*/
  },
  methods: {
    getdatecount() { // 获得要取几个月的数据
      const theDate = new Date()
      const nowyear = theDate.getFullYear() + ''
      if (this.year !== nowyear) {
        return 12
      } else {
        return theDate.getMonth() + 1
      }
    },
    getdate(x) { // 获得2021-09 这样的一个字符串 for循环之后 就可以得到所有月份的字符串
      const theDate = new Date()
      if (x < 10) {
				  return this.year + '-' + '0' + x
        		} else {
        return this.year + '-' + x
      }
    },
    getchartdata(i, count) { // 由于异步同步代码执行顺序的区别 for循环里面的异步代码顺序会乱 想保持顺序的话就只能用函数的递归调用的方式
			     // for(let i=1;i<this.getdatecount()+1;i++){   这个i用不到then（）里面 里面是异步代码了 执行顺序是乱的 同步优先 异步靠边 所以异步貌似就不能用for循环  而是用递归函数？
      //
      return findAllchejianlistBydate(this.getdate(i)).then( // 此时i还是1 但是最后i＋＋了 可能这个回调函数里面的异步代码还没执行完（i＋＋在这个函数的外面） i就往外面加了 并且开始了第二次回调
        res => {
          if (res.length == 0) {
            console.log('返回值是空' + i)
            this.chart_datasource.chongyadata.push(0)
            this.chart_datasource.cheshendata.push(0)
            this.chart_datasource.tuzhuangdata.push(0)
            this.chart_datasource.zongzhuangdata.push(0)
            this.chart_datasource.jijiadata.push(0)
            this.chart_datasource.zhuangpeidata.push(0)
          } else {
            console.log(i + '输出' + res[0].date, res)
            console.log(i + '返回值不是空')
            var chongyastatus = 0
            var cheshentatus = 0
            var tuzhuangstatus = 0
            var zongzhuangstatus = 0
            var jijiastatus = 0
            var zhaungpeistatus = 0

            for (const a of res) { // 内层循环循环查出来的每一条数据
              switch (a.chejian) {
                case '冲压车间':
                  this.chart_datasource.chongyadata.push(a.zongji)
                  chongyastatus = 1
                  break
                case '车身车间':
                  this.chart_datasource.cheshendata.push(a.zongji)
                  cheshentatus = 1
                  break
                case '涂装车间':
                  this.chart_datasource.tuzhuangdata.push(a.zongji)
                  tuzhuangstatus = 1
                  break
                case '总装车间':
                  this.chart_datasource.zongzhuangdata.push(a.zongji)
                  zongzhuangstatus = 1
                  break
                case '机加车间':
                  this.chart_datasource.jijiadata.push(a.zongji)
                  jijiastatus = 1
                  break
                case '装配车间':
                  this.chart_datasource.zhuangpeidata.push(a.zongji)
                  zhaungpeistatus = 1
                  break
              }
            }
            if (chongyastatus == 0) { this.chart_datasource.chongyadata.push(0) }
            if (cheshentatus == 0) { this.chart_datasource.cheshendata.push(0) }
            if (tuzhuangstatus == 0) { this.chart_datasource.tuzhuangdata.push(0) }
            if (zongzhuangstatus == 0) { this.chart_datasource.zongzhuangdata.push(0) }
            if (jijiastatus == 0) { this.chart_datasource.jijiadata.push(0) }
            if (zhaungpeistatus == 0) { this.chart_datasource.zhuangpeidata.push(0) }
            chongyastatus = 0
            cheshentatus = 0
            tuzhuangstatus = 0
            zongzhuangstatus = 0
            jijiastatus = 0
            zhaungpeistatus = 0
          }
          this.chart_datasource.xdata.push(i + '月') // 所有表的数据都用chart_datasource.xdata 这一个数组
					    if (++i < count) { // 这段代码判断递归结束的代码如果在回调函数之外 就会
            					this.getchartdata(i, count)
        					}
        }// '输出'+this.getdate(i),res 输出的全是 2012 因为这是异步代码 前面已经循环完毕后 i已经12了 才执行这一块代码

      )
      /*
					if(++i<count){
            					this.getchartdata(i,count)
        					}
			*/
    },
    getfirstchartdata(i, count) { // 加一个方法在每次获取之前的数据前更新数据
      this.listLoading1 = true
      this.chart_datasource = {
        chongyadata: [], // 冲压车间1到当前月每个月责任的分数总计
        cheshendata: [],
        tuzhuangdata: [],
        zongzhuangdata: [],
        jijiadata: [],
        zhuangpeidata: [],
        xdata: []
      },
      this.chart_datasource.chongyadata.splice(0, this.chart_datasource.chongyadata.length)
      this.chart_datasource.cheshendata.splice(0, this.chart_datasource.cheshendata.length)
      this.chart_datasource.tuzhuangdata.splice(0, this.chart_datasource.tuzhuangdata.length)
      this.chart_datasource.zongzhuangdata.splice(0, this.chart_datasource.zongzhuangdata.length)
      this.chart_datasource.jijiadata.splice(0, this.chart_datasource.jijiadata.length)
      this.chart_datasource.zhuangpeidata.splice(0, this.chart_datasource.zhuangpeidata.length)
      this.chart_datasource.xdata.splice(0, this.chart_datasource.xdata.length)
      console.log(this.chart_datasource)
      this.getchartdata(i, count).then(res => {
        this.zhenchart_datasoure = this.chart_datasource
        this.listLoading1 = false
      })
      console.log('车身数据', this.chart_datasource.cheshendata)
      console.log('冲压数据', this.chart_datasource.chongyadata)
      console.log('涂装数据', this.chart_datasource.tuzhuangdata)
      console.log('总装数据', this.chart_datasource.zongzhuangdata)
      console.log('机加数据', this.chart_datasource.jijiadata)
      console.log('装配数据', this.chart_datasource.zhuangpeidata)
      console.log('横轴数据', this.chart_datasource.xdata)
    }

  },
  computed: {
    ...mapGetters(['month', 'year'])
  },
  watch: {
    year() {
      this.getfirstchartdata(1, this.getdatecount() + 1)
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
