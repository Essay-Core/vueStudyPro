<template>
  <div class="login-warp">
    <el-form
      class="login-form"
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
              username:"admin",
              password:"123456"
            }
          }
        },
      methods:{
        handleLogin: async function () {
          const ret = await this.$http.post('login', this.formdata)
          const {
            data,
            meta: {msg, status}
          } = ret.data

          //如果用户没登录，url直接登录到home组件
          //保存正确的用户token到localStorage中
          localStorage.setItem("token", data.token)
          //消息通知框
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });

          //跳转到home 组件页面
          this.$router.push({name: 'home'})
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
