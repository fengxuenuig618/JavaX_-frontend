
<template >
  <div>
    <el-row>
      <el-col :span="4">
        <div style="font-size: 20px">
          Question {{ currentIndex + 1 }} of {{ allQuestions }}&nbsp;
        </div>
      </el-col>
      <el-col :span="16"> </el-col>
      <el-col :span="4">
        <div style="text-align: right; font-size: 20px">
          Correct rate&nbsp;&nbsp;
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="completedQuestions==0?0:parseInt((completedQuestions / allQuestions) * 100)"
          status="success"
        />
      </el-col>
      <el-col :span="10"></el-col>
      <el-col :span="2" style="text-align: center">
        <el-progress
          type="circle"
          :percentage="correctQuestions==0?0:parseInt((correctQuestions / completedQuestions) * 100)"
          :width="60"
        />
      </el-col>
    </el-row>

    <el-row style="padding-top: 5px">
      <el-col :span="4" style="font-size: 18px">
        Question ID:&nbsp;{{ quizs[currentIndex].mcqId }}
      </el-col>
      <el-col :span="6" style="font-size: 18px">
        <div style="display: inline">Difficulty:</div>
        <el-rate
          :model-value="parseInt(quizs[currentIndex].globalLevel)"
          
          disabled
          :max="3"
          size="large"
          style="display: inline"
        />
      </el-col>
      <el-col :span="14" style="font-size: 18px; text-align: right">
        Tutorial belong:&nbsp;
        {{ quizs[currentIndex].moduleTitle }}>
        {{ quizs[currentIndex].chapterTitle }}>
        {{ quizs[currentIndex].tutorialTitle }}
      </el-col>
    </el-row>

    <div class="question-description">
      {{ quizs[currentIndex].question }}
    </div>
    <div class="question-options">
      <el-radio-group
        class="radioDiv"
        v-model="userSelected"
        :disabled="hasSelected"
      >
        <div
          v-for="select in quizs[currentIndex].options"
          v-bind:key="select"
          style="padding-top: 10px"
        >
          <el-radio-button :label="select" />
        </div>
      </el-radio-group>
    </div>
    &nbsp;
    <el-row>
      <el-col :span="24">
        <div style="padding-left: 70px; font-size: 25px">{{ showAnswer }}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="19"></el-col>
      <el-col :span="5" style="text-align: right">
        <el-button
          type="success"
          plain
          round
          :disabled="hasSelected"
          @click="confirmQuestion()"
          >Confirm</el-button
        >
        <el-button
          type="primary"
          plain
          round
          :disabled="!hasSelected"
          @click="nextQuestion()"
          >{{ nextButton }}</el-button
        >
      </el-col>
    </el-row>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      direction="btt"
      size="60%"
    >
      <el-row>
        <el-col :span="20" style="font-size: 30px">
          Congratulations!!!&nbsp;&nbsp;You have completed the quiz in this
          Chapter.
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button
            type="primary"
            plain
            round
            @click="resetDialogVisible = true"
            >Try Again</el-button
          >

        </el-col>
      </el-row>
      <el-scrollbar>
        <div style="font-size: 22px; padding-top: 15px">
          Chapter correct rate:&nbsp;{{ correctQuestions }}/{{ allQuestions }}
        </div>
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="correctQuestions==0?0:parseInt((correctQuestions / allQuestions) * 100)"
          status="success"
          style="width: 500px; padding-bottom: 15px"
        />
        <div
          v-for="paragraph in paragraphAll"
          v-bind:key="paragraph"
          style="font-size: 15px"
        >
          <div style="padding-top: 15px">
            {{ paragraph[0] }} correct rate:&nbsp;
            {{ paragraphCorrect.get(paragraph[0]) }}
            /{{ paragraphAll.get(paragraph[0]) }}
          </div>

          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="
              paragraphCorrect.get(paragraph[0])==0?0:parseInt(
                (paragraphCorrect.get(paragraph[0]) /
                  paragraphAll.get(paragraph[0])) *
                  100
              )
            "
            status="success"
            style="width: 500px; padding-bottom: 15px"
          />
        </div>
        <el-dialog
          v-model="resetDialogVisible"
          title="Warning"
          width="30%"
          center
        >
          <span
            >This will reset your quiz for this chapter.<br />
            Continue?</span
          >
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="resetDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="resetRecords()"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script >
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "FinalQuiz",
  data() {
    return {
      currentModule:"",
      currentIndex: 0,
      allQuestions: 0,
      completedQuestions: 0,
      correctQuestions: 0,
      hasSelected: false,
      showAnswer: "",
      nextButton: "Next Question",
      userSelected: ref(""),
      quizs: [
        {
          mcqId: "",
          paragraphBelong: "",
          chapterBelong: "",
          moduleBelong: "",
          question: "",
          options: [],
          strOptions: "",
          answer: "",
          globalLevel: "",
          moduleTitle: "",
          chapterTitle: "",
          tutorialTitle: "",
        },
      ],
      questionSetCorrect: "",
      questionSetWrong: "",
      drawer: false,
      paragraphCorrect: {},
      paragraphAll: {},

      resetDialogVisible: false,
      transferQuiz: {
        uid: 0,
        wrongQuiz: "",
        correctQuiz: "",
      },
    };
  },
  components: {},
  methods: {
    async init() {
      this.currentModule = this.$route.query.moduleId;
      this.paragraphCorrect = new Map();
      this.paragraphAll = new Map();
      this.nextButton = "Next Question";
      await this.getQuiz();
      this.allQuestions = this.quizs.length;
      this.reset();
    },
    confirmQuestion() {
      if (this.currentIndex == this.allQuestions - 1) {
        this.nextButton = "Complete Quiz";
      }
      if (this.userSelected == "") {
        ElMessage({
          showClose: true,
          message: "Please choose",
          type: "warning",
        });
      } else {
        this.hasSelected = true;
        this.completedQuestions++;
        var curParagraph = this.quizs[this.currentIndex].moduleTitle;
        if (this.paragraphAll.has(curParagraph)) {
          var preAll = this.paragraphAll.get(curParagraph);
          this.paragraphAll.set(curParagraph, preAll + 1);
        } else {
          this.paragraphAll.set(curParagraph, 1);
          this.paragraphCorrect.set(curParagraph, 0);
        }
        if (this.userSelected == this.quizs[this.currentIndex].answer) {
          ElMessage({
            showClose: true,
            message: "Correct (๑•̀ㅂ•́)و✧",
            type: "success",
          });
          this.correctQuestions++;
          this.questionSetCorrect += this.quizs[this.currentIndex].mcqId + ";";
          var preCorrect = this.paragraphCorrect.get(curParagraph);
          this.paragraphCorrect.set(curParagraph, preCorrect + 1);
        } else {
          ElMessage({
            showClose: true,
            message: "Wrong (⊙ˍ⊙)",
            type: "error",
          });
          this.questionSetWrong += this.quizs[this.currentIndex].mcqId + ";";
        }
        this.showAnswer =
          "The correct answer is : " + this.quizs[this.currentIndex].answer;
      }
    },
    nextQuestion() {
      if (this.currentIndex == this.allQuestions - 1) {
        this.saveRecords();
        ElMessageBox.alert('Your test records will be automatically saved to the database.', 'INFO', {
    confirmButtonText: 'OK',
  }).then(() => {
      this.drawer = true;
      ElMessage({
              showClose: true,
              message: "save success",
              type: "success",
            });
    })
      } else {
        this.currentIndex++;
        this.hasSelected = false;
        this.userSelected = "";
      }
    },
    saveRecords() {
      var _this = this;
      var url = "/apis/saveWrongQuiz/";
      url += localStorage.getItem("userid");
      console.log("url:" + url);
      this.transferQuiz.uid = localStorage.getItem("userid");
      this.transferQuiz.correctQuiz = this.questionSetCorrect;
      this.transferQuiz.wrongQuiz = this.questionSetWrong;
      _this.$axios
        .post(url, this.$qs.stringify(this.transferQuiz))
        .then((res) => {
          console.log(res);
        });
      this.drawer = false;
      ElMessage({
        showClose: true,
        message: "save success",
        type: "success",
      });
    },
    reset() {
      this.currentIndex = 0;
      this.paragraphCorrect = new Map();
      this.paragraphAll = new Map();
      this.nextButton = "Next Question";
      this.completedQuestions = 0;
      this.correctQuestions = 0;
      this.hasSelected = false;
      this.showAnswer = "";
      this.userSelected = "";
      (this.questionSetCorrect = ""),
        (this.questionSetWrong = ""),
        (this.resetDialogVisible = false);
      this.drawer = false;
    },
    resetRecords() {
      this.reset();
      ElMessage({
        showClose: true,
        message: "reset success",
        type: "success",
      });
    },
    async getQuiz() {
      var _this = this;
      var url = "/apis/getFinalQuiz/";
      url += localStorage.getItem("userid");

      console.log("url:" + url);

      let response = await  _this.$axios.get(url);
              if (response.data.msg == "no quiz") {
          ElMessageBox.alert("No quiz yet.", "WOW", {
            confirmButtonText: "OK",
          });
          this.$router.push("myProfile");
          }
          else{
            this.quizs = response.data.data;
          }

      // _this.$axios.get(url).then((res) => {
      //   if (res.data.msg == "no wrong") {
      //     ElMessageBox.alert("You have no wrong question yet.", "WOW", {
      //       confirmButtonText: "OK",
      //     });
      //     this.$router.push("myProfile");
      //   } else {
      //     _this.quizs = res.data.data;
      //   }
      // });
    },
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to != from) {
        //window.location.reload();
        this.init();

      }
    },
  },
};
</script>

<style scoped>
.question-description {
  height: 100%;
  background-color: #f9fff2;
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
  white-space: pre-wrap;
}
.question-options {
  height: 100%;
  width: 100%;
  background-color: white;
  float: left;
  /* display: block; */
  padding-left: 70px;
  padding-bottom: 50px;
}
.radioDiv {
  margin: 0 auto;
  width: 100%;
  text-align: left;
  display: table;
}
</style>