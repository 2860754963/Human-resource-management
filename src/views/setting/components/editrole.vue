<template>
  <el-dialog
    :title="showtitle"
    :visible.sync="dialogFormVisible"
    :before-close="closeedit"
  >
    <el-form :model="form" :rules="rules" ref="elform">
      <el-form-item
        label="公司ID"
        :label-width="formLabelWidth"
        prop="companyId"
      >
        <el-input
          v-model="form.companyId"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="角色ID" :label-width="formLabelWidth" prop="id">
        <el-input v-model="form.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeedit">取 消</el-button>
      <el-button type="primary" @click="enteradd">{{ showbutton }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getroledetails, updateroles, addroles } from "@/api/setting";
export default {
  name: "editrole_index",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        id: "",
        description: "",
        companyId: "",
      },
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "角色名称不能为空",
          },
        ],
        description: [
          {
            required: true,
            trigger: "blur",
            message: "角色描述不能为空",
          },
        ],
      },

      formLabelWidth: "120px",
    };
  },
  methods: {
    closeedit() {
      this.$refs.elform.resetFields();
      this.dialogFormVisible = false;
    },
    async getroledetails(id) {
      this.form = await getroledetails(id);
    },
    enteradd() {
      this.$refs.elform.validate(async (idok) => {
        if (idok) {
          ///因为新增 和 编辑用的  都是同一个 校验规则 都是对 名称和 描述进行校验
          if (this.form.id != "") {
            // 编辑
            await updateroles(this.form);
          } else {
            // 新增
            await addroles(this.form);
          }
          this.$emit("updatarolesinfo");
          this.dialogFormVisible = false;
          this.$message.success("操作成功");
        }
      });
    },
  },
  created() {},
  computed: {
    showtitle() {
      return this.form.id != "" ? "编辑角色" : "新增角色";
    },
    showbutton() {
      return this.form.id != "" ? "确定编辑" : "确定新增";
    },
  },
};
</script>

<style scoped >
</style>