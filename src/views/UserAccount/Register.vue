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
            <h2 class="title" style="padding-left: 22px">新用户注册</h2>
            <el-form-item prop="account">
              <el-input
                type="text"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="用户名"
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

            <el-form-item prop="checkPassword">
              <el-input
                type="password"
                v-model="loginForm.checkPassword"
                auto-complete="off"
                placeholder="确认密码"
              ></el-input>
            </el-form-item>

            <el-form-item prop="email">
              <el-input
                type="text"
                v-model="loginForm.email"
                auto-complete="off"
                placeholder="邮箱地址"
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

            <el-form-item>
              同意用户协议 &nbsp;&nbsp;
              <el-switch
                v-model="agreeValue"
                class="ml-2"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Y"
                inactive-text="N"
              />
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="dialogVisible = true"
                >&nbsp;&nbsp;&nbsp;&nbsp;点击查看用户协议</el-button
              >

              <el-dialog v-model="dialogVisible" title="用户协议" width="30%">
                <span>用户协议</span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false;agreeValue = false">Disagree</el-button>
                    <el-button type="success" @click="dialogVisible = false; agreeValue = true"
                      >Agree</el-button
                    >
                  </span>
                </template>
              </el-dialog>
            </el-form-item>

            <el-form-item style="width: 100%">
              <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
              <el-button
                type="success"
                style="width: 48%"
                @click="onSubmit('loginForm')"
                >注 册</el-button
              >
              <el-button
                type="primary"
                style="width: 48%"
                @click="returnLogin()"
                >返回登陆</el-button
              >
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
import { isPassword, isTarget, isEmail } from "../../utils/validate";
import { ElMessage } from "element-plus";
import { ref } from "vue";

export default {
  name: "login",
  components: {},
  data() {
    const validateCaptcha = (rule, value, callback) => {
      if (!isTarget(value, this.checkCode)) {
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
    const checkPassword = (rule, value, callback) => {
      if (!isTarget(value, this.loginForm.password)) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error("邮箱错误"));
      } else {
        callback();
      }
    };
    return {
      code: "",
      checkCode: "IHLE",
      data: "",
      loading: false,
      agreeValue: ref(false),
      dialogVisible: ref(false),
      userRegister: {
        uid: 0,
        uname: "",
        upw: "",
        uemail:""
      },
      loginForm: {
        account: "",
        password: "",
        checkPassword: "",
        captcha: "",
        picLyanzhengma: "",
        email: "",
      },
      fieldRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, message: "密码过短", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePassword, message: "密码过短", trigger: "blur" },
          { validator: checkPassword, message: "密码不一致", trigger: "blur" },
        ],
        picLyanzhengma: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            validator: validateCaptcha,
            message: "验证码错误",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请邮箱地址", trigger: "blur" },
          {
            validator: validateEmail,
            message: "请输入正确邮箱地址",
            trigger: "blur",
          },
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
          //同意用户协议
          if (this.agreeValue) {
            //验证通过的逻辑
            this.register();
          } else {
            ElMessage({
              showClose: true,
              message: "请同意用户协议",
              type: "warning",
            });
            return false;
          }
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
    register() {
      this.loading = true;
      let _this = this;
      this.userRegister.uname = this.loginForm.account;
      this.userRegister.upw = this.loginForm.password;
      this.userRegister.uemail = this.loginForm.email;
      this.$axios
        .post("/apis/userRegister", this.$qs.stringify(this.userRegister))
        .then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: "register success, please login",
              type: "success",
            });
            _this.$router.push("/login");
          } else {
            if (res.data.msg == "duplicate username") {
              ElMessage({
                showClose: true,
                message: "Username duplicate, please use another one",
                type: "error",
              });
            } else  {
              ElMessage({
                showClose: true,
                message: "Something wrong",
                type: "error",
              });
            }
          }
        });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },

    returnLogin() {
      this.$router.push("/login");
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
