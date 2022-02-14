<template>
  <div>
    <!--toolbox-->
    <el-button v-permission="['consiciouszoneadd']" size="large" type="nomal" @click="addfile">新增</el-button><!--enadd是监听子组件模板中的新增按钮，方法是本文件中定义的方法-->
    <!--工具栏-->

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
    <!--表格渲染-->
    <el-table
      v-loading="listloading"
      :data="tableData"
      style="width: 100%"
      max-height="600"
    >
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="60"
      />
      <el-table-column
        fixed
        prop="zone"
        label="区域名"
        width="100"
      />
      <el-table-column
        prop="date"
        label="日期"
        width="80"
      />

      <el-table-column
        prop="zhiliangzhishi"
        label="质量知识"
        width="100"
      />
      <el-table-column
        prop="zhiliangrenzhi"
        label="质量认知"
        width="100"
      />
      <el-table-column
        prop="zhiliangxinnian"
        label="质量信念"
        width="100"
      />
      <el-table-column
        prop="zhiliangxingwei"
        label="质量行为"
        width="100"
      />

      <el-table-column label="操作" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了-->
          <el-button v-permission="['consiciouszonedelete']" size="mini" type="nolmal" @click="handleDelete(row,index,row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格渲染-->
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getfilelist" />
  </div>
</template>
<script>
import { upload1, findAlldatasource1, findAllchejianlistBydate, findAllgongduanlistBydate, deletedatasource1byid } from '@/api/qe/reponsibility'
import { uploadzone, findallzone, deletezonebyid } from '@/api/qe/consicious'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'// 分页组件
export default { // 其实也就是个对象罢了
  components: {
    Pagination
  },
  data() {
    return {
      form: {
			  filetitle: '',
			  filetype: undefined, // 变量在内存里面未被销毁时  这个变量自然一直存在 全局上下文中的基本数据类型只有在window关闭时才销毁
			  date: undefined,
			  level: undefined,
			  fileList: undefined
      }, // 表单数据对象
      crud1: {
        status: {
          cu: 0,
          title: '新建'
        }
      },
      tableData: [],
      listloading: true,
      listQuery: { // 分页相关数据
        page: 1,
        limit: 7,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      total: undefined
    }
  },
  created() {
    const theDate = new Date()
    let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1) // r如果这个month1是函数里的 修改就不起作用 因为函数里面的是拷贝
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
    }
    this.$store.commit('CHANGE_YEAR', theDate.getFullYear() + '') // 每次加载组件 更新store里面的数据
    this.$store.commit('CHANGE_MONTH', month1)
    this.$store.commit('CHANGE_ZONE', '冲压车间')
    this.getfilelist()
  },
  methods: { // 一个拥有很多方法的对象
    getfilelist() {
      findallzone(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(res => {
        console.log(res)
        this.total = res.totalElements
        this.tableData = res.content
        this.listloading = false
      })
    },
    handleDelete(row, index, id) { // 点击删除按钮的操作
      this.$notify({ // 封装的通知功能
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      deletezonebyid(id).then(this.tableData.splice(index, 1))
      // data property里面的数据更新，视图即更新
    },
    addfile() {
      this.crud1.status.cu = 1 // dataproperty里面的数据是响应式的，所以数据改变，视图也会随之改变，弹框就会关闭
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
      formData.append('date', this.form.date)
      const that = this
      uploadzone(formData).then(res => { // upload1来自于import的方法
        this.crud1.status = 0
        console.log(res)
        if (res == 1) {
          that.$notify({ // 封装的通知功能
            title: 'Success',
            message: '新增成功',
            type: 'success',
            duration: 30000
          })
          this.getfilelist()
        } else if (res == 9) {
          that.$notify({ // 封装的通知功能
            title: '新增失败',
            message: '新增失败,模版第一列数据只能填入[冲压车间，车身车间，涂装车间，总装车间，机加车间，装配车间]其中之一',
            type: 'error',
            duration: 30000
          })
        } else if (res == 2) {
          that.$notify({ // 封装的通知功能
            title: '新增失败',
            message: '新增失败,不能导入空白数据',
            type: 'error',
            duration: 30000
          })
        } else if (res == 11) {
          that.$notify({ // 封装的通知功能
            title: '新增失败',
            message: '新增失败,模板第二行应当只有5列，请检查模板',
            type: 'error',
            duration: 30000
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
<style scoped>

</style>
