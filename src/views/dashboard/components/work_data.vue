<template>
  <div>
    <el-row type="flex" justify="end" class="rowel">
      <!-- 年选择 -->
      <el-select v-model="currentyear" size="small" style="width: 80px">
        <el-option
          v-for="item in yearlist"
          :key="item"
          :label="item"
          :value="item"
        >
          {{ item }}
        </el-option>
      </el-select>
      <!-- 月选择 -->
      <el-select
        v-model="currentmouth"
        size="small"
        style="width: 55px; margin-left: 10px"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <!-- //data.day 进行getDay过滤 //2021-09-21 | getDay 过滤之后结果：21
                //2021-09-01 | getDay 过滤之后结果：1 -->
          <span class="text"> {{ data.day | getDay }}</span>
          <!-- //如果是休息日，那么添加一个休 字 -->
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "work_data",
  props: {
    startdate: {
      ///传入当前 时间  给一个默认当前时间
      type: Date,
      default: () => new Date(),
    },
  },
  components: {},
  data() {
    return {
      value: new Date(),
      yearlist: [], ///放置 和今年 前后五年的 年份列表
      currentyear: null,
      currentmouth: null,
      currentDate: null,
    };
  },

  filters: {
    getDay(value) {
      // 2021-08-08  2021-08-18
      const day = value.split("-")[2]; // 08  18
      //如果是08那么就返回8
      return day.startsWith("0") ? day.substr(1) : day; // 8 18
    },
  },
  computed: {},
  watch: {},
  methods: {
    dateChange() {
      const year = this.currentyear;
      const month = this.currentmouth;
      //需求：如果年月份改变之后，我们让日历默认选中当月1号
      this.currentDate = new Date(`${year}-${month}-1`); // 以当前月的1号为起始
    },
    isWeek(value) {
      //getDay是获取星期几，如果是0是星期日，6是星期六
      return value.getDay() === 6 || value.getDay() === 0;
    },
  },
  created() {
    this.currentyear = this.startdate.getFullYear();
    this.currentmouth = this.startdate.getMonth() + 1;
    // 根据当前年份前后 加五年
    this.yearlist = Array.from(
      Array(11),
      (value, index) => this.currentyear + index - 5
    );

    this.dateChange();
  },
  mounted() {},
};
</script> 

<style scoped  lang='scss'>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>