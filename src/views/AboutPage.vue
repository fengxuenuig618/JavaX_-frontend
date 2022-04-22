
<template>
  <el-scrollbar>
    <div class="page">
        <p>Rating</p>
        <el-rate v-model="rateValue" size="large" />
        <div class="review">
          <p>Review</p>
          <el-input
            v-model="review"
            :rows="3"
            type="textarea"
            placeholder="Please input"
          />
          <br><br>
          <el-button type="success" plain
          @click="submitReview()">Sumbit</el-button>
        </div>
        
        <br><br><br><br><br><br>
      <el-divider />
      <p>Report bug</p>
      <div class="review">
      <el-input
            v-model="reportBug"
            :rows="3"
            type="textarea"
            placeholder="Please input"
          />
          <br><br>
          <el-button type="primary" plain
          @click="submitReport()">Report</el-button>
          </div>
          <br><br><br><br>   
    </div>


  </el-scrollbar>
</template>



<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  name: "AboutPage",
  
  data() {
    return {
      rateValue: ref(),
      review:"",
      reportBug:"",
      transferData:{
        uid:0,
        userRating:"",
        userReview:"",
      },
      transferReport:{
        infoId:0,
        uid:0,
        reportInfo:"",
      },
      
    };
  },
  methods:{
    submitReview(){
      if(this.rateValue==0){
        ElMessage({
                showClose: true,
                message: "Please rate",
                type: "error",
       });
      }
      else if(this.review==""){
          ElMessage({
                showClose: true,
                message: "Review Empty",
                type: "error",
       });
      }
      else{
var _this = this;
      var url = "/apis/feedback/rating&review";   
      this.transferData.uid=localStorage.getItem("userid");
      this.transferData.userRating=this.rateValue;
      this.transferData.userReview=this.review;
      _this.$axios.post(url,this.$qs.stringify(this.transferData)).then((res) => {
         if (res.data.code == 200){
              ElMessage({
                showClose: true,
                message: "Submit success",
                type: "success",
              });

         }    
      });
      }
      
    },
    submitReport(){
      if(this.reportBug==""){
ElMessage({
                showClose: true,
                message: "Report Empty",
                type: "error",
       });
      }
      else{
var _this = this;
      var url = "/apis/feedback/reportBug";   
      this.transferReport.uid = localStorage.getItem("userid");
      this.transferReport.reportInfo = this.reportBug;
      _this.$axios.post(url,this.$qs.stringify(this.transferReport)).then((res) => {
        if (res.data.code == 200){
              ElMessage({
                showClose: true,
                message: "Report success",
                type: "success",
              });
         }    
      });
      }


      
    }
  },
  mounted(){
    this.$bus.emit('headerNavigate', { navigation: "About" });
  },
  created(){
      
  }
};
</script>
<style scoped>
.page {
  background-color: white;
  display: flex; /*设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效*/
  display: -webkit-flex; /* Safari */
  flex-direction: column; /*容器内项目的排列方向(默认横向排列 row)*/
  flex-wrap: nowrap; /*容器内项目换行方式*/
  justify-content: center; /*项目在主轴上的对齐方式*/
  align-items: center; /*项目在交叉轴上如何对齐*/
  align-content: center; /*定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用*/
  height: 100%;
  text-align: center;
}

.review {
  height: 80px;
  width: 600px;
}
</style>