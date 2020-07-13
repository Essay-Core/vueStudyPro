<template>
  <el-card>
    <!-- 面包屑 -->
    <selfBread level_1="权限管理" level_2="权限列表"></selfBread>
    <!-- 表格 -->
    <el-table class="table" :data="tableData" height="400px" border style="width: 100%">
      <el-table-column prop="authName" label="权限" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="等级">
          <!-- 当需要从界面当前行获取数据时，使用 slot-scope="scope"方法-->
          <template slot-scope="scope">
              <span v-if="scope.row.level==='0'">一级权限</span>
              <span v-if="scope.row.level==='1'">二级权限</span>
              <span v-if="scope.row.level==='2'">三级权限</span>
              <span v-if="scope.row.level==='3'">四级权限</span>
          </template>
          
      </el-table-column>
      <el-table-column  label="操作">
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
  </el-card>
</template>

<script>
export default {
  name: "rightList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    //   获取权限列表
    async getRightList() {
       /* 获取token值 */
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get("rights/list");
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
    }
  }
};
</script>

<style>
.table{
    margin-top: 20px;
}
</style>