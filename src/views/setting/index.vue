<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="one"
            ><roleinfo></roleinfo
          ></el-tab-pane>
          <el-tab-pane label="公司信息" name="two">
            <companyinfo></companyinfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import companyinfo from "./components/companyinfo.vue";
import roleinfo from "./components/roleinfo.vue";
export default {
  data() {
    return {
      activeName: "one",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    companyinfo,
    roleinfo,
  },
};
</script>

<style scoped>
.box-card {
  padding: 40px;
}
</style>