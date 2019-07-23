<template>
  <div class="dorm-main">
    <el-card shadow="never">
      <div slot="header">
        <span>宿舍管理系统</span>
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
          <el-table-column prop="name" label="宿舍名称" width="120"></el-table-column>
          <el-table-column prop="startTime" label="开班时间" width="120"></el-table-column>
          <el-table-column prop="endTime" label="结班时间" width="120"></el-table-column>
          <el-table-column prop="typeText" label="宿舍类型" width="300"></el-table-column>
          <el-table-column prop="position" label="宿舍位置" width="300"></el-table-column>
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
import { getDormList, addDormDetail, removeDormList } from "@/api/dorm";
import detail from "./components/detail";
export default {
  name: "dorm",

  data() {
    return {
      pageData: {
        start: 1,
        limit: 5
      },
      dormList: [],
      total: 25,
      loading: false
    };
  },
  components: {
    detail
  },
  computed: {
    classListShow() {
      return this.dormList;
    }
  },
  created() {
    this.loading = true;
    var pageData = this.pageData;
    getDormList(pageData).then(res => {
      console.log(res);
      this.total = res.data.totalRow;
      this.dormList = res.data.list;
      this.loading = false;
    });
  },

  methods: {
    handleSizeChange(val) {
      this.loading = true;
      var pageData = this.pageData;
      pageData.limit = val;
      getDormList(pageData).then(res => {
        console.log(res);
        this.total = res.data.totalRow;
        this.dormList = res.data.list;
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.loading = true;
      var pageData = this.pageData;
      pageData.start = val;
      getDormList(pageData).then(res => {
        console.log(res);
        this.total = res.data.totalRow;
        this.dormList = res.data.list;
        this.loading = false;
      });
    },
    goAdd() {
      this.$refs.detail.dialogFormVisible = true;
      this.$refs.detail.confirmst = 0;
    },
    changeRow(obj) {
      this.$refs.detail.dialogFormVisible = true;
      this.$refs.detail.confirmst = 1;
      addDormDetail({ id: obj.id }).then(res => {
        console.log(res);
        this.$refs.detail.dormAdd = res.data;
      });
    },
    removeRow(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeDormList({ id: obj.id }).then(res => {
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
    refresh() {
      this.loading = true;
      var pageData = this.pageData;
      getDormList(pageData).then(res => {
        console.log(res);
        this.total = res.data.totalRow;
        this.dormList = res.data.list;
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
