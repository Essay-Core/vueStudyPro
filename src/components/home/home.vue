<template>
  <!--在element上查找到相关的模板代码后，需要将模板代码添加样式，添加class属性，编写css给每个节点添加样式-->
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="18">
          <h3 class="middlehead">电商后台管理平台</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" class="loginout" @click="loginout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside"  width="200px">
        <!--侧边栏导航-->
        <el-menu :unique-opened = 'true' :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
          <el-menu-item index="users">
            <i class="el-icon-location"></i>
            <span>用户列表</span>
          </el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roleList">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rightList">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="goodsList">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
            <el-menu-item index="test">
              <i class="el-icon-location"></i>
              <span>组件测试</span>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>


      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "home",
        methods:{
          loginout(){
            localStorage.clear()
            this.$message.success("退出成功")
            this.$router.push({name:'login'})

          }
        }
    }
</script>

<style scoped>
  .container{
    background-color: #324152;
    height: 100%;
  }

  .header{
    background-color: white;
  }
  .aside{
    background-color: white;
  }
  .main{
    background-color: white;
  }
  .middlehead{
    text-align: center;
  }

  .loginout{
    line-height: 60px;
    text-decoration: none;
  }

</style>
