<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetools :showBefore="true">
        <span slot="before"> 一共{{ this.page.total }}条记录 </span>
        <div slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="daochu"
            >全部导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="$refs.addroles.dialogFormVisible = true"
            :disabled="!checkbtnpermission('add-user')"
            >+ 新增员工</el-button
          >
        </div>
      </pagetools>
      <!-- 下方卡片 -->
      <el-card>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <!-- 头像显示 -->
          <el-table-column label="头像" align="center" width="120">
            <template slot-scope="{ row }">
              <!-- //如果头像地址加载失败，使用默认头像 -->
              <img
                v-imageerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showcode(row.staffPhoto)"
              />
            </template>
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
          <el-table-column label="入职时间" width="130" align="center">
            <!-- 使用插槽  拿到当前行数据 -->
            <!-- <template slot-scope="{ row }">{{
              row.timeOfEntry | formatDate
            }}</template> -->
            <template v-slot="{ row }">{{
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
          <el-table-column label="状态" width="100" align="center">
            <!-- prop="enableState" -->
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState == 1 ? true : false"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="水平" width="100" align="center">
          </el-table-column>

          <el-table-column
            prop="workingCity"
            label="工作城市"
            width="100"
            align="center"
            :formatter="formatworkcity"
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
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${scope.row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="role(scope.row)"
                >角色</el-button
              >
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
    <addroles ref="addroles"></addroles>
    <el-dialog title="头像二维码" :visible.sync="dialogVisible" width="30%">
      <el-row type="flex" justify="center">
        <canvas ref="canvas" />
      </el-row>
      <el-row type="flex" justify="center">
        建议使用微信扫码，查看头像！
      </el-row>
    </el-dialog>
    <assignrole ref="assignrole"></assignrole>
  </div>
</template>

<script>
import { getemployeeslist, deleteroles } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
import addroles from "./components/addroles.vue";
// 处理导出时间
import { formatDate } from "@/filters";
import QrCode from "qrcode";
import assignrole from "./components/assign_role.vue";
export default {
  methods: {
    async role(row) {
      this.showroledialog = true;
      this.$refs.assignrole.userinfo = row;
      await this.$refs.assignrole.getstaffinfo(row.id);
      this.$refs.assignrole.showroledialog = true;
    },
    showcode(staff) {
      if (staff) {
        this.dialogVisible = true;

        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.canvas, staff); // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        });
      } else {
        this.$message.warning("该用户还未上传头像");
      }
    },
    daochu() {
      // // 懒导入 第三方工具 ，成功后 执行  回调函数
      // import("@/vendor/Export2Excel").then(async (excel) => {
      //   excel.export_json_to_excel({
      //     header: ["姓名", "薪资"], //要求：导出的标题是中文
      //     //二维数组： 数组内部的元素还是数组
      //     data: [
      //       ["张三", 12000],
      //       ["李四", 5000],
      //     ], //要求： 数据要与标题的顺序对应上
      //     filename: "员工薪资表",
      //   });
      // });
      const headers = {
        姓名: "username",
        工号: "workNumber",
        部门名称: "departmentName",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        转正日期: "correctionTime",
        聘用形式: "formOfEmployment",
      };

      // 2.请求回来的数据  是 数组 中 每一条数据 是一个 对象
      // [{}], 需要将数据进行转换为 [[]]
      const multiHeader = [["姓名", "主要信息", "", "", "", "", "部门"]];
      const merges = ["A1:A2", "B1:F1", "G1:G2"];
      import("@/vendor/Export2Excel").then(async (excel) => {
        //1. 拿到  最新的 全部的 员工列表数据
        const { rows } = await getemployeeslist({
          page: 1,
          size: this.page.total,
        });
        console.log(rows);
        // 1. 导出文件存在  三个  必要 参数  heade ，data，filename
        // 定义一个 转换数据格式 的 方法
        const data = this.zhuanhuanshuju(rows, headers);
        excel.export_json_to_excel({
          // 这里的  header  要求 是一个数组
          header: Object.keys(headers),
          // 这里的 data 要求是一个  数组中存放每一条数据的数组
          data,
          filename: "集团员工信息表",
          multiHeader, // 复杂表头
          merges, // 合并选项
        });
      });
    },

    /**
     *  zhuanhuanshuju 规则转换
     *
     * 目标：将[{}] => [[]]
     *
     *
     */
    zhuanhuanshuju(rows, headers) {
      return rows.map((obj) => {
        ////这个得到的是 大数组中 嵌套每一个数据的小数组
        return Object.keys(headers).map((key) => {
          ///这个得到的是每一个值得数组
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(obj[headers[key]]); ////这个得到的是{}中的每一个值
          } else if (headers[key] === "formOfEmployment") {
            const obj1 = EmployeeEnum.hireType.find(
              (obj2) => obj2.id === obj[headers[key]]
            );
            console.log(obj1); ///得到的是每一个对象
            return obj1 ? obj1.value : "未知";
          }
          return obj[headers[key]]; ////这个得到的是{}中的每一个值
        });
      });
    },
    async deleteroles(obj) {
      await this.$confirm("您确定删除该员工吗");
      await deleteroles(obj.id);

      if (this.tableData.length === 1) {
        this.page.page--;
        this.getemployeeslist();
      } else {
        this.getemployeeslist();
      }
      this.$message.success("删除员工成功");
    },
    pagechange(val) {
      this.page.page = val;
      this.getemployeeslist();
    },
    formatworkcity(row, column, cellValue, index) {
      return cellValue ? cellValue : "系统未知";
    },
    formatEmployment(row, column, cellValue, index) {
      // 定义格式化 员工 类型
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "系统未知";
    },

    async getemployeeslist() {
      this.loading = true;
      const { rows, total } = await getemployeeslist(this.page);
      this.tableData = rows;
      this.page.total = total;
      this.loading = false;
    },
  },

  data() {
    return {
      showroledialog: false,
      dialogVisible: false,
      tableData: [],
      page: {
        page: 1, // 当前页码
        size: 5,
        total: 0, // 总数
      },
      loading: false,
    };
  },
  created() {
    this.getemployeeslist();
  },
  computed: {},
  components: {
    addroles,
    assignrole,
  },
};
</script>

<style>
</style>