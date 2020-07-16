<template>
  <el-card class="box-card">
    <!-- 页面显示的内容在这里面编写 -->

    <!--1， 面包屑 -->
    <selfBread level_1='用户管理' level_2='用户列表'></selfBread>

    <!-- 2，搜索 -->
    <el-row>
      <p></p>
      <el-input
        placeholder="请输入内容"
        v-model="query"
        class="inputSearch">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" @click="addDialogFormVisible = true">添加用户</el-button>
    </el-row>

    <!-- 3，表格 -->
    <!--    prop="status"的属性值得应该与userList中的key值相同，才会显示-->
    <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <!--添加 type="index"，会自动添加索引-->
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>

      <!--prop="create_time "-->
      <!--
        如果单元格现实的内容不是字符串，需要显示的内容被template包裹
         template内部要用数据，设置slot-scope,会自动找上一级的属性源，所以名字scope可随意取
         -->
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!--角色分配-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--  scope.row:传入当前行的相关数据        -->
          <el-button
            @click="editUser(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle>
          </el-button>
          <el-button @click="roleManage(scope.row)" size="mini" plain type="success" icon="el-icon-check"
                     circle></el-button>
          <el-button @click="deleteUser(scope.row)" size="mini" plain type="danger" icon="el-icon-delete"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4,分页 -->
    <!--size-change 大小改变是触发
        current-change 当前值改变时触发
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--  添加用户对话框-->
    <template>
      <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>
    </template>

    <!--    编辑用户信息-->
    <template>
      <el-dialog title="修改用户信息" :visible.sync="modifDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <!--  使输入框不可修改，添加disabled          -->
            <el-input disabled v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifUserMsg()">确 定</el-button>
        </div>
      </el-dialog>
    </template>

    <!--    -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">

      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="200px">
          <el-select v-model="form.role_name" placeholder="请选择角色">
            <el-option disabled label="请选择" value="select"></el-option>
            <el-option label="主管" value="manager"></el-option>
            <el-option label="测试角色1" value="test1"></el-option>
            <el-option label="测试角色2" value="test2"></el-option>
            <el-option label="超级管理员" value="supermanager"></el-option>
            <el-option label="test" value="test"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="roleManageConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    //这个声明自带的指定属性
    name: "users",
    data() {
      return {
        //所有的变量声明都必须在这里
        value: '',
        query: "",
        userList: [],
        //    分页相关的数据
        pagenum: 1,
        pagesize: 6,
        total: 10,
        //    添加用户对话框是否显示
        addDialogFormVisible: false,
        form: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //修改用户信息
        modifDialogFormVisible: false,
        currUserId: -1,
        dialogFormVisibleRole: false,
        //保存当前用户名
        currUsername: "",
        currRoldId: -1

      }
    },
    created() {
      //自动调用获取用户列表接口
      this.getUserList()
    },
    methods: {
      //用户角色管理
      async roleManageConfirm() {
        //  使用变量传递的几种方式
        //  1，通过函数传参
        //  2，直接引用全局变量
        //users/:id/role
        console.log(this.currRoldId)
        const res = await this.$http.put(`users/${this.form.id}/38`)
        const {meta: {msg, status}} = res.data
        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }

        //  更新数据
        this.getUserList()
        //  清空
        this.form = {}
      },
      //修改用户状态
      async changeUserStatus(user) {
        this.form = user
        //请求路径：users/:uId/state/:type 注意：冒号标识后面加的是一个变量，不需要再url中添加
        const res = await this.$http.put(`users/${this.form.id}/state/${this.form.mg_state}`)
        const {meta: {msg, status}, data} = res.data
        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      },
      //用户管理
      async roleManage(user) {
        //每个角色都有一个对应的rid,先要把选择与rid绑定，然后才能正确的发送
        this.form = user
        //发送一个请求，获取当前用户的角色id  users/:id 请求方法：get,rid只能在消息体中发送，
        const res = await this.$http.get(`users/${this.form.id}/role`, {rid: this.currRoldId})
        const {data, meta: {msg, status}} = res.data
        if (status === 200) {
          this.$message.success(msg)
          this.currRoldId = data.rid
          this.dialogFormVisibleRole = true
        }
        this.currUsername = user.username


      },
      //删除用户，弹出对话框 users/:id
      deleteUser(user) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.form = user
          const res = await this.$http.delete(`users/${this.form.id}`)
          const {data, meta: {msg, status}} = res.data
          if (status === 200) {
            this.$message.success(msg)
            //更新视图
            this.pagenum = 1
            this.getUserList()
          } else {
            this.$message.error(msg)
          }
          //清空出入框内容
          this.form = {}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //编辑用户
      editUser(user) {
        //由于这个已经保存了接收数据的所有的信息，包括id，于是modifUserMsg中可通过${this.form.id}使用，
        this.form = user
        this.modifDialogFormVisible = true
      },

      //修改用户信息
      async modifUserMsg() {
        this.modifDialogFormVisible = false
        // const res = await this.$http.put(`users/:id`,)
        //this.form会自动保存更新的数据
        const res = await this.$http.put(`users/${this.form.id}`, this.form)
      },

      //添加用户
      async addUser() {
        //发送请求，这里不需要添加token?
        const res = await this.$http.post(`users`, this.form)
        const {meta: {msg, status}, data} = res.data
        if (status === 201) {
          this.$message.success(msg)
          //更新视图
          this.getUserList()
          //清空文本框
          this.form = {}
          // 把值赋给相关的变量
        }
        //使表格隐藏
        this.addDialogFormVisible = false
      },

      //获取用户列表
      async getUserList() {
        //获取用户列表的请求
        // const AUTH_TOKEN = localStorage.getItem('token')
        // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

        //发送请求
        const res = await this.$http.get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

        //取值
        const {data: {users, total}, meta: {msg, status}} = res.data
        if (status === 200) {
          this.$message.success("用户信息查询成功")
          // 把值赋给相关的变量
          this.userList = users
          this.total = total
        }
      },

      //分页相关的方法
      //当size发生变化时
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.pagenum = 1
        this.getUserList()
      },

      //当页码发生变化时
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.getUserList()
      }
    }
  }
</script>

<style scoped>
  .inputSearch {
    width: 150px;
  }
</style>
