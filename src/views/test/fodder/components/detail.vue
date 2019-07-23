<template>
  <div class="detail-main">
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="70%">
      <el-input v-model="title.title" placeholder="请输入标题"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="'/admin/xy/upload/uploadImg'"
        :show-file-list="false"
        :disabled="confirmst"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" 
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import url from "@/api/url"
import { updateTitle ,delFodder} from "@/api/fodder";
export default {
  name: "Detail",

  data() {
    return {
      dialogVisible: false,
      title:{
          title: "",
          id: ""
      },
      imageUrl: "",
      url: url.host,
      confirmst: false
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
        console.log(res);
        this.imageUrl = this.url + res.url;
      if(confirmst == false){
          
          this.title.id = res.id;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    confirmAdd(){
        this.dialogVisible = false;
        var title = this.title;
        updateTitle(title);
    },
    cancleAdd(){
        this.dialogVisible = false;
        var id = this.title.id;
        delFodder({id:id});
    }
  }
};
</script>

<style lang='scss' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
