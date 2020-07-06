<template>
  <el-card class="box-card">
    <!--1， 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2，搜索 -->
    <el-row>
      <el-col class="searchRow">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"

        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
          <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 3，表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <!--添加 type="index"，会自动添加索引-->
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="creat_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态">
        <tmplate>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </tmplate>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4,分页 -->
<!--
  size-change
  -->
    <el-pagination

      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10000">
    </el-pagination>
  </el-card>
</template>

<!--  -->

<script>
    export default {
      name: "users",
      data() {
          return {
              tableData: [{
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                phone:"15622277298",
                creat_time: '2016-05-02',

              }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    phone:"15622277298",
                    creat_time: '2016-05-02',

              }]
        }
      },
      created() {
        this.getUserList()
      },
      methods:{
        async getUserList(){
          // const AUTH_TOKEN = localStorage.getItem('token')
          // axios.$http.headers.common[''] = AUTH_TOKEN
          // const res = await this.$http.get(
          //   'users?query=${this.query}' +
          //   '&pagenum=${this.pagenum}' +
          //   '&pagesize=${this.pagesize}')
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }

    }
</script>

<style scoped>
  .searchRow{
    width: 20px;
  }

  .inputSearch{
    width: 300px;
  }
</style>
