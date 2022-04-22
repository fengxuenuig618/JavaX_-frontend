
<template>
<div class="all-course-tutorial">
    <el-tabs tab-position="top" class="all-course-tutorial-tab"
    >
    <el-tab-pane 
    v-for="tutorial in tutorials" v-bind:key="tutorial"
    :label="tutorial.tutorialTitle">
    <div class="tutorial-present">
      <div v-html="tutorial.tutorialContent"></div>
       
    </div>
    
    </el-tab-pane>

  </el-tabs>
</div>
</template>


<script >
export default {
  name: "AllCourseTutorial",
  props: ['chapterId'],
  data() {
        return {
            currentChapter:"",
            tutorials:[],
            url:"../../tutorials/PHOTO.jpg"
            
        }
    },
    components:{
        

    },
    methods: {
        getChapterTutorial(){
        var _this = this;
      var url = "/apis/getAllModulesTutorial/";
      url += this.currentChapter;
      _this.$axios.get(url).then((res) => {
        //console.log(res.data.data);
        _this.tutorials = res.data.data;
      });
        },
        init(){
            this.currentChapter = this.$route.query.chapterId;
            this.getChapterTutorial();
        },
        
    },
    created(){
        this.init();
        
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
.all-course-tutorial{
    height: 100%;
}
all-course-tutorial-tab{
    height: 100%;
}
.tutorial-present{
    background-color: white;
}
.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}

</style>