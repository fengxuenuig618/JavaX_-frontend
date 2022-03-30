
<template>
  <div class="my-calendar">
    <el-calendar v-model="calandarData">
      
      <template #dateCell="{ data }">
        {{ data.day.split("-").slice(2)[0] }}
        <div v-if="this.test(data.day)">
                {{ "✔️" }}
            </div>
      </template>
    </el-calendar>
  </div>
</template>


<script >
import { ElNotification } from "element-plus";
export default {
  name: "MyCalandar",
  data() {
    return {
      calandarData: new Date(),
      DateList: [],
      transferNewDate:{
        uid:0,
        historyDate:[],
        newDate:"",
      }
    };
  },
  components: {},
  methods: {
    test(day) {
      if(this.DateList.indexOf(day) > -1) return true;
      else return false;
    },
    checkToday() {
      // 获取当前日期
      var date = new Date();
      // 获取当前月份
      var nowMonth = date.getMonth() + 1;
      // 获取当前是几号
      var strDate = date.getDate();
      // 添加分隔符“-”
      var seperator = "-";
      // 对月份进行处理，1-9月在前面添加一个“0”
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      // 对月份进行处理，1-9号在前面添加一个“0”
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
      var nowDate =
        date.getFullYear() + seperator + nowMonth + seperator + strDate;
  
      if (
        localStorage.getItem("lastDate") == null ||
        localStorage.getItem("lastDate") != nowDate
      ) {
        ElNotification({
    title: 'Success',
    message: 'Today\'s study records have been saved!',
    type: 'success',
  });
        localStorage.setItem("lastDate", nowDate);
        var url = "/apis/postUserNewDate/";
      url += localStorage.getItem("userid");
      console.log("url:" + url);
      this.transferNewDate.newDate=nowDate;
      console.log(this.transferNewDate);
       this.$axios.post(url,this.$qs.stringify(this.transferNewDate));
      }
    },

    async getDate() {
      var _this = this;
      var url = "/apis/getUserDate/";
      url += localStorage.getItem("userid");
      console.log("url:" + url);
      let response = await _this.$axios.get(url);
      this.DateList=response.data.data.historyDate;
    },
    async init(){
      this.checkToday();
      await this.getDate();
      
    }
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>

<style>
.my-calendar{
  width: 400px;
}

.el-calendar-table .el-calendar-day{
    width: 20px;
    height: 50px;
    vertical-align:text-top;
}
</style>