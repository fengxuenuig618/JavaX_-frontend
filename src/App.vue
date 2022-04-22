<template>
  
  <router-view />
</template>

<style lang="scss">
html,body,#app{
  margin: 0;
  padding: 0;
  height:100%;
  overflow-x:hidden;
   overflow-y:hidden;
}
.el-drawer__body {
    background: #ffffe5;
}
.el-menu--collapse .el-submenu__title span{
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse .el-submenu__icon-arrow{
    display: none;
  }

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
