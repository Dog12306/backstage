<template>
  <div class="news-main">
    <el-card>
      <div slot="header">
        <span>新闻管理系统</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" @click="goAdd">添加</el-button>
        </el-col>
        <el-col :span="6">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageData.pageSize"
            :page-size="pageData.currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total"
          ></el-pagination>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="searchData.title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="searchData.author" placeholder="请输入作者"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="info" @click="back">重置</el-button>
        </el-col>
        
      </el-row>

      <el-table :data="newsList" style="width: 100%">
        <el-table-column fixed prop="addTime" label="添加时间"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt class="fodderImg" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="info">预览</el-button>
            <el-button type="warning" @click="goChange(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="delNewsList(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <detail ref="detail" @getNewsList="getNewsList"></detail>
  </div>
</template>

<script>
import {
  getNewsList,
  delNewsList,
  changeNewsList,
  newsDetail
} from "@/api/news";
import url from "@/api/url";
import detail from "./components/detail";
export default {
  name: "news",
  components: {
    detail
  },

  data() {
    return {
      newsList: [],
      pageData: {
        start: 1,
        limit: 5,
        pageSize: [5, 10, 15],
        currentSize: 5,
        currentPage: 1,
        total: 25
      },
      searchData:{
        title: "",
        author: ""
      },
      url: url.host
    };
  },
  created() {
    this.getNewsList();
  },

  methods: {
    getNewsList() {
      var pageData = this.pageData;
      getNewsList(pageData).then(res => {
        this.newsList = res.data.list;
        this.pageData.total = res.data.totalRow;
      });
    },
    handleSizeChange(val) {
      this.pageData.limit = val;
      this.getNewsList();
    },
    handleCurrentChange(val) {
      this.pageData.start = val;
      this.getNewsList();
    },
    goAdd() {
      this.$refs.detail.dialogVisible = true;
    },
    delNewsList(id) {
      delNewsList({ id: id }).then(res => {
        this.getNewsList();
      });
    },
    goChange(id) {
      newsDetail({ id: id }).then(res => {
        console.log(res);
        this.$refs.detail.dialogVisible = true;
        this.$refs.detail.cover = res.data.cover;
        this.$refs.detail.newsData = res.data;
      });
    },
    search(){
      var searchData = this.searchData
      getNewsList(searchData).then((res)=>{
        console.log(res);
        this.pageData.total = res.data.totalRow;
        this.newsList = res.data.list;
      })
    },
    back(){
      this.getNewsList();
    }
  }
};
</script>

<style lang='scss' scoped>
.fodderImg {
  height: 100px;
}
</style>
