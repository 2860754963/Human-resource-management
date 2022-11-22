<template>
  <div class="companyinfoinfo">
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      size="medium"
      style="width: 100%"
    >
      <el-form-item label="企业名称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="form.companyAddress" disabled></el-input>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="form.companyPhone" disabled></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.mailbox" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remarks" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getcompanyinfo } from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  name: "companyinfoindex",
  data() {
    return {
      form: {
        name: "",
        companyAddress: "",
        companyPhone: "",
        mailbox: "",
        remarks: "",
      },
    };
  },
  methods: {
    async getcompanyinfo() {
      this.form = await getcompanyinfo(this.compantid);
      console.log(this.form);
    },
  },
  created() {
    this.getcompanyinfo();
  },
  computed: {
    ...mapGetters(["compantid"]),
  },
};
</script> 

<style scoped >
</style>