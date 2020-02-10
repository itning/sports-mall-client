import Vue from 'vue'
import VueRouter from 'vue-router'
import MainIndex from "../views/MainIndex";
import MainView from "../views/MainView";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainIndex',
    component: MainIndex,
    children: [{
      path: '',
      components: {
        subContent: MainView
      }
    },
      {
        path: 'search/:keyword',
        components: {
          subContent: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
        }
      }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "Registration" */ '../views/Registration.vue')
  },
  {
    path: '/forget_pwd',
    name: 'ForgetPassword',
    component: () => import(/* webpackChunkName: "ForgetPassword" */ '../views/ForgetPassword.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
