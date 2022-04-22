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
    path: "/index",
    name: "Index",
    component: () => import("../views/index/index.vue"),
  },
  
  {
    path: "/",
    name: "HomePage",
    component: () => import("../layouts/index.vue"),
    redirect:"/myProfile",
    children: [{ path: 'page1', name: 'Page1', component: () => import("../components/Page1.vue") },
    { path: 'aboutPage', name: 'AboutPage', component: () => import("../views/AboutPage.vue") },
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
 

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.path == '/login' || to.path == '/register' 
  || to.path == '/forgotPassword' || to.path == '/resetPassword') {
    next();
  } else {
    const token = localStorage.getItem('Authorization'); // 获取token
    // token不存在
    if (token === null || token === '') {
      alert('Log in first, please');
      next('/login');
    } else {
      next();
    }
  }
});


export default router;
