<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <!-- el-card -->
      <el-card class="box-card">
        <!-- 上边 的  组件 -->
        <treeNode :treeData="jituan" :isRoot="true" @addishow="adx"></treeNode>
        <hr />

        <!-- 内容 树形 -->
        <el-tree
          :data="departents"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <!-- 使用 scoped slot 插槽 会传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
          <!-- :treeData="data" 这是把当前行数据给传递过去 -->
          <treeNode
            slot-scope="{ data }"
            :treeData="data"
            @deletdepartments="getdepartents"
            @addishow="adx"
            @editpartment="editpartment"
          ></treeNode>
        </el-tree>
      </el-card>
      <!-- el-card -->
    </div>
    <adddepartments
      :isshow.sync="addishow"
      @cancelshow="addishow = false"
      :currentnode="node"
      @updatesuccess="getdepartents"
      ref="adddept"
    ></adddepartments>
  </div>
</template>

<script>
import treeNode from "./components/tree_node.vue";
import { getdepartments } from "@/api/departents";
import { translisttree } from "@/utils";
import adddepartments from "./components/add_departments.vue";
export default {
  data() {
    return {
      jituan: {},
      defaultProps: {
        label: "name", // label默认的值是:'label'
        children: "children", //这个可以省略，children默认的就是'children'
      },
      departents: [],
      addishow: false,
      node: null, ///当前点击的node
      loading: false, // 用来控制进度弹层的显示和隐藏
    };
  },
  methods: {
    editpartment(id) {
      // 编辑部门
      this.addishow = true;
      // 通过 refs 获取组件实例 对象
      this.$refs.adddept.getdepartmentsdatils(id);
    },
    adx(node) {
      this.addishow = true;
      this.node = node;
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    // 获得 部门方法
    async getdepartents() {
      this.loading = true; //获取前，改为true
      const res = await getdepartments();
      this.jituan = { name: res.companyName, manager: "责任人", id: "" }; ///这里的id为空 是 后边 some方法 用判断
      this.departents = translisttree(res.depts, "");
      this.loading = false; //获取后，改为false
    },
  },
  components: {
    treeNode,
    adddepartments,
  },
  created() {
    this.getdepartents();
  },
};
</script>

<style scoped>
.box-card {
  padding: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>