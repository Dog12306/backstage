<template>
  <div class="detail.vue">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      @close="clear"
      @open="updata"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <span>新增新闻</span>
      <el-card>
        <div id="copy-box">
          <el-input v-model="imgUrl" placeholder="请输入内容" id="copy"></el-input>
        </div>

        <el-form ref="form" :model="newsData" label-width="150px">
          <el-form-item label="标题">
            <el-input v-model="newsData.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="newsData.author" placeholder="请输入作者"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-button type="primary" @click="addImg" v-if="!cover">选择封面图片</el-button>
            <img :src="cover" alt v-if="cover" @click="addImg" id="cover" />
          </el-form-item>
          <el-form-item label="素材图片" v-show="getImg">
            <el-card id="fodder-box">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.currentPage"
                :page-sizes="pageData.pageSize"
                :page-size="pageData.currentSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.total"
              ></el-pagination>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="6" v-for="(i,index) in fodderList" :key="index" class="fodder">
                  <el-radio
                    v-model="newsData.cover"
                    :label="url + i.dir + '/' + i.fileName"
                    @change="copy"
                  >
                    <img :src="url + i.dir + '/' + i.fileName" alt class="fodder-img" />
                  </el-radio>
                  <p class="fodder-text">{{' ' + i.title + ' '}}</p>
                </el-col>
              </el-row>
              <div class="btn-box" v-show="!copyst">
                <el-button type="primary" @click="confirmImg">选中图片</el-button>
                <el-button type="info" @click="cancelImg">取消选择</el-button>
              </div>
              <div class="btn-box" v-show="copyst">
                <el-button type="info" @click="getImg = false">关闭</el-button>
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="内容描述">
            <el-input type="textarea" v-model="newsData.desc"></el-input>
          </el-form-item>
          <el-form-item label="编辑内容格式">
            <el-radio-group v-model="newsData.type" @change="editor">
              <el-radio label="0">富文本</el-radio>
              <el-radio label="1">Markdown</el-radio>
            </el-radio-group>
            <el-button type="primary" @click="getImgUrl">图片素材库</el-button>
          </el-form-item>
          <el-form-item label="编辑器">
            <el-card>
              <div v-show="newsData.type==0" :key = key>
                <tinymce v-model="newsData.content2" :height="300" />
              </div>
              <div v-show="newsData.type==1" :key = key1>
                <markdown-editor
                  ref="markdownEditor"
                  v-model="newsData.content1"
                  :language="'zh'"
                  height="500px"
                />
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFodderList } from "@/api/fodder";
import { addNewsList, changeNewsList } from "@/api/news";
import Tinymce from "@/components/Tinymce";
import MarkdownEditor from "@/components/MarkdownEditor";
import url from "@/api/url";
export default {
  name: "detail.vue",
  components: {
    Tinymce,
    MarkdownEditor
  },

  data() {
    return {
      content1: "",
      content2: "",
      dialogVisible: false,
      newsData: {
        title: "",
        author: "",
        cover: "",
        type: "0",
        desc: "",
        hot: "1",
        content1: "",
        content2: "",
        zanCount: "999",
        viewCount: "999"
      },
      fodderList: [],
      getImg: false,
      url: url.host,
      pageData: {
        start: 1,
        limit: 4,
        pageSize: [4, 8, 12],
        currentSize: 5,
        currentPage: 1,
        total: 25
      },
      cover: "",
      imgUrl: "",
      copyst: false,
      key: "",
      key1: "",
    };
  },
  created() {
    this.getFodderList();
  },

  methods: {
    getFodderList() {
      var pageData = this.pageData;
      getFodderList(pageData).then(res => {
        this.fodderList = res.data.list;
        this.pageData.total = res.data.totalRow;
      });
    },
    handleSizeChange(val) {
      this.pageData.limit = val;
      this.getFodderList();
    },
    handleCurrentChange(val) {
      this.pageData.start = val;
      this.getFodderList();
    },
    confirmImg() {
      this.getImg = false;
      this.cover = this.newsData.cover;
    },
    cancelImg() {
      this.getImg = false;
      this.newsData.cover = this.cover;
    },
    addImg() {
      this.getImg = true;
      this.copyst = false;
    },
    editor(val) {
      if (val == 1) {
        this.content1 = this.newsData.content1;
        this.newsData.content1 = this.content2;
      } else if (val == 0) {
        this.content2 = this.newsData.content1;
        this.newsData.content1 = this.content1;
      }
    },
    confirmAdd() {
      if (this.newsData.cover != this.cover) {
        this.newsData.cover = this.cover;
      }
      this.newsData.content2 = this.$refs.markdownEditor.getHtml();
      console.log(this.$refs.markdownEditor.getHtml());
      var newsData = this.newsData;
      if (newsData.id) {
        changeNewsList({ xyNews: newsData }).then(res => {
          this.$emit("getNewsList");
          this.dialogVisible = false;
        });
      } else {
        addNewsList({ xyNews: newsData }).then(res => {
          this.$emit("getNewsList");
          this.dialogVisible = false;
        });
      }
    },
    clear() {
      if (this.newsData.cover != this.cover) {
        this.newsData.cover = this.cover;
      }
      this.newsData = { type: "0" };
      this.content1 = "";
      this.content2 = "";
      this.cover = "";
      this.getImg = false;
    },
    updata(){
      this.key = new Date().getTime();
      this.key1 = new Date().getTime() + 1;
    },
    copy() {
      const copyInput = document.querySelector("#copy");
      if (this.copyst) {
        this.imgUrl = this.newsData.cover;
        this.$nextTick(() => {
          copyInput.select();
          document.execCommand("copy");
          this.$message("复制成功");
        });
      }
    },
    getImgUrl() {
      this.copyst = true;
      this.getImg = true;
    }
  }
};
</script>

<style lang='scss' scoped>
#fodder-box {
  .fodder {
    margin: 10px 0;
    .fodder-img {
      height: 200px;
      width: 100%;
    }
    .fodder-text {
      text-align: center;
    }
  }
  .btn-box {
    float: right;
  }
}
#cover {
  width: 200px;
  height: 200px;
}
#copy-box {
  position: absolute;
  opacity: 0;
}
</style>
