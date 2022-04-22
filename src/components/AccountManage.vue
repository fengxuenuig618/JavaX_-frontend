<template>
<el-scrollbar>
  <div class="account-manage-page">
    
      


    <el-form
      :model="accountForm"
      :rules="fieldRules"
      label-position="top"
      label-width="200px"
      ref="accountForm"
      class="account-form"
      size="large"
    >
      
    
      <p style="font-size:25px">MANAGE YOUR ACCOUNT</p>
      <el-divider></el-divider>
      <el-form-item prop="account" label="user name">
        <el-input
          type="text"
          v-model="accountForm.account"
          auto-complete="off"
          placeholder="Please input your username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="oldPassword" label="old password">
        <el-input
          type="password"
          v-model="accountForm.oldPassword"
          auto-complete="off"
          placeholder="Please input your old password"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" label="new password">
        <el-input
          type="password"
          v-model="accountForm.password"
          auto-complete="off"
          placeholder="Please input your new password"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPassword" label="new password again">
        <el-input
          type="password"
          v-model="accountForm.checkPassword"
          auto-complete="off"
          placeholder="Please input your new password again"
        ></el-input>
      </el-form-item>

      <el-form-item prop="email" label="email">
        <el-input
          type="text"
          v-model="accountForm.email"
          auto-complete="off"
          placeholder="Email"
        ></el-input>
      </el-form-item>

      <el-form-item prop="captcha" label="captcha">
        <el-col :span="12">
          <el-input
            type="text"
            placeholder="Verification code"
            class="yanzhengma_input"
            v-model="accountForm.captcha"
          ></el-input>
        </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="11">
          <input
            type="button"
            @click="createdCode"
            class="verification"
            v-model="checkCode"
          />
        </el-col>
      </el-form-item>


      <!-- 空行占位 -->
      

      <el-button type="success" @click="onSubmit('accountForm')"
          plain>SAVE</el-button
        >
        <el-form-item> </el-form-item>
    </el-form>

    
  </div>
  </el-scrollbar>
</template>


<script>
import { mapMutations } from "vuex";
import { isPassword, isTarget, isEmail } from "../utils/validate";
import { ElMessage } from "element-plus";
import { ref } from "vue";

export default {
  name: "accountManage",

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
      if (!isTarget(value, this.accountForm.password)) {
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
      checkCode: "",
      data: "",
      loading: false,
      dialogVisible: ref(false),
      userAccountUpdate: {
        uid: 0,
        uname: "",
        oldUpw: "",
        newUpw:"",
        uemail: "",
      },

      accountForm: {
        uid:0,
        account: "",
        oldPassword: "",
        password: "",
        checkPassword: "",
        captcha: "",
        email: "",
      },
      fieldRules: {
        account: [{ required: true, message: "Required", trigger: "blur" }],
        oldPassword: [
          { required: true, message: "Required", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Required", trigger: "blur" },
          { validator: validatePassword, message: "Too short", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "Required", trigger: "blur" },
          { validator: validatePassword, message: "Too short", trigger: "blur" },
          { validator: checkPassword, message: "Password does not match", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "Required", trigger: "blur" },
          {
            validator: validateCaptcha,
            message: "Verification code wrong",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "Required", trigger: "blur" },
          {
            validator: validateEmail,
            message: "Email is invalid",
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
          this.updateAccount();
          
        } else {
          // 验证不通过
          // console.log("error submit!!");
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
    updateAccount() {
      this.loading = true;
      let _this = this;
      // console.log(this.accountForm);
      this.userAccountUpdate.uname = this.accountForm.account;
      this.userAccountUpdate.newUpw = this.accountForm.password;
      this.userAccountUpdate.oldUpw = this.accountForm.oldPassword;
      this.userAccountUpdate.uemail = this.accountForm.email;
      this.userAccountUpdate.uid = this.accountForm.uid;
      this.$axios
        .post("/apis/updateUserAccount", this.$qs.stringify(this.userAccountUpdate))
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: "update success",
              type: "success",
            });
            _this.$router.push("/accountManage");
          } else {
            if (res.data.msg == "duplicate username") {
              ElMessage({
                showClose: true,
                message: "Username duplicate, please use another one",
                type: "error",
              });
            }
            else if (res.data.msg == "duplicate email") {
              ElMessage({
                showClose: true,
                message: "This email has been registered",
                type: "error",
              });
            }
            else if (res.data.msg == "wrong password") {
              ElMessage({
                showClose: true,
                message: "wrong old password, please try again",
                type: "error",
              });
            } 
            else {
              ElMessage({
                showClose: true,
                message: "Something wrong",
                type: "error",
              });
            }
          }
        });
    },
    
    getAccount(){
      var _this = this;
        var url = "/apis/getUserAccount/";
        url += localStorage.getItem("username");
        _this.$axios.get(url)
       .then(res => {   
        //  console.log(res.data.data);
         _this.accountForm.account = res.data.data.uname;
         _this.accountForm.email = res.data.data.uemail;
         _this.accountForm.uid = res.data.data.uid;
             });
          
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

    //创建验证码
    this.createdCode();
    this.$bus.emit('headerNavigate', { navigation: "My Account" });
    
  },
  created(){
     //获取账号信息
    this.getAccount();
  }
};
</script>

<style scoped>
.account-manage-page {
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.account-form {
  
  width: 30%;
  height: 100%;
  
  text-align:center;
}
.verification {
  background: white;
  
  border-radius: 12px;
  width: 100px;
  letter-spacing: 5px;
  margin-left: 50px;
  height: 40px;
  transform: translate(-15px, 0);
}
</style>