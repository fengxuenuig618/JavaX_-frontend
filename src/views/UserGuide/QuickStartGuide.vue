
<template>
  <div class="my-course-tutorial">
    <el-tabs tab-position="right" class="all-course-tutorial-tab">
      <el-tab-pane label="View your profile">
        <div class="A-style">Click "My Profile" on the left menu to view your learning record and analysis. 
          Your study history will appear on the calendar on the right. 
          Your overall score and review will be shown above, 
          and your score and review for each module will be shown below by module.</div>
          <el-image   
        :src="require('../../../public/figures/guide/profile2.jpg')"  />
        <br><br>
        <div class="A-style">This information will not be displayed if you have not set up or completed any chapters.</div>
        <el-image   
        :src="require('../../../public/figures/guide/PROFILE1.jpg')"  /> 
        <div class="A-style">
           You can click the "Set Now" button of the dialog 
           or the "learning management" button of the "My Profile" page 
           to set this (see the next section for details).
           </div>
      </el-tab-pane>
      <el-tab-pane label="Set learning goals">
        <div class="A-style">
          Choose your relevant background to help us better provide you with customized services.
           </div>
           <div class="A-style">
          You can choose your difficulty target to adjust the difficulty level of your custom content.
           </div>
           <div class="A-style">
          You are free to choose what you need to learn.
           </div>
           <el-image   
        :src="require('../../../public/figures/guide/SETTING.jpg')"  /> 
        <div class="A-style">
          You can reset it later from the "My Profile" page.
        </div>
      </el-tab-pane>
      <el-tab-pane label="Try your modules">
        <div class="A-style">
          You can click "My Modules" on the left menu to view customized teaching content generated according to your settings.
        </div>
        <div class="A-style">
          First you need to complete the "Pre-Class Quiz" for us to assess your mastery of this chapter.
        </div>
        <el-image  :src="require('../../../public/figures/guide/my1.jpg')" />
        <br><br>
        <div class="A-style">
          When you have completed the test, you can view your test results.
Based on your performance, we've listed what you already know that we recommend you skip. 
Of course, you can also reset manually.
        </div>
        <el-image  :src="require('../../../public/figures/guide/my2.jpg')" />
        <br><br>
        <div class="A-style">
          After you complete "Pre-Class Quiz", the tutorial and quiz functions will be unlocked.
You can click ''tutorial'' to learn our customized tutorial for you.
        </div>
        <el-image  :src="require('../../../public/figures/guide/my3.jpg')" />
        <br><br>
        <div class="A-style">
            After the tutorial, you can click "Quiz" to take the post-class test of this chapter.
        </div>
        <div class="A-style">
          After completion, you will click "Confirm" to save your answer record. 
          If you are not satisfied with this quiz, you can click "Try again" to answer the question again.
        </div>
        <el-image  :src="require('../../../public/figures/guide/my4.jpg')" />
        <br><br>
        <div class="A-style">
          After you have completed all the chapters of a module, 
          click on "Module quiz" in the module on the left side of the menu to take the exam for that module.
        </div>
        <div class="A-style">
          After you complete this section,
           your learning records and analysis for this chapter will be displayed on the "My Profile" page.
        </div>
        <el-image  :src="require('../../../public/figures/guide/my5.jpg')" />
      </el-tab-pane>
      <el-tab-pane label="Review your mistakes">
        <div class="A-style">
            You can click "Wrong Questions" on the left menu to practice again the questions you missed. 
            Questions answered correctly this time will be removed from your error book.
        </div>
        <el-image  :src="require('../../../public/figures/guide/wrong.jpg')" />
      </el-tab-pane>
      
      <el-tab-pane label="View all modules">
        <div class="A-style">
          All Modules contains all teaching content and exercises on this website. 
          This section is non-customized and no records of your studies are saved. 
          It is recommended that you go to "My Modules" for learning.
        </div>
        <el-image  :src="require('../../../public/figures/guide/all1.jpg')" /> 
        <br><br>
        <div class="A-style"> 
          This section is non-customized and no records of your studies are saved. 
          It is recommended that you go to "My Modules" for learning.
        </div>
        <el-image  :src="require('../../../public/figures/guide/all2.jpg')" /> 
      </el-tab-pane>
      <el-tab-pane label="Change your account">
        <div class="A-style">Move the cursor to your username in the upper right corner and select "My Account" from the drop-down menu.
You can re-edit your personal account information here.</div>
        <el-image   
        :src="require('../../../public/figures/guide/account.jpg')"  />  
      </el-tab-pane>
      <el-tab-pane label="Give me feedback">
        <div class="A-style">Click "Feedback" on the left menu to enter this page.
You can rate and report bugs you find.</div>
        <el-image   
        :src="require('../../../public/figures/guide/feedback.jpg')"  />  
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script >

export default {
  name: "QuickStartGuide",
  data() {
    return {
      
    };
  },
  components: {},
  methods: {
   
  },
  created() {
    
  },
  mounted() {
    
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
.A-style{
  font-size: 20px;
}
</style>