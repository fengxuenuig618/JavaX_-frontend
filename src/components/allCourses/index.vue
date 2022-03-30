
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    @tab-click="changeTab(activeTab)"
    
  >
    <el-tab-pane label="Tutorial" name="tutorialTab" >
        <!-- <div style="height:100%">
            <p>{{currentChapter}}</p>
        </div> -->
        <allCoursesTutorial :chapterId="currentChapter" ></allCoursesTutorial>
        
        </el-tab-pane>
    <el-tab-pane label="Quiz" name="quizTab"  >
       
       <allCoursesQuiz :chapterId="currentChapter"></allCoursesQuiz>
        
      </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import AllCoursesTutorial from "./allCourseTutorial.vue";
import AllCoursesQuiz from "./allCourseQuiz.vue";
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
    },
    methods: {
        init(){
            this.currentChapter = this.$route.query.chapterId;
            this.activeTab = this.$route.query.tab;
        },
        changeTab(curTab){
          
          this.$router.push({ path: '/allCourses', query: { chapterId: this.currentChapter, tab:curTab} });
        }
        
    },
    created(){
        this.init();
    },
    mounted(){


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
</style>