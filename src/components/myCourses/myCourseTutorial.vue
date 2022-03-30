
<template>
<div class="my-course-tutorial">
    <el-tabs tab-position=right class="my-course-tutorial-tab"
    >
    <el-tab-pane 
    v-for="tutorial in tutorials" v-bind:key="tutorial"
    :label="tutorial.tutorialTitle">
    {{tutorial.tutorialContent}}
    </el-tab-pane>

  </el-tabs>
</div>
</template>


<script >
export default {
  name: "MyCourseTutorial",
  props: ['chapterId','globalLevel'],
  data() {
        return {
            currentChapter:"",
            tutorials:[],    
        }
    },
    components:{
        

    },
    methods: {
        getChapterTutorial(){
        var _this = this;
      var url = "/apis/getMyModulesTutorial/";
      url += this.chapterId;
      url += ":";
      url += this.globalLevel;
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.tutorials = res.data.data;

      });
        },
        init(){
            
            this.getChapterTutorial();
        },
        
    },
    created(){
        this.getChapterTutorial();
    },
    mounted(){
      
    },
       watch: {
        chapterId(){
            this.currentChapter = this.chapterId;
            console.log("watch",this.currentChapter);
            this.init();
        },
	  '$route' (to, from) { //监听路由是否变化
		  if(to.query.chapterId != from.query.chapterId){
			  //window.location.reload();
        this.init();
		  }
	  }
},
    
  
};
</script>

<style scoped>
.my-course-tutorial{
    height: 100%;
}
.my-course-tutorial-tab{
    height: 100%;
}

</style>