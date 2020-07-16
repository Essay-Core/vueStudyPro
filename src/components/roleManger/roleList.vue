<template>
  <el-card>
    <!--1 面包屑 -->
    <selfBread level_1="权限管理" level_2="角色列表"></selfBread>
    <!--2 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 一级大循环 -->
          <el-row v-for="(item1,i) in props.row.children" :key="i">
            <el-col :span="4">
              <el-tag closable type="success">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级循环 -->
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag closable type="info">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="16">
                  <!-- 三级循环 -->
                  <el-tag
                    v-for="(item3,i) in item2.children"
                    :key="i"
                    closable
                    type
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 下面设置的width设置会影响界面显示，需注意适当调整 -->
      <el-table-column prop="roleName" label="角色" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="300"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button
            @click="clickEditOpera(scope.row)"
            :plain="true"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="clickDeleteOpera(scope.row)"
            :plain="true"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            @click="clickRoleManage(scope.row)"
            :plain="true"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 结束 -->
    <!-- 编辑角色信息对话框 -->
    <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="currentRoleMsg">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="currentRoleMsg.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="currentRoleMsg.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditRoleConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除角色，弹出确认对话框 -->

    <!-- 分配角色权限 -->
    <el-dialog title="分配角色权限" :visible.sync="dialogFormVisibleSelectRole">
      <el-form :model="currentRoleMsg">
        <!-- 权限树节点展示 -->
        <template slot-scope="scope">
          <el-tree
            :data="treeData"
            :default-expanded-keys="defaultexpandKeysArry"
            :default-checked-keys="defaultCheckedKeysArry"
            :props="props"
            node-key="id"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange()"
          ></el-tree>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSelectRole = false">取 消</el-button>
        <el-button type="primary" @click="dialogSelectRoleConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "roleList",
  data() {
    return {
      // 数组保存表格数据
      tableData: [],
      currentRoleMsg: [],
      //   弹框控制
      dialogFormVisibleEdit: false,
      dialogFormVisibleDeleteRole: false,
      dialogFormVisibleSelectRole: false,
      /* 用户角色选择器选项 */
      options: [],
      value: "",
      //   树节点变量
      defaultexpandKeysArry:[],
      defaultCheckedKeysArry:[],
      treeData: [],
      props: {
          label: 'authName',
          children: 'children',
      },
      count: 1
    };
  },
  //当加载当前页面是执行
  created() {
    this.getRoleList();
  },
  methods: {
    /* 获取角色列表 */
    async getRoleList() {
      /* 获取token值 */
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get("roles");
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // 获取数据
        this.tableData = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击编辑按钮
    async clickEditOpera(role) {
      this.dialogFormVisibleEdit = true;
      this.currentRoleMsg = role;
    },
    // 点击删除按钮
    async clickDeleteOpera(role) {
      this.dialogFormVisibleDeleteRole = true;
      this.currentRoleMsg = role;
    },
    // 分配角色权限按钮
    async clickRoleManage(role) {
      this.dialogFormVisibleSelectRole = true;
      this.currentRoleMsg = role;

    //  获取树形结构的权限表
    //  * 请求路径：rights/:type
    // * 请求方法：get
      const res = await this.$http.get(`rights/tree`)
      const {data, meta:{msg,status}} = res.data
      if (status === 200){
        this.$message.success(msg)
        this.treeData = data
      }
    },
    // 对话框确定按钮--编辑角色
    async dialogEditRoleConfirm() {
      /* 获取token值 */
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.put(
        `roles/${this.currentRoleMsg.id}`,
        this.currentRoleMsg
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // 获取数据
      } else {
        this.$message.error(msg);
      }

      this.dialogFormVisibleEdit = false;
      this.getRoleList();
    },
    // 分配用户角色
    async dialogSelectRoleConfirm() {
      /* 获取token值 */
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.put(
        `roles/${this.currentRoleMsg.id}`,
        this.currentRoleMsg
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // 获取数据
      } else {
        this.$message.error(msg);
      }

      this.dialogFormVisibleSelectRole = false;
      this.getRoleList();
    },
    // 树节点响应函数
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 1);
    }
  }
};
</script>

<style>
</style>
