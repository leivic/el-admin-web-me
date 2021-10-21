<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
    </span>
    <el-button
      v-if="addisview"
      class="filter-item"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="$emit('enadd')"
    ><!--crud.toAdd 而本文件内没看见crud对象 发现下文有导入一个crud import进来的crud对象 仍然可以像定义在本文件内一样使用-->
      新增
    </el-button><!--父组件内prop传入子组件的html表达式也是可以的 子组件内prop的用法和dataproperty相差无几-->
    <el-button
      class="filter-item"
      size="mini"
      type="success"
      icon="el-icon-edit"
      @click="$emit('enupdate')"
    ><!--使用emit自定义事件  实现触发子组件元素事件 触发父组件上的方法-->
      修改
    </el-button>
    <el-button
      slot="reference"
      class="filter-item"
      type="danger"
      icon="el-icon-delete"
      size="mini"
      @click="$emit('endelete')"
    >
      删除
    </el-button>
    <el-button
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-download"
      @click="$emit('enexport')"
    >导出</el-button>
  </div>
</template>
<script>
export default {
  emits: ['enadd', 'enupdate', 'endelete', 'enexport'],
  props: ['addisview'] //在html表达式内 可以绑定的property就那几种 
}
</script>
<style scoped>
  .crud-opts {
    padding: 4px 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .crud-opts .crud-opts-right {
    margin-left: auto;
  }
  .crud-opts .crud-opts-right span {
    float: left;
  }
</style>
