
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    @tab-click="changeTab(activeTab)"
    
  >
  <el-tab-pane  name="tutorialTab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><reading /></el-icon>
          <span>Tutorial</span>
        </span>
      </template>
      <allCoursesTutorial :chapterId="currentChapter" ></allCoursesTutorial>
  </el-tab-pane>
  

  <el-tab-pane  name="quizTab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><notebook /></el-icon>
          <span>Quiz</span>
        </span>
      </template>
      <allCoursesQuiz :chapterId="currentChapter"></allCoursesQuiz>
  </el-tab-pane>
    <!-- <el-tab-pane label="Tutorial" name="tutorialTab" >
        <allCoursesTutorial :chapterId="currentChapter" ></allCoursesTutorial>
        
        </el-tab-pane> -->
    <!-- <el-tab-pane label="Quiz" name="quizTab"  >
       
       <allCoursesQuiz :chapterId="currentChapter"></allCoursesQuiz>
        
      </el-tab-pane> -->
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import AllCoursesTutorial from "./allCourseTutorial.vue";
import AllCoursesQuiz from "./allCourseQuiz.vue";
import bus from 'vue3-eventbus'
import { Reading,Notebook } from "@element-plus/icons-vue";
export default {
  name: "AllCourses",

  data() {
        return {         
            activeTab:"",
            currentChapter:"",      
        }
    },
    components:{
      AllCoursesTutorial,
      AllCoursesQuiz,
      Reading,
      Notebook
    },
    methods: {
        init(){
            this.currentChapter = this.$route.query.chapterId;
            this.activeTab = this.$route.query.tab;
            bus.emit('headerNavigate', { navigation: this.$route.query.navigation });
        },
        changeTab(curTab){
          
          this.$router.push({ path: '/allCourses', query: { chapterId: this.currentChapter, tab:curTab,navigation: this.$route.query.navigation} });
        }
        
    },
    created(){
        //this.init();
    },
    mounted(){
        this.init();
    },

watch: {
	  '$route' (to, from) { //监听路由是否变化
    if(to != from){
			  //window.location.reload();
        this.init();
		  }

		  // if(to.query.chapterId != from.query.chapterId){
			//   //window.location.reload();
      //   this.init();
		  // }
	  }
},

  
};
</script>

<style scoped>
.allCourse-tab{
    height: 100%;
}
.page{
  height: 100%;
  background-color: white;
}
.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>