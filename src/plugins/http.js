//使axios本身不是Vue插件，成为插件 插件模块
const MyHttpServer = {}
import axios from 'axios'


MyHttpServer.install = (Vue) => {
  axios.defaults.timeout = 1000 * 10; //超时时间

  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  Vue.prototype.$http = axios



  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('请求拦截器触发')
    // console.log(config)

    //config.url是在baseURL的基础上
    if (config.url!=='home'){
      /* 获取token值 */
      const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers.common["Authorization"] = AUTH_TOKEN;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('响应拦截器触发')
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

}

export default MyHttpServer


