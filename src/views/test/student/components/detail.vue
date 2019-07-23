<template>
  <div class="detail-main">
    <el-dialog :title="detailTitle" :visible.sync="dialogFormVisible" width="80%" @open="clear">
      <el-form label-width="120px" :model="dataDetail" :rules="rules">
        <el-card :body-style="{margin:'20px'}" shadow="never">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="dataDetail.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="dataDetail.sex" placeholder="请选择性别">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级" prop="clazz">
                <el-select v-model="dataDetail.classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in clazz"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="tel">
                <el-input v-model="dataDetail.tel" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证" prop="manID">
                <el-input v-model="dataDetail.manID" placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" prop="city">
                <el-cascader v-model="dataDetailNew.city" :options="regionData" placeholder="请选择城市"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍" prop="dormId">
                <el-select v-model="dataDetail.dormId" placeholder="请选择宿舍">
                  <el-option
                    v-for="item in dorm"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入住日期" prop="dormStartTime">
                <el-date-picker
                  v-model="dataDetail.dormStartTime"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离开日期" prop="dormEndTime">
                <el-date-picker
                  v-model="dataDetail.dormEndTime"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never">
          <div slot="header">
            <span>补充信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="紧急联系人" prop="tel2">
                <el-input v-model="dataDetail.tel2" placeholder="请输入紧急联系人电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信" prop="wx">
                <el-input v-model="dataDetail.wx" placeholder="请输入微信"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="qq" prop="qq">
                <el-input v-model="dataDetail.qq" placeholder="请输入qq"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业院校" prop="school">
                <el-input v-model="dataDetail.school" placeholder="请输入毕业院校"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作" prop="job">
                <el-input v-model="dataDetail.job" placeholder="请输入工作"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never">
          <div slot="header">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="20">
                <span>缴费信息</span>
              </el-col>
              <el-col :span="4">
                <el-button type="text" v-show="!addCostSt" @click="goAddCost" size="small">添加缴费信息+</el-button>
              </el-col>
            </el-row>
          </div>
          <el-card v-show="addCostSt" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="类型" prop="costType">
                  <el-radio v-model="costadd.costType" label="0">学费</el-radio>
                  <el-radio v-model="costadd.costType" label="1">住宿费</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="金额" prop="costValue">
                  <el-input v-model="costadd.costValue" placeholder="请输入缴费金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="缴费时间" prop="costTime">
                  <el-date-picker
                    v-model="costadd.costTime"
                    value-format="yyyy-MM-dd"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="costadd.costBak" placeholder="请输入备注信息"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="marginBox">
                  <el-button @click="cancelAdd">取消</el-button>
                  <el-button type="primary" @click="confirmAdd">确定</el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-table :data="costListShow" style="width: 100%">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="costValue" label="金额" width="180"></el-table-column>
            <el-table-column prop="costTime" label="缴费日期" width="180"></el-table-column>
            <el-table-column prop="costBak" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="removeCost(scope.$index)"
                  v-show="!scope.row.id"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getClassList,
  getDormList,
  saveStudentInfo,
  upDataStudent
} from "@/api/student";
import { regionData } from "element-china-area-data";
export default {
  name: "detail",
  data() {
    return {
      dialogFormVisible: false,
      dataDetail: {
        name: "",
        sex: "",
        calssId: "",
        tel: "",
        manID: "",
        city: [],
        dorm: "",
        dormStartTime: "",
        dormEndTime: "",
        tel2: "",
        wx: "",
        qq: "",
        school: "",
        job: ""
      },
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
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "输入不合法", trigger: "blur" }
        ],
        clazz: [{ required: true, message: '请选择班级', trigger: 'change' }]
      },
      clazz: {},
      dorm: {},
      regionData: regionData,
      confirmst: 0,
      costList: [],
      costListNew: [],
      city: [],
      costadd: {
        costType: "",
        costTime: "",
        costValue: "",
        costBak: "",
        type: ""
      },
      addCostSt: false
    };
  },
  computed: {
    dataDetailNew() {
      if (this.dataDetail.city && !(this.dataDetail.city instanceof Array)) {
        this.dataDetail.city = this.dataDetail.city.split(",");
        return this.dataDetail;
      } else if (this.dataDetail.city == null) {
        this.dataDetail.city = [];
        return this.dataDetail;
      } else {
        return this.dataDetail;
      }
      return this.dataDetail;
    },
    costListShow() {
      var List = this.costList.concat(this.costListNew);
      for (var i in List) {
        if (List[i].costType == 0) {
          List[i].type = "学费";
        } else if (List[i].costType == 1) {
          List[i].type = "住宿费";
        }
      }
      return List;
    },
    _size() {
      return this.costListNew.length;
    },
    detailTitle() {
      if (this.confirmst == 0) {
        return "新增信息";
      } else if (this.confirmst == 1) {
        return "修改信息";
      }
    }
  },

  methods: {
    handleChange() {},
    cancelSave() {
      this.dialogFormVisible = false;
    },
    confirmSave() {
      var dataDetail = JSON.parse(JSON.stringify(this.dataDetail));
      if (
        dataDetail.city &&
        dataDetail.city instanceof Array &&
        dataDetail.city != []
      ) {
        dataDetail.city = dataDetail.city.join(",");
      } else {
        dataDetail.city = [];
      }
      var costListNew = this.costListNew;
      var DataNew = { xyUser: { ...dataDetail } };
      for (var i in costListNew) {
        DataNew["xyCostItems_" + i] = costListNew[i];
      }
      DataNew._size = this._size;
      if (this.confirmst === 0) {
        var xyUser = DataNew;
        saveStudentInfo(xyUser).then(res => {
          if (res.code == "success") {
            this.$emit("refresh");
            this.dialogFormVisible = false;
          }
        });
      } else {
        var xyUser = DataNew;
        upDataStudent(xyUser).then(res => {
          if (res.code == "success") {
            this.$emit("refresh");
            this.dialogFormVisible = false;
          }
        });
      }
    },
    goAddCost() {
      this.addCostSt = true;
    },
    cancelAdd() {
      this.addCostSt = false;
      this.costadd = {};
    },
    confirmAdd() {
      this.addCostSt = false;
      this.costListNew.push(this.costadd);
      console.log(this.costListNew, this.costadd);
      this.costadd = {};
    },
    removeCost(index) {
      this.costListNew.splice(index, 1);
      console.log(index, this.costListNew);
    },
    clear() {
      this.dataDetail = {};
      this.costListNew = [];
      this.costList = [];
    }
  },
  created() {
    // console.log(regionData);
    // console.log(this.$parent.searchBack);
    // this.regionData = ;
    getClassList().then(res => {
      this.clazz = res.data.list;
    });
    getDormList().then(res => {
      this.dorm = res.data.list;
    });
  }
};
</script>

<style lang='scss' scoped>
.marginBox {
  float: right;
}
.el-card {
  margin-bottom: 20px;
}
</style>
