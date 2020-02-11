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
    children: [
      {
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
      },
      {
        path: 'order',
        components: {
          subContent: () => import(/* webpackChunkName: "Order" */ '../views/Order.vue')
        }
      },
      {
        path: 'cart',
        components: {
          subContent: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue')
        }
      },
      {
        path: 'product_detail/:id',
        components: {
          subContent: () => import(/* webpackChunkName: "ProductDetail" */ '../views/ProductDetail.vue')
        },
        children: [
          {
            path: '',
            components: {
              product: () => import(/* webpackChunkName: "ProduceDetailIntroduction" */ '../views/ProduceDetailIntroduction.vue')
            }
          },
          {
            path: 'comment',
            components: {
              product: () => import(/* webpackChunkName: "ProduceDetailComment" */ '../views/ProduceDetailComment.vue')
            }
          }
        ]
      }
    ]
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
