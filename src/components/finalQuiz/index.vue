
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
        
    <el-tab-pane label="Final Quiz" name="finalQuizTab">
       <finalQuiz></finalQuiz>
 
      </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import FinalQuiz from "./finalQuiz.vue"
export default {
  name: "FinalQuizTab",
  data() {
        return {         
            activeTab:"",    
        }
    },
    components:{
        FinalQuiz,
    },
    methods: {
        init(){
            this.activeTab = this.$route.query.tab;
            //this.activeTab="wrongQuestionTab";
            //this.$refs.autoClick.$el.click()
            //this.changeTab("wrongQuestionTab");
            
        },
        changeTab(curTab){
          
          this.$router.push({ path: '/finalQuiz', query: { tab:curTab} });
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