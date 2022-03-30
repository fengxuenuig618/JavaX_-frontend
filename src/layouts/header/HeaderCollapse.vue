
<template>
<div class="menu-collapse">
              <el-tooltip content="Collapse" placement="bottom" effect="light">
              <el-icon :size="30">
                <component
        class="fold-menu"
        :is='iconName'
        @click="handleFoldClick()"
      ></component>
              </el-icon>
              </el-tooltip>

            </div>
</template>


<script >
import {
  Fold,
  Expand,
} from "@element-plus/icons-vue";
import bus from 'vue3-eventbus'
export default {
  name: "HeaderCollapse",
  components:{
       Fold,
    Expand,

   },
   data() {
        return {
            iconName:"Fold",
            isCollapse:false,
            
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
             bus.emit('menuCollapse', { isCollapse: this.isCollapse })
        },


    },
    created(){
        
        
    }
  
};
</script>

<style scoped>

</style>