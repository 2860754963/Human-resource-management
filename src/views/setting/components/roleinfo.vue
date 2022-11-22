<template>
  <div class="roleinfo">
    <el-button type="primary" round>+ 新增角色</el-button>
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
        <template>
          <el-button size="small" type="success">分配权限</el-button>
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
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
  </div>
</template>

<script>
import { getroleinfo } from "@/api/setting";
export default {
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