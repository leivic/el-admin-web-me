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
import { mapGetters } from 'vuex'// 使用vuex状态管理器
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
    getAllStiation(1, 2, 'x1').then(res => console.log(res)) // 成功
    console.log(this.user)  //user的信息已经被存在了vuex状态管理器里面
    console.log(this.user.dept.name)
    console.log(this.user.roles[0].level) //用户第一个角色的角色级别,角色级别是不影响权限的，但是我可以用它做操作 
  },
  computed: {
    ...mapGetters(['user'])
  },

}
</script>
