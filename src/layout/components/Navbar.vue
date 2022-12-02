<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="app-breadcrumb">
      济源尼古拉丝教育科技股份有限公司
      <span class="breadBtn">内测开发版：0.0.0.5</span>
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <!-- 放置全屏组件 -->
      <screenfull class="screenfull"></screenfull>
      <!--放置换肤组件 -->
      <themepick class="themepicker"></themepick>
      <!-- 放置 奇幻语言组件 -->
      <lang class="language"></lang>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="staffphoto"
            class="user-avatar"
            v-imageerror="defaultImg"
          />
          <span class="name">你好，{{ name }}！</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/2860754963/Human-resource-management"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录😨</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "name", "staffphoto"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
  },
  data() {
    return {
      defaultImg: require("@/assets/common/head.jpg"), ///通过加载的方式读取 是node 中的写法
    };
  },
};
</script>

<style lang="scss" scoped>
.language {
  position: absolute;
  top: 5px;
  right: 321px;
}
.themepicker {
  position: absolute;
  top: 16px;
  right: 368px;
}
.screenfull {
  position: absolute;
  top: 22px;
  right: 180px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          ///修改样式
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          ///增加样式
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }
        .user-dropdown {
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
