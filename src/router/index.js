import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from '../store'
import MainIndex from "../views/MainIndex";
import MainView from "../views/MainView";
import User, {LOCAL_STORAGE_KEY} from "../user";
import AdminIndex from "../views/AdminIndex";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
        path: 'product_type/:id',
        components: {
          subContent: () => import(/* webpackChunkName: "ProductType" */ '../views/ProductType.vue')
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
      },
      {
        path: 'confirm_order/:id/:count',
        components: {
          subContent: () => import(/* webpackChunkName: "ConfirmOrder" */ '../views/ConfirmOrder.vue')
        }
      },
      {
        path: 'personal',
        components: {
          subContent: () => import(/* webpackChunkName: "Personal" */ '../views/Personal.vue')
        }
      }
    ]
  },
  {
    path: '/admin',
    component: AdminIndex,
    children: [
      {
        path: '',
        redirect: 'product'
      },
      {
        path: 'productType',
        components: {
          subContent: () => import(/* webpackChunkName: "AdminProductType" */ '../views/AdminProductType.vue')
        }
      },
      {
        path: 'carousel',
        components: {
          subContent: () => import(/* webpackChunkName: "AdminCarousel" */ '../views/AdminCarousel.vue')
        }
      },
      {
        path: 'order',
        components: {
          subContent: () => import(/* webpackChunkName: "AdminOrder" */ '../views/AdminOrder.vue')
        }
      },
      {
        path: 'product',
        components: {
          subContent: () => import(/* webpackChunkName: "AdminProduct" */ '../views/AdminProduct.vue')
        }
      },
      {
        path: 'product_new',
        components: {
          subContent: () => import(/* webpackChunkName: "AdminProductNew" */ '../views/AdminProductNew.vue')
        }
      }
    ],
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

router.beforeEach((to, from, next) => {
  if (to.path === "/login" ||
    to.path === "/reg" ||
    to.path === "/" ||
    to.path === '/forget_pwd') {
    next();
    return;
  }
  if (to.path.startsWith("/admin")) {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      next("/login");
    } else {
      if (User.loginUser().role.id === '1') {
        next();
      } else {
        next('/login');
      }
    }
    return;
  }
  next();
});

router.afterEach((to, from) => {
  if (to.path === "/login" ||
    to.path === "/reg" ||
    to.path === "/forget_pwd") {
    return;
  }
  Vuex.state.now_path = to.path;
});

export default router
