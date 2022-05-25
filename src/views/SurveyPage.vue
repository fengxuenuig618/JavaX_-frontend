
<template>
<el-scrollbar>
  <div class="survey-page">
    <el-form
      :model="surveyForm"
      :rules="fieldRules"
      label-position="top"
      label-width="200px"
      ref="surveyForm"
      class="survey-form"
      size="large"
    >
    <p style="font-size:25px">SURVEY</p>
      <el-divider></el-divider>

    <el-form-item prop="fill1" label="user name">
        <el-input
          type="text"
          v-model="surveyForm.fill1"
          auto-complete="off"
          placeholder="Please input your username"
        ></el-input>
      </el-form-item>



      <!-- 空行占位 -->
      

      <el-button type="success" @click="onSubmit('surveyForm')"
          plain>SUBMIT</el-button
        >
        <el-form-item> </el-form-item>

    </el-form>
  
  </div>
</el-scrollbar>
</template>


<script >


export default {
  name: "SurveyPage",
  data() {
        return {
          surveyForm: {
        uid:0,
        fill1:""
      },
            
        }
    },
    components:{

    },
    methods: {
        
    },
    created(){

    },
    mounted(){
      this.$bus.emit('headerNavigate', { navigation: "Survey" });
    }
  
};
</script>

<style scoped>
.survey-page {
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.survey-form {
  width: 30%;
  height: 100%;
  text-align:center;
}
</style>