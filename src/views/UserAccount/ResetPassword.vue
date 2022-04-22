<template>
  <div class="backGround">
    <el-container>
      <!-- <el-header class="header">Header</el-header> -->
      <el-main>
        <div class="login">
          <el-form
            :model="resetForm"
            :rules="fieldRules"
            ref="resetForm"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-container"
          >
          <h2 class="title" style="padding-left: 22px">Reset your password</h2>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="resetForm.password"
                auto-complete="off"
                placeholder="New password"
              ></el-input>
            </el-form-item>

            <el-form-item prop="checkPassword">
              <el-input
                type="password"
                v-model="resetForm.checkPassword"
                auto-complete="off"
                placeholder="comfirm your password"
              ></el-input>
            </el-form-item>

            <el-form-item style="width: 100%">
              <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
              <el-button
                type="warning"
                style="width: 48%"
                @click="onSubmit('resetForm')"
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
import { isPassword, isTarget} from "../../utils/validate";
export default {
  name: "ResetPassword",
  components: {},
  props: ['userEmail'],
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于8位"));
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (!isTarget(value, this.resetForm.password)) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      
      resetForm:{
        password:"",
        checkPassword:"",
      },
      fieldRules: {
        password: [{ required: true, message: "Required", trigger: "blur" },
        { validator: validatePassword, message: "Too short", trigger: "blur" },],
        checkPassword: [{ required: true, message: "Required", trigger: "blur" },
        { validator: validatePassword, message: "Too short", trigger: "blur" },
          { validator: checkPassword, message: "Password does not match", trigger: "blur" }], 
      },
      checked: false,
      transferPassword:{
        email:"",
        password:"",
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

    resetPassword(){
      this.transferPassword.email = this.$route.query.userEmail;
      this.transferPassword.password = this.resetForm.password;
      this.$axios
        .post("/apis/resetPassword", this.$qs.stringify(this.transferPassword))
        .then((res) => {
          if(res.data.code == 200){
            ElMessage({
                showClose: true,
                message: "Reset password success.",
                type: "success",
              });
            this.$router.push("/login");        
          }
          else{
              ElMessage({
                showClose: true,
                message: "Server error, please try again.",
                type: "error",
              });
          }
         
        });   
    },

    returnLogin(){
      this.$router.push("/login");
    },


    
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
</style>
