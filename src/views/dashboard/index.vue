<template>
  <div class="dashboard-container">
    <!-- 头部内容 -->
    <el-card class="header-card">
      <div>
        <div class="fl headL">
          <div class="headImg">
            <img :src="staffphoto" v-imageerror="defaultimg" />
          </div>
          <div class="headInfoTip">
            <p class="firstChild">你好{{ name }}！祝你开心每一天！</p>
            <p class="lastChild">
              你好{{ name }}！欢迎来到：{{ userinfo.company }}，所属部门：{{
                userinfo.departmentName
              }}
            </p>
          </div>
        </div>
        <div class="fr" />
      </div>
    </el-card>
    <!-- 主要内容 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <el-col :span="13" style="padding-right: 26px">
        <!-- 工作日历 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>工作日历</span>
          </div>
          <!-- 放置日历组件 -->

          <!-- 日历组件 -->
          <workdata> </workdata>
        </el-card>
        <!-- 公告 -->
        <el-card class="box-card">
          <div class="advContent">
            <div class="title">公告</div>
            <div class="contentItem">
              <ul class="noticeList">
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="" />
                    <div>
                      <p>
                        <span class="col">朱继柳</span> 发布了
                        第1期“传智大讲堂”互动讨论获奖名单公布
                      </p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="" />
                    <div>
                      <p>
                        <span class="col">朱继柳</span> 发布了
                        第2期“传智大讲堂”互动讨论获奖名单公布
                      </p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="" />
                    <div>
                      <p>
                        <span class="col">朱继柳</span> 发布了
                        第3期“传智大讲堂”互动讨论获奖名单公布
                      </p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="11">
        <el-card class="box-card">
          <div class="header headTit">
            <span>流程申请</span>
          </div>
          <div class="sideNav">
            <el-button class="sideBtn" @click="showDialog = true"
              >离职申请</el-button
            >
            <el-button class="sideBtn" @click="$router.push('/attendances')"
              >请假调休</el-button
            >
            <el-button class="sideBtn" @click="$router.push('/approvals')"
              >审批列表</el-button
            >
            <el-button
              class="sideBtn"
              @click="$router.push(`employees/detail/${userinfo.id}`)"
              >我的信息</el-button
            >
          </div>
        </el-card>

        <!-- 绩效指数 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>绩效指数</span>
          </div>
          <!-- 放置雷达图 -->
          <Radar></Radar>
        </el-card>
        <!-- 帮助连接 -->
        <el-card class="box-card">
          <div class="header headTit">
            <span>帮助链接</span>
          </div>
          <div class="sideLink">
            <el-row>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconGuide" />
                  <p>入门指南</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconHelp" />
                  <p>在线帮助手册</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconTechnology" />
                  <p>联系技术支持</p>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 离职申请 弹出层 -->
    <el-dialog :visible="showDialog" title="离职申请" @close="btnCancel">
      <!-- 放置表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="离职时间" prop="time">
          <!-- 放置 日期选择器  datetime 选择日期时间-->
          <el-date-picker
            v-model="form.time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择离职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因" prop="reason">
          <!-- 放置 文字域 -->
          <el-input
            v-model="form.reason"
            type="textarea"
            placeholder="请输入离职原因"
          />
        </el-form-item>
      </el-form>
      <!-- 放置 离职按钮 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col>
          <el-button type="primary" @click="btnOK">确定</el-button>
          <el-button @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
import workdata from "./components/work_data.vue";
import Radar from "./components/radar";
// dao入离职审批 api
import { startProcess } from "@/api/approvals";
export default {
  name: "Dashboard",

  computed: {
    ...mapGetters(["name", "staffphoto"]),
    ...mapState(["userinfo"]),
  },
  data() {
    return {
      defaultimg: require("@/assets/common/head.jpg"),
      showDialog: false,
      form: {
        time: "",
        reason: "",
        processKey: "process_dimission", // 特定的审批
        processName: "离职",
      },
      rules: {
        time: [
          { required: true, message: "离职时间不能为空", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "离职原因不能为空", trigger: "blur" },
        ],
      },
      value1: "",
      reason: "",
    };
  },
  components: {
    workdata,
    Radar,
  },
  methods: {
    async btnOK() {
      await this.$refs.form.validate();
      const data = { ...this.form, userId: this.userinfo.userId };
      const res = await startProcess(data);
      console.log(res);
      this.$message.success("提交流程成功");
      this.showDialog = false;
    },
    btnCancel() {
      this.showDialog = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  li {
    list-style: none;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}

.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}
.header-card {
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
}

.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding: 18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p {
        padding: 0 0 8px;
      }
    }
  }
}
.noticeList {
  margin: 0;
  padding: 0;
}
.sideNav,
.sideLink {
  padding: 30px 0 12px;
  .sideBtn {
    padding: 16px 26px;
    font-size: 16px;
    margin: 10px 5px;
  }
}
.sideLink {
  text-align: center;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url("./../../assets/common/icon.png") no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
</style>
