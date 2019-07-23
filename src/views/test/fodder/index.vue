<template>
  <div class="fodder-main">
    <el-card>
      <div slot="header">
        <span>素材管理</span>
      </div>
      <el-button type="primary" @click="goAdd">添加</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-sizes="pageData.pageSize"
        :page-size="pageData.currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
      ></el-pagination>
      <el-table :data="fodderList" style="width: 100%">
        <el-table-column fixed prop="addTime" label="添加日期"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="url + scope.row.dir + '/' + scope.row.fileName" alt class="fodderImg" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="change(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="delFodder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import { getFodderList, delFodder } from "@/api/fodder";
import url from "@/api/url";
import detail from "./components/detail";
export default {
  name: "fodder",

  components: {
    detail
  },
  data() {
    return {
      fodderList: [],
      pageData: {
        start: 1,
        limit: 5,
        currentPage: 1,
        total: 25,
        pageSize: [5, 10, 15],
        currentSize: 5
      },
      url: url.host
    };
  },
  created() {
    console.log(this.url);
    this.getFodderList();
  },

  methods: {
    handleSizeChange(val) {
      this.pageData.limit = val;
      this.getFodderList();
    },
    handleCurrentChange(val) {
      this.pageData.start = val;
      this.getFodderList();
    },
    getFodderList() {
      var pageData = this.pageData;
      getFodderList(pageData).then(res => {
        console.log(res);
        this.fodderList = res.data.list;
        this.pageData.total = res.data.totalRow;
      });
    },
    goAdd() {
      this.$refs.detail.dialogVisible = true;
    },
    delFodder(id) {
      delFodder({ id: id });
    },
    change(id) {
      this.$refs.detail.dialogVisible = true;
      this.$refs.detail.confirmst = true;
      this.$refs.detail.title.id = id;
    }
  }
};
</script>

<style lang='scss' scoped>
.fodderImg {
  width: 100px;
  height: 100px;
}
</style>
