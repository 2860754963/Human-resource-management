<template>
  <div class="dashboard-container">
    <pagetools>
      <el-button
        slot="after"
        type="primary"
        size="mini"
        @click="addonepermission"
      >
        添加权限</el-button
      >
    </pagetools>

    <!-- 下方表格 -->
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="code" align="center" label="标识">
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 这里的需求： 二级 权限点没有添加 这个按钮 所以需要判断 
          由于 返回数据中的 一级权限 的 type都是1 二级权限的 type是2
          -->
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.type === 1"
              @click="addtwopermission(scope.row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editpermission(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="deletepermission(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--放置弹层 -->
    <dialogceng ref="dialogceng"></dialogceng>
  </div>
</template>

<script>
import {
  getPermissionDetail,
  delPermission,
  getPermissionList,
} from "@/api/permission"; //获取权限详情
import { translisttree } from "@/utils"; ///将数组数据转化为  包含children数组的 树形结构
import dialogceng from "./components/dialog.vue";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    async deletepermission(id) {
      // 删除 权限点
      try {
        await this.$confirm("确定要删除该数据吗");
        await delPermission(id);
        this.getPermissionList();
        this.$message.success("删除成功");
      } catch (error) {
        console.log(error);
      }
    },
    async editpermission(id) {
      // 编辑权限点
      this.$refs.dialogceng.form = await getPermissionDetail(id);

      this.$refs.dialogceng.dialogVisible = true;
    },
    addtwopermission(id) {
      // 新增 二级权限点
      this.$refs.dialogceng.form.type = 2;
      this.$refs.dialogceng.form.pid = id;
      this.$refs.dialogceng.dialogVisible = true;
    },
    addonepermission() {
      // 添加 一级权限点
      this.$refs.dialogceng.form.type = 1;
      this.$refs.dialogceng.form.pid = "0";
      this.$refs.dialogceng.dialogVisible = true;
    },
    async getPermissionList() {
      const res = await getPermissionList();
      this.tableData = translisttree(res, "0");
    },
  },
  components: {
    dialogceng,
  },
};
</script>

<style>
</style>