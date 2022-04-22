
<template>
  <div class="my-course-tutorial">
    <el-tabs tab-position="top" class="my-course-tutorial-tab">
      <el-tab-pane
        v-for="tutorial in tutorials"
        v-bind:key="tutorial"
        :label="tutorial.tutorialTitle"
      >
        <!-- {{ tutorial.tutorialContent }} -->
        <div v-html="tutorial.tutorialContent"></div>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>


<script >

export default {
  name: "MyCourseTutorial",
  props: ["chapterId", "globalLevel"],
  data() {
    return {
      currentChapter: "",
      tutorials: [],
      testHtml:"<h1>Hello11 World</h1>"
    };
  },
  components: {},
  methods: {
    async getChapterTutorial() {
      var _this = this;
      var url = "/apis/getMyModulesTutorial/";
      url += localStorage.getItem("userid");
      url += ":";
      url += this.chapterId;
      url += ":";
      url += this.globalLevel;

      let response = await _this.$axios.get(url);
      this.tutorials = response.data.data;
      console.log(this.tutorials)
    },
    async init() {
      await this.getChapterTutorial();
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.init();
  },
  watch: {
    chapterId() {
      this.currentChapter = this.chapterId;

      this.init();
    },
    $route(to, from) {
      //监听路由是否变化
      if (to != from) {
        //window.location.reload();
        this.init();
      }
    },
  },
};
</script>

<style scoped>
.my-course-tutorial {
  height: 100%;
}
.my-course-tutorial-tab {
  height: 100%;
}
</style>