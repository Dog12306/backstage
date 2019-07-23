<template>
  <div class="student-main">
    <el-card class="my-card">
      <div slot="header">
        <span>学员管理系统</span>
      </div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="goAdd">添加</el-button>
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
      <el-row class="search" :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="pageData.name" clearable size="small"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="pageData.classId" clearable placeholder="请选择班级" size="small">
            <el-option
              v-for="item in clazz"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="pageData.dormId" clearable placeholder="请选择宿舍" size="small">
            <el-option v-for="item in dorm" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="doSearch">搜索</el-button>
          <el-button type="primary" size="small" @click="searchBack">重置</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="tableDataNew" border style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="sexv" label="性别" width="120"></el-table-column>
        <el-table-column prop="classname" label="班级" width="120"></el-table-column>
        <el-table-column prop="city" label="城市" width="120"></el-table-column>
        <el-table-column prop="tel" label="电话" width="300"></el-table-column>
        <el-table-column prop="dormname" label="宿舍" width="120"></el-table-column>
        <el-table-column prop="education" label="毕业院校" width="100"></el-table-column>
        <el-table-column prop="wxoqq" label="wx/qq" width="100"></el-table-column>
        <el-table-column prop="job" label="工作" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="changeRow(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="removeRow(scope.row)"
              type="text"
              size="small"
              v-show="scope.row.id"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <detail ref="detail" @refresh="refresh"></detail>
  </div>
</template>

<script>
import Mock from "mockjs";
import { regionData, CodeToText } from "element-china-area-data";
import {
  getStudentList,
  getClassList,
  getDormList,
  removeStudentInfo,
  getStudentDetail,
  getStudentCost
} from "@/api/student";
import detail from "./components/detail";
// console.log(Mock)
var Random = Mock.Random;
export default {
  name: "student",

  data() {
    return {
      tableData: [],
      currentPage4: 1,
      pageData: {
        start: 1,
        limit: 5,
        name: "",
        classId: "",
        status: "",
        dormId: ""
      },
      loading: false,
      total: 25,
      clazz: [],
      dorm: []
    };
  },
  components: {
    detail
  },
  computed: {
    tableDataNew() {
      for (var i in this.tableData) {
        this.tableData[i].wxoqq =
          (this.tableData[i].wx ? this.tableData[i].wx : "-") +
          " / " +
          (this.tableData[i].qq ? this.tableData[i].qq : "-");
        if (this.tableData[i].city) {
          this.tableData[i].city = this.tableData[i].city.split(",");
          var city = "";
          for (var m in this.tableData[i].city) {
            city += CodeToText[this.tableData[i].city[m]] + " ";
          }
          this.tableData[i].city = city;
        }
      }
      return this.tableData;
    },
    pageDataEmit() {
      var pageData = JSON.stringify(this.pageData);
      pageData = JSON.parse(pageData);
      for (var i in pageData) {
        if (this.pageData[i] === "") {
          delete pageData[i];
        }
      }
      return pageData;
    }
  },

  methods: {
    remove(index) {
      for (var i in this.tableData) {
        if (index.index == this.tableData[i].index) {
          this.tableData.splice(i, 1);
          break;
        }
      }
      for (var i in this.tableData) {
        this.tableData[i].index = i;
      }
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageData.limit = val;
      var pageData = this.pageDataEmit;
      getStudentList(pageData).then(res => {
        this.tableData = res.data.list;
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.pageData.start = val;
      var pageData = this.pageDataEmit;
      getStudentList(pageData).then(res => {
        this.tableData = res.data.list;
        this.loading = false;
      });
    },
    goAdd() {
      this.$refs.detail.confirmst = 0;
      this.$refs.detail.dialogFormVisible = true;
    },
    changeRow(obj) {
      this.$refs.detail.confirmst = 1;
      this.$refs.detail.dialogFormVisible = true;
      getStudentCost({ userId: obj.id }).then(res => {
        this.$refs.detail.costList = res.data;
      });
      getStudentDetail({ id: obj.id }).then(res => {
        this.$refs.detail.dataDetail = res.data;
      });
    },
    removeRow(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeStudentInfo({ id: obj.id });
          var pageData = this.pageDataEmit;
          setTimeout(() => {
            getStudentList(pageData).then(res => {
              this.tableData = res.data.list;
              this.loading = false;
            });
          }, 1000);
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
    doSearch() {
      var pageData = this.pageDataEmit;
      getStudentList(pageData).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.totalRow;
        this.loading = false;
      });
    },
    searchBack() {
      this.pageData = this.$options.data().pageData;
      var pageData = this.pageDataEmit;
      getStudentList(pageData).then(res => {
        this.tableData = res.data.list;
        this.pageData.start = res.data.pageNumber;
        this.total = res.data.totalRow;
        this.loading = false;
      });
      // console.log(this.$options.data().pageData);
    },
    refresh() {
      var pageData = this.pageDataEmit;
      setTimeout(() => {
        getStudentList(pageData).then(res => {
          this.tableData = res.data.list;
          this.loading = false;
        });
      }, 1000);
    }
  },
  created() {
    this.loading = true;
    var pageData = this.pageDataEmit;
    getStudentList(pageData).then(res => {
      this.tableData = res.data.list;
      this.total = res.data.totalRow;
      this.loading = false;
    });
    getDormList().then(res => {
      this.dorm = res.data.list;
    });
    getClassList().then(res => {
      this.clazz = res.data.list;
    });
  }
};
</script>

<style lang='scss' scoped>
.my-card {
  margin: 20px;
}
.search {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>