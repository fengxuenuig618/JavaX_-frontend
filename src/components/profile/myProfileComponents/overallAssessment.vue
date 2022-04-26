
<template>
  <div class="overall-assessment">
    <el-row>
      <el-col :span="16">
        <span style="font-size: 40px"
          >YOUR SCORE: &nbsp;{{ this.profileData.overallScore }}</span
        >
      </el-col>
      <el-col :span="8" style="text-align: right">
        <div style="margin-top: 15px">
          <el-button type="success" @click="$router.push('/EditProfile')" plain
            >edit your setting</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row><el-col :span="24">&nbsp;</el-col></el-row>

    <el-row>
      <el-col :span="15">
        <div
          v-for="assessment in this.profileData.overallAssessment"
          :key="assessment"
        >
          <span style="font-size: 20px">{{ assessment }}</span>
        </div>        
      </el-col>
      <el-col :span="9">
        <div class="rate-chart" :id="'rateChart'"></div>
      </el-col>
    </el-row>
    <el-row>
      <div class="line-chart" :id="'lineChart'"></div>
    </el-row>
  </div>
</template>


<script >
export default {
  name: "OverallAssessment",
  props: {
    profileData: {},
  },
  data() {
        return {
          moduleTitles:[],
          moduleScore:[],
          finalScore:[],
            
        }
    },
    components:{

    },
    methods: {
      initCharts(){

      this.$nextTick(() => {
        this.getRateEchart();
        this.getLineEchart();
      });
    },
  getRateEchart() {
      var domId = "rateChart";
      // console.log("id=" + domId);
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(domId));
      // 绘制图表
      myChart.setOption({
        color:['green','red','grey'],
        title: {
          text:parseInt( (this.profileData.overallRight /
              (this.profileData.overallWrong +
                this.profileData.overallRight)) *
              100 )+
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
                value: this.profileData.overallRight,
                name: "correct:" + this.profileData.overallRight,
              },
              {
                value: this.profileData.overallWrong,
                name: "wrong:" + this.profileData.overallWrong,
              },
              {
                value: this.profileData.overallNone,
                name: "undone:" + this.profileData.overallNone,
              },
            ],
            radius: ["43%", "70%"],
          },
        ],
      });
    },
    getLineEchart(){
        //console.log(this.profileData);
      var len = this.profileData.doneModules.length;
      for(var i=0;i<len;i++){
        this.moduleTitles.push(this.profileData.doneModules[i].moduleTitle);
        this.moduleScore.push(this.profileData.doneModules[i].moduleScore);
        this.finalScore.push(this.profileData.overallScore);
      }



      var domId = "lineChart";
      // console.log("id=" + domId);
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(domId));
      myChart.setOption(
         {
  title: {
    text: 'Score Trend Graph'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Average score', 'Module score',]
  },
  toolbox: {
    feature: {
    
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: this.moduleTitles,
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'SCORE',
      min: 0,
      max: 100,
    }
  ],
  series: [
    {
      name: 'Average score',
      type: 'line',
      stack: 'x',
      areaStyle: {},
      data: this.finalScore,
    },
    {
      name: 'Module score',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: this.moduleScore,
    },
   
  ]
}
      );
       
    },
    },
    created(){

    },
    mounted(){
      
      
    },
watch: {
    profileData: {
      handler(newVal, oldVal) {
    
  
        console.log(oldVal);
  
        if (newVal.overallScore > 0) {
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
.overall-assessment {
  width: 850px;
}
.rate-chart {
  width: 360px;
  height: 200px;
}
.line-chart{
  width: 850px;
  height: 200px;
}
</style>