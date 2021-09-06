<template>
	<div>
		数据源

	

      <el-upload
        action="http://localhost:8000/qe/addEnvironmentBaseStation"
        multiple
        :limit="3"
        :headers="headers"
      >
        <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
          导入
        </el-button>
      </el-upload><!-- 涉及到跨域，上传文件要用headers携带token -->
	</div>
</template>
<script>

import { getToken } from '@/utils/auth'
export default {
	data() {
		return {
      uploadLoading:undefined,
      headers: {
        'Authorization': getToken()
      }	
		}
  },
  
  
}
</script>