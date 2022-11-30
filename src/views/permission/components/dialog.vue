<template>
  <div>
    <el-dialog
      :title="`确认${titleshow}权限点嘛？`"
      :visible="dialogVisible"
      width="50%"
      @close="close"
    >
      <!-- 放置表单 -->

      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <!-- :disabled="codedisabled" -->
          <el-input v-model="form.code" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="开启权限">
          <!--   switch开关：   active-value="1" //指定1就是开启状态
            inactive-value="0" //指定0就是关闭状态 -->
          <el-switch
            v-model="form.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  updatePermission,
  addPermission,
  getPermissionDetail,
} from "@/api/permission";
export default {
  name: "dialog123",
  props: {},
  components: {},
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", tirgger: "blur" },
        ],
        description: [
          { required: true, message: "权限描述不能为空", tirgger: "blur" },
        ],
      },
      form: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "1", // 开启
      },
      dialogVisible: false,
    };
  },
  computed: {
    titleshow() {
      return this.form.id ? "编辑" : "新增";
    },
    // codedisabled() {
    //   return this.form.id ? true : false;
    // },
  },
  watch: {},
  methods: {
    async addok() {
      await this.$refs.form.validate();
      // 确定添加
      if (this.form.id) {
        await updatePermission(this.form);
        this.$message.success("编辑成功");
      } else {
        await addPermission(this.form);
        this.$message.success("新增成功");
      }
      this.$parent.getPermissionList();
      this.dialogVisible = false;
    },
    close() {
      this.form = {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      };
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped >
</style>