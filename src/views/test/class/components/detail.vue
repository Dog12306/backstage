<template>
  <div class="detail-main">
    <el-dialog :title="detailTitle" :visible.sync="dialogFormVisible" width="80%" @open="clear">
      <el-card>
        <div slot="header">
          <span>班级信息</span>
        </div>
        <el-form :model="classAdd" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="班级类型">
                <el-radio-group v-model="classAdd.type">
                  <el-radio label="1">UI</el-radio>
                  <el-radio label="0">H5前端</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级名称">
                <el-input v-model="classAdd.className" placeholder="请输入班级名称" width="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开班时间" prop="dormStartTime">
                <el-date-picker
                  v-model="classAdd.startTime"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结课时间" prop="dormStartTime">
                <el-date-picker
                  v-model="classAdd.endTime"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级描述">
                <el-input type="textarea" v-model="classAdd.desc" placeholder="请输入班级描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addClasstList, upDataClasstList ,} from "@/api/class.js";
export default {
  name: "detail",

  data() {
    return {
      classAdd: {
        className: "",
        type: "",
        startTime: "",
        endTime: "",
        desc: "",
        typetext: ""
      },
      dialogFormVisible: false,
      confirmst: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed:{
      detailTitle(){
          if(this.confirmst == 0){
              return "新增班级信息"
          }else if(this.confirmst == 1){
              return "修改班级信息"
          }
      }
  },

  methods: {
      clear(){
          this.classAdd = {};
      },
    confirmSave() {
      this.dialogFormVisible = false;
      var classAdd = this.classAdd;
      if (this.confirmst == 0) {
        addClasstList({ xyClassInfo: { ...classAdd } }).then(res => {
          if (res.code) {
            this.$emit("refresh");
          }
        });
      } else if (this.confirmst == 1) {
        upDataClasstList({ xyClassInfo: { ...classAdd } }).then(res => {
          if (res.code) {
            this.$emit("refresh");
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
