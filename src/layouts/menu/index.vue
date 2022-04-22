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
        <el-menu-item index="MenuTitle">
          <el-icon :size="80"><icon-menu /></el-icon>
          <template #title>
            <span style="font-size: 25px">JavaX-beta </span>
          </template>
        </el-menu-item>

        <el-scrollbar >
          
        <el-menu-item index="menuMyProfile" @click="toPage('/myProfile')">
 
          <el-icon><trend-charts /></el-icon>
          <template #title>MY PROFILE</template>
        </el-menu-item>
                

        <menuAllCourses></menuAllCourses>
        <menuMyCourses></menuMyCourses>


        <el-menu-item index="menuWrongQuestions" @click="this.$router.push({ path: '/wrongQuestions',query: { tab:'wrongQuestionTab'} });">
          <el-icon><document-delete /></el-icon>
          <template #title>Wrong Questions</template>
        </el-menu-item>

        <el-menu-item index="aboutPage" @click="toPage('/aboutPage')">
          <el-icon><setting /></el-icon>
          <template #title >About</template>
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
  Menu as IconMenu,
  Setting,
  TrendCharts,
  DocumentDelete,
} from "@element-plus/icons-vue";
export default {
  name: "SideMenu",
  data() {
        return {
          isCollapse:false,  
              
        }
    },
    components:{
    Setting,
    IconMenu,
    TrendCharts,
    MenuAllCourses,
    MenuMyCourses,
    DocumentDelete,
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

</style>