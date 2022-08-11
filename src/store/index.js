import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //定义一个存储购物车数据的数组
    cateAll:[]
  },
  getters: {
  },
  mutations: {
    //payload在页面触发方法传过来的形参
    setCateAll(state,payload){
      //给购物车数据添加一条数据
      
      state.cateAll.push(payload)
      console.log(111111);
    }
  },
  actions: {
  },
  modules: {
  }
})
