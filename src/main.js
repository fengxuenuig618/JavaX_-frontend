import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bus from 'vue3-eventbus';


//导入axios
import axios from "axios";

//导入 qs
import qs from "qs";

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import eventBus from 'vue3-eventbus'
import './assets/icon/iconfont.css'

import * as echarts from 'echarts';

const app = createApp(App)



//设置全局属性
app.config.globalProperties.$axios=axios;

app.config.globalProperties.$qs=qs;

app.config.globalProperties.$echarts = echarts;

app.config.globalProperties.$bus = bus;

app.use(store).use(router).use(ElementPlus).use(eventBus).mount("#app");

//import Vue from 'vue';
//使用axios
//Vue.prototype.axios = axios;
    //axios携带token
    // 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;

      
    },
    error => {
        return Promise.reject(error);
    });

