
<template>
<el-footer class="inner-footer"> 
  <div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-icon><user /></el-icon>
    Author:fengxue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-icon><message /></el-icon>
    Email:fengxue618@gmail.com
  </div>
  
</el-footer>
</template>


<script >
import { User,Message } from "@element-plus/icons-vue";
export default {
  name: "MyFooter",
  components:{
    User,
    Message
  }
};
</script>

<style scoped>
.inner-footer{
  height: 25px;
  background-color: #e6e6e6;
}
</style>