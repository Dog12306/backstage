<template>
  <div class="clazz-main">
    <el-card shadow="never">
      <div slot="header">
        <span>班级管理系统</span>
      </div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="goAdd">添加</el-button>
        </el-col>
        <el-col :span="18">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.start"
            :page-sizes="[5, 10, 15]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>

      <el-card shadow="never" class="my-table">
        <el-table v-loading="loading" :data="classListShow" border style="width: 100%">
          <el-table-column fixed prop="addTime" label="添加时间" width="150"></el-table-column>
          <el-table-column prop="className" label="班级名称" width="120"></el-table-column>
          <el-table-column prop="startTime" label="开班时间" width="120"></el-table-column>
          <el-table-column prop="endTime" label="结班时间" width="120"></el-table-column>
          <el-table-column prop="typeText" label="班级类型" width="300"></el-table-column>
          <el-table-column prop="desc" label="班级描述"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="changeRow(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="removeRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <detail ref="detail" @refresh="refresh"></detail>
  </div>
</template>

<script>
import {
  getClasstList,
  getClasstDetail,
  removeClassList
} from "@/api/class.js";
import detail from "./components/detail";
export default {
  name: "clazz",
  data() {
    return {
      classData: [],
      pageData: {
        start: 1,
        limit: 5
      },
      loading: true,
      total: 25
    };
  },
  computed: {
    classListShow() {
      for (var i in this.classData) {
        if (this.classData[i].type == 0) {
          this.classData[i].typeText = "H5前端";
        } else if (this.classData[i].type == 1) {
          this.classData[i].typeText = "UI";
        }
      }
      return this.classData;
    }
  },
  components: {
    detail
  },
  created() {
    var pageData = this.pageData;
    getClasstList(pageData).then(res => {
      this.total = res.data.totalRow;
      this.classData = res.data.list;
      this.loading = false;
    });
  },

  methods: {
    changeRow(obj) {
      this.$refs.detail.confirmst = 1;
      this.$refs.detail.dialogFormVisible = true;
      getClasstDetail({ id: obj.id }).then(res => {
        this.$refs.detail.classAdd = res.data;
        this.refresh();
      });
    },
    removeRow(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeClassList({ id: obj.id }).then(res => {
            this.refresh();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goAdd() {
      this.$refs.detail.confirmst = 0;
      this.$refs.detail.dialogFormVisible = true;
    },
    refresh() {
      this.loading = true;
      var pageData = this.pageData;
      getClasstList(pageData).then(res => {
        this.total = res.data.totalRow;
        this.classData = res.data.list;
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.pageData.start = val;
      var pageData = this.pageData;
      getClasstList(pageData).then(res => {
        this.total = res.data.totalRow;
        this.classData = res.data.list;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageData.limit = val;
      var pageData = this.pageData;
      getClasstList(pageData).then(res => {
        this.total = res.data.totalRow;
        this.classData = res.data.list;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.my-table {
  margin-top: 20px;
}
</style>
