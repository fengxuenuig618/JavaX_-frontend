
<template>
      <el-header class="inner-header">
        <el-row>
          <el-col :span="1">
            <headerCollapse></headerCollapse>
          </el-col>
          <el-col :span="19">
            <headerNavigate></headerNavigate>
          </el-col>
          <el-col :span="4">
            <headerDropdown></headerDropdown>
          </el-col>
        </el-row>
      </el-header>
</template>


<script >
import HeaderDropdown from "./HeaderDropdown.vue";
import HeaderCollapse from "./HeaderCollapse.vue";
import headerNavigate from "./HeaderNavigation.vue";

export default {
  name: "MyHeader",
   components:{
    HeaderDropdown,
    HeaderCollapse,
    headerNavigate
   },
   data() {
        return {
            
        }
    },
    methods: {
        handleFoldClick() {
            this.isCollapse = !this.isCollapse;
      if (this.iconName=="Fold") {
        this.iconName = 'Expand'

      } else {
        this.iconName = 'Fold'
      }
            this.$emit('changeCollapse', 'Lily')   // 触发事件并传值
        },


    },
    created(){

    }
  
};
</script>

<style scoped>
.inner-header{
   height: 50px;
   background-color: white;
   border: 2px solid #cccccc;
}

</style>