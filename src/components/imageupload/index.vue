<template>
  <div class="">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="1"
      :file-list="fileList"
      :class="{ disabled: uploadadd }"
      :on-change="changefile"
      :before-upload="beforeupload"
      :http-request="httpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 实现 腾讯云 上传图片
import COS from "cos-js-sdk-v5"; ///导入SDK依赖
export default {
  name: "upimage",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [
        // {url:''}
      ],
      currentfileuid: "",
      showPercent: false,
      percent: 0,
    };
  },
  methods: {
    httpload(params) {
      // 覆盖默认的上传行为，可以自定义上传的实现 function
      // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
      console.log(params); ////这个是你 文件的对象 详情
      var cos = new COS({
        ///根据依赖包 new 出对象

        SecretId: "AKID36896aCrVHz7oeO8rZI7Vux6DSg2Txoe", // 身份识别 ID
        SecretKey: "ztrmbGjAiEjFwkhXTSTYm005Ouz7FSg0", // 身份密钥
      });
      if (params) {
        // https://cloud.tencent.com/document/product/436/64960  文件上传介绍
        cos.putObject(
          {
            Bucket: "nigulasi-1312809759" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file
              .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            Body: params.file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
            onProgress: (progressData) => {
              /// 注意哦 匿名函数更改  this指向，需要箭头函数
              // 这个是上传的 进度 函数，，用于 表示进度
              try {
                this.percent = progressData.percent * 100;
              } catch (error) {
                console.log(error);
              }
            },
          },
          (err, data) => {
            ////注意这里使用 匿名函数 this 指向 是 undefined，所以使用 箭头函数

            // 上传结果 处理

            if (!err && data.statusCode === 200) {
              //  上传 成功后 将  本地 得url 替换为 在线得url
              this.fileList.forEach((item) => {
                // 去找谁的uid等于刚刚记录下来的id
                if (
                  decodeURIComponent(data.Location).indexOf(item.name) !== -1
                ) {
                  // 将成功的地址赋值给原来的url属性
                  item.url = "http://" + data.Location;
                  item.upload = true;
                }
              });
              setTimeout(() => {
                //由于上传速度过快，导致看不到进度条，所以延时隐藏进度条
                this.showPercent = false; // 隐藏进度条
                this.percent = 0; // 进度归0
              }, 2000);
            }
          }
        );
      }
    },
    beforeupload(file) {
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。function(file)
      // 在上传前进行  文件类型 以及 文件大小的检查
      const type = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      console.log(file);
      if (!type.includes(file.type)) {
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        return false;
      }
      //  检查文件大小  这里的文件 大小 是 按照  b来计算

      const maxsize = 5 * 1024 * 1024; ///最大上传5M 图片
      if (file.size > maxsize) {
        this.$message.error("图片大小最大不能超过5M");
        return false; //停止上传
      }
      this.currentfileuid = file.uid;
      this.showPercent = true;
      return true; // 继续上传
    },
    changefile(file, fileList) {
      // 更改文件方法文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用function(file, fileList)
      //  这个 file  就是自己 上传 文件 的 实际内容 是一个文件对象
      if (file.status === "ready") {
        this.fileList.push(file);
      }
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      // 删除文件方法  执行后 fileList 会自动变为空 这时将 这个空数组  赋值给 自己定义的数组
      //   console.log(fileList);
      this.fileList = fileList; ///赋值 过去后 加号 图标才会显示
    },
    handlePictureCardPreview(file) {
      // 预览文件方法
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  computed: {
    uploadadd() {
      return this.fileList.length === 1;
    },
  },
};
</script> 

<style scoped  lang='scss'>
::v-deep .disabled .el-upload--picture-card {
  display: none;
}
</style>