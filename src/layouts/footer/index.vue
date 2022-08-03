
<template>
<el-footer class="inner-footer"> 
  <div class="my-footer">
    <el-row>
      <el-col :span=4>
        <el-icon><user /></el-icon>
        <el-link href="https://www.linkedin.com/in/feng-xue-65ba61211/" type="primary" target="_blank">
        Author: Feng Xue</el-link>
      </el-col>
      <el-col :span=11>
        <el-icon><message /></el-icon>
        <span>Email: fengxue618@gmail.com/F.Xue1@nuigalway.ie</span>
      </el-col>
      <el-col :span=5>
        <div class="text-right">
        <el-icon><chat-dot-round /></el-icon>
        <el-link href="#/feedbackPage" type="warning" target="_self">
        Report bug</el-link>
        </div>
      </el-col>


      <!-- <el-col :span=4 >
        <div class="text-right">
        <el-icon><coffee-cup /></el-icon>
        <el-link href="https://revolut.me/feng7uuu0" type="danger" target="_blank">
        Buy me coffee ☕</el-link>
        </div>
      </el-col> -->

      <el-col :span=4>
        <div class="text-right">
        <el-icon><InfoFilled /></el-icon>
        <el-link  type="error" @click="centerDialogVisible = true">Declaration</el-link>         
        </div>
      </el-col>

    </el-row>

    <el-dialog v-model="centerDialogVisible" :title="Declaration" width="30%" center>
    <span
      >All tutorials and quizzes used on this website are from Oracle's official open source resources.</span
    >
    <template #footer>
      <span class="dialog-footer">
        
        <el-link href="https://docs.oracle.com/javase/tutorial/java/index.html" type="primary" target="_blank"
        >
        View official documentation</el-link>
         <br> <br>
        <el-button @click="centerDialogVisible = false">OK</el-button>
      </span>
    </template>
  </el-dialog>


  </div>
  
</el-footer>
</template>


<script >
import { User,Message,ChatDotRound,InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
export default {
  name: "MyFooter",
  components:{
    User,
    Message,
    // CoffeeCup,
    ChatDotRound,
    InfoFilled
  },
  data() {
    return{
        centerDialogVisible: ref(false)
    }
    
  }
};
</script>

<style scoped>
.inner-footer{
  height: 25px;
  background-color: #e6e6e6;
}
.my-footer .el-icon{
  vertical-align: middle;
}
.my-footer span {
  vertical-align: middle;
  margin-left: 4px;
}
.my-footer .el-link .declaration{
  vertical-align: middle;
  margin-left: 4px;
}
.text-right{
  text-align:right;
}
</style>