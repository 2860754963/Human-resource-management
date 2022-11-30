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
          <el-button size="small" type="success" @click="assignadd(data.row.id)"
            >分配权限</el-button
          >
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
      layout="total,prev, pager, next"
      :total="page.total"
      :page-size="page.pagesize"
      :current-page="page.page"
      @current-change="changepage"
    >
    </el-pagination>
    <editrole ref="editrole" @updatarolesinfo="getroleinfolist()"></editrole>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%">
      <el-tree
        :data="data"
        :props="props"
        show-checkbox
        :check-strictly="true"
        :default-checked-keys="selectCheck"
        node-key="id"
        ref="tree"
      >
        <!-- 
        node-key  每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
           default-checked-keys 控制默认选中项
          check-strictly 让父子没有关联，意思就是 选中儿子  父亲不被选中 ，通常 一级代表页面访问权，二级代表 按钮控制权 -->
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getroleinfo,
  deleterole,
  getroledetails,
  assignPerm,
} from "@/api/setting";
import editrole from "./editrole.vue";
import { getPermissionList } from "@/api/permission";
import { translisttree } from "@/utils";
export default {
  components: {
    editrole,
  },
  data() {
    return {
      roleid: "",
      selectCheck: [],
      data: [],
      props: {
        label: "name",
        children: "children",
      },
      dialogVisible: false,
      tableData: [],
      page: {
        // 放置页码及相关数据
        page: 1, //当前页
        pagesize: 8, //每页条目数
        total: 0, // 记录总数
      },
    };
  },
  methods: {
    async btnok() {
      const res = await assignPerm({
        permIds: this.$refs.tree.getCheckedKeys(),
        id: this.roleid,
      });
      this.$message.success("分配权限成功");
      this.dialogVisible = false;
    },
    async getPermissionList() {
      const res = await getPermissionList();
      this.data = translisttree(res, "0");
    },

    async assignadd(id) {
      // 得到当前 角色 的 所对应的权限  将数据  回显
      const { permIds } = await getroledetails(id);
      this.selectCheck = permIds;
      console.log(this.selectCheck);
      this.dialogVisible = true;
      this.roleid = id;
    },
    addroles() {
      this.$refs.editrole.dialogFormVisible = true;
    },
    edit(id) {
      this.$refs.editrole.dialogFormVisible = true;
      this.$refs.editrole.getroledetails(id);
    },
    delte(id) {
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
    this.getPermissionList();
  },
};
</script> 

<style scoped lang="scss">
</style>