<template>
  <el-row type="flex" justify="space-between" style="width: 100%">
    <!-- 左边 -->
    <el-col>
      <span>{{ treeData.name }}</span>
    </el-col>
    <!-- 右边 -->
    <el-col :span="8">
      <el-row type="flex" justify="end">
        <el-col>{{ treeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deldepartments } from "@/api/departents";

export default {
  name: "tree_node_index",
  props: {
    treeData: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleCommand(command) {
      if (command == "add") {
        // 增加部门
        this.$emit("addishow", this.treeData);
      } else if (command == "del") {
        // 删除部门
        this.$confirm(
          `确定删除 <strong >${this.treeData.name}</strong> 吗？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            dangerouslyUseHTMLString: true,
          }
        ).then(async () => {
          await deldepartments(this.treeData.id);
          this.$emit("deletdepartments");
        });
      } else {
        //编辑部门 显示 弹出层 并把 点击的id传过去
        this.$emit("editpartment", this.treeData.id);
      }
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped >
</style>