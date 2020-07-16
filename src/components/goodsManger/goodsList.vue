<template>
  <el-card>
    <!--    1 面包屑-->
    <self-bread level_1="商品管理" level_2="商品列表"></self-bread>
    <!--    2 搜索框-->
    <el-input class="inputsearch" v-model="input" placeholder="请输入搜索商品名">
      <el-button @click="searchGoods()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="$router.push({name:'goodAdd'})" type="success" plain>添加商品</el-button>

    <!--    3 表格显示商品-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <!--      显示扩展的位置-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">

          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="商品 ID"
        prop="cat_id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="cat_name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "goodsList",
    data() {
      return {
        tableData: [],
        input: ''
      }
    },
    created() {
      this.getGoodList()
    },
    methods: {
      //获取商品列表
      async getGoodList() {
        /* 获取token值 */
        // const AUTH_TOKEN = localStorage.getItem("token");
        // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        const res = await this.$http.get('categories/')
        const {data, meta: {msg, status}} = res.data
        this.tableData = data

      },
      //  商品搜索
      async searchGoods() {
        const res = await this.$http.get('categories/')
        const {data, meta: {msg, status}} = res.data

      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .inputsearch {
    width: 400px;
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
