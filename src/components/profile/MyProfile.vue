
<template>
  <el-scrollbar>
    <div class="profile-frame">
      
      <div class="top-frame">
        <overallAssessment :profileData="this.transferProfile"></overallAssessment>
<myCalandar></myCalandar>
      </div>


<moduleAssessment :doneModules="this.doneModulesData"
                          :undoneModules="this.undoneModulesData"></moduleAssessment>



           
    
    </div>
  </el-scrollbar>
</template>


<script>
import { ElMessageBox } from "element-plus";
import ModuleAssessment from "./myProfileComponents/moduleAssessment.vue"
import MyCalandar from "./myProfileComponents/myCalendar.vue";
import OverallAssessment from "./myProfileComponents/overallAssessment.vue"
export default {
  name: "MyProfile",
  components: {
    MyCalandar,
    ModuleAssessment,
    OverallAssessment
  },
  data() {
    return {
      transferProfile: {},
      doneModulesData:[],
      undoneModulesData:[],
    };
  },
  methods: {
    async getProfile() {
      var _this = this;
      var url = "/apis/getUserProfile/";
      url += localStorage.getItem("userid");
      let response = await _this.$axios.get(url);

      if (response.data.msg != "no set") {
        this.transferProfile = response.data.data;
        this.doneModulesData = this.transferProfile.doneModules;
        this.undoneModulesData = this.transferProfile.undoneModules;
      } else {
        ElMessageBox.confirm(
          "Set your goals to unlock customized learning content.",
          "New user?",
          {
            confirmButtonText: "SET NOW",
            cancelButtonText: "LATER",
            type: "warning",
          }
        )
          .then(() => {
            this.$router.push("/EditProfile");
          })
          .catch(() => {});
      }
    },
    async init() {
      await this.getProfile();    
    },
  },

  mounted() {
    this.$bus.emit('headerNavigate', { navigation: "My Profile" });
  },
  created() {
    //获取账号信息
    this.init();
  },
};
</script>

<style scoped>
.profile-frame {
  background-color: white;
   display: flex;/*设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效*/
				display: -webkit-flex; /* Safari */
				flex-direction: column;/*容器内项目的排列方向(默认横向排列 row)*/
				flex-wrap: nowrap;/*容器内项目换行方式*/
				justify-content: center;/*项目在主轴上的对齐方式*/
				align-items: center;/*项目在交叉轴上如何对齐*/
				align-content: center;/*定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用*/
  height: 100%;
}
.top-frame{
  display: flex;
  margin-top:15px;
}

</style>