
//使axios本身不是Vue插件，成为插件 插件模块
const MyHttpServer = {}
import axios from 'axios'

MyHttpServer.install = (Vue)=>{
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  Vue.prototype.$http = axios
}

export default MyHttpServer


