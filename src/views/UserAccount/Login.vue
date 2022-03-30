<template>
  <div class="backGround">
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main>
        <div class="login">
          <el-form
            :model="loginForm"
            :rules="fieldRules"
            ref="loginForm"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-container"
          >
            <h2 class="title" style="padding-left: 22px">系统登录</h2>
            <el-form-item prop="account">
              <el-input
                type="text"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="密码"
              ></el-input>
            </el-form-item>

            <el-form-item class="join_formitem">
              <el-form-item class="captcha">
                <el-col :span="12">
                  <el-form-item prop="picLyanzhengma">
                    <el-input
                      type="text"
                      placeholder="请输入验证码"
                      class="yanzhengma_input"
                      v-model="loginForm.picLyanzhengma"
                    />
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <input
                    type="button"
                    @click="createdCode"
                    class="verification"
                    v-model="checkCode"
                  />
                </el-col>
              </el-form-item>
            </el-form-item>

            <!-- 空行占位 -->
            <el-form-item> </el-form-item>
            <el-form-item> </el-form-item>

            <el-form-item style="width: 100%">
              <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
              <el-button
                type="success"
                style="width: 48%"
                @click="onSubmit('loginForm')"
                >登 录</el-button
              >
              <el-button type="primary" style="width: 48%" @click="register()"
                >注册</el-button
              >
              <el-link type="primary">忘记密码？点击找回</el-link>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Cookies from "js-cookie";
import { isPassword, isTarget} from "../../utils/validate";
import { ElMessage } from "element-plus";


export default {
  name: "login",
  components: {},
  data() {
    const validateCaptcha = (rule, value, callback) => {
      if (!isTarget(value,this.checkCode)) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于8位"));
      } else {
        callback();
      }
    };
    return {
      code: "",
      checkCode: "IHLE",
      data: "",
      loading: false,
      user: {
        uid: 0,
        uname: "",
        upw: "",
      },
      loginForm: {
        account: "",
        password: "",
        captcha: "",
        picLyanzhengma: "",
      },
      fieldRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, message: "密码过短", trigger: "blur" },
        ],
        picLyanzhengma: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateCaptcha, message: "验证码错误", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过的逻辑
          this.login();
        } else {
          // 验证不通过
          console.log("error submit!!");
          ElMessage({
                showClose: true,
                message: "信息错误，请检查",
                type: "error",
              });
          this.createdCode();
          return false;
        }
      });
      console.log(this.staffNation);
    },
    login() {
      this.loading = true;
      let _this = this;
      this.user.uname = this.loginForm.account;
      this.user.upw = this.loginForm.password;
      this.$axios
        .post("/apis/userLogin", this.$qs.stringify(this.user))
        .then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            console.log(res.data.data.token);
            //_this.userToken = "Bearer " + res.data.data.token;
            _this.userToken =res.data.data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });

            console.log(_this.userToken);
            Cookies.set("Token", res.data.data.token); //登录成功后将token存储在cookie之中
            localStorage.setItem("username",this.user.uname);
            localStorage.setItem("userid",parseInt(res.data.msg));
            console.log(res.data.msg);
            _this.$router.push("/");
            ElMessage({
                showClose: true,
                message: "login success",
                type: "success",
              });
          } else {
            if (res.data.msg == "no such user") {
              ElMessage({
                showClose: true,
                message: "no such user, please try again",
                type: "error",
              });
              this.createdCode();
            } else if (res.data.msg == "wrong password") {
              ElMessage({
                showClose: true,
                message: "wrong password, please try again",
                type: "error",
              });
              this.createdCode();
            }
          }
        });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },

    register() {
      this.$router.push("/register");
    },
    // 随机验证码
    createdCode() {
      // 先清空验证码输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      // 验证码长度
      const codeLength = 4;
      // 随机数
      const random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (let i = 0; i < codeLength; i++) {
        // 取得随机数的索引(0~35)
        let index = Math.floor(Math.random() * 36);
        // 根据索引取得随机数加到code上
        this.code += random[index];
      }
      // 把code值赋给验证码
      this.checkCode = this.code;
    },
  },
  mounted() {
    this.createdCode();
    //创建验证码
  },
};
</script>

<style lang="scss" scoped>
.backGround {
  height: 100vh;
  background: url("~@/assets/login_images/loginBackground.jpeg") center center
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
