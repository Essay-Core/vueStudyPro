<template>
  <el-card>
    <el-cascader
      :change-on-select="true"
      :props="defaultParams"
      :options="options"
      v-model="selectedOptions"
      :clearable="true"
      @change="changeOptionList"
    ></el-cascader>
  </el-card>
</template>

<script>
  export default {
    name: "test_cascader",
    data() {
      return {
        /*
         :props="defaultParams"
         :options="options"
          v-model="selectedOptions"
          defaultParams--绑定一个像是对象的标签和值，以及子级选项，其中数据来源于options中的数据（对象数组）
            对象数组中的每一个对象都是包含{cat_name：'',cat_id:'',children:{} }
          options--可选项数据源，要显示的对象数组
          selectedOptions--为选择节点的cat_id的值组成
         */
        defaultParams: {
          //这三个key值时固定的，val值随着你想要显示的数据变量名修改
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        },
        options: [],
        selectedOptions: []
      };
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const res = await this.$http.get(`categories?type=3`)
        console.log(res.data)
        const {data, meta: {msg, status}} = res.data
        this.options = data;
      },
      //当进行点选节点是触发的方法
      changeOptionList(val){
        console.log(this.selectedOptions)
      }
    }
  }
</script>

<style scoped>

</style>
