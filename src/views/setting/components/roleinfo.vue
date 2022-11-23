<template>
  <div class="roleinfo">
    <el-button type="primary" round @click="addroles">+ 新增角色</el-button>
    <el-table
      border
      :data="tableData"
      style="width: 100%; margin-top: 20px; margin-bottom: 20px"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column type="index" label="序号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="角色名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="data">
          <el-button size="small" type="success">分配权限</el-button>
          <el-button size="small" type="primary" @click="edit(data.row.id)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="delte(data.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pagesize"
      :current-page="page.page"
      @current-change="changepage"
    >
    </el-pagination>
    <editrole ref="editrole" @updatarolesinfo="getroleinfolist()"></editrole>
  </div>
</template>

<script>
import { getroleinfo, deleterole } from "@/api/setting";
import editrole from "./editrole.vue";
export default {
  components: {
    editrole,
  },
  data() {
    return {
      tableData: [],
      page: {
        // 放置页码及相关数据
        page: 1, //当前页
        pagesize: 2, //每页条目数
        total: 0, // 记录总数
      },
    };
  },
  methods: {
    addroles() {
      this.$refs.editrole.dialogFormVisible = true;
    },
    edit(id) {
      console.log(id);
      this.$refs.editrole.dialogFormVisible = true;
      this.$refs.editrole.getroledetails(id);
    },
    delte(id) {
      console.log(id);
      // 弹出对话框
      this.$confirm("确定删除此角色吗？", "删除角色？", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消返回",
        type: "warning",
      })
        .then(async () => {
          await deleterole(id);

          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 重新刷新（获取）列表

          this.getroleinfolist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formatter(row, column) {
      return row.address;
    },
    async getroleinfolist() {
      const { total, rows } = await getroleinfo(this.page);
      this.page.total = total;
      this.tableData = rows;
      console.log(this.page.total);
      console.log(this.tableData);
    },
    changepage(clickpage) {
      this.page.page = clickpage;
      this.getroleinfolist();
    },
  },
  created() {
    this.getroleinfolist();
  },
};
</script> 

<style scoped lang="less">
</style>