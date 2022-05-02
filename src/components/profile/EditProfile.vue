
<template>
  <el-scrollbar>
    <div class="edit-profile-page">
      <el-row>
        <el-col :span="24" class="myStyle"
          ><p
            style="
              font-size: 25px;
              text-align: center;
              padding: 0px;
              margin-top: 20px;
              margin-bottom: 20px;
            "
          >
            SETTING YOUR PROFILE
          </p></el-col
        >
      </el-row>

      <el-divider style="padding: 0px; margin: 0px"></el-divider>
      <!-- 空行 -------------------------------------------------------------->
      <el-row>
        <el-col :span="24"><p></p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><p></p></el-col>
      </el-row>

      <!-- 选择框------------------------------------------------------------------- -->
      <el-row>
        <el-col :span="5"> </el-col>
        <el-col :span="5">
          <div class="my-label">your education level</div>
        </el-col>
        <el-col :span="4"> </el-col>
        <el-col :span="5"><div class="my-label">your major</div></el-col>
        <el-col :span="5"> </el-col>
      </el-row>

      <el-form
        :model="profileForm"
        :rules="fieldRules"
        label-position="top"
        ref="profileForm"
        class="profile-form"
        size="large"
      >
        <el-row>
          <el-col :span="5"> </el-col>
          <el-col :span="5">
            <el-form-item prop="education">
              <el-select
                v-model="profileForm.educationLevel"
                placeholder="Select"
                class="select-style"
              >
                <el-option
                  v-for="item in options.educationOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="option-style"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4"> </el-col>
          <el-col :span="5">
            <el-form-item prop="major">
              <el-select
                v-model="profileForm.major"
                class="select-style"
                placeholder="Select"
                :disabled="
                  profileForm.educationLevel === 3 ||
                  profileForm.educationLevel === 4
                    ? false
                    : true
                "
              >
                <el-option
                  v-for="item in options.majorOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5"> </el-col>
        </el-row>

        <el-row>
          <el-col :span="5"> </el-col>
          <el-col :span="5">
            <div class="my-label">Java experience</div>
          </el-col>
          <el-col :span="4"> </el-col>
          <el-col :span="10"
            ><div class="my-label">
              other programming language experience
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="5"> </el-col>
          <el-col :span="5">
            <el-form-item prop="education">
              <el-select
                v-model="profileForm.javaExperience"
                placeholder="Select"
                class="select-style"
              >
                <el-option
                  v-for="item in options.experience"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="option-style"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4"> </el-col>
          <el-col :span="5">
            <el-form-item prop="major">
              <el-select
                v-model="profileForm.otherExperience"
                class="select-style"
                placeholder="Select"
              >
                <el-option
                  v-for="item in options.experience"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5"> </el-col>
        </el-row>

        <!-- <div class="test1" >
  <div class="test2"></div>

</div> -->

        <!-- 折叠栏--------------------------------------------------------------- -->

        <div class="outer-collapse">
          <el-row>
            <el-col :span="4"></el-col>
            <el-col :span="6">
              <el-row>&nbsp;</el-row>
              <el-row>&nbsp;</el-row>
              <el-row>&nbsp;</el-row>
              <div style="text-align: right">Choose your targeting</div>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="13">
              <el-radio-group v-model="profileForm.globalLevel">
                <el-collapse accordion style="width: 500px; text-align: center">
                  <el-collapse-item name="1">
                    <template #title>
                      <el-radio :label="1" size="large">Beginner</el-radio>
                    </template>
                    <div>
                      Introduce the basic concepts and basic usage of Java.
                    </div>
                    <div>
                      <b>Suitable for learners with no or little programming language related foundation.</b>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template #title>
                      <el-radio :label="2" size="large">Intermediate</el-radio>
                    </template>
                    <div>
                      Provide advanced knowledge reference of Java, common usage methods and application scenarios.
                    </div>
                    <div>
                       <b>Suitable for learners with certain computer and programming foundation.</b>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="3">
                    <template #title>
                      <el-radio :label="3" size="large">Advanced</el-radio>
                    </template>
                    <div>
                      Provides a comprehensive Java tutorial including all advanced syntax and complex functions.
                    </div>
                    <div>
                      <b>
                       Suitable for professionals in computer science or learners with relevant object-oriented programming language experience.</b>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>

        <!-- 空行 -------------------------------------------------------------->
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>

        <!-- 卡片部分 ---------------------------------------------------------- -->
        <el-row>
          <el-col :span="2"> </el-col>
          <el-col :span="6">
            <el-card class="my-card" id="card1" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span> <b> Java Basic</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck1"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card1',
                            this.profileForm.cardCheck.cardCheck1
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Language Basics describes the traditional features of the language, including variables, arrays, data types, operators, and control flow.
              </span>
            </el-card>
          </el-col>
          <el-col :span="1"> </el-col>
          <el-col :span="6">
            <el-card class="my-card" id="card2" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span><b>Classes & Objects</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck2"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card2',
                            this.profileForm.cardCheck.cardCheck2
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Classes and Objects describes how to write the classes from which objects are created, and how to create and use the objects.
              </span>
            </el-card>
          </el-col>
          <el-col :span="1"> </el-col>
          <el-col :span="6">
            <el-card class="my-card" id="card3" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span><b>Annotation</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck3"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card3',
                            this.profileForm.cardCheck.cardCheck3
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Annotations are a form of metadata and provide information for the compiler. This lesson describes where and how to use annotations in a program effectively.
              </span>
            </el-card>
          </el-col>
          <el-col :span="2"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"> </el-col>
          <el-col :span="6">
            <el-card class="my-card" id="card4" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span><b>Interface & Inheritance</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck4"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card4',
                            this.profileForm.cardCheck.cardCheck4
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Interfaces and Inheritance describes interfaces and inheritance —what they are, why you would want to write one, and how to write one. 
              </span>
            </el-card>
          </el-col>
          <el-col :span="1"> </el-col>
          <el-col :span="6">
            <el-card class="my-card" id="card5" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span><b>Generics</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck5"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card5',
                            this.profileForm.cardCheck.cardCheck5
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Generics are a powerful feature of the Java programming language. They improve the type safety of your code, making more of your bugs detectable at compile time.
              </span>
            </el-card>
          </el-col>
          <el-col :span="1"> </el-col>
          <el-col :span="6"> 
            <el-card class="my-card" id="card6" shadow="hover">
              <template #header>
                <div class="my-card-header">
                  <span><b>Packages</b></span>
                  <div class="my-card-select">
                    <el-form-item>
                      <el-checkbox
                        v-model="profileForm.cardCheck.cardCheck6"
                        label="Learn"
                        size="large"
                        @change="
                          changeCardColor(
                            'card6',
                            this.profileForm.cardCheck.cardCheck6
                          )
                        "
                      ></el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </template>
              <span>
                Packages are a feature of the Java programming language that help you to organize and structure your classes and their relationships to one another.
              </span>
            </el-card>
          </el-col>
          <el-col :span="2"> </el-col>
        </el-row>
        <!-- 空行 -------------------------------------------------------------->
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>

        <!-- 提交按钮 --------------------------------------------------------------->
        <div
          style="
            weith: 100%;
            display: flex;
            justify-content: center;
            align-items: Center;
          "
        >
          <el-button type="success" @click="onSubmit('profileForm')" plain
            >UPDATE</el-button
          >
        </div>

        <!-- 空行 -------------------------------------------------------------->
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><p></p></el-col>
        </el-row>
      </el-form>
    </div>
  </el-scrollbar>
</template>


<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import bus from 'vue3-eventbus'
export default {
  name: "EditProfile",
  data() {
    return {
      profileForm: {
        educationLevel: ref(""),
        major: ref(""),
        javaExperience: ref(""),
        otherExperience: ref(""),
        globalLevel: ref(""),
        cardCheck: {
          cardCheck1: ref(false),
          cardCheck2: ref(false),
          cardCheck3: ref(false),
          cardCheck4: ref(false),
          cardCheck5: ref(false),
          cardCheck6: ref(false),
        },
      },
      modulesInfo:[
        {
          moduleId:"",
          moduleTitle:"",
          cardIntroduce:"",
        }
      ],

      options: {
        educationOption: [
          {
            value: 1,
            label: "Junior high school and below",
          },
          {
            value: 2,
            label: "High school",
          },
          {
            value: 3,
            label: "Undergraduate",
          },
          {
            value: 4,
            label: "Postgraduate and above",
          },
        ],
        majorOption: [
          {
            value: 4,
            label: "Engineering (Computer Science related)",
          },
          {
            value: 3,
            label: "Engineering (not Computer Science)",
          },
          {
            value: 2,
            label: "Science",
          },
          {
            value: 1,
            label: "Other",
          },
        ],
        experience: [
          {
            value: 1,
            label: "None",
          },
          {
            value: 2,
            label: "Less than three months",
          },
          {
            value: 3,
            label: "Three months to one year",
          },
          {
            value: 4,
            label: "One year to three years",
          },
          {
            value: 5,
            label: "Three years and above",
          },
        ],
      },

      transferProfile: {
        uid: 0,
        hasSet: 0,
        educationLevel: 0,
        major: 0,
        javaExperience: 0,
        otherExperience: 0,
        globalLevel: 0,
        selectModules:"",
      },
      fieldRules: {
        globalLevel: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        javaExperience: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        otherExperience: [
          { required: true, message: "please select", trigger: "blur" },
        ],
        educationLevel: [
          { required: true, message: "please select", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getModuleInfo(){
      var _this = this;
      var url = "/apis/getModuleInfo";
      let response = await _this.$axios.get(url);
      console.log(response);
      if (response.data.code == 200){
        this.modulesInfo = response.data.data;
      }
      else{
        console.log("wwwwww");
      }
      console.log(this.modulesInfo[0].moduleTitle);
    },
    changeCardColor(id, isCheck) {
      // console.log(isCheck);
      if (isCheck) {
        document.getElementById(id).style.background = "#ccff99";
      } else {
        document.getElementById(id).style.background = "white";
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         
          // console.log(this.profileForm.globalLevel);
          if (
            this.profileForm.globalLevel != 0 &&
            this.profileForm.educationLevel != 0 &&
            this.profileForm.javaExperience != 0 &&
            this.profileForm.otherExperience != 0 &&
            (this.profileForm.cardCheck.cardCheck1 ||
              this.profileForm.cardCheck.cardCheck2 ||
              this.profileForm.cardCheck.cardCheck3 ||
              this.profileForm.cardCheck.cardCheck4 ||
              this.profileForm.cardCheck.cardCheck5||
              this.profileForm.cardCheck.cardCheck6)
          ) {
            this.updateProfile();
          } else {
            ElMessage({
              showClose: true,
              message:
                "please select all the items, and at least pick one chapter to learn",
              type: "error",
            });
          }
        } else {
          // 验证不通过
          // console.log("error submit!!");
          ElMessage({
            showClose: true,
            message: "信息错误，请检查",
            type: "error",
          });
          return false;
        }
      });
    },
    updateProfile() {
      this.loading = true;
      let _this = this;
      // console.log(this.transferProfile);
      this.transferProfile.hasSet = 1;
      this.transferProfile.educationLevel = this.profileForm.educationLevel;
      if (
        this.transferProfile.educationLevel == 1 ||
        this.transferProfile.educationLevel == 2
      ) {
        this.transferProfile.major = 0;
      } else {
        this.transferProfile.major = this.profileForm.major;
      }

      this.transferProfile.javaExperience = this.profileForm.javaExperience;
      this.transferProfile.otherExperience = this.profileForm.otherExperience;
      this.transferProfile.globalLevel = this.profileForm.globalLevel;
      this.addSelectModules();
      // console.log(this.transferProfile);
      this.$axios
        .post(
          "/apis/updateUserProfileSetting",
          this.$qs.stringify(this.transferProfile)
        )
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: "update success",
              type: "success",
            });
            bus.emit('profileSet', { profileSet: true });
            this.$bus.emit('refresh')
            _this.$router.push("/myProfile");
          } else {
            ElMessage({
              showClose: true,
              message: "Something wrong",
              type: "error",
            });
          }
        });
    },
    addSelectModules(){
      var temp = "";
      var isFirst = true;
      if(this.profileForm.cardCheck.cardCheck1){
          temp += "m1";
          isFirst=false;
      } 
      if(this.profileForm.cardCheck.cardCheck2){
        if(!isFirst) temp += ",";   
          temp += "m2";
          isFirst=false;
      } 
      if(this.profileForm.cardCheck.cardCheck3){
          if(!isFirst) temp += ","; 
          temp += "m3";
          isFirst=false;
      } 
      if(this.profileForm.cardCheck.cardCheck4){
          if(!isFirst) temp += ","; 
          temp += "m4";
          isFirst=false;
      } 
      if(this.profileForm.cardCheck.cardCheck5){
          if(!isFirst) temp += ","; 
          temp += "m5";
          isFirst=false;
      } 
      if(this.profileForm.cardCheck.cardCheck6){
          if(!isFirst) temp += ","; 
          temp += "m6";
          isFirst=false;
      }
      this.transferProfile.selectModules = temp;
    },

    getProfileSetting() {
      var _this = this;
      var url = "/apis/getUserProfileSetting/";
      url += localStorage.getItem("userid");
      _this.$axios.get(url).then((res) => {
        // console.log(res.data.data);
        _this.transferProfile.uid = res.data.data.uid;
        if (res.data.data.hasSet == 1) {
          _this.profileForm.educationLevel = res.data.data.educationLevel;

          _this.profileForm.major = res.data.data.major;
          _this.profileForm.javaExperience = res.data.data.javaExperience;
          _this.profileForm.otherExperience = res.data.data.otherExperience;
          _this.profileForm.globalLevel = res.data.data.globalLevel;

          // console.log(_this.globalLevel);
          if (res.data.data.modulesMap.m1 == 1) {
            _this.profileForm.cardCheck.cardCheck1 = true;
            _this.changeCardColor("card1", true);
          }
          if (res.data.data.modulesMap.m2 == 1) {
            _this.profileForm.cardCheck.cardCheck2 = true;
            _this.changeCardColor("card2", true);
          }
          if (res.data.data.modulesMap.m3 == 1) {
            _this.profileForm.cardCheck.cardCheck3 = true;
            _this.changeCardColor("card3", true);
          }
          if (res.data.data.modulesMap.m4 == 1) {
            _this.profileForm.cardCheck.cardCheck4 = true;
            _this.changeCardColor("card4", true);
          }
          if (res.data.data.modulesMap.m5 == 1) {
            _this.profileForm.cardCheck.cardCheck5 = true;
            _this.changeCardColor("card5", true);
          }
          if (res.data.data.modulesMap.m6 == 1) {
            _this.profileForm.cardCheck.cardCheck6 = true;
            _this.changeCardColor("card6", true);
          }
        }
      });
    },
    async init(){
        this.getProfileSetting();
        await this.getModuleInfo();
        
    }
  },

  mounted() {
    this.init();
    this.$bus.emit('headerNavigate', { navigation: "Profile/Setting" });
  },
  created() {
    //获取账号信息
    this.init();
  },
};
</script>

<style scoped>
.edit-profile-page {
  background-color: white;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.profile-form {
  background-color: white;
}
.my-label {
  font-size: 16px;
}
.my-card {
  width: 100%;
  height: 200px;
  background-color: white;
}
.my-card-header {
  height: 20px;
}
.my-card-select {
  float: right;
}
.select-style {
  width: 300px;
  text-align: center;
}
.demo-collapse {
  width: 800px;
  text-align: center;
  background-color: azure;
}
.my-level-collapse {
  background-color: blueviolet;
  width: 300px;
}
.my-level-collapse-item {
  width: 500px;
  background-color: antiquewhite;
}
.outer-collapse {
  width: 100%;
}
.test1 {
  background-color: cadetblue;
  width: 100%;
  height: 800px;
  text-align: center;
}
.test2 {
  background-color: pink;
  width: 30%;
  height: 300px;
}
</style>