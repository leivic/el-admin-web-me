<template>
  <div class="app-container">
    <div class="filter-container">
      <!--后端导入班组服务--><!--文件上传成功钩子 绑定属性仍然可以绑定方法 这里不能getList() 会直接调用的，毕竟不是v-on-->
      <el-button v-permission="['environmentworkshopimport']" size="large" type="nomal" @click="addfile">新增</el-button>
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
      :data="list"
      border
      fit
      :header-cell-style="headerStyle"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    > <!--el-table的数据配置处是 :data-->
      <el-table-column fixed label="ID" prop="id" sortable="custom" align="center" width="60" :class-name="getSortClass('id')">
        <template slot-scope="{row}"> <!--slot-scope是作用域插槽 意味着父组件提供样式就好，不用提供内容，内容由子组件内绑定的数据来提供 默认插槽和具名插槽子组件都是父组件又提供数据，又提供内容-->
          <span>{{ row.id }}</span><!--row是在此处自命名的,row其实是:data＝“list” 绑定的list数据,list是个数组-->
        </template>
      </el-table-column>

      <el-table-column fixed label="工段" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workshop }}</span>
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
        <el-table-column label="工段人员稳定性:工段成员人员流失率<=1人/月(10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.workshopstability }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组长顶岗时间<11h,工段长顶岗时间<1h(10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.substitute }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分层审计完成率100%(10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.externalaudit }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组物料/工具使用台账管理，执行一致性100%(10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.bookkeepingmanagement }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段按计划执行完成率100%，培训效果100%(10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studyplan }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组人员稳定性:班组成员人员流失率>3人/月(-10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.lossworkshopstability }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组业务未按要求执行发现1处－5分(-10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.workshopbusiness }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段健康水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x6 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="系统完整" align="center">
        <el-table-column label="工段适用过程识别完整，并有相应过程所有者负责推进(10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.workshopsection }}</span>
          </template>
        </el-table-column>

        <el-table-column label="程序文件、操作类文件识别、质量记录类表单完整，现场使用正确并能实现追溯(20)" width="140px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.programfiles }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段质量生态符合率>95%(20)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.ecologicalquality }}</span>
          </template>
        </el-table-column>

        <el-table-column label="过程识别、程序文件、操作类文件识别、质量记录类表单现场抽查发现一处错误－1分(-10)" width="140px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.lossprogramfiles }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段质量生态符合率<80%(-10)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.lossecologicalquality }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段质系统完整水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x7 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="低碳精益" align="center">
        <el-table-column label="班组及流程电子化实现项目数（质量类），1项10分(20)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.flowpath }}</span>
          </template>
        </el-table-column>

        <el-table-column label="电子化项目在现场执行的一致性(5)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.consistency }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段低碳精益水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x8 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="数智互联" align="center">
        <el-table-column label="工段开发的数字化应用项目数(质量类),1项10分(20)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dai }}</span>
          </template>
        </el-table-column>

        <el-table-column label="现场执行一致性，且能实现风险预警(5)" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.consistency2 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段数智互联水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x9 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="均衡发展" align="center">
        <el-table-column label="工段所有班组的健康水平差异化<1%(25)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.healthquthoritygroup }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段所有工位的健康水平差异化<1%(25)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.healthquthoritystation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段所有班组的健康水平差异化>10%(-10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.losshealthquthoritygroup }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组所有工位的健康水平差异化>10%(-10)" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.losshealthquthoritystation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工段均衡发展水平小计" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.x10 }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了-->
          <el-button v-permission="['environmentworkshopdelete']" size="mini" type="nomal" @click="handleDelete(row,index,row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getAllWorkshop, getAllWorkshopByZone, deleteworkshopByid, uploadworkshop } from '@/api/qe/environment'
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
      tableKey: 0,
      uploadLoading: false,
      listLoading: true,
      list: null, // 图表数据
      listQuery: { // 分页相关数据
        page: 1,
        limit: 7,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      total: undefined,
      headers: {
        'Authorization': getToken()
      },
      form: {
			  filetitle: '',
			  filetype: undefined, // 变量在内存里面未被销毁时  这个变量自然一直存在 全局上下文中的基本数据类型只有在window关闭时才销毁
			  date: undefined,
			  level: undefined,
			  fileList: undefined
      } // 表单数据对象

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
      uploadworkshop(formData).then(res => { // upload1来自于import的方法
        this.crud1.status.cu = 0
        console.log(res)
        if (res == 0) {
          this.$notify({ // 封装的通知功能
            title: 'Error',
            message: '导入的excel没有sheet1',
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
            message: '工段数据模版有且仅有27行，请检查模版',
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

    getList() { // 获取数据
      this.listLoading = true
      if (this.user.roles[0].level == 1) {
	 // 当用户的第一个角色等级为1时 正常获取所有工位数据 否则采用另一个api获取数据 不采用getAllStiation
        getAllWorkshop(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(response => {
        	console.log(response)
        	this.list = response.content // 获取真正的sql查询出来的数据
        	// Just to simulate the time of the request
        	this.total = response.totalElements
        	setTimeout(() => {
          		this.listLoading = false
        	}, 1.5 * 1000)
      		})
      } else {
        getAllWorkshopByZone(this.user.dept.name, this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(response => {
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
      deleteworkshopByid(id).then(() => { this.list.splice(index, 1) })
      // data property里面的数据更新，视图即更新
      //
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
