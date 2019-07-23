<template>
  <div class="detail-main">
    <el-dialog :title="detailTitle" :visible.sync="dialogFormVisible" width="80%" @open="clear">
      <el-card>
        <div slot="header">
          <span>宿舍信息</span>
        </div>
        <el-form :model="dormAdd" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="宿舍类型">
                <el-radio-group v-model="dormAdd.type">
                  <el-radio label="1">女生宿舍</el-radio>
                  <el-radio label="0">男生宿舍</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍名称">
                <el-input v-model="dormAdd.name" placeholder="请输入宿舍名称" width="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍位置">
                <el-input v-model="dormAdd.position" placeholder="请输入宿舍名称" width="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开班时间" prop="dormStartTime">
                <el-date-picker
                  v-model="dormAdd.startTime"
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
                  v-model="dormAdd.endTime"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍描述">
                <el-input type="textarea" v-model="dormAdd.bak" placeholder="请输入宿舍描述"></el-input>
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
import { addDormList, updataDormList } from "@/api/dorm";
export default {
  name: "detail",

  data() {
    return {
      dormAdd: {},
      dialogFormVisible: false,
      confirmst: 0
    };
  },
  computed: {
    detailTitle() {
      if (this.confirmst == 0) {
        return "新增宿舍信息";
      } else if (this.confirmst == 1) {
        return "修改宿舍信息";
      }
    }
  },
  methods: {
    clear() {
      this.dormAdd = {};
    },
    pickerOptions() {},
    confirmSave() {
      var dormAdd = this.dormAdd;
      if (this.confirmst == 0) {
        addDormList({ xyDormInfo: { ...dormAdd } }).then(res => {
          console.log(res);
          this.dialogFormVisible = false;
          this.$emit("refresh");
        });
      } else if (this.confirmst == 1) {
        updataDormList({ xyDormInfo: { ...dormAdd } }).then(res => {
          this.dialogFormVisible = false;
          this.$emit("refresh");
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
