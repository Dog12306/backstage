<template>
  <div class="test-main">
    <el-card class="my-card">
      <div slot="header">
        <span>学员管理系统</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="年龄"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "test",

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.my-card{
  margin: 20px;
}
</style>
