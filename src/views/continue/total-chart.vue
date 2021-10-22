<template>
  <div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
	 <SelectYear></SelectYear>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
        <el-select v-model="value" clearable placeholder="请选择" style="border:none;float: right; margin-right: 5px ;padding: 3px 0;"><!--v-model相当于一个属性绑定和一个事件-->
	<el-option
		v-for="item in options"
		:key="item.value"
		:label="item.label"
		:value="item.value"
	/>
    	</el-select>
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<lineChart :xdata="chart1.xdata" :chongyadata="chart1.chongyadata" :cheshendata="chart1.cheshendata" :tuzhuangdata="chart1.tuzhuangdata" :fadongjidata="chart1.fadongjidata" :zongzhuangdata="chart1.zongzhuangdata" />
    </el-row>
    <el-row :gutter="16"><!--两个个图表组件 布局是elment-ui栅栏布局-->
      <el-col v-loading="chart2.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
	
        </div>
      </el-col>
      <el-col v-loading="chart3.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
         
        </div>
      </el-col>
      <el-col v-loading="chart4.listLoading" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
         
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart from './components/lineChart'
import SelectMonth from '@/components/SelectMonth'
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'
import {gettotalcontinueBydateandzone} from '@/api/qe/continue'

export default {
  components: {
	  SelectMonth,
	  lineChart,
	  SelectYear 
  },
  data() {
    return {
      chart1: {
	      listLoading: false,
	      a:[],
	      xdata:[],
	      chongyadata:[],
	      cheshendata:[],
	      tuzhuangdata:[],
	      zongzhuangdata:[],
	      fadongjidata:[]
      },
      chart2: {
	      listLoading: false
      },
      chart3: {
	      listLoading: false
      },
      chart4: {
	      listLoading: false
      },
      options: [{ // 工具栏下拉框数据
        value: '冲压车间',
        label: '冲压车间'
      }, {
        value: '车身车间',
        label: '车身车间'

      }, {
        value: '涂装车间',
        label: '涂装车间'
      }, {
        value: '总装车间',
        label: '总装车间'
      }, {
        value: '发动机工厂',
        label: '发动机工厂'
      }
      ],
      value: '冲压车间', // 工具栏下拉框数据
    }
  },
  mounted() {
	 
  },
  computed: {
	  ...mapGetters(['month','year'])
  },
  methods: {
	  /*gettotalcontinueBydateandzone(year){ //之前写的每个区域的数据分别取  报错的代码
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
	  year(newval){
		  
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
</style>