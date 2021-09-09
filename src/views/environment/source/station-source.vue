<template>
  <div class="app-container">
    <div class="filter-container">
      <!--后端导入工位服务-->
      <el-upload
        action="http://localhost:8090/exportGongWeiFuHe"
        multiple
        :limit="3"
      >
        <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
          导入
        </el-button>
      </el-upload>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    > <!--el-table的数据配置处是 :data-->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="60" :class-name="getSortClass('id')">
        <template slot-scope="{row}"> <!--slot-scope是作用域插槽 意味着父组件提供样式就好，不用提供内容，内容由子组件内绑定的数据来提供 默认插槽和具名插槽子组件都是父组件又提供数据，又提供内容-->
          <span>{{ row.id }}</span><!--row是在此处自命名的,row其实是:data＝“list” 绑定的list数据,list是个数组-->
        </template>
      </el-table-column>

      <el-table-column label="工位" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.station }}</span>
        </template>
      </el-table-column>

      <el-table-column label="区域" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="时间" width="80px" align="center">
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

      <el-table-column label="人员能力符合要求(10)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.peopleiscapable }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料、作业文件、工具正确(30)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.matteriscorrect }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工标准化执行符合率100%(10)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wokerisstandard }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工位人员稳定性,在岗时间<1个月(-10)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wokerstability }}</span>
        </template>
      </el-table-column>

       <el-table-column label="工位设备停线时间>3min,发生一次扣-5分(-10)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stationshutdown }}</span>
        </template>
      </el-table-column>

       <el-table-column label="物料停线时间>3min,发生一次扣-5分(-10)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mattershutdown }}</span>
        </template>
      </el-table-column>

       <el-table-column label="工位健康水平小计" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.x1 }}</span>
        </template>
      </el-table-column>

       <el-table-column label="暂未有详细描述(20)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.low_carbon_1 }}</span>
        </template>
      </el-table-column>

       <el-table-column label="工业电子化实现一致性(5)" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.iso }}</span>
        </template>
      </el-table-column>

       <el-table-column label="工位低碳精益小计" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.x2 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了-->
          <el-button size="mini" type="danger" @click="">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getAllStiation } from '@/api/qe/environment'
import Pagination from '@/components/Pagination'// 分页组件

export default {
  components: { Pagination },

  data() {
    return {
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
      total: 3000

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取数据
      this.listLoading = true
      getAllStiation(this.listQuery.page, this.listQuery.limit,this.listQuery.sort).then(response => {
	console.log(response)
        this.list = response.content // 获取真正的sql查询出来的数据
	// Just to simulate the time of the request
	this.total = response.totalElements
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    sortChange(data) { // 排序改变
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    sortByID(order) { // 按id排序
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
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
      this.list.splice(index, 1)// data property里面的数据更新，视图即更新
      
    }

  }
}
</script>
