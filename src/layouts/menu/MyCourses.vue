<template>
  <div class="menu-bug-wrap">
    <el-sub-menu index="myModules" @click="checkSetting()" :disabled="!hasSet">
      <template #title>

        <el-icon><management /></el-icon>
        <span> My Modules</span>
      </template>
      <template v-for="module in transferMenuMyModules" v-bind:key="module">
        <el-sub-menu :index="'myMoudles' + module.moduleId">
          <template #title
            ><span v-if="module.moduleDone">{{ module.moduleTitle }}&nbsp;✔️</span>
            <span v-else>{{ module.moduleTitle }}</span>
            </template
          >
          <template v-for="chapter in module.chapters" v-bind:key="chapter">
            <el-menu-item
              :index="'myMoudles' + chapter.chapterId"
              @click="toChapter(chapter.chapterId, module.moduleTitle,chapter.chapterTitle,chapter.preDone,chapter.chapterDone)"
            >
            <span v-if="chapter.chapterDone">{{ chapter.chapterTitle }}&nbsp;✔️</span>
            <span v-else>{{ chapter.chapterTitle }}</span>
            </el-menu-item>
          </template>
          <el-menu-item
          :index="'moduleQuiz' + module.moduleId"
              @click="toModuleQuiz(module.moduleId)"
          >
          <span v-if="module.moduleDone">Module quiz&nbsp;✔️</span>
            <span v-else>Module quiz</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <el-menu-item
          :index="'finalQuiz'"
              @click="toFinalQuiz()"
          >Final quiz</el-menu-item>
    </el-sub-menu>
  </div>
</template>


<script >
import { Management } from "@element-plus/icons-vue";
import { ElMessageBox,ElMessage } from "element-plus";
import bus from 'vue3-eventbus'
export default {
  name: "MenuMyCourses",
  data() {
    return {
      hasSet: false,
      userLevel:0,
      transferMenuMyModules: [
        {
          moduleId: "",
          moduleTitle: "",
          moduleDone:"",
          chapters: [
            {
              chapterId: "",
              chapterTitle: "",
              chapterDone:"",
            },
          ],
        },
      ],
    };
  },
  components: {
    Management,
  },
  methods: {
    checkSetting() {
      if (!this.hasSet) {
        ElMessageBox.confirm(
          "Custom lessons are not available because you haven't set up your personal settings.",
          "Warning",
          {
            confirmButtonText: "Set now",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(() => {
            this.$router.push("/EditProfile");
          })
          .catch(() => {});
      }
    },
    async getUserSetting() {
      var _this = this;
      var url = "/apis/getUserProfileSetting/";
      url += localStorage.getItem("userid");
      let response = await _this.$axios.get(url);
      this.hasSet = response.data.data.hasSet === 1;
      this.userLevel = response.data.data.globalLevel;
      
    },
    async getUserMenu() {
      var _this = this;
      var url = "/apis/menuMyModules/";
      url += localStorage.getItem("userid");
      let response = await _this.$axios.get(url);
      this.transferMenuMyModules = response.data.data
      //console.log(this.transferMenuMyModules);
    },
    toChapter(chapter,moduleTitle,chapterTitle,preDone,chapterDone) {
      // console.log(this.userLevel);
      var nav = "My Modules";
     nav += "/";
     nav += moduleTitle;
     nav += "/";
     nav += chapterTitle;
     

      var level = this.userLevel.toString();
      //this.router.push({path:'/allCourses', query:{chapterId:chapter }})
      //this.$router.push({ path: "/myCourses", query: { chapterId: chapter, globalLevel:level} });
      if(preDone){
          this.$router.push({ path: '/myCourses', query: { chapterId: chapter, globalLevel:level, tab:'tutorialTab',preQuiz:preDone,afterQuiz:chapterDone,navigation: nav }});
      }
      else{
        this.$router.push({ path: '/myCourses', query: { chapterId: chapter, globalLevel:level, tab:'preTab',preQuiz:preDone,afterQuiz:chapterDone,navigation: nav }});
      }
      
    },
    async toModuleQuiz(moduleId){
      var url = "/apis/checkModuleQuiz/";
      url += localStorage.getItem("userid");
      url += ":";
      url += moduleId;
      let response = await this.$axios.get(url);
      if(response.data.msg=="yes"){
          this.$router.push({ path: '/moduleQuiz', query: { moduleId: moduleId, tab:'moduleQuizTab'} });
              this.$bus.emit('headerNavigate', { navigation: 'My Modules/'+module.moduleTitle+'/Module Quiz' });
      }
      else{
        ElMessage({
                showClose: true,
                message: "Please complete all chapters in this module first.",
                type: "error",
              });
      }

    },
    async toFinalQuiz(){
      var url = "/apis/checkFinalQuiz/";
      url += localStorage.getItem("userid");
      let response = await this.$axios.get(url);
      if(response.data.msg=="yes"){
          this.$router.push({ path: '/finalQuiz', query: { tab:'finalQuizTab'} });
          this.$bus.emit('headerNavigate', { navigation: 'My Modules/Final Quiz' });
      }
      else{
        ElMessage({
                showClose: true,
                message: "Please complete all modules first.",
                type: "error",
              });
      }
    },
    
    init(){
      this.getUserSetting();

      this.getUserMenu();
    }
  },
  created() {
    this.init();

  },
  mounted() {
              bus.on('profileSet', e => {
        this.hasSet=e.profileSet;
        this.init();
      } );
      bus.on('refresh', e => {
        console.log(e);
        this.init();
      } );
  },
};
</script>

<style>
.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse
  > .menu-bug-wrap
  > .el-submenu__title.el-submenu__icon-arrow {
  display: none;
}
</style>