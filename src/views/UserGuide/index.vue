
<template>
<el-scrollbar>
  <div class="page">
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="allCourse-tab"
    ref="autoClick"
    
    
  >
    <!-- <el-tab-pane label="Analysis" name="analysisTab" >
            sdsfdsd
        </el-tab-pane> -->
        
    <el-tab-pane name="quickStartGuideTab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><compass /></el-icon>
          <span>QuickStart Guide</span>
        </span>
      </template>
       <quickStartGuide></quickStartGuide>
 
    </el-tab-pane>
    <el-tab-pane  name="commonProblemTab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="18"><info-filled /></el-icon>
          <span>Common Problem</span>
        </span>
      </template>
       <commonProblem></commonProblem>
 
    </el-tab-pane>
  </el-tabs>
  </div>
  </el-scrollbar>
</template>


<script >
//import bus from 'vue3-eventbus'
import QuickStartGuide from './QuickStartGuide.vue';
import CommonProblem from './CommonProblem.vue';
import { Compass,InfoFilled } from "@element-plus/icons-vue";
export default {
  name: "UserGuidePage",
  components:{
        QuickStartGuide,
        CommonProblem,
        Compass,
        InfoFilled
    },
  data() {
        return {         
            activeTab:"quickStartGuideTab",    
        }
    },

    methods: {
        init(){
            this.activeTab = "quickStartGuideTab";
            
            
        },
        
    },
    created(){
        this.init();
    },
    mounted(){
      this.$bus.emit('headerNavigate', { navigation: "User Guide" });

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