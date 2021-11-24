<template>
  <div>
    <!--toolbox-->
    <crudleivic addisview="true" @enadd="addfile" /><!--enadd是监听子组件模板中的新增按钮，方法是本文件中定义的方法-->
    <!--工具栏-->

    <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">
        <el-form-item label="文件种类" prop="filetype" required>
          <el-select v-model="form.filetype" placeholder="文件种类">
            <el-option label="售后问题整改措施落实情况" value="售后问题整改措施落实情况" />
            <el-option label="区域发生问题汇总分析" value="区域发生问题汇总分析" />
            <el-option label="质量问题记录、跟踪和落实情况" value="质量问题记录、跟踪和落实情况" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="form.date"
            type="month"
            placeholder="Pick a date"
            style="width: 100%"
            value-format="yyyy-MM"
          />
        </el-form-item>
        <el-form-item label="级别" prop="level" required>
          <el-select v-model="form.level" placeholder="级别"><!--v-model 视图改变 存储在堆栈中的数据也会随之改变-->
            <el-option label="车间" value="车间" />
            <el-option label="工段" value="工段" />
            <el-option label="班组" value="班组" />
            <el-option label="工位" value="工位" />
          </el-select>
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
        prop="file_type"
        label="文件类型"
        width="250"
      />
      <el-table-column
        prop="date"
        label="日期"
        width="120"
      />
      <el-table-column
        prop="level"
        label="范围"
        width="120"
      />
      <el-table-column
        prop="zone"
        label="区域"
        width="120"
      />
      <el-table-column
        prop="zone2"
        label="工段/班组/工位"
        width="120"
      />

      <el-table-column
        fixed="right"
        prop="fenshu"
        label="分数"
        width="120"
      />

    </el-table>
    <!--表格渲染-->
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getfilelist" />
  </div>
</template>
<script>
import { upload2, findAlldatasource2 } from '@/api/qe/reponsibility'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'// 分页组件
import crudleivic from '../../components/Crud/CRUD.leivic.vue'
export default { // 其实也就是个对象罢了
  components: {
    crudleivic,
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
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      total: undefined
    }
  },
  created() {
    this.getfilelist()
  },
  methods: { // 一个拥有很多方法的对象
    getfilelist() {
      findAlldatasource2(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(res => {
        console.log(res)
        this.total = res.totalElements
        this.tableData = res.content
        this.listloading = false
      })
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
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles.pop().raw // 从html元素取到文件对象

      formData.append('file', file) // 第一个参数对应java程序里面的形参名
      formData.append('file_type', this.form.filetype)
      formData.append('file_date', this.form.date)
      formData.append('level', this.form.level)
      formData.append('create_by', this.user.nickName) //
      const that = this
      upload2(formData).then(res => { // upload1来自于import的方法
        this.crud1.status = 0
        console.log(res)
        if (res == 1) {
          that.$notify({ // 封装的通知功能
            title: 'Success',
            message: '新增成功',
            type: 'success',
            duration: 3000
          })
          this.getfilelist()
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
