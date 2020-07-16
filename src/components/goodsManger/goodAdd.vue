<template>
  <el-card>
    <!--    1 面包屑-->
    <self-bread level_1="商品管理" level_2="商品列表"></self-bread>
    <!--    提示框-->

    <el-alert
      class="alert"
      title="成功提示的文案"
      type="success"
      center
      show-icon>
    </el-alert>

    <!--    时间线-->
    <el-steps :active="active" align-center simple style="margin: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!--    <el-button @click="nextIndex()" type="primary" plain>下一步</el-button>-->

    <!--  label-position="top"  设置便签对其方式为顶部  -->
    <!--   overflow: auto  设置超过页面显示时使用滚动条 -->
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" style="height: 400px;overflow: auto">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formLabelAlign.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formLabelAlign.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formLabelAlign.goods_number"></el-input>
          </el-form-item>

          <div class="block">
            <span class="demonstration">hover 触发子菜单</span>
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
          </div>

        </el-tab-pane>
        <el-tab-pane label="商品参数">

        </el-tab-pane>
        <el-tab-pane label="商品属性">

        </el-tab-pane>
        <el-tab-pane label="商品图片">

        </el-tab-pane>
        <el-tab-pane label="商品内容">

        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "goodAdd",
    data() {
      return {
        active: 0,
        tabPosition: 'left',
        input: '',
        labelPosition: '',
        //商品属性
        formLabelAlign: {
          goods_name: '',
          goods_price: '',
          goods_weight: '',
          goods_number: '',
          hot_mumber: '',
          is_promote: ''
        },
        options: [],
        value: ''
      }
    },
    created() {
      this.getGoodCate()
    },
    methods: {
      nextIndex() {
        this.active++ >= 5 ? this.active = 0 : this.active;
      },
      handleChange() {

      },
      async getGoodCate(){
        // /* 获取token值 */
        // const AUTH_TOKEN = localStorage.getItem("token");
        // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        const res = await this.$http.get(`categories?type=3`)
        const {data,meta:{msg,status}} = res.data

      }
    }

  }
</script>

<style scoped>
  .alert {
    margin: 20px;
    text-align: center;
  }

  .inputmsg {
    width: 400px;
  }

</style>
