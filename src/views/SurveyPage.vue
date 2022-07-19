
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
    
      <el-divider></el-divider>

    <p style="font-size: 20px">
      What do you think about the quantity of preQuiz?</p>
      <el-form-item prop="ans1" >
    <el-select v-model="surveyForm.ans1" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option1"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      
    
  
      <p style="font-size: 20px">
        How difficult do you think preQuiz is?
      </p>


<el-form-item prop="ans2" >
    <el-select v-model="surveyForm.ans2" class="m-2" placeholder="Select" size="large"> 
    <el-option
      v-for="item in option.option2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
   
  </el-select>
  </el-form-item >

    
  

      <p style="font-size: 20px">
        What do you think of the recommender after preQuiz?
      </p>
      <el-form-item prop="ans3" >
    <el-select v-model="surveyForm.ans3" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option3"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        How do you feel about the difficulty of total?
      </p>
      <el-form-item prop="ans4" >
    <el-select v-model="surveyForm.ans4" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option4"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        Do you think toturial is helpful to you?</p>
        <el-form-item prop="ans5" >
    <el-select v-model="surveyForm.ans5" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option5"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        What do you think about the quantity of Quiz?
      </p>
      <el-form-item prop="ans6" >
    <el-select v-model="surveyForm.ans6" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option6"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        How difficult do you think Quiz is?
      </p>
      <el-form-item prop="ans7" >
    <el-select v-model="surveyForm.ans7" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option7"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        Do you find quiz helpful for reviewing tutorials?
      </p>
      <el-form-item prop="ans8" >
    <el-select v-model="surveyForm.ans8" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option8"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        What do you think of the score of the profile page?
      </p>
      <el-form-item prop="ans9" >
    <el-select v-model="surveyForm.ans9" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option9"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        Do you think the profile page is accurate for your analysis?
      </p>
    <el-form-item prop="ans10" >
    <el-select v-model="surveyForm.ans10" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option10"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

      <p style="font-size: 20px">
        Do you think the profile page is helpful for your study?
      </p>
    <el-form-item prop="ans11" >
    <el-select v-model="surveyForm.ans11" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in option.option11"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-form-item >

 

      <!-- 空行占位 -->
      

      
      <el-form-item></el-form-item>

        <el-form-item>   
        </el-form-item>

      <el-button type="success" @click="onSubmit('surveyForm')"
          plain>SUBMIT</el-button>
          <el-form-item> </el-form-item>
        <el-form-item> </el-form-item>
    </el-form>
  
  </div>
</el-scrollbar>
</template>


<script >
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
  name: "SurveyPage",
  data() {
        return {
          surveyForm: {
        uid:0,
        ans1: "",
        ans2: ref(""),
        ans3: ref(""),
        ans4: ref(""),
        ans5: ref(""),
        ans6: ref(""),
        ans7: ref(""),
        ans8: ref(""),
        ans9: ref(""),
        ans10: ref(""),
        ans11: ref(""),
      },
      transferForm:{
        uid:0,
        surveyQuestion1:"",
        surveyQuestion2:"",
        surveyQuestion3:"",
        surveyQuestion4:"",
        surveyQuestion5:"",
        surveyQuestion6:"",
        surveyQuestion7:"",
        surveyQuestion8:"",
        surveyQuestion9:"",
        surveyQuestion10:"",
        surveyQuestion11:"",
      },
      
      fieldRules: {
        ans1: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans2: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans3: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans4: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans5: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans6: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans7: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans8: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans9: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans10: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        ans11: [
          { required: true, message: "please select", trigger: "blur" },
        ],

        
      },
      option:{
        option1:[
       {
            value: "1",
            label: "too little",
        },
        {
            value: "2",
            label: "moderate",
        },
        {
            value: "3",
            label: "too mutch",
        },
      ],
      option2:[
      {
            value: 1,
            label: "too eazy",
        },
        {
            value: 2,
            label: "moderate",
        },
        {
            value: 3,
            label: "too difficult",
        },
      ],
      option3:[
      {
            value: 1,
            label: "The recommender system skipped some tutorials that I never followed.",
        },
        {
            value: 2,
            label: "The recommender system nicely skips the tutorial I have mastered.",
        },
        {
            value: 3,
            label: "There are some course recommender systems that I have learned that are not skipped.",
        },
      ],
      option4:[
      {
            value: 1,
            label: "too eazy",
        },
        {
            value: 2,
            label: "moderate",
        },
        {
            value: 3,
            label: "too difficult",
        },
      ],
      option5:[
       {
            value: 1,
            label: "no help",
        },
        {
            value: 2,
            label: "helpful",
        },
      ],
      option6:[
       {
            value: 1,
            label: "too little",
        },
        {
            value: 2,
            label: "moderate",
        },
        {
            value: 3,
            label: "too mutch",
        },
      ],
      option7:[
      {
            value: 1,
            label: "too eazy",
        },
        {
            value: 2,
            label: "moderate",
        },
        {
            value: 3,
            label: "too difficult",
        },
      ],
      option8:[
       {
            value: 1,
            label: "Quizzes are helpful for reviewing tutorials.",
        },
        {
            value: 2,
            label: "Quizzes are not helpful for reviewing tutorials.",
        },
      ],
      option9:[
      {
            value: 1,
            label: "too low",
        },
        {
            value: 2,
            label: "accurate",
        },
        {
            value: 3,
            label: "too high",
        }
      ],
      option10:[
      {
            value: 1,
            label: "inaccurate",
        },
        {
            value: 2,
            label: "accurate",
        },
      ],
      option11:[
       {
            value: 1,
            label: "no help",
        },
        {
            value: 2,
            label: "helpful",
        },
      ],

      }
      
      
            
        }
    },
    components:{

    },
    methods: {
      onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendSurvey();
          
          
        } else {
          // 验证不通过
          // console.log("error submit!!");
          ElMessage({
            showClose: true,
            message: "Wrong Information",
            type: "error",
          });
          return false;
        }
      });
      // console.log(this.staffNation);
    },
    sendSurvey(){
      var url = "/apis/postUserSurvey";
      this.transferForm.uid = localStorage.getItem("userid");
      this.transferForm.surveyQuestion1 = this.surveyForm.ans1;
      this.transferForm.surveyQuestion2 = this.surveyForm.ans2;
      this.transferForm.surveyQuestion3 = this.surveyForm.ans3;
      this.transferForm.surveyQuestion4 = this.surveyForm.ans4;
      this.transferForm.surveyQuestion5 = this.surveyForm.ans5;
      this.transferForm.surveyQuestion6 = this.surveyForm.ans6;
      this.transferForm.surveyQuestion7 = this.surveyForm.ans7;
      this.transferForm.surveyQuestion8 = this.surveyForm.ans8;
      this.transferForm.surveyQuestion9 = this.surveyForm.ans9;
      this.transferForm.surveyQuestion10 = this.surveyForm.ans10;
      this.transferForm.surveyQuestion11 = this.surveyForm.ans11;
      console.log(this.transferForm)
this.$axios
        .post(
          url,
          this.$qs.stringify(this.transferForm)
        )
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: "update success",
              type: "success",
            });
            
          } else {
            ElMessage({
              showClose: true,
              message: "Something wrong",
              type: "error",
            });
          }
        });
    },
        
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.survey-form {
  width: 100%;
  height: 100%;
  margin-left:50px;
  /* text-align:center;
  display: flex;
  justify-content: center;
  align-items: center; */
}
</style>