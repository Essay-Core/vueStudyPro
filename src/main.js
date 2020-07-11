// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex";
//add
import ElementUI from 'element-ui'
//导入默认样式
import './assets/css/reset.css'
//引入css样式
import 'element-ui/lib/theme-chalk/index.css'

import MyServerHttp from './plugins/http'
import SelfBread from './components/subcom/selfBread'

//适用vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.component(SelfBread.name,SelfBread)

/*控制台log是否输出 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //对象简写
  // render:(h)=>h(App) 简写，可替换一下两行代码
  components: { App },
  template: '<App/>'


})

