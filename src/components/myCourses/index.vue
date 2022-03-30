
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    @tab-click="changeTab(activeTab)"
  >
  <el-tab-pane label="Pre-Class Quiz" name="preTab">
    
    <preQuiz :chapterId="currentChapter" :globalLevel="globalLevel">
    </preQuiz>
  </el-tab-pane>
    <el-tab-pane label="Tutorial" name="tutorialTab">
        <!-- <div style="height:100%">
            <p>{{currentChapter}}</p>
        </div> -->
        <myCoursesTutorial :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesTutorial>
        </el-tab-pane>
    <el-tab-pane label="Quiz" name="quizTab">
        <myCoursesQuiz :chapterId="currentChapter" :globalLevel="globalLevel"></myCoursesQuiz>
    </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import MyCoursesTutorial from "./myCourseTutorial.vue";
import MyCoursesQuiz from "./myCourseQuiz.vue";
import PreQuiz from "./myCoursePreQuiz.vue";
export default {
  name: "MyCourses",
  data() {
        return {         
            activeTab:"tutorialTab",
            currentChapter:"",  
            globalLevel:0,    
        }
    },
    components:{
        MyCoursesTutorial,
        MyCoursesQuiz,
        PreQuiz,
    },
    methods: {
        init(){
            this.currentChapter = this.$route.query.chapterId;
            this.globalLevel =this.$route.query.globalLevel;
            this.activeTab = this.$route.query.tab;
        },
        changeTab(curTab){   
          this.$router.push({ path: '/myCourses', query: { chapterId: this.currentChapter, globalLevel:this.globalLevel,tab:curTab} });
        }
        
    },
    created(){
        this.init();
    },
    mounted(){
        //console.log(this.$route.query);

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
</style>