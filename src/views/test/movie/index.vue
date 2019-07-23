<template>
  <div class="movie-main">
    <el-card class="my-card">
      <div slot="header">
        <span>电影</span>
      </div>
      <el-button @click="chooseType(0,'/in_theaters')" :class="{'el-button--primary':st[0]===1}">正在热映</el-button>
      <el-button @click="chooseType(1,'/coming_soon')" :class="{'el-button--primary':st[1]===1}">即将上映</el-button>
      <el-button @click="chooseType(2,'/top250')" :class="{'el-button--primary':st[2]===1}">TOP250</el-button>
      <el-table :data="movieList" style="width: 100%">
        <el-table-column prop="mname" label="片名"></el-table-column>
        <el-table-column prop="myear" label="年份"></el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img :src="'https://images.weserv.nl/?url=' + scope.row.mimg" alt class="mimg">
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import getMovie from "@/api/movie";
export default {
  name: "movie",

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      data: [],
      total: 0,
      url: '/in_theaters',
      st:[1,0,0],
      test: true
    };
  },
  computed: {
    movieList() {
      var tableData = [];
      for (var i in this.data) {
        tableData.push({
          mname: this.data[i].title,
          myear: this.data[i].year,
          mimg: this.data[i].images.small
        });
        // console.log(tableData[i].mimg);
      }
      return tableData;
    }
  },
  methods: {
    getMovie(val) {
      getMovie.getMovie(this.url, "?start=" + val + "&limit=5").then(res => {
        this.data = res.data.data;
        // console.log(res.data);
        this.total = res.data.count;
      });
    },
    pageChange(val) {
      this.getMovie(val);
    },
    chooseType(num,type){  
      this.url = type;
      // this.st = [0,0,0];
      for(var i in this.st){
        if(num == i){
          this.$set(this.st,i,1)
          // this.st[i] = 1
        }else{
          this.$set(this.st,i,0)
          // this.st[i] = 0
        }
      }
      this.getMovie(1)
    }
  },
  mounted() {
    this.getMovie(1)
  }
};
</script>

<style lang='scss' scoped>
.my-card {
  margin: 20px;
}
.mimg {
  height: 100px;
}
</style>
