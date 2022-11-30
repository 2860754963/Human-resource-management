<template>
  <el-dialog title="分配角色" :visible="showroledialog" @click="colsedialog">
    <el-checkbox
      :label="obj.id"
      v-for="obj in allrolelist"
      :key="obj.id"
      v-model="currentrole"
      >{{ obj.name }}</el-checkbox
    >
    <span slot="footer" class="dialog-footer">
      <el-button @click="colsedialog">取 消</el-button>
      <el-button type="primary" @click="assignroleok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getroleinfo } from "@/api/setting";
import { getstaffinfo } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  name: "assign_role_index",
  props: {},
  components: {},
  data() {
    return {
      checked1: true,
      userinfo: null,
      showroledialog: false,
      allrolelist: [],
      currentrole: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    async assignroleok() {
      // 分配 用户 权限
      await assignRoles({ id: this.userinfo.id, roleIds: this.currentrole });
      this.showroledialog = false;
    },
    async getstaffinfo(id) {
      const { roleIds } = await getstaffinfo(id);
      console.log(roleIds);
      this.currentrole = roleIds;
    },
    async getroleinfo() {
      ///获取所有角色 列表
      const { rows } = await getroleinfo({ page: 1, pagesize: 100 });
      console.log(rows);
      this.allrolelist = rows;
    },
    colsedialog() {
      this.showroledialog = false;
    },
  },
  created() {
    this.getroleinfo();
  },
  mounted() {},
};
</script> 

<style scoped >
</style>