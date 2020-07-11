<template>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level_1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level_2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: "selfBread",
    //定义组件的属性
    props: ['level_1','level_2']
}
</script>

<style>

</style>