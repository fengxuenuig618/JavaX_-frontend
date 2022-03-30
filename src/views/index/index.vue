<template>
  <el-container class="outer-container" >
    <el-header class="outer-header">顶部栏
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main class="outer-main" >
      
 

      <!-- <el-scrollbar> -->
  <div class="side-menu" style="height:100%">
        <el-row style="height:100%">
          <el-col :span="3" style="height:100%">
  <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        default-active="2"
        class="aside-menu"
        :collapse="isCollapse"
        style="height:100%"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
          </el-col>
        </el-row>
      </div>    
    
      <!-- </el-scrollbar> -->





    </el-main>
  </el-container>
</template>

<script>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

export default {
  name: "MainPage",
  data: function () {
    // const handleOpen = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    // const handleClose = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    //用户账号
    return {
      isCollapse: ref(true),

      user: {
        uid: 0,
        uname: "",
        upw: "",
      },
    };
  },

  methods: {},
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
};
</script>





<style scoped>


.outer-container {
  height: 100%;
}
.outer-main{
  background-color: blueviolet;
   padding: 0;
}
.outer-header{
 background-color: gray;
}


</style>
