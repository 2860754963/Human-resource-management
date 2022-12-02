<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// 完成加载过程
// var echarts = require('echarts')
var echarts = require("echarts/lib/echarts"); // 引入echarts主模块
require("echarts/lib/chart/radar"); // 引入雷达图
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend"); //注意: 视频中没有导入图例组件 , 这样的话 , 标题右侧的 张三和李四  就无法看到

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv); // 得到图表实例
    myChart.setOption({
      title: {
        text: "基础雷达图",
      },
      tooltip: {},
      legend: {
        //data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'] // 这个是有问题的 , 如果与series的data的name不一致,则无法显示
        data: ["张三", "李四"], // 这个data的内容应与下方series的data的name保持一致才能正常显示 , 他的效果就是显示图例
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        // 每个区域的最高值
        indicator: [
          { name: "工作效率", max: 100 },
          { name: "考勤", max: 100 },
          { name: "积极性", max: 100 },
          { name: "帮助同事", max: 100 },
          { name: "自主学习", max: 100 },
          { name: "正确率", max: 100 },
        ],
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: [30, 35, 20, 45, 60, 55],
              name: "张三",
            },
            {
              value: [50, 50, 50, 50, 50, 10],
              name: "李四",
            },
          ],
        },
      ],
    });
  },
};
</script>

<style>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>