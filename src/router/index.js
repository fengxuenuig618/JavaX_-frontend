import { createRouter, createWebHashHistory } from "vue-router";



const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserAccount/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/UserAccount/Register.vue"),
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: () => import("../views/UserAccount/ForgotPassword.vue"),
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: () => import("../views/UserAccount/ResetPassword.vue"),
  },
  {
    path: "/404",
    name: "Page404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/401",
    name: "Page401",
    component: () => import("../views/401.vue"),
  },
  
  {
    path: "/",
    name: "HomePage",
    component: () => import("../layouts/index.vue"),
    redirect:"/myProfile",
    children: [{ path: 'page1', name: 'Page1', component: () => import("../components/Page1.vue") },
    { path: 'surveyPage', name: 'SurveyPage', component: () => import("../views/SurveyPage.vue") },
    { path: 'feedbackPage', name: 'FeedbackPage', component: () => import("../views/FeedbackPage.vue") },
    { path: 'userGuidePage', name: 'UserGuidePage', component: () => import("../views/UserGuide/index.vue") },
    { path: 'myProfile', name: 'MyProfile', component: () => import("../components/profile/MyProfile.vue") },
    { path: 'editProfile', name: 'EditProfile', component: () => import("../components/profile/EditProfile.vue") },
    { path: 'accountManage', name: 'accountManage', component: () => import("../components/AccountManage.vue") },
    { path: 'allCourses', name: 'AllCourses', component: () => import("../components/allCourses/index.vue") },
    { path: 'myCourses', name: 'MyCourses', component: () => import("../components/myCourses/index.vue") },
    { path: 'wrongQuestions', name: 'WrongQuestions', component: () => import("../components/wrongQuestions/index.vue") },
    { path: 'moduleQuiz', name: 'ModuleQuiz', component: () => import("../components/moduleQuiz/index.vue") },
    { path: 'finalQuiz', name: 'FinalQuiz', component: () => import("../components/finalQuiz/index.vue") },
  ]


  },
  {
    path: "/:catchAll(.*)",    // 404 路由捕获
    redirect: '/404'
  }
 

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.path == '/login' || to.path == '/register' || to.path == '/401' || to.path == '/404'
  || to.path == '/forgotPassword' || to.path == '/resetPassword') {
    next();
  } else {
    const token = localStorage.getItem('Authorization'); // 获取token
    // token不存在
    if (token === null || token === '') {
      
      next('/401');
    } else {
      next();
    }
  }
});


export default router;
