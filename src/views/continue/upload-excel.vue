<template>
  <div class="app-container">

    <el-form :inline="true">
      <el-form-item label="文件种类" prop="filetype">
        <el-select v-model="querybox.type" placeholder="文件种类" style="float:left">
          <el-option label="返修问题统计表" value="返修问题统计表" />
          <el-option label="质量停线时间统计表" value="质量停线时间统计表" />
          <el-option label="过程问题统计表" value="过程问题统计表" />
          <el-option label="满意度得分统计表" value="满意度得分统计表" />
          <el-option label="实物质量得分统计表" value="实物质量得分统计表" />
          <el-option label="质量潜力提升跟踪表" value="质量潜力提升跟踪表" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" style="float:left">
        <el-date-picker
          v-model="querybox.date"
          type="month"
          placeholder="Pick a date"
          style="width: 200px;float: left"
          value-format="yyyy-MM"
        />
      </el-form-item>
      <el-form-item label="区域" prop="zone">
        <el-select v-model="querybox.zone" placeholder="区域" style="float: left">
          <el-option label="冲压车间" value="冲压车间" />
          <el-option label="车身车间" value="车身车间" />
          <el-option label="涂装车间" value="涂装车间" />
          <el-option label="总装车间" value="总装车间" />
          <el-option label="发动机工厂" value="发动机工厂" />

        </el-select>
      </el-form-item>
      <el-button :loading="crud1.status.cu === 2" type="primary" @click="queryfilebyparm">查询</el-button>
      <el-button :loading="crud1.status.cu === 2" type="primary" @click="resetquery">重置</el-button>
    </el-form>

    <!--toolbox-->
    <!-- <crudleivic addisview="true" @enadd="addfile" /> -->
    <el-button v-permission="['continuedataaddfile']" type="primary" @click="addfile">新增</el-button>
    <!--工具栏-->

    <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">
        <el-form-item label="文件种类" prop="filetype" required>
          <el-select v-model="form.filetype" placeholder="文件种类">
            <el-option label="返修问题统计表" value="返修问题统计表" />
            <el-option label="质量停线时间统计表" value="质量停线时间统计表" />
            <el-option label="过程问题统计表" value="过程问题统计表" />
            <el-option label="满意度得分统计表" value="满意度得分统计表" />
            <el-option label="实物质量得分统计表" value="实物质量得分统计表" />
            <el-option label="质量潜力提升跟踪表" value="质量潜力提升跟踪表" />
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
        <el-form-item label="区域" prop="zone" required>
          <el-select v-model="form.zone" placeholder="区域">
            <el-option label="冲压车间" value="冲压车间" />
            <el-option label="车身车间" value="车身车间" />
            <el-option label="涂装车间" value="涂装车间" />
            <el-option label="总装车间" value="总装车间" />
            <el-option label="发动机工厂" value="发动机工厂" />

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
        prop="file_name"
        label="文件名称"
        width="150"
      />
      <el-table-column
        prop="file_type"
        label="文件类型"
        width="120"
      />
      <el-table-column
        prop="zone"
        label="区域"
        width="120"
      />
      <el-table-column
        prop="file_date"
        label="文件日期"
        width="120"
      />
      <el-table-column
        prop="create_by"
        label="创建人"
        width="120"
      />
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="200"
      />
      <el-table-column
        prop="x"
        label="x数据"
        width="100"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="{row,$index}"> <!--插槽的使用-->
          <el-button
            v-permission="['continuedatadownload']"
            type="text"
            size="small"
            @click="download(row.id,'',row.file_name)"
          >
            下载
          </el-button>
          <el-button
            v-permission="['continuedatadelete']"
            type="text"
            size="small"
            @click="deletefile(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="totalgetlist" />
  </div>
</template>

<script>
import { upload, findAllContinue, download, findAllBydatetypeAndZone, deletefile } from '@/api/qe/continue'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'// 分页组件
import crudleivic from '../../components/Crud/CRUD.leivic.vue'
export default {
  components: {
    crudleivic,
    Pagination
  },
  data() {
    return {
      status: 0, // 0 1 状态来存储现在是用哪个方法查询数据 （带参的还是不带参的）
      querybox: {
        zone: '',
        type: '',
        date: ''
      },
      form: {
			  filetitle: '',
			  filetype: undefined, // 变量在内存里面未被销毁时  这个变量自然一直存在 全局上下文中的基本数据类型只有在window关闭时才销毁
			  date: undefined,
			  zone: undefined,
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
      total: undefined,
      selectstatus: 0 // 一个变量来判断当前查询的状态 为0是没有条件查询的全查 为1是有条件查询  加载这个组件时  会触发组件的生命周期 在某个生命周期中会加载dataproperty中的数据  所以你每次重新加载这个组件 会触发一次这个生命周期 然后数据就会重置
    }
  },
  created() {
    this.totalgetlist()
  },
  methods: {
    deletefile(id) {
      const that = this
      deletefile(id).then(
        res => {
          this.totalgetlist()
          if (res == '1') {
            that.$notify({ // 封装的通知功能
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 3000
            })
          } else if (res == '0') {
            that.$notify({ // 封装的通知功能
              title: 'error',
              message: '删除失败',
              type: 'error',
              duration: 3000
            })
          }
        }
      )
    },
    resetquery() {
      this.querybox.zone = ''
      this.querybox.date = ''
      this.querybox.type = ''
      this.totalgetlist()
    },
    queryfilebyparm() {
      this.status = 1
      this.totalgetlist()
    },
    totalgetlist() { // 这个方法来判断当前状态
      this.listloading = true
      if (this.status == 0) {
        this.getfilelist()
      } else {
        this.getfilelistbyparm()
      }
    },
    getfilelist() {
      findAllContinue(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(res => {
        console.log(res)
        this.total = res.totalElements
        this.tableData = res.content
        this.listloading = false
      })
    },
    getfilelistbyparm() {
      findAllBydatetypeAndZone(this.listQuery.page, this.listQuery.limit, this.listQuery.sort, this.querybox.date, this.querybox.type, this.querybox.zone).then(res => {
        this.total = res.totalElements
        this.tableData = res.content
        this.listloading = false
      }
      )
    },
    addfile() {
      this.crud1.status.cu = 1
    },
    dialogcancel() {
      this.crud1.status.cu = 0 // 变量改变后保存在内存里，只要没有销毁
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

      formData.append('aaa', file) // 第一个参数对应java程序里面的形参名
      formData.append('file_type', this.form.filetype)
      formData.append('file_date', this.form.date)
      formData.append('zone', this.form.zone)
      formData.append('create_by', this.user.nickName) //
      const that = this
      upload(formData).then(res => {
        this.crud1.status = 0
        console.log(res)
        if (res == '1') {
          that.$notify({ // 封装的通知功能
            title: 'Success',
            message: '新增成功',
            type: 'success',
            duration: 3000
          })
        }
        this.getfilelist()
      }) // 上传文件成功 采用formData的形式 这几个参数
    },
    download(id, openstyle, filetitle) {
      openstyle = 'inline'
      download(id, openstyle).then(
        res => { // 返回了一个blob类型的数据  前后端通过网络传输只是传输了一堆字节流罢了 前端获取字节流后然后要将字节流转化成excel
          const data = res
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filetitle + '.xlsx')
          document.body.appendChild(link)
          link.click()
        }
      )
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
