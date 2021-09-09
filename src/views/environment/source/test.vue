<template>
  <div>
    数据源
    <!--按钮权限先在菜单添加 在菜单添加god权限后 同样在角色处分配 -->
    <el-upload
      v-permission="['god']"
      action="http://localhost:8000/qe/addEnvironmentBaseStation"
      multiple
      :limit="3"
      :headers="headers"
    >
      <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
        导入
      </el-button>
    </el-upload><!-- 涉及到跨域，上传文件要用headers携带token -->

    <el-upload
      v-permission="['god']"
      action="http://localhost:8000/qe/addEnvironmentBaseGroup"
      multiple
      :limit="3"
      :headers="headers"
    >
      <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
        导入
      </el-button>
    </el-upload><!-- 涉及到跨域，上传文件要用headers携带token -->

    <el-upload
      v-permission="['god']"
      action="http://localhost:8000/qe/addEnvironmentBaseWorkShop"
      multiple
      :limit="3"
      :headers="headers"
    >
      <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
        导入
      </el-button>
    </el-upload><!-- 涉及到跨域，上传文件要用headers携带token -->

    <el-upload
      v-permission="['god']"
      action="http://localhost:8000/qe/addEnvironmentBaseZone"
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
import { getAll } from '@/api/system/role'
import { getAllStiation } from '@/api/qe/environment'
export default {
  data() {
    return {
      uploadLoading: undefined,
      headers: {
        'Authorization': getToken()
      }
    }
  },
  mounted() {
    getAllStiation(0, 2, 'x1').then(res => console.log(res)) // 成功
  }

}
</script>
