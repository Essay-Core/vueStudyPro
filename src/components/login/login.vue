<template>
  <div class="login-warp">
    <el-form
      class="login-form"
      :label-position="top"
      label-width="80px"
      :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent = "handleLogin()"
        class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>

</template>

<script>
    export default {
        data(){
          return{
            formdata: {
              username:"",
              password:""
            }
          }
        },
      methods:{
          async handleLogin(){
            //使异步操作代码看起来像同步代码
            //找到异步操作
            //在异步操作前添加await
            //并且在当前函数添加async

            // const res = await this.$http.post('login', this.formdata)
            // const {
            //   data,
            //   meta:{msg,status}
            // } = res.data
            //如果用户没登录，url直接登录到home组件
            //保存正确的用户token
            // localStorage.getItem("token",date.token)
            //消息通知框
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });

            //跳转到home 组件页面
            this.$router.push({name:'home'})
          }
      }
    }
</script>

<style scoped>
.login-warp{
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .login-form {
    width: 400px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 30px;

  }

  .login-warp .login-btn{
      width: 100%;
  }
</style>
