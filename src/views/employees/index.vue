<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetools :showBefore="true">
        <span slot="before"> 一共{{ this.page.total }}条记录 </span>
        <div slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">+ 新增员工</el-button>
        </div>
      </pagetools>
      <!-- 下方卡片 -->
      <el-card>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="150" align="center">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            width="120"
            align="center"
            :formatter="formatEmployment"
          >
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="入职时间" width="300" align="center">
            <template slot-scope="{ row }">{{
              row.timeOfEntry | formatDate
            }}</template>
          </el-table-column>

          <el-table-column
            prop="inServiceStatus"
            label="是否在职"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="enableState"
            label="状态"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="level" label="水平" width="100" align="center">
          </el-table-column>

          <el-table-column
            prop="workingCity"
            label="工作城市"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="230"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteroles(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            @current-change="pagechange"
            background
            layout="total, prev, pager, next"
            :page-size="page.size"
            :total="page.total"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getemployeeslist, deleteroles } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
export default {
  methods: {
    async deleteroles(obj) {
      await this.$confirm("您确定删除该员工吗");
      await deleteroles(obj.id);
      this.getemployeeslist();
      this.$message.success("删除员工成功");
    },
    pagechange(val) {
      this.page.page = val;
      this.getemployeeslist();
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    handleClick(row) {
      console.log(row);
    },
    async getemployeeslist() {
      const { rows, total } = await getemployeeslist(this.page);
      this.tableData = rows;
      this.page.total = total;
    },
  },

  data() {
    return {
      tableData: [],
      page: {
        page: 1, // 当前页码
        size: 5,
        total: 0, // 总数
      },
    };
  },
  created() {
    this.getemployeeslist();
  },
  computed: {},
};
</script>

<style>
</style>