
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    @tab-click="changeTab(activeTab)"
  >

    <el-tab-pane  name="preTab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><document /></el-icon>
          <span>{{preQuizTitle}}</span>
        </span>
      </template>
      <preQuiz :chapterId="currentChapter" :globalLevel="globalLevel"></preQuiz>
  </el-tab-pane>

  <!-- <el-tab-pane :label="preQuizTitle" name="preTab">
    <preQuiz :chapterId="currentChapter" :globalLevel="globalLevel">
    </preQuiz>
  </el-tab-pane> -->

    <el-tab-pane  name="tutorialTab" :disabled="disable">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><reading /></el-icon>
          <span>Tutorial</span>
        </span>
      </template>
      <myCoursesTutorial :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesTutorial>
  </el-tab-pane>

    <!-- <el-tab-pane label="Tutorial" name="tutorialTab" :disabled="disable">
        <myCoursesTutorial :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesTutorial>
        </el-tab-pane> -->

    <el-tab-pane  name="quizTab" :disabled="disable">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><notebook /></el-icon>
          <span>{{afterQuizTitle}}</span>
        </span>
      </template>
      <myCoursesQuiz :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesQuiz>
  </el-tab-pane>


    <!-- <el-tab-pane :label="afterQuizTitle" name="quizTab" :disabled="disable">
        <myCoursesQuiz :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesQuiz>
    </el-tab-pane> -->
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import MyCoursesTutorial from "./myCourseTutorial.vue";
import MyCoursesQuiz from "./myCourseQuiz.vue";
import PreQuiz from "./myCoursePreQuiz.vue";
import bus from 'vue3-eventbus'
import { Reading,Notebook,Document } from "@element-plus/icons-vue";
export default {
  name: "MyCourses",
  data() {
        return {         
            activeTab:"tutorialTab",
            currentChapter:"",  
            globalLevel:0,  
            preQuizTitle:"Pre-Class Quiz",
            afterQuizTitle:"Quiz",  
            disable:false,
            statePre:false,
            stateAfter:false,
        }
    },
    components:{
        MyCoursesTutorial,
        MyCoursesQuiz,
        PreQuiz,
        Reading,
        Notebook,
        Document
    },
    methods: {
        init(){
            this.currentChapter = this.$route.query.chapterId;
            this.globalLevel =this.$route.query.globalLevel;
            this.activeTab = this.$route.query.tab;
            bus.emit('headerNavigate', { navigation: this.$route.query.navigation });
            if(this.$route.query.preQuiz=="true"){
                this.preQuizTitle = "Pre-Class Quiz ✔️";
                this.statePre = true;
                this.disable = false;
            } 
            else {
              this.preQuizTitle = "Pre-Class Quiz";
              this.disable = true;
            }
            if(this.$route.query.afterQuiz=="true"){
              this.afterQuizTitle = "Quiz ✔️";
              this.stateAfter = true;
            } 
            else{
              this.afterQuizTitle = "Quiz";
            }
        },
        changeTab(curTab){   
          this.$router.push({ path: '/myCourses', query: { chapterId: this.currentChapter, globalLevel:this.globalLevel,
          tab:curTab,preQuiz:this.statePre,afterQuiz:this.stateAfter,navigation: this.$route.query.navigation} });
        }
        
    },
    created(){
        
    },
    mounted(){
      this.init();
        //console.log(this.$route.query);
        
      //   bus.on('preDone', e => {
        
      //   if(e.isDone){
      //     this.preQuizTitle = "Pre-Class Quiz ✔️";
      //     this.disable = false;
      //   }
      // } );
      // bus.on('afterDone', e => {
      //   if(e.isDone){this.afterQuizTitle = "Quiz ✔️";}
      // } )
        //this.currentChapter = global.currentAllCourseChapter;

    },

watch: {
	  '$route' (to, from) { //监听路由是否变化
		  if(to!= from){
			  //window.location.reload();
              this.init();
		  }
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