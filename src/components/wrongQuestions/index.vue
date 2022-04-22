
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    ref="autoClick"
    @tab-click="changeTab(activeTab)"
    
  >
    <!-- <el-tab-pane label="Analysis" name="analysisTab" >
            sdsfdsd
        </el-tab-pane> -->
        
    <el-tab-pane label="Wrong Questions" name="wrongQuestionTab">
       <wrongQuiz></wrongQuiz>
 
      </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import WrongQuiz from "./wrongQuiz.vue"
export default {
  name: "WrongQuestions",
  data() {
        return {         
            activeTab:"",    
        }
    },
    components:{
        WrongQuiz,
    },
    methods: {
        init(){
            this.activeTab = this.$route.query.tab;
            //this.activeTab="wrongQuestionTab";
            //this.$refs.autoClick.$el.click()
            //this.changeTab("wrongQuestionTab");
            
        },
        changeTab(curTab){
          
          this.$router.push({ path: '/wrongQuestions', query: { tab:curTab} });
        }
        
    },
    created(){
        this.init();
    },
    mounted(){
      this.$bus.emit('headerNavigate', { navigation: "Wrong Questions" });

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