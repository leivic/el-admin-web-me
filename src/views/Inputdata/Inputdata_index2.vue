<template>
  <div class="Sidebar">
    <el-date-picker
      v-model="date"
      type="month"
      placeholder="Pick a date"
      style="width: 200px;float: left"
      value-format="yyyy-MM"
    />
    <el-button type="primary" @click="updatedata">更新数据</el-button>
    <el-table :data="datalist">
      <el-table-column align="center" header-align="center" label="id" width="50">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="车间" width="90">
        <template slot-scope="{row,$index}"><!--作用域插槽 数据来自子组件--><!--此处作用域插槽的数据就是row（来自子组件的数据被el-table封装） index是一个序号-->
          <!--作用域插槽就是父组件在调用子组件的时候给子组件传了一个插槽，这个插槽为作用域插槽，该插槽必须放在template标签里面，同时声明从子组件接收的数据放在一个自定义属性内，并定义该数据的渲染方式-->
          <span>{{ row.chejian }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="一月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.yiyue }}</span> <!-- v-if控制是否显示 后面还跟v-else 就是显示其一 只要方法切换showEdit[$index]的值即可-->
          <el-input v-else v-model="show1[$index]" type="text" placeholder="请输入" /><!--input切换时显示的值是传入show1[]里面的""-->
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="二月" width="70">
        <template slot-scope="{row,$index}">
          <span v-if="!showEdit[$index]">{{ row.eryue }}</span>
          <el-input v-else v-model="show2[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="三月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.sanyue }}</span>
          <el-input v-else v-model="show3[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="四月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.siyue }}</span>
          <el-input v-else v-model="show4[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="五月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.wuyue }}</span>
          <el-input v-else v-model="show5[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="六月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.liuyue }}</span>
          <el-input v-else v-model="show6[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="七月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.qiyue }}</span>
          <el-input v-else v-model="show7[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="八月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.bayue }}</span>
          <el-input v-else v-model="show8[$index]" type="text" placeholder="请输入" />
        </template><!--这个v-model里面的数据 并不会直接改变 row  改变 datalist里面的数据 它双向绑定 你在输入框改变数据时，这个数组里的数据也会变，所以传新的数据用 这种show8[$index]-->
      </el-table-column>
      <el-table-column align="center" header-align="center" label="九月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.jiuyue }}</span>
          <el-input v-else v-model="show9[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="十月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.shiyue }}</span>
          <el-input v-else v-model="show10[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="十一月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.shiyiyue }}</span>
          <el-input v-else v-model="show11[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="十二月" width="70">
        <template slot-scope="{row,$index}"> <!--template 没有语义和表现 用来包裹-->
          <span v-if="!showEdit[$index]">{{ row.shieryue }}</span>
          <el-input v-else v-model="show12[$index]" type="text" placeholder="请输入" />
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template slot-scope="{row,$index}">
          <el-button v-if="!showEdit[$index]" type="primary" @click="showUpdate($index,row)">
            <!--v-if后面这些可以放表达式的地方 随意放任何表达式就好 用来判断的都是表达式的最终值-->
            <i class="el-icon-edit" />修改
          </el-button>
          <el-button v-if="showEdit[$index]" type="success" @click="submit($index,row)">确定</el-button>
          <el-button v-if="showEdit[$index]" type="warning" @click="cancelUpdate($index)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { findAllIndexdata2, updateIndexdata2, InputIndexdata2save } from '@/api/qe/other'
export default {
  data() {
    return {
      date: '',
      datalist: [], // 才是显示在span里的数据
      showEdit: [],
      showId: [], // 显示姓名
      showChejian: [], // 显示年龄
      show1: [], // 1月的数据 这里的数据是显示在输入框的数据
      show2: [],
      show3: [],
      show4: [],
      show5: [],
      show6: [],
      show7: [],
      show8: [],
      show9: [],
      show10: [],
      show11: [],
      show12: [],
      name: '',
      age: ''

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
	    this.show1.splice(0, this.show1.length)// 清空数组
	    this.show2.splice(0, this.show2.length)
	    this.show3.splice(0, this.show3.length)
	    this.show4.splice(0, this.show4.length)
	    this.show5.splice(0, this.show5.length)
	    this.show6.splice(0, this.show6.length)
	    this.show7.splice(0, this.show7.length)
	    this.show8.splice(0, this.show8.length)
	    this.show9.splice(0, this.show9.length)
	    this.show10.splice(0, this.show10.length)
	    this.show11.splice(0, this.show11.length)
	    this.show12.splice(0, this.show12.length)
	    findAllIndexdata2().then(res => {
		    this.datalist = res
		    console.log(res)
		    for (const i of res) {
			    this.show1.push(i.yiyue) // 加入数据
			    this.show2.push(i.eryue)
			    this.show3.push(i.sanyue)
			    this.show4.push(i.siyue)
			    this.show5.push(i.wuyue)
			    this.show6.push(i.liuyue)
			    this.show7.push(i.qiyue)
			    this.show8.push(i.bayue)
			    this.show9.push(i.jiuyue)
			    this.show10.push(i.shiyue)
			    this.show11.push(i.shiyiyue)
			    this.show12.push(i.shieryue)
		    }
	    })
    },
    updatedata() {
      InputIndexdata2save(this.date).then(res => {
        if (res == 0) {
          this.$notify({ // 封装的通知功能
            title: 'error',
            message: '更新数据失败',
            type: 'error',
            duration: 30000
          })
        } else if (res == 1) {
          this.$notify({ // 封装的通知功能
            title: 'success',
            message: '更新数据成功',
            type: 'success',
            duration: 30000
          })
          this.getList()
        }
      }) // axios是一个promise
    },
    // 点击修改
    showUpdate(index) { // 传入序号 切换 showEdit[index]的值 ture
      this.showEdit[index] = true
      this.$set(this.showEdit, index, true) // 这里要用$set方法，否则页面状态不更新 传值 并更新页面
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
          this.$set(this.showId, index, '')
          this.$set(this.showChejian, index, '') // 给这个数据赋值 这几个showChejian
        })
        .catch(() => {})
    },
    // 提交修改
    submit(index, row) {
	    console.log(row)
	    updateIndexdata2(row.id, this.show1[index], this.show2[index], this.show3[index], this.show4[index], this.show5[index], this.show6[index], this.show7[index], this.show8[index], this.show9[index], this.show10[index], this.show11[index], this.show12[index]).then(res => {
		    this.$set(this.showEdit, index, false)
		    this.getList()
	    })
    }
  }

}
</script>
