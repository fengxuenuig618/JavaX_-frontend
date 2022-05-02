<template>

<el-sub-menu index="allModules">
          <template #title>
            <el-icon><collection /></el-icon>
            <!-- <el-icon><location/></el-icon> -->
            <span> All Modules</span>
          </template>
               <template v-for="module in transferMenuALlModules" v-bind:key="module">
              <el-sub-menu :index="'allMoudles'+module.moduleId" >
            <template #title><span>{{module.moduleTitle}}</span></template>
            <template v-for="chapter in module.chapters" v-bind:key="chapter">
            <el-menu-item :index="'allMoudles'+chapter.chapterId" @click="toChapter(chapter.chapterId, module.moduleTitle,chapter.chapterTitle)">
            {{chapter.chapterTitle}}
            </el-menu-item>
            </template>
          </el-sub-menu>
          
          </template> 
        </el-sub-menu>

</template>


<script >
import {Collection} from "@element-plus/icons-vue";
//import { Fragment } from 'vue-fragment';

export default {
  name: "MenuAllCourses",
 
  
  data() {
        return {
            transferMenuALlModules:[
                {moduleId:"",
                moduleTitle:"",
                moduleDone:"",
                chapters:[{
                    chapterId:"",
                    chapterTitle:"",
                    chapterDone:"",
                }]
                }            
            ],
        }
    },
    components:{
        Collection
      
    },
    methods: {
            getMenuAllModules(){
         var _this = this;
      var url = "/apis/menuAllModules/";
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.transferMenuALlModules=res.data.data;
        // console.log(this.transferMenuALlModules);
      });
 
    },
     toChapter(chapter,moduleTitle,chapterTitle){
      // console.log(chapter);
     var nav = "All Modules";
     nav += "/";
     nav += moduleTitle;
     nav += "/";
     nav += chapterTitle;
      //this.router.push({path:'/allCourses', query:{chapterId:chapter }})
      this.$router.push({ path: '/allCourses', query: { chapterId: chapter, tab:'tutorialTab',navigation: nav} }); 
      
      
    },
    },
    created(){
        this.getMenuAllModules();
    },
    mounted(){
        
    }
    
  
};
</script>

<style>



</style>