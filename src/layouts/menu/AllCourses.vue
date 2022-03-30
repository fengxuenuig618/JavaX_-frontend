<template>
<div class="menu-bug-wrap">
<el-sub-menu index="allModules">
          <template #title>
            <el-icon><location/></el-icon>
            <span> All Modules</span>
          </template>
               <template v-for="module in transferMenuALlModules" v-bind:key="module">
              <el-sub-menu :index="'allMoudles'+module.moduleId" >
            <template #title><span>{{module.moduleTitle}}</span></template>
            <template v-for="chapter in module.chapters" v-bind:key="chapter">
            <el-menu-item :index="'allMoudles'+chapter.chapterId" @click="toChapter(chapter.chapterId)">
            {{chapter.chapterTitle}}
            </el-menu-item>
            </template>
          </el-sub-menu>
          
          </template> 
        </el-sub-menu>
</div>
</template>


<script >
import {Location,} from "@element-plus/icons-vue";


export default {
  name: "MenuAllCourses",
  
  data() {
        return {
            transferMenuALlModules:[
                {moduleId:"",
                moduleTitle:"",
                chapters:[{
                    chapterId:"",
                    chapterTitle:""
                }]
                }            
            ],
        }
    },
    components:{
        Location,
        
    },
    methods: {
            getMenuAllModules(){
         var _this = this;
      var url = "/apis/menuAllModules/";
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.transferMenuALlModules=res.data.data;
        console.log(this.transferMenuALlModules);
      });
 
    },
     toChapter(chapter){
      console.log(chapter);
      console.log("********");
      //this.router.push({path:'/allCourses', query:{chapterId:chapter }})
      this.$router.push({ path: '/allCourses', query: { chapterId: chapter, tab:'tutorialTab'} });     
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
.el-menu--collapse .el-submenu__title span{
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse>.menu-bug-wrap>.el-submenu__title.el-submenu__icon-arrow{
    display: none;
  }


</style>