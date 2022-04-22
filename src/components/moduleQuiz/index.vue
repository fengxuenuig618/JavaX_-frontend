
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
        
    <el-tab-pane label="Module Quiz" name="moduleQuizTab">
       <moduleQuiz></moduleQuiz>
 
      </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import ModuleQuiz from "./moduleQuiz.vue"
export default {
  name: "ModuleQuizTab",
  data() {
        return {         
            activeTab:"", 
            curModule:""   ,
        }
    },
    components:{
        ModuleQuiz,
    },
    methods: {
        init(){
            this.activeTab = this.$route.query.tab;
            this.curModule =  this.$route.query.moduleId;
            console.log("当前模块"+this.curModule);
            //this.activeTab="wrongQuestionTab";
            //this.$refs.autoClick.$el.click()
            //this.changeTab("wrongQuestionTab");
            
        },
        changeTab(curTab){
          
          this.$router.push({ path: '/moduleQuiz', query: {moduleId:this.curModule, tab:curTab} });
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
.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>