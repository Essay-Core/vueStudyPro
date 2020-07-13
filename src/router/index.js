import Vue from 'vue'
import Router from 'vue-router'

// @ 自动找到src文件夹
import Login from '../components/login/login.vue'
import Home from  '../components/home/home.vue'
import Users from '../components/users/users.vue'
import RoleList from '../components/roleManger/roleList.vue'
import RightList from '../components/roleManger/rightList.vue'

// 解决vue3中导航栏点击报错问题：Avoided redundant navigation to current location
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//必须添加以下声明才能使用
Vue.use(Router)

export default new Router({
  routes: [{
    name: "login",
    path: '/login',
    component: Login
  },{
    name: 'home',
    path: '/home',
    component: Home,
    children:[{
      name: 'users',
      //路径需要添加/,否则无法找到
      path: '/users',
      component: Users
    },{
      name:'roleList',
      path:'/roleList',
      component:RoleList
    },{
      name:'rightList',
      path:'/rightList',
      component:RightList
    }]

  }
  ]
})
