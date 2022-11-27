<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录账户设置" name="first">
        <el-form
          label-width="120px"
          style="margin-left: 120px; margin-top: 30px"
          :rules="rules"
          :model="userinfo"
        >
          <el-form-item label="姓名:" prop="name">
            <el-input style="width: 300px" v-model="userinfo.username" />
          </el-form-item>
          <el-form-item label="密码:" prop="password2">
            <el-input
              style="width: 300px"
              type="password"
              v-model="userinfo.password2"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateuserinfo"
              >更新信息</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人详情" name="second">
        <component :is="userinfo_index"></component>
      </el-tab-pane>
      <el-tab-pane label="岗位信息" name="third">
        <component :is="jobinfo_index"></component>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getstaffinfo } from "@/api/user";
import { saveuserinfo } from "@/api/employees";
import userinfo from "./userinfo.vue";
import jobinfo from "./jobinfo";
export default {
  name: "detail_index",
  props: {},
  components: {
    userinfo,
    jobinfo,
  },
  data() {
    return {
      jobinfo_index: "jobinfo",
      userinfo_index: "userinfo",

      activeName: "first",
      userinfo: {
        username: "",
        password2: "",
      },
      userid: this.$route.params.id,
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
          { min: 2, max: 4, trigger: "blur", message: "用户名必须在2-4位之间" },
        ],
        password2: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空",
          },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    async updateuserinfo() {
      try {
        this.userinfo.password = this.userinfo.password2;
        await saveuserinfo({
          ...this.userinfo,
          password: this.userinfo.password2,
        });
        this.$message.success("更新信息成功");
      } catch (error) {
        console.log(error);
      }
    },
    handleClick() {},
    async getstaffinfo() {
      this.userinfo = await getstaffinfo(this.userid);
    },
  },
  created() {
    this.getstaffinfo();
  },
  mounted() {},
};
</script> 

<style scoped >
</style>