<template>
  <div><!--template 只能有一个根节点-->
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="dialogvisable" :title="dialogtitle" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="170px">
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="form.month"
            type="month"
            placeholder="Pick a date"
            style="width: 100%"
            value-format="yyyy-MM"
            disabled
          />
        </el-form-item>
        <el-form-item label="区域" prop="zone" required>
          <el-select v-model="form.zone" placeholder="区域" style="width: 100%" disabled>
            <el-option label="冲压车间" value="冲压车间" />
            <el-option label="车身车间" value="车身车间" />
            <el-option label="涂装车间" value="涂装车间" />
            <el-option label="总装车间" value="总装车间" />
            <el-option label="发动机工厂" value="发动机工厂" />

          </el-select>
        </el-form-item>
        <el-form-item label="x1:废品损失" prop="title">
          <el-input v-model="form.x1" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x1" style="width: 80px" /><!-- oninput ="value=value.replace(/[^0-9.]/g,'')" 限制el-input只能输入数字-->
        </el-form-item>
        <el-form-item label="x2:物料损耗" prop="title">
          <el-input v-model="form.x2" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x2" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x3:质量停线" prop="title">
          <el-input v-model="form.x3" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x3" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x4:物料管理" prop="title">
          <el-input v-model="form.x4" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x4" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x5:问题拦截" prop="title">
          <el-input v-model="form.x5" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x5" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x6:质量资源损失(结果)" prop="title">
          <el-input v-model="form.x6" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x6" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x7:质量资源损失(过程)" prop="title">
          <el-input v-model="form.x7" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x7" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x8:体验质量" prop="title">
          <el-input v-model="form.x8" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x8" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x9:实物质量" prop="title">
          <el-input v-model="form.x9" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x9" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x10:质量策划" prop="title">
          <el-input v-model="form.x10" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x10" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x11:方案执行" prop="title">
          <el-input v-model="form.x11" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x11" style="width: 80px" />
        </el-form-item>
        <el-form-item label="x12:现状" prop="title">
          <el-input v-model="form.x12" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="x12" style="width: 80px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="canceladdorupdate">取消</el-button>
        <el-button type="primary" @click="updateorsave">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      v-loading="listloading"
      :data="tableData"
      border
      align="center"
      style="width: 100%"
      :row-style="{height: '80px'}"
    ><!--注意行高的写法 vue里对style的绑定有过专门描述 这是特殊写法-->
      <el-table-column
        align="center"
        prop="x1"
        min-width="33%"
      ><!--奇了怪了 只有min-width可以设置百分比 width不能设置 elmentui封装惹出来的-->
      </el-table-column>
      <el-table-column
        align="center"
        prop="x2"
        min-width="33%"
      />
      <el-table-column
        align="center"
        prop="x3"
        min-width="34%"
      />
    </el-table>

    <!--工具栏渲染-->
    <SelectMonth style="float: right; padding: 3px 0;" /><!--浮动常用于横排布局-->
    <el-select v-model="value" clearable placeholder="请选择" style="border:none;float: right; margin-right: 5px ;padding: 3px 0;"><!--v-model相当于一个属性绑定和一个事件-->
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button
      class="filter-item"
      size="large"
      type="primary"
      icon="el-icon-plus"
      style="float: right; padding: 3px 5px;margin: 6px 5px"
      @click="addorupdate"
    >
      新增/更改
    </el-button>
  </div>
</template>

<script>
import { findByzoneanddate, updateorsavecontinuedatasource, findCountcontinuedatasource, gettablelabel } from '@/api/qe/continue'
import { mapGetters } from 'vuex'
import SelectMonth from '@/components/SelectMonth'
export default {
  components: {
    SelectMonth
  },
  data() {
    return {
      tableData: [{ // 表格数据
        x1: 'x1',
        x2: 'x2',
        x3: 'x3'
      }, {
        x1: 'x4',
        x2: 'x5',
        x3: 'x6'
      }, {
        x1: 'x7',
        x2: 'x8',
        x3: 'x9'
      }, {
        x1: 'x10',
        x2: 'x11',
        x3: 'x12'
      }],
      options: [{ // 工具栏下拉框数据
        value: '冲压车间',
        label: '冲压车间'
      }, {
        value: '车身车间',
        label: '车身车间'

      }, {
        value: '涂装车间',
        label: '涂装车间'
      }, {
        value: '总装车间',
        label: '总装车间'
      }, {
        value: '发动机工厂',
        label: '发动机工厂'
      }
      ],
      value: '冲压车间', // 工具栏下拉框数据
      dialogvisable: false,
      dialogtitle: '标题', // 表单数据
      listloading: true, // 表格是否加载
      form: { // 表单数据  这里的数据会随选择改变
        zone: '',
        month: '',
        x1: 0,
        x2: 0,
        x3: 0,
        x4: 0,
        x5: 0,
        x6: 0, x7: 0, x8: 0, x9: 0, x10: 0, x11: 0, x12: 0
      },
      form1: { // 表单初始数据 不会随选择改变
        zone: '',
        month: '',
        x1: 0,
        x2: 0,
        x3: 0,
        x4: 0,
        x5: 0,
        x6: 0, x7: 0, x8: 0, x9: 0, x10: 0, x11: 0, x12: 0
      }
    }
  },
  created() {
    gettablelabel('2022').then(res => console.log('2022', res))
    findCountcontinuedatasource(this.value, this.month).then(res => { // 加载表格数据和改变表单绑定数据的方法
      this.form = this.form1 // form1是初始值，让form回归初始值
      this.form.month = this.month
      this.form.zone = this.value // 下面月份、区域数据更新时 更新dialog里面初始显示的数据
      this.listloading = true
      console.log(res)
      if (res == 1) { // 有且仅有一条这样的数据 才去取数据出来显示
        this.getdatasourceList(this.value, this.month)
      }
    })
  },
  computed: {
    ...mapGetters(['month'])
  },
  methods: {
    addorupdate() { // 按钮方法
      this.dialogvisable = true
    },
    canceladdorupdate() { // 按钮方法
      this.dialogvisable = false
    },
    getdatasourceList() { // 加载表格数据和改变表单数据的方法
      findByzoneanddate(this.value, this.month).then(response => {
        console.log(response)
        this.tableData[0].x1 = 'x1: ' + response.x1
        this.tableData[0].x2 = 'x2: ' + response.x2
        this.tableData[0].x3 = 'x3: ' + response.x3
        this.tableData[1].x1 = 'x4: ' + response.x4
        this.tableData[1].x2 = 'x5: ' + response.x5
        this.tableData[1].x3 = 'x6: ' + response.x6
        this.tableData[2].x1 = 'x7: ' + response.x7
        this.tableData[2].x2 = 'x8: ' + response.x8
        this.tableData[2].x3 = 'x9: ' + response.x9
        this.tableData[3].x1 = 'x10: ' + response.x10
        this.tableData[3].x2 = 'x11: ' + response.x11
        this.tableData[3].x3 = 'x12: ' + response.x12
        this.form.x1 = response.x1
        this.form.x2 = response.x2
        this.form.x3 = response.x3
        this.form.x4 = response.x4
        this.form.x5 = response.x5
        this.form.x6 = response.x6
        this.form.x7 = response.x7
        this.form.x8 = response.x8
        this.form.x9 = response.x9
        this.form.x10 = response.x10
        this.form.x11 = response.x11
        this.form.x12 = response.x12
        this.listloading = false
      })
    },
    updateorsave() { // 上传／更新数据方法
      updateorsavecontinuedatasource(this.form.zone, this.form.month, this.form.x1, this.form.x2, this.form.x3, this.form.x4, this.form.x5, this.form.x6, this.form.x7, this.form.x8, this.form.x9, this.form.x10, this.form.x11, this.form.x12).then(res => {
        const that = this
        if (res == '1') {
          that.$notify({ // 封装的通知功能
            title: 'Success',
            message: '新增数据成功',
            type: 'success',
            duration: 3000
          })
          this.dialogvisable = 0
        }
        if (res == '2') {
          that.$notify({ // 封装的通知功能
            title: 'Success',
            message: '更新数据成功',
            type: 'success',
            duration: 3000
          })
          this.dialogvisable = 0
        }
      }).then(res => { // 新增 修改成功后 更新当前界面数据
        findCountcontinuedatasource(this.value, this.month).then(res => { // 加载表格数据和改变表单绑定数据的方法
          this.listloading = true
          console.log(res)
          if (res == 1) { // 有且仅有一条这样的数据 才去取数据出来显示
            this.getdatasourceList(this.value, this.month)
          }
        })
      }
      )
    }
  },
  watch: {
    month(newval) {
      findCountcontinuedatasource(this.value, newval).then(res => {
        this.form = this.form1 // form1是初始值，让form回归初始值
        this.form.month = this.month
        this.form.zone = this.value // 下面月份、区域数据更新时 更新dialog里面初始显示的数据
        this.listloading = true
        console.log(res)
        if (res == 1) { // 有且仅有一条这样的数据 才去取数据出来显示
          this.getdatasourceList(this.value, this.month)
        }
      })
    },
    value(newval) {
      findCountcontinuedatasource(newval, this.month).then(res => {
        this.form = this.form1 // form1是初始值，让form回归初始值
        this.form.month = this.month
        this.form.zone = this.value // 下面月份、区域数据更新时 更新dialog里面初始显示的数据
        this.listloading = true
        console.log(res)
        if (res == 1) { // 有且仅有一条这样的数据 才去取数据出来显示
          this.getdatasourceList(this.value, this.month)
        }
      })
    }
    /* 'form.x6': { // 深度监听 监听嵌套数据
      handler(newVal, oldVal) {
        console.log(newVal)
        this.form.x12 = (((this.form.x8 + this.form.x9) / 200) + newVal / 100) * 20
        console.log('x12的值是 ：' + this.form.x12)
      },
      deep: true
    },
    'form.x8': { // 深度监听 监听嵌套数据
      handler(newVal, oldVal) {
        console.log(newVal)
        this.form.x12 = (((newVal + this.form.x9) / 200) + (this.form.x6 / 100)) * 20
        console.log('x12的值是 ：' + this.form.x12)
      },
      deep: true
    },
    'form.x9': { // 深度监听 监听嵌套数据
      handler(newVal, oldVal) {
        console.log(newVal)
        this.form.x12 = (((this.form.x8 + newVal) / 200) + (this.form.x6 / 100)) * 20
        console.log('x12的值是 ：' + this.form.x12)
      },
      deep: true
    }*/

  }
}
</script>

