<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <pagetools :showBefore="true">
      <span slot="before">我想你们</span>
    </pagetools>
    <imageupload></imageupload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
