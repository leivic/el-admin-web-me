<template>
	<div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelecMonth />
        </div>
      </el-col>
    </el-row>

    <el-row v-loading="chart1.listLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<FenjieMonthchart :title="chart1.title" :xdata="chart1.xdata" :zhibiaoshu="chart1.zhibiaoshu" :lvsedata="chart1.lvsedata" :hongsedata="chart1.hongsedata" :dabiaolv="chart1.dabiaolv"  />
    </el-row>

    <el-row v-loading="" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件--> <!--v-loadning是vue封装的加载样式-->
      
    </el-row>

  </div>
</template>
<script>
import { finddepartmentbyyear,findtargetnumberbyyear,finddepartmenthegezhiliang } from '@/api/qe/continue'
import { mapGetters } from 'vuex'
import SelecMonth from '@/components/SelectMonth'
import FenjieMonthchart from './components/FenjieMonthchart'
export default {
	components: {
		SelecMonth,
		FenjieMonthchart
	  },
	data(){
		return{
			chart1: {
				listLoading: false,
				title: '各区域指标运行状态',
				xdata:[],
				zhibiaoshu:[],
				lvsedata:[],
				hongsedata:[],
				dabiaolv:[] 
      			},
		}
	},
	created(){
		this.getchart1xdata(this.chart1.xdata).then(
			console.log(this.chart1.xdata)
		)
		
		this.getchart1dabiaolv(this.chart1.lvsedata,this.chart1.zhibiaoshu) //在本函数里执行了另外三个函数调用 取了另外三个需求的echarts数据	
	
	},
	computed: {
    	...mapGetters(['month'])
  	},
	methods:{
		getchart1xdata(xdata){
			xdata.splice(0, xdata.length) //第一次测试 提示splice undefined 报错 是因为函数调用时才执行（若没有调用 即便定义了 有时也不知道有没有写对） .splice是数组方法 传入的参数不是数组类型，那么就报错 找不到方法 
			return	finddepartmentbyyear(this.month.substring(0,4)).then(
				res=>{
					for(const a in res){
						xdata.push(res[a]) //因为值传递和饮用传递区别的缘故，直接xdata = res 传入的xdata是不会改变的
					}
				}
			)	
		},
		getchart1zhibiaoshu(zhibiaoshu){
			zhibiaoshu.splice(0,zhibiaoshu.length)
			return findtargetnumberbyyear(this.month.substring(0,4)).then(
				res=>{
					for(const a in res){
						zhibiaoshu.push(res[a][1])	
					}
				}
			)	
		},
		getchart1lvsedata(lvsedata){
			lvsedata.splice(0,lvsedata.length)
			return finddepartmenthegezhiliang(this.month.substring(0,4),1,this.month.substring(5,7)).then(    //第二个参数是查合格状态还是不合格状态 第三个状态是查几月份的数据
				res=>{
									 //res是个三维数组 不知道后端代码咋写的
					for(const a in res[0]){
						console.log('-----a',res[0][a])
						lvsedata.push(res[0][a][1])	
					}
					
				}
			) 	
		},
		getchart1hongsedata(hongsedata){
			hongsedata.splice(0,hongsedata.length)
			return finddepartmenthegezhiliang(this.month.substring(0,4),2,this.month.substring(5,7)).then(    //第二个参数是查合格状态还是不合格状态(1是合格 2是不合格) 第三个状态是查几月份的数据
				res=>{
					console.log('----res',res) //res是个三维数组 不知道后端代码咋写的
					for(const a in res[0]){
						console.log('-----a',res[0][a])
						hongsedata.push(res[0][a][1])	
					}
					
				}
			) 		
		},
		 async getchart1dabiaolv(lvsedata,zhibiaoshu){
			this.chart1.dabiaolv.splice(0,this.chart1.dabiaolv.length)
			await this.getchart1zhibiaoshu(this.chart1.zhibiaoshu) //await后面跟promise 
			await this.getchart1lvsedata(this.chart1.lvsedata)
			await this.getchart1hongsedata(this.chart1.hongsedata) 
			
			this.chart1.dabiaolv=zhibiaoshu.map((index,item)=>{  
				return lvsedata[item]*100/index
			} )
				
			console.log(this.chart1.dabiaolv)
		 
		}
	},
	watch:{
		month: {
		deep: true,
		handler(val) {
			this.getchart1xdata(this.chart1.xdata).then(
			console.log(this.chart1.xdata)
			)
		
			this.getchart1dabiaolv(this.chart1.lvsedata,this.chart1.zhibiaoshu)	
		}
		},
	}
}
</script>