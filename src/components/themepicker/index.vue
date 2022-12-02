<template>
  <!-- 切换颜色 实现原理：

因为是模板，所以掌握颜色 的就是 那几个变量，修改 几个变量的值 修改 颜色主题

1.通过 package.json拿到 element-ui的版本号，根据版本号 请求响应的 样式

2.拿到样式之后 通过 正则匹配和替换 将颜色替换掉

3.动态添加 style 标签 覆盖原有的 css样式
 -->
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
const version = require("element-ui/package.json").version; ///导入el的版本号
const ORIGINAL_THEME = "#409EFF"; // 默认颜色
export default {
  data() {
    return {
      chalk: "", // content of theme-chalk css
      theme: "",
    };
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme;
    },
  },
  watch: {
    defaultTheme: {
      handler: function (val, oldVal) {
        this.theme = val;
      },
      immediate: true,
    },
    async theme(val) {
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
      if (typeof val !== "string") return;
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      console.log(themeCluster, originalCluster);
      const $message = this.$message({
        message: "  Compiling the theme",
        customClass: "theme-message",
        type: "success",
        duration: 0,
        iconClass: "el-icon-loading",
      });
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        await this.getCSSString(url, "chalk");
      }
      const chalkHandler = getHandler("chalk", "chalk-style");
      chalkHandler();
      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter((style) => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach((style) => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
      this.$emit("change", val);
      $message.close();
    },
  },
  methods: {
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, variable) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
            resolve();
          }
        };
        xhr.open("GET", url);
        xhr.send();
      });
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `#${red}${green}${blue}`;
        }
      };
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
      };
      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
  },
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
.el-color-picker {
  height: auto !important;
}
</style>
