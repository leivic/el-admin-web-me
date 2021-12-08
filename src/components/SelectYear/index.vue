<template>
  <div class="block" >
    <span class="demonstration"  /><!---v-model封装的相当于一个输入值的事件和一个绑定属性的值-->
    <el-date-picker
      v-model="value"
      type="year"
      placeholder="选择年"
      value-format="yyyy"
      style="width:100px"
    />
  </div>
</template>
<script>

export default {
	 data() {
		 return {
			 value: ''
		 }
	 },
	 watch: {
		 value(newval) { // 由子组件向父组件传递数据，通常使用状态管理器做媒介
			 this.$store.commit('CHANGE_YEAR', newval)// 向状态管理器中存值
		 }
	 },
	 mounted() {
		 this.getyear() // 从空值到获取当前日期，同样会触发watch 状态管理器是响应式的,里面的状态更新后，使用状态数据的视图会响应式的更新
	 },
	 methods: {
		 getyear() { // getmon() {} 是 getmon: function(){}的缩写 methods的值是个对象、对象里面是一对对键值对
      const theDate = new Date()

      this.value = theDate.getFullYear() + '' // 为什么＋一个'‘因为 getfullyear（）是date类型的，终究会出奇奇怪怪的问题
		 }
	 }
}
</script>

