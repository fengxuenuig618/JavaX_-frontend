<template>
  <div class="menu-bug-wrap">
    <el-sub-menu index="myModules" @click="checkSetting()" :disabled="!hasSet">
      <template #title>
        <el-icon><location /></el-icon>
        <span> My Modules</span>
      </template>
      <template v-for="module in transferMenuMyModules" v-bind:key="module">
        <el-sub-menu :index="'myMoudles' + module.moduleId">
          <template #title
            ><span>{{ module.moduleTitle }}</span></template
          >
          <template v-for="chapter in module.chapters" v-bind:key="chapter">
            <el-menu-item
              :index="'myMoudles' + chapter.chapterId"
              @click="toChapter(chapter.chapterId)"
            >
              {{ chapter.chapterTitle }}
            </el-menu-item>
          </template>
          <el-menu-item
          :index="'moduleQuiz' + module.moduleId"
              @click="this.$router.push({ path: '/moduleQuiz', query: { moduleId: module.moduleId, tab:'moduleQuizTab'} });"
          >Module quiz</el-menu-item>
        </el-sub-menu>
      </template>
      <el-menu-item
          :index="'finalQuiz'"
              @click="this.$router.push({ path: '/finalQuiz', query: { tab:'finalQuizTab'} });"
          >Final quiz</el-menu-item>
    </el-sub-menu>
  </div>
</template>


<script >
import { Location } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
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
          chapters: [
            {
              chapterId: "",
              chapterTitle: "",
            },
          ],
        },
      ],
    };
  },
  components: {
    Location,
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
    getUserSetting() {
      var _this = this;
      var url = "/apis/getUserProfileSetting/";
      url += localStorage.getItem("userid");
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.hasSet = res.data.data.hasSet === 1;
        _this.userLevel = res.data.data.globalLevel;
        console.log(this.hasSet);
      });
    },
    getUserMenu() {
      var _this = this;
      var url = "/apis/menuMyModules/";
      url += localStorage.getItem("userid");
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.transferMenuMyModules = res.data.data;
        console.log("9999");
        console.log(this.transferMenuMyModules);
      });
    },
    toChapter(chapter) {
      console.log(this.userLevel);
      console.log("********");
      var level = this.userLevel.toString();
      //this.router.push({path:'/allCourses', query:{chapterId:chapter }})
      //this.$router.push({ path: "/myCourses", query: { chapterId: chapter, globalLevel:level} });
      this.$router.push({ path: '/myCourses', query: { chapterId: chapter, globalLevel:level, tab:'tutorialTab'} });
    },
    
    init(){
        this.getUserSetting();

      this.getUserMenu();
    }
  },
  created() {
    this.getUserSetting();
      this.getUserMenu();

  },
  mounted() {
              bus.on('profileSet', e => {
        this.hasSet=e.profileSet;
        this.init();
      } )
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