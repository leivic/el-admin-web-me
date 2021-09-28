<template>

  <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"><!--第一个图表组件-->
    <el-card v-loading="listloading" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:20px">{{ '质量生态环境'+getmon+'月度总览' }}</span>
        <SelectMonth style="float: right; padding: 3px 0;" />

      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="changecellstyle"
      ><!--cell－style elment-ui上写了可以有三种类型，object funciton回调 string 即便如此，你要绑定方法也得加：动态绑定吧-->
        <el-table-column
          prop="date"
          label="评价内容"
          width="180"
        />
        <el-table-column
          prop="name"
          label="目标"
          width="180"
        />
        <el-table-column
          prop="address"
          label="实际得分"
        />
        <el-table-column
          prop="sum"
          label="计算方法"
        />
      </el-table>

    </el-card>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectMonth from '@/components/SelectMonth'
import { getenvironmenttotal } from '@/api/qe/environment'
export default {
  components: {
    SelectMonth
  },
  data() {
    return {
      listloading: true,
      tableData: [{
        date: '工位',
        name: '总得分>=50',
        address: '',
        sum: '健康水平X1+低碳精益X2'
      }, {
        date: '班组',
        name: '总得分>=90',
        address: '',
        sum: '健康水平+均衡发展+低碳精益'
      }, {
        date: '工段',
        name: '总得分>=135',
        address: '',
        sum: '系统完整+健康水平+均衡发展+数智网联+低碳精益'
      }, {
        date: '车间',
        name: '总得分>=120',
        address: '',
        sum: '系统完整+健康水平+均衡发展+数智网联'
      }, {
        date: '约束性指标得分率',
        name: '约束性指标得分率>=90%',
        address: '',
        sum: '#'
      },
      {
        date: '期望性指标得分率',
        name: '期望性指标得分率>=70%',
        address: '',
        sum: '#'
      }]

    }
  },
  created() {
    getenvironmenttotal(this.month).then(res => {
      for (const a in res) {
        if (a > 3) { this.tableData[a].address = res[a].toString().substring(0, 5) + '%' } else { this.tableData[a].address = res[a].toString().substring(0, 5) }
      }
    }).then(() => this.listloading = false)
  },
  computed: {
    ...mapGetters(['month']),
    getmon() {
      return this.month.substring(5, 7)
    }
  },
  methods: {
    changecellstyle: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2 && rowIndex == 0) {
        if (this.tableData[0].address >= 50) {
          return 'font-size:24px; color:green'
        } else {
          return 'font-size:24px; color:red'
        }
      } else if (columnIndex == 2 && rowIndex == 1) {
        if (this.tableData[1].address >= 90) {
          return 'font-size:24px; color:green'
        } else {
          return 'font-size:24px; color:red'
        }
      } else if (columnIndex == 2 && rowIndex == 2) {
        if (this.tableData[2].address >= 135) {
          return 'font-size:24px; color:green'
        } else {
          return 'font-size:24px; color:red'
        }
      } else if (columnIndex == 2 && rowIndex == 3) {
        if (this.tableData[3].address >= 120) {
          return 'font-size:24px; color:green'
        } else {
          return 'font-size:24px; color:red'
        }
      } else if (columnIndex == 2 && rowIndex == 4) {
        if (this.tableData[4].address.substring(0, 2) >= 90) {
          return 'font-size:24px; color:green'
        } else {
          return 'font-size:24px; color:red'
        }
      } else if (columnIndex == 2 && rowIndex == 5) {
        if (this.tableData[5].address.substring(0, 2) >= 70) {
          return 'font-size:24px; color:green' // 要知道，｛｝里面的返回值和执行代码完全是两种情况
        } else {
          return 'font-size:24px; color:red'
        }
      }
    }
  },
  watch: {
    month(newval) {
      this.listloading = true
      getenvironmenttotal(newval).then(res => {
        for (const a in res) {
          this.tableData[a].address = res[a].toString().substring(0, 5)
        }
      }).then(() => this.listloading = false)
    }
  }
}
</script>

<style>
   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 680px;
    margin: 0 auto;
  }

</style>
