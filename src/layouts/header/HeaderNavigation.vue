
<template>
<div class="my-navigation">
:&nbsp;{{this.navigation}}

</div>
</template>


<script >
import bus from 'vue3-eventbus'
export default {
  name: "HeaderCollapse",
  components:{


   },
   data() {
        return {
            navigation:""            
        }
    },
    methods: {
        

    },
    created(){
        
        
    },
    mounted(){
      bus.on('headerNavigate', e => {
        this.navigation=e.navigation;
      } )
    }
  
};
</script>

<style scoped>
.my-navigation{
    font-size: 24px;
    padding: 4px;
}
</style>