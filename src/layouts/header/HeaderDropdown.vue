
<template>
  <div class="dropdown">
    <el-dropdown @command="dropdownCommand">
      <span class="el-dropdown-link" style="font-size: 16px">
        <el-icon :size="20"><avatar /></el-icon>
        {{ userName
        }}<el-icon class="el-icon--right"
          ><el-icon><arrow-down-bold /></el-icon
        ></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="myAccount">My Account</el-dropdown-item>
          <el-dropdown-item command="signOut" divided
            >Sign Out</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>


<script >
import { ElMessage } from "element-plus";
import { ArrowDownBold, Avatar } from "@element-plus/icons-vue";
export default {
  name: "HeaderDropdown",
  components: {
    Avatar,
    ArrowDownBold,
  },
  data() {
    return {
      userName: localStorage.getItem("username"),
    };
  },
  methods: {
    dropdownCommand(command) {
      if (command == "myAccount") {
        this.$router.push("/accountManage");
      } else if (command == "signOut") {
        
        // console.log(localStorage.getItem("userid"));
        localStorage.removeItem("Authorization");
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        this.$router.push("/login");
        ElMessage({
          showClose: true,
          message: "Sign out",
          type: "warning",
        });
      } else {
        // console.log("error");
      }
    },
  },
};
</script>

<style scoped>
.dropdown {
  background-color: white;
  text-align: right;

  padding: 10px;
}
</style>