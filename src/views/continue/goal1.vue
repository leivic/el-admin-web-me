<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-date-picker
          v-model="date"
          type="year"
          placeholder="Pick a date"
          style="width: 100%"
          value-format="yyyy"
        />
      </el-col>
      <el-col :span="20">
        <el-button type="primary" @click="addfile">新增</el-button>
      </el-col>
    </el-row>

    <!--表单渲染--><!--el-dialog elment－ui中的弹出框--><!--:visible 是是否显示 .sync是修饰符 指是否显示和数据状态同步改变 crud.status.cu此处是对mixin混入的使用 可没有html表达式中绑定import进来的表达式的先例  -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="crud1.status.cu > 0" :title="crud1.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">

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
    <!--表单渲染 弹出框-->
    <!--表格渲染--><!--vue响应式  tableDatas改变表格中更改数据的部分重渲染--> <!--vue组件生命周期 切换组件 刷新页面等 都会重加载整个组件生命周期-->
    <el-table
      :data="tableDatas"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tableheight"
      :cell-style="tableCellStyle"
      @cell-dblclick="celldblclick"
    ><!--tableCellStyle 从一个方法获取返回值，作为组件的一个属性值-->
      <!--<el-table-column v-for="(col,i) in cols" :prop="col.label" :key="i" :label="col.prop">

			</el-table-column> 动态循环渲染列写法-->
      <el-table-column fixed align="center" header-align="center" label="序号" width="50"><!--<template slot-scope="{row,$index}"> <!--row是子组件中slot标签上绑定的子组件数据 作用域插槽是在父组件使用子组件的数据-->
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span>{{ $index }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" header-align="center" label="车型" width="90">
        <template slot-scope="{row,$index}"> <!--作用域插槽 数据来自子组件--><!--此处作用域插槽的数据就是row（来自子组件的数据被el-table封装） index是一个序号 这个作用域插槽row和序号都是el-table组件里封装的数据-->
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" header-align="center" label="指标" width="250">
        <template slot-scope="{row,$index}">
          <span>{{ row.target }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="指标类型" width="130">
        <template slot-scope="{row,$index}">
          <span>{{ row.targettype }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="指标级别" width="90">
        <template slot-scope="{row,$index}">
          <span>{{ row.targetstandard }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="责任部门" width="90">
        <template slot-scope="{row,$index}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="区域负责人" width="90">
        <template slot-scope="{row,$index}">
          <span>{{ row.zoneperson }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="指标负责人" width="90">
        <template slot-scope="{row,$index}">
          <span>{{ row.person_in_charge }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="目标值" width="130">
        <template slot-scope="{row,$index}">
          <span>{{ row.goal }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="拉伸指标" width="90">
        <template slot-scope="{row,$index}">
          <span>{{ row.lashengoal }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="指标反馈人" width="90">
        <template slot-scope="{row,$index}"> <!--作用域插槽 数据来自子组件--><!--此处作用域插槽的数据就是row（来自子组件的数据被el-table封装） index是一个序号 这个作用域插槽row和序号都是el-table组件里封装的数据-->
          <!--作用域插槽就是父组件在调用子组件的时候给子组件传了一个插槽，这个插槽为作用域插槽，该插槽必须放在template标签里面，同时声明从子组件接收的数据放在一个自定义属性内，并定义该数据的渲染方式-->
          <span>{{ row.zhibiaofankuiren }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="1月目标" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹--><!--v-if切换是改变dom 渲染开销很大-->
          <span v-if="!showEdit[$index]">{{ row.yiyuegoal }}</span> <!-- v-if控制是否显示 后面还跟v-else 就是显示其一 只要方法切换showEdit[$index]的值即可-->
          <el-input v-else v-model="tableDatas[$index].yiyuegoal" type="text" placeholder="请输入" /><!--input切换时显示的值是传入show1[]里面的""-->
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="1月实际" prop="yiyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.yiyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].yiyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="2月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.eryuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].eryuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="2月实际" prop="eryueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.eryueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].eryueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="3月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.sanyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].sanyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="3月实际" prop="sanyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.sanyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].sanyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="4月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.siyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].siyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="4月实际" prop="siyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.siyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].siyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="5月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.wuyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].wuyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="5月实际" prop="wuyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.wuyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].wuyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="6月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.liuyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].liuyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="6月实际" prop="liuyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.liuyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].liuyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="7月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.qiyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].qiyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="7月实际" prop="qiyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.qiyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].qiyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="8月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.bayuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].bayuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="8月实际" prop="bayueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.bayueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].bayueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="9月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.jiuyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].jiuyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="9月实际" prop="jiuyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.jiuyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].jiuyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="10月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shiyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].shiyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="10月实际" prop="shiyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shiyueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].shiyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="11月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shiyiyuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].shiyiyuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="11月实际" prop="shiyiyueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shiyiyueshiji }}</span> <!--初始化时，showEdit[]为空，showEdit[$index]没有，即为false-->
          <el-input v-else v-model="tableDatas[$index].shiyiyueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="12月目标" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shieryuegoal }}</span>
          <el-input v-else v-model="tableDatas[$index].shieryuegoal" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="12月实际" prop="shieryueshiji" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.shieryueshiji }}</span>
          <el-input v-else v-model="tableDatas[$index].shieryueshiji" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column fixed header-align="center" align="center" width="150" label="操作">
        <template slot-scope="{row,$index}">
          <el-button v-if="!showEdit[$index]" size="small" type="primary" @click="showUpdate($index,row)">
            <!--v-if后面这些可以放表达式的地方 随意放任何表达式就好 用来判断的都是表达式的最终值-->
            <i class="el-icon-edit" />修改
          </el-button>
          <el-button v-if="showEdit[$index]" size="small" type="success" @click="submit($index)">确定</el-button>
          <el-button v-if="showEdit[$index]" size="small" type="warning" @click="cancelUpdate($index)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { uploadgoaldata, getgoaldata, updatezhiliangfenjiebyid, updatezhiliangzhuangtaibyid,finddepartmentbyyear,findtargetnumberbyyear,finddepartmenthegezhiliang } from '@/api/qe/continue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showEdit: [],
      ischange: false,
      date: undefined,
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
      basedata: {
        year: '2021'
      },
      tableDatas: [], // 表格数据
      tableheight: 550,
      cols: [ // 获得表头信息

      ],
      row: '',
	    column: ''
    }
  },
  created() {
    finddepartmentbyyear(this.year).then(res=>{
      console.log('----->department',res)
    })
    findtargetnumberbyyear(this.year).then(res=>{
      console.log('----->targetnumber',res)
    })
    finddepartmenthegezhiliang(this.year,1,1).then(res=>{
      console.log('------>number',res)
    })
    console.log('year', this.year)
    getgoaldata(this.year).then(
      res => {
        this.tableDatas = res
        console.log(res)
      }
    )
  },
  mounted() {
    this.$nextTick(() => { // $nexttick 获取dom更新后的数据调用 这里是获取dom更新后的window.innerheight vue的响应式重渲染页面并不是在更新data后立即更新dom vue的dom是异步更新的 想要在更新数据后立即使用更新后的dom，就要使用nexttick
			    this.tableheight = window.innerHeight - 150
			    console.log(this.tableheight)
		    // 后面的50：根据需求空出的高度，自行调整
      window.onresize = function() { // 给window的onredisze事件添加一个监听函数
        this.tableheight = window.innerHeight - 150
        console.log('调整后的tallheight' + this.tableheight)
      }
    })
  },
	 computed: {
    	...mapGetters(['year'])
  	},
  methods: {
    celldblclick(row, column, cell, event) { // 控制台打印cell，这个cell即dom节点 可直接操作dom改变颜色
      if (column.property == 'yiyueshiji') { // 奇怪的是取 column.property 判断成功 ，取column.label判断失败
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 1).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 1).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 1).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'eryueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 2).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 2).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 2).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'sanyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 3).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 3).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 3).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'siyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 4).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 4).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 4).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'wuyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 5).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 5).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 5).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'liuyueshiji') { // 六月的情况
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 6).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 6).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 6).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'qiyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 7).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 7).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 7).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'bayueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 8).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 8).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 8).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'jiuyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 9).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 9).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 9).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'shiyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 10).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 10).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 10).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'shiyiyueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 11).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 11).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 11).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      } else if (column.property == 'shieryueshiji') {
        if (cell.style.backgroundColor == 'rgb(255, 255, 255)') {
          updatezhiliangzhuangtaibyid(row.id, 1, 12).then(res => {
            cell.style.backgroundColor = 'rgb(0, 255, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(0, 255, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 2, 12).then(res => {
            cell.style.backgroundColor = 'rgb(255, 0, 0)'
          })
        } else if (cell.style.backgroundColor == 'rgb(255, 0, 0)') {
          updatezhiliangzhuangtaibyid(row.id, 0, 12).then(res => {
            cell.style.backgroundColor = 'rgb(255, 255, 255)'
          })
        }
      }
    },
    addfile() {
      this.crud1.status.cu = 1
    },
    tableCellStyle({ row, column, rowIndex, columnIndex }) { // 这样声明函数时，形参本应不是一个固定值,而在声明函数时形参传入固定值的形式 是由于js声明函数时，并不知道参数会是什么类型，所以函数内部可以任意对参数进行调用 这样的形式就是因为在这个声明的函数之外 必然还有一层对未知的参数／函数进行了某种处理，只有你传入固定的参数类型时，外层调用时才能处理成功 所以看起来就是这个函数声明了固定参数，其实函数调用结果是由实参而不是形参来决定的，只不过是在你声明的这个参数之外还有一层
      const rowBackground = {}
      if (columnIndex == 13) { // 列数据为13时
        if (row.yiyuezhuangtai == 1) { // 那一行13的yiyuezhaungtai字段==1时  通过columnIndex定位列 然后这个方法外层封装了一套循环每一行的逻辑
          rowBackground.background = '#00FF00'
        } else if (row.yiyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 15) {
        if (row.eryuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.eryuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 17) {
        if (row.sanyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.sanyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 19) {
        if (row.siyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.siyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 21) {
        if (row.wuyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.wuyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 23) {
        if (row.liuyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.liuyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 25) {
        if (row.qiyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.qiyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 27) {
        if (row.bayuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.bayuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 29) {
        if (row.jiuyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.jiuyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 31) {
        if (row.shiyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.shiyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 33) {
        if (row.shiyiyuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.shiyiyuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else if (columnIndex == 35) {
        if (row.shieryuezhuangtai == 1) {
          rowBackground.background = '#00FF00'
        } else if (row.shieryuezhuangtai == 2) {
          rowBackground.background = '#FF0000'
        } else {
          rowBackground.background = '#FFFFFF'
        }
      } else {
        rowBackground.background = '#FFFFFF'
      }

      return rowBackground
    },
    dialogcancel() {
      this.crud1.status.cu = 0 // 变量改变后保存在内存里，只要没有销毁
    },
		 upload() {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles.pop().raw // 从html元素取到文件对象

      formData.append('file', file) // 第一个参数对应java程序里面的形参名
      formData.append('date', this.form.date)
      const that = this
      uploadgoaldata(formData).then(res => {
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
      }) // 上传文件成功 采用formData的形式 这几个参数
    },
    // 点击修改
    showUpdate(index) { // 传入序号 切换 showEdit[index]的值 ture
      this.showEdit[index] = true
      this.$set(this.showEdit, index, true) // 这里要用$set方法，否则页面状态不更新 传值 并更新页面 因为vue不能监听对象内部的属性增加与删除（数组也是对象） 在组件初始化的过程中 vue给data中的属性添加setter 和getter 属性当时不存在是无法监听的 也就不能vue监听data更新页面样式
    },
    // 取消修改
    cancelUpdate(index) {
      this.$confirm('取消修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { // 取消修改时 给数组当前序号项赋值
          this.$set(this.showEdit, index, false)
          // 给这个数据赋值 这几个showChejian
        })
        .catch(() => {})
    },
    submit(index) {
      updatezhiliangfenjiebyid(this.tableDatas[index]).then(
        this.$set(this.showEdit, index, false)

      )
    }
  },
  watch: {
    date(newval) {
      getgoaldata(newval).then(
        res => {
          this.tableDatas = res
        }
      )
    }
  }
}
</script>
<style>

</style>
