<template>
  <div>
    <!--toolbox-->
    <crudleivic v-permission="['responsaddbasedata1']" addisview="true" style="float:left" @enadd="addfile" /><!--enadd是监听子组件模板中的新增按钮，方法是本文件中定义的方法-->
    <!--工具栏-->
    <!--配置基础分的按钮和抽屉-->
    <el-button v-permission="['responsibilityjichufen']" size="mini" type="primary" style="margin-top:5px ;margin-left: 16px;float:left" @click="drawer = true">
      配置基础分
    </el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <span>
        <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">

          <el-form-item label="冲压车间" prop="title" style="margin-top:200px">
            <el-input v-model="form.x1" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="冲压" style="width: 80px" /><!-- oninput ="value=value.replace(/[^0-9.]/g,'')" 限制el-input只能输入数字-->
          </el-form-item>
          <el-form-item label="车身车间" prop="title" style="margin-top:200px">
            <el-input v-model="form.x2" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="车身" style="width: 80px" />
          </el-form-item>
          <el-form-item label="涂装车间" prop="title">
            <el-input v-model="form.x3" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="涂装" style="width: 80px" />
          </el-form-item>
          <el-form-item label="总装车间" prop="title">
            <el-input v-model="form.x4" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="总装" style="width: 80px" />
          </el-form-item>
          <el-form-item label="机加车间" prop="title">
            <el-input v-model="form.x5" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="机加" style="width: 80px" />
          </el-form-item>
          <el-form-item label="装配车间" prop="title">
            <el-input v-model="form.x6" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="装配" style="width: 80px" />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button style="float:right" type="primary" @click="updatejichufen">确认</el-button>
        </div>
      </span>
    </el-drawer>
    <!---->
    <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">
        <el-form-item label="文件种类" prop="filetype" required>
          <el-select v-model="form.filetype" placeholder="文件种类">
            <el-option label="PPSR系统管理问题" value="PPSR系统管理问题" />
            <el-option label="生产一致性问题" value="生产一致性问题" />
            <el-option label="法规项问题管理" value="法规项问题管理" />
            <el-option label="售后反馈质量问题" value="售后反馈质量问题" />
            <el-option label="涉嫌违规车辆问题管理" value="涉嫌违规车辆问题管理" />
            <el-option label="外部抽查问题管理" value="外部抽查问题管理" />
            <el-option label="工位互检发生问题" value="工位互检发生问题" />
            <el-option label="各车间发现的上工序问题" value="各车间工序" />
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
        width="150"
      />
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="120"
      />
      <el-table-column
        prop="level"
        label="级别"
        width="120"
      />
      <el-table-column
        prop="zone"
        label="车间"
        width="120"
      />
      <el-table-column
        prop="zone2"
        label="工段/班组/工位"
        width="120"
      />
      <el-table-column
        prop="wentimiaoshu"
        label="问题描述"
        width="600"
      />
      <el-table-column
        prop="dengji"
        label="等级"
        width="100"
      />
      <el-table-column
        prop="shifouchongfu"
        label="是否重复发生"
        width="100"
      />

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了-->
          <el-button v-permission="['respondeletebasedata1']" size="mini" type="" @click="handleDelete(row,index,row.id)">
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
import { upload1, findAlldatasource1, findAllchejianlistBydate, findAllgongduanlistBydate, deletedatasource1byid, updatejichufen, findalljichufen } from '@/api/qe/reponsibility'
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
        limit: 7,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      total: undefined,
      drawer: false,
      form: {
        x1: undefined,
        x2: undefined,
        x3: undefined,
        x4: undefined,
        x5: undefined,
        x6: undefined
      }
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
    this.getjichufen()
    this.getfilelist()
    findAllchejianlistBydate('2021-01').then(res => console.log(res))
    findAllgongduanlistBydate('2021-02').then(res => console.log(res))
  },
  methods: { // 一个拥有很多方法的对象
    updatejichufen() {
      Promise.all([updatejichufen(1, this.form.x1), updatejichufen(2, this.form.x2), updatejichufen(3, this.form.x3), updatejichufen(4, this.form.x4), updatejichufen(5, this.form.x5), updatejichufen(6, this.form.x6)]).then(
        res => {
          this.drawer = false
          this.$notify({
            title: 'success',
            message: '基础分修改成功',
            type: 'success',
            duration: 3000
          })
        }
      )
    },
    getjichufen() {
      findalljichufen().then(res => {
        console.log('基础分', res)
        this.form.x1 = res[0].fenshu
        this.form.x2 = res[1].fenshu
        this.form.x3 = res[2].fenshu
        this.form.x4 = res[3].fenshu
        this.form.x5 = res[4].fenshu
        this.form.x6 = res[5].fenshu
      })
    },
    getfilelist() {
      findAlldatasource1(this.listQuery.page, this.listQuery.limit, this.listQuery.sort).then(res => {
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
      deletedatasource1byid(id).then(this.tableData.splice(index, 1))
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
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles.pop().raw // 从html元素取到文件对象

      formData.append('file', file) // 第一个参数对应java程序里面的形参名
      formData.append('file_type', this.form.filetype)
      formData.append('file_date', this.form.date)
      formData.append('level', this.form.level)
      formData.append('create_by', this.user.nickName) //
      const that = this
      upload1(formData).then(res => { // upload1来自于import的方法
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
        } else if (res == 0) {
          that.$notify({
            title: 'error',
            message: '新增失败,第二列必须填入[车身车间，冲压车间，涂装车间，总装车间，机加车间，装配车间]之一',
            type: 'error',
            duration: 3000
          })
        } else if (res == 2) {
          that.$notify({ // 封装的通知功能
            title: 'error',
            message: '新增失败，当选择PPSR系统管理问题时，第6列只能填入 ‘是’ 或者 ‘否’',
            type: 'error',
            duration: 3000
          })
        } else if (res == 3) {
          that.$notify({
            title: 'error',
            message: '新增失败,当选择类型不是PPSR系统管理问题时，第6列只能为空',
            type: 'error',
            duration: 3000
          })
        } else if (res == 4) {
          that.$notify({
            title: 'error',
            message: '新增失败,当导入车间级别的数据时，模板第三列必须为空',
            type: 'error',
            duration: 3000
          })
        } else if (res == 5) {
          that.$notify({
            title: 'error',
            message: '新增失败,当导入工段｜班组｜工位级别数据时，模版第三列不能为空',
            type: 'error',
            duration: 3000
          })
        } else if (res == 6) {
          that.$notify({
            title: 'error',
            message: '新增失败,当导入班组|工位级别数据时,只能选择ppsr系统管理问题和工位发生互检问题两类数据',
            type: 'error',
            duration: 3000
          })
        } else if (res == 7) {
          that.$notify({
            title: 'error',
            message: '新增失败,导入模板的第五列不能为空',
            type: 'error',
            duration: 3000
          })
        } else if (res == 8) {
          that.$notify({
            title: 'error',
            message: '新增失败,当导入类别为外部抽查时，第五列只能填入［‘主要不符合’，‘次要不符合’，‘观察项’］',
            type: 'error',
            duration: 3000
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
