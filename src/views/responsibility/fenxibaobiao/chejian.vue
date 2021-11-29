<template>
	<div class="continue-chart-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectYear />
        </div>
      </el-col>
	 <el-col :xs="12" :sm="12" :lg="6">
        <div class="tool">
          <SelectDomain />
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="listloading1" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	 <lineChart :chartdata="zongji.zongji" :xdata="zongji.xdata" />
      
    </el-row>
     <el-row v-loading="listloading2" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<Barchart1 :xdata="zongji.xdata" :ydata1="quexian" :title="title1"></Barchart1>
    </el-row>
     <el-row v-loading="listloading3" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	<Barchart2 :xdata="zongji.xdata" :ydata1="anquanbaozhang" :title="title2"></Barchart2>	
    </el-row>
     <el-row v-loading="listloading4" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
	 
      
    </el-row>
  </div>
</template>
<script>
import { getzonglanzongjichartdata,getfenxippsrchartdata, getfenxippsrchongfuchartdata, getfenxishenchanyizhichartdata, getfenxifaguixiangchartdata,getfenxishexiancheliangweiguichartdata,getfenxishouhoufankuichartdata,getfenxiwaibuchouchachartdata,getfenxigongweihujianchartdata,getfenxigechejianshanggongxuchartdata,getfenxishouhouwentichartdata,getfenxiquyufashengchartdata,getfenxizhiliangwentijiluchartdata } from '@/api/qe/reponsibility'
import SelectYear from '@/components/SelectYear'
import SelectDomain from '@/components/SelectDomain'
import { mapGetters } from 'vuex'
import lineChart from './components/lineChart'
import Barchart1 from './components/Barchart1'
import Barchart2 from './components/Barchart2'
export default {
	components:{
		SelectYear,
		SelectDomain,
		lineChart,
		Barchart1,
		Barchart2	
	},
	data(){
		return{
			listloading1:true,
			listloading2:true,
			listloading3:true,
			listloading4:true,
			title1:'',
			title2:'',	
			zongji:{
				xdata:[],
				zongji:[]
			},
			quexian:{
				ppsr:[],
				ppsrchongfu:[],
				shenchanyizhi:[],
				faguixiang:[]
			},
			anquanbaozhang:{
				shouhoufankui:[],
				shexianweigui:[],
				waibuchoucha:[]
			},
			zhiliangfangyu:{
				gongweihujian:[],
				gechejianshanggongxu:[],
				shouhouwenti:[],
				quyufasheng:[],
				zhiliangwentijilu:[]
			}
		}
	},
	computed: {
    	...mapGetters(['year','zone'])
	  },
	created(){
		this.getzongjichartdata().then(res=>{
			this.listloading1=false
			console.log('总计对象为',this.zongji)})
		this.getquexiandata().then(res=>
		{	this.listloading2=false
			console.log('缺陷对象为',this.quexian)})
		this.getanquanchartdata().then(res=>{
			this.listloading3=false
			console.log('安全对象为',this.anquanbaozhang)
		})
		this.getzhiliangchartdata().then(res=>{
			this.listloading4=false
			console.log('质量对象为',this.zhiliangfangyu)
		})
	},
	watch:{
		year(newval){

			this.getzongjichartdata().then(res=>{
			this.listloading1=false
			})
		this.getquexiandata().then(res=>
		{	this.listloading2=false
			})
		this.getanquanchartdata().then(res=>{
			this.listloading3=false
			
		})
		this.getzhiliangchartdata().then(res=>{
			this.listloading4=false
			
		})	
		},
		zone(newval){
			this.getzongjichartdata().then(res=>{
			this.listloading1=false
			console.log('总计对象为',this.zongji)
			})
		this.getquexiandata().then(res=>
		{	this.listloading2=false
			console.log('缺陷对象为',this.quexian)
			})
		this.getanquanchartdata().then(res=>{
			this.listloading3=false
			console.log('安全对象为',this.anquanbaozhang)
		})
		this.getzhiliangchartdata().then(res=>{
			this.listloading4=false
			console.log('质量对象为',this.zhiliangfangyu)
		})		
		}
	},
	methods:{
		getzongjichartdata(){
			 //要return 才是将里面这个promise作为这个函数的返回值 然而函数里面的代码也执行了的
			this.listloading1=true
			return getzonglanzongjichartdata(this.year).then(
				res=>{
					console.log(res)
					this.zongji.xdata=res.xdata
					switch(this.zone){
						case "冲压车间":
							this.zongji.zongji=res.chongyachejiandata
							break;
						case "车身车间":
							this.zongji.zongji=res.cheshenchejiandata
							break;
						case "涂装车间":
							this.zongji.zongji=res.tuzhuangchejiandata
							break;
						case "总装车间":
							this.zongji.zongji=res.zongzhuangchejiandata
							break;
						case "机加车间":
							this.zongji.zongji=res.jijiachejiandata
							break;
						case "装配车间":
							this.zongji.zongji=res.zhuangpeichejiandata
							break;

					}
				}
			)
		},
		getquexiandata(){
			this.listloading2=true
			return Promise.all([getfenxippsrchartdata(this.year),getfenxippsrchongfuchartdata(this.year),getfenxishenchanyizhichartdata(this.year),getfenxifaguixiangchartdata(this.year)]).then(
			res=>{
			console.log(res)
			switch(this.zone){
				case "冲压车间":
					this.quexian.ppsr=res[0].chongyachejiandata
					this.quexian.ppsrchongfu=res[1].chongyachejiandata
					this.quexian.shenchanyizhi=res[2].chongyachejiandata
					this.quexian.faguixiang=res[3].chongyachejiandata
					break;
				case "车身车间":
					this.quexian.ppsr=res[0].cheshenchejiandata
					this.quexian.ppsrchongfu=res[1].cheshenchejiandata
					this.quexian.shenchanyizhi=res[2].cheshenchejiandata
					this.quexian.faguixiang=res[3].cheshenchejiandata
					break;
				case "涂装车间":
					this.quexian.ppsr=res[0].tuzhuangchejiandata
					this.quexian.ppsrchongfu=res[1].tuzhuangchejiandata
					this.quexian.shenchanyizhi=res[2].tuzhuangchejiandata
					this.quexian.faguixiang=res[3].tuzhuangchejiandata
					break;
				case "总装车间":
					this.quexian.ppsr=res[0].zongzhuangchejiandata
					this.quexian.ppsrchongfu=res[1].zongzhuangchejiandata
					this.quexian.shenchanyizhi=res[2].zongzhuangchejiandata
					this.quexian.faguixiang=res[3].zongzhuangchejiandata
					break;	
				case "机加车间":
					this.quexian.ppsr=res[0].jijiachejiandata
					this.quexian.ppsrchongfu=res[1].jijiachejiandata
					this.quexian.shenchanyizhi=res[2].jijiachejiandata
					this.quexian.faguixiang=res[3].jijiachejiandata
				case "装配车间":
					this.quexian.ppsr=res[0].zhuangpeichejiandata
					this.quexian.ppsrchongfu=res[1].zhuangpeichejiandata
					this.quexian.shenchanyizhi=res[2].zhuangpeichejiandata
					this.quexian.faguixiang=res[3].zhuangpeichejiandata	
			}
			})	
		},
		getanquanchartdata(){
		
			return Promise.all([getfenxishouhoufankuichartdata(this.year),getfenxishexiancheliangweiguichartdata(this.year),getfenxiwaibuchouchachartdata(this.year)]).then(
				res=>{
					switch(this.zone){
						case "冲压车间":
							this.anquanbaozhang.shouhoufankui=res[0].chongyachejiandata
							this.anquanbaozhang.shexianweigui=res[1].chongyachejiandata
							this.anquanbaozhang.waibuchoucha=res[2].chongyachejiandata
							break;
						case "车身车间":
							this.anquanbaozhang.shouhoufankui=res[0].cheshenchejiandata
							this.anquanbaozhang.shexianweigui=res[1].cheshenchejiandata
							this.anquanbaozhang.waibuchoucha=res[2].cheshenchejiandata
							break;
						case "涂装车间":
							this.anquanbaozhang.shouhoufankui=res[0].tuzhuangchejiandata
							this.anquanbaozhang.shexianweigui=res[1].tuzhuangchejiandata
							this.anquanbaozhang.waibuchoucha=res[2].tuzhuangchejiandata
							break;
						case "总装车间":
							this.anquanbaozhang.shouhoufankui=res[0].zongzhuangchejiandata
							this.anquanbaozhang.shexianweigui=res[1].zongzhuangchejiandata
							this.anquanbaozhang.waibuchoucha=res[2].zongzhuangchejiandata
							break;
						case "机加车间":
							this.anquanbaozhang.shouhoufankui=res[0].jijiachejiandata
							this.anquanbaozhang.shexianweigui=res[1].jijiachejiandata
							this.anquanbaozhang.waibuchoucha=res[2].jijiachejiandata
							break;	
						case "装配车间":
							this.anquanbaozhang.shouhoufankui=res[0].zhuangpeichejiandata
							this.anquanbaozhang.shexianweigui=res[1].zhuangpeichejiandata
							this.anquanbaozhang.waibuchoucha=res[2].zhuangpeichejiandata
							break;	
							
					}
				}
			)
		},
		getzhiliangchartdata(){
			this.listloading4=true
			return Promise.all([getfenxigongweihujianchartdata(this.year),getfenxigechejianshanggongxuchartdata(this.year),getfenxishouhouwentichartdata(this.year),getfenxiquyufashengchartdata(this.year),getfenxizhiliangwentijiluchartdata(this.year)]).then(
				res=>{
					switch(this.zone){
						case "冲压车间":
							this.zhiliangfangyu.gongweihujian=res[0].chongyachejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].chongyachejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].chongyachejiandata
							this.zhiliangfangyu.quyufasheng=res[3].chongyachejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].chongyachejiandata
							break;
						case "车身车间":
							this.zhiliangfangyu.gongweihujian=res[0].cheshenchejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].cheshenchejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].cheshenchejiandata
							this.zhiliangfangyu.quyufasheng=res[3].cheshenchejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].cheshenchejiandata
							break;
						case "涂装车间":
							this.zhiliangfangyu.gongweihujian=res[0].tuzhuangchejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].tuzhuangchejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].tuzhuangchejiandata
							this.zhiliangfangyu.quyufasheng=res[3].tuzhuangchejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].tuzhuangchejiandata
							break;
						case "总装车间":
							this.zhiliangfangyu.gongweihujian=res[0].zongzhuangchejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].zongzhuangchejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].zongzhuangchejiandata
							this.zhiliangfangyu.quyufasheng=res[3].zongzhuangchejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].zongzhuangchejiandata
							break;
						case "机加车间":
							this.zhiliangfangyu.gongweihujian=res[0].jijiachejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].jijiachejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].jijiachejiandata
							this.zhiliangfangyu.quyufasheng=res[3].jijiachejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].jijiachejiandata
							break;
						case "装配车间":
							this.zhiliangfangyu.gongweihujian=res[0].zhuangpeichejiandata
							this.zhiliangfangyu.gechejianshanggongxu=res[1].zhuangpeichejiandata
							this.zhiliangfangyu.shouhouwenti=res[2].zhuangpeichejiandata
							this.zhiliangfangyu.quyufasheng=res[3].zhuangpeichejiandata
							this.zhiliangfangyu.zhiliangwentijilu=res[4].zhuangpeichejiandata
							break;	

						
					}
				}
			)
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