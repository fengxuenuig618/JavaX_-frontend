<template>
  <div class="backGround">
    <el-container>
      <!-- <el-header class="header">Header</el-header> -->
      <el-main>
        <div class="login">
          <el-form
            :model="forgotForm"
            :rules="fieldRules"
            ref="forgotForm"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-container"
          >
          <h2 class="title" style="padding-left: 22px">Forgot your password?</h2>
            <el-form-item prop="userAccount">
              <el-input
                type="text"
                v-model="forgotForm.userAccount"
                auto-complete="off"
                placeholder="Username or Email"
              ></el-input>
            </el-form-item>

            <el-form-item prop="verificationCode">
              <el-col :span=9>
                <el-input
                type="text"
                v-model="forgotForm.verificationCode"
                auto-complete="off"
                placeholder="verification code"
                ></el-input>
              </el-col>
              <el-col :span=1></el-col>
              <el-col :span=14 style="float:right;">
                <div  class="send-button">
                  <el-button :type="style" plain @click="sendCode()"
                :disabled="disable"
                >{{this.sendButton}}</el-button>
                </div>
                
              </el-col>
              
              
            </el-form-item>

            <el-form-item style="width: 100%">
              <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
              <el-button
                type="warning"
                style="width: 48%"
                @click="onSubmit('forgotForm')"
                >Reset Password</el-button
              >
              <el-button type="primary" style="width: 48%" @click="returnLogin()"
                >Return</el-button
              >
             
            </el-form-item>
            
          </el-form>
        </div>
      </el-main>
      <!-- <el-footer class="footer">Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "ForgotPassword",
  components: {},
  data() {
    return {
      sendButton: 'Send verification code',
      isGeting: false,
      count: 60,
      disable: false,
      style:'primary',
      forgotForm:{
        userAccount:"",
        verificationCode:"",
      },
      fieldRules: {
        userAccount: [{ required: true, message: "Required", trigger: "blur" }],
        verificationCode: [{ required: true, message: "Required", trigger: "blur" },], 
      },
      checked: false,
      verifyForm:{
        email:"",
        verificationCode:"",
        timeStamp:"",
      }

    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过的逻辑
          this.resetPassword();
        } else {
          // 验证不通过
          ElMessage({
                showClose: true,
                message: "Wrong Information",
                type: "error",
              });
          this.createdCode();
          return false;
        }
      });
      // console.log(this.staffNation);
    },
    countdown () {
      var countDown = setInterval(() => {
        if (this.count < 1) {
          this.isGeting = false
          this.disable = false
          this.sendButton = 'Resend verification code'
          this.count = 60
          this.style = 'primary'
          clearInterval(countDown)
        } else {
          this.isGeting = true
          this.disable = true
          this.style = 'info'
          this.sendButton = 'Resend after '+this.count-- + ' seconds'
        }
      }, 1000)
    },


    sendCode(){
      if(this.forgotForm.userAccount==""){
        ElMessage({
                showClose: true,
                message: "Account Empty",
                type: "error",
              });
        return;
      }

      var url = "/apis/checkUserAccount/";
      url+= this.forgotForm.userAccount
      this.$axios
        .get(url)
        .then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            ElMessage({
                showClose: true,
                message: "Verification code has sent to your email. If you haven't received the email, try checking  in spam.",
                type: "success",
              });
              this.verifyForm.email = res.data.msg;
          } else if(res.data.msg=="no such user"){
           ElMessage({
                showClose: true,
                message: "Account does not exist, please try again",
                type: "error",
              });
          }
          else{
            this.$router.push("/404");
          }
        });
        this.countdown();
    },
    returnLogin(){
      this.$router.push("/login");
    },
    resetPassword(){
      this.verifyForm.verificationCode = this.forgotForm.verificationCode;
      this.verifyForm.timeStamp = new Date().getTime();
      this.$axios
        .post("/apis/checkVerificationCode", this.$qs.stringify(this.verifyForm))
        .then((res) => {
          if(res.data.code == 200){
            ElMessage({
                showClose: true,
                message: "Verification code correct.",
                type: "success",
              });
            this.$router.push({ path: '/resetPassword', query: { userEmail: this.verifyForm.email }});
            
          }
          else if(res.data.msg=="time out"){
              ElMessage({
                showClose: true,
                message: "Verification code time out, please try again.",
                type: "error",
              });
          }
          else if(res.data.msg=="wrong code"){
              ElMessage({
                showClose: true,
                message: "Verification code wrong, please try again.",
                type: "error",
              });
          }
        });   
    }


    
  },
  mounted() {
   
  },
};
</script>

<style lang="scss" scoped>
.backGround {
  height: 100vh;
  background: url("~@/assets/login_images/background1.jpg") center center
    fixed no-repeat;
  background-size: cover;
}
.header {
  background-color: #505458;
}
.footer {
  background-color: #505458;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // height: 600px;
  //background-image:  url('~@/assets/logo.png') ;
  //background-color: #505458;
  background-size: cover;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.yanzhengma_input {
  font-family: "Exo 2", sans-serif;
  // border: 1px solid #fff;
  // color: #fff;
  outline: none;
  // border-radius: 12px;
  letter-spacing: 1px;
  font-size: 17px;
  font-weight: normal;
  // background-color: rgba(82,56,76,.15);
  padding: 5px 0 5px 0px;
  // margin-left: 30px;
  height: 30px;
  margin-top: 30px;
  // border: 1px solid #e6e6e6;
}
.verification {
  background: white;
  margin-top: 35px;
  border-radius: 12px;
  width: 100px;
  letter-spacing: 5px;
  margin-left: 50px;
  height: 40px;
  transform: translate(-15px, 0);
}
.captcha {
  height: 50px;
  text-align: justify;
}
.send-button{
 float:right;
}
</style>
