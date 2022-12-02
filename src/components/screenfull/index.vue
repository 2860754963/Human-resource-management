<template>
  <svg-icon
    icon-class="fullscreen"
    style="color: #fff; width: 20px; height: 20px"
    @click="changefull"
  ></svg-icon>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    changefull() {
      if (!screenfull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning("此时全屏组件不可用");
        return;
      }
      screenfull.toggle();
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="scss">
</style>