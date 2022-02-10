<template>
  <div>
    <el-row style="margin-bottom:32px">
      <SelectMonth style="border:none" />
    </el-row>
    <!--表格渲染-->

    <el-row>
      <el-table
        v-loading="listloading"
        :data="tabledata"
        style="width: 100%"
        max-height="500"
        align="center"
      >
        <el-table-column
          fixed
          prop="banzu"
          label="班组"
          width="100"
          align="center"
        />
        <el-table-column
          fixed
          prop="chejian"
          label="车间"
          width="100"
          align="center"
        />
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="80"
          align="center"
        />
        <el-table-column
          fixed
          prop="zongji"
          label="总计"
          width="100"
          align="center"
        />
        <el-table-column
          label="缺陷拦截"
          align="center"
        >
          <el-table-column
            prop="ppsr"
            label="ppsr发生问题"
            width="100"
            align="center"
          />
          <el-table-column
            prop="ppsrchongfu"
            label="ppsr重复发生问题"
            width="100"
            align="center"
          />

        </el-table-column>

        <el-table-column
          label="质量防御"
          align="center"
        >
          <el-table-column
            prop="gongweihujian"
            label="工位互检发生问题"
            width="150"
            align="center"
          />

          <el-table-column

            prop="shouhouwenti"
            label="售后问题整改措施落实"
            width="160"
            align="center"
          />
          <el-table-column
            prop="zhiliangwenti"
            label="质量问题记录、跟踪"
            width="160"
            align="center"
          />
        </el-table-column>
      </el-table>
    </el-row>
    <!--表格渲染-->
  </div>
</template>
<script>
import { findAllbanzulistBydate } from '@/api/qe/reponsibility'
import { mapGetters } from 'vuex'
import SelectMonth from '@/components/SelectMonth'

export default {
  components: {
    SelectMonth
  },
  data() {
    return {
      listloading: true,
      tabledata: []
    }
  },
  computed: {
    ...mapGetters(['month']) // 每加载一个页面会重新加载导入的数据 就算这个时候内存里面是有month的..但是重新加载了vuex里面的初始赋值代码 内存里面的变量值也变回了原有状态
  },
  watch: {
    month(newval) {
      this.listloading = true
      findAllbanzulistBydate(newval).then(res => {
        this.tabledata = res
        this.listloading = false
      })
    }
  },
  created() {
    const theDate = new Date()
    let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1) //r如果这个month1是函数里的 修改就不起作用 因为函数里面的是拷贝
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
            }
    this.$store.commit('CHANGE_YEAR',theDate.getFullYear() + '') //每次加载组件 更新store里面的数据 
    this.$store.commit('CHANGE_MONTH',month1)
    this.$store.commit('CHANGE_ZONE','冲压车间')
    findAllbanzulistBydate(this.month).then(res => {
      console.log(res)
      this.tabledata = res// 加载的时候有一次创造节点的生命周期,每加载一次页面 created里面的方法只执行一次
      this.listloading = false
    })
  }
}
</script>
<style scoped>

</style>
