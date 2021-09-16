const state = {
  year: ''
}

/* 状态管理器内赋值初始值
*/
// 看似下面一段代码未导出 但是它也加载执行了 那是因为整个store都配置在vue的根实例上 所以这段代码当然加载了
const theDate = new Date()

state.year = theDate.getFullYear() + ''

const mutations = { // 静态添加数据
  CHANGE_YEAR: (state, year) => {
    state.year = year
  }
}

export default {
  state,
  mutations
}
