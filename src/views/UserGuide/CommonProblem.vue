
<template>
  <div class="my-course-tutorial">
    <el-tabs tab-position="right" class="all-course-tutorial-tab">
    <el-tab-pane label="User Account">
      <div class="Q-style">What should I do if I forget my password or username?</div>
      <br>
      <br>
      <div class="A-style">When you log in, click "Forgot Password" below.</div>
      <el-image  :src="require('../../../public/figures/guide/forget1.jpg')" />
        <br><br>
        <div class="A-style">
          Enter your username or registered email and click "Send Verification Code".
An email with a verification code will be sent to the email address you used to register.
Enter the verification code to proceed to the next step.
        </div>
        <el-image  :src="require('../../../public/figures/guide/forget2.jpg')" />
        <br><br>
        <div class="A-style">
          Enter your new password, save it and log in again.
        </div>
        <el-image  :src="require('../../../public/figures/guide/forget3.jpg')" />

      
    </el-tab-pane>
    <el-tab-pane label="My Profile">
      <div class="Q-style">How can I improve my score?</div>
      <br>
      <br>
      <div class="A-style">You can repeat the quiz for each chapter to increase your accuracy, 
        and your score will be calculated based on your most recent accuracy.</div>
    </el-tab-pane>
  </el-tabs>
    
  </div>
</template>


<script >

export default {
  name: "CommonProblem",
  data() {
    return {
      
    };
  },
  components: {},
  methods: {
   
  },
  created() {
    
  },
  mounted() {
    
  },
 
};
</script>

<style scoped>
.my-course-tutorial {
  height: 100%;
}
.my-course-tutorial-tab {
  height: 100%;
}
.Q-style{
  font-size: 25px;
}
.A-style{
  font-size: 20px;
}
</style>