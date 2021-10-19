<template>
  <div class="app-container">
    <!--工具栏-->
    
    <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">
	<el-form-item  label="文件名称" prop="title">
          <el-input v-model="form.filetitle" style="width: 375px" placeholder="文件名称" />
        </el-form-item>
	 <el-form-item label="文件种类" prop="filetype" required>
		<el-select v-model="form.filetype" placeholder="文件种类">
			<el-option label="废品损失" value="x1"></el-option>
			<el-option label="物料损耗" value="x2"></el-option>
			<el-option label="质量停线" value="x3"></el-option>
			<el-option label="物料管理" value="x4"></el-option>
			<el-option label="问题拦截" value="x5"></el-option>
			<el-option label="质量资源损失(结果导向，指标完成)" value="x6"></el-option>
			<el-option label="质量资源损失(过程一致性)" value="x7"></el-option>
			<el-option label="体验质量" value="x8"></el-option>
			<el-option label="实物质量" value="x9"></el-option>
			<el-option label="质量策划" value="x10"></el-option>
			<el-option label="方案执行" value="x11"></el-option>	
		</el-select>
    	</el-form-item>
	<el-form-item label="日期" required>
          <el-date-picker
            v-model="form.date"
            type="month"
            placeholder="Pick a date"
            style="width: 100%"
          ></el-date-picker>
	</el-form-item>
	 <el-form-item label="区域" prop="zone" required>
		<el-select v-model="form.zone" placeholder="区域">
			<el-option label="冲压车间" value="冲压车间"></el-option>
			<el-option label="车身车间" value="车身车间"></el-option>
			<el-option label="涂装车间" value="涂装车间"></el-option>
			<el-option label="总装车间" value="总装车间"></el-option>
			<el-option label="发动机工厂" value="发动机工厂"></el-option>
			
		</el-select>
    	</el-form-item>
	    <el-upload
		class="upload-demo"
		ref="upload"
		action="https://jsonplaceholder.typicode.com/posts/"
		:on-preview="handlePreview"
		:on-remove="handleRemove"
		v-model:fileList="form.fileList"
		:auto-upload="false">
		<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		<el-button style="margin-left: 10px;" size="small" type="success" @click="">上传到服务器</el-button>
		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
	</el-upload>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogcancel">取消</el-button>
        <el-button :loading="crud1.status.cu === 2" type="primary" @click="upload()">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
   
  </div>
</template>

<script>
import { upload } from '@/api/qe/continue'
export default {
	data(){
		return{
			form:{
			  filetitle:"",
			  filetype:undefined,
			  date:undefined,
			  zone:undefined,
			  fileList:undefined
			},//表单数据对象
			crud1:{
				status:{
					cu:1,
					title:"新建"
				}
			}
		}
	},
	methods:{
		dialogcancel(){
			this.crud1.status.cu=0 //变量改变后保存在内存里，只要没有销毁
		},
		handleRemove(file, fileList) {
		console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		upload(filetitle,filetype,date,zone,fileList,create_by){
			filetitle=this.form.filetitle
			filetype=this.form.filetype
			date=this.form.date
			zone=this.form.zone
			fileList=this.$refs.upload.uploadFiles.pop().raw;
			create_by="罗一卜"
			console.log(filetitle,filetype,date,zone,fileList)
			let formData = new FormData();
			formData.append("aaa",fileList);
			formData.append("file_type",filetype)
			formData.append("file_date",date)
			formData.append("zone",zone)
			formData.append("create_by",create_by)
			upload(formData)  //上传文件成功 采用formData的形式 这几个参数
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 
</style>
