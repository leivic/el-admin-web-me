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
    <div>
      <SelectYear />
    </div>
  </div>
</template>
<script>

import { getToken } from '@/utils/auth'
import { getAll } from '@/api/system/role'
import { getAllStiation, getthisYearEnvironmentSystem, findEnvironmentBaseStationHealthy, findEnvironmentBaseGroupHealthy, findEnvironmentBaseWorkshopHealthy,getStationByZoneAndDate,getGroupByZoneAndDate,getWorkShopByZoneAndDate } from '@/api/qe/environment'
import SelectYear from '@/components/SelectYear'
import { mapGetters } from 'vuex'// 使用vuex状态管理器
export default {
  components: {
    SelectYear
  },
  data() {
    return {
      uploadLoading: undefined,
      headers: {
        'Authorization': getToken()
      }
    }
  },
  mounted() {
    /* getAllStiation(1, 2, 'x1').then(res => console.log(res)) // 成功
    console.log(this.user) // user的信息已经被存在了vuex状态管理器里面
    console.log(this.user.dept.name)
    console.log(this.user.roles[0].level) */// 用户第一个角色的角色级别,角色级别是不影响权限的，但是我可以用它做操作
    /*findEnvironmentBaseStationHealthy('2021', '车身车间').then(res => console.log(res)) // 看来先返回哪个数据，要看网络请求的速度
    findEnvironmentBaseGroupHealthy('2021', '涂装车间').then(res => console.log(res))
    findEnvironmentBaseWorkshopHealthy('2021', '冲压车间').then(res => console.log(res))*/
    getStationByZoneAndDate('2021-07','冲压车间').then(res=>console.log(res))
    getGroupByZoneAndDate('2021-07','车身车间').then(res=>console.log(res))
    getWorkShopByZoneAndDate('2021-08','冲压车间').then(res=>console.log(res)) 
  },
  computed: {
    ...mapGetters(['user', 'year'])
  },
  watch: {
    year(newval) {
      console.log(newval)
    }
  }
}
</script>
