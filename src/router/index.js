import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainIndex',
    component: () => import(/* webpackChunkName: "MainIndex" */ '../views/MainIndex.vue')
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
