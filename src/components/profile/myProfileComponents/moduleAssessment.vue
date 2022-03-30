
<template>
  <div v-for="(module, index) in this.doneModules" :key="module">
      <div class="card-frame">
        <el-card class="my-card" style="background-color: #f2ffe5">
          <template #header>
            <div class="card-header" style="font-size: 25px">
              <span>{{ module.moduleTitle }}</span>
              <div style="float: right">score:{{ module.moduleScore }}</div>
            </div>
          </template>
          <el-row>
            <el-col :span="17">
              <div
                v-for="assessment in module.moduleAssessment"
                :key="assessment"
              >
                <span style="font-size:20px;">{{ assessment }}</span>
              </div>
            </el-col>


            <el-col :span="7" style="text-align: right;">
<div :id="'module_' + index" class="done-chart"></div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    <div>&nbsp;</div>
  </div>

  <el-row>
    <el-col :span="24">&nbsp;</el-col>
  </el-row>

  <div v-for="module in this.undoneModules" :key="module">
    <div class="card-frame">
        <el-card class="my-card" style="background-color: #d9d9d9">
          <template #header>
            <div class="card-header" style="font-size: 25px">
              <span>{{ module }}</span>
            </div>
          </template>
          <div style="font-size: 30px">UNDONE</div>
        </el-card>
    </div>
    <div>&nbsp;</div>
  </div>
</template>


<script >
export default {
  name: "ModuleAssessment",
  props: {
    doneModules: [],
    undoneModules: [],
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    getEchart(index) {
      var domId = "module_" + index;
      console.log("id=" + domId);
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(domId));
      // 绘制图表
      myChart.setOption({
        color:['green','red'],
        title: {
          text:(this.doneModules[index].quizRight /
              (this.doneModules[index].quizRight +
                this.doneModules[index].quizWrong)) *
              100 +
            "%",
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 20,
          },
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: this.doneModules[index].quizRight,
                name: "correct:" + this.doneModules[index].quizRight,
              },
              {
                value: this.doneModules[index].quizWrong,
                name: "wrong:" + this.doneModules[index].quizWrong,
              },
            ],
            radius: ["43%", "70%"],
          },
        ],
      });
    },
    initCharts() {
      this.$nextTick(() => {
        var len = this.doneModules.length;
        for (var i = 0; i < len; i++) {
          console.log(this.doneModules[i].moduleTitle);
          console.log("iiid:" + i);
          this.getEchart(i);
        }
      });
    },
  },
  created() {},
  mounted() {},
  watch: {
    doneModules: {
      handler(newVal, oldVal) {
        console.log(oldVal);
        if (newVal) {
          //如果数据变化则重新创建数据用于渲染
          this.initCharts(); //处理数据
        }
      },
      immediate: true,
      deep: true, //deep，默认值是 false，代表是否深度监听。
    },
  },
};
</script>

<style scoped>
.card-frame{
  display: flex;/*设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效*/
				display: -webkit-flex; /* Safari */
				flex-direction: column;/*容器内项目的排列方向(默认横向排列 row)*/
				flex-wrap: nowrap;/*容器内项目换行方式*/
				justify-content: center;/*项目在主轴上的对齐方式*/
				align-items: center;/*项目在交叉轴上如何对齐*/
				align-content: center;/*定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用*/
}
.done-chart {
  width: 280px;
  height: 200px;
  
}
.my-card{
  width: 1000px;
}
</style>