<template>
  <div class="app-container">
    <div class="filter-container">
      <!--后端导入工位服务--><!--文件上传成功钩子 绑定属性仍然可以绑定方法 这里不能getList() 会直接调用的，毕竟不是v-on-->

      <el-button v-permission="['environmentstationimport']" size="large" type="nomal" @click="addfile">新增</el-button>
      <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
      <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
        <el-form ref="form" :inline="true" :model="form" size="small" label-width="60px">
          <el-form-item label="日期" required>
            <el-date-picker
              v-model="form.date"
              type="month"
              placeholder="Pick a date"
              style="width: 100%"
              value-format="yyyy-MM"
            />
          </el-form-item>
          <el-upload
            ref="upload"
            v-model:fileList="form.fileList"
            class="upload-demo"
            action="/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary" style="margin-left:20px">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">文件不超过5mb</div>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="dialogcancel">取消</el-button>
          <el-button :loading="crud1.status.cu === 2" type="primary" @click="upload()">确认</el-button>
        </div>

      </el-dialog>
    <!--表单渲染-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      size:mini
      :data="list"
      :header-cell-style="headerStyle"
      border
      fit
      max-height="400px"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    > <!--el-table的数据配置处是 :data-->
      <el-table-column fixed label="ID" prop="id" sortable="custom" align="center" width="60" :class-name="getSortClass('id')">
        <template slot-scope="{row}"> <!--slot-scope是作用域插槽 意味着父组件提供样式就好，不用提供内容，内容由子组件内绑定的数据来提供 默认插槽和具名插槽子组件都是父组件又提供数据，又提供内容-->
          <span>{{ row.id }}</span><!--row是在此处自命名的,row其实是:data＝“list” 绑定的list数据,list是个数组-->
        </template>
      </el-table-column>

      <el-table-column fixed label="工位" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.station }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed label="区域" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zone }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed label="时间" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="填写人" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.written_by }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_by }}</span>
        </template>
      </el-table-column>

      <el-table-column label="健康水平" align="center">
        <el-table-column label="人员能力符合要求(10)" width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.peopleiscapable }}</span>
          </template>
        </el-table-column>

        <el-table-column label="物料、作业文件、工具正确(30)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.matteriscorrect }}</span>
          </template>
        </el-table-column>

        <el-table-column label="员工标准化执行符合率100%(10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.wokerisstandard }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工位人员稳定性,在岗时间<1个月(-10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.wokerstability }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工位设备停线时间>3min,发生一次扣-5分(-10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.stationshutdown }}</span>
          </template>
        </el-table-column>

        <el-table-column label="物料停线时间>3min,发生一次扣-5分(-10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.mattershutdown }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工位健康水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x1 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="低碳精益" align="center">
        <el-table-column label="暂未有详细描述(20)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.low_carbon_1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工业电子化实现一致性(5)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.iso }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工位低碳精益小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x2 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了-->
          <el-button v-permission="['environmentstationdelete']" size="mini" type="nomal" @click="handleDelete(row,index,row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /><!--父组件data里面的 page size sort数据通过prop传入子组件-->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getAllStiation, getAllStiationByZone, deletestationByid, uploadstation } from '@/api/qe/environment'
import Pagination from '@/components/Pagination'// 分页组件
import { mapGetters } from 'vuex'

export default {
  components: { Pagination },

  data() {
    return {
      crud1: {
        status: {
          cu: 0,
          title: '新建'
        }
      },
      form: {
			  filetitle: '',
			  filetype: undefined, // 变量在内存里面未被销毁时  这个变量自然一直存在 全局上下文中的基本数据类型只有在window关闭时才销毁
			  date: undefined,
			  level: undefined,
			  fileList: undefined
      }, // 表单数据对象
      tableKey: 0,
      uploadLoading: false,
      listLoading: true,
      list: null, // 图表数据
      listQuery: { // 分页相关数据
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      total: undefined,
      headers: {
        'Authorization': getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    headerStyle() {
      return {
        'font-size': '10px',
        padding: '0'
      }
    },
    cellStyle() {
      return {
        'font-size': '14px',
        height: '40px',
        padding: '0'
      }
    },
    addfile() {
      this.crud1.status.cu = 1// dataproperty里面的数据是响应式的，所以数据改变，视图也会随之改变，弹框就会关闭
    },
    dialogcancel() {
      this.crud1.status.cu = 0
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    upload() {
      if (this.form.date == undefined) {
        this.$notify({ // 封装的通知功能
          title: '新增失败',
          message: '新增失败,日期选项必填',
          type: 'error',
          duration: 30000
        })
        return
      }
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles.pop().raw // 从html元素取到文件对象

      formData.append('file', file) // 第一个参数对应java程序里面的形参名
      formData.append('nickName', this.user.nickName)
      formData.append('date1', this.form.date)
      const that = this
      uploadstation(formData).then(res => { // upload1来自于import的方法
        this.crud1.status.cu = 0
        console.log(res)
        if (res == 0) {
          this.$notify({ // 封装的通知功能
            title: 'Error',
            message: '导入的excel没有sheet1',
            type: 'error',
            duration: 30000
          })
        } else if (res == 1) {
          this.$notify({ // 封装的通知功能
            title: 'Error',
            message: '第一行第三个单元格格式只能为 [时间:xx年xx月xx日] （年月日都是两位）',
            type: 'error',
            duration: 30000
          })
        } else if (res == 2) {
          this.$notify({ // 封装的通知功能
            title: 'Error',
            message: "第一行第六个单元格只能输入 '冲压车间' '车身车间' '涂装车间' '总装车间' '机加车间' '装配车间' 其中之一 ",
            type: 'error',
            duration: 30000
          })
        } else if (res == 3) {
          this.$notify({ // 封装的通知功能
            title: 'Error',
            message: '工位数据模版有且仅有12行，请检查模版',
            type: 'error',
            duration: 30000
          })
        } else if (res == 99) {
          this.$notify({ // 封装的通知功能
            title: 'Sucess',
            message: '导入成功',
            type: 'sucess',
            duration: 30000
          })
        } else if (res == 77) {
          this.$notify({ // 封装的通知功能
            title: '新增失败',
            message: '新增失败，不能导入空白数据',
            type: 'error',
            duration: 30000
          })
        }
        this.getList()
      })
    },
    getList() { // 获取数据 res是el-upload 封装的返回值  consle.log(打印失败，不报错)
      this.listLoading = true
      if (this.user.roles[0].level == 1) {
	 // 当用户的第一个角色等级为1时 正常获取所有工位数据 否则采用另一个api获取数据 不采用getAllStiation
        getAllStiation(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(response => {
        	console.log(response)
        	this.list = response.content // 获取真正的sql查询出来的数据
        	// Just to simulate the time of the request
        	this.total = response.totalElements
        	setTimeout(() => {
          		this.listLoading = false
        	}, 1.5 * 1000)
      		})
      } else {
        getAllStiationByZone(this.user.dept.name, this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(response => {
        	console.log(response)
        	this.list = response.content // 获取真正的sql查询出来的数据
        	// Just to simulate the time of the request
        	this.total = response.totalElements
        	setTimeout(() => {
          		this.listLoading = false
        	}, 1.5 * 1000)
      		})
      }
    },

    sortChange(data) { // 排序改变
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    sortByID(order) { // 按id排序
      if (order === 'ascending') {
        this.listQuery.sort = 'id'
      } else {
        this.listQuery.sort = 'id'
      }
      this.handleFilter()
    },

    handleFilter() { // 点击了页面控件
      this.listQuery.page = 1
      this.getList()
    },

    getSortClass: function(key) { // 排序相关
      			const sort = this.listQuery.sort
      			return sort === `+${key}` ? 'ascending' : 'descending'
		    },

    handleDelete(row, index, id) { // 点击删除按钮的操作
      this.$notify({ // 封装的通知功能
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      deletestationByid(id).then(() => { this.list.splice(index, 1) })
      // this.list.splice(index, 1) data property里面的数据更新，视图即更新 否则虽然视图刷新了
    }

  },
  computed: {
    ...mapGetters(['user']),
    mydata() { // 这个mydata的属性最好不要在data property里面，因为在dataproperty里面访问不到计算属性，它们是同级的
      return { nickName: this.user.nickName }
    }
  }
}
</script>
