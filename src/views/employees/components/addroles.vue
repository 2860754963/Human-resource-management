<template>
  <div class="addroles">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="elform">
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入姓名"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input
            v-model="form.mobile"
            autocomplete="off"
            placeholder="请输入手机号"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="入职时间"
          :label-width="formLabelWidth"
          prop="timeOfEntry"
        >
          <el-date-picker
            v-model="form.timeOfEntry"
            align="right"
            type="date"
            placeholder="选择入职日期"
            style="width: 100%"
            :picker-options="pickerOptions1"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.correctionTime"
            align="right"
            type="date"
            placeholder="选择转正日期"
            style="width: 100%"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="工号"
          :label-width="formLabelWidth"
          prop="workNumber"
        >
          <el-input
            v-model="form.workNumber"
            autocomplete="off"
            placeholder="请输入工号"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          :label-width="formLabelWidth"
          prop="departmentName"
        >
          <el-select
            v-model="form.departmentName"
            placeholder="请选择部门"
            @focus="changedepartments"
            style="width: 100%"
          >
            <!-- 通过插槽，插入  树形结构 -->
            <template v-slot:empty>
              <el-tree
                v-show="showTree"
                :data="treelist"
                :props="defaultProps"
                v-loading="loading"
                @node-click="handleNodeClick"
              />
            </template>
          </el-select>
        </el-form-item>
        <!-- 对于聘用形式的处理  借助枚举 -->
        <el-form-item
          label="聘用形式"
          :label-width="formLabelWidth"
          prop="formOfEmployment"
        >
          <el-select
            style="width: 100%"
            v-model="form.formOfEmployment"
            placeholder="请选择聘用形式"
          >
            <el-option
              v-for="item in EmployeeEnum.hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrolesok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addroles } from "@/api/employees";
import { getdepartments } from "@/api/departents";
import { translisttree } from "@/utils";
// 导入枚举
import EmployeeEnum from "@/api/constant/employees";
export default {
  name: "addroles_index",
  data() {
    let validatemobile = (rule, value, callback) => {
      let reg_mobbie =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg_mobbie.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式错误"));
      }
    };
    return {
      // 进行定义 枚举
      EmployeeEnum,
      pickerOptions1: {
        // 选择时间
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      timeOfEntry: "",
      correctionTime: "",
      pickerOptions2: {
        // 选择时间
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogFormVisible: false,
      form: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        timeOfEntry: this.timeOfEntry,
        correctionTime: this.timeOfEntry,
        departmentName: "",
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
          { min: 1, max: 4, message: "用户名1-4位" },
        ],
        mobile: [
          {
            required: "true",
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            validator: validatemobile,
            trigger: "blur",
          },
        ],
        workNumber: [
          {
            required: "true",
            trigger: "blur",
            message: "工号不能为空",
          },
        ],
        formOfEmployment: [
          {
            required: "true",
            trigger: "change",
            message: "聘用形式不能为空",
          },
        ],
        timeOfEntry: [
          {
            trigger: "blur",
            required: "true",
            message: "入职时间不能为空",
          },
        ],
        departmentName: [
          {
            trigger: "change",
            required: "true",
            message: "部门不能为空",
          },
        ],
      },
      treelist: null, ////存放  树形 公司部门结构
      loading: false,
      showTree: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    addrolesok() {
      this.$refs.elform.validate(async (isok) => {
        if (isok) {
          try {
            await addroles(this.form);
            this.$parent.getemployeeslist();
            this.dialogFormVisible = false;
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    handleNodeClick(data) {
      console.log(data);
      this.showTree = false;
      this.form.departmentName = data.name;
    },
    async changedepartments() {
      this.loading = true;
      this.showTree = true;
      const { depts } = await getdepartments();
      //   在这里将  获得的部门 数据处理成 树形结构 在utils  下index.js translisttree
      this.treelist = translisttree(depts, "");
      console.log(this.treelist);
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped >
</style>