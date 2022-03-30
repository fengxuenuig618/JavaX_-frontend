<template>
  
  <el-container class="outer-container" direction="horizontal">

    
    <sideMenu></sideMenu>
 
    <el-container class="inner-container" direction="vertical">

      <myHeader></myHeader>
      
      <el-main class="inner-main">
      
          <router-view></router-view>
        
      </el-main>
      <myFooter> </myFooter>  
      
    </el-container>
  </el-container>
 

</template>

 

<script>

import MyFooter from "../layouts/footer";
import MyHeader from "../layouts/header";
import SideMenu from "../layouts/menu";

export default {
  name: "MainPage",
  data: function () {
    return {

    };
  },

  methods: {
    
  },
  components: {
  MyFooter,
  MyHeader,
  SideMenu,
  }
  
};
</script>



<style scoped>
.outer-container {
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.inner-container {
  height: 100%;
  padding: 0px;
  margin: 0px;

  background-color: yellow;
}
.inner-main {
  height: 100%;
  padding: 10px;
  background-color: whitesmoke;
  margin: 0px;
}


</style>