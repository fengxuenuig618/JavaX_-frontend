
<template>

  <div class="page">
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
  </div>
</template>



<script>
export default {
  name: "Page2",
  
};
</script>
<style scoped>
.page{
  height: 100%;
  background-color: aquamarine;
}
</style>