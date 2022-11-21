<template>
  <el-dialog :title="showtitle" :visible="isshow" @close="cancel">
    <el-form :model="form" :rules="rules" ref="elfrom">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
        <el-input
          v-model="form.code"
          autocomplete="off"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门负责人"
        :label-width="formLabelWidth"
        prop="manager"
      >
        <el-select
          v-model="form.manager"
          placeholder="请选择负责人"
          @focus="getemployeessimply"
        >
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门介绍"
        :label-width="formLabelWidth"
        prop="introduce"
      >
        <el-input
          v-model="form.introduce"
          autocomplete="off"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="enteradd">{{ showbutton }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getdepartments,
  adddepartments,
  getdepartmentsdetials,
  updatedepartmentsdetials,
} from "@/api/departents";
import { getemployeessimply } from "@/api/employees";
export default {
  name: "add_departments_index",
  props: {
    isshow: {
      type: Boolean,
      default: false,
    },
    currentnode: {
      type: Object,
    },
  },
  components: {},
  data() {
    // 检查 部门名称
    const checkname = async (rules, value, callback) => {
      const { depts } = await getdepartments();
      var ispepeat = false; ///定义三元 变量数据
      // 先进行判断
      if (this.form.id) {
        console.log("检查 部门名称");
        // 编辑
        /**
         * 要求：同级部门中 除了我（因为数据库中已经存在原来的我），不能有重复 的数据
         * 这里不建议使用 this.form.id  因为会识别不到
         */
        ispepeat = depts
          .filter(
            (item) => item.id != this.form.id && item.pid === this.form.pid
          )
          .some((item) => item.name === value);
      } else {
        // 新增
        /*
         要求：同级部门中禁止出现重复部门 
        */
        const children = depts.filter(
          (item) => item.pid === this.currentnode.id
        );
        ispepeat = children.some((item) => item.name === value);
      }
      ispepeat ? callback(new Error(`同级下存在${value}`)) : callback();
    };
    // 检擦  部门编码
    const checkcode = async (rules, value, callback) => {
      /*
         要求：部门编码在整个模块中都不允许重复
        */
      const { depts } = await getdepartments();
      var ispepeat = false;
      if (this.form.id) {
        console.log("检擦  部门编码");
        // 编辑 状态下， 把自己排除 并且 全局 的 编码 不能一致
        ispepeat = depts.some(
          (item) => item.id !== this.form.id && item.code === value && value
        );
      } else {
        ispepeat = depts.some((item) => item.code === value && value);
      }

      ispepeat ? callback(new Error(`已经有部门使用${value}编码`)) : callback();
    };
    return {
      form: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkname, // 自定义函数的形式校验
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkcode,
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 1,
            max: 300,
            message: "部门介绍要求1-300个字符",
          },
        ],
      },

      formLabelWidth: "120px",
      list: [], ///员工简单信息
    };
  },
  computed: {
    showtitle() {
      return this.form.id ? "编辑部门" : "添加部门";
    },
    showbutton() {
      return this.form.id ? "确认编辑" : "确认添加";
    },
  },
  watch: {},
  methods: {
    // 根据 id 查询部门详情
    async getdepartmentsdatils(id) {
      // 这里  不是 直接传 this.currentnode.id 而是父组件 传过来
      // 因为 props 是异步的
      this.form = await getdepartmentsdetials(id); //直接赋值
      /*
        console.log(this.form); 
      这里赋值 的对象 中 包含 许多信息 
                code: "JSB"
                createTime: "2021-03-17 15:18:23"
                id: "6051ad90e93db6522c1d00d2"
                introduce: "技术部"
                manager: "孙财"
                name: "技术部"
                pid: ""
      */
    },
    cancel() {
      // 因为 我们是通过 this.form.id 来判断 弹层 标题的显示 和 按钮的显示
      //如果 点击  编辑 后 再次点击 添加  原本的表单中就会 存在 id 这是 就不会 切换显示了
      // 所以需要 手动 清空  就是重新赋值
      this.form = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };

      this.$emit("cancelshow");
      this.$refs.elfrom.resetFields(); ///只会清空   表单已经存在的 信息
    },
    enteradd() {
      //    先进行手动校验
      this.$refs.elfrom.validate(async (isok) => {
        if (isok) {
          // 进行  新增 和 编辑 的判断
          if (this.form.id) {
            // 如果id 存在 编辑部门
            await updatedepartmentsdetials(this.form); /// 这时的数据  是有 pid的 全部（ 许多信息 ）
          } else {
            // 不存在   新增部门
            await adddepartments({ ...this.form, pid: this.currentnode.id });
          }

          this.$emit("updatesuccess"); ///更新父组件数据
          this.$emit("update:isshow", false);
        }
      });
    },
    async getemployeessimply() {
      this.list = await getemployeessimply();
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped>
</style>