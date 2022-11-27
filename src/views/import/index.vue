<template>
  <div class="import">
    <uploadexcel :onSuccess="success"></uploadexcel>
  </div>
</template>

<script>
import { importroles } from "@/api/employees";
export default {
  name: "import_index",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 格式化 时间 函数
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    async success(a) {
      // 上传文件成功函数(上传到 输入框)
      console.log(a);
      /**
       * a 是一个对象
       * 其中header 数组包含了 文件第一行标题
       * 其中results 数组包含每一条数据的对象 ，这个对象是  每一条数据的 键值对形式
       *
       */
      const { header, results } = a;
      /**
       * 因为 上传文件  得到 的结果是  中文对应的，而上传接口  需要英文，符合接口规范 的 变量名
       *
       *所以将  中文的 键名 转为 英文的  键名
       */
      //   定义一个 对应关系
      console.log(results);
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      let newarr = [];
      results.forEach((obj) => {
        // obj 是 每一个 对象
        let newarr1 = {};
        Object.keys(obj).forEach((item) => {
          // item 是中文  键 名
          console.log(userRelations[item]);
          if (
            userRelations[item] === "timeOfEntry" ||
            userRelations[item] === "correctionTime"
          ) {
            newarr1[userRelations[item]] = new Date(
              this.formatDate(obj[item], "/")
            );
          } else {
            newarr1[userRelations[item]] = obj[item];
          }
        });
        newarr.push(newarr1);
      });
      console.log(newarr); ///拿到转换过的文件数据
      const res = await importroles(newarr);
      console.log(res);
      this.$message.success("导入excel成功");
      this.$router.back();
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped >
</style>