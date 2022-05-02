<template>

    <div class="menu">
      
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        default-active="2"
        class="aside-menu"
        :collapse="isCollapse"
      >
        <el-menu-item index="MenuTitle" @click="toPage('/userGuidePage')">
          
          <!-- <el-icon :size="80"><icon-menu /></el-icon> -->
          <span class="iconfont ">&#xe69a;</span>
          <template #title>
            <span style="font-size: 25px"> &nbsp; JavaX-beta </span>
          </template>
        </el-menu-item>

        <el-scrollbar >
          
        <el-menu-item index="menuMyProfile" @click="toPage('/myProfile')">
 
          <el-icon><trend-charts /></el-icon>
          <template #title>My Profile</template>
        </el-menu-item>
                

        <menuAllCourses></menuAllCourses>
        <menuMyCourses></menuMyCourses>


        <el-menu-item index="menuWrongQuestions" @click="this.$router.push({ path: '/wrongQuestions',query: { tab:'wrongQuestionTab'} });">
          <el-icon><document-delete /></el-icon>
          <template #title>Wrong Questions</template>
        </el-menu-item>

        <el-menu-item index="feedbackPage" @click="toPage('/feedbackPage')">
          <!-- <el-icon><setting /></el-icon> -->
          <el-icon><chat-dot-square /></el-icon>
          <template #title >Feedback</template>
        </el-menu-item>

        <el-menu-item index="userGuidePage" @click="toPage('/userGuidePage')">
          <!-- <el-icon><setting /></el-icon> -->
          <el-icon><guide /></el-icon>
          <template #title >User Guide</template>
        </el-menu-item>
        

        </el-scrollbar>
      </el-menu>
      
    </div>
    
</template>


<script >
import bus from 'vue3-eventbus';
import MenuAllCourses from './AllCourses.vue';
import MenuMyCourses from './MyCourses.vue';
import {
  TrendCharts,
  DocumentDelete,
  ChatDotSquare,
  Guide
} from "@element-plus/icons-vue";
export default {
  name: "SideMenu",
  data() {
        return {
          isCollapse:false,  
              
        }
    },
    components:{
    TrendCharts,
    MenuAllCourses,
    MenuMyCourses,
    DocumentDelete,
    ChatDotSquare,
    Guide
    },
    methods: {
        toPage(page){
      // console.log(page);
  
      
      this.$router.push(page);     
    },

    },
    created(){
        

    },
    mounted(){
      bus.on('menuCollapse', e => {
        this.isCollapse=e.isCollapse;
      } )
    }
  
};
</script>

<style scoped>
.menu {
  height: 100%;
  background: yellowgreen;
}
.aside-menu {
  height: 100%;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>