import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetialView from '../views/DetialView.vue'
import ComView from '../views/ComView.vue'
import MyView from '../views/MyView.vue'
import TalkView from '../views/TalkView.vue'
import SezhiView from '../views/SezhiView.vue'
import ScView from '../views/ScView.vue'

Vue.use(VueRouter)

const routes = [
  //主页
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
 
  //详情页
  {
    path: '/detial/:id',
    name: 'detial',
    props:true,//将动态传递的id植入接收页面的props中
    component: DetialView
  },

  //评论页
  {
    path: '/com/:comid',
    name: 'com',
    props:true,//将动态传递的id植入接收页面的props中
    component: ComView
  },

  //个人页
  {
    path: '/my',
    name: 'my',
    component: MyView
  },

    //评论输入页
    {
      path: '/talk',
      name: 'talk',
      component: TalkView
    },

     //设置页
     {
      path: '/sz',
      name: 'sz',
      component: SezhiView
    },
    //收藏页
      {
        path: '/sc',
        name: 'sc',
        component: ScView
      },
 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
